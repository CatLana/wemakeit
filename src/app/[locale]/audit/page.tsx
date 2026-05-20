import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuditRequestForm from "@/components/AuditRequestForm";
import PageScrollReset from "@/components/PageScrollReset";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "audit";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auditExpert" });
  const canonicalUrl = `${BASE_URL}/${locale}/${SLUG}`;
  const keywords = t.raw("keywords") as string[];

  return {
    title: t("title"),
    description: t("subtitle"),
    keywords,
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

export default async function AuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "auditExpert" });

  const processSteps = t.raw("processSteps") as Array<{
    step: string;
    title: string;
    description: string;
  }>;

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
        <PageScrollReset />

        {/* Hero */}
        <section className="bg-[#0F172A] pt-24 pb-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 text-left">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                {t("backToHome")}
              </Link>
            </div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-4">
              Free — No commitment
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
            <div className="mt-8">
              <Link
                href="#request-form"
                className="inline-flex items-center gap-2 rounded-lg bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                Request your free audit
                <CheckCircle2 size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section aria-labelledby="how-it-works-heading" className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
                {t("eyebrow")}
              </span>
              <h2
                id="how-it-works-heading"
                className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] leading-tight"
              >
                {t("howItWorksTitle")}
              </h2>
              <p className="mt-4 text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
                {t("howItWorksIntro")}
              </p>
            </div>

            {/* Numbered timeline */}
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {processSteps.map((step, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#0F172A] text-[#22D3EE] text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B] leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Request Form */}
        <section id="request-form" aria-labelledby="form-heading" className="py-16 lg:py-24 bg-[#F8FAFC]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

              {/* Left — copy + trust signals */}
              <div className="lg:col-span-2">
                <h2
                  id="form-heading"
                  className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] leading-tight"
                >
                  {t("requestFormTitle")}
                </h2>
                <p className="mt-3 text-slate-500 text-base leading-relaxed">
                  {t("requestFormSubtitle")}
                </p>

                <ul className="mt-8 space-y-3" aria-label="What you get">
                  {[
                    "Expert human review — not just automated tools",
                    "Actionable suggestions, not vague advice",
                    "Done within 5 business days",
                    "100% free, no strings attached",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#22D3EE]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — form card */}
              <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <AuditRequestForm />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
