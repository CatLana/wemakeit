import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import WorkCard, { type WorkApp } from "@/components/work/WorkCard";

export default function Work() {
  const t = useTranslations("work");
  const apps = t.raw("apps") as WorkApp[];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-white py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
              {t("eyebrow")}
            </span>
            <h2
              id="work-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight"
            >
              {t("headingPlain")}{" "}
              <span className="text-[#0F172A]">{t("headingAccent")}</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg leading-relaxed">
              {t("subheading")}
            </p>
          </div>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {apps.map((app) => (
            <WorkCard
              key={app.url}
              app={app}
              visitCta={t("visitCta")}
              liveLabel={t("liveLabel")}
              screenshotComingSoonLabel={t("screenshotComingSoon")}
            />
          ))}
        </ul>

        <Link
          href="/work"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#0E7490] hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
        >
          {t("viewAllCta")}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
