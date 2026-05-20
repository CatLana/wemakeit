import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";

const BriefForm = dynamic(() => import("@/components/BriefForm"));

const BASE_URL = "https://www.wemakeit.ie";

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectBrief" });
  const canonicalUrl = `${BASE_URL}/${locale}/project-brief`;

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ProjectBriefPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projectBrief" });

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-[#F8FAFC]">
        {/* Page hero */}
        <div className="bg-[#0F172A] pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
              <Link
                href="/"
                className="hover:text-slate-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-400">{t("eyebrow")}</span>
            </div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              {t("eyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              {t("heading")}
            </h1>
            <p className="text-slate-400 text-base leading-relaxed mb-2">{t("subheading")}</p>
            <p className="text-slate-500 text-sm">{t("intro")}</p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 rounded-xl" />}>
              <BriefForm />
            </Suspense>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Not ready to fill this in yet?{" "}
            <Link
              href="/#quote"
              className="text-[#0E7490] underline underline-offset-2 hover:text-[#0891B2] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              Go back to the short quote form
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
