import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";
import Founder from "@/components/sections/Founder";
import { Link } from "@/i18n/navigation";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "about";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "aboutPage.metadata",
  });
  const canonicalUrl = `${BASE_URL}/${locale}/${SLUG}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${BASE_URL}/en/${SLUG}`,
        en: `${BASE_URL}/en/${SLUG}`,
        it: `${BASE_URL}/it/${SLUG}`,
        ru: `${BASE_URL}/ru/${SLUG}`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalUrl,
      siteName: "We Make IT",
      type: "website",
      images: [{ url: `${BASE_URL}/images/wemakeit_thumbnail.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

async function AboutPageContent({
  locale,
}: {
  locale: string;
}) {
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "aboutPage",
  });
  const team = t.raw("team") as Array<{
    name: string;
    title: string;
    bio: string;
  }>;
  const teamCollaborators = t("teamCollaborators");

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="bg-[#0F172A] text-white pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-300 mb-3">
              {t("eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
              {t("heroHeading")}
            </h1>
            <p className="text-lg text-cyan-100 mb-6">
              We are a small Irish business growing fast. We care about offering the best quality services we can to help other local businesses thrive and make their clients happier.
            </p>
          </div>
        </section>

        {/* About section */}
        <About />

        {/* Our Founder */}
        <Founder />

        {/* Team */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] mb-3">
                {t("teamHeading")}
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                {t("teamSubheading")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8 text-center"
                >
                  {/* Placeholder avatar */}
                  <div className="mb-6 flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#22D3EE]/20 to-[#A855F7]/20 flex items-center justify-center">
                      <svg
                        className="h-16 w-16 text-[#0F172A]/30"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.35-.82-6.14-2.88C7.72 15.75 9.97 15 12 15s4.28.75 6.14 2.12C16.35 19.18 14.03 20 12 20z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#0E7490] mb-3">
                    {member.title}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>

            {/* Collaborators note */}
            <p className="mt-10 max-w-2xl mx-auto text-center text-base leading-7 text-slate-500">
              {teamCollaborators}
            </p>
          </div>
        </section>

        {/* Values/Differentiators */}
        <section className="bg-slate-50 py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] mb-3">
                What We Stand For
              </h2>
              <p className="text-slate-600 text-lg">
                Our principles guide every decision and project we take on.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Accessibility & Inclusion",
                  desc: "Every product we build is inclusive and accessible from day one. No one should be left behind in the digital world.",
                },
                {
                  title: "Honest Communication",
                  desc: "We speak plain English, explain technical decisions clearly, and always listen to understand your real needs.",
                },
                {
                  title: "Quality Over Speed",
                  desc: "We build for the long term. Your product is designed to scale, improve, and adapt as your business grows.",
                },
                {
                  title: "Fixed Pricing",
                  desc: "You know the full cost before we start. No hidden extras, no surprise invoices. Transparency is not optional.",
                },
              ].map((value, i) => (
                <div key={i} className="rounded-xl bg-white p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-[#1E293B] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA to contact */}
        <section className="bg-[#0F172A] py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to work with us?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Get in touch and let&apos;s talk about your project or idea.
            </p>
            <Link
              href={{
                pathname: "/",
                query: { service: "consultation" },
                hash: "quote",
              } as never}
              className="inline-flex items-center justify-center min-h-[46px] px-8 bg-[#22D3EE] text-[#0F172A] font-semibold rounded-lg hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Send us a Message
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AboutPageContent locale={locale} />;
}
