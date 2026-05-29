import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, ShieldAlert, Sparkles } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";

export const metadata: Metadata = {
  title: "Bank2Brick website audit report",
  description:
    "Private audit report for Bank2Brick covering UX, SEO, visual design, and accessibility. Specific issues highlighted by severity with a downloadable PDF.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: {
    canonical: `${BASE_URL}/audit/bank2brick`,
  },
  openGraph: {
    title: "Bank2Brick website audit report",
    description:
      "Private full-scope review for Bank2Brick across UX, SEO, UI, and accessibility.",
    url: `${BASE_URL}/audit/bank2brick`,
    siteName: "We Make IT",
    images: [
      { url: `${BASE_URL}/images/wemakeit_thumbnail.png`, width: 1200, height: 630 },
    ],
  },
  twitter: { card: "summary_large_image" },
};

// ─── Static data ────────────────────────────────────────────────────────────

const strengths = [
  {
    title: "Clear page flow",
    body: "The main pages guide visitors from first impression to practical next steps in a logical order.",
  },
  {
    title: "Social proof included",
    body: "Visible testimonials help reduce early-stage trust friction for new visitors.",
  },
  {
    title: "Multiple contact channels",
    body: "Users can reach out via form, email, or phone based on preference.",
  },
];

const severe = [
  {
    title: "No investment figures in plans",
    body: "The plan tiers do not show concrete pricing or entry thresholds, making decision-making difficult.",
  },
  {
    title: "Website builder trust signal",
    body: "Template-style presentation and builder branding reduce perceived credibility in a high-trust sector.",
  },
  {
    title: "Webador platform ceiling",
    body: "Limited control over technical SEO and infrastructure blocks advanced optimisation work.",
  },
];

const recommended = [
  {
    title: "Clarify CTA outcomes",
    body: "Use explicit action labels so users understand exactly what happens after each click.",
  },
  {
    title: "Improve plan comparison UX",
    body: "Add visual hierarchy and side-by-side cues to make the four tiers easier to compare.",
  },
  {
    title: "Strengthen accessibility baseline",
    body: "Add skip links and validate image alt text and focus behavior across key flows.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Bank2BrickAuditPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#22D3EE]">
            Private client report
          </span>
          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Bank2Brick: full website review
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            A structured review across user experience, SEO, visual design, and
            accessibility, with clear findings, prioritised fixes, and what is already
            working well.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                Reviewed
              </p>
              <p className="mt-2 text-sm text-white">13 May 2026</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                Visibility
              </p>
              <p className="mt-2 text-sm text-white">
                Private link · excluded from search indexing
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-amber-400/25 bg-amber-400/10 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">Review note</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              This report was produced on 13 May 2026 through a combination of manual
              inspection of the live site at{" "}
              <a
                href="https://www.bank2brick.ie"
                className="underline text-[#22D3EE]"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.bank2brick.ie
              </a>{" "}
              and automated checks. The site was publicly accessible at the time of the
              review. Note that the site is built on the Webador platform, which limits
              what can be assessed or improved without migrating to a custom build.
            </p>
          </div>
        </div>
      </section>

      {/* Three-column summary */}
      <section aria-label="Audit summary" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_1fr_1fr]">

            {/* Strengths */}
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-emerald-600" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    What is working
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#1E293B]">
                    Current strengths
                  </h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                These points are currently supporting trust and clarity on the site.
              </p>
              <div className="mt-6 space-y-4">
                {strengths.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-emerald-200 bg-white p-5"
                  >
                    <h3 className="text-lg font-bold text-[#1E293B]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Critical fixes */}
            <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-rose-600" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">
                    High priority
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#1E293B]">
                    Critical fixes
                  </h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                These issues should be addressed first because they affect trust,
                conversion, or technical control.
              </p>
              <div className="mt-6 space-y-4">
                {severe.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-rose-200 bg-white p-5"
                  >
                    <h3 className="text-lg font-bold text-[#1E293B]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Recommended improvements */}
            <section className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Sparkles className="text-cyan-700" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">
                    Next step
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#1E293B]">
                    Recommended improvements
                  </h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                These actions improve usability and long-term growth after critical fixes.
              </p>
              <div className="mt-6 space-y-4">
                {recommended.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-cyan-200 bg-white p-5"
                  >
                    <h3 className="text-lg font-bold text-[#1E293B]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0F172A] p-8 text-center text-white sm:p-12">
            <h2 className="text-3xl font-extrabold">Ready to turn this into a fix list?</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              We can help you prioritise the work, redesign for trust, and build something
              that gives you full control. Request a free, no-obligation quote and we&apos;ll
              get back to you within 48 hours.
            </p>
            <div className="mt-8">
              <a
                href="https://www.wemakeit.ie/en#quote"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                Go to the quote form
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
