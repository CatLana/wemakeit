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
  Search,
  FolderGit2,
  Users,
  Layers,
  Lock,
} from "lucide-react";

const MESSY_NODES = [
  [70, 70], [170, 130], [50, 190], [210, 210], [140, 60], [270, 140], [100, 230], [290, 50], [180, 260],
];
const MESSY_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 5], [5, 6], [6, 0], [4, 7], [7, 5], [3, 8], [8, 2], [1, 7],
];
const CLEAN_NODES = [[450, 200], [540, 120], [630, 190]];

function TangleGraphic() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-[#0F172A] mb-10">
      <svg
        viewBox="0 0 700 300"
        className="w-full h-auto"
        role="img"
        aria-label="Diagram contrasting a tangled, densely cross-connected cluster of nodes on the left with a simple, clean three-node path on the right"
      >
        {MESSY_EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={MESSY_NODES[a][0]}
            y1={MESSY_NODES[a][1]}
            x2={MESSY_NODES[b][0]}
            y2={MESSY_NODES[b][1]}
            stroke="#F87171"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
        ))}
        {MESSY_NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" fill="#0F172A" stroke="#F87171" strokeOpacity="0.7" strokeWidth="2" />
        ))}

        <line x1="330" y1="150" x2="410" y2="150" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />

        <line x1={CLEAN_NODES[0][0]} y1={CLEAN_NODES[0][1]} x2={CLEAN_NODES[1][0]} y2={CLEAN_NODES[1][1]} stroke="#22D3EE" strokeWidth="2.5" />
        <line x1={CLEAN_NODES[1][0]} y1={CLEAN_NODES[1][1]} x2={CLEAN_NODES[2][0]} y2={CLEAN_NODES[2][1]} stroke="#22D3EE" strokeWidth="2.5" />
        {CLEAN_NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="8" fill="#0F172A" stroke="#22D3EE" strokeWidth="2.5" />
        ))}

        <text x="180" y="290" textAnchor="middle" fontSize="13" fontWeight="700" fill="#F87171" opacity="0.8">
          Unplanned
        </text>
        <text x="540" y="260" textAnchor="middle" fontSize="13" fontWeight="700" fill="#22D3EE">
          Reviewed
        </text>
      </svg>
    </div>
  );
}

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "vibe-coding-technical-debt-explained";

const SELF_CHECKS = [
  {
    icon: Search,
    title: "Search your codebase for exposed keys",
    body: "Search the whole project (not just one file) for the words \"key\", \"secret\", or \"password\" followed by an actual value. AI tools frequently hard-code these directly instead of using environment variables.",
  },
  {
    icon: Lock,
    title: "Check who can read your database",
    body: "If you use Supabase, Firebase, or a similar backend, open its dashboard and check whether row-level security or access rules are actually turned on, not just present in a settings menu.",
  },
  {
    icon: FolderGit2,
    title: "Look for repeated logic",
    body: "If the same feature, like sending an email or checking a subscription, appears written slightly differently in three different files, that is duplication. Each copy is a separate place a future bug can hide.",
  },
  {
    icon: Layers,
    title: "Try to draw the data model from memory",
    body: "Sketch, on paper, what data your app stores and how the pieces connect. If you cannot, without opening the code, that gap is exactly what makes future changes risky and slow.",
  },
  {
    icon: Users,
    title: "Ask whether anyone reviewed the AI's output",
    body: "If every piece of this app was accepted because it ran without an error, rather than because a person read and understood it, assume nothing has been reviewed yet, including the parts that look fine.",
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
    title: "Vibe Coding Technical Debt: What It Is and How to Check for It | We Make IT",
    description:
      "A plain-English guide to vibe coding technical debt: what it is, why AI-generated code accumulates it, and five checks you can run yourself before calling a developer.",
    alternates: {
      canonical: canonicalUrl,
      languages: { "x-default": `${BASE_URL}/en/blog/${SLUG}`, en: `${BASE_URL}/en/blog/${SLUG}` },
    },
    openGraph: {
      title: "Vibe Coding Technical Debt: What It Is and How to Check for It",
      description:
        "A plain-English guide to vibe coding technical debt and five checks you can run yourself before calling a developer.",
      type: "article",
      publishedTime: "2026-09-20T00:00:00.000Z",
      authors: ["We Make IT"],
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: "en_IE",
      images: [{ url: `${BASE_URL}/images/wemakeit_thumbnail.png`, width: 1200, height: 630, alt: "Vibe coding technical debt explained" }],
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
    headline: "Vibe Coding Technical Debt: What It Is and How to Check for It",
    description:
      "A plain-English guide to vibe coding technical debt, why AI-generated code accumulates it, and how to check whether your app has it.",
    datePublished: "2026-09-20T00:00:00.000Z",
    dateModified: "2026-09-20T00:00:00.000Z",
    author: { "@type": "Person", name: "Svetlana Savchenko", url: "https://www.linkedin.com/in/svetlana-savchenko-08868764" },
    publisher: { "@type": "Organization", name: "We Make IT", url: BASE_URL },
    image: `${BASE_URL}/images/wemakeit_thumbnail.png`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/${locale}/blog/${SLUG}` },
    inLanguage: locale,
    about: [
      { "@type": "Thing", name: "Vibe coding" },
      { "@type": "Thing", name: "Technical debt" },
      { "@type": "Thing", name: "AI-generated code security" },
    ],
    keywords:
      "vibe coding technical debt, what is vibe coding, AI generated code security, is my AI app secure, vibe coding risks, AI code review",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: "Vibe Coding Technical Debt: What It Is and How to Check for It" },
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
              Vibe coding technical debt: what it is and how to check for it
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                20 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                9 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <TangleGraphic />

            <p className="text-slate-600 leading-relaxed text-base mb-10">
              <strong>Vibe coding technical debt</strong> is the gap between what an AI-generated app appears to do and what its underlying code actually supports safely. It builds up because tools like Lovable, Bolt, Cursor, and Replit generate working code from a plain-language description without the architecture planning, security review, or consistency checks a developer would normally apply, so problems accumulate silently until a change exposes them.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              How vibe coding creates debt in the first place
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              When you describe a feature to an AI tool, it generates code that is statistically likely to work for that specific request, based on patterns in code it has seen before. It is not reasoning about your app&apos;s architecture, checking whether similar logic already exists elsewhere, or asking whether this approach will still make sense once you have twenty features instead of two.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              A developer working manually would normally catch this by holding the whole system in their head as they go. An AI tool re-derives its answer fresh for each prompt, so consistency across the app depends entirely on how carefully each prompt was written. Over dozens of prompts, small inconsistencies compound into the pattern researchers now call vibe coding technical debt: duplicated logic, inconsistent data handling, and security gaps that were never deliberately introduced, just never deliberately closed either.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What the research shows
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 leading-relaxed">
              <li>84% of developers now use AI coding tools day to day, but trust in the accuracy of what they generate fell from 43% to 29% in a single year (Stack Overflow, 2025 Developer Survey)</li>
              <li>A Carnegie Mellon study of over 800 GitHub repositories found consistent architectural inconsistency patterns in AI-assisted codebases</li>
              <li>Credential exposure, API keys and secrets left in code, occurs roughly twice as often in AI-assisted development as in traditional development</li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              None of this means AI coding tools are not worth using. It means the code they produce needs the same kind of review any junior developer&apos;s first draft would get, and right now, most of it is not getting one.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-6">
              5 checks you can run yourself, no developer required
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              These will not catch everything a professional audit would, but they take about twenty minutes and will tell you whether it is worth getting one.
            </p>
            <div className="space-y-5 mb-10">
              {SELF_CHECKS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-xl border border-slate-200 p-5 flex gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0F172A] shrink-0">
                    <Icon size={18} className="text-[#22D3EE]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B] mb-1">{title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What a professional audit adds
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              The checks above find obvious problems. What they will not find is the subtler stuff: whether your data model can actually support the features you are planning next, whether your authentication logic has a gap that only shows up under a specific sequence of actions, or how much a proper fix will realistically cost versus a rebuild.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              That is the difference between a self-check and a technical audit: a self-check tells you whether to worry, an audit tells you exactly what to do about it, in writing, with a cost attached. If several of the checks above turned up problems, our{" "}
              <Link href="/blog/ai-built-app-rescue-guide" className="text-[#0E7490] underline">
                practical rescue guide
              </Link>{" "}
              walks through what happens next.
            </p>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 flex gap-4 mb-12">
              <AlertCircle size={18} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-600">Important:</span>{" "}
                Figures in this article come from independent industry research current as of September 2026: the Stack Overflow Developer Survey and academic and industry studies of AI-assisted codebases. They describe industry-wide patterns, not a guarantee about any specific app.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <p className="text-white font-extrabold text-xl mb-2">
                Ran the checks and found something?
              </p>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                A technical audit gives you a full written report within 48 hours: what needs fixing, what can wait, and what it will cost.
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
