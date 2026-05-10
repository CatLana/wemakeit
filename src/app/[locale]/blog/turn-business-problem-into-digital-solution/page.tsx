import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "turn-business-problem-into-digital-solution";

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
      "How to Turn a Business Problem Into a Digital Solution | We Make IT",
    description:
      "Most recurring business problems have a digital fix. Learn how to identify what is costing your business time and money, and how a custom digital tool solves it.",
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
      title: "How to Turn a Business Problem Into a Digital Solution",
      description:
        "A practical guide for Irish business owners on identifying which operational problems can be solved with custom software, and the ROI of doing so.",
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
          alt: "Turn a business problem into a digital solution",
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
    headline: "How to Turn a Business Problem Into a Digital Solution",
    description:
      "A guide to identifying operational problems that custom software can solve, including the cost of inaction and how the build process works.",
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
      "digital solution business problem ireland, custom software ireland SME, automate business process ireland, business app ireland, digital transformation ireland",
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
        name: "How to Turn a Business Problem Into a Digital Solution",
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
                Digital Transformation
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Want to turn a business problem into a digital solution?
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
              Every growing business reaches a point where something stops working. A manual process that was fine at 20 customers falls apart at 200. A spreadsheet that worked for one person becomes unmanageable for a team of five. A task that someone does every day by hand takes hours that could be spent on something more valuable.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              These are not small frustrations. Over time, they compound. Errors build up, staff burn out on repetitive work, and customers notice the friction. But the fix is usually simpler than people think, and often much more affordable than they expect.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              How to spot a problem that needs a digital solution
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              Not every business problem is a software problem. But certain patterns almost always point to a digital fix. Look for:
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>Repetitive manual tasks.</strong> If someone on your team does the same task over and over with no variation, there is almost certainly a way to automate or streamline it.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>Information scattered across tools.</strong> When the truth about a customer, order, or project lives in three different places and never gets updated in all three, you have a data problem. And data problems cause mistakes.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>Customers hitting friction at a key step.</strong> If people regularly call to ask where their order is, or have to email you to do something they should be able to do themselves, the process can almost certainly be improved.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>Your team cannot keep up with demand.</strong> If growth is causing chaos because the business was not built to scale, a digital solution can do the work that hiring more people cannot always solve.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Common problems that custom software solves
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              These are the types of projects we see most often when Irish businesses come to us with operational problems:
            </p>
            <div className="space-y-5 mb-10">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Booking and scheduling systems</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Replacing phone-and-diary booking with an online system that lets customers book, reschedule, and receive automatic reminders. Reduces no-shows and frees up staff time.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Customer portals</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A secure area where customers can track orders, access documents, or manage their account without calling or emailing. Reduces support overhead and improves customer satisfaction.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Internal dashboards and reporting</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Replacing manually compiled spreadsheet reports with a live dashboard that pulls data automatically. Saves hours per week and gives management real-time visibility.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Automated notifications and workflows</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Triggering emails, texts, or internal alerts automatically when something happens: a new order, a missed payment, a stage completed. Removes the human step from routine communication.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Connecting tools that do not talk to each other</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  If your payment system, CRM, and delivery tool each hold different pieces of the same information, an integration layer can sync them automatically and eliminate manual data entry.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The real cost of not fixing it
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              The hardest part of making the case for a digital investment is that the cost of inaction is invisible. It does not show up as a line item on a spreadsheet. It shows up as hours your team spends on things that should not require human attention, as errors that quietly erode customer trust, and as growth that stalls because the business cannot handle more volume without adding proportional overhead.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              A useful exercise is to estimate the cost of the problem right now. If a manual process takes 3 hours a week across a team of four, that is over 600 staff hours a year. At even a modest hourly rate, that is a significant number. A digital solution that eliminates that process will typically pay for itself within a year, and keep paying dividends after that.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              How a digital solution gets built
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              The process we follow at <Link href="/" className="text-[#0E7490] underline">We Make IT</Link> starts with understanding the problem in depth before writing any code. We map the current workflow, identify where things break down, and define what the ideal outcome looks like. Only then do we start designing and building.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              This approach catches a lot of expensive mistakes before they happen. It also gives you a much clearer picture of what you are getting, what it will cost, and what success looks like before you commit to a build.
            </p>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Have a business problem that needs a digital fix?
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Describe the problem to us. We will tell you whether there is a practical digital solution, roughly what it involves, and whether it makes financial sense to build it.
              </p>
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Describe your problem to us
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
