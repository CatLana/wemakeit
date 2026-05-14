import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AuditReportTemplate from "@/components/audit/AuditReportTemplate";
import {
  transformPageSpeedToAuditReport,
  type PageSpeedApiResponse,
} from "@/lib/audit-transform";

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

  // Call the PageSpeed Insights API directly from the server
  const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  apiUrl.searchParams.set("url", normalised);
  apiUrl.searchParams.set("strategy", strategy === "desktop" ? "desktop" : "mobile");
  for (const cat of ["accessibility", "best-practices", "performance", "seo"]) {
    apiUrl.searchParams.append("category", cat);
  }
  if (process.env.PAGESPEED_API_KEY) {
    apiUrl.searchParams.set("key", process.env.PAGESPEED_API_KEY);
  }

  let report;
  try {
    const res = await fetch(apiUrl.toString(), {
      signal: AbortSignal.timeout(45_000),
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`PageSpeed API error ${res.status}`);
    }

    const data = (await res.json()) as PageSpeedApiResponse;
    report = transformPageSpeedToAuditReport(data, normalised);
  } catch {
    // Render a friendly error state
    return (
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
        <section className="bg-[#0F172A] pt-16 pb-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-extrabold text-white">Audit could not be completed</h1>
            <p className="mt-4 text-slate-300">
              The site may be unreachable, require authentication, or the audit service is
              temporarily unavailable.
            </p>
            <a
              href={`/${locale}/audit`}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] hover:bg-cyan-300 transition-colors"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Try another URL
            </a>
          </div>
        </section>
      </main>
    );
  }

  return <AuditReportTemplate report={report} />;
}
