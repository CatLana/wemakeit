import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { Check, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "pricing";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `${BASE_URL}/${locale}/${SLUG}`;

  const titles: Record<string, string> = {
    en: "Transparent Pricing | Project-Based & Retainer Plans | We Make IT",
    it: "Prezzi Trasparenti | Piani Fissi e Retainer | We Make IT",
    ru: "Прозрачное ценообразование | Фиксированные цены и ретейнеры | We Make IT",
  };

  const descriptions: Record<string, string> = {
    en: "Clear, transparent pricing for web & app development. Fixed projects from €4,200 or monthly retainers from €800. No hidden costs.",
    it: "Prezzi trasparenti per sviluppo web e app. Progetti fissi da €4.200 o retainer mensili da €800. Nessun costo nascosto.",
    ru: "Прозрачные цены для веб- и app-разработки. Фиксированные проекты от €4.200 или ежемесячные ретейнеры от €800. Нет скрытых расходов.",
  };

  return {
    title: titles[locale] || titles["en"],
    description: descriptions[locale] || descriptions["en"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${BASE_URL}/en/${SLUG}`,
        en: `${BASE_URL}/en/${SLUG}`,
        it: `${BASE_URL}/it/${SLUG}`,
        ru: `${BASE_URL}/ru/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] || titles["en"],
      description: descriptions[locale] || descriptions["en"],
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${BASE_URL}/api/og`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PricingPage({
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
        {/* Hero */}
        <section className="bg-[#0F172A] pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
                Transparent Pricing
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                Clear pricing. No surprises.
              </h1>
              <p className="text-lg text-slate-400 mb-6">
                Whether you need a one-time project or ongoing support, we offer flexible plans tailored to your business.
              </p>
              <p className="text-sm text-slate-500">
                All prices in EUR. Custom enterprise quotes available —{" "}
                <Link href="/#quote" className="text-[#22D3EE] underline hover:text-cyan-300">
                  get in touch
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Monthly Retainers */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mb-3">
                Monthly Support &amp; Retainers
              </h2>
              <p className="text-slate-600 text-lg">
                Predictable monthly costs. Dedicated support, priority response, and ongoing optimization.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Starter */}
              <div className="rounded-2xl border border-slate-200 p-8 hover:border-[#22D3EE]/50 hover:shadow-lg transition-all duration-200">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Starter</h3>
                <p className="text-sm text-slate-500 mb-6">For solo founders &amp; early-stage startups</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-[#1E293B]">€800</span>
                  <span className="text-slate-500 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Priority email support (24–48 hr response)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Security patches &amp; updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Uptime monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Bug fixes &amp; minor tweaks</span>
                  </li>
                </ul>
                <Link
                  href="/#quote"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-slate-100 text-[#1E293B] font-semibold rounded-xl hover:bg-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  Get Started
                </Link>
              </div>

              {/* Growth - Most Popular */}
              <div className="rounded-2xl border-2 border-[#22D3EE] p-8 bg-[#22D3EE]/5 relative hover:shadow-lg transition-all duration-200">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-[#22D3EE] text-[#0F172A] text-xs font-bold uppercase rounded-full">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Growth</h3>
                <p className="text-sm text-slate-500 mb-6">For growing SMEs &amp; scaling startups</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-[#1E293B]">€1,800</span>
                  <span className="text-slate-500 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>All Starter benefits +</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Feature enhancements &amp; small improvements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Analytics &amp; performance setup</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Quarterly optimization review</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Slack channel for quick questions</span>
                  </li>
                </ul>
                <Link
                  href="/#quote"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#22D3EE] text-[#0F172A] font-semibold rounded-xl hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
                >
                  Get Started
                  <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                </Link>
              </div>

              {/* Scale */}
              <div className="rounded-2xl border border-slate-200 p-8 hover:border-[#22D3EE]/50 hover:shadow-lg transition-all duration-200">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Scale</h3>
                <p className="text-sm text-slate-500 mb-6">For established businesses &amp; agencies</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-[#1E293B]">€3,500</span>
                  <span className="text-slate-500 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>All Growth benefits +</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Dedicated developer (flexible hours)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Priority phone &amp; video support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Architecture &amp; strategy consultations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#22D3EE] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Monthly business review meeting</span>
                  </li>
                </ul>
                <Link
                  href="/#quote"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-slate-100 text-[#1E293B] font-semibold rounded-xl hover:bg-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <p className="text-center text-sm text-slate-500">
              Retainers are month-to-month. Cancel anytime with 30 days&apos; notice.
            </p>
          </div>
        </section>

        {/* Fixed-Price Projects */}
        <section className="bg-slate-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mb-3">
                Fixed-Price Projects
              </h2>
              <p className="text-slate-600 text-lg">
                One-time builds with clear scope, fixed timeline, and predictable cost.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Idea Validation Sprint */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Idea Validation Sprint</h3>
                <p className="text-sm text-slate-500 mb-4">2-week design sprint + user testing</p>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-[#1E293B]">€6,500</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Customer interviews (8–10 people)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Wireframes &amp; low-fidelity prototype
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Usability testing &amp; feedback report
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Go/no-go recommendation
                  </li>
                </ul>
                <Link
                  href="/#quote"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors"
                >
                  Discuss your idea
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* UX Audit */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">UX &amp; Accessibility Audit</h3>
                <p className="text-sm text-slate-500 mb-4">WCAG 2.1 compliance + UX improvements</p>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-[#1E293B]">€4,200</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Full WCAG 2.1 AA audit
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    UX heuristic review
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Detailed remediation roadmap
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Priority fixes (top 5 issues)
                  </li>
                </ul>
                <Link
                  href="/#quote"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors"
                >
                  Start audit
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Website MVP */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Website MVP</h3>
                <p className="text-sm text-slate-500 mb-4">5–10 pages, CMS, SEO-ready. 6-week delivery.</p>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-[#1E293B]">€8,500</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Responsive design (mobile-first)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Headless CMS (easy content updates)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    SEO setup &amp; analytics
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Contact forms &amp; newsletter signup
                  </li>
                </ul>
                <Link
                  href="/#quote"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors"
                >
                  Build my site
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Custom Web App */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Custom Web App</h3>
                <p className="text-sm text-slate-500 mb-4">2–3 core features, API, database. 8-week delivery.</p>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-[#1E293B]">€18,000</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    User authentication &amp; roles
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Core business logic (custom API)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Database design &amp; setup
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Testing &amp; quality assurance
                  </li>
                </ul>
                <Link
                  href="/#quote"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors"
                >
                  Build my app
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Mobile App MVP */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Mobile App MVP</h3>
                <p className="text-sm text-slate-500 mb-4">iOS + Android, 1 core feature. 10-week delivery.</p>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-[#1E293B]">€22,000</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Native or cross-platform build
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Cloud backend &amp; real-time sync
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    App Store &amp; Play Store submission
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Push notifications &amp; analytics
                  </li>
                </ul>
                <Link
                  href="/#quote"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors"
                >
                  Build my app
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Design Thinking + Build */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Design Thinking + Build</h3>
                <p className="text-sm text-slate-500 mb-4">Full discovery, design, &amp; MVP. 12-week delivery.</p>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-[#1E293B]">€35,000</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Customer research &amp; interviews
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Value Proposition Canvas workshop
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    High-fidelity design &amp; prototype
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Full custom build (web or mobile)
                  </li>
                </ul>
                <Link
                  href="/#quote"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors"
                >
                  Let&apos;s design together
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Add-Ons */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#1E293B] mb-12">
              Add-Ons &amp; Extras
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Localisation (per market)</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€3,500</p>
                <p className="text-sm text-slate-600">
                  Translation, RTL setup, currency &amp; locale formatting.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">API Integration</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€2,000–€5,000</p>
                <p className="text-sm text-slate-600">
                  Third-party service integration (payment, CRM, email).
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Performance Optimization</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€1,500–€3,500</p>
                <p className="text-sm text-slate-600">
                  Speed tuning, CDN setup, caching, SEO audit.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Team Training</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€500/hour</p>
                <p className="text-sm text-slate-600">
                  Teach your team how to use the platform independently.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Migration Service</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€2,000–€8,000</p>
                <p className="text-sm text-slate-600">
                  Move from old platform, data migration, zero downtime.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Custom Reporting</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€1,000–€3,000</p>
                <p className="text-sm text-slate-600">
                  Build dashboards, reporting tools, custom metrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#1E293B] mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  Do you offer discounts for bundled services?
                </h3>
                <p className="text-slate-600">
                  Yes. Combining services (e.g., Design + Build, or UX Audit + fixes) typically saves 10–15%. We&apos;ll provide a custom quote.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  What&apos;s not included in the prices above?
                </h3>
                <p className="text-slate-600">
                  Third-party service costs (hosting, domains, SMS, payment gateway fees) are billed separately at cost.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  Can I start with Starter and upgrade later?
                </h3>
                <p className="text-slate-600">
                  Absolutely. Many clients start with Starter (€800/mo), then move to Growth (€1,800/mo). Zero penalty.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  Do you offer payment plans?
                </h3>
                <p className="text-slate-600">
                  Yes. For projects over €10,000, we offer 50/50 split payment (50% upfront, 50% at delivery).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  What if I need hours above my retainer?
                </h3>
                <p className="text-slate-600">
                  Overage hours are billed at €100/hour. Starter plan can top up at the same rate.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  Do you work with international clients?
                </h3>
                <p className="text-slate-600">
                  Yes. We serve clients across Ireland, EU, UK, and beyond. Time zone is rarely an issue.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-2xl bg-[#0F172A] p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Still have questions?
              </h3>
              <p className="text-slate-300 mb-6">
                Every business is different. Let&apos;s discuss your specific needs.
              </p>
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Book a free consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}