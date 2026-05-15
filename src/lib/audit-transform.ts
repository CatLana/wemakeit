import type {
  AuditReportData,
  AuditSectionData,
  AuditIssue,
  AuditPoint,
  AuditSectionId,
} from "./audit-types";

// ---------------------------------------------------------------------------
// Lighthouse audit IDs → section mapping
// ---------------------------------------------------------------------------
const AUDIT_TO_SECTION: Record<string, AuditSectionId> = {
  // UX / Performance
  "first-contentful-paint": "ux",
  "largest-contentful-paint": "ux",
  "total-blocking-time": "ux",
  "cumulative-layout-shift": "ux",
  "speed-index": "ux",
  interactive: "ux",
  "render-blocking-resources": "ux",
  "unused-javascript": "ux",
  "unused-css-rules": "ux",
  "uses-optimized-images": "ux",
  "uses-webp-images": "ux",
  "efficient-animated-content": "ux",
  "uses-rel-preconnect": "ux",
  "server-response-time": "ux",
  "redirects": "ux",

  // SEO
  "document-title": "seo",
  "meta-description": "seo",
  "http-status-code": "seo",
  "link-text": "seo",
  "crawlable-anchors": "seo",
  "is-crawlable": "seo",
  "robots-txt": "seo",
  canonical: "seo",
  hreflang: "seo",
  "font-size": "seo",
  "tap-targets": "seo",
  "structured-data": "seo",

  // UI / Best Practices
  "is-on-https": "ui",
  "uses-http2": "ui",
  "no-vulnerable-libraries": "ui",
  "image-aspect-ratio": "ui",
  "image-size-responsive": "ui",
  "errors-in-console": "ui",
  "js-libraries": "ui",
  "csp-xss": "ui",
  "geolocation-on-start": "ui",
  "notification-on-start": "ui",
  "paste-preventing-inputs": "ui",
  deprecations: "ui",
  "third-party-cookies": "ui",

  // Accessibility
  "color-contrast": "accessibility",
  "image-alt": "accessibility",
  label: "accessibility",
  "button-name": "accessibility",
  "link-name": "accessibility",
  "skip-link": "accessibility",
  tabindex: "accessibility",
  "html-has-lang": "accessibility",
  "html-lang-valid": "accessibility",
  "aria-allowed-attr": "accessibility",
  "aria-required-attr": "accessibility",
  "aria-valid-attr": "accessibility",
  "aria-valid-attr-value": "accessibility",
  "aria-hidden-body": "accessibility",
  "duplicate-id-active": "accessibility",
  "duplicate-id-aria": "accessibility",
  list: "accessibility",
  listitem: "accessibility",
  "heading-order": "accessibility",
  "video-caption": "accessibility",
  "frame-title": "accessibility",
};

// ---------------------------------------------------------------------------
// Internal types for the raw PageSpeed API response
// ---------------------------------------------------------------------------
interface LighthouseAudit {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
  scoreDisplayMode: string;
}

interface LighthouseCategory {
  score: number | null;
  title: string;
  auditRefs: Array<{ id: string; weight: number }>;
}

export interface PageSpeedApiResponse {
  lighthouseResult: {
    categories: Record<string, LighthouseCategory>;
    audits: Record<string, LighthouseAudit>;
    fetchTime: string;
    finalUrl?: string;
  };
  id: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
}

const SECTION_TITLES: Record<AuditSectionId, string> = {
  ux: "User Experience (UX)",
  seo: "SEO",
  ui: "Visual & Technical Quality",
  accessibility: "Accessibility",
};

const CATEGORY_TO_SECTION: Record<string, AuditSectionId> = {
  performance: "ux",
  seo: "seo",
  "best-practices": "ui",
  accessibility: "accessibility",
};

// ---------------------------------------------------------------------------
// Main transformer
// ---------------------------------------------------------------------------
export function transformPageSpeedToAuditReport(
  data: PageSpeedApiResponse,
  requestedUrl: string,
): AuditReportData {
  const { lighthouseResult } = data;
  const { categories, audits, fetchTime, finalUrl } = lighthouseResult;

  const url = finalUrl ?? requestedUrl;
  let siteName = requestedUrl;
  try {
    const parsed = new URL(requestedUrl.startsWith("http") ? requestedUrl : `https://${requestedUrl}`);
    siteName = parsed.hostname.replace(/^www\./, "");
  } catch {
    // keep original
  }

  const reportDate = new Date(fetchTime).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Score per section (0–100)
  const sectionScores: Record<AuditSectionId, number> = {
    ux: Math.round((categories["performance"]?.score ?? 0) * 100),
    seo: Math.round((categories["seo"]?.score ?? 0) * 100),
    ui: Math.round((categories["best-practices"]?.score ?? 0) * 100),
    accessibility: Math.round((categories["accessibility"]?.score ?? 0) * 100),
  };

  // Collect relevant audits per section from the category auditRefs
  // (using category refs rather than global audit map ensures correct section attribution)
  const sectionAudits: Record<AuditSectionId, LighthouseAudit[]> = {
    ux: [],
    seo: [],
    ui: [],
    accessibility: [],
  };

  for (const [catKey, category] of Object.entries(categories)) {
    const sectionId = CATEGORY_TO_SECTION[catKey];
    if (!sectionId) continue;
    for (const ref of category.auditRefs) {
      if (ref.weight === 0) continue;
      const audit = audits[ref.id];
      if (!audit) continue;
      if (
        audit.scoreDisplayMode === "informative" ||
        audit.scoreDisplayMode === "notApplicable" ||
        audit.scoreDisplayMode === "manual"
      ) continue;
      sectionAudits[sectionId].push(audit);
    }
  }

  // Also add audits by our explicit mapping if not already included
  for (const [auditId, sectionId] of Object.entries(AUDIT_TO_SECTION)) {
    const audit = audits[auditId];
    if (!audit) continue;
    if (
      audit.scoreDisplayMode === "informative" ||
      audit.scoreDisplayMode === "notApplicable" ||
      audit.scoreDisplayMode === "manual"
    ) continue;
    const existing = sectionAudits[sectionId].find((a) => a.id === auditId);
    if (!existing) sectionAudits[sectionId].push(audit);
  }

  const sections: AuditSectionData[] = (
    ["ux", "seo", "ui", "accessibility"] as AuditSectionId[]
  ).map((id) => {
    const auditList = sectionAudits[id];

    const issues: AuditIssue[] = auditList
      .filter((a) => a.score !== null && a.score < 0.9)
      .sort((a, b) => (a.score ?? 1) - (b.score ?? 1))
      .slice(0, 8)
      .map((a) => ({
        title: a.title,
        body: stripMarkdownLinks(a.description),
        severity: (a.score ?? 0) < 0.5 ? "severe" : "average",
      }));

    const strengths: AuditPoint[] = auditList
      .filter((a) => a.score !== null && a.score >= 0.9)
      .slice(0, 5)
      .map((a) => ({
        title: a.title,
        body: a.displayValue ?? "Passes audit",
      }));

    return {
      id,
      title: SECTION_TITLES[id],
      score: sectionScores[id],
      strengths,
      issues,
    };
  });

  return {
    siteUrl: url,
    siteName,
    reportDate,
    eyebrow: "Automated audit report",
    title: `${siteName}: website audit`,
    subtitle:
      "Automated analysis via Google Lighthouse across UX, SEO, visual quality, and accessibility.",
    reviewedLabel: "Audited",
    reviewedValue: reportDate,
    visibilityLabel: "Type",
    visibilityValue: "Automated · Lighthouse",
    sections,
    cta: {
      title: "Want a human review on top of this?",
      body: "Automated tools catch technical issues, but a human expert can identify UX, content, and conversion problems that no tool can detect. Request a free, no-obligation quote.",
      primaryLabel: "Get a free quote",
      downloadLabel: "Download PDF report",
      downloadHref: "#", // no static PDF for dynamic reports
    },
  };
}
