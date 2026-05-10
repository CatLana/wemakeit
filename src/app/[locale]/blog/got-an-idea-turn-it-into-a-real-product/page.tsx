import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "got-an-idea-turn-it-into-a-real-product";

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
      "Got a Product Idea? Here Is How to Turn It Into Something Real | We Make IT",
    description:
      "You have an idea but you are not sure where to start. This guide walks you through every step from concept to working product, without wasting time or budget.",
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
      title: "Got a Product Idea? Here Is How to Turn It Into Something Real",
      description:
        "From first idea to working product: the practical steps Irish entrepreneurs follow to build apps and digital products that people actually use.",
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
          alt: "Turn your product idea into reality",
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
    headline: "Got a Product Idea? Here Is How to Turn It Into Something Real",
    description:
      "A practical guide for entrepreneurs on how to move from idea to working product, covering validation, prototyping, and building an MVP.",
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
      "turn idea into product ireland, build app from idea, product development ireland, app development ireland, idea to MVP ireland",
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
        name: "Got a Product Idea? Here Is How to Turn It Into Something Real",
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
                Product &amp; Strategy
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Got an idea that needs to become a real product?
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
              You have had the idea for a while. Maybe it came from a frustration at work, a gap you spotted in your industry, or a problem you kept running into yourself. The idea feels solid. But every time you try to figure out what to do next, you hit a wall.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              This is one of the most common places entrepreneurs get stuck. Not because the idea is bad, but because the path from idea to working product is not obvious unless you have done it before. This article walks you through that path, step by step.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Why most ideas never get built
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              It is not usually lack of budget that stops people. It is uncertainty. People do not know whether the idea is good enough to act on, who to talk to about building it, or how much it should cost. So they wait. And waiting becomes the default.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              There is also a fear of commitment. Starting feels like a big decision, and big decisions need certainty first. But the truth is the opposite: you need to start before you can get certain. The first steps in bringing an idea to life are specifically designed to reduce risk, not increase it.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              The good news is you do not need a fully formed idea to begin. You need a clear problem you want to solve and a basic sense of who has that problem. Everything else gets built from there.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The path from idea to product
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              Building a digital product follows a predictable sequence. Each stage answers a different question and reduces a different kind of risk.
            </p>

            <div className="space-y-5 mb-10">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Step 1: Validate the problem</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Before thinking about solutions, make sure the problem is real. Talk to 10 to 15 people who match your target customer. Ask them about their frustrations and how they currently deal with the problem. You are not pitching yet. You are listening. If the problem does not come up organically in those conversations, your assumption may need revisiting.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Step 2: Define the simplest solution</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Once you have confirmed the problem, resist the urge to solve everything at once. Ask yourself: what is the single most important thing this product needs to do? One core feature, done well, is more powerful than ten half-built features. This becomes your Minimum Viable Product, or MVP.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Step 3: Prototype and test</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A prototype is a clickable mockup of your product. It looks like the real thing but has no code behind it. You can put it in front of real users and watch how they interact with it. This tells you whether the design makes sense, before a single line of code is written. Prototypes can be created in days and typically cost a fraction of a full build.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Step 4: Build the MVP</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  With a validated prototype and clear requirements, development can begin. A good development team builds iteratively, showing you working software regularly so you can give feedback. You are not waiting months for a big reveal. You are involved throughout.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Step 5: Launch, learn, and improve</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The first version of a product is rarely the final version. Once real users interact with it, you learn things no amount of planning could have told you. The goal at launch is to get real usage data, then use it to decide what to build next.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Common mistakes to avoid
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Most product failures follow the same patterns. Knowing them in advance is the cheapest form of insurance you can get.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-3 mb-10 text-slate-600 text-base leading-relaxed">
              <li>
                <strong>Building too much too soon.</strong> Every feature you add before launch is a feature that slows you down, costs more, and may turn out to be unnecessary. Start small and add based on evidence.
              </li>
              <li>
                <strong>Skipping user research.</strong> Assumptions feel like knowledge. They are not. The only way to know whether people will use your product is to talk to the people you are building it for.
              </li>
              <li>
                <strong>Waiting for the idea to be perfect.</strong> A perfect idea that never gets built helps no one. Progress comes from doing, not from planning.
              </li>
              <li>
                <strong>Choosing the wrong technical partner.</strong> Not every developer can take an idea and help shape it into a product. Look for a team that asks about your users and your goals, not just the tech stack.
              </li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What working with a development team actually looks like
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              A lot of people picture hiring developers as a one-way transaction: you describe what you want, they build it, you get a bill. Good development partnerships are not like that.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              A strong team starts with a discovery conversation where they try to understand your users, the problem you are solving, and the outcome you want. From there, they help you scope the project, agree on priorities, and set a realistic budget. You get regular updates throughout the build and have real input at every stage.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              At <Link href="/" className="text-[#0E7490] underline">We Make IT</Link>, we work with founders and business owners from the idea stage. We help shape the product before writing any code, and we keep you involved at every checkpoint. If you have an idea but are not sure what the next step looks like, the best thing you can do is start a conversation.
            </p>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Ready to take your idea seriously?
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Tell us about your idea. We will tell you honestly what the next step looks like, what it costs, and whether we are a good fit for it. No commitment required.
              </p>
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Tell us about your idea
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
