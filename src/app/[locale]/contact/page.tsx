import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSimpleForm from "@/components/ContactSimpleForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-[#F8FAFC]">
        {/* Page hero */}
        <div className="bg-[#0F172A] pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              {t("eyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {t("heading")}
            </h1>
            <p className="mt-3 text-slate-400 text-sm">{t("body")}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: map + location */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="text-base font-bold text-[#1E293B] mb-4">
                  {t("locationHeading")}
                </h2>
                <div
                  className="rounded-xl overflow-hidden border border-slate-200 shadow-sm"
                  aria-label={t("mapLabel")}
                >
                  <iframe
                    title={t("mapLabel")}
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-6.560%2C53.495%2C-6.430%2C53.538&layer=mapnik"
                    width="100%"
                    height="300"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-500 flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-[#22D3EE] shrink-0"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {t("locationText")}
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3 rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
              <Suspense fallback={null}>
                <ContactSimpleForm />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
