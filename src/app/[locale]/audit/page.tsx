import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "audit" });
  return {
    title: t("title"),
    description: t("subtitle"),
    robots: { index: false, follow: false },
  };
}

export default async function AuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "audit" });

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] pt-20 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#22D3EE]">
            <Zap size={12} aria-hidden="true" />
            {t("eyebrow")}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* URL input form */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <form
            action={`/${locale}/audit/results`}
            method="GET"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <label
              htmlFor="audit-url"
              className="block text-sm font-semibold text-[#1E293B]"
            >
              {t("urlLabel")}
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="audit-url"
                name="url"
                type="url"
                required
                placeholder={t("urlPlaceholder")}
                defaultValue="https://"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#1E293B] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                {t("submitBtn")}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              {t("exampleLabel")}:{" "}
              <span className="font-mono text-slate-500">{t("exampleUrl")}</span>
            </p>
          </form>

          {/* Limitations notice */}
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-800">{t("limitationsTitle")}</p>
            <p className="mt-1 text-sm leading-6 text-amber-700">{t("limitationsBody")}</p>
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-3xl bg-[#0F172A] p-8 text-center text-white">
            <h2 className="text-xl font-extrabold">{t("ctaTitle")}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{t("ctaBody")}</p>
            <Link
              href={{ pathname: "/", query: { inquiry: "consultation", service: "website" }, hash: "quote" } as never}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {t("ctaBtn")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
