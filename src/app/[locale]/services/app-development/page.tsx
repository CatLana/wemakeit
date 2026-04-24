import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getUserCountry, isSwissItalian, isItalian, isUK } from "@/lib/geolocation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
    },
  };
}

export default async function AppDevelopmentPage({
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
                <li className="text-slate-300">{t("servicePages.appDev.breadcrumb")}</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
              {isSwiss
                ? t("servicePages.appDev.h1.ch")
                : isUK(country)
                ? t("servicePages.appDev.h1.gb")
                : isItalian(country)
                ? t("servicePages.appDev.h1.it")
                : t("servicePages.appDev.h1.ie")}
            </h1>

            <p className="text-lg text-slate-300 mb-8">
              {isSwiss
                ? t("servicePages.appDev.desc.ch")
                : isUK(country)
                ? t("servicePages.appDev.desc.gb")
                : isItalian(country)
                ? t("servicePages.appDev.desc.it")
                : t("servicePages.appDev.desc.ie")}
            </p>

            <p className="text-base text-slate-400 mb-12">
              {isSwiss
                ? t("servicePages.intro.ch")
                : isUK(country)
                ? t("servicePages.intro.gb")
                : isItalian(country)
                ? t("servicePages.intro.it")
                : t("servicePages.intro.ie")}
              {' '}{t("servicePages.intro.suffixAppDev")}
            </p>

            <div className="cta-section text-center">
              <h3 className="text-xl font-bold text-slate-50 mb-4">{t("servicePages.appDev.ctaHeading")}</h3>
              <Link href="/contact" className="inline-block px-8 py-3 bg-cyan-400 text-slate-950 rounded-lg font-bold hover:bg-cyan-300">
                {t("hero.cta1")} {/* "Tell us your idea" */}
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
              name: "App Development in Ireland",
              description:
                "Custom app development services in Ireland. iOS, Android, PWA, and web applications. MVP to full product.",
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
              priceRange: "€15,000 - €80,000+",
              serviceType: "App Development",
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
