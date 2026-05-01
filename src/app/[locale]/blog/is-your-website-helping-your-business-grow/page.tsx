import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "is-your-website-helping-your-business-grow";

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
      "Is Your Website Helping Your Business Grow? Here Is How to Tell | We Make IT",
    description:
      "A website that sits there doing nothing is a missed opportunity. Learn how to tell if your site is generating business and what to do if it is not.",
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
      title: "Is Your Website Helping Your Business Grow?",
      description:
        "How to tell if your website is generating business, the warning signs it is not, and the changes that make the biggest difference for Irish SMEs.",
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
          alt: "Is your website helping your business grow",
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
    headline: "Is Your Website Helping Your Business Grow?",
    description:
      "How to tell if your website is generating leads and enquiries for your business, with practical checks and the most impactful improvements for Irish SMEs.",
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
      "website generating business ireland, website not getting enquiries, website conversion ireland, improve website ireland, website growth ireland SME",
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
        name: "Is Your Website Helping Your Business Grow?",
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
                Web Development
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Is your website helping your business grow?
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
              Most business owners launch a website and move on. The site is live, it looks fine, and it has the company name and a phone number. But a year later, they cannot tell you how many customers it brought in. Most of the time, the honest answer is: very few.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              A website that does not actively help your business is not a neutral asset. It is an opportunity you are paying for and not using. The good news is that the gap between a passive website and a growth-driving one is usually smaller than people think.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What a working website actually does
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              A website that helps your business grow does four things consistently:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-3 mb-10 text-slate-600 text-base leading-relaxed">
              <li>
                <strong>It answers visitor questions quickly.</strong> Within 5 seconds of landing on your homepage, a visitor should know who you help, what you do, and why they should care. If that is not clear, most of them leave.
              </li>
              <li>
                <strong>It moves visitors toward a specific next step.</strong> Every page should have one clear action you want the visitor to take: call, fill in a form, book a consultation. Multiple competing options cause paralysis.
              </li>
              <li>
                <strong>It performs well on mobile.</strong> In Ireland, over 60% of web traffic comes from mobile devices. A site that is frustrating to use on a phone is losing more than half its audience.
              </li>
              <li>
                <strong>It shows up when people search for what you offer.</strong> Visibility in search is not automatic. It requires deliberate SEO. Without it, even a well-designed site is invisible to the people looking for exactly what you provide.
              </li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Warning signs your website is not pulling its weight
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              These are the patterns that show up most often when we review websites for Irish businesses:
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>You get no enquiries from the site.</strong> If someone can only reach you by finding your number themselves, the website is not working. A functioning site should prompt people to reach out.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>People leave immediately.</strong> A high bounce rate means visitors are arriving and deciding within seconds that this is not what they were looking for. Usually this is a clarity problem, not a design problem.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>It does not rank for your own business name.</strong> If you search your company name on Google and the website does not appear on the first page, that is a technical issue that needs fixing before anything else.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>It takes more than two clicks to contact you.</strong> Every extra step between a visitor and a conversation is a drop-off point. Contact details should be reachable in one click from anywhere on the site.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>It loads slowly.</strong> Google research consistently shows that a one-second delay in page load time reduces conversions by around 7%. Slow sites lose visitors before they have read a word.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Simple checks you can do right now
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              You do not need an agency to tell you whether your website has basic problems. These checks take about 20 minutes:
            </p>
            <ol className="list-decimal list-outside ml-5 space-y-3 mb-10 text-slate-600 text-base leading-relaxed">
              <li>
                Open <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Google PageSpeed Insights</a> and enter your URL. A mobile score below 50 is a problem.
              </li>
              <li>
                Ask someone who has never used your site to find your phone number in under 10 seconds without your help. Watch where they struggle.
              </li>
              <li>
                Search Google for your main service followed by your town. For example, &quot;accountant Dublin&quot; or &quot;plumber Cork.&quot; Note where your site appears, if at all.
              </li>
              <li>
                Open your site on a real mobile phone and try to complete your own contact form. Note anything that slows you down or causes confusion.
              </li>
              <li>
                Check <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Google Search Console</a> if you have it set up. Look at which pages get traffic and which have zero impressions.
              </li>
            </ol>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The changes that make the biggest difference
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              When we rebuild or improve websites for Irish businesses, the changes that move the needle most are usually not the ones clients expect. They are rarely about visuals.
            </p>
            <div className="space-y-5 mb-10">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">A homepage headline that says who you help</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  &quot;Welcome to [Company Name]&quot; tells a visitor nothing useful. &quot;We help Irish restaurants fill more tables and reduce no-shows&quot; tells them everything they need to decide whether to keep reading.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">One clear call to action per page</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pick the one action you most want visitors to take and make it obvious. Reduce everything else to secondary importance. Fewer choices lead to more decisions.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Fast loading on mobile</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Compress images, remove unnecessary scripts, and ensure the site loads in under 3 seconds on a standard mobile connection. This affects both user experience and search rankings.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Content written for your reader, not about your company</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Visitors do not arrive at your site interested in your company history. They arrive with a problem. Talk about their problem, how you solve it, and what happens when they get in touch.
                </p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-base mb-10">
              At <Link href="/" className="text-[#0E7490] underline">We Make IT</Link>, we build websites for Irish businesses that are designed from the start to bring in enquiries, not just to look good. If you would like a second opinion on your current site, we are happy to take a look.
            </p>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Not sure if your website is working for you?
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Send us your website address and we will give you honest, specific feedback on what is working and what is holding it back. No sales pitch, just a straight answer.
              </p>
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get a free website review
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
