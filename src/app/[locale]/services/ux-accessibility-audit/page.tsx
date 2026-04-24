import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getUserCountry, isSwissItalian, isItalian, isUK } from "@/lib/geolocation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
    },
  };
}

export default async function AccessibilityAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const country = await getUserCountry();
  const isSwiss = isSwissItalian(country);

  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="py-16 md:py-24 bg-slate-950 text-slate-50">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-slate-400">
                <li><Link href="/services" className="text-cyan-400 hover:text-cyan-300">{t("header.nav.whatWeDo")}</Link></li>
                <li>/</li>
                <li className="text-slate-300">{t("servicePages.uxAudit.breadcrumb")}</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
              {isSwiss
                ? t("servicePages.uxAudit.h1.ch")
                : isUK(country)
                ? t("servicePages.uxAudit.h1.gb")
                : isItalian(country)
                ? t("servicePages.uxAudit.h1.it")
                : t("servicePages.uxAudit.h1.ie")}
            </h1>

            <p className="text-lg text-slate-300 mb-8">
              {isSwiss ? t("servicePages.uxAudit.descCh") : t("servicePages.uxAudit.desc")}
            </p>

            <div className="bg-cyan-400/20 border border-cyan-400 p-6 rounded-lg mb-12">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">{t("servicePages.uxAudit.euTitle")}</h2>
              <p className="text-slate-300">
                {t("servicePages.uxAudit.euBody")}
              </p>
            </div>



            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-50 mb-6">{t("servicePages.uxAudit.whatHeading")}</h2>
              <ul className="space-y-3 text-slate-300">
                {([
                  ["📋", "item1"],
                  ["🎯", "item2"],
                  ["💡", "item3"],
                  ["📊", "item4"],
                  ["🔧", "item5"],
                  ["📞", "item6"],
                ] as const).map(([icon, key]) => (
                  <li key={key}>
                    <span aria-hidden="true">{icon} </span>
                    {t(`servicePages.uxAudit.${key}`)}
                  </li>
                ))}
              </ul>
            </div>


            <div className="cta-section text-center">
              <h3 className="text-xl font-bold text-slate-50 mb-4">{t("servicePages.uxAudit.ctaHeading")}</h3>
              <Link href="/contact" className="inline-block px-8 py-3 bg-cyan-400 text-slate-950 rounded-lg font-bold hover:bg-cyan-300">
                {t("servicePages.uxAudit.ctaBtn")}
              </Link>
            </div>
          </div>
        </section>

        {/* JSON-LD Schema for Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "UX & Accessibility Audit",
              description:
                "Professional UX and accessibility audits. WCAG 2.1 AA compliance. Detailed report with remediation plan.",
              provider: {
                "@type": "LocalBusiness",
                name: "We Make IT",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Ashbourne",
                  addressLocality: "Meath",
                  addressRegion: "Ireland",
                  addressCountry: "IE",
                },
                url: BASE_URL,
              },
              areaServed: {
                "@type": "Country",
                name: "Ireland",
              },
              priceRange: "€1,500 - €7,000",
              serviceType: "Accessibility Audit",
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
