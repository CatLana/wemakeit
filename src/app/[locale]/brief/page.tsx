import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Globe, Code2, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { BackLink } from "@/components/BriefFormFields";

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
  const t = await getTranslations({ locale, namespace: "brief" });
  const canonicalUrl = `${BASE_URL}/${locale}/brief`;

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

function BriefOptionCard({
  href,
  icon,
  title,
  description,
  cta,
}: {
  href: "/brief/website" | "/brief/software";
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:border-[#22D3EE] hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
    >
      <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/15 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-[#1E293B] mb-2">{title}</h2>
      <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">{description}</p>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] group-hover:text-[#0891B2]">
        {cta}
        <ArrowRight size={15} aria-hidden="true" />
      </span>
    </Link>
  );
}

export default async function BriefPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "brief" });

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-[#F8FAFC]">
        {/* Page hero */}
        <div className="bg-[#0F172A] pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <BackLink href="/book">{t("backToBooking")}</BackLink>
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
            <p className="text-slate-400 text-base leading-relaxed">{t("subheading")}</p>
          </div>
        </div>

        {/* Options */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 gap-6">
            <BriefOptionCard
              href="/brief/website"
              icon={<Globe size={22} className="text-[#0E7490]" aria-hidden="true" />}
              title={t("options.website.title")}
              description={t("options.website.description")}
              cta={t("options.website.cta")}
            />
            <BriefOptionCard
              href="/brief/software"
              icon={<Code2 size={22} className="text-[#0E7490]" aria-hidden="true" />}
              title={t("options.software.title")}
              description={t("options.software.description")}
              cta={t("options.software.cta")}
            />
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            {t("options.general.prompt")}{" "}
            <Link
              href="/brief/general"
              className="font-semibold text-[#0E7490] underline underline-offset-2 hover:text-[#0891B2] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              {t("options.general.linkText")}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
