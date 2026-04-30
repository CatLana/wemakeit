import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, AlertCircle } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "validate-business-idea-design-thinking-value-proposition";

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
      "Is Your Business Idea Worth Pursuing? How to Validate Profitability with Design Thinking",
    description:
      "Most new ventures fail because they solve problems no one pays for. Use Design Thinking and the Value Proposition Canvas to test your idea cheaply before building anything.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en/blog/${SLUG}`,
      },
    },
    openGraph: {
      title:
        "Is Your Business Idea Worth Pursuing? Validate with Design Thinking",
      description:
        "Use Design Thinking and Alex Osterwalder's Value Proposition Canvas to test your business idea's profitability before spending a penny on a full build.",
      type: "article",
      publishedTime: "2026-04-30T00:00:00.000Z",
      authors: ["We Make IT"],
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: ogLocale,
      images: [
        {
          url: `${BASE_URL}/api/og`,
          width: 1200,
          height: 630,
          alt: "Validate your business idea with Design Thinking and Value Proposition Canvas",
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
      "Is Your Business Idea Worth Pursuing? How to Validate Profitability with Design Thinking and Value Proposition Design",
    description:
      "Use Design Thinking and the Value Proposition Canvas to test your business idea cheaply before building anything.",
    datePublished: "2026-04-30T00:00:00.000Z",
    dateModified: "2026-04-30T00:00:00.000Z",
    author: {
      "@type": "Person",
      name: "Svetlana Savchenko",
      url: "https://www.linkedin.com/in/svetlana-savchenko-08868764",
    },
    publisher: {
      "@type": "Organization",
      name: "We Make IT",
      url: "https://www.wemakeit.ie",
    },
    image: "https://www.wemakeit.ie/api/og",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${SLUG}`,
    },
    inLanguage: "en",
    about: [
      { "@type": "Thing", name: "Design Thinking" },
      { "@type": "Thing", name: "Value Proposition Canvas" },
      { "@type": "Thing", name: "Business idea validation" },
    ],
    keywords:
      "validate business idea ireland, design thinking idea validation, value proposition canvas, mvp ireland, how to validate startup idea, business idea profitability",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://www.wemakeit.ie/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `https://www.wemakeit.ie/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Is Your Business Idea Worth Pursuing?",
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
                Strategy &amp; Validation
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Is Your Business Idea Worth Pursuing? How to Validate Profitability
              with Design Thinking
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                30 April 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                7 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Most new ventures fail not because the founders weren&apos;t smart or
              didn&apos;t work hard enough — they fail because they built something
              nobody wanted to pay for. The problem is usually invisible until
              you&apos;ve already spent months (and a lot of money) building it.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              The good news: there is a well-tested method for catching this
              early. Combining{" "}
              <a
                href="https://www.interaction-design.org/literature/topics/design-thinking"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                Design Thinking
              </a>
              , idea validation experiments, and Alex Osterwalder&apos;s{" "}
              <a
                href="https://www.strategyzer.com/library/the-value-proposition-canvas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                Value Proposition Canvas
              </a>{" "}
              lets you stress-test your idea cheaply — before writing a single
              line of code.
            </p>

            {/* Section 1 */}
            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Start with empathy: understand your customer&apos;s world
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Design Thinking always begins with empathy — really understanding
              the people you want to help before you jump to a solution. The
              practical tool for this is a <strong>Customer Profile</strong>,
              which maps three things:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 text-base leading-relaxed">
              <li>
                <strong>Jobs to be done</strong> — what tasks, goals, or
                problems is your customer trying to deal with?
              </li>
              <li>
                <strong>Pains</strong> — what frustrates them, blocks them, or
                costs them money and time right now?
              </li>
              <li>
                <strong>Gains</strong> — what outcomes or benefits are they
                actually hoping for?
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Without clarity here, no amount of great execution will save the
              product. Industry data consistently shows that over 90% of startup
              failures trace back to poor alignment with real customer needs —
              not technical failure.
            </p>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 mb-10">
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-semibold text-[#1E293B]">
                  Worked example:
                </span>{" "}
                A busy restaurant owner (job: manage table bookings efficiently)
                has a specific pain — no-shows wasting reserved tables — and a
                specific gain they want: full bookings without having to
                overstaff to compensate. A solution built around this profile
                has a fighting chance. A generic &quot;restaurant management app&quot;
                built from assumptions does not.
              </p>
            </div>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              At{" "}
              <Link
                href="/"
                className="text-[#0E7490] underline"
              >
                We Make IT
              </Link>
              , this empathy-mapping step is baked into our MVP process. We run
              it before writing a single user story.
            </p>

            {/* Section 2 */}
            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Use the Value Proposition Canvas to find fit
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Alex Osterwalder&apos;s{" "}
              <a
                href="https://www.strategyzer.com/library/value-proposition-design-2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                Value Proposition Canvas
              </a>{" "}
              (from his book <em>Value Proposition Design</em>) is a one-page
              tool split into two halves:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 text-base leading-relaxed">
              <li>
                <strong>Right side — Customer Profile:</strong> the jobs, pains,
                and gains you mapped above.
              </li>
              <li>
                <strong>Left side — Value Map:</strong> your pain relievers
                (how you reduce their pains), gain creators (how you deliver the
                benefits they want), and the actual products or services you
                offer.
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              <strong>Fit</strong> happens when your Value Map genuinely
              addresses the most important pains and gains on the Customer
              Profile. Not all pains and gains — just the ones that actually
              matter to the customer.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              A useful lens here is the difference between{" "}
              <strong>inside-out</strong> design (starting from what you already
              have and can build) versus{" "}
              <strong>outside-in</strong> design (starting from what the customer
              actually needs, then working back to the solution). The second
              approach consistently produces better product-market fit.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              You can download a free canvas template directly from{" "}
              <a
                href="https://www.strategyzer.com/library/the-value-proposition-canvas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                Strategyzer
              </a>
              .
            </p>

            {/* Section 3 */}
            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Validate step by step: cheap experiments before expensive builds
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Once you have a Value Proposition Canvas filled in, you have a set
              of assumptions. Each one is a hypothesis that could be wrong.
              Rank them by risk — how bad would it be if this assumption turned
              out to be false? Then test the riskiest ones first, as cheaply as
              possible.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-4">
              Start with a specific, falsifiable hypothesis. For example:{" "}
              <em>
                &quot;Restaurant owners will pay €50/month to reduce no-shows by
                50%.&quot;
              </em>{" "}
              Then pick the cheapest test that could prove or disprove it:
            </p>
            <ol className="list-decimal list-outside ml-5 space-y-3 mb-5 text-slate-600 text-base leading-relaxed">
              <li>
                <strong>Customer interviews</strong> — talk to 10–20 people who
                match your target profile. Ask open questions:{" "}
                <em>&quot;Tell me about your biggest frustration with X.&quot;</em>{" "}
                Listen more than you talk. Never pitch — just listen.
              </li>
              <li>
                <strong>Surveys</strong> — get 50+ responses on specific
                willingness-to-pay questions. Use a tool like Tally or Google
                Forms.
              </li>
              <li>
                <strong>Landing page</strong> — build one page describing the
                solution (Carrd or Framer work well) and track how many
                visitors sign up for early access. A 5% conversion rate is a
                meaningful signal.
              </li>
              <li>
                <strong>Prototype</strong> — paper sketches, Figma mockups, or
                a no-code MVP. Get it in front of real users before committing
                to a full build.
              </li>
            </ol>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Each experiment produces data. Measure it, learn from it, and
              either iterate or pivot. This is the core of the{" "}
              <strong>Build–Measure–Learn</strong> loop from Lean Startup, and
              it is the fastest known way to reduce the risk of a new product.
              The{" "}
              <a
                href="https://online.hbs.edu/blog/post/market-validation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                Harvard Business School
              </a>{" "}
              puts market validation as the single most important early step for
              any new venture.
            </p>

            {/* Section 4 */}
            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Crunch the profitability numbers early
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Validation is not just about whether people want your solution —
              it is also about whether the numbers work. Before you build
              anything, do a back-of-envelope calculation:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 text-base leading-relaxed">
              <li>
                <strong>Market size</strong> — estimate your TAM (Total
                Addressable Market), SAM (Serviceable Available Market), and
                SOM (Serviceable Obtainable Market).
              </li>
              <li>
                <strong>Willingness to pay</strong> — what came out of your
                interviews and surveys?
              </li>
              <li>
                <strong>Costs and margins</strong> — what does it cost to
                deliver the product? What&apos;s your gross margin? When do you
                break even?
              </li>
            </ul>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 mb-10">
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-semibold text-[#1E293B]">
                  Quick sanity check:
                </span>{" "}
                100 customers paying €20/month with 50% gross margin = €12,000
                profit per year. Is that enough to justify the build? If not,
                what would need to change — price, volume, or cost structure?
                Run this before committing to anything.
              </p>
            </div>

            {/* Section 5 — key steps */}
            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Your validation checklist
            </h2>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 mb-10">
              <ul className="space-y-3 text-sm text-slate-700">
                {[
                  "Fill in a Value Proposition Canvas — jobs, pains, gains on the right; pain relievers, gain creators on the left",
                  "Rank your assumptions by risk — which ones, if wrong, would kill the idea?",
                  "Schedule 10 customer interviews this week — listen, don't pitch",
                  "Launch a one-page landing page and measure sign-up conversion",
                  "Run a quick profitability calculation before committing to a build",
                  "Download the free canvas template from Strategyzer",
                  "If the numbers and signals look good, build an MVP — not the full product",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 w-5 h-5 rounded-full bg-[#22D3EE] text-[#0F172A] font-extrabold text-xs flex items-center justify-center shrink-0"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful links */}
            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Useful resources
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-3 mb-10 text-slate-600 leading-relaxed">
              <li>
                <a
                  href="https://www.strategyzer.com/library/the-value-proposition-canvas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] underline font-semibold"
                >
                  Strategyzer — Value Proposition Canvas (free download)
                </a>{" "}
                — the original tool from Alex Osterwalder, with instructions
              </li>
              <li>
                <a
                  href="https://www.interaction-design.org/literature/topics/design-thinking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] underline font-semibold"
                >
                  Interaction Design Foundation — Design Thinking
                </a>{" "}
                — a thorough, free reference covering all five stages
              </li>
              <li>
                <a
                  href="https://online.hbs.edu/blog/post/market-validation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] underline font-semibold"
                >
                  Harvard Business School Online — How to validate your business idea
                </a>{" "}
                — 5-step framework with practical guidance
              </li>
              <li>
                <a
                  href="https://www.localenterprise.ie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] underline font-semibold"
                >
                  Local Enterprise Office (LEO)
                </a>{" "}
                — free mentoring and start-your-own-business training across
                Ireland, including idea validation support
              </li>
            </ul>

            {/* Disclaimer */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 flex gap-4 mb-12">
              <AlertCircle
                size={18}
                className="text-slate-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-sm text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-600">
                  Important:
                </span>{" "}
                This article is for general information only and does not
                constitute business, legal, or financial advice. Market
                conditions change — always verify current data with your own
                research and consult a qualified advisor before making
                significant business decisions.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <p className="text-white font-extrabold text-xl mb-2">
                Got an idea you&apos;d like to validate?
              </p>
              <p className="text-slate-400 text-sm mb-6">
                We run Design Thinking workshops and build custom MVPs for
                founders across Ireland and Europe. Free first consultation, no
                commitment.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Tell us your idea
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
