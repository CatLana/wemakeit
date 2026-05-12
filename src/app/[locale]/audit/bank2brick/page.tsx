import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, BadgeCheck, Download, ShieldAlert, Sparkles, TimerReset } from "lucide-react";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "audit/bank2brick";
const REPORT_DATE = "2026-05-12";

interface SectionItem {
  title: string;
  body: string;
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "clientAuditReports.bank2brick.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/${SLUG}`,
      languages: {
        en: `${BASE_URL}/en/${SLUG}`,
        it: `${BASE_URL}/it/${SLUG}`,
        ru: `${BASE_URL}/ru/${SLUG}`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/${SLUG}`,
      siteName: "We Make IT",
      images: [{ url: `${BASE_URL}/api/og`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Bank2BrickAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "clientAuditReports.bank2brick" });
  const strengths = t.raw("strengths") as SectionItem[];
  const severe = t.raw("severe") as SectionItem[];
  const recommended = t.raw("recommended") as SectionItem[];
  const pdfHref = `/reports/bank2brick-audit-${locale}-${REPORT_DATE}.pdf`;

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-[#0F172A] pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#22D3EE]">
            {t("eyebrow")}
          </span>
          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                {t("reviewedLabel")}
              </p>
              <p className="mt-2 text-sm text-white">{t("reviewedValue")}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                {t("visibilityLabel")}
              </p>
              <p className="mt-2 text-sm text-white">{t("visibilityValue")}</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-amber-400/25 bg-amber-400/10 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">{t("reviewNoteTitle")}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              {t("reviewNoteBody")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_1fr_1fr]">
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-emerald-600" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    {t("positiveBadge")}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#1E293B]">{t("strengthsTitle")}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{t("strengthsIntro")}</p>
              <div className="mt-6 space-y-4">
                {strengths.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-emerald-200 bg-white p-5">
                    <h3 className="text-lg font-bold text-[#1E293B]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-rose-600" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">
                    {t("severeBadge")}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#1E293B]">{t("severeTitle")}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{t("severeIntro")}</p>
              <div className="mt-6 space-y-4">
                {severe.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-rose-200 bg-white p-5">
                    <h3 className="text-lg font-bold text-[#1E293B]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Sparkles className="text-cyan-700" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">
                    {t("recommendedBadge")}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#1E293B]">{t("recommendedTitle")}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{t("recommendedIntro")}</p>
              <div className="mt-6 space-y-4">
                {recommended.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-cyan-200 bg-white p-5">
                    <h3 className="text-lg font-bold text-[#1E293B]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0F172A] p-8 text-white sm:p-10">
            <h2 className="text-3xl font-extrabold">{t("ctaTitle")}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{t("ctaBody")}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                {t("primaryCta")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href={pdfHref}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                {t("downloadCta")}
                <Download size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                  {t("downloadTitle")}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{t("downloadBody")}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <TimerReset className="mt-0.5 text-[#22D3EE]" size={18} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                      {t("retentionTitle")}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{t("retentionBody")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
