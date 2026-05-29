import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { runHybridAudit } from "@/lib/audit-service";

// Dynamic page — results are fetched live on every request.
export const dynamic = "force-dynamic";

interface AuditResultsPageProps {
  searchParams: Promise<{ url?: string; strategy?: string }>;
  params: Promise<{ locale: string }>;
}

export default async function AuditResultsPage({
  searchParams,
  params,
}: AuditResultsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "audit" });
  const { url, strategy = "mobile" } = await searchParams;

  if (!url) {
    redirect(`/${locale}/audit`);
  }

  // Validate URL shape before calling the API
  let normalised = url.trim();
  if (!/^https?:\/\//i.test(normalised)) {
    normalised = `https://${normalised}`;
  }
  try {
    new URL(normalised);
  } catch {
    redirect(`/${locale}/audit`);
  }

  const strategyMode = strategy === "desktop" ? "desktop" : "mobile";

  // ── Success path ──────────────────────────────────────────────────────────
  let downloadHref: string;
  let siteName: string;
  try {
    const result = await runHybridAudit(normalised, strategyMode);
    // eslint-disable-next-line react-hooks/purity -- server component, Date.now() is safe here
    const expiresAt = Date.now() + 48 * 60 * 60 * 1000;
    downloadHref = `/api/audit/pdf?url=${encodeURIComponent(result.normalisedUrl)}&strategy=${encodeURIComponent(strategyMode)}&expires=${expiresAt}`;
    try {
      siteName = new URL(result.normalisedUrl).hostname.replace(/^www\./, "");
    } catch {
      siteName = result.normalisedUrl;
    }
  } catch (err) {
    // ── Error path ────────────────────────────────────────────────────────
    const reason = err instanceof Error ? err.message : "Unknown upstream failure";
    return (
      <>
        <Header />
        <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
          <section className="bg-[#0F172A] pt-24 pb-16">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-3xl font-extrabold text-white">
                {t("results.errorTitle")}
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-300">
                {t("results.errorBody")}
              </p>
              <p className="mt-5 rounded-xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-left text-xs leading-6 text-amber-100">
                {t("results.errorReasonPrefix")}: {reason}
              </p>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-extrabold text-[#1E293B]">
                {t("results.expertCtaTitle")}
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {t("results.expertCtaBody")}
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/audit#request-form"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-7 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  {t("results.expertCtaBtn")}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a
                  href={`/${locale}/audit/automated`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-[#1E293B] transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  {t("results.tryAgainBtn")}
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // ── Render success state ──────────────────────────────────────────────────
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
        {/* Hero */}
        <section className="bg-[#0F172A] pt-24 pb-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <FileText size={12} aria-hidden="true" />
              {t("results.successBadge")}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {t("results.successTitle")}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {t("results.successSubtitle")}
            </p>
            <p className="mt-3 font-mono text-sm text-[#22D3EE]">{siteName}</p>

            <a
              href={downloadHref}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-3.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              <Download size={16} aria-hidden="true" />
              {t("results.downloadBtn")}
            </a>
          </div>
        </section>

        {/* Expert audit CTA */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-extrabold text-[#1E293B]">
              {t("results.expertCtaTitle")}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              {t("results.expertCtaBody")}
            </p>
            <Link
              href="/audit#request-form"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-7 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {t("results.expertCtaBtn")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
