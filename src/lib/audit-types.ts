export type IssueSeverity = "severe" | "average";

export interface AuditPoint {
  title: string;
  body: string;
}

export interface AuditIssue {
  title: string;
  body: string;
  severity: IssueSeverity;
}

export type AuditSectionId = "ux" | "seo" | "ui" | "accessibility";

export interface AuditSectionData {
  id: AuditSectionId;
  title: string;
  /** 0–100 Lighthouse score, optional */
  score?: number;
  strengths: AuditPoint[];
  issues: AuditIssue[];
}

export interface AuditReportData {
  siteUrl: string;
  siteName: string;
  reportDate: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  reviewedLabel: string;
  reviewedValue: string;
  visibilityLabel: string;
  visibilityValue: string;
  reviewNote?: { title: string; body: string };
  sections: AuditSectionData[];
  cta: {
    title: string;
    body: string;
    primaryLabel: string;
    downloadLabel: string;
    /** Pass "#" to hide the download button */
    downloadHref: string;
  };
}
