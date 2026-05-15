import { ArrowRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AuditScoreCards, { type AuditScoreMetric } from "@/components/audit/AuditScoreCards";

export default function AuditBanner() {
  const t = useTranslations("auditBanner");
  const metrics: AuditScoreMetric[] = [
    { id: "performance", label: t("metricPerformance"), score: 72 },
    { id: "accessibility", label: t("metricAccessibility"), score: 58 },
    { id: "seo", label: t("metricSeo"), score: 81 },
  ];

  return (
    <section
      aria-labelledby="audit-banner-heading"
      className="relative overflow-hidden bg-[#0F172A] py-16 lg:py-20"
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-[#22D3EE]/[0.06] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">

          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                <Zap size={11} aria-hidden="true" />
                {t("eyebrow")}
              </span>
              <span className="inline-flex items-center rounded-full border border-[#22D3EE]/40 bg-[#22D3EE]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#22D3EE]">
                {t("betaLabel")}
              </span>
            </div>

            <h2
              id="audit-banner-heading"
              className="text-3xl sm:text-4xl font-extrabold leading-tight text-white mb-4"
            >
              {t("heading")}
            </h2>

            <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {t("body")}
            </p>

            <Link
              href="/audit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-7 py-3.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {t("cta")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Right - decorative score cards */}
          <div aria-hidden="true" className="flex shrink-0 flex-col gap-4 w-full max-w-xs">
            <AuditScoreCards metrics={metrics} note={t("visualNote")} ariaHidden />
          </div>

        </div>
      </div>
    </section>
  );
}
