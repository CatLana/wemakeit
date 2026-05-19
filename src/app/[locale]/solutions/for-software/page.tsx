import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "solutions/for-software";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "valuePropSoftwarePage.metadata" });
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
      images: [{ url: `${BASE_URL}/api/og`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ValuePropSoftwarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "valuePropSoftwarePage" });
  const points = t.raw("points") as string[];

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-[#F8FAFC] pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
              {t("eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1E293B] mb-6">
              {t("headingLine1")}
              <br />
              <span className="text-[#0F172A]">{t("headingLine2")}</span>
            </h1>
            <p className="text-slate-700 text-lg leading-relaxed mb-7">{t("subheading")}</p>

            <ul role="list" className="space-y-3 mb-9">
              {points.map((point) => (
                <li key={point} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How It Works section (Process) */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
              {t("process.eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-6">
              {t("process.title")}
              <br />
              <span className="text-[#0F172A]">{t("process.titleAccent")}</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg leading-relaxed mb-10">
              {t("process.subheading")}
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {(t.raw("process.steps") as unknown[]).map((step) => {
                const { number, title, description } = step as { number: string; title: string; description: string };
                return (
                <li key={number} className="relative flex flex-col">
                  <div aria-hidden="true" className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#0F172A] text-[#22D3EE] font-extrabold text-sm mb-5 shrink-0">
                    {number}
                  </div>
                  <h3 className="text-base font-bold text-[#1E293B] mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* CTA for quote form */}
        <section className="bg-[#0F172A] p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">{t("finalCtaHeading")}</h2>
          <p className="text-slate-300 leading-relaxed mb-6">{t("finalCtaBody")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[46px] px-6 bg-[#22D3EE] text-[#0F172A] font-semibold rounded-lg hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            {t("finalCta")}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
