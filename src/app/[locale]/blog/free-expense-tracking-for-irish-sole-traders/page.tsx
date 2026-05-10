import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, AlertCircle } from "lucide-react";

const BASE_URL = "https://www.wemakeit.ie";
const SLUG = "free-expense-tracking-for-irish-sole-traders";

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
      "Free Expense Tracking for Irish Sole Traders: Tools, Apps and Accounting Options 2026",
    description:
      "A practical guide for Irish sole traders: compare free and paid expense tracking options including Google Sheets, Proton Drive, Zoho Books, Sage Accounting, and Refrens. Plus what Revenue.ie expects at tax time.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en/blog/${SLUG}`,
        it: `${BASE_URL}/it/blog/${SLUG}`,
        ru: `${BASE_URL}/ru/blog/${SLUG}`,
      },
    },
    openGraph: {
      title: "Free Expense Tracking for Irish Sole Traders: Tools, Apps and Accounting Options 2026",
      description:
        "Stop losing receipts. Compare free and paid options for Irish sole traders: Google Sheets, Proton Drive, Zoho Books, Sage Accounting, Refrens, and what Revenue.ie expects at tax time.",
      type: "article",
      publishedTime: "2026-04-26T00:00:00.000Z",
      authors: ["We Make IT"],
      url: canonicalUrl,
      siteName: "We Make IT",
      locale: ogLocale,
      images: [
        {
          url: `${BASE_URL}/api/og`,
          width: 1200,
          height: 630,
          alt: "Free expense tracking for Irish sole traders",
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
      "Free Expense Tracking for Irish Sole Traders: Tools, Apps and Accounting Options 2026",
    description:
      "A practical guide for Irish sole traders covering free and paid expense tracking options: Google Sheets, Proton Drive, Zoho Books, Sage Accounting, and Refrens.",
    datePublished: "2026-04-26T00:00:00.000Z",
    dateModified: "2026-05-01T00:00:00.000Z",
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
      { "@type": "Thing", name: "Irish sole trader taxes" },
      { "@type": "Thing", name: "Revenue.ie Form 11" },
      { "@type": "Thing", name: "Google Sheets expense tracking" },
    ],
    keywords:
      "free expense tracking ireland, sole trader expenses ireland, google sheets expense tracker ireland, zoho books ireland, sage accounting ireland, refrens, proton drive ireland, form 11 ireland, track business expenses ireland 2026",
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
        name: "Free Expense Tracking for Irish Sole Traders 2026",
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
            {/* Back link + category — flex row so they never overlap */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back to Blog
              </Link>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE]">
                Admin &amp; Finance
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Free Expense Tracking for Irish Sole Traders: The Lean-Start Guide
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                30 April 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                14 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <p className="text-slate-600 leading-relaxed text-base mb-5">
              It&apos;s October. Your accountant asks for your business expenses for
              the year. You open a drawer and find a fistful of receipts, a few
              screenshots on your phone, and a vague memory of a software
              subscription you cancelled in March.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              If this sounds familiar, you are not alone. Most sole traders in
              Ireland start out tracking expenses in their head or in a
              spreadsheet that quickly becomes a mess. The good news: you do not
              need a paid accounting package to fix this. You need a simple,
              consistent habit and one free tool. This guide gives you exactly
              that.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What do you actually need as an Irish sole trader?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              As a sole trader registered with{" "}
              <a
                href="https://www.revenue.ie/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                Revenue.ie
              </a>
              , you file a{" "}
              <a
                href="https://www.revenue.ie/en/self-assessment-and-self-employment/filing-your-tax-return/index.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                Form 11 self-assessment tax return
              </a>{" "}
              each year (deadline: 31 October, or mid-November if filing
              online via ROS). To complete it, you need:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-10 text-slate-600 leading-relaxed">
              <li>
                A record of all <strong>business income</strong> received
                during the tax year
              </li>
              <li>
                A record of all <strong>allowable business expenses</strong> —
                costs you can deduct to reduce your taxable profit
              </li>
              <li>
                Supporting <strong>receipts or invoices</strong> for those
                expenses (Revenue can ask to see them)
              </li>
              <li>
                Records kept for at least{" "}
                <strong>six years</strong> (Revenue&apos;s requirement)
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              That is it. You do not need payroll software, an inventory system,
              or anything complex. You need a place to log income and expenses,
              and a place to store your receipts digitally.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              A word of warning about &ldquo;free forever&rdquo; accounting apps
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Over the last couple of years, several accounting tools that used
              to advertise free-forever plans have quietly moved to paid
              subscriptions or changed their sign-up flows. The most widely
              discussed example is Wave Accounting, which now redirects many
              new sign-ups through a Zoho Books onboarding process and no
              longer offers a straightforward free tier in Ireland.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              This is not a knock on any particular product — business models
              change. But it is a reason to be cautious. Before committing time
              to set up any new app, always check the current pricing page
              directly and read recent reviews. For most sole traders just
              starting out, the simplest genuinely free system is a
              well-organised Google Drive folder combined with a Google Sheet.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              The lean recommendation: Google Sheets + Google Drive
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Google Drive and Google Sheets are free with any Google account,
              work on every device, and have been around for two decades. There
              is no pricing tier to worry about, no credit card required, and
              your data is accessible wherever you are. For a sole trader with
              up to 30 transactions per month, this is all you need.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-3">
              Set up a folder structure like this in Google Drive:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-5 font-mono text-sm text-slate-700 leading-relaxed">
              <p>📁 Business / Finance</p>
              <p>&nbsp;&nbsp;📁 2026</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;📁 Receipts</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 2026-01-15_hosting_vercel.jpg</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 2026-02-03_coffee_client_meeting.jpg</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;📄 2026 Expenses (Google Sheet)</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;📄 2026 Invoices Sent (Google Sheet)</p>
            </div>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              In your expenses spreadsheet, keep one row per expense with
              these columns: <strong>Date</strong>, <strong>Supplier</strong>,{" "}
              <strong>Description</strong>, <strong>Category</strong>,{" "}
              <strong>Amount EUR</strong>, <strong>VAT EUR</strong>, and{" "}
              <strong>Receipt filename</strong>. That last column is the key —
              it links each row to a photo in your Receipts folder so you can
              find any document in seconds, even two years later.
            </p>

            <h3 className="text-xl font-bold text-[#1E293B] mt-8 mb-4">
              How to get set up in 20 minutes
            </h3>
            <ol className="space-y-6 mb-10">
              {[
                {
                  n: "01",
                  title: "Create your folder structure in Google Drive",
                  body: 'Create a top-level folder called “Business / Finance”. Inside it, create a folder for the current year, and inside that a “Receipts” subfolder. You will repeat this once per year.',
                },
                {
                  n: "02",
                  title: "Create your Expenses spreadsheet",
                  body: 'Create a new Google Sheet called “2026 Expenses”. Add these column headers in row 1: Date | Supplier | Description | Category | Amount EUR | VAT EUR | Receipt File. Freeze row 1 so headers stay visible as you scroll.',
                },
                {
                  n: "03",
                  title: "Decide on your expense categories",
                  body: "Common categories for an Irish sole trader in tech or digital services: Software Subscriptions, Hosting & Domains, Hardware, Home Office, Professional Fees, Advertising & Marketing, Training & Development, Travel, Subcontractors, Bank Charges.",
                },
                {
                  n: "04",
                  title: "Photograph receipts on the spot",
                  body: "When you receive a receipt — paper or email — photograph or screenshot it immediately. Name each file with the date and supplier, for example 2026-04-15_aws.pdf. Upload it to your Receipts folder straight away. This single habit is what prevents the October panic.",
                },
                {
                  n: "05",
                  title: "Log each expense the same day",
                  body: "Open your sheet, add a row, fill in the details, and type the receipt filename in the last column. Do not leave it for the weekend. A 60-second habit every time beats a two-hour monthly catch-up.",
                },
                {
                  n: "06",
                  title: "Total up at year-end",
                  body: "Before filing your Form 11, add a SUM formula at the bottom of your Amount column and group totals by category. A simple pivot table works perfectly. Hand the totals to your accountant, or enter them directly into ROS yourself.",
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

            <h3 className="text-xl font-bold text-[#1E293B] mt-10 mb-4">
              A privacy-first alternative: Proton Drive and Proton Sheets
            </h3>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Google Drive works well and costs nothing. But if data protection
              matters to you — and as a business owner holding financial records,
              it probably should — there is a European alternative worth knowing
              about.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              <a
                href="https://proton.me/drive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline font-semibold"
              >
                Proton Drive
              </a>{" "}
              is built by Proton AG, a Swiss company based in Geneva. Your files
              are end-to-end encrypted before they leave your device, which
              means even Proton cannot read them. That is a meaningful
              difference from standard cloud storage, where the provider can
              technically access your files if they choose or are required to.
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 leading-relaxed">
              <li>
                <strong>European servers, Swiss jurisdiction</strong> — your
                receipts and financial records are stored under Swiss and EU
                privacy law, outside US and UK jurisdiction
              </li>
              <li>
                <strong>GDPR by design</strong> — Proton was built around
                privacy from day one, not retrofitted to comply with it later
              </li>
              <li>
                <strong>Free plan available</strong> — 5 GB of encrypted
                storage at no cost, which is more than enough for receipts and
                spreadsheets in the early years of a sole trader business
              </li>
              <li>
                <strong>Proton Sheets included</strong> — Proton now has its
                own encrypted spreadsheet tool. You can recreate the full
                expenses tracker setup inside Proton&apos;s ecosystem without
                touching Google at all
              </li>
              <li>
                <strong>Open source and independently audited</strong> — the
                code is publicly available and reviewed regularly by
                independent security experts
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Paid plans start from around €4 per month and include much more
              storage alongside Proton Mail, VPN, and other privacy tools.
              Always check current pricing at{" "}
              <a
                href="https://proton.me/pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                proton.me/pricing
              </a>
              .
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Want something more automated?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              If your transaction volume grows to around 40 expenses a month or
              more, a dedicated bookkeeping app starts to save you real time.
              Here is what to look for, and what to watch out for:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-300">
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">
                      What to check
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">
                      Why it matters
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Pricing page — not the landing page",
                      '"Free forever" claims change. Check the actual pricing page before investing time in setup.',
                    ],
                    [
                      "EUR support and Irish tax categories",
                      "Some tools are built for the US or UK market and lack Irish-relevant categories.",
                    ],
                    [
                      "Mobile receipt capture",
                      "A phone camera scanner saves hours over the year. Check it works offline too.",
                    ],
                    [
                      "CSV or PDF export",
                      "You need to get your data out easily — for your accountant and for switching tools later.",
                    ],
                    [
                      "GDPR and data storage",
                      "Your financial records are sensitive. Check where data is stored and whether the vendor is EU-based.",
                    ],
                  ].map(([what, why]) => (
                    <tr key={what} className="border-b border-slate-200">
                      <td className="px-4 py-3 font-medium text-[#1E293B] align-top">
                        {what}
                      </td>
                      <td className="px-4 py-3 text-slate-600 align-top">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Not an advertisement notice */}
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 flex gap-4 mb-8">
              <AlertCircle
                size={18}
                className="text-amber-500 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold">Not an advertisement.</span>{" "}
                The tools listed below are not sponsored and we have no
                commercial relationship with any of them. They are products
                that some of our clients use and have mentioned positively. We
                share them here as a practical resource only. Always do your
                own research before committing to any tool.
              </p>
            </div>

            <h3 className="text-xl font-bold text-[#1E293B] mt-8 mb-3">
              Zoho Books
            </h3>
            <p className="text-slate-600 leading-relaxed text-base mb-8">
              <a
                href="https://www.zoho.com/books/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline font-semibold"
              >
                Zoho Books
              </a>{" "}
              has one of the most generous free tiers of any dedicated
              accounting app. If your business brings in under €50,000 per
              year, you can use its full invoicing and expense tracking
              features at no cost. Paid plans start around €10 per month
              (billed annually) and unlock additional users, inventory
              management, and more advanced reporting. Zoho states it does not
              use third-party tracking tools on its own products and hosts data
              in its own data centres. It supports EUR, handles VAT, and works
              well for Irish sole traders. Always verify the current free-plan
              threshold and features at{" "}
              <a
                href="https://www.zoho.com/books/pricing.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                zoho.com/books/pricing.html
              </a>
              .
            </p>

            <h3 className="text-xl font-bold text-[#1E293B] mt-8 mb-3">
              Sage Accounting (Ireland)
            </h3>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              <a
                href="https://www.sage.com/en-ie/sage-business-cloud/accounting/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline font-semibold"
              >
                Sage Accounting
              </a>{" "}
              is the cloud-based product from Sage available to Irish
              businesses at{" "}
              <a
                href="https://www.sage.com/en-ie/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                sage.com/en-ie
              </a>
              . The entry-level plan (Accounting Start) starts at €17 per
              month plus VAT and is aimed specifically at sole traders and
              freelancers. It covers invoicing, bank reconciliation, and VAT
              returns. You may see Sage products listed under different names
              depending on region and version history, so always check the
              Irish pricing page directly for current plans and any active
              offers.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-8">
              Sage is one of the most established names in accounting software,
              used by over two million businesses worldwide with a strong
              accountant and partner network in Ireland. For a sole trader who
              wants a recognised, well-supported product with Irish VAT
              handling built in, it is a reliable option. It does come with a
              monthly cost, so it makes more sense once your business is
              generating consistent income.
            </p>

            <h3 className="text-xl font-bold text-[#1E293B] mt-8 mb-3">
              Refrens
            </h3>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              <a
                href="https://www.refrens.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline font-semibold"
              >
                Refrens
              </a>{" "}
              is a cloud-based invoicing and accounting platform used by
              freelancers and small businesses in over 170 countries. It has a
              free plan that includes basic expense tracking, invoicing, and
              client management. The free tier is limited to 15 documents per
              period, which suits very low-volume businesses. Premium plans
              unlock unlimited documents, recurring invoices, and more
              automation features.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-8">
              Worth knowing: Refrens is primarily built for the Indian market.
              Several of its compliance features (GST reports, E-way bills) are
              not relevant to Irish businesses, and pricing on its website is
              shown in Indian Rupees. Some of our clients use it for its
              invoicing and general expense tracking tools, setting aside the
              India-specific parts. If you want a flexible free invoicing tool
              that also handles basic bookkeeping across borders, it is worth
              exploring at{" "}
              <a
                href="https://www.refrens.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                refrens.com
              </a>
              .
            </p>

            <h3 className="text-xl font-bold text-[#1E293B] mt-8 mb-3">
              Irish-built options: Surf Accounts and Bright Books
            </h3>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Two tools built specifically for the Irish market are{" "}
              <a
                href="https://www.surfaccounts.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                Surf Accounts
              </a>{" "}
              and{" "}
              <a
                href="https://www.brightbooks.ie/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                Bright Books
              </a>
              . Both are designed with Irish VAT, Revenue requirements, and
              local support in mind. If being able to reach an Irish support
              team matters to you, they are worth looking into directly.
            </p>

            <h3 className="text-xl font-bold text-[#1E293B] mt-8 mb-3">
              Approximate pricing overview (May 2026)
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Prices shown are approximate and may change at any time. Always
              check the official website of each product for current, accurate
              pricing before signing up.
            </p>
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-300">
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">
                      Tool
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">
                      Free plan
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">
                      Paid from (approx.)
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">
                      Stand-out benefit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      tool: "Google Sheets + Google Drive",
                      free: "Yes, free forever",
                      paid: "Not needed",
                      benefit:
                        "Zero cost, no subscription risk, works on any device — the simplest place to start",
                    },
                    {
                      tool: "Proton Drive + Proton Sheets",
                      free: "Yes, 5 GB storage",
                      paid: "~€4/month",
                      benefit:
                        "End-to-end encrypted, European (Swiss) servers, GDPR-first — the privacy choice for storing financial files",
                    },
                    {
                      tool: "Zoho Books",
                      free: "Yes, for revenue under €50k/year",
                      paid: "~€10/month",
                      benefit:
                        "Most generous free tier of any dedicated accounting app; full invoicing, expense tracking, and VAT support",
                    },
                    {
                      tool: "Refrens",
                      free: "Yes, up to 15 documents",
                      paid: "Varies (see website, priced in INR)",
                      benefit:
                        "Clean invoicing and expense tools for freelancers; primarily India-focused but used globally",
                    },
                    {
                      tool: "Sage Accounting (Ireland)",
                      free: "No",
                      paid: "~€17/month + VAT",
                      benefit:
                        "Established and well-supported; built for Irish VAT and compliance; large accountant partner network in Ireland",
                    },
                    {
                      tool: "Surf Accounts",
                      free: "Trial available",
                      paid: "Check site",
                      benefit: "Built specifically for the Irish market with local support",
                    },
                    {
                      tool: "Bright Books",
                      free: "Trial available",
                      paid: "Check site",
                      benefit: "Built specifically for the Irish market with local support",
                    },
                  ].map(({ tool, free, paid, benefit }) => (
                    <tr key={tool} className="border-b border-slate-200">
                      <td className="px-4 py-3 font-medium text-[#1E293B] align-top">
                        {tool}
                      </td>
                      <td className="px-4 py-3 text-slate-600 align-top">
                        {free}
                      </td>
                      <td className="px-4 py-3 text-slate-600 align-top">
                        {paid}
                      </td>
                      <td className="px-4 py-3 text-slate-600 align-top">
                        {benefit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What counts as an allowable business expense in Ireland?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Revenue allows sole traders to deduct expenses that are
              &ldquo;wholly and exclusively&rdquo; for the purpose of the trade.
              Common allowable expenses for a freelancer or sole trader in
              tech, consulting, or digital services include:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 leading-relaxed">
              <li>
                <strong>Software subscriptions</strong> — design tools,
                development tools, project management software
              </li>
              <li>
                <strong>Hosting, domains, and cloud services</strong> — AWS,
                Vercel, Cloudflare, GitHub, etc.
              </li>
              <li>
                <strong>Hardware</strong> — laptop, monitor, keyboard (subject
                to capital allowances rules)
              </li>
              <li>
                <strong>Home office costs</strong> — a proportion of broadband,
                electricity, and heating if you work from home
              </li>
              <li>
                <strong>Professional fees</strong> — accountant fees, legal
                advice directly related to the business
              </li>
              <li>
                <strong>Advertising and marketing</strong> — website costs,
                paid ads, copywriting
              </li>
              <li>
                <strong>Training and professional development</strong> —
                online courses, books, conference tickets
              </li>
              <li>
                <strong>Bank charges</strong> — business bank account fees
              </li>
              <li>
                <strong>Travel</strong> — mileage for business meetings
                (Revenue sets the approved mileage rate each year)
              </li>
              <li>
                <strong>Subcontractors</strong> — freelancers or contractors
                you pay to deliver client work
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Personal expenses — a coffee you had by yourself, your gym
              membership, your family phone plan — are not allowable. When in
              doubt, keep the receipt and ask your accountant.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Key Irish tax dates for sole traders (2026)
            </h2>
            <div className="space-y-4 mb-10">
              {[
                {
                  date: "31 October 2026",
                  label: "Self-assessment deadline — paper",
                  note: "File your Form 11 for the 2025 tax year and pay any balance of tax owed, plus preliminary tax for 2026. This is the general Pay and File deadline.",
                },
                {
                  date: "18 November 2026",
                  label: "Self-assessment deadline — online via ROS",
                  note: "Revenue Online Service (ROS) filers get an extended deadline. Revenue confirmed this date via eBrief No. 034/26. Filing online also lets you import pre-populated income data directly.",
                },
                {
                  date: "Throughout the year",
                  label: "Keep records as you go",
                  note: "Do not wait until September. Log each expense the week it happens. A consistent 5-minute weekly habit beats a frantic October catch-up every time.",
                },
              ].map(({ date, label, note }) => (
                <div
                  key={date}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-block mt-0.5 text-xs font-bold uppercase tracking-widest text-[#22D3EE] bg-[#0F172A] rounded px-2 py-0.5 shrink-0">
                      {date}
                    </span>
                    <div>
                      <p className="font-bold text-[#1E293B] text-sm mb-1">
                        {label}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Your lean expense tracking checklist
            </h2>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 mb-10">
              <ul className="space-y-3 text-sm text-slate-700">
                {[
                  "Create your Google Drive folder structure today — not tomorrow",
                  "Set up your Expenses Google Sheet with the seven columns above",
                  "Photograph every receipt the moment you receive it",
                  "Name each file: YYYY-MM-DD_supplier (makes searching easy in 2 years)",
                  "Log each expense the same day — it takes under a minute",
                  "Record income (invoices paid) in a separate sheet",
                  "Do a 5-minute weekly review to catch anything you missed",
                  "At year-end, total by category and share with your accountant",
                  "Keep all records for at least 6 years — Revenue can audit up to 4 years back",
                  "Register with ROS for online filing and get the November deadline",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 w-5 h-5 rounded-full bg-[#22D3EE] text-[#0F172A] font-extrabold text-xs flex items-center justify-center shrink-0"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Useful links
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-3 mb-10 text-slate-600 leading-relaxed">
              <li>
                <a
                  href="https://www.revenue.ie/en/self-assessment-and-self-employment/index.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] underline font-semibold"
                >
                  Revenue.ie — Self-Assessment and Self-Employment
                </a>{" "}
                — the official starting point for registering as a sole trader
                and understanding your obligations
              </li>
              <li>
                <a
                  href="https://www.revenue.ie/en/self-assessment-and-self-employment/filing-your-tax-return/index.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] underline font-semibold"
                >
                  Revenue.ie — Filing your tax return (Form 11)
                </a>{" "}
                — step-by-step guide and help videos for completing Form 11
              </li>
              <li>
                <a
                  href="https://www.ros.ie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] underline font-semibold"
                >
                  ROS (Revenue Online Service)
                </a>{" "}
                — file your Form 11 online and get the extended November
                deadline
              </li>
              <li>
                <a
                  href="https://www.citizensinformation.ie/en/money-and-tax/tax/income-tax/taxation-of-self-employed-people/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] underline font-semibold"
                >
                  Citizens Information — Taxation of self-employed people
                </a>{" "}
                — a plain-language overview of how self-employment income is
                taxed in Ireland
              </li>
              <li>
                <a
                  href="https://www.localenterprise.ie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] underline font-semibold"
                >
                  Local Enterprise Office (LEO)
                </a>{" "}
                — free mentoring and start-your-own-business training for sole
                traders across Ireland
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
                This guide is for general information only and does not
                constitute tax, legal, or financial advice. Tax rules and
                deadlines change — always verify current details on{" "}
                <a
                  href="https://www.revenue.ie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] underline"
                >
                  Revenue.ie
                </a>{" "}
                or with a qualified accountant before filing your return.
                Third-party tool pricing mentioned in this article may change —
                always check each product&apos;s own website for current information.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <p className="text-white font-extrabold text-xl mb-2">
                Building a business and need a digital product?
              </p>
              <p className="text-slate-400 text-sm mb-6">
                Whether you need an MVP, a client portal, or a full web app —
                we would love to hear your idea. Free first consultation, no
                commitment.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Tell us your idea
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
