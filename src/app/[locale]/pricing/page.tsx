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
    en: "Transparent pricing for web & app development in Ireland. Fixed projects from €4,200 or monthly retainers from €800. All prices exclude VAT.",
    it: "Prezzi trasparenti per sviluppo web e app in Irlanda. Progetti fissi da €4.200 o retainer mensili da €800. Prezzi IVA esclusa.",
    ru: "Прозрачные цены для веб- и app-разработки. Фиксированные проекты от €4.200 или ежемесячные ретейнеры от €800. Цены без НДС.",
  };

  const ogLocale =
    locale === "it" ? "it_IT" : locale === "ru" ? "ru_RU" : "en_IE";

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
      siteName: "We Make IT",
      locale: ogLocale,
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

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web & App Development Services",
    provider: { "@type": "Organization", name: "We Make IT", url: BASE_URL },
    areaServed: ["IE", "EU", "GB"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "We Make IT — Service Packages",
      itemListElement: [
        { "@type": "Offer", name: "Starter Retainer", price: "800", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Growth Retainer", price: "1800", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Scale Retainer", price: "3500", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Idea Validation Sprint", price: "6500", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Accessibility & UX Audit", price: "4200", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Website Build", price: "8500", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Custom Web App", price: "18000", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Mobile App Build", price: "22000", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Product Discovery & Build", price: "35000", priceCurrency: "EUR" },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are your prices inclusive of VAT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All prices shown are exclusive of VAT. Irish VAT at 23% applies to B2B services provided in Ireland. EU businesses with a valid VAT number may be eligible for VAT reverse charge.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer discounts for bundled services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Combining services (e.g., UX Audit + fixes, or Discovery + Build) typically saves 10–15%. We'll provide a custom quote.",
        },
      },
      {
        "@type": "Question",
        name: "What's not included in the prices above?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Third-party service costs (hosting, domains, SMS, payment gateway fees) are billed separately at cost. We always flag these upfront.",
        },
      },
      {
        "@type": "Question",
        name: "Can I start with Starter and upgrade later?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Many clients start with Starter (€800/mo, 8 hrs), then move to Growth (€1,800/mo, 20 hrs) when they need more. Zero penalty to upgrade.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer payment plans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. For projects over €10,000, we offer 50/50 split payment (50% upfront, 50% at delivery). For larger projects, staged milestones are available.",
        },
      },
      {
        "@type": "Question",
        name: "What if I need more hours than my retainer includes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each retainer includes a set allowance: Starter (8 hrs/mo), Growth (20 hrs/mo), Scale (40 hrs/mo). Hours over your plan are billed at €100/hour, or you can upgrade your tier at any time.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with international clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We serve clients across Ireland, EU, UK, and beyond. We work fully remotely and time zones are rarely an issue.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
                All prices in EUR, exclusive of VAT. Custom enterprise quotes available —{" "}
                <Link href="/#quote" className="text-[#22D3EE] underline hover:text-cyan-300">
                  get in touch
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Monthly Retainers */}
        <section aria-labelledby="retainers-heading" className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 id="retainers-heading" className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mb-3">
                Monthly Support &amp; Retainers
              </h2>
              <p className="text-slate-600 text-lg">
                Predictable monthly costs. Your development team on tap — support, improvements, and expert advice included.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Starter */}
              <div className="rounded-2xl border border-slate-200 p-8 hover:border-[#22D3EE]/50 hover:shadow-lg transition-all duration-200">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Starter</h3>
                <p className="text-sm text-slate-500 mb-6">For solo founders &amp; early-stage startups</p>
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-[#1E293B]">€800</span>
                  <span className="text-slate-500 ml-2">/month</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">Up to 8 hours/month included</p>
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
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-[#1E293B]">€1,800</span>
                  <span className="text-slate-500 ml-2">/month</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">Up to 20 hours/month included</p>
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
                    <span>Dedicated messaging channel for quick questions</span>
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
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-[#1E293B]">€3,500</span>
                  <span className="text-slate-500 ml-2">/month</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">Up to 40 hours/month included</p>
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
        <section aria-labelledby="projects-heading" className="bg-slate-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 id="projects-heading" className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mb-3">
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

              {/* Website Build */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Website Build</h3>
                <p className="text-sm text-slate-500 mb-4">5–10 pages, easy content editing, SEO-ready. 6-week delivery.</p>
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
                    Easy content management (update text &amp; images yourself)
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
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/#quote"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors"
                  >
                    Build my site
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/services/web-development"
                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-2"
                  >
                    Full service details
                  </Link>
                </div>
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

              {/* Mobile App Build */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Mobile App Build</h3>
                <p className="text-sm text-slate-500 mb-4">iOS &amp; Android, core features. 10-week delivery.</p>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-[#1E293B]">€22,000</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[#22D3EE] shrink-0 mt-1" aria-hidden="true" />
                    Native or cross-platform build (iOS &amp; Android)
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
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/#quote"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors"
                  >
                    Build my app
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/services/mobile-app-development"
                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-2"
                  >
                    Full service details
                  </Link>
                </div>
              </div>

              {/* Product Discovery & Build */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Product Discovery &amp; Build</h3>
                <p className="text-sm text-slate-500 mb-4">Research, design &amp; full product build. 12-week delivery.</p>
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
        <section aria-labelledby="addons-heading" className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 id="addons-heading" className="text-3xl font-extrabold text-[#1E293B] mb-3">
                Add-Ons &amp; Extras
              </h2>
              <p className="text-slate-600 text-lg">
                Bolt these on to any project or retainer.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Interactive App Prototype</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€2,500–€5,000</p>
                <p className="text-sm text-slate-600">
                  Clickable prototype for user testing or investor demos — before a single line of code is written.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">UX Research &amp; Design</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€2,000–€6,000</p>
                <p className="text-sm text-slate-600">
                  User interviews, usability testing, and polished UI designs for existing or new products.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Localisation (per market)</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€3,500</p>
                <p className="text-sm text-slate-600">
                  Translate content, adapt formats (currency, dates), and integrate multi-language support.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">API Integration</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€2,000–€5,000</p>
                <p className="text-sm text-slate-600">
                  Connect your product to third-party services — payments, CRMs, email, maps, and more.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Performance Optimization</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€1,500–€3,500</p>
                <p className="text-sm text-slate-600">
                  Speed audit, Core Web Vitals improvement, CDN setup, and image optimization.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Team Training</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">from €150/hour</p>
                <p className="text-sm text-slate-600">
                  Hands-on training so your team can manage, update, and extend the product independently.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Platform Migration</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€2,000–€8,000</p>
                <p className="text-sm text-slate-600">
                  Move from your old platform with full data migration and minimal downtime.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#1E293B] mb-2">Custom Reporting &amp; Dashboards</h3>
                <p className="text-lg font-extrabold text-[#22D3EE] mb-2">€1,000–€3,000</p>
                <p className="text-sm text-slate-600">
                  Business intelligence dashboards, custom metrics, and automated reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="bg-slate-50 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-3xl font-extrabold text-[#1E293B] mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  Are your prices inclusive of VAT?
                </h3>
                <p className="text-slate-600">
                  No. All prices shown are exclusive of VAT. Irish VAT at 23% applies to B2B services provided in Ireland. EU businesses with a valid VAT number may be eligible for VAT reverse charge — just let us know when you enquire.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  Do you offer discounts for bundled services?
                </h3>
                <p className="text-slate-600">
                  Yes. Combining services (e.g., UX Audit + fixes, or Discovery + Build) typically saves 10–15%. We&apos;ll provide a custom quote with the bundle price.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  What&apos;s not included in the prices above?
                </h3>
                <p className="text-slate-600">
                  Third-party costs — hosting, domains, SMS, payment gateway fees — are billed separately at cost. We always flag these upfront so there are no surprises.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  Can I start with Starter and upgrade later?
                </h3>
                <p className="text-slate-600">
                  Absolutely. Many clients start with Starter (€800/mo, 8 hrs), then move to Growth (€1,800/mo, 20 hrs) when they need more capacity. You can upgrade or downgrade at any time with 30 days&apos; notice. Zero penalty.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  Do you offer payment plans?
                </h3>
                <p className="text-slate-600">
                  Yes. For projects over €10,000, we offer 50/50 split payment (50% upfront, 50% at delivery). For larger projects, milestone-based payments are available — we&apos;ll agree the schedule before we start.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  What if I need more hours than my retainer includes?
                </h3>
                <p className="text-slate-600">
                  Each plan has a monthly allowance: Starter (8 hrs), Growth (20 hrs), Scale (40 hrs). Any hours above your allowance are billed at €100/hour, or you can upgrade your plan at any time.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">
                  Do you work with international clients?
                </h3>
                <p className="text-slate-600">
                  Yes. We serve clients across Ireland, EU, UK, and beyond. We work fully remotely and time zones are rarely an issue — we&apos;ve worked with clients in Ireland, Italy, Switzerland, and further afield.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-2xl bg-[#0F172A] p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Still have questions?
              </h3>
              <p className="text-slate-300 mb-6">
                Every business is different. Let&apos;s talk through your specific needs — no commitment required.
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