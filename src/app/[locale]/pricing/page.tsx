import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GetQuoteButton from "@/components/GetQuoteButton";
import InfoTooltip from "@/components/InfoTooltip";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { getAuditPrices } from "@/lib/audit-pricing";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "pricing";

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `${BASE_URL}/${locale}/${SLUG}`;

  return {
    title: "Pricing | Web & App Development Ireland | We Make IT",
    description:
      "Clear pricing for web and app development in Ireland. Landing pages from €700, website builds from €1,500, plus a free 30-minute technical consultation. All prices exclude VAT.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${BASE_URL}/en/${SLUG}`,
        en: `${BASE_URL}/en/${SLUG}`,
      },
    },
    openGraph: {
      title: "Pricing | Web & App Development Ireland | We Make IT",
      description:
        "Clear pricing for web and app development in Ireland. Landing pages from €700, website builds from €1,500, plus a free 30-minute technical consultation. All prices exclude VAT.",
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: "en_IE",
      type: "website",
      images: [{ url: `${BASE_URL}/images/wemakeit_thumbnail.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

const websiteServices = [
  {
    name: "Landing page",
    price: "from €700",
    description: "A single focused page built to convert. Ideal for a product launch, a campaign, or a service you want to promote.",
  },
  {
    name: "Website build",
    price: "from €1,500",
    description: "A custom multi-page website designed around your business. No templates. Built to rank on Google and bring in enquiries.",
  },
];

const applicationServices = [
  {
    name: "Custom web application",
    price: "from €6,000",
    description: "A bespoke web app built around your business process. User accounts, database, API, and core business logic.",
  },
  {
    name: "Mobile app (iOS & Android)",
    price: "from €8,000",
    description: "A cross-platform mobile app from design to App Store submission. Ideal for MVPs and early-stage product ideas.",
  },
];

const maintenancePlans = [
  {
    name: "Care plan",
    price: "€120",
    description: "Keep your website alive, secure, and online. No surprises.",
    features: [
      "Uptime and security monitoring",
      "Monthly backups",
      "Software and security updates",
      "Domain and SSL renewal checks",
      "Priority email support, 48-hour response",
    ],
    highlighted: false,
  },
  {
    name: "Growth plan",
    price: "€450",
    description: "Everything in the Care plan, plus ongoing content and SEO work to bring in more visitors.",
    features: [
      "Everything in the Care plan",
      "Two new blog articles or content updates a month",
      "Ongoing on-page SEO improvements",
      "Monthly visibility and performance report",
      "Quarterly strategy call",
    ],
    highlighted: true,
  },
];

const appSupportPlans = [
  {
    name: "Basic",
    price: "€800",
    hours: "6 hours a month",
    description: "For a stable app that just needs to stay secure and online.",
    features: [
      "Security patches and dependency updates",
      "Uptime monitoring",
      "Priority email support, 48-hour response",
      "Additional hours at €100/hour",
    ],
  },
  {
    name: "Bug fixes",
    price: "€1,200",
    hours: "10 hours a month",
    description: "Everything in Basic, plus we fix bugs as they come up.",
    features: [
      "Everything in Basic",
      "Reactive bug fixes as issues are reported",
      "Monthly health report",
      "Additional hours at €100/hour",
    ],
  },
  {
    name: "Maintenance",
    price: "€1,800",
    hours: "16 hours a month",
    description: "Everything in Bug fixes, plus proactive work to keep your app fast and future-proof.",
    features: [
      "Everything in Bug fixes",
      "Framework and library upgrades",
      "Performance monitoring and tuning",
      "Additional hours at €95/hour",
    ],
  },
  {
    name: "Feature development",
    price: "from €2,800",
    hours: "24+ hours a month",
    description: "Everything in Maintenance, plus a dedicated budget for ongoing new features.",
    features: [
      "Everything in Maintenance",
      "Dedicated monthly feature development budget",
      "Quarterly roadmap planning call",
      "Additional hours at €90/hour",
    ],
  },
];

const faqs = [
  {
    question: "Are your prices inclusive of VAT?",
    answer: "No. All prices are exclusive of VAT. Irish VAT at 23% applies to B2B services in Ireland. EU businesses with a valid VAT number may qualify for the reverse charge.",
  },
  {
    question: "How do I get an exact price?",
    answer: "Fill in the quote form and describe what you need. We will review it and send you a fixed price within 24 hours, with no obligation to go ahead.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes. For projects over €5,000 we split payments 50 per cent upfront and 50 per cent on delivery. Larger projects can be broken into milestones.",
  },
  {
    question: "What is not included in the prices?",
    answer: "Third-party costs such as hosting, domain registration, and payment gateway fees are billed at cost. We always flag these before the project starts.",
  },
];

const linkCta = "inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E7490] hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded";

function ServiceGrid({ items }: { items: typeof websiteServices }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="divide-y divide-slate-200">
        {items.map((service) => (
          <div
            key={service.name}
            className="flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1fr] sm:items-center gap-2 sm:gap-6 px-5 py-4"
          >
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="font-semibold text-[#1E293B] text-base">{service.name}</h3>
              <InfoTooltip text={service.description} label={`About ${service.name}`} />
            </div>
            <div className="flex items-center justify-between sm:contents">
              <span className="text-base font-bold text-[#1E293B] sm:text-right">{service.price}</span>
              <Link
                href={{ pathname: "/discovery-call", query: { service: service.name } } as never}
                className={`${linkCta} sm:justify-self-end`}
              >
                Book a call
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const auditPrices = getAuditPrices();

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web & App Development Services",
    provider: { "@type": "Organization", name: "We Make IT", url: BASE_URL },
    areaServed: ["IE", "EU"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "We Make IT Pricing",
      itemListElement: [
        { "@type": "Offer", name: "Landing Page", price: "700", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Website Build", price: "1500", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Custom Web Application", price: "6000", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Mobile App MVP", price: "8000", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Website Maintenance - Care Plan", price: "120", priceCurrency: "EUR" },
        { "@type": "Offer", name: "Website Maintenance - Growth Plan", price: "450", priceCurrency: "EUR" },
        { "@type": "Offer", name: "App Support - Basic", price: "800", priceCurrency: "EUR" },
        { "@type": "Offer", name: "App Support - Bug Fixes", price: "1200", priceCurrency: "EUR" },
        { "@type": "Offer", name: "App Support - Maintenance", price: "1800", priceCurrency: "EUR" },
        { "@type": "Offer", name: "App Support - Feature Development", price: "2800", priceCurrency: "EUR" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>

        {/* Hero */}
        <section className="bg-[#0F172A] pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Scaled pricing tiers
            </h1>
            <p className="text-lg text-slate-400 mb-6">
              The price depends on your project&apos;s specifics. We offer different tiers so you can cover as much as you need within your budget.
            </p>
            <p className="text-xs text-slate-500">All prices in EUR, exclusive of VAT.</p>
          </div>
        </section>

        {/* Website services */}
        <section aria-labelledby="website-services-heading" className="bg-[#F8FAFC] py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="website-services-heading" className="text-3xl font-extrabold text-[#1E293B] mb-2">
              Website services
            </h2>
            <p className="text-slate-600 mb-8">
              From a single landing page to a fully managed website, with maintenance if you want it handled for you.
            </p>

            <ServiceGrid items={websiteServices} />

            {/* Website maintenance */}
            <h3 className="text-xl font-bold text-[#1E293B] mt-12 mb-5">Ongoing website maintenance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {maintenancePlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-6 flex flex-col bg-white ${plan.highlighted ? "border-2 border-[#22D3EE]" : "border border-slate-200"}`}
                >
                  <div className="absolute top-5 right-5">
                    <InfoTooltip text={plan.description} label={`About ${plan.name}`} />
                  </div>
                  {plan.highlighted && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-2">
                      Most popular
                    </span>
                  )}
                  <h4 className="text-lg font-bold text-[#1E293B] pr-8">{plan.name}</h4>
                  <p className="mt-3 mb-5">
                    <span className="text-2xl font-extrabold text-[#1E293B]">{plan.price}</span>
                    <span className="text-slate-500 ml-1 text-sm">/month</span>
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22D3EE] shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <GetQuoteButton className={`${linkCta} self-start`}>
                    Get started
                    <ArrowRight size={13} aria-hidden="true" />
                  </GetQuoteButton>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-6">
              Social media management is available as a separate service.{" "}
              <Link
                href="/social"
                className="font-semibold text-[#0E7490] underline underline-offset-2 hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                See social media pricing
              </Link>
            </p>

            {/* Website audit */}
            <h3 className="text-xl font-bold text-[#1E293B] mt-12 mb-5">Website audit</h3>
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6">
              <div className="absolute top-5 right-5">
                <InfoTooltip
                  text="A written report on what to fix, delivered within 48 hours. No call required, and a free follow-up consultation is included."
                  label="About the website audit"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 pr-8">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-[#1E293B]">Website audit</p>
                  <p className="text-xl font-extrabold text-[#1E293B] mt-1">€{auditPrices.website}</p>
                </div>
                <div className="rounded-xl border border-[#22D3EE]/40 bg-[#F0FDFF] p-4">
                  <p className="text-sm font-semibold text-[#1E293B]">Website + social bundle</p>
                  <p className="text-xl font-extrabold text-[#1E293B] mt-1">€{auditPrices.bundle}</p>
                </div>
              </div>
              <Link href="/audit" className={`${linkCta} mt-5`}>
                Order your audit
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Application services */}
        <section aria-labelledby="application-services-heading" className="bg-white py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="application-services-heading" className="text-3xl font-extrabold text-[#1E293B] mb-2">
              Application services
            </h2>
            <p className="text-slate-600 mb-8">
              Custom web and mobile apps, plus ongoing support so you are not stuck maintaining code yourself.
            </p>

            <ServiceGrid items={applicationServices} />

            {/* App support */}
            <h3 className="text-xl font-bold text-[#1E293B] mt-12 mb-5">Ongoing app support</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {appSupportPlans.map((plan) => (
                <div key={plan.name} className="relative rounded-2xl border border-slate-200 p-6 flex flex-col">
                  <div className="absolute top-5 right-5">
                    <InfoTooltip text={plan.description} label={`About ${plan.name}`} />
                  </div>
                  <h4 className="text-lg font-bold text-[#1E293B] pr-8">{plan.name}</h4>
                  <p className="mt-3 mb-1">
                    <span className="text-2xl font-extrabold text-[#1E293B]">{plan.price}</span>
                    <span className="text-slate-500 ml-1 text-sm">/month</span>
                  </p>
                  <p className="text-xs text-slate-500 mb-5">{plan.hours}</p>
                  <ul className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22D3EE] shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <GetQuoteButton className={`${linkCta} self-start`}>
                    Get started
                    <ArrowRight size={13} aria-hidden="true" />
                  </GetQuoteButton>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="bg-[#F8FAFC] py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-3xl font-extrabold text-[#1E293B] mb-8">
              Common questions
            </h2>

            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden">
              {faqs.map((faq, i) => (
                <details key={faq.question} className="group p-5 sm:p-6" open={i === 0}>
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-[#1E293B] [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 text-slate-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>

            {/* Not sure what you need */}
            <div className="mt-12 rounded-2xl bg-[#0F172A] p-8 text-center">
              <p className="text-xl font-bold text-white mb-2">Not sure what you need?</p>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                Book a paid technical consultation. We will talk through your project and tell you exactly what to build and what it will cost.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Book a technical consultation
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
