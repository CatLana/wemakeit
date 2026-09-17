import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingEmbed from "@/components/BookingEmbed";
import { Link } from "@/i18n/navigation";

function ShieldGraphic() {
  return (
    <div
      aria-hidden="true"
      className="flex h-48 w-48 sm:h-56 sm:w-56 shrink-0 items-center justify-center rounded-full bg-[#0F172A]"
    >
      <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L4 5v6c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V5l-8-3z"
          fill="#22D3EE"
          fillOpacity="0.15"
          stroke="#22D3EE"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 12.5l2.5 2.5 5-5"
          stroke="#22D3EE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "book";

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "book" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/${SLUG}`,
    },
  };
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { service } = await searchParams;
  const t = await getTranslations({ locale, namespace: "book" });
  const painPoints = t.raw("story.painPoints") as string[];

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-[#F8FAFC]">
        {/* Page hero */}
        <div className="bg-[#0F172A] pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              {t("eyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {t("heading")}
            </h1>
            <p className="mt-3 text-slate-400 text-sm max-w-xl">{t("body")}</p>
            <p className="mt-4 text-sm text-slate-400">
              {t("auditBridge.text")}{" "}
              <Link
                href="/audit"
                className="text-[#22D3EE] font-semibold hover:underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                {t("auditBridge.cta")}
              </Link>
            </p>
          </div>
        </div>

        {/* Sounds familiar? */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-8 text-center">
              {t("story.painHeading")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/frustrated-developer.jpg"
                  alt={t("story.painImageAlt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 90vw"
                />
              </div>
              <ul role="list" className="space-y-4">
                {painPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 border border-rose-200">
                      <X size={12} className="text-rose-500" aria-hidden="true" strokeWidth={3} />
                    </span>
                    <p className="text-slate-700 font-medium leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why this matters */}
        <section className="bg-[#F8FAFC] py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-4">
                  {t("story.mattersHeading")}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {t("story.mattersBody")}
                </p>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <ShieldGraphic />
              </div>
            </div>
          </div>
        </section>

        {/* You don't need a developer, you need a guide */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-4">
                  {t("story.guideHeading")}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-3">
                  {t("story.guideBody")}
                </p>
                <p className="text-[#1E293B] font-bold text-lg mb-6">
                  {t("story.guideCloser")}
                </p>
                <a
                  href="#consultation"
                  className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
                >
                  {t("story.guideCta")}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/technical-consultation-call.jpg"
                  alt={t("story.guideImageAlt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 90vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Calendar */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BookingEmbed locale={locale} service={service} />
        </div>
      </main>
      <Footer />
    </>
  );
}
