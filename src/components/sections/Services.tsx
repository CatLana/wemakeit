import { ArrowRight, LayoutTemplate, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Services() {
  const t = useTranslations("services");
  const categories = t.raw("categories") as Array<{
    title: string;
    description: string;
    href: string;
    previewItems: string[];
    cta: string;
  }>;

  const categoryIcons = [LayoutTemplate, Workflow];

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

        {/* Service categories */}
        <ul
          role="list"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {categories.map((category, i) => {
            const Icon = categoryIcons[i] ?? LayoutTemplate;
            return (
              <li key={i}>
                <Link
                  href={category.href as never}
                  className="group flex flex-col h-full p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#22D3EE]/60 hover:shadow-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                  aria-label={category.title}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#22D3EE]/10 mb-5">
                    <Icon size={24} className="text-[#0E7490]" aria-hidden="true" strokeWidth={1.8} />
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#1E293B] mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    {category.description}
                  </p>

                  <ul className="space-y-2 mb-5" role="list" aria-label={t("servicePreviewLabel", { category: category.title })}>
                    {category.previewItems.map((item) => (
                      <li key={item} className="text-sm text-[#1E293B] leading-relaxed">
                        <span aria-hidden="true" className="mr-2 text-[#0E7490]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#0E7490] group-hover:text-[#22D3EE] transition-colors">
                    {category.cta}
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
