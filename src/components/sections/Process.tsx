import { useTranslations } from "next-intl";

export default function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Array<{ number: string; title: string; description: string }>;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-[#F8FAFC] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
            {t("eyebrow")}
          </span>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight"
          >
            {t("headingLine1")}{" "}
            <span className="text-[#0F172A]">{t("headingLine2")}</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            {t("subheading")}
          </p>
        </div>

        {/* Steps */}
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map(({ number, title, description }, index) => (
            <li key={number} className="relative flex flex-col">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute top-6 left-[calc(100%_-_1rem)] w-full h-px bg-slate-200 z-0"
                  style={{ left: "calc(100% - 12px)", width: "calc(100% - 12px)" }}
                />
              )}

              {/* Step number */}
              <div aria-hidden="true" className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#0F172A] text-[#22D3EE] font-extrabold text-sm mb-5 shrink-0">
                {number}
              </div>

              <h3 className="text-base font-bold text-[#1E293B] mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#quote"
            className="inline-flex items-center justify-center min-h-[52px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
          >
            {t("cta")}
            <span aria-hidden="true" className="ml-2">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
