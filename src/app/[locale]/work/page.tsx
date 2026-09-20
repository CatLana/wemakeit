import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import WorkCard, { type WorkApp } from "@/components/work/WorkCard";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "work";

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "workPage.metadata",
  });
  const canonicalUrl = `${BASE_URL}/${locale}/${SLUG}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${BASE_URL}/en/${SLUG}`,
        en: `${BASE_URL}/en/${SLUG}`,
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

async function WorkPageContent({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "work" });
  const tPage = await getTranslations({ locale, namespace: "workPage" });
  const apps = t.raw("apps") as WorkApp[];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: tPage("breadcrumbName") },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: apps.map((app, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        url: app.url,
        description: app.description,
        applicationCategory: "WebApplication",
        creator: { "@type": "Organization", name: "We Make IT", url: BASE_URL },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="bg-[#0F172A] text-white pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-300 mb-3">
              {t("eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
              {t("headingPlain")} {t("headingAccent")}
            </h1>
            <p className="text-lg text-cyan-100 mb-6 max-w-2xl">
              {t("subheading")}
            </p>
          </div>
        </section>

        {/* App grid */}
        <section aria-label={tPage("breadcrumbName")} className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.map((app) => (
                <WorkCard
                  key={app.url}
                  app={app}
                  visitCta={t("visitCta")}
                  liveLabel={t("liveLabel")}
                  screenshotComingSoonLabel={t("screenshotComingSoon")}
                />
              ))}
            </ul>
          </div>
        </section>

        {/* CTA to contact */}
        <section className="bg-[#0F172A] py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t("closingHeading")}
            </h2>
            <p className="text-slate-300 text-lg mb-8">{t("closingBody")}</p>
            <Link
              href={{
                pathname: "/",
                query: { service: "consultation" },
                hash: "quote",
              } as never}
              className="inline-flex items-center justify-center min-h-[46px] px-8 bg-[#22D3EE] text-[#0F172A] font-semibold rounded-lg hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              {t("closingCta")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <WorkPageContent locale={locale} />;
}
