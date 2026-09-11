import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GetQuoteButton from "@/components/GetQuoteButton";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
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

const services = [
  {
    name: "Landing page",
    price: "from €700",
    description: "A single focused page built to convert. Ideal for a product launch, a campaign, or a service you want to promote.",
    largeProject: false,
  },
  {
    name: "Website build",
    price: "from €1,500",
    description: "A custom multi-page website designed around your business. No templates. Built to rank on Google and bring in enquiries.",
    largeProject: false,
  },
  {
    name: "Custom web application",
    price: "from €6,000",
    description: "A bespoke web app built around your business process. User accounts, database, API, and core business logic.",
    largeProject: true,
  },
  {
    name: "Mobile app (iOS & Android)",
    price: "from €8,000",
    description: "A cross-platform mobile app from design to App Store submission. Ideal for MVPs and early-stage product ideas.",
    largeProject: true,
  },
];

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
        { "@type": "Offer", name: "Starter Retainer", price: "800", priceCurrency: "EUR" },
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
              Straightforward pricing, whatever your budget.
            </h1>
            <p className="text-lg text-slate-400 mb-6">
              All prices are starting points. Your final quote depends on scope and complexity. Fill in the form below and we will get back to you with an exact price.
            </p>
            <p className="text-xs text-slate-500">All prices in EUR, exclusive of VAT.</p>
          </div>
        </section>

        {/* Services list */}
        <section aria-labelledby="services-heading" className="bg-[#F8FAFC] py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="services-heading" className="sr-only">Services and prices</h2>
            <div className="divide-y divide-slate-200">
              {services.map((service) => (
                <div key={service.name} className="py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#1E293B]">{service.name}</h3>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed max-w-lg">{service.description}</p>
                    {service.largeProject && (
                      <Link
                        href={{ pathname: "/", query: { service: "quote" }, hash: "quote" } as never}
                        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#0E7490] hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                      >
                        Get a quote for a project like this
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-xl font-extrabold text-[#1E293B]">{service.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-base font-bold text-[#1E293B]">Not sure what you need?</p>
                <p className="text-sm text-slate-500 mt-1">Fill in the form and we will send you an exact quote within 24 hours.</p>
              </div>
              <GetQuoteButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] hover:bg-cyan-300 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2">
                Get a free quote
                <ArrowRight size={15} aria-hidden="true" />
              </GetQuoteButton>
            </div>
          </div>
        </section>

        {/* Technical consultation */}
        <section aria-labelledby="consultation-heading" className="bg-[#F8FAFC] pb-16 lg:pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 id="consultation-heading" className="text-lg font-bold text-[#1E293B]">Technical consultation</h2>
                <p className="text-sm text-slate-500 mt-1 max-w-md">
                  A second opinion on your AI-built app, website, or technical decision. The first 30 minutes are free. Need more time? A paid 60-minute session is also available.
                </p>
              </div>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1E293B] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                Book a free consultation
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Website audit */}
        <section aria-labelledby="audit-heading" className="bg-[#F8FAFC] pb-16 lg:pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#22D3EE]/30 bg-white p-6 sm:p-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-2">
                Order now
              </span>
              <h2 id="audit-heading" className="text-lg font-bold text-[#1E293B]">Website audit</h2>
              <p className="text-sm text-slate-500 mt-1 max-w-md">
                A written report on what to fix, delivered within 48 hours. No call required, and a free follow-up
                consultation is included.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-[#1E293B]">Website audit</p>
                  <p className="text-2xl font-extrabold text-[#1E293B] mt-1">€{auditPrices.website}</p>
                  <p className="text-xs text-slate-500 mt-1">Your website, reviewed end to end.</p>
                </div>
                <div className="rounded-xl border border-[#22D3EE]/40 bg-[#F0FDFF] p-4">
                  <p className="text-sm font-semibold text-[#1E293B]">Website + social bundle</p>
                  <p className="text-2xl font-extrabold text-[#1E293B] mt-1">€{auditPrices.bundle}</p>
                  <p className="text-xs text-slate-500 mt-1">Website, social media, and web presence.</p>
                </div>
              </div>
              <Link
                href="/audit"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1E293B] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
              >
                Order your audit
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Retainer */}
        <section aria-labelledby="retainer-heading" className="bg-white py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="retainer-heading" className="text-3xl font-extrabold text-[#1E293B] mb-3">
              Ongoing support
            </h2>
            <p className="text-slate-600 mb-10">
              If you&apos;re time-poor and just need someone reliable to keep your site or app running, the Starter retainer covers bug fixes, support, new features, and updates that keep you visible in search.
            </p>

            <div className="rounded-2xl border border-slate-200 p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1E293B]">Starter retainer</h3>
                  <p className="text-sm text-slate-500 mt-1">8 hours per month. Month to month, cancel anytime.</p>
                </div>
                <div className="shrink-0">
                  <span className="text-3xl font-extrabold text-[#1E293B]">€800</span>
                  <span className="text-slate-500 ml-1">/month</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 mb-8">
                {[
                  "Bug fixes and new feature development",
                  "Security patches and maintenance",
                  "Regular updates that keep you visible in search",
                  "Priority email support, 24-48 hour response",
                  "Additional hours at €95/hour",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22D3EE] shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mb-6">Social media management is available as a separate add-on. Ask us for details.</p>
              <GetQuoteButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1E293B] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2">
                Fill in the form to get started
                <ArrowRight size={15} aria-hidden="true" />
              </GetQuoteButton>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="bg-[#F8FAFC] py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-3xl font-extrabold text-[#1E293B] mb-8">
              Common questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">Are your prices inclusive of VAT?</h3>
                <p className="text-slate-600">
                  No. All prices are exclusive of VAT. Irish VAT at 23% applies to B2B services in Ireland. EU businesses with a valid VAT number may qualify for the reverse charge.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">How do I get an exact price?</h3>
                <p className="text-slate-600">
                  Fill in the quote form and describe what you need. We will review it and send you a fixed price within 24 hours, with no obligation to go ahead.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">Do you offer payment plans?</h3>
                <p className="text-slate-600">
                  Yes. For projects over €5,000 we split payments 50 per cent upfront and 50 per cent on delivery. Larger projects can be broken into milestones.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1E293B] mb-2">What is not included in the prices?</h3>
                <p className="text-slate-600">
                  Third-party costs such as hosting, domain registration, and payment gateway fees are billed at cost. We always flag these before the project starts.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-2xl bg-[#0F172A] p-8 text-center">
              <p className="text-xl font-bold text-white mb-2">Ready to get a quote?</p>
              <p className="text-slate-400 text-sm mb-6">
                Fill in the form with your project details and we will come back to you with a fixed price.
              </p>
              <GetQuoteButton className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Fill in the quote form
                <ArrowRight size={15} aria-hidden="true" />
              </GetQuoteButton>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
