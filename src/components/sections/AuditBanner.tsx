import { ArrowRight, Zap, BarChart2, Eye, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const metrics = [
  { icon: BarChart2, labelKey: "metricPerformance", score: 72, color: "#F59E0B" },
  { icon: Eye,       labelKey: "metricAccessibility", score: 58, color: "#EF4444" },
  { icon: Search,    labelKey: "metricSeo",           score: 81, color: "#22D3EE" },
];

export default function AuditBanner() {
  const t = useTranslations("auditBanner");

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

          {/* Right — decorative score cards */}
          <div aria-hidden="true" className="flex shrink-0 flex-col gap-4 w-full max-w-xs">
            {metrics.map(({ icon: Icon, labelKey, score, color }) => (
              <div
                key={labelKey}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-300 mb-1.5">
                    {t(labelKey as Parameters<typeof t>[0])}
                  </p>
                  <div className="h-1.5 w-full rounded-full bg-white/10">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${score}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold tabular-nums" style={{ color }}>
                  {score}
                </span>
              </div>
            ))}
            <p className="text-center text-xs text-slate-500">{t("visualNote")}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
