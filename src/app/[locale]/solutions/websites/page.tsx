import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuditBanner from "@/components/sections/AuditBanner";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "solutions/websites";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionsWebsitesPage.metadata" });
  const canonicalUrl = `${BASE_URL}/${locale}/${SLUG}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${BASE_URL}/en/${SLUG}`,
        en: `${BASE_URL}/en/${SLUG}`,
        it: `${BASE_URL}/it/${SLUG}`,
        ru: `${BASE_URL}/ru/${SLUG}`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalUrl,
      siteName: "We Make IT",
      type: "website",
      images: [{ url: `${BASE_URL}/images/wemakeit_thumbnail.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function WebsitesSolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "solutionsWebsitesPage" });
  const services = t.raw("services") as Array<{ name: string; detail: string }>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("schemaName"),
    provider: { "@type": "Organization", name: "We Make IT", url: BASE_URL },
    areaServed: ["IE", "IT", "CH", "RU", "EU"],
  };

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-[#0F172A] text-white pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-300 mb-3">
              {t("eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">{t("heading")}</h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-4xl">{t("subheading")}</p>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-6">{t("servicesHeading")}</h2>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <li key={service.name} className="rounded-xl border border-slate-200 p-5 bg-[#F8FAFC]">
                  <h3 className="font-semibold text-[#1E293B] mb-2">{service.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{service.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white pb-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8 text-center">
              <h2 className="text-2xl font-bold text-[#1E293B] mb-3">{t("finalCtaHeading")}</h2>
              <p className="text-slate-600 leading-relaxed mb-6">{t("finalCtaBody")}</p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[46px] px-6 bg-[#0F172A] text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                {t("finalCta")}
              </Link>
            </div>
          </div>
        </section>

        <AuditBanner />
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
