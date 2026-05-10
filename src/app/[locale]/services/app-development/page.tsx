import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getUserCountry, isSwissItalian, isItalian, isUK } from "@/lib/geolocation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/ConsultationForm";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "services/app-development";

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
    en: "App Development in Ireland | Custom Mobile & Web Apps | We Make IT",
    it: "Sviluppo App in Italia | App Mobile Personalizzate | We Make IT",
    ru: "Разработка приложений в Ирландии | Пользовательские приложения | We Make IT",
  };

  const descriptions: Record<string, string> = {
    en: "Custom app development services in Ireland. iOS, Android, PWA, and web applications. MVP to full product. Fixed pricing, 15+ years experience.",
    it: "Servizi di sviluppo app personalizzati in Italia. App iOS, Android, PWA e applicazioni web. Dall'MVP al prodotto completo.",
    ru: "Услуги разработки приложений в Ирландии. iOS, Android, PWA и веб-приложения. От MVP до полного продукта.",
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

export default async function AppDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const country = await getUserCountry();
  const isSwiss = isSwissItalian(country);
  const t = await getTranslations();

  const geoH1 = isSwiss
    ? t("servicePages.appDev.h1.ch")
    : isUK(country)
    ? t("servicePages.appDev.h1.gb")
    : isItalian(country)
    ? t("servicePages.appDev.h1.it")
    : t("servicePages.appDev.h1.ie");

  const geoDesc = isSwiss
    ? t("servicePages.appDev.desc.ch")
    : isUK(country)
    ? t("servicePages.appDev.desc.gb")
    : isItalian(country)
    ? t("servicePages.appDev.desc.it")
    : t("servicePages.appDev.desc.ie");

  const whatWeDo = t.raw("servicePages.appDev.whatWeDo") as Array<{
    title: string;
    description: string;
  }>;
  const why = t.raw("servicePages.appDev.why") as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  const serviceName =
    locale === "it"
      ? "Sviluppo App"
      : locale === "ru"
      ? "Разработка приложений"
      : "App Development";

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
                  <Link
                    href="/services"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    {t("header.nav.whatWeDo")}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-slate-300" aria-current="page">
                  {t("servicePages.appDev.breadcrumb")}
                </li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#22D3EE]">
              {geoH1}
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
              {geoDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-[#22D3EE] text-slate-950 rounded-lg font-bold hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                {t("servicePages.appDev.ctaPrimary")}
              </Link>
              <a
                href="#consultation"
                className="inline-block px-8 py-3 border border-[#22D3EE] text-[#22D3EE] rounded-lg font-bold hover:bg-[#22D3EE]/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                {t("servicePages.appDev.ctaSecondary")}
              </a>
            </div>
          </div>
        </section>

        {/* What We Build */}
        <section className="py-16 md:py-20 bg-[#F8FAFC]" aria-labelledby="appdev-what-heading">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <h2 id="appdev-what-heading" className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3">
              {t("servicePages.appDev.whatWeDoHeading")}
            </h2>
            <p className="text-slate-500 mb-10">{t("servicePages.appDev.whatWeDoSub")}</p>
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatWeDo.map((item) => (
                <li key={item.title} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-[#0F172A] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-20 bg-white" aria-labelledby="appdev-why-heading">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <h2 id="appdev-why-heading" className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-10">
              {t("servicePages.appDev.whyHeading")}
            </h2>
            <ol className="flex flex-col gap-8">
              {why.map((item) => (
                <li key={item.number} className="flex gap-6 items-start">
                  <span className="flex-shrink-0 text-[#22D3EE] font-extrabold text-xl leading-none pt-0.5" aria-hidden="true">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Consultation Form */}
        <section className="py-16 md:py-20 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <ConsultationForm variant="consultation" serviceName={serviceName} />
          </div>
        </section>
      </main>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "App Development in Ireland",
            description: "Custom app development services in Ireland. iOS, Android, PWA, and web applications. MVP to full product.",
            provider: {
              "@type": "LocalBusiness",
              name: "We Make IT",
              address: { "@type": "PostalAddress", streetAddress: "Ashbourne", addressLocality: "Meath", addressRegion: "Ireland", addressCountry: "IE" },
              url: BASE_URL,
            },
            areaServed: { "@type": "Country", name: "Ireland" },
            priceRange: "€15,000 - €80,000+",
            serviceType: "App Development",
          }),
        }}
      />

      <Footer />
    </>
  );
}
