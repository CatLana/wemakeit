import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, AlertCircle } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "web-accessibility-ireland";

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
  const ogLocale =
    locale === "en" ? "en_IE" : locale === "it" ? "it_IT" : "ru_RU";

  return {
    title:
      "Web Accessibility in Ireland: What the European Accessibility Act Means for Your Business",
    description:
      "From June 2025, the European Accessibility Act extends legal web accessibility requirements to private businesses in Ireland and across the EU. Here is what you need to know — and practical steps you can take now.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en/blog/${SLUG}`,
        it: `${BASE_URL}/it/blog/${SLUG}`,
        ru: `${BASE_URL}/ru/blog/${SLUG}`,
      },
    },
    openGraph: {
      title:
        "Web Accessibility in Ireland: What the European Accessibility Act Means for Your Business",
      description:
        "The European Accessibility Act came into force in June 2025. Irish businesses in e-commerce, banking, and transport need to meet WCAG 2.1 AA. Here is what that means in practice.",
      type: "article",
      publishedTime: "2026-04-28T00:00:00.000Z",
      authors: ["We Make IT"],
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: ogLocale,
      images: [
        {
          url: `${BASE_URL}/api/og`,
          width: 1200,
          height: 630,
          alt: "Web Accessibility in Ireland — European Accessibility Act guide",
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
    headline:
      "Web Accessibility in Ireland: What the European Accessibility Act Means for Your Business",
    description:
      "From June 2025, the European Accessibility Act extends legal web accessibility requirements to private businesses in Ireland. A guide to WCAG 2.1 AA, the EAA scope, and practical steps to get compliant.",
    datePublished: "2026-04-28T00:00:00.000Z",
    dateModified: "2026-04-28T00:00:00.000Z",
    author: {
      "@type": "Person",
      name: "Svetlana Savchenko",
      url: "https://www.linkedin.com/in/svetlana-savchenko-08868764",
    },
    publisher: {
      "@type": "Organization",
      name: "We Make IT",
      url: "https://www.wemakeit.ie",
    },
    image: "https://www.wemakeit.ie/api/og",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${SLUG}`,
    },
    inLanguage: locale,
    about: [
      { "@type": "Thing", name: "Web Accessibility" },
      { "@type": "Thing", name: "European Accessibility Act" },
      { "@type": "Thing", name: "WCAG 2.1" },
      { "@type": "Thing", name: "Irish Digital Compliance" },
    ],
    keywords:
      "web accessibility ireland, european accessibility act ireland, WCAG 2.1 ireland, EAA 2025 ireland, accessible website ireland, digital accessibility compliance",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://www.wemakeit.ie/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `https://www.wemakeit.ie/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Web Accessibility in Ireland",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* Article header */}
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
              Accessibility &amp; Legal
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Web Accessibility in Ireland: What the European Accessibility Act
              Means for Your Business
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                28 April 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                8 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Imagine heading to a local council&apos;s website to apply for a
              permit — but you cannot use a mouse because of a hand tremor. The
              buttons have no visible labels. The form fields are not
              keyboard-navigable. The deadline passes. That is not a
              hypothetical scenario; it is the everyday experience of roughly 1
              in 6 people globally who live with some form of disability.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              For years, making a website accessible was seen as best practice
              rather than a legal obligation — especially for private businesses.
              That has now changed. With the{" "}
              <strong>European Accessibility Act (EAA)</strong> in force since
              June 2025, Irish businesses in a range of sectors face real legal
              requirements to make their digital products usable by everyone.
              Here is what you need to know.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What is web accessibility?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Web accessibility means building digital products — websites, apps,
              and online services — so that anyone can use them regardless of
              disability. That includes:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 leading-relaxed">
              <li>
                People who are <strong>blind or have low vision</strong> and use
                screen readers or magnification software
              </li>
              <li>
                People who are <strong>deaf or hard of hearing</strong> and rely
                on captions or transcripts
              </li>
              <li>
                People with <strong>motor impairments</strong> who navigate using
                only a keyboard, switch device, or voice control
              </li>
              <li>
                People with <strong>cognitive disabilities</strong> who benefit
                from clear language, consistent layouts, and forgiving form
                validation
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              The benchmark standard is{" "}
              <strong>WCAG 2.1 Level AA</strong> — the Web Content Accessibility
              Guidelines published by the W3C. Level AA is the target for most
              international and EU compliance frameworks.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The legal landscape in Ireland and the EU
            </h2>

            <h3 className="text-xl font-bold text-[#1E293B] mt-6 mb-3">
              EU Accessibility Directive — public sector (since 2020)
            </h3>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Since September 2020, public sector websites and mobile apps
              across the EU have been required to meet WCAG 2.1 Level AA and
              publish an accessibility statement. This covers government
              agencies, local councils, state bodies, universities, and
              hospitals. In Ireland, the{" "}
              <a
                href="https://nda.ie/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                National Disability Authority (NDA)
              </a>{" "}
              is the designated oversight body.
            </p>

            <h3 className="text-xl font-bold text-[#1E293B] mt-6 mb-3">
              European Accessibility Act — private sector (from June 2025)
            </h3>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              The EAA extends accessibility requirements to certain{" "}
              <em>private sector</em> products and services for the first time.
              If your business provides any of the following, you need to meet
              accessibility standards:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 leading-relaxed">
              <li>E-commerce websites (product pages, checkout flows)</li>
              <li>Online banking and financial services</li>
              <li>Passenger transport booking services</li>
              <li>E-books and digital reading apps</li>
              <li>Consumer electronics software interfaces</li>
              <li>Telephone and internet communication services</li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Penalties for non-compliance vary by EU member state but can
              include fines, forced withdrawal of products or services, and
              reputational damage. Micro-enterprises (fewer than 10 employees
              and under €2 million annual turnover) are generally exempt from
              the EAA&apos;s product requirements — but this exemption is narrow,
              and the public sector rules apply regardless of company size.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The Irish reality: where does the private sector stand?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Progress in the private sector has been slow. A 2022 analysis by
              the Irish Times found that{" "}
              <strong>
                73% of Ireland&apos;s top 100 companies failed basic web
                accessibility checks
              </strong>{" "}
              — and the EU Accessibility Directive had already been in force for
              two years at that point.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              With the EAA now covering private businesses too, that statistic
              represents a significant compliance gap. The good news: most
              accessibility issues are fixable. Many of the most common failures
              — missing alt text, poor colour contrast, unlabelled form fields —
              do not require a full rebuild. They can often be resolved in days,
              not months.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What does WCAG 2.1 AA actually mean in practice?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              WCAG 2.1 organises its requirements around four principles — often
              abbreviated as <strong>POUR</strong>:
            </p>

            <div className="space-y-6 mb-10">
              {[
                {
                  letter: "P",
                  principle: "Perceivable",
                  description:
                    "All content must be presentable in a way users can sense. In practice: meaningful alt text on images, captions for videos, sufficient colour contrast (4.5:1 for normal text, 3:1 for large text), and nothing that conveys meaning through colour alone.",
                },
                {
                  letter: "O",
                  principle: "Operable",
                  description:
                    "Users must be able to navigate and interact using only a keyboard, not just a mouse. No content should flash more than three times per second (a seizure risk). Navigation must be consistent and users need enough time to complete tasks.",
                },
                {
                  letter: "U",
                  principle: "Understandable",
                  description:
                    "Text must be readable and predictable. Forms must have clear labels and helpful error messages. Pages should identify their language in the HTML. Unusual words or abbreviations should be explained.",
                },
                {
                  letter: "R",
                  principle: "Robust",
                  description:
                    "The HTML must be clean enough for assistive technologies like screen readers to parse correctly. Use proper semantic markup: headings in the right order, buttons for buttons, links for navigation.",
                },
              ].map(({ letter, principle, description }) => (
                <div
                  key={letter}
                  className="flex gap-5 rounded-xl border border-slate-200 p-5"
                >
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0F172A] text-[#22D3EE] font-extrabold text-base flex items-center justify-center"
                  >
                    {letter}
                  </span>
                  <div>
                    <p className="font-bold text-[#1E293B] mb-1">{principle}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The business case beyond compliance
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Avoiding fines is a good start. But there are stronger reasons to
              invest in accessibility:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 leading-relaxed">
              <li>
                <strong>Bigger addressable market</strong> — roughly 15–20% of
                the population has a disability of some kind. These are
                customers you currently risk excluding.
              </li>
              <li>
                <strong>SEO benefits</strong> — good accessibility and good SEO
                overlap significantly. Meaningful alt text, clean heading
                structure, fast performance, and descriptive link text all help
                search engines and screen readers equally.
              </li>
              <li>
                <strong>Better experience for everyone</strong> — captions help
                users in noisy environments, clear navigation helps users in a
                hurry, high contrast helps people reading in bright sunlight.
                Inclusive design improves usability across the board.
              </li>
              <li>
                <strong>Enterprise and public sector sales</strong> — if you
                sell software or services to public bodies in Ireland or the EU,
                accessibility compliance is increasingly a procurement
                requirement.
              </li>
            </ul>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Quick wins you can do today
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              You do not need a complete rebuild to make meaningful progress.
              Start here:
            </p>
            <ol className="space-y-6 mb-10">
              {[
                {
                  n: "01",
                  title: "Run a Lighthouse audit",
                  body: "Open Chrome DevTools (F12), go to the Lighthouse tab, and run an Accessibility audit. It is free, takes 30 seconds, and gives you a scored list of specific issues on your page.",
                },
                {
                  n: "02",
                  title: "Check your colour contrast",
                  body: "Use the free WebAIM Contrast Checker to test your text and background colour combinations. WCAG AA requires a ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt+).",
                },
                {
                  n: "03",
                  title: "Tab through your site",
                  body: "Put your mouse aside and navigate your website using only the Tab key. Can you reach every link, button, and form field? Is a visible focus indicator shown at all times? If not, that is a critical failure.",
                },
                {
                  n: "04",
                  title: "Add meaningful alt text",
                  body: 'Every image that carries information needs a descriptive alt attribute. Decorative images (dividers, background textures) should have alt="" so screen readers skip them.',
                },
                {
                  n: "05",
                  title: "Label your form fields",
                  body: "Every input, select, and textarea needs a visible \u003clabel\u003e element connected via the for/id attributes. Placeholder text does not count \u2014 it disappears as soon as someone starts typing.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0F172A] text-[#22D3EE] font-extrabold text-sm flex items-center justify-center"
                  >
                    {n}
                  </span>
                  <div>
                    <p className="font-bold text-[#1E293B] mb-1">{title}</p>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Key resources for Irish businesses
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-3 mb-10 text-slate-600 leading-relaxed">
              <li>
                <strong>
                  <a
                    href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E7490] underline"
                  >
                    W3C Web Accessibility Initiative (WAI)
                  </a>
                </strong>{" "}
                — The official home of WCAG 2.1, with plain-language summaries
                and a developer quick-reference
              </li>
              <li>
                <strong>
                  <a
                    href="https://nda.ie/publications/communications/guidelines-for-accessible-information"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E7490] underline"
                  >
                    National Disability Authority (NDA)
                  </a>
                </strong>{" "}
                — Ireland&apos;s oversight body for public sector accessibility
                and a source of practical Irish-specific guidance
              </li>
              <li>
                <strong>
                  <a
                    href="https://webaim.org/resources/contrastchecker/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E7490] underline"
                  >
                    WebAIM Contrast Checker
                  </a>
                </strong>{" "}
                — A free tool to instantly test colour contrast ratios against
                WCAG thresholds
              </li>
              <li>
                <strong>
                  <a
                    href="https://ec.europa.eu/social/main.jsp?catId=1202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E7490] underline"
                  >
                    European Commission — European Accessibility Act
                  </a>
                </strong>{" "}
                — Official summary of the EAA scope, timelines, and EU member
                state implementation
              </li>
              <li>
                <strong>
                  <a
                    href="https://www.gov.ie/en/service/2b62e5-web-accessibility/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E7490] underline"
                  >
                    Gov.ie — Web Accessibility
                  </a>
                </strong>{" "}
                — Irish government guidance on web accessibility obligations for
                public bodies
              </li>
            </ul>

            {/* Disclaimer */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 flex gap-4 mb-12">
              <AlertCircle
                size={18}
                className="text-slate-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-sm text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-600">
                  Important:
                </span>{" "}
                This article is for informational purposes only and does not
                constitute legal advice. The European Accessibility Act is
                implemented differently across EU member states — consult a
                qualified legal professional if you need advice specific to your
                business situation. Information is based on publicly available
                sources as of April 2026.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <p className="text-white font-extrabold text-xl mb-2">
                Need an accessible website or app?
              </p>
              <p className="text-slate-400 text-sm mb-6">
                At We Make IT, accessibility is built in from the start — not
                bolted on at the end. Whether you need an audit of your existing
                site or want to build something new that meets WCAG 2.1 AA from
                day one, we can help.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  Talk to us about accessibility
                </Link>
                <a
                  href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[50px] px-8 bg-white text-[#0F172A] font-bold rounded-xl hover:bg-slate-100 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  Read WCAG 2.1 Guidelines
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
