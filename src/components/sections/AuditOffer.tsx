import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getAuditPrices } from "@/lib/audit-pricing";

export default function AuditOffer() {
  const t = useTranslations("auditOffer");
  const features = t.raw("features") as string[];
  const prices = getAuditPrices();

  return (
    <section
      aria-labelledby="audit-offer-heading"
      className="bg-[#0F172A] py-20 lg:py-28"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
          {t("eyebrow")}
        </span>
        <h2
          id="audit-offer-heading"
          className="text-3xl sm:text-4xl font-extrabold text-white leading-tight"
        >
          {t("heading")}
        </h2>
        <p className="mt-4 text-slate-400 text-lg leading-relaxed">
          {t("body")}
        </p>

        <div className="mt-10 rounded-2xl bg-white p-8 sm:p-10 text-left">
          <ul role="list" className="space-y-3 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-slate-700">
                <Check size={16} className="text-[#0E7490] mt-1 shrink-0" aria-hidden="true" strokeWidth={2.5} />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-3xl font-extrabold text-[#1E293B]">
              <span className="text-base font-semibold text-slate-500 mr-1">{t("priceLabel")}</span>
              €{prices.website}
            </p>
            <Link
              href="/audit"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[52px] px-8 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {t("cta")}
            </Link>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          {t("bridgeText")}{" "}
          <Link
            href="/discovery-call"
            className="text-[#22D3EE] font-semibold hover:underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
          >
            {t("bridgeCta")}
          </Link>
        </p>
      </div>
    </section>
  );
}
