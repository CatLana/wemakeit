import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "legal-requirements-diy-brand-website";

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
    title: "DIY Brand Website Legal Checklist: Forms, GDPR, Cookies, Accessibility | We Make IT",
    description:
      "All you need to know when building your brand website yourself: legal essentials for forms, GDPR, cookie consent, and accessibility in Ireland and the EU.",
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
      title: "DIY Brand Website Legal Checklist: Forms, GDPR, Cookies, Accessibility",
      description:
        "Building your own website with AI or website builders? Here are the legal requirements and compliance basics you must include by law.",
      type: "article",
      publishedTime: "2026-05-15T00:00:00.000Z",
      authors: ["We Make IT"],
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: ogLocale,
      images: [
        {
          url: `${BASE_URL}/api/og`,
          width: 1200,
          height: 630,
          alt: "DIY website legal checklist for Irish and EU businesses",
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
    headline: "DIY Brand Website Legal Checklist: Forms, GDPR, Cookies, Accessibility",
    description:
      "A practical legal checklist for businesses creating their own websites with AI tools or website builders.",
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
    image: `${BASE_URL}/api/og`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${SLUG}`,
    },
    inLanguage: locale,
    keywords:
      "website legal requirements ireland, diy website legal checklist, gdpr website forms, cookie consent ireland, website accessibility law ireland, european accessibility act",
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
        name: "DIY Brand Website Legal Checklist",
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
              Compliance & Legal
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              All You Need to Know Before Building Your Brand Website Yourself
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              The legal checklist every DIY website owner should cover: forms, GDPR, cookie consent, and accessibility.
            </p>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                15 May 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                9 min read
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              If you built your site with Webador, Wix, Squarespace, or AI tools, you are not alone. It is a smart way
              to launch fast. But legal and compliance basics are often missed. This guide focuses on the essentials you
              must include by law when your website collects data or serves users in Ireland and the EU.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">1. Forms and Data Collection</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Any form that collects names, emails, phone numbers, or business details is personal data processing.
              You need clear purpose, transparent wording, and a legal basis.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>State why you are collecting the data</li>
              <li>Collect only what is necessary</li>
              <li>Add clear consent text where required</li>
              <li>Link your privacy policy near submit actions</li>
              <li>Store submissions securely and define retention period</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">2. GDPR and Privacy Policy</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Under GDPR, your privacy policy is mandatory when you process personal data. It must be clear,
              accessible, and accurate.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>What data you collect</li>
              <li>Why you collect it and legal basis used</li>
              <li>How long you keep it</li>
              <li>Who receives it (processors/tools)</li>
              <li>How users can request access, correction, or deletion</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">3. Cookie Consent</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              In Ireland, non-essential cookies require opt-in before activation. A banner alone is not enough.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>No pre-ticked consent options</li>
              <li>Reject must be as easy as accept</li>
              <li>Granular categories for analytics/marketing</li>
              <li>No tracking scripts firing before consent</li>
              <li>Renew consent periodically</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">4. Accessibility Requirements</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Accessibility is now a legal and business priority. {" "}
              <Link
                href="/blog/accessibility-law-ireland-eaa-guide"
                className="text-[#0E7490] hover:text-[#0891B2] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                Depending on company size and service type
              </Link>
              , Irish and EU obligations apply.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>Keyboard navigation for all core interactions</li>
              <li>Alt text for meaningful images</li>
              <li>Sufficient color contrast</li>
              <li>Clear heading structure</li>
              <li>Explicit labels and error states for forms</li>
              <li>Accessibility statement where required</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">Quick DIY Website Legal Checklist</h2>
            <div className="rounded-xl border border-slate-200 p-6 mb-10">
              <ul className="list-disc list-outside ml-5 space-y-2 text-slate-600 leading-relaxed">
                <li>Privacy policy published and up to date</li>
                <li>Cookie banner is opt-in compliant</li>
                <li>Contact/lead forms include lawful data notices</li>
                <li>Terms and cookie policy are linked in footer</li>
                <li>Core pages pass basic accessibility checks</li>
                <li>Data retention and deletion workflow documented</li>
              </ul>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">Conclusion</h2>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Good design helps, but legal trust infrastructure is what protects your business and builds confidence.
              If you are building your brand website yourself, treat forms, GDPR, cookies, and accessibility as core
              product requirements, not optional extras.
            </p>

            <section className="rounded-3xl bg-[#0F172A] p-8 sm:p-10 text-white">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Need support with compliance and accessibility?</h2>
              <p className="mt-3 text-slate-300 leading-relaxed">
                Contact us through the form to get a free website audit and a free accessibility consultation for your
                IT project.
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
