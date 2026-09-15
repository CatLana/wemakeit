import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "social";

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "socialPage" });
  const canonicalUrl = `${BASE_URL}/${locale}/${SLUG}`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: canonicalUrl,
      siteName: "We Make IT",
      type: "website",
      images: [{ url: `${BASE_URL}/images/wemakeit_thumbnail.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function SocialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "socialPage" });

  const steps = t.raw("howItWorks.steps") as string[];
  const plans = t.raw("tiers.plans") as Array<{
    name: string;
    priceRange: string;
    description: string;
    features: string[];
    highlighted: boolean;
  }>;
  const addOns = t.raw("addOns.items") as Array<{ name: string; price: string; description: string }>;
  const reassurancePoints = t.raw("reassurance.points") as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Social Media Management",
    provider: { "@type": "Organization", name: "We Make IT", url: BASE_URL },
    areaServed: ["IE", "EU"],
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      priceCurrency: "EUR",
      description: plan.priceRange,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-[#F8FAFC]">
        {/* Hero */}
        <div className="bg-[#0F172A] pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              {t("eyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{t("heading")}</h1>
            <p className="mt-3 text-slate-400 text-base max-w-xl">{t("body")}</p>
            <a
              href="#pricing"
              className="mt-6 inline-flex items-center justify-center gap-2 min-h-[50px] px-7 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              {t("heroCta")}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* How it works */}
        <section className="bg-[#F8FAFC] py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-8 text-center">
              {t("howItWorks.heading")}
            </h2>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-[#22D3EE] font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-[#0F172A] py-16 lg:py-20 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 text-center">
              {t("tiers.heading")}
            </h2>
            <p className="text-slate-400 text-center mb-10">{t("tiers.subheading")}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl bg-white p-8 flex flex-col ${plan.highlighted ? "border-2 border-[#22D3EE] md:-translate-y-2" : ""}`}
                >
                  {plan.highlighted && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-2">
                      {t("tiers.popularBadge")}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-[#1E293B]">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mt-2 mb-4">{plan.description}</p>
                  <p className="mb-6">
                    <span className="text-2xl font-extrabold text-[#1E293B]">{plan.priceRange}</span>
                    <span className="text-slate-500 ml-1">{t("tiers.perMonth")}</span>
                  </p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check size={14} className="text-[#0E7490] mt-0.5 shrink-0" aria-hidden="true" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/brief/social"
                    className={`w-full inline-flex items-center justify-center gap-2 min-h-[50px] px-6 font-bold rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      plan.highlighted
                        ? "bg-[#22D3EE] text-[#0F172A] hover:bg-cyan-300 focus-visible:outline-white"
                        : "bg-[#0F172A] text-white hover:bg-slate-800 focus-visible:outline-[#22D3EE]"
                    }`}
                  >
                    {t("tiers.ctaLabel")}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Add-ons */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#22D3EE] mb-4 text-center">
                {t("addOns.heading")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addOns.map((addOn) => (
                  <div key={addOn.name} className="rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-white">{addOn.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{addOn.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#22D3EE] shrink-0">{addOn.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-extrabold text-[#1E293B] mb-6">{t("reassurance.heading")}</h2>
            <ul role="list" className="space-y-3 inline-block text-left">
              {reassurancePoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check size={16} className="text-[#0E7490] mt-1 shrink-0" aria-hidden="true" strokeWidth={2.5} />
                  <p className="text-slate-600 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-slate-500">{t("bookBridge.text")}</p>
            <p className="mt-4">
              <Link
                href="/brief/social"
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                {t("bookBridge.cta")}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
