import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  AlertCircle,
  KeyRound,
  Database,
  Lock,
  ShieldAlert,
  Layers,
  Package,
} from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "what-a-technical-audit-checks";

const CATEGORIES = [
  {
    icon: Lock,
    title: "Authentication & access control",
    body: "How login works, whether sessions expire sensibly, and whether a logged-in user can only do what they should be able to do, not just what the interface happens to show them.",
  },
  {
    icon: Database,
    title: "Data exposure & row-level security",
    body: "Whether your database's own access rules, not just your app's interface, actually stop one user from reading or editing another user's data if they call the API directly.",
  },
  {
    icon: KeyRound,
    title: "Secrets & credential management",
    body: "Whether API keys, database credentials, or third-party tokens are hard-coded into the source rather than kept in environment variables where they cannot leak through the repository.",
  },
  {
    icon: ShieldAlert,
    title: "Input validation & error handling",
    body: "What happens when a form gets unexpected input, a request fails partway through, or a third-party service times out. Unhandled cases here are where most real-world outages start.",
  },
  {
    icon: Layers,
    title: "Architecture & duplication",
    body: "Whether the same logic is implemented more than once in different places, which is the clearest fingerprint of prompt-by-prompt development and the main reason fixes stop holding.",
  },
  {
    icon: Package,
    title: "Dependencies & deployment configuration",
    body: "Whether the libraries the app depends on have known vulnerabilities, and whether production settings, like debug modes or verbose error messages, were accidentally left switched on.",
  },
];

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `${BASE_URL}/${locale}/blog/${SLUG}`;

  return {
    title: "What a Technical Audit of an AI-Built App Actually Checks | We Make IT",
    description:
      "A concrete walkthrough of what a technical audit covers: authentication, data exposure, secrets, error handling, architecture, and dependencies, with a sample finding.",
    alternates: {
      canonical: canonicalUrl,
      languages: { "x-default": `${BASE_URL}/en/blog/${SLUG}`, en: `${BASE_URL}/en/blog/${SLUG}` },
    },
    openGraph: {
      title: "What a Technical Audit of an AI-Built App Actually Checks",
      description:
        "A concrete walkthrough of what a technical audit covers, with a sample finding from a real report.",
      type: "article",
      publishedTime: "2026-09-20T00:00:00.000Z",
      authors: ["We Make IT"],
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: "en_IE",
      images: [{ url: `${BASE_URL}/images/wemakeit_thumbnail.png`, width: 1200, height: 630, alt: "What a technical audit checks" }],
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
    headline: "What a Technical Audit of an AI-Built App Actually Checks",
    description:
      "A concrete walkthrough of what a technical audit covers: authentication, data exposure, secrets, error handling, architecture, and dependencies.",
    datePublished: "2026-09-20T00:00:00.000Z",
    dateModified: "2026-09-20T00:00:00.000Z",
    author: { "@type": "Person", name: "Svetlana Savchenko", url: "https://www.linkedin.com/in/svetlana-savchenko-08868764" },
    publisher: { "@type": "Organization", name: "We Make IT", url: BASE_URL },
    image: `${BASE_URL}/images/wemakeit_thumbnail.png`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/${locale}/blog/${SLUG}` },
    inLanguage: locale,
    about: [
      { "@type": "Thing", name: "Technical audit" },
      { "@type": "Thing", name: "Code security review" },
      { "@type": "Thing", name: "AI-generated code" },
    ],
    keywords:
      "technical audit AI app, what does a code audit check, AI app security audit checklist, website code audit Ireland, app security review checklist",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: "What a Technical Audit of an AI-Built App Actually Checks" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
                AI &amp; Software
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              What a technical audit of an AI-built app actually checks
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                20 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                8 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <p className="text-slate-600 leading-relaxed text-base mb-10">
              &quot;Technical audit&quot; can sound vague, like something that produces a long document nobody reads. In practice it is a specific, bounded piece of work: a developer reads your actual codebase against six categories, and you get a written list of exactly what needs fixing, ranked by how urgent it is. Here is what those six categories actually cover.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-6">
              The 6 areas we check
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {CATEGORIES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0F172A] mb-3">
                    <Icon size={18} className="text-[#22D3EE]" aria-hidden="true" />
                  </div>
                  <p className="font-bold text-[#1E293B] text-sm mb-1.5">{title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What a finding actually looks like
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Every item in the report follows the same format: what we found, how serious it is, and roughly what it takes to fix. A real entry reads something like this.
            </p>
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-500">High priority</span>
                <span className="text-xs font-semibold text-slate-500">Est. fix: ~2 hours</span>
              </div>
              <p className="font-bold text-[#1E293B] mb-2">Row-level security disabled on the &quot;orders&quot; table</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Any authenticated user can currently read or modify any customer&apos;s order data by calling the database API directly, bypassing the app&apos;s own interface entirely. Fix: enable row-level security and scope policies to the authenticated user&apos;s own records.
              </p>
            </div>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Lower-priority findings follow the same structure but get flagged as safe to leave for now, so you are never looking at one undifferentiated wall of problems. The point is to tell you what actually matters this week, not everything that could theoretically be tidier.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What you get
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              A written report delivered within 48 hours, with no call required to get started. Every finding is ranked by priority, includes a plain-English explanation of the risk, and comes with a rough estimate of what fixing it involves. A free 30-minute follow-up call is included if you want to talk through the results.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              From there, you can hand the report to your own developer, or come back to us to fix what is on it. Either way, you are making that decision from a concrete list instead of a guess.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Patch or rebuild?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Most AI-built apps do not need a full rewrite. The audit is what tells you which category yours falls into: whether the foundation is sound and just needs specific fixes, or whether the architecture itself cannot support what you are trying to build and a rebuild is genuinely the faster path. For more on how that decision gets made, see our{" "}
              <Link href="/blog/ai-built-app-rescue-guide" className="text-[#0E7490] underline">
                practical rescue guide
              </Link>.
            </p>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 flex gap-4 mb-12">
              <AlertCircle size={18} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-600">Note:</span>{" "}
                The sample finding above illustrates the report&apos;s format and is not from a specific client project. Fix-time estimates in a real report are specific to your codebase.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <p className="text-white font-extrabold text-xl mb-2">
                Want to know exactly where your app stands?
              </p>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                Order a technical audit and get a written, prioritised report within 48 hours. No call required to get started.
              </p>
              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Order a technical audit
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
