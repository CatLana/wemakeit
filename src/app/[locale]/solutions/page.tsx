import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "solutions";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutionsGeneralPage.metadata" });
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

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "solutionsGeneralPage" });

  const cards = t.raw("cards") as Array<{
    title: string;
    body: string;
    cta: string;
    href: string;
  }>;

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-[#0F172A] text-white pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-300 mb-3">
              {t("eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">{t("heading")}</h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">{t("subheading")}</p>
          </div>
        </section>

        <section className="bg-[#F8FAFC] py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card) => (
                <article key={card.href} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#1E293B] mb-3">{card.title}</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">{card.body}</p>
                  <Link
                    href={card.href as never}
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 bg-[#22D3EE] text-[#0F172A] font-semibold rounded-lg hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                  >
                    {card.cta}
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center">
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
      </main>
      <Footer />
    </>
  );
}
