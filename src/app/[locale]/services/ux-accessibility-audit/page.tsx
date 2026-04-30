import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getUserCountry, isSwissItalian, isItalian, isUK } from "@/lib/geolocation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/ConsultationForm";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "services/ux-accessibility-audit";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `${BASE_URL}/${locale}/${SLUG}`;

  const titles: Record<string, string> = {
    en: "UX & Accessibility Audit Ireland | WCAG Compliance | We Make IT",
    it: "Audit UX & Accessibilità in Italia | Conformità WCAG | We Make IT",
    ru: "Аудит UX и Доступности в Ирландии | Соответствие WCAG | We Make IT",
  };

  const descriptions: Record<string, string> = {
    en: "Professional UX and accessibility audits for Irish websites and apps. WCAG 2.1 AA compliance. EU Accessibility Act compliant. Detailed report + remediation plan.",
    it: "Audit UX e accessibilità professionali per siti e app. Conformità WCAG 2.1 AA. Relazione dettagliata e piano di correzione.",
    ru: "Профессиональные аудиты UX и доступности. Соответствие WCAG 2.1 AA. Детальный отчет и план исправлений.",
  };

  return {
    title: titles[locale] || titles["en"],
    description: descriptions[locale] || descriptions["en"],
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
      title: titles[locale] || titles["en"],
      description: descriptions[locale] || descriptions["en"],
      url: canonicalUrl,
      type: "website",
      siteName: "We Make IT",
      images: [{ url: `${BASE_URL}/api/og`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function AccessibilityAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const country = await getUserCountry();
  const isSwiss = isSwissItalian(country);
  const t = await getTranslations();

  const whatItems = (["item1", "item2", "item3", "item4", "item5", "item6"] as const).map(
    (key) => t(`servicePages.uxAudit.${key}`)
  );

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="py-16 md:py-24 bg-slate-950 text-slate-50">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-slate-400">
                <li>
                  <Link href="/services" className="text-cyan-400 hover:text-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                    {t("header.nav.whatWeDo")}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-slate-300" aria-current="page">{t("servicePages.uxAudit.breadcrumb")}</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#22D3EE]">
              {isSwiss
                ? t("servicePages.uxAudit.h1.ch")
                : isUK(country)
                ? t("servicePages.uxAudit.h1.gb")
                : isItalian(country)
                ? t("servicePages.uxAudit.h1.it")
                : t("servicePages.uxAudit.h1.ie")}
            </h1>

            <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
              {isSwiss ? t("servicePages.uxAudit.descCh") : t("servicePages.uxAudit.desc")}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#consultation" className="inline-block px-8 py-3 bg-[#22D3EE] text-slate-950 rounded-lg font-bold hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2">
                {t("servicePages.uxAudit.consultationAnchor")}
              </a>
              <Link href="/contact" className="inline-block px-8 py-3 border border-[#22D3EE] text-[#22D3EE] rounded-lg font-bold hover:bg-[#22D3EE]/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2">
                {t("servicePages.uxAudit.ctaBtn")}
              </Link>
            </div>
          </div>
        </section>

        {/* EU Accessibility Act callout */}
        <section className="py-10 bg-[#0F172A]" aria-labelledby="audit-eu-heading">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="border border-[#22D3EE]/40 rounded-xl p-6">
              <h2 id="audit-eu-heading" className="text-lg font-bold text-[#22D3EE] mb-2">{t("servicePages.uxAudit.euTitle")}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{t("servicePages.uxAudit.euBody")}</p>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16 md:py-20 bg-[#F8FAFC]" aria-labelledby="audit-what-heading">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <h2 id="audit-what-heading" className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-10">{t("servicePages.uxAudit.whatHeading")}</h2>
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatItems.map((item) => (
                <li key={item} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Consultation Form */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <ConsultationForm variant="audit" serviceName="UX & Accessibility Audit" />
          </div>
        </section>
      </main>

      {/* JSON-LD Schema for Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "UX & Accessibility Audit",
            description: "Professional UX and accessibility audits. WCAG 2.1 AA compliance. Detailed report with remediation plan.",
            provider: {
              "@type": "LocalBusiness",
              name: "We Make IT",
              address: { "@type": "PostalAddress", streetAddress: "Ashbourne", addressLocality: "Meath", addressRegion: "Ireland", addressCountry: "IE" },
              url: BASE_URL,
            },
            areaServed: { "@type": "Country", name: "Ireland" },
            priceRange: "€1,500 - €7,000",
            serviceType: "Accessibility Audit",
          }),
        }}
      />

      <Footer />
    </>
  );
}
