import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "website-that-works-for-your-users";

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
      "What Does It Mean for a Website to Work for Your Users? | We Make IT",
    description:
      "A good-looking website that confuses visitors costs your business leads every day. Here is how to make your site work the way your users actually need it to.",
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
      title: "What Does It Mean for a Website to Work for Your Users?",
      description:
        "The UX mistakes that cost Irish businesses leads every day, how to find out what your users struggle with, and what a user-focused website actually looks like.",
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
          alt: "A website that works for your users",
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
    headline: "What Does It Mean for a Website to Work for Your Users?",
    description:
      "A guide to user experience for Irish business websites: the UX mistakes that lose leads, how to diagnose them, and what to fix first.",
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
      "website UX ireland, user experience website ireland, website usability ireland, improve website for users, website losing leads ireland",
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
        name: "What Does It Mean for a Website to Work for Your Users?",
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
                Web Development &amp; UX
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Need a website that works for your users?
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                1 May 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                5 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <p className="text-slate-600 leading-relaxed text-base mb-5">
              A website that looks nice is not the same as a website that works. You can have a polished design and still lose visitors at every step because they cannot find what they need, do not know what to do next, or give up because something is taking too long.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              User experience, or UX, is about how easy and clear it is for visitors to do what they came to do. It is not a design trend or a nice-to-have. It is a direct driver of whether people contact you, buy from you, or leave without doing either.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What &quot;works for users&quot; actually means
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              A website that works for its users does five things consistently:
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>Visitors can find what they came for quickly.</strong> If someone lands on your homepage and cannot immediately understand what you do and who you help, most of them leave within a few seconds. Clarity is more valuable than cleverness.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>The next step is always obvious.</strong> Every page should make it clear what you want the visitor to do. Call, book, send a message. One primary action per page. If there are five options of equal visual weight, people will pick none of them.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>The content is written for the reader, not the company.</strong> Visitors arrive with a problem. They want to know whether you can solve it, not read a history of the business. Put the customer&apos;s situation front and centre.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>It works just as well on mobile as on desktop.</strong> More than half of web traffic in Ireland is on mobile. A site that is frustrating to use on a phone is actively losing leads every day.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>It loads fast.</strong> Under 3 seconds on a standard mobile connection is the threshold. Slower than that and a significant portion of visitors will leave before the page even finishes loading.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              UX mistakes that cost Irish businesses leads every day
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              These are the patterns we see most often when we audit websites for Irish businesses. They are all fixable, and most of them do not require a full redesign.
            </p>
            <div className="space-y-5 mb-10">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Navigation with too many options</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A top menu with eight items forces visitors to make a decision before they understand enough to make it. Keep navigation to the five most important sections and let the content do the work.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Contact details buried in the footer</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  If someone has to scroll to the bottom of the page to find your phone number, many of them will not bother. Your phone number and a contact button should be visible in the header on every page.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Forms that ask for too much information</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every extra field on a contact form reduces the completion rate. Name, email, and a short message is usually enough for a first contact. You can get more detail once the conversation has started.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Pages that talk about the company instead of the customer</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  &quot;We are a leading provider of&quot; is the opening of a sentence that most visitors will not finish reading. Reframe every piece of copy around the problem you solve and the outcome the customer gets.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Stock photos that communicate nothing</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Generic images of smiling people in offices tell visitors nothing specific about your business. Real photos of your team, your work, or your process build more trust in less space.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              How to find out what your users actually struggle with
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              You do not have to guess where the friction is. Here are practical ways to find out:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-3 mb-10 text-slate-600 text-base leading-relaxed">
              <li>
                <strong>Ask five customers to find your pricing page or contact form</strong> while you watch, without helping. The places they hesitate or get confused are your priorities.
              </li>
              <li>
                <strong>Install a free heatmap tool</strong> like <a href="https://www.hotjar.com/" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Hotjar</a> (free tier available). It shows where visitors click, how far they scroll, and where they drop off.
              </li>
              <li>
                <strong>Check Google Search Console.</strong> Pages with high impressions but low click-through rates often have titles or descriptions that do not match what users are looking for.
              </li>
              <li>
                <strong>Try your own contact form on a real phone.</strong> Note anything that is fiddly, unclear, or slow. If it is frustrating for you, it is frustrating for your customers.
              </li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Where to start when improving your site
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              A full redesign is not always needed. These targeted changes often produce the biggest results for the least investment:
            </p>
            <ol className="list-decimal list-outside ml-5 space-y-3 mb-10 text-slate-600 text-base leading-relaxed">
              <li>Rewrite the homepage headline so it clearly states who you help and what you do.</li>
              <li>Add a phone number and a &quot;Contact us&quot; button to the header on every page.</li>
              <li>Reduce your navigation to five items or fewer.</li>
              <li>Remove every form field that you do not strictly need.</li>
              <li>Check your site on a real phone and fix anything that makes it harder to use than on desktop.</li>
            </ol>

            <p className="text-slate-600 leading-relaxed text-base mb-10">
              At <Link href="/" className="text-[#0E7490] underline">We Make IT</Link>, every website we build starts with understanding the user. We design around how real people navigate and what they need to do, not around what looks impressive in a portfolio. If your current site is not bringing in the enquiries it should, we can help you work out why and fix it.
            </p>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Want a website that actually converts visitors into customers?
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Tell us about your current website and what you want it to do better. We will review it and give you specific, honest recommendations.
              </p>
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get a free site review
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
