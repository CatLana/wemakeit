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
  ShieldAlert,
  KeyRound,
  Bug,
  GitBranch,
  UserX,
  TrendingDown,
  HelpCircle,
  AlertTriangle,
  Code2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function RescueGraphic() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 grid grid-cols-2 mb-10">
      <div aria-hidden="true" className="bg-rose-50 p-6 sm:p-10 flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-rose-100 border border-rose-200">
          <AlertTriangle size={26} className="text-rose-500" strokeWidth={1.75} />
        </div>
        <Code2 size={16} className="text-rose-400" strokeWidth={1.75} />
      </div>
      <div aria-hidden="true" className="bg-[#0F172A] p-6 sm:p-10 flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/30">
          <CheckCircle2 size={26} className="text-[#22D3EE]" strokeWidth={1.75} />
        </div>
        <ShieldCheck size={16} className="text-[#22D3EE]/70" strokeWidth={1.75} />
      </div>
      <p className="bg-rose-50 py-3 text-center text-xs font-semibold uppercase tracking-widest text-rose-500 border-t border-rose-100">
        Worked, until it didn&apos;t
      </p>
      <p className="bg-[#0F172A] py-3 text-center text-xs font-semibold uppercase tracking-widest text-[#22D3EE] border-t border-white/10">
        Reviewed and stable
      </p>
    </div>
  );
}

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "ai-built-app-rescue-guide";

const STATS = [
  { value: "45%", label: "of AI-generated code contains security vulnerabilities", source: "GitClear, 2025" },
  { value: "10x", label: "spike in security findings at Fortune 50 firms after AI adoption", source: "Apiiro research" },
  { value: "60%", label: "drop in refactoring activity once teams lean on AI tools", source: "GitClear, 153M lines analysed" },
];

const SIGNS = [
  {
    icon: ShieldAlert,
    title: "You don't know who can see your data",
    body: "Row-level security, permissions, and access rules are the kind of thing AI tools skip unless explicitly asked. If nobody has checked who can read or edit what, assume the answer is \"more people than should.\"",
  },
  {
    icon: KeyRound,
    title: "API keys or secrets are visible in the code",
    body: "AI assistants regularly hard-code credentials directly into files instead of environment variables. If a key has ever been pasted into a prompt or committed to the repository, treat it as compromised.",
  },
  {
    icon: Bug,
    title: "The same bug keeps coming back",
    body: "When a fix does not hold, it usually means the AI patched the symptom in one place without understanding where else that logic was duplicated. That duplication is a hallmark of AI-generated code.",
  },
  {
    icon: GitBranch,
    title: "You are afraid to ask for a new feature",
    body: "If adding one feature reliably breaks two others, the app's architecture was not planned, it was assembled prompt by prompt. That fragility gets worse, not better, the longer it continues.",
  },
  {
    icon: UserX,
    title: "The person who built it can't explain it",
    body: "Whether that is you, a co-founder, or a freelancer who has since moved on, if nobody on the team can draw the system's architecture from memory, nobody can safely change it either.",
  },
  {
    icon: TrendingDown,
    title: "Every new prompt makes it slower to build the next thing",
    body: "Early progress with AI tools is fast because there is no debt yet to work around. When each change takes longer than the last, that is the debt compounding, not the tool losing its edge.",
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
    title: "My AI-Built App Broke: A Practical Rescue Guide | We Make IT",
    description:
      "Your Lovable, Bolt, or Cursor app worked until it didn't. Here is how to tell if it needs a professional review, what a rescue actually involves, and what it costs to fix an AI-built app.",
    alternates: {
      canonical: canonicalUrl,
      languages: { "x-default": `${BASE_URL}/en/blog/${SLUG}`, en: `${BASE_URL}/en/blog/${SLUG}` },
    },
    openGraph: {
      title: "My AI-Built App Broke: A Practical Rescue Guide",
      description:
        "Your AI-built app worked until it didn't. How to tell if it needs a professional review, what a rescue involves, and what it costs.",
      type: "article",
      publishedTime: "2026-09-20T00:00:00.000Z",
      authors: ["We Make IT"],
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: "en_IE",
      images: [{ url: `${BASE_URL}/images/wemakeit_thumbnail.png`, width: 1200, height: 630, alt: "AI-built app rescue guide" }],
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
    headline: "My AI-Built App Broke: A Practical Rescue Guide",
    description:
      "How to tell if an AI-built app needs a professional review, what a technical rescue involves, and what it costs to fix.",
    datePublished: "2026-09-20T00:00:00.000Z",
    dateModified: "2026-09-20T00:00:00.000Z",
    author: { "@type": "Person", name: "Svetlana Savchenko", url: "https://www.linkedin.com/in/svetlana-savchenko-08868764" },
    publisher: { "@type": "Organization", name: "We Make IT", url: BASE_URL },
    image: `${BASE_URL}/images/wemakeit_thumbnail.png`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/${locale}/blog/${SLUG}` },
    inLanguage: locale,
    about: [
      { "@type": "Thing", name: "Vibe coding technical debt" },
      { "@type": "Thing", name: "AI-generated code security" },
      { "@type": "Thing", name: "Technical audit" },
    ],
    keywords:
      "AI built app broken, fix AI built app, vibe coding rescue, hire developer to fix AI app, AI app technical debt, Lovable Bolt Cursor app problems, technical audit AI generated code",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: "My AI-Built App Broke: A Practical Rescue Guide" },
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
              My AI-built app worked, until it didn&apos;t: a practical rescue guide
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                20 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                11 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <RescueGraphic />

            <p className="text-slate-600 leading-relaxed text-base mb-5">
              It probably started well. You described what you wanted, an AI tool like Lovable, Bolt, Cursor, or Replit wrote the code, and within a weekend you had something that worked. Then a few weeks in, something changed. A feature you added broke two others. A bug you fixed came back. Or someone asked a question about your users&apos; data that you realised you could not confidently answer.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              None of that means you made a mistake building with AI. It means you have reached the point every AI-built product reaches: the point where the code needs a human who understands what it is actually doing. This guide explains why that happens, how to tell if it has happened to you, and what fixing it actually involves.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Why AI-built apps break in predictable ways
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              &quot;Vibe coding&quot;, describing what you want in plain language and accepting the code an AI tool generates without a deep review, is genuinely fast for a first version. The problem is not the tool. It is what a prompt-by-prompt workflow leaves out by default: no architecture plan, no consistent data model, no security review, and no one asking whether this new feature duplicates logic that already exists somewhere else in the app.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Each individual change can look correct. What accumulates underneath is technical debt: decisions that were never made, only avoided, because the AI generated something that ran without erroring. It works, until the gaps between those unmade decisions start colliding with each other. For a closer look at the mechanism, see our guide to{" "}
              <Link href="/blog/vibe-coding-technical-debt-explained" className="text-[#0E7490] underline">
                vibe coding technical debt
              </Link>.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The numbers behind the problem
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              This is not a fringe issue. Independent research on AI-assisted development points the same direction:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-3xl font-extrabold text-[#0E7490] mb-2">{stat.value}</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">{stat.label}</p>
                  <p className="text-xs text-slate-400">{stat.source}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mb-10">
              GitClear&apos;s analysis covered 153 million lines of code before and after widespread AI tool adoption. Apiiro&apos;s figures come from monitoring security findings across Fortune 50 engineering teams. Neither is specific to any one AI coding tool.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-6">
              6 signs your app needs a professional look
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              You do not need to be technical to notice most of these. If two or more sound familiar, it is worth getting a second opinion before you build anything else on top.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {SIGNS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={18} className="text-rose-500 shrink-0" aria-hidden="true" />
                    <p className="font-bold text-[#1E293B] text-sm">{title}</p>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-6">
              What a rescue actually looks like
            </h2>
            <ol className="space-y-6 mb-10">
              {[
                {
                  n: "01",
                  title: "Technical audit",
                  body: "A developer reads the actual codebase: data model, authentication, access rules, and the areas most likely to break next. This produces a written list of what is broken, what is risky, and what is simply messy but safe to leave for now.",
                },
                {
                  n: "02",
                  title: "Triage",
                  body: "Not everything found needs fixing immediately. Security and data-exposure issues get flagged as urgent. Everything else gets ranked by how much it is actually costing you, not by how untidy it looks.",
                },
                {
                  n: "03",
                  title: "Decide: patch or rebuild",
                  body: "Most AI-built apps do not need a full rewrite. If the core idea is validated and the data model is salvageable, targeted fixes are usually cheaper and faster. A rebuild only makes sense when the foundation itself cannot support what you are trying to do.",
                },
                {
                  n: "04",
                  title: "Fix the urgent issues first",
                  body: "Security and data-exposure problems get closed before anything else, regardless of what else is on the list. This is the point where a real access-control model and proper secret management usually replace whatever the AI tool defaulted to.",
                },
                {
                  n: "05",
                  title: "Stabilise, then hand back or hand over",
                  body: "Once the app is safe and predictable to change, you either keep building on it yourself with a clearer map of how it works, or move to ongoing support so someone is watching it going forward.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-5">
                  <span aria-hidden="true" className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0F172A] text-[#22D3EE] font-extrabold text-sm flex items-center justify-center">
                    {n}
                  </span>
                  <div>
                    <p className="font-bold text-[#1E293B] mb-1">{title}</p>
                    <p className="text-slate-600 leading-relaxed text-sm">{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What it costs
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Exact figures vary hugely with how far an app has grown before the review happens, so treat any number quoted online, including here, as a rough starting point rather than a quote. What is consistent across the projects we see is the direction: the longer an AI-built app runs on an unreviewed foundation, the more expensive the eventual fix becomes, because every new feature gets built on top of the same gaps.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              A technical audit is the cheapest way to find out where you actually stand. It gives you a concrete list and a cost estimate for fixing it, instead of a guess. You can then decide whether to fix it yourself with that list in hand, or have it fixed for you.
            </p>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 flex gap-4 mb-12">
              <AlertCircle size={18} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-600">Important:</span>{" "}
                The statistics in this guide come from independent industry research current as of September 2026 and are not specific to any single AI coding tool. This article is general information, not a substitute for a review of your specific codebase.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <div className="flex justify-center mb-3">
                <HelpCircle size={28} className="text-[#22D3EE]" aria-hidden="true" />
              </div>
              <p className="text-white font-extrabold text-xl mb-2">
                Not sure how much trouble you are actually in?
              </p>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                Order a technical audit and get a written report on what is broken, what is risky, and what to fix first, delivered within 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/audit"
                  className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  Order a technical audit
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 border border-white/20 text-white font-semibold rounded-xl hover:border-white/40 hover:bg-white/5 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  Book a technical consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
