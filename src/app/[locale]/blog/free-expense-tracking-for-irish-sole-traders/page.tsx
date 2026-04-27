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
      "Free Expense Tracking for Irish Sole Traders: The Lean-Start Guide 2026",
    description:
      "A practical, free system for Irish sole traders to track business expenses and upload receipts year-round. Wave Accounting vs Google Sheets — what to use, how to set it up, and what Revenue.ie expects at tax time.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en/blog/${SLUG}`,
        it: `${BASE_URL}/it/blog/${SLUG}`,
        ru: `${BASE_URL}/ru/blog/${SLUG}`,
      },
    },
    openGraph: {
      title: "Free Expense Tracking for Irish Sole Traders 2026",
      description:
        "Stop losing receipts. Use Wave Accounting or Google Drive to track all business expenses — free, easy, and ready for your Form 11 each October.",
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
      "Free Expense Tracking for Irish Sole Traders: The Lean-Start Guide 2026",
    description:
      "A practical, free system for Irish sole traders to track business expenses and upload receipts year-round. Wave Accounting vs Google Sheets — what to use and how to set it up.",
    datePublished: "2026-04-26T00:00:00.000Z",
    dateModified: "2026-04-26T00:00:00.000Z",
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
      { "@type": "Thing", name: "Wave Accounting" },
      { "@type": "Thing", name: "Irish sole trader taxes" },
      { "@type": "Thing", name: "Revenue.ie Form 11" },
    ],
    keywords:
      "free expense tracking ireland, sole trader expenses ireland, wave accounting ireland, form 11 ireland, track business expenses ireland 2026",
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
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#22D3EE] transition-colors mb-8 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back to Blog
            </Link>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              Admin & Finance
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Free Expense Tracking for Irish Sole Traders: The Lean-Start Guide
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                26 April 2026
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
              The lean recommendation: Wave Accounting (free forever)
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              <a
                href="https://www.waveapps.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7490] underline"
              >
                Wave Accounting
              </a>{" "}
              is a completely free double-entry accounting tool used by
              millions of small businesses worldwide. Unlike most competitors
              that offer a &ldquo;free trial&rdquo;, Wave&apos;s core accounting
              features — income, expenses, invoicing, and reports — are free
              permanently, with no credit card required.
            </p>

            {/* Why Wave table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-300">
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">
                      Feature
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">
                      Wave (free)
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">
                      Typical paid tools
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Income & expense tracking", "✅ Free", "€10–€30/month"],
                    [
                      "Upload and store receipts",
                      "✅ Free (via mobile app)",
                      "Often paid add-on",
                    ],
                    ["Send invoices", "✅ Free", "Often included"],
                    [
                      "Profit & Loss report",
                      "✅ Free",
                      "Included in most plans",
                    ],
                    [
                      "Multiple currencies",
                      "✅ Free",
                      "Usually higher-tier plan",
                    ],
                    [
                      "Payroll",
                      "Paid add-on (not needed for sole trader)",
                      "Varies",
                    ],
                  ].map(([feature, wave, paid]) => (
                    <tr key={feature} className="border-b border-slate-200">
                      <td className="px-4 py-3 font-medium text-[#1E293B]">
                        {feature}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{wave}</td>
                      <td className="px-4 py-3 text-slate-600">{paid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-[#1E293B] mt-8 mb-4">
              How to set up Wave in 15 minutes
            </h3>
            <ol className="space-y-6 mb-10">
              {[
                {
                  n: "01",
                  title: "Create a free account at waveapps.com",
                  body: 'Sign up with your email. Choose "I work for myself" and select your country as Ireland. This takes about two minutes.',
                },
                {
                  n: "02",
                  title: "Set up your business profile",
                  body: "Enter your business name (your name as a sole trader is fine), set the currency to EUR, and set your fiscal year start to 1 January.",
                },
                {
                  n: "03",
                  title: "Create your expense categories",
                  body: "Wave comes with standard categories pre-loaded. For an Irish sole trader the most common ones are: Advertising & Marketing, Computer & Internet Expenses, Home Office, Professional Fees (accountant), Travel, and Subcontractors. You can customise to match Revenue allowable expenses.",
                },
                {
                  n: "04",
                  title: "Download the Wave mobile app",
                  body: "The iOS and Android app lets you photograph receipts on the spot. Wave reads the date and amount automatically. The photo is stored in the cloud. No more paper receipts going missing.",
                },
                {
                  n: "05",
                  title: "Log each expense as it happens",
                  body: "Spend €12 on a domain renewal? Open Wave, add an expense, choose the category, upload the receipt photo. Takes 30 seconds. Do this every time — it is the single most important habit.",
                },
                {
                  n: "06",
                  title: "Run a Profit & Loss report in October",
                  body: "Before filing your Form 11, go to Reports → Profit & Loss and select the full tax year. This gives you the income and expense totals your accountant (or you, via ROS) needs.",
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
              The even leaner backup: Google Drive + Sheets
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              If you prefer to keep things as simple as possible and are not
              yet ready for any new app, Google Drive and Google Sheets cost
              nothing and work perfectly for a starting sole trader.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-3">
              Set up a folder structure like this in Google Drive:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-5 font-mono text-sm text-slate-700 leading-relaxed">
              <p>📁 Business / Finance</p>
              <p>&nbsp;&nbsp;📁 2026</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;📁 Receipts</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 2026-01-15_hosting_aws.jpg</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 2026-02-03_coffee_meeting.jpg</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;📄 2026 Expenses (Google Sheet)</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;📄 2026 Invoices Sent (Google Sheet)</p>
            </div>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              In your expenses spreadsheet, keep one row per expense with
              columns for: Date, Description, Category, Amount (EUR), VAT if
              applicable, and Receipt filename. Scan or photograph every receipt
              with your phone camera and name the file with the date and
              supplier so you can find it instantly in two years&apos; time.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              This approach works fine while your transaction volume is low
              (under 5–10 expenses a week). As your business grows, you will
              want to migrate to Wave or a similar tool — but starting here is
              perfectly valid.
            </p>

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
              Key Irish tax dates for sole traders
            </h2>
            <div className="space-y-4 mb-10">
              {[
                {
                  date: "31 October each year",
                  label: "Self-assessment deadline (paper)",
                  note: "File your Form 11 and pay any balance of tax owed for the previous year, plus your preliminary tax for the current year.",
                },
                {
                  date: "Mid-November each year",
                  label: "Self-assessment deadline (online via ROS)",
                  note: "Revenue Online Service (ROS) filers get an extended deadline. Filing online also makes it easier to import figures directly.",
                },
                {
                  date: "Ongoing throughout the year",
                  label: "Keep records as you go",
                  note: "Do not wait until September. Log each expense the week it happens. A consistent 5-minute weekly habit beats a frantic October catch-up.",
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
                  "Create a Wave account (or a Google Drive folder) today — not tomorrow",
                  "Photograph every receipt the moment you receive it",
                  "Categorise expenses weekly (takes under 5 minutes)",
                  "Store all supplier invoices as PDFs in a dated folder",
                  "Record income (invoices paid) as well as expenses in the same tool",
                  "At year-end, run a Profit & Loss report and hand it to your accountant",
                  "Keep all records for 6 years (Revenue requirement)",
                  "Register with ROS (Revenue Online Service) for online filing",
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
                <strong>
                  <a
                    href="https://www.waveapps.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E7490] underline"
                  >
                    Wave Accounting
                  </a>
                </strong>{" "}
                — free forever for income, expenses, and invoicing
              </li>
              <li>
                <strong>
                  <a
                    href="https://www.revenue.ie/en/self-assessment-and-self-employment/index.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E7490] underline"
                  >
                    Revenue.ie — Self-Assessment and Self-Employment
                  </a>
                </strong>{" "}
                — official guide to registering as a sole trader and filing
                your return
              </li>
              <li>
                <strong>
                  <a
                    href="https://www.ros.ie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E7490] underline"
                  >
                    ROS (Revenue Online Service)
                  </a>
                </strong>{" "}
                — file your Form 11 online and get the extended November
                deadline
              </li>
              <li>
                <strong>
                  <a
                    href="https://www.revenue.ie/en/self-assessment-and-self-employment/expenses/index.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E7490] underline"
                  >
                    Revenue — Allowable Expenses for Self-Employed
                  </a>
                </strong>{" "}
                — official Revenue guidance on what you can and cannot deduct
              </li>
              <li>
                <strong>
                  <a
                    href="https://www.localenterprise.ie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0E7490] underline"
                  >
                    Local Enterprise Office (LEO)
                  </a>
                </strong>{" "}
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
