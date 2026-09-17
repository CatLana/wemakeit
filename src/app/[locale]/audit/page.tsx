import type { Metadata } from "next";
import Image from "next/image";
import { Check, TrendingDown, TrendingUp } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import LaunchCountdown from "@/components/LaunchCountdown";
import AuditBuyForm from "@/components/AuditBuyForm";
import AuditAltPaymentForm from "@/components/AuditAltPaymentForm";
import { getAuditPrices, isLaunchPricingActive, AUDIT_LAUNCH_ENDS_AT } from "@/lib/audit-pricing";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "audit";

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auditPage" });
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

function TrendGraphic() {
  return (
    <div
      aria-hidden="true"
      className="flex h-48 w-48 sm:h-56 sm:w-56 shrink-0 items-center justify-center rounded-full bg-[#0F172A]"
    >
      <div className="flex items-end gap-3">
        <TrendDown />
        <TrendUpIcon />
      </div>
    </div>
  );
}

function TrendDown() {
  return (
    <div className="flex flex-col items-center gap-1">
      <TrendingDown size={40} className="text-rose-400" strokeWidth={2} />
      <span className="text-[10px] uppercase tracking-widest text-rose-300 font-semibold">Ignored</span>
    </div>
  );
}

function TrendUpIcon() {
  return (
    <div className="flex flex-col items-center gap-1">
      <TrendingUp size={40} className="text-[#22D3EE]" strokeWidth={2} />
      <span className="text-[10px] uppercase tracking-widest text-cyan-200 font-semibold">Fixed</span>
    </div>
  );
}

export default async function AuditPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ promo?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { promo } = await searchParams;
  const t = await getTranslations({ locale, namespace: "auditPage" });

  const prices = getAuditPrices();
  const launchActive = isLaunchPricingActive();
  const introSteps = t.raw("howItWorks.steps") as string[];
  const websiteFeatures = t.raw("tiers.website.features") as string[];
  const bundleFeatures = t.raw("tiers.bundle.features") as string[];
  const reassurancePoints = t.raw("reassurance.points") as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website & Digital Presence Audit",
    provider: { "@type": "Organization", name: "We Make IT", url: BASE_URL },
    areaServed: ["IE", "EU"],
    offers: [
      { "@type": "Offer", name: "Website audit", price: String(prices.website), priceCurrency: "EUR" },
      { "@type": "Offer", name: "Website + social bundle", price: String(prices.bundle), priceCurrency: "EUR" },
    ],
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
          </div>
        </div>

        {/* Something feels off */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-4">
                  {t("intro.heading")}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">{t("intro.body")}</p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src="/images/business-owner-looking-at-their-website.jpg"
                  alt={t("intro.imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-[#F8FAFC] py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-8 text-center">
              {t("howItWorks.heading")}
            </h2>
            <ol className="space-y-4">
              {introSteps.map((step, i) => (
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

        {/* Why now */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-10 text-center">
              {t("whyNow.heading")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#1E293B] mb-2">{t("whyNow.worthItHeading")}</h3>
                  <p className="text-slate-600 leading-relaxed">{t("whyNow.worthItBody")}</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B] mb-2">{t("whyNow.costHeading")}</h3>
                  <p className="text-slate-600 leading-relaxed">{t("whyNow.costBody")}</p>
                </div>
              </div>
              <div className="flex justify-center">
                <TrendGraphic />
              </div>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section id="buy" className="bg-[#0F172A] py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 text-center">
              {t("tiers.heading")}
            </h2>
            {launchActive && (
              <div className="flex justify-center mb-8">
                <LaunchCountdown endsAt={AUDIT_LAUNCH_ENDS_AT} label={t("tiers.launchBadge")} />
              </div>
            )}
            {promo && (
              <p className="text-center text-sm text-[#22D3EE] mb-8">{t("tiers.promoApplied")}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white p-8 flex flex-col">
                <h3 className="text-lg font-bold text-[#1E293B]">{t("tiers.website.name")}</h3>
                <p className="text-sm text-slate-500 mt-2 mb-4">{t("tiers.website.description")}</p>
                <p className="text-3xl font-extrabold text-[#1E293B] mb-4">€{prices.website}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {websiteFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-[#0E7490] mt-0.5 shrink-0" aria-hidden="true" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <AuditBuyForm
                  tier="website"
                  promo={promo}
                  buyLabel={t("tiers.buyCta")}
                  agreeLabel={t("tiers.agreeLabel")}
                  termsLinkLabel={t("tiers.termsLinkLabel")}
                  deliveryNotice={t("tiers.deliveryNotice")}
                  buttonClassName="w-full inline-flex items-center justify-center min-h-[50px] px-6 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                />
              </div>

              <div className="rounded-2xl bg-white p-8 flex flex-col border-2 border-[#22D3EE]">
                <h3 className="text-lg font-bold text-[#1E293B]">{t("tiers.bundle.name")}</h3>
                <p className="text-sm text-slate-500 mt-2 mb-4">{t("tiers.bundle.description")}</p>
                <p className="text-3xl font-extrabold text-[#1E293B] mb-4">€{prices.bundle}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {bundleFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-[#0E7490] mt-0.5 shrink-0" aria-hidden="true" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <AuditBuyForm
                  tier="bundle"
                  promo={promo}
                  buyLabel={t("tiers.buyCta")}
                  agreeLabel={t("tiers.agreeLabel")}
                  termsLinkLabel={t("tiers.termsLinkLabel")}
                  deliveryNotice={t("tiers.deliveryNotice")}
                  buttonClassName="w-full inline-flex items-center justify-center min-h-[50px] px-6 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                />
              </div>
            </div>

            <AuditAltPaymentForm defaultTier="website" />
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
            <p className="mt-8 text-sm text-slate-500">
              {t("bookBridge.text")}{" "}
              <Link
                href="/discovery-call"
                className="text-[#0E7490] font-semibold hover:text-[#22D3EE] hover:underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                {t("bookBridge.cta")}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
