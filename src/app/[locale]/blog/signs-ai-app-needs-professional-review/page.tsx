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
  Database,
  Server,
  Eye,
  Users,
  CreditCard,
  Layers,
  ShieldQuestion,
} from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "signs-ai-app-needs-professional-review";

const SIGNS = [
  {
    icon: Database,
    title: "You built with Lovable and never manually checked Supabase",
    body: "Lovable creates Supabase tables but does not enable row-level security or write access policies by default. Without them, any logged-in user can read or edit any row in the database by calling the Supabase API directly, bypassing your app's interface entirely.",
  },
  {
    icon: Server,
    title: "You built with Replit Agent and it deployed its own backend",
    body: "Replit's agent can spin up real running servers on your behalf, not just a database and frontend. That means the risk surface includes exposed ports, service configuration, and server-side code, not just database permissions.",
  },
  {
    icon: Eye,
    title: "You built with Cursor and rarely read the diff before accepting",
    body: "Fewer than half of developers using AI coding assistants review the generated code before committing it, according to recent adoption research, even though most say they don't fully trust its correctness. If that describes how the app was built, assume nothing has been reviewed yet.",
  },
  {
    icon: Layers,
    title: "You built with Bolt.new and shipped within days",
    body: "Bolt is built for speed from prompt to a working full-stack app, which is exactly why review tends to get skipped. Fast is not the same as reviewed, and the two are easy to confuse when something demoes well.",
  },
  {
    icon: Users,
    title: "The app handles real user accounts",
    body: "Login, personal details, or anything a user would consider private raises the stakes considerably. An access-control gap in a portfolio site is a curiosity. The same gap in an app with user accounts is a data breach waiting to be found.",
  },
  {
    icon: CreditCard,
    title: "The app handles payments",
    body: "Payment integrations built through a prompt-based workflow need the same scrutiny a human-built checkout would get: webhook verification, idempotency, and what happens when a payment succeeds but the confirmation step fails.",
  },
  {
    icon: ShieldQuestion,
    title: "Nobody could walk through the app's security model out loud",
    body: "If no one on the team can currently explain who can see what data and why, in plain language, without opening the code, that is the clearest sign of all. It means the security model was never actually decided, only defaulted into.",
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
    title: "7 Signs Your Lovable, Bolt, or Cursor App Needs a Professional Review | We Make IT",
    description:
      "Different AI coding tools fail in different ways. Tool-by-tool signs your Lovable, Bolt.new, Replit, or Cursor-built app needs a professional security and architecture review.",
    alternates: {
      canonical: canonicalUrl,
      languages: { "x-default": `${BASE_URL}/en/blog/${SLUG}`, en: `${BASE_URL}/en/blog/${SLUG}` },
    },
    openGraph: {
      title: "7 Signs Your Lovable, Bolt, or Cursor App Needs a Professional Review",
      description:
        "Different AI coding tools fail in different ways. Tool-by-tool signs your app needs a professional review.",
      type: "article",
      publishedTime: "2026-09-20T00:00:00.000Z",
      authors: ["We Make IT"],
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: "en_IE",
      images: [{ url: `${BASE_URL}/images/wemakeit_thumbnail.png`, width: 1200, height: 630, alt: "Signs your AI-built app needs a professional review" }],
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
    headline: "7 Signs Your Lovable, Bolt, or Cursor App Needs a Professional Review",
    description:
      "Tool-by-tool signs your Lovable, Bolt.new, Replit, or Cursor-built app needs a professional security and architecture review.",
    datePublished: "2026-09-20T00:00:00.000Z",
    dateModified: "2026-09-20T00:00:00.000Z",
    author: { "@type": "Person", name: "Svetlana Savchenko", url: "https://www.linkedin.com/in/svetlana-savchenko-08868764" },
    publisher: { "@type": "Organization", name: "We Make IT", url: BASE_URL },
    image: `${BASE_URL}/images/wemakeit_thumbnail.png`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/${locale}/blog/${SLUG}` },
    inLanguage: locale,
    about: [
      { "@type": "Thing", name: "Lovable Supabase security" },
      { "@type": "Thing", name: "AI coding tools" },
      { "@type": "Thing", name: "Technical audit" },
    ],
    keywords:
      "Lovable app security, is my Lovable app secure, Bolt.new technical debt, Replit Agent security, Cursor AI code review risk, AI app needs developer review, Supabase row level security",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: "7 Signs Your Lovable, Bolt, or Cursor App Needs a Professional Review" },
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
              7 signs your Lovable, Bolt, or Cursor app needs a professional review
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                20 September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                10 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Lovable, Bolt.new, Replit Agent, and Cursor all generate working code from a plain-language prompt, but they do not fail in the same way. Each has a different default architecture and a different point where human review typically gets skipped. Knowing which tool built your app tells you where to look first.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Our{" "}
              <Link href="/blog/ai-built-app-rescue-guide" className="text-[#0E7490] underline">
                rescue guide
              </Link>{" "}
              covers the general behavioural signs, like bugs that keep coming back. This one is about the specific gaps tied to how each tool actually builds your app.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Lovable and Supabase: the row-level security gap
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Lovable builds most apps on Supabase. When it creates a database table, it runs the equivalent of a CREATE TABLE statement, but it does not automatically enable row-level security or write the access policies that decide who can read or change which rows. Without those policies, any authenticated user can call the Supabase API directly and read or edit any row in the table, completely bypassing your app&apos;s own interface.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              This is not a hypothetical. Security researcher Matt Palmer disclosed CVE-2025-48757 in May 2025 after finding 303 exposed endpoints across 170 production Lovable apps, leaking emails, addresses, and in some cases API keys. Follow-up analysis found row-level security was bypassed on 10.3% of the Lovable apps checked. If you built on Lovable and have never opened your Supabase dashboard to check this specifically, it is worth five minutes to look.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Replit Agent: real servers change the risk profile
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Replit&apos;s agent goes further than generating a frontend and a database. It can provision and run an actual backend server on your behalf. That is powerful, but it also means the things worth checking are different: which ports and services are exposed, whether server-side environment variables are configured correctly, and whether the server process itself has been kept up to date. A database-focused security check is not enough here.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Bolt.new: fast is not the same as reviewed
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Bolt is built around speed, from a prompt to a working full-stack app in one browser session, and it is genuinely good at that. The tradeoff is that the workflow rarely builds in a review step, and independent comparisons of AI prototyping tools consistently flag Bolt&apos;s output as needing more debugging and cleanup before it is production-ready. A working demo and a production-ready app are different bars, and Bolt is optimised for the first one.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Cursor and AI-assisted IDEs: the review gap
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Tools like Cursor sit closer to how developers already work, suggesting code inline as you build rather than generating a whole app from one prompt. That makes them feel more reviewed by default, but recent data says otherwise: fewer than half of developers review AI-generated code before committing it, even though the same developers report not fully trusting its correctness. Research tracking Cursor adoption found a 41% increase in code complexity and a 30% rise in static analysis warnings over time. 82% of companies surveyed said AI-generated code is creating a form of technical debt they are not yet equipped to manage.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-6">
              7 signs worth acting on
            </h2>
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

            <p className="text-slate-600 leading-relaxed text-base mb-10">
              None of this is a reason to regret building with AI tools. It is a reason to treat the result the way you would treat a contractor&apos;s first draft: probably fine in places, definitely worth a second pair of eyes before you rely on it. For what that second look actually involves, see{" "}
              <Link href="/blog/what-a-technical-audit-checks" className="text-[#0E7490] underline">
                what a technical audit checks
              </Link>.
            </p>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 flex gap-4 mb-12">
              <AlertCircle size={18} className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-600">Important:</span>{" "}
                Tool behaviour changes as these products update. The patterns described here reflect published research and vendor documentation current as of September 2026. Always verify your own app&apos;s specific configuration rather than assuming.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <p className="text-white font-extrabold text-xl mb-2">
                Recognised more than one of these?
              </p>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                A technical audit checks the specific gaps for your tool and gives you a written, prioritised list of what to fix.
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
