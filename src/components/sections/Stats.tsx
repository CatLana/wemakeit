import { useTranslations } from "next-intl";

export default function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as Array<{
    value: string;
    label: string;
    ariaLabel: string;
  }>;

  return (
    <section
      aria-label={t("ariaLabel")}
      className="bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {items.map(({ value, label, ariaLabel }) => (
            <div key={label} className="flex flex-col items-center">
              <dt className="sr-only">{ariaLabel}</dt>
              <dd
                aria-hidden="true"
                className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight"
              >
                {value}
              </dd>
              <dd
                aria-hidden="true"
                className="mt-2 text-sm text-slate-500 leading-snug"
              >
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
