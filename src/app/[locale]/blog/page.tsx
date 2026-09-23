import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  Calendar,
  Clock,
  Bug,
  ClipboardCheck,
  Euro,
  Target,
  type LucideIcon,
} from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const AUTHOR = "Svetlana Savchenko";

const COVER_ICONS: Record<string, LucideIcon> = {
  "what-a-technical-audit-checks": ClipboardCheck,
  "vibe-coding-technical-debt-explained": Bug,
  "irish-grants-for-app-development": Euro,
  "validate-business-idea-design-thinking-value-proposition": Target,
};

export async function generateStaticParams() {
  return [{ locale: "en" }];
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
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/blog`,
      siteName: "We Make IT",
      images: [{ url: `${BASE_URL}/images/wemakeit_thumbnail.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

const articles = [
  {
    slug: "ai-built-app-rescue-guide",
    category: "AI & Software",
    title: "My AI-built app worked, until it didn't: a practical rescue guide",
    excerpt:
      "Your Lovable, Bolt, or Cursor app worked until it didn't. How to tell if it needs a professional review, what a rescue involves, and what it costs.",
    date: "20 September 2026",
    readTime: "11 min read",
    image: "/images/frustrated-developer.jpg",
    imageAlt: "A person with their head in their hands, frustrated while looking at their laptop screen",
  },
  {
    slug: "signs-ai-app-needs-professional-review",
    category: "AI & Software",
    title: "7 signs your Lovable, Bolt, or Cursor app needs a professional review",
    excerpt:
      "Different AI coding tools fail in different ways. Tool-by-tool signs your app needs a professional security and architecture review.",
    date: "20 September 2026",
    readTime: "10 min read",
    image: "/images/technical-consultation-call.jpg",
    imageAlt: "Two people in conversation at a desk with a laptop open, reviewing something together",
  },
  {
    slug: "what-a-technical-audit-checks",
    category: "AI & Software",
    title: "What a technical audit of an AI-built app actually checks",
    excerpt:
      "A concrete walkthrough of what a technical audit covers: authentication, data exposure, secrets, error handling, architecture, and dependencies.",
    date: "20 September 2026",
    readTime: "8 min read",
  },
  {
    slug: "vibe-coding-technical-debt-explained",
    category: "AI & Software",
    title: "Vibe coding technical debt: what it is and how to check for it",
    excerpt:
      "A plain-English guide to vibe coding technical debt, why AI-generated code accumulates it, and five checks you can run yourself before calling a developer.",
    date: "20 September 2026",
    readTime: "9 min read",
  },
  {
    slug: "accessibility-law-ireland-eaa-guide",
    category: "Accessibility & Legal",
    title: "Accessibility law in Ireland: EAA compliance guide for your website or application",
    excerpt:
      "Detailed information on who must comply, which services are in scope, penalties, and practical WCAG 2.1 AA steps for Irish and EU-facing website and software businesses.",
    date: "15 May 2026",
    readTime: "12 min read",
    image: "/images/blog-accessibility-eaa-guide.jpg",
    imageAlt: "A hand holding a lens up to a laptop keyboard, examining it closely",
  },
  {
    slug: "legal-requirements-diy-brand-website",
    category: "Compliance & Legal",
    title: "DIY brand website legal checklist: forms, GDPR, cookies, accessibility",
    excerpt:
      "All you need to know when creating your brand website yourself: legal requirements for forms, GDPR, cookie consent, and accessibility in Ireland and the EU.",
    date: "15 May 2026",
    readTime: "9 min read",
    image: "/images/blog-diy-website-legal.jpg",
    imageAlt: "A desk with an open notebook full of handwritten notes, sticky notes, and a laptop, mid DIY website build",
  },
  {
    slug: "got-an-idea-turn-it-into-a-real-product",
    category: "Product & Strategy",
    title: "Got a product idea? Here is how to turn it into something real",
    excerpt:
      "You have an idea but are not sure where to start. This guide walks you through every step from concept to working product, without wasting time or budget.",
    date: "1 May 2026",
    readTime: "6 min read",
    image: "/images/start-up-make-mistakes-faster.jpg",
    imageAlt: "Sticky notes reading Start Up and Make Mistakes Faster next to a laptop",
  },
  {
    slug: "is-your-website-helping-your-business-grow",
    category: "Web Development",
    title: "Is your website helping your business grow? Here is how to tell",
    excerpt:
      "A website that sits there doing nothing is a missed opportunity. Learn how to tell if your site is generating business and what to do if it is not.",
    date: "1 May 2026",
    readTime: "5 min read",
    image: "/images/blog-website-helping-business-grow.jpg",
    imageAlt: "A business owner on the phone, looking concerned while checking something on their laptop",
  },
  {
    slug: "better-digital-presence-that-actually-works",
    category: "Digital Strategy",
    title: "How to build a digital presence that actually brings in business",
    excerpt:
      "Being online is not the same as being found. Learn how to audit your digital presence and make the changes that actually drive enquiries.",
    date: "1 May 2026",
    readTime: "6 min read",
    image: "/images/blog-digital-presence-that-works.jpg",
    imageAlt: "Someone searching for a business name on Google from a laptop",
  },
  {
    slug: "turn-business-problem-into-digital-solution",
    category: "Digital Transformation",
    title: "How to turn a business problem into a digital solution",
    excerpt:
      "Most recurring business problems have a digital fix. Learn how to identify what is costing you time and money, and how a custom digital tool can solve it.",
    date: "1 May 2026",
    readTime: "6 min read",
    image: "/images/blog-business-problem-to-solution.jpg",
    imageAlt: "Someone sketching a website structure on a whiteboard, working through the problem step by step",
  },
  {
    slug: "have-an-idea-worth-building",
    category: "Product & Strategy",
    title: "Have an app idea? Here is how to know if it is worth building",
    excerpt:
      "Not every idea should be built into a product. Here is a practical way to stress-test your app idea before you spend time and money on development.",
    date: "1 May 2026",
    readTime: "5 min read",
    image: "/images/don't-quit-do-it.jpg",
    imageAlt: "A monitor reading Don't Quit above a laptop with a design mockup open, mid work session",
  },
  {
    slug: "website-that-works-for-your-users",
    category: "Web Development & UX",
    title: "What does it mean for a website to work for your users?",
    excerpt:
      "A good-looking website that confuses visitors costs your business leads every day. Here is how to make your site work the way your users actually need it to.",
    date: "1 May 2026",
    readTime: "5 min read",
    image: "/images/blog-website-works-for-users.jpg",
    imageAlt: "Someone looking at their phone with a frustrated expression, mid scroll",
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
    slug: "web-accessibility-ireland",
    category: "Accessibility & Legal",
    title:
      "Web accessibility in Ireland: what the European Accessibility Act means for your business",
    excerpt:
      "From June 2025, the European Accessibility Act extends legal web accessibility requirements to private businesses in Ireland. Here is what you need to know, with practical steps you can take now.",
    date: "28 April 2026",
    readTime: "8 min read",
    image: "/images/blog-web-accessibility-ireland.jpg",
    imageAlt: "A mixed group of colleagues collaborating around a table with laptops, notebooks, and design materials",
  },
  {
    slug: "free-expense-tracking-for-irish-sole-traders",
    category: "Admin & Finance",
    title: "Free expense tracking for Irish sole traders: the lean-start guide",
    excerpt:
      "Stop losing receipts. A practical, genuinely free system using Google Sheets and Google Drive to track all your business expenses year-round and be ready for your Form 11 each October.",
    date: "26 April 2026",
    readTime: "8 min read",
    image: "/images/blog-expense-tracking-sole-traders.jpg",
    imageAlt: "A sole trader going through paperwork at their desk, laptop open beside them",
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

function ArticleThumb({ article }: { article: (typeof articles)[number] }) {
  if (article.image) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-slate-100">
        <Image
          src={article.image}
          alt={article.imageAlt ?? ""}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
    );
  }
  const Icon = COVER_ICONS[article.slug] ?? ClipboardCheck;
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0F172A] to-[#0E7490] flex items-center justify-center">
      <Icon size={48} strokeWidth={1.5} className="text-[#22D3EE]/80" aria-hidden="true" />
    </div>
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [featured, ...rest] = articles;
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

        {/* Featured article */}
        <section className="bg-[#F8FAFC] pt-16 lg:pt-24" aria-label="Featured article">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="group grid md:grid-cols-2 bg-white rounded-2xl border border-slate-200 hover:border-[#22D3EE]/50 hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="relative aspect-video md:aspect-auto overflow-hidden bg-slate-100">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt ?? ""}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#0E7490]">
                    {(() => {
                      const Icon = COVER_ICONS[featured.slug] ?? ClipboardCheck;
                      return <Icon size={64} strokeWidth={1.5} className="text-[#22D3EE]/80" aria-hidden="true" />;
                    })()}
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-4">
                  <span className="rounded-full bg-[#22D3EE]/15 text-[#0E7490] px-2 py-0.5">Latest</span>
                  {featured.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B] leading-snug mb-3">
                  {featured.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-6">
                  <span>{AUTHOR}</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} aria-hidden="true" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} aria-hidden="true" />
                    {featured.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  aria-label={`Read article: ${featured.title}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors group-hover:gap-2 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded self-start"
                >
                  Read article
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
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
              {rest.map((article) => (
                <li key={article.slug}>
                  <article className="group h-full flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-[#22D3EE]/50 hover:shadow-lg transition-all duration-200 overflow-hidden">
                    <ArticleThumb article={article} />
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
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mb-5">
                        <span>{AUTHOR}</span>
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
