import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog: App and Business Ideas for Irish Entrepreneurs | We Make IT",
  description:
    "Practical guides on building apps, finding funding, and turning your business idea into a digital product. Written for Irish entrepreneurs by the We Make IT team.",
};

const articles = [
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

export default function BlogPage() {
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
