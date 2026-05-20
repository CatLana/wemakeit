import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "accessibility-law-ireland-eaa-guide";

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
  const ogLocale = locale === "en" ? "en_IE" : locale === "it" ? "it_IT" : "ru_RU";

  return {
    title: "Accessibility Law in Ireland: EAA Compliance Guide for Your Website or Application | We Make IT",
    description:
      "Detailed guide to the European Accessibility Act in Ireland: who must comply, covered services, penalties, exemptions, and practical WCAG 2.1 AA action steps.",
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
      title: "Accessibility Law in Ireland: EAA Compliance Guide for Your Website or Application",
      description:
        "What Irish businesses need to know about accessibility law from June 2025, including size thresholds, service scope, and compliance requirements.",
      type: "article",
      publishedTime: "2026-05-15T00:00:00.000Z",
      authors: ["We Make IT"],
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: ogLocale,
      images: [
        {
          url: `${BASE_URL}/images/wemakeit_thumbnail.png`,
          width: 1200,
          height: 630,
          alt: "Accessibility law compliance guide for Irish websites",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function AccessibilityLawArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Accessibility Law in Ireland: EAA Compliance Guide for Your Website or Application",
    description:
      "Detailed information on the European Accessibility Act in Irish law, including who must comply and what practical compliance includes.",
    datePublished: "2026-05-15T00:00:00.000Z",
    dateModified: "2026-05-15T00:00:00.000Z",
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
    image: `${BASE_URL}/images/wemakeit_thumbnail.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${SLUG}`,
    },
    inLanguage: locale,
    keywords:
      "accessibility law ireland, european accessibility act ireland, eaa compliance checklist, wcag 2.1 aa ireland, accessibility statement ireland",
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
        name: "Accessibility Law in Ireland",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div className="bg-[#0F172A] pt-32 pb-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#22D3EE] transition-colors mb-8 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back to Blog
            </Link>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              Accessibility & Legal
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Accessibility Law in Ireland: What the EAA Means for Your Website or Application
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              A practical guide to company thresholds, covered services, penalties, and the steps required to comply.
            </p>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                15 May 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                12 min read
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              The European Accessibility Act (EAA) was transposed into Irish law through the European Union
              (Accessibility Requirements of Products and Services) Regulations 2023 and took effect on 28 June 2025.
              If your business serves consumers online, this is now an operational compliance topic, not just a UX best
              practice.
            </p>
            <p className="text-sm text-slate-500 mb-10">
              This article is practical guidance, not legal advice. For legal interpretation, use official sources and
              qualified counsel.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">1. Who Must Comply</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              In general, businesses must comply when they are not microenterprises and they provide covered services to
              consumers.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-3 font-semibold">Must comply threshold:</p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-6 text-slate-600 leading-relaxed">
              <li>10 or more employees, or</li>
              <li>Annual turnover above EUR 2 million, or</li>
              <li>Annual balance sheet total above EUR 2 million</li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-3 font-semibold">Microenterprise exemption:</p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>Fewer than 10 employees, and</li>
              <li>Turnover below EUR 2 million, and</li>
              <li>Balance sheet below EUR 2 million</li>
              <li>All three conditions must be met to qualify</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">2. Service Types in Scope</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              The law targets specific products and services. For digital businesses, key categories include:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>E-commerce and online marketplaces where consumers complete purchases</li>
              <li>Consumer banking and financial interfaces used for accounts, transactions, or applications</li>
              <li>Insurance journeys that allow contracts to be concluded online</li>
              <li>Transport booking and ticketing services</li>
              <li>Telecommunication and digital communication services</li>
              <li>Scope applies to B2C consumer services, not purely B2B offerings</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">3. Informational Websites</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              If a website is informational only and does not enable consumer transactions or online contract conclusion,
              it may fall outside direct EAA obligations. Still, accessibility is strongly recommended because it expands
              audience reach, supports conversion, and reduces future remediation risk when services evolve.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">4. Penalties and Enforcement</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Non-compliance can trigger significant consequences in Ireland, including financial penalties and potential
              criminal sanctions in severe cases. Reported penalties include fines up to EUR 60,000, potential daily
              penalties for continuing violations, and possible imprisonment up to 18 months in serious cases.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              The Competition and Consumer Protection Commission (CCPC) publishes guidance and has an enforcement role,
              including specific guidance for microenterprises.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">5. What Compliance Looks Like in Practice</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              A practical baseline is alignment with WCAG 2.1 Level AA across your customer journeys and content.
            </p>
            <ol className="list-decimal list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>Screen reader compatibility across key pages</li>
              <li>Full keyboard accessibility for all interactions</li>
              <li>Readable color contrast and visual hierarchy</li>
              <li>Meaningful alternative text for non-decorative images</li>
              <li>Clear labels, instructions, and error states in forms</li>
              <li>Accessible PDFs and downloadable documents</li>
              <li>Zoom and text scaling support without layout breakage</li>
            </ol>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">6. Special Considerations</h2>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>
                A 5-year grace period may apply to unaltered services already in use before 28 June 2025, but meaningful
                updates can trigger immediate obligations.
              </li>
              <li>
                Overlay widgets are not a substitute for real compliance. Accessibility must be built into code,
                content, and interaction design.
              </li>
              <li>
                Accessibility statements should include current status, known issues, feedback channel, and contact
                details.
              </li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">7. Current Readiness in Ireland</h2>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>Recent industry reporting indicates many Irish businesses are still not fully prepared</li>
              <li>About 49 percent reported low awareness of EAA obligations</li>
              <li>Around 90 percent reported no dedicated accessibility budget</li>
              <li>Average website accessibility scores improved year on year, but many sites remain below compliance level</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">8. B2B and Vendor Chains</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              If you are a B2B vendor serving B2C clients, contracts and technical responsibility need to be explicit.
              B2C businesses remain accountable for their consumer-facing experience and should perform due diligence on
              platforms, integrations, and third-party providers.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">9. Practical Scenarios</h2>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>Online retail with 8 employees and EUR 2.5 million turnover: likely in scope</li>
              <li>Small local informational site with no online transactions: may be exempt</li>
              <li>Consumer finance platform with 12 employees: likely in scope</li>
              <li>Insurance broker site with offline-only contract completion: may be outside direct scope</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">10. Recommended Next Steps</h2>
            <ol className="list-decimal list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>Run an audit with tooling and manual checks</li>
              <li>Fix high-impact issues first: forms, keyboard flows, and assistive compatibility</li>
              <li>Publish a clear accessibility statement</li>
              <li>Put repeat testing into release workflows</li>
              <li>Train content and product teams on accessible publishing</li>
            </ol>

            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Even if you qualify for a microenterprise exemption today, accessibility remains commercially important.
              It broadens your reachable audience, improves usability for everyone, and reduces remediation cost when
              your service model grows.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">Official and Industry Resources</h2>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-12 text-slate-600 leading-relaxed">
              <li>
                <a
                  href="https://www.ccpc.ie/business/enforcement/accessibility/european-accessibility-act-guidelines-for-microenterprises/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] hover:text-[#0891B2] underline underline-offset-2"
                >
                  CCPC guidance for microenterprises
                </a>
              </li>
              <li>
                <a
                  href="https://nda.ie/accessibility/european-accessibility-act"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] hover:text-[#0891B2] underline underline-offset-2"
                >
                  National Disability Authority resources
                </a>
              </li>
              <li>
                <a
                  href="https://www.digitalbusinessireland.ie/digital-accessibility-guide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] hover:text-[#0891B2] underline underline-offset-2"
                >
                  Digital Business Ireland accessibility guide
                </a>
              </li>
            </ul>

            <section className="rounded-3xl bg-[#0F172A] p-8 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Need help with accessibility compliance?</h2>
              <p className="mt-3 text-slate-300 leading-relaxed">
                We can review your website and IT project flows, then send you a free website audit and a free
                accessibility consultation plan.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact#simple-contact-form"
                  className="inline-flex items-center justify-center rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  Request Free Website Audit
                  <ArrowRight size={16} aria-hidden="true" className="ml-2" />
                </Link>
                <Link
                  href="/contact#simple-contact-form"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  Book Free Accessibility Consultation
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
