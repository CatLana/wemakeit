import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        "x-default": `${BASE_URL}/en/blog`,
        en: `${BASE_URL}/en/blog`,
        it: `${BASE_URL}/it/blog`,
        ru: `${BASE_URL}/ru/blog`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/blog`,
      siteName: "We Make IT",
      images: [{ url: `${BASE_URL}/api/og`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

const articles = [
  {
    slug: "got-an-idea-turn-it-into-a-real-product",
    category: "Product & Strategy",
    title: "Got a product idea? Here is how to turn it into something real",
    excerpt:
      "You have an idea but are not sure where to start. This guide walks you through every step from concept to working product, without wasting time or budget.",
    date: "1 May 2026",
    readTime: "6 min read",
  },
  {
    slug: "is-your-website-helping-your-business-grow",
    category: "Web Development",
    title: "Is your website helping your business grow? Here is how to tell",
    excerpt:
      "A website that sits there doing nothing is a missed opportunity. Learn how to tell if your site is generating business and what to do if it is not.",
    date: "1 May 2026",
    readTime: "5 min read",
  },
  {
    slug: "better-digital-presence-that-actually-works",
    category: "Digital Strategy",
    title: "How to build a digital presence that actually brings in business",
    excerpt:
      "Being online is not the same as being found. Learn how to audit your digital presence and make the changes that actually drive enquiries.",
    date: "1 May 2026",
    readTime: "6 min read",
  },
  {
    slug: "turn-business-problem-into-digital-solution",
    category: "Digital Transformation",
    title: "How to turn a business problem into a digital solution",
    excerpt:
      "Most recurring business problems have a digital fix. Learn how to identify what is costing you time and money, and how a custom digital tool can solve it.",
    date: "1 May 2026",
    readTime: "6 min read",
  },
  {
    slug: "have-an-idea-worth-building",
    category: "Product & Strategy",
    title: "Have an app idea? Here is how to know if it is worth building",
    excerpt:
      "Not every idea should be built into a product. Here is a practical way to stress-test your app idea before you spend time and money on development.",
    date: "1 May 2026",
    readTime: "5 min read",
  },
  {
    slug: "website-that-works-for-your-users",
    category: "Web Development & UX",
    title: "What does it mean for a website to work for your users?",
    excerpt:
      "A good-looking website that confuses visitors costs your business leads every day. Here is how to make your site work the way your users actually need it to.",
    date: "1 May 2026",
    readTime: "5 min read",
  },
  {
    slug: "validate-business-idea-design-thinking-value-proposition",
    category: "Strategy & Validation",
    title: "Is your business idea worth pursuing? How to validate profitability with Design Thinking",
    excerpt:
      "Most new ventures fail because they solve problems no one pays for. Use Design Thinking and the Value Proposition Canvas to test your idea cheaply before building anything.",
    date: "30 April 2026",
    readTime: "7 min read",
  },
  {
    slug: "free-expense-tracking-for-irish-sole-traders",
    category: "Admin & Finance",
    title: "Free expense tracking for Irish sole traders: the lean-start guide",
    excerpt:
      "Stop losing receipts. A practical, genuinely free system using Google Sheets and Google Drive to track all your business expenses year-round and be ready for your Form 11 each October.",
    date: "26 April 2026",
    readTime: "8 min read",
  },
  {
    slug: "irish-grants-for-app-development",
    category: "Funding",
    title: "Did you know you can fund your app idea with an Irish state grant?",
    excerpt:
      "If you run a small business in Ireland and have an idea for an app or online service, there are government supports that can cover a large chunk of the early work. Here is what is available and how to use it.",
    date: "24 March 2026",
    readTime: "7 min read",
  },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Page hero */}
        <section
          className="bg-[#0F172A] pt-32 pb-16"
          aria-labelledby="blog-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              Blog
            </span>
            <h1
              id="blog-heading"
              className="text-3xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl mb-4"
            >
              Ideas and guides for Irish entrepreneurs
            </h1>
            <p className="text-slate-400 text-lg max-w-xl">
              Practical advice on building apps, getting funding, and turning
              business ideas into real digital products.
            </p>
          </div>
        </section>

        {/* Articles grid */}
        <section
          className="bg-[#F8FAFC] py-16 lg:py-24"
          aria-label="Blog articles"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul
              role="list"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {articles.map((article) => (
                <li key={article.slug}>
                  <article className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-[#22D3EE]/50 hover:shadow-lg transition-all duration-200">
                    <div className="p-6 flex flex-col flex-1">
                      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-4">
                        {article.category}
                      </span>
                      <h2 className="text-base font-bold text-[#1E293B] leading-snug mb-3 flex-1">
                        {article.title}
                      </h2>
                      <p className="text-sm text-slate-500 leading-relaxed mb-5">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-5">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} aria-hidden="true" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} aria-hidden="true" />
                          {article.readTime}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${article.slug}`}
                        aria-label={`Read article: ${article.title}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors group-hover:gap-2 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                      >
                        Read article
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
            <p className="mt-14 text-center text-slate-500 text-sm">
              More articles coming soon.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
