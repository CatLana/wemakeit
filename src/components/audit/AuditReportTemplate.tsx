import { ArrowRight, Download, Eye, Gauge, Palette, Search } from "lucide-react";
import type { AuditReportData, AuditSectionData, AuditSectionId } from "@/lib/audit-types";

// ---------------------------------------------------------------------------
// Section icons
// ---------------------------------------------------------------------------
const SECTION_ICON: Record<AuditSectionId, React.ReactNode> = {
  ux: <Gauge className="text-[#22D3EE] shrink-0" size={20} aria-hidden="true" />,
  seo: <Search className="text-[#22D3EE] shrink-0" size={20} aria-hidden="true" />,
  ui: <Palette className="text-[#22D3EE] shrink-0" size={20} aria-hidden="true" />,
  accessibility: <Eye className="text-[#22D3EE] shrink-0" size={20} aria-hidden="true" />,
};

// ---------------------------------------------------------------------------
// Score pill
// ---------------------------------------------------------------------------
function ScorePill({ score }: { score: number }) {
  const cls =
    score >= 90
      ? "bg-emerald-100 text-emerald-700"
      : score >= 50
        ? "bg-amber-100 text-amber-700"
        : "bg-rose-100 text-rose-700";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums ${cls}`}
      aria-label={`Score: ${score} out of 100`}
    >
      {score}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Individual audit section card
// ---------------------------------------------------------------------------
function AuditSectionCard({ section }: { section: AuditSectionData }) {
  return (
    <section
      aria-labelledby={`section-${section.id}`}
      className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 print:break-inside-avoid"
    >
      {/* Section header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {SECTION_ICON[section.id]}
          <h2
            id={`section-${section.id}`}
            className="text-xl font-bold text-[#1E293B]"
          >
            {section.title}
          </h2>
        </div>
        {section.score !== undefined && <ScorePill score={section.score} />}
      </div>

      {/* Strengths */}
      {section.strengths.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            What is working well
          </p>
          <ul className="mt-3 space-y-3" role="list">
            {section.strengths.map((item) => (
              <li key={item.title}>
                <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <h3 className="text-sm font-bold text-[#1E293B]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Issues */}
      {section.issues.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">
            Issues to fix
          </p>
          <ul className="mt-3 space-y-3" role="list">
            {section.issues.map((issue) => (
              <li key={issue.title}>
                <article
                  className={`rounded-2xl border p-4 ${
                    issue.severity === "severe"
                      ? "border-rose-200 bg-rose-50"
                      : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`mt-0.5 inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        issue.severity === "severe"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {issue.severity}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#1E293B]">{issue.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{issue.body}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main template
// ---------------------------------------------------------------------------
export default function AuditReportTemplate({ report }: { report: AuditReportData }) {
  const hasDownload = report.cta.downloadHref !== "#";

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[#0F172A] pt-16 pb-16 print:pt-8 print:pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#22D3EE]">
            {report.eyebrow}
          </span>
          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            {report.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            {report.subtitle}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                {report.reviewedLabel}
              </p>
              <p className="mt-2 text-sm text-white">{report.reviewedValue}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                {report.visibilityLabel}
              </p>
              <p className="mt-2 text-sm text-white">{report.visibilityValue}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                Website
              </p>
              <p className="mt-2 text-sm text-white break-all">
                <a
                  href={report.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 hover:decoration-white transition-colors"
                >
                  {report.siteUrl}
                </a>
              </p>
            </div>
          </div>

          {report.reviewNote && (
            <div className="mt-6 rounded-3xl border border-amber-400/25 bg-amber-400/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">{report.reviewNote.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                {report.reviewNote.body}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Four audit sections                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {report.sections.map((section) => (
              <AuditSectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="pb-20 pt-4 sm:pb-24 print:pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0F172A] p-8 text-center text-white sm:p-12">
            <h2 className="text-3xl font-extrabold">{report.cta.title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">{report.cta.body}</p>

            {/* Screen: show buttons */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center print:hidden">
              <a
                href="https://www.wemakeit.ie/en#quote"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                {report.cta.primaryLabel}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              {hasDownload && (
                <a
                  href={report.cta.downloadHref}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  {report.cta.downloadLabel}
                  <Download size={16} aria-hidden="true" />
                </a>
              )}
            </div>

            {/* Print / PDF: show plain text link instead of buttons */}
            <div className="hidden print:block mt-6">
              <p className="text-sm text-slate-300">
                Request a free quote at{" "}
                <a
                  href="https://www.wemakeit.ie/en#quote"
                  className="text-[#22D3EE] underline"
                >
                  wemakeit.ie/en#quote
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
