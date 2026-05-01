import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "have-an-idea-worth-building";

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
      "Have an App Idea? Here Is How to Know If It Is Worth Building | We Make IT",
    description:
      "Not every idea should be built. Here is a practical way to stress-test your app or product idea before spending time and money on development.",
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
      title: "Have an App Idea? Here Is How to Know If It Is Worth Building",
      description:
        "A practical checklist for evaluating whether your app or product idea has real commercial potential before you invest in building it.",
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
          alt: "How to know if your app idea is worth building",
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
    headline: "Have an App Idea? Here Is How to Know If It Is Worth Building",
    description:
      "A checklist-driven guide to evaluating whether a product idea has real commercial potential, and how to test it before spending on development.",
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
      "app idea worth building ireland, idea validation ireland, how to evaluate startup idea, build app ireland, is my idea good enough",
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
        name: "Have an App Idea? Here Is How to Know If It Is Worth Building",
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
              Have an idea worth building?
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
              The number of good ideas that never became products is far larger than the number of products that exist. Most of those ideas were not abandoned because they were bad. They were abandoned because no one knew how to put them to the test without spending a lot of money first.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              The question &quot;is this worth building?&quot; is one of the most important questions in product development. Asking it early, and answering it honestly, is what separates the founders who build something people want from the ones who spend a year building something no one uses.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What makes an idea worth building
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              A product idea is worth building when it meets a few specific conditions. Not all of them need to be perfect, but the more clearly you can answer yes to each one, the stronger the foundation you are building on.
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>It solves a real problem people have right now.</strong> Not a problem they might have in the future, and not a problem you invented. A problem real people are experiencing today and trying, imperfectly, to deal with.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>People are already spending time or money on the problem.</strong> The strongest signal is that someone is already paying for a worse version of what you want to build. This means the demand exists; you are competing on quality, not on convincing people the problem is worth solving.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>You can name 10 real people who have this problem.</strong> If you cannot, the market may be too narrow. If you can name 10, you can talk to them, and those conversations are the most valuable research you can do.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0 mt-2.5"></div>
                <p className="text-slate-600 leading-relaxed text-base">
                  <strong>You understand the problem better than most.</strong> Domain knowledge is a genuine advantage. If you have worked in an industry and experienced the problem firsthand, you are starting ahead of someone who is building from the outside.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The questions to ask before you commit
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              Before spending anything on development, work through these questions honestly. Write the answers down. The clarity this produces is worth more than any feature list.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-4 mb-10 text-slate-600 text-base leading-relaxed">
              <li>
                <strong>Who exactly is this for?</strong> Not a demographic description. An actual type of person, with a specific problem, in a specific situation. &quot;Small business owners&quot; is not specific enough. &quot;Restaurant owners with two locations who manage bookings by phone&quot; is.
              </li>
              <li>
                <strong>What do they currently use to solve this problem?</strong> The answer is never &quot;nothing.&quot; People always have a workaround, even if it is bad. Understanding the current solution tells you what you are competing with and what switching will require.
              </li>
              <li>
                <strong>Would they pay for your solution?</strong> At what price? This is the hardest question and the most important one. A free alternative might get users, but a product needs paying customers. Ask real people: &quot;Would you pay X per month for this?&quot; The answer will surprise you.
              </li>
              <li>
                <strong>What would have to be true for this to work?</strong> Write down the three biggest assumptions your idea depends on. These are your riskiest hypotheses. The next step is testing them.
              </li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              How to test without spending much
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              You do not need to build a product to validate one. These approaches work in roughly ascending order of cost and confidence:
            </p>
            <ol className="list-decimal list-outside ml-5 space-y-4 mb-10 text-slate-600 text-base leading-relaxed">
              <li>
                <strong>Customer interviews (free, most valuable).</strong> Talk to 10 to 15 people who match your target. Ask about the problem, not about your solution. Listen carefully. If the problem does not come up unprompted, it may not be as painful as you think.
              </li>
              <li>
                <strong>A simple landing page (low cost).</strong> Describe the product in one sentence and ask people to sign up for early access. The sign-up rate tells you whether the idea resonates. Tools like Carrd or Webflow make this cheap and fast.
              </li>
              <li>
                <strong>A clickable prototype (affordable).</strong> A prototype shows people the product experience without any code behind it. You can test whether the design makes sense and whether people understand how to use it before committing to a build.
              </li>
              <li>
                <strong>Pre-selling (most validating).</strong> Offer the product to a small group of target customers before it exists. If someone is willing to pay upfront for something that is not built yet, that is the strongest possible validation signal.
              </li>
            </ol>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              When to bring in a development team
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              The right time to involve developers is after you have validated the problem and defined the core feature, not before. This does not mean you need a complete specification. It means you should be able to describe who you are building for, what the most important thing the product needs to do is, and why someone would pay for it.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              At <Link href="/" className="text-[#0E7490] underline">We Make IT</Link>, we regularly work with founders at this stage. We can help you pressure-test the idea, scope the MVP, and decide whether it makes sense to build before we start. If the idea needs more validation first, we will tell you that too.
            </p>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Think you have something worth building?
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Tell us about your idea. We will help you work out whether it has the legs to become a product, and what the right next step is.
              </p>
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Let&apos;s talk about your idea
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
