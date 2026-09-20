import type { Metadata } from "next";
import { ArrowRight, Globe, Code2, Instagram, HelpCircle, AlertTriangle } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auditPage.thankYou" });
  return {
    title: t("meta.title"),
    robots: { index: false, follow: false },
  };
}

function BriefOptionLink({
  href,
  icon,
  label,
}: {
  href: "/brief/website" | "/brief/software" | "/brief/social" | "/brief/general";
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={{ pathname: href, query: { context: "audit" } }}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#22D3EE]/60 hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22D3EE]/15 text-[#22D3EE]">
        {icon}
      </span>
      <span className="text-sm font-semibold text-white">{label}</span>
    </Link>
  );
}

export default async function AuditThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "auditPage.thankYou" });

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-[#0F172A]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{t("heading")}</h1>
            <p className="text-slate-400 text-base">{t("body")}</p>
          </div>

          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-6">
            {t("stepsHeading")}
          </p>

          <div className="flex flex-col gap-5">
            {/* Step 1 */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-2">
                {t("step1Badge")}
              </span>
              <h2 className="text-lg font-bold text-white mb-2">{t("step1Heading")}</h2>
              <p className="text-slate-300 leading-relaxed mb-5 text-sm">{t("step1Body")}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <BriefOptionLink
                  href="/brief/website"
                  icon={<Globe size={16} aria-hidden="true" />}
                  label={t("briefOptions.website")}
                />
                <BriefOptionLink
                  href="/brief/software"
                  icon={<Code2 size={16} aria-hidden="true" />}
                  label={t("briefOptions.software")}
                />
                <BriefOptionLink
                  href="/brief/social"
                  icon={<Instagram size={16} aria-hidden="true" />}
                  label={t("briefOptions.social")}
                />
                <BriefOptionLink
                  href="/brief/general"
                  icon={<HelpCircle size={16} aria-hidden="true" />}
                  label={t("briefOptions.general")}
                />
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">{t("step1AudioNote")}</p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-2">
                {t("step2Badge")}
              </span>
              <h2 className="text-lg font-bold text-white mb-2">{t("step2Heading")}</h2>
              <p className="text-slate-300 leading-relaxed mb-5 text-sm">{t("step2Body")}</p>
              <Link
                href="/discovery-call"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                {t("step2Cta")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            {/* Warning */}
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-6 sm:p-8 flex gap-4">
              <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold text-amber-300 mb-1">{t("warningHeading")}</h2>
                <p className="text-amber-100/80 text-sm leading-relaxed">{t("warningBody")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
