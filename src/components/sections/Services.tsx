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
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Visual metadata only — text comes from translations
// Order must match services.items array order in messages
const servicesMeta = [
  { icon: Globe2,        color: "text-indigo-400",  bg: "bg-indigo-400/10",  href: "/services/web-development" },
  { icon: Code2,         color: "text-[#22D3EE]",   bg: "bg-[#22D3EE]/10",   href: "/services/app-development" },
  { icon: Lightbulb,     color: "text-sky-400",      bg: "bg-sky-400/10",     href: "/services/idea-validation-mvp" },
  { icon: ScanSearch,    color: "text-[#A855F7]",    bg: "bg-[#A855F7]/10",   href: "/services/ux-research" },
  { icon: PenTool,       color: "text-emerald-400",  bg: "bg-emerald-400/10", href: "/services/ux-design" },
  { icon: Smartphone,    color: "text-amber-400",    bg: "bg-amber-400/10",   href: "/services/app-prototype" },
  { icon: Monitor,       color: "text-rose-400",     bg: "bg-rose-400/10",    href: "/services/mobile-app-development" },
  { icon: Accessibility, color: "text-violet-400",   bg: "bg-violet-400/10",  href: "/services/ux-accessibility-audit" },
  { icon: Briefcase,     color: "text-orange-400",   bg: "bg-orange-400/10",  href: "/services/software-consultancy" },
  { icon: Users,         color: "text-teal-400",     bg: "bg-teal-400/10",    href: "/services/maintenance-support" },
  { icon: Wrench,        color: "text-slate-400",    bg: "bg-slate-400/10",   href: "/services/localisation" },
  { icon: Languages,     color: "text-cyan-400",     bg: "bg-cyan-400/10",    href: "/services/localisation" },
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
          {servicesMeta.map(({ icon: Icon, color, bg, href }, i) => {
            const item = items[i];
            if (!item) return null;
            return (
              <li key={i}>
                <Link
                  href={href}
                  className="group flex flex-col h-full p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#22D3EE]/60 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                  aria-label={item.title}
                >
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

                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#0E7490] group-hover:text-[#22D3EE] transition-colors">
                    {t("learnMore")}
                    <ArrowRight size={14} aria-hidden="true" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
