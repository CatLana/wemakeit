import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuditRequestForm from "@/components/AuditRequestForm";

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
  return {
    title: t("title"),
    description: t("subtitle"),
    robots: { index: true, follow: true },
  };
}

export default async function AuditExpertPage({
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
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
                {t("eyebrow")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight">
                {t("howItWorksTitle")}
              </h2>
              <p className="mt-4 text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
                {t("howItWorksIntro")}
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#22D3EE]/20 border border-[#22D3EE]/40">
                      <CheckCircle2 size={20} className="text-[#0E7490]" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1E293B]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit Request Form Section */}
        <section id="audit-request-form" className="py-16 lg:py-20 bg-[#F8FAFC]">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] leading-tight"
              >
                {t("requestFormTitle")}
              </h2>
              <p className="mt-3 text-slate-500 text-lg leading-relaxed">
                {t("requestFormSubtitle")}
              </p>
            </div>
            <AuditRequestForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
