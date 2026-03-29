import {
  Code2,
  Lightbulb,
  ScanSearch,
  PenTool,
  Smartphone,
  Monitor,
  Accessibility,
  Briefcase,
  Users,
  Wrench,
  Languages,
  Globe2,
} from "lucide-react";
import { useTranslations } from "next-intl";

// Visual metadata only — text comes from translations
const servicesMeta = [
  { icon: Code2,        color: "text-[#22D3EE]",  bg: "bg-[#22D3EE]/10" },
  { icon: Lightbulb,   color: "text-sky-400",     bg: "bg-sky-400/10" },
  { icon: ScanSearch,  color: "text-[#A855F7]",   bg: "bg-[#A855F7]/10" },
  { icon: PenTool,     color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { icon: Smartphone,  color: "text-amber-400",   bg: "bg-amber-400/10" },
  { icon: Monitor,     color: "text-rose-400",    bg: "bg-rose-400/10" },
  { icon: Accessibility, color: "text-violet-400", bg: "bg-violet-400/10" },
  { icon: Briefcase,   color: "text-orange-400",  bg: "bg-orange-400/10" },
  { icon: Users,       color: "text-teal-400",    bg: "bg-teal-400/10" },
  { icon: Wrench,      color: "text-slate-400",   bg: "bg-slate-400/10" },
  { icon: Languages,   color: "text-cyan-400",    bg: "bg-cyan-400/10" },
  { icon: Globe2,      color: "text-indigo-400",  bg: "bg-indigo-400/10" },
];

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#F8FAFC] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
            {t("eyebrow")}
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight"
          >
            {t("headingPlain")}{" "}
            <span className="text-[#0F172A]">{t("headingAccent")}</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            {t("subheading")}
          </p>
        </div>

        {/* Service cards grid */}
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {servicesMeta.map(({ icon: Icon, color, bg }, i) => {
            const item = items[i];
            if (!item) return null;
            return (
              <li key={i}>
                <article className="group h-full flex flex-col p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#22D3EE]/50 hover:shadow-lg transition-all duration-200">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} mb-5`}
                  >
                    <Icon
                      size={24}
                      className={color}
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                  </div>

                  <h3 className="text-base font-bold text-[#1E293B] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <a
                    href={i === 8 ? "?inquiry=consultation#quote" : "#quote"}
                    aria-label={`${i === 8 ? t("consultationCta") : t("cardCta")}: ${item.title}`}
                    className="mt-5 inline-flex items-center text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors group-hover:gap-2 gap-1 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    {i === 8 ? t("consultationCta") : t("cardCta")}
                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
