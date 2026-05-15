import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuditReportTemplate from "@/components/audit/AuditReportTemplate";
import {
  transformPageSpeedToAuditReport,
} from "@/lib/audit-transform";
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

  let report;
  try {
    const strategyMode = strategy === "desktop" ? "desktop" : "mobile";
    const result = await runHybridAudit(normalised, strategyMode);
    report = transformPageSpeedToAuditReport(result.data, result.normalisedUrl);

    if (result.source === "cache") {
      report.visibilityValue = t("results.fallbackUsed");
    }

    const expiresAt = Date.now() + 48 * 60 * 60 * 1000;
    const downloadHref = `/api/audit/pdf?url=${encodeURIComponent(result.normalisedUrl)}&strategy=${encodeURIComponent(
      strategyMode,
    )}&expires=${expiresAt}`;
    report.cta.downloadHref = downloadHref;
  } catch (err) {
    const reason = err instanceof Error ? err.message : "Unknown upstream failure";

    // Render a friendly error state
    return (
      <>
        <Header />
        <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
        <section className="bg-[#0F172A] pt-24 pb-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-extrabold text-white">{t("results.errorTitle")}</h1>
            <p className="mt-4 text-slate-300">
              {t("results.errorBody")}
            </p>
            <p className="mt-5 rounded-xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-left text-xs leading-6 text-amber-100">
              {t("results.errorReasonPrefix")}: {reason}
            </p>
            <a
              href={`/${locale}/audit`}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] hover:bg-cyan-300 transition-colors"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {t("results.tryAgainBtn")}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <AuditReportTemplate report={report} locale={locale} />
      <Footer />
    </>
  );
}
