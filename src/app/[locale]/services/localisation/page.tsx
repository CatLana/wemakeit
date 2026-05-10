import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getUserCountry, isSwissItalian, isItalian, isUK } from "@/lib/geolocation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/ConsultationForm";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "services/localisation";

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
    en: "App & Website Localisation Services Ireland | We Make IT",
    it: "Servizi di Localizzazione App e Siti Web in Italia | We Make IT",
    ru: "Локализация приложений и сайтов в Ирландии | We Make IT",
  };
  const descriptions: Record<string, string> = {
    en: "Professional app and website localisation for Irish and international businesses. UI, content, and date/currency formatting for any target market.",
    it: "Localizzazione professionale di app e siti web per aziende italiane e internazionali.",
    ru: "Профессиональная локализация приложений и сайтов для ирландских и международных компаний.",
  };
  return {
    title: titles[locale] ?? titles["en"],
    description: descriptions[locale] ?? descriptions["en"],
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
      title: titles[locale] ?? titles["en"],
      description: descriptions[locale] ?? descriptions["en"],
      url: canonicalUrl,
      type: "website",
      siteName: "We Make IT",
      images: [{ url: `${BASE_URL}/api/og`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocalisationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const country = await getUserCountry();
  const isSwiss = isSwissItalian(country);
  const t = await getTranslations();

  const h1 = isSwiss
    ? t("servicePages.localisation.h1.ch")
    : isUK(country)
    ? t("servicePages.localisation.h1.gb")
    : isItalian(country)
    ? t("servicePages.localisation.h1.it")
    : t("servicePages.localisation.h1.ie");

  const whatItems = t.raw("servicePages.localisation.whatItems") as Array<{
    title: string;
    description: string;
  }>;
  const whyItems = t.raw("servicePages.localisation.whyItems") as string[];

  const serviceName =
    locale === "it"
      ? "Localizzazione"
      : locale === "ru"
      ? "Локализация"
      : "Localisation";

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
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
                <li className="text-slate-300" aria-current="page">{t("servicePages.localisation.breadcrumb")}</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#22D3EE]">{h1}</h1>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">{t("servicePages.localisation.desc")}</p>
            <a href="#consultation" className="inline-block px-8 py-3 bg-[#22D3EE] text-slate-950 rounded-lg font-bold hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2">
              {t("servicePages.appDev.ctaSecondary")}
            </a>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#F8FAFC]" aria-labelledby="local-what-heading">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <h2 id="local-what-heading" className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-10">{t("servicePages.localisation.whatHeading")}</h2>
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whatItems.map((item) => (
                <li key={item.title} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-[#0F172A] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why we are different */}
        <section className="py-16 md:py-20 bg-white" aria-labelledby="local-unique-heading">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <h2 id="local-unique-heading" className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">{t("servicePages.localisation.uniqueHeading")}</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">{t("servicePages.localisation.uniqueBody")}</p>
            <h3 className="text-lg font-bold text-[#0F172A] mb-6">{t("servicePages.localisation.whyHeading")}</h3>
            <ul className="flex flex-col gap-4">
              {whyItems.map((item) => (
                <li key={item} className="flex gap-3 items-start text-slate-600">
                  <span className="text-[#22D3EE] font-bold mt-0.5" aria-hidden="true">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <ConsultationForm variant="consultation" serviceName={serviceName} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
