import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "audit/bank2brick";

type SeverityKey = "critical" | "high" | "medium" | "low";

interface AuditFinding {
  title: string;
  summary: string;
  impact: string;
  evidence: string[];
  recommendations: string[];
}

interface SeveritySection {
  title: string;
  intro: string;
  items: AuditFinding[];
}

interface Opportunity {
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
    alternates: {
      canonical: `${BASE_URL}/${locale}/${SLUG}`,
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
      url: `${BASE_URL}/${locale}/${SLUG}`,
      siteName: "We Make IT",
      locale: locale === "en" ? "en_IE" : locale === "it" ? "it_IT" : "ru_RU",
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
  const summary = t.raw("summary") as string[];
  const opportunities = t.raw("opportunities") as Opportunity[];
  const actionPlan = t.raw("actionPlan") as string[];
  const sections = t.raw("severitySections") as Record<SeverityKey, SeveritySection>;
  const feedbackSubject = encodeURIComponent(t("feedbackSubject"));
  const sectionOrder: SeverityKey[] = ["critical", "high", "medium", "low"];

  const sectionStyles: Record<SeverityKey, { shell: string; badge: string }> = {
    critical: {
      shell: "border-rose-200 bg-rose-50",
      badge: "bg-rose-600 text-white",
    },
    high: {
      shell: "border-orange-200 bg-orange-50",
      badge: "bg-orange-500 text-white",
    },
    medium: {
      shell: "border-amber-200 bg-amber-50",
      badge: "bg-amber-500 text-slate-950",
    },
    low: {
      shell: "border-emerald-200 bg-emerald-50",
      badge: "bg-emerald-600 text-white",
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("metadata.ogTitle"),
    description: t("metadata.description"),
    datePublished: "2026-05-11T00:00:00.000Z",
    dateModified: "2026-05-11T00:00:00.000Z",
    author: {
      "@type": "Organization",
      name: "We Make IT",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "We Make IT",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/${SLUG}`,
    },
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
        <section className="bg-[#0F172A] pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#22D3EE]">
              {t("eyebrow")}
            </span>
            <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              {t("subtitle")}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                  {t("auditDateLabel")}
                </p>
                <p className="mt-2 text-sm text-white">{t("auditDateValue")}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                  {t("statusLabel")}
                </p>
                <p className="mt-2 text-sm text-white">{t("statusValue")}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                  {t("scopeLabel")}
                </p>
                <p className="mt-2 text-sm text-white">{t("scopeValue")}</p>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white">{t("summaryTitle")}</h2>
              <ul className="mt-5 space-y-3">
                {summary.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300 sm:text-base">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#22D3EE]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-3xl border border-amber-400/25 bg-amber-400/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">{t("limitationsTitle")}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                {t("limitationsBody")}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-extrabold text-[#1E293B]">{t("issuesTitle")}</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">{t("issuesIntro")}</p>
            </div>

            <div className="mt-10 space-y-8">
              {sectionOrder.map((severity) => {
                const section = sections[severity];
                const styles = sectionStyles[severity];

                return (
                  <section
                    key={severity}
                    aria-labelledby={`${severity}-heading`}
                    className={`rounded-3xl border p-6 sm:p-8 ${styles.shell}`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${styles.badge}`}>
                          {t(`severityLabels.${severity}`)}
                        </span>
                        <h3
                          id={`${severity}-heading`}
                          className="mt-4 text-2xl font-bold text-[#1E293B]"
                        >
                          {section.title}
                        </h3>
                      </div>
                      <p className="max-w-2xl text-sm leading-7 text-slate-600">
                        {section.intro}
                      </p>
                    </div>

                    <div className="mt-8 grid gap-5">
                      {section.items.map((item) => (
                        <article
                          key={item.title}
                          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                          <h4 className="text-lg font-bold text-[#1E293B]">{item.title}</h4>
                          <p className="mt-3 text-sm leading-7 text-slate-600">
                            {item.summary}
                          </p>

                          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                              {t("impactLabel")}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-slate-700">
                              {item.impact}
                            </p>
                          </div>

                          <div className="mt-5 grid gap-5 lg:grid-cols-2">
                            <div>
                              <p className="text-sm font-semibold text-[#1E293B]">
                                {t("evidenceLabel")}
                              </p>
                              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                                {item.evidence.map((evidence) => (
                                  <li key={evidence} className="flex gap-3">
                                    <span
                                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-300"
                                      aria-hidden="true"
                                    />
                                    <span>{evidence}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-[#1E293B]">
                                {t("recommendationsLabel")}
                              </p>
                              <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                                {item.recommendations.map((recommendation, index) => (
                                  <li key={recommendation} className="flex gap-3">
                                    <span
                                      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#22D3EE]/15 text-xs font-bold text-[#0E7490]"
                                      aria-hidden="true"
                                    >
                                      {index + 1}
                                    </span>
                                    <span>{recommendation}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-extrabold text-[#1E293B]">
                {t("opportunitiesTitle")}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {t("opportunitiesIntro")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {opportunities.map((opportunity) => (
                <article
                  key={opportunity.title}
                  className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6"
                >
                  <h3 className="text-lg font-bold text-[#1E293B]">{opportunity.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{opportunity.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <h2 className="text-3xl font-extrabold text-white">{t("actionPlanTitle")}</h2>
              <ol className="mt-8 space-y-4">
                {actionPlan.map((step, index) => (
                  <li key={step} className="flex gap-4 text-sm leading-7 text-slate-300 sm:text-base">
                    <span
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22D3EE] font-bold text-[#0F172A]"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="pb-20 pt-16 sm:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#0F172A] p-8 text-white sm:p-10">
              <h2 className="text-3xl font-extrabold">{t("ctaTitle")}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                {t("ctaBody")}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  {t("primaryCta")}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a
                  href={`mailto:info@wemakeit.ie?subject=${feedbackSubject}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  {t("secondaryCta")}
                  <Mail size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
