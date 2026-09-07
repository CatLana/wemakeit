import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
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
      <main id="main-content" tabIndex={-1} className="bg-[#0F172A] min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{t("heading")}</h1>
          <p className="text-slate-400 text-base mb-10">{t("body")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/brief/general?context=audit"
              className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              {t("briefCta")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 border border-white/20 text-white font-bold rounded-xl hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {t("bookCta")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
