import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "audit/automated";

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "audit" });
  const canonicalUrl = `${BASE_URL}/${locale}/${SLUG}`;

  return {
    title: t("title"),
    description: t("subtitle"),
    keywords: t.raw("seoKeywords") as string[],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${BASE_URL}/en/${SLUG}`,
        en: `${BASE_URL}/en/${SLUG}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      url: canonicalUrl,
      siteName: "We Make IT",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/wemakeit_thumbnail.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("subtitle"),
      images: [`${BASE_URL}/images/wemakeit_thumbnail.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function AuditAutomatedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "audit" });

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
        {/* Hero */}
        <section className="bg-[#0F172A] pt-24 pb-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-5 text-left">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                {t("backToHome")}
              </Link>
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#22D3EE]">
                <Zap size={12} aria-hidden="true" />
                {t("eyebrow")}
              </span>
              <span className="inline-flex items-center rounded-full border border-[#22D3EE]/40 bg-[#22D3EE]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#22D3EE]">
                {t("betaLabel")}
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* URL input form - Automated Audit Tool */}
        <section className="py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <form
              action={`/${locale}/audit/results`}
              method="GET"
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <label
                htmlFor="audit-url"
                className="block text-sm font-semibold text-[#1E293B]"
              >
                {t("urlLabel")}
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="audit-url"
                  name="url"
                  type="url"
                  required
                  placeholder={t("urlPlaceholder")}
                  defaultValue="https://"
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#1E293B] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  {t("submitBtn")}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {t("exampleLabel")}:{" "}
                <span className="font-mono text-slate-500">{t("exampleUrl")}</span>
              </p>
            </form>

            {/* Limitations notice */}
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-800">
                {t("limitationsTitle")}
              </p>
              <p className="mt-1 text-sm leading-6 text-amber-700">
                {t("limitationsBody")}
              </p>
            </div>
          </div>
        </section>

        {/* CTA to expert audit */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              {t("ctaBody")}
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {t("ctaBtn")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
