import { Globe, ShieldCheck, Lightbulb, TrendingUp, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number; "aria-hidden"?: "true" }>> = {
  Globe,
  ShieldCheck,
  Lightbulb,
  TrendingUp,
  MessageCircle,
};

export default function Stats() {
  const t = useTranslations("stats");
  const heading = t("heading");
  const items = t.raw("items") as Array<{
    value?: string;
    label: string;
    description?: string;
    ariaLabel: string;
    icon?: string;
  }>;

  return (
    <section
      aria-label={t("ariaLabel")}
      className="bg-[#F8FAFC] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {heading && (
          <h2 className="text-xl font-bold text-[#0F172A] text-center mb-10">
            {heading}
          </h2>
        )}
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ value, label, description, ariaLabel, icon }) => {
            const Icon = icon ? iconMap[icon] : null;
            return (
              <div key={label} className="flex flex-col items-start gap-3">
                <dt className="sr-only">{ariaLabel}</dt>
                <dd
                  aria-hidden="true"
                  className="text-[#22D3EE]"
                >
                  {Icon ? (
                    <Icon size={32} strokeWidth={1.75} aria-hidden="true" />
                  ) : (
                    <span className="text-3xl font-extrabold text-[#0F172A]">{value}</span>
                  )}
                </dd>
                <dd
                  aria-hidden="true"
                  className="font-semibold text-[#0F172A] text-sm leading-snug"
                >
                  {label}
                </dd>
                {description && (
                  <dd
                    aria-hidden="true"
                    className="text-xs text-slate-500 leading-relaxed"
                  >
                    {description}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
