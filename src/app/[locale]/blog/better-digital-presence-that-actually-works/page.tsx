import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "better-digital-presence-that-actually-works";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `${BASE_URL}/${locale}/blog/${SLUG}`;
  const ogLocale =
    locale === "en" ? "en_IE" : locale === "it" ? "it_IT" : "ru_RU";

  return {
    title:
      "How to Build a Digital Presence That Actually Brings in Business | We Make IT",
    description:
      "Being online is not the same as being found. Learn how to audit your digital presence and make the changes that actually drive enquiries for your Irish business.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${BASE_URL}/en/blog/${SLUG}`,
        en: `${BASE_URL}/en/blog/${SLUG}`,
        it: `${BASE_URL}/it/blog/${SLUG}`,
        ru: `${BASE_URL}/ru/blog/${SLUG}`,
      },
    },
    openGraph: {
      title: "How to Build a Digital Presence That Actually Brings in Business",
      description:
        "Millions of businesses are online but invisible. Here is how to audit your digital presence and make practical improvements that bring in real enquiries.",
      type: "article",
      publishedTime: "2026-05-01T00:00:00.000Z",
      authors: ["We Make IT"],
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: ogLocale,
      images: [
        {
          url: `${BASE_URL}/api/og`,
          width: 1200,
          height: 630,
          alt: "Build a digital presence that works for your business",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How to Build a Digital Presence That Actually Brings in Business",
    description:
      "A practical guide to auditing and improving your digital presence so it brings in real enquiries, not just traffic.",
    datePublished: "2026-05-01T00:00:00.000Z",
    dateModified: "2026-05-01T00:00:00.000Z",
    author: {
      "@type": "Person",
      name: "Svetlana Savchenko",
      url: "https://www.linkedin.com/in/svetlana-savchenko-08868764",
    },
    publisher: {
      "@type": "Organization",
      name: "We Make IT",
      url: BASE_URL,
    },
    image: `${BASE_URL}/api/og`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${SLUG}`,
    },
    inLanguage: locale,
    keywords:
      "digital presence ireland, improve online presence ireland, be found online ireland, digital marketing ireland SME, online visibility ireland",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How to Build a Digital Presence That Actually Brings in Business",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Article header */}
        <div className="bg-[#0F172A] pt-32 pb-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back to Blog
              </Link>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE]">
                Digital Strategy
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Need a better digital presence that actually works?
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                1 May 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                6 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Most Irish businesses have some kind of digital presence. A website, a Facebook page, a Google Business listing. But having these things is not the same as having a digital presence that actually works. The difference between the two is whether people find you when they are looking for what you offer.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Being online is the starting point. Being discoverable, credible, and easy to contact is the goal. A lot of businesses are stuck somewhere between the two, and often they are not sure why.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What &quot;digital presence&quot; actually means in 2026
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Your digital presence is the sum of everything someone finds when they look for your business or your type of service online. It includes:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-3 mb-6 text-slate-600 text-base leading-relaxed">
              <li>Your <strong>website</strong>: how it looks, how fast it loads, what it says, and how easy it is to navigate</li>
              <li>Your <strong>search visibility</strong>: which searches you appear in on Google, and how high up</li>
              <li>Your <strong>Google Business Profile</strong>: what shows when people search your business name directly</li>
              <li>Your <strong>reviews</strong>: what past customers have said publicly and how you have responded</li>
              <li>Your <strong>social media</strong>: how active and consistent you are on the platforms that matter for your industry</li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              None of these works in isolation. A strong website with no search visibility brings in no organic traffic. High search rankings pointing to a poor website generate no enquiries. All of these elements need to work together.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The gap between being online and being found
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              The most common mistake small businesses make with their digital presence is assuming that launching a website was the last step. It was not. It was the first.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Most SME websites do not rank for anything useful. They rank for the business name if you are lucky, but not for the types of searches potential customers actually make. Someone looking for a &quot;bookkeeper in Drogheda&quot; or &quot;app developer Ashbourne&quot; will not find your site unless it has been deliberately optimised for those terms.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Social media without a strategy faces the same problem. Posting occasionally is not a substitute for showing up where people are actually searching. For most service businesses, Google is still where the majority of commercial intent begins.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              How to audit your digital presence in an afternoon
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              You do not need a marketing agency to do a basic audit. Here is what to check:
            </p>
            <ol className="list-decimal list-outside ml-5 space-y-4 mb-10 text-slate-600 text-base leading-relaxed">
              <li>
                <strong>Google your own business name.</strong> Does your website appear? Does a Knowledge Panel appear on the right? Is the information accurate and complete?
              </li>
              <li>
                <strong>Check your Google Business Profile.</strong> Is it fully filled out with correct hours, phone number, address, photos, and services? Incomplete profiles rank lower and convert worse.
              </li>
              <li>
                <strong>Search for your main service in your area.</strong> Try searches like &quot;web developer Ireland&quot; or &quot;bookkeeper Meath.&quot; Where do you appear? Are your competitors appearing while you are not?
              </li>
              <li>
                <strong>Read your own reviews.</strong> What do they say? How have you responded? Unanswered negative reviews tell potential customers you do not care.
              </li>
              <li>
                <strong>Open your website on a mobile phone.</strong> Is it easy to navigate? Can you find contact details quickly? Does it load in under 3 seconds? Use <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Google PageSpeed Insights</a> to check.
              </li>
            </ol>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The changes that move the needle most
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              Not every improvement has equal impact. If you are going to invest time or money, these four areas give the best return for most Irish SMEs:
            </p>
            <div className="space-y-5 mb-10">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Publish helpful, search-optimised content</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Articles that answer questions your target customers are searching for do two things: they bring in organic traffic, and they demonstrate expertise. The articles you are reading right now are an example of this in practice.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Complete your Google Business Profile</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Businesses with fully completed profiles are significantly more likely to be found in local searches. Add photos, list your services, respond to every review, and post updates at least monthly.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Fix your website&apos;s technical SEO</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Fast loading speed, correct page titles, meta descriptions, and proper heading structure are the foundations of search visibility. Without them, great content will not rank where it should.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Ask satisfied customers for reviews</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For local businesses, reviews are one of the strongest ranking signals. Most happy customers will leave a review if you simply ask them directly after a successful project or purchase.
                </p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-base mb-10">
              At <Link href="/" className="text-[#0E7490] underline">We Make IT</Link>, we build websites that are technically solid from day one: fast, mobile-first, and structured for search. If you are not sure where your digital presence currently stands, we can take a look and tell you what would make the biggest difference.
            </p>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Want to know where your digital presence stands?
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Tell us about your business and current online setup. We will review it and come back to you with honest, practical recommendations.
              </p>
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get a digital presence review
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
