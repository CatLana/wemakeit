import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getUserCountry, isSwissItalian, isItalian, isUK } from "@/lib/geolocation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "services/web-development";

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
    en: "Web Development in Ireland | Custom Business Websites | We Make IT",
    it: "Sviluppo Web in Italia | Siti Web Personalizzati | We Make IT",
    ru: "Веб-разработка в Ирландии | Пользовательские сайты | We Make IT",
  };

  const descriptions: Record<string, string> = {
    en: "Professional web development services in Ireland. Custom business websites, CMS platforms, and e-commerce solutions. 15+ years experience, fixed pricing, no surprises.",
    it: "Servizi di sviluppo web professionali in Italia. Siti web aziendali personalizzati, piattaforme CMS e soluzioni e-commerce. Oltre 15 anni di esperienza.",
    ru: "Профессиональные услуги веб-разработки в Ирландии. Пользовательские веб-сайты, платформы CMS и решения электронной коммерции.",
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

export default async function WebDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const country = await getUserCountry();
  const isSwiss = isSwissItalian(country);

  setRequestLocale(locale);
  const t = await getTranslations();

  const whatWeDo = t.raw("servicePages.webDev.whatWeDo") as Array<{ title: string; description: string }>;
  const why = t.raw("servicePages.webDev.why") as Array<{ title: string; description: string }>;
  const deliverables = t.raw("servicePages.webDev.deliverables") as string[];

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>

        {/* Hero */}
        <section className="py-16 md:py-24 bg-slate-950 text-slate-50">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-slate-400">
                <li><Link href="/services" className="text-cyan-400 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">{t("header.nav.whatWeDo")}</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-slate-300">{t("servicePages.webDev.breadcrumb")}</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">
              {isSwiss
                ? t("servicePages.webDev.h1.ch")
                : isUK(country)
                ? t("servicePages.webDev.h1.gb")
                : isItalian(country)
                ? t("servicePages.webDev.h1.it")
                : t("servicePages.webDev.h1.ie")}
            </h1>

            <p className="text-lg text-slate-300 mb-6">
              {isSwiss
                ? t("servicePages.webDev.desc.ch")
                : isUK(country)
                ? t("servicePages.webDev.desc.gb")
                : isItalian(country)
                ? t("servicePages.webDev.desc.it")
                : t("servicePages.webDev.desc.ie")}
            </p>

            <p className="text-base text-slate-400 mb-10">
              {isSwiss
                ? t("servicePages.intro.ch")
                : isUK(country)
                ? t("servicePages.intro.gb")
                : isItalian(country)
                ? t("servicePages.intro.it")
                : t("servicePages.intro.ie")}
              {" "}{t("servicePages.intro.suffixWebDev")}
            </p>

            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-cyan-400 text-slate-950 rounded-lg font-bold hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {t("hero.cta1")}
            </Link>
          </div>
        </section>

        {/* What We Build */}
        <section className="py-16 md:py-20 bg-[#F8FAFC]" aria-labelledby="web-what-heading">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="max-w-2xl mb-12">
              <h2 id="web-what-heading" className="text-3xl font-bold text-[#1E293B] mb-3">
                {t("servicePages.webDev.whatWeDoHeading")}
              </h2>
              <p className="text-slate-500 text-lg">{t("servicePages.webDev.whatWeDoSub")}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatWeDo.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#22D3EE]/50 hover:shadow-md transition-all duration-200"
                >
                  <h3 className="text-base font-bold text-[#1E293B] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-20 bg-slate-900 text-slate-50" aria-labelledby="web-why-heading">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <h2 id="web-why-heading" className="text-3xl font-bold text-slate-50 mb-10">
              {t("servicePages.webDev.whyHeading")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {why.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center">
                    <span className="text-[#22D3EE] font-bold text-sm" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-50 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get + Final CTA */}
        <section className="py-16 md:py-20 bg-[#F8FAFC]" aria-labelledby="web-deliverables-heading">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <h2 id="web-deliverables-heading" className="text-3xl font-bold text-[#1E293B] mb-8">
              {t("servicePages.webDev.deliverablesHeading")}
            </h2>
            <ul className="space-y-3 mb-16" role="list">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#22D3EE]/20 flex items-center justify-center" aria-hidden="true">
                    <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-slate-950 rounded-2xl p-8 md:p-10 text-center">
              <h3 className="text-2xl font-bold text-slate-50 mb-3">
                {t("servicePages.webDev.finalCtaHeading")}
              </h3>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                {t("servicePages.webDev.finalCtaBody")}
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-cyan-400 text-slate-950 rounded-lg font-bold hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                {t("servicePages.webDev.finalCtaBtn")}
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
              name: "Web Development in Ireland",
              description:
                "Professional web development services for Irish businesses. Custom websites, CMS platforms, and e-commerce solutions.",
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
                telephone: "+353",
                url: BASE_URL,
              },
              areaServed: {
                "@type": "Country",
                name: "Ireland",
              },
              priceRange: "€2,500 - €18,000+",
              serviceType: "Web Development",
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}


