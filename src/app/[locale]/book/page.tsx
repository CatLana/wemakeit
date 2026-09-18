import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingEmbed from "@/components/BookingEmbed";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "book";

function ClarityPhotoPair({ before, after }: { before: string; after: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 grid grid-cols-2">
      <div className="relative aspect-square">
        <Image
          src="/images/book-before.jpg"
          alt="A developer with his hands in his hair, frustrated while troubleshooting a problem alone at his laptop"
          fill
          className="object-cover"
          sizes="(min-width: 640px) 384px, 50vw"
        />
      </div>
      <div className="relative aspect-square">
        <Image
          src="/images/book-after.jpg"
          alt="The same developer relaxed and smiling on a call, problem resolved"
          fill
          className="object-cover"
          sizes="(min-width: 640px) 384px, 50vw"
        />
      </div>
      <p className="bg-slate-50 py-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-500 border-t border-slate-200">
        {before}
      </p>
      <p className="bg-[#0F172A] py-3 text-center text-xs font-semibold uppercase tracking-widest text-[#22D3EE] border-t border-white/10">
        {after}
      </p>
    </div>
  );
}

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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "book" });

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
              {t("discoveryCallBridge.text")}{" "}
              <Link
                href="/discovery-call"
                className="text-[#22D3EE] font-semibold hover:underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                {t("discoveryCallBridge.cta")}
              </Link>
            </p>
            <p className="mt-2 text-sm text-slate-400">
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

        {/* Before / after */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <ClarityPhotoPair before={t("clarity.before")} after={t("clarity.after")} />
        </div>

        {/* Booking */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BookingEmbed locale={locale} />
        </div>
      </main>
      <Footer />
    </>
  );
}
