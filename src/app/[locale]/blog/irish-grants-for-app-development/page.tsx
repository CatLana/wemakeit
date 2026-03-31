import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Irish Grants for App Development 2026: LEO Grow Digital, Enterprise Ireland & Innovation Vouchers",
  description:
    "Complete guide to Irish government grants for app development in 2026. LEO Grow Digital up to €5,000, Enterprise Ireland Innovation Vouchers (€5k-€10k), and Competitive Start Fund up to €50,000. Eligibility, application steps, and official links.",
  openGraph: {
    title: "Irish Grants for App Development 2026: Official Funding Guide",
    description:
      "Discover how to fund your app development in Ireland. Compare LEO Grow Digital, Innovation Vouchers, and Enterprise Ireland grants. Complete guide with official links and eligibility criteria.",
    type: "article",
  },
};

export default async function ArticlePage({
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
              Grants & Funding
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Irish Grants for App Development 2026: Official Funding Guide
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                24 March 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                10 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <p className="text-slate-600 leading-relaxed text-base mb-5">
              If you run a small business in Ireland and have an idea for an app or digital service, cost is often the biggest barrier. Many SME owners park great ideas because they assume custom app development is financially out of reach.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              The good news: the Irish government offers multiple grants specifically designed to help SMEs fund app development, prototyping, and digital innovation. From <strong>Local Enterprise Office (LEO) Grow Digital Vouchers</strong> up to €5,000, to <strong>Enterprise Ireland Innovation Vouchers</strong> (€5,000–€10,000), to the <strong>Competitive Start Fund</strong> (up to €50,000), there are funding options to suit different project stages and business sizes. This guide explains each scheme, eligibility criteria, and how to apply.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Key Irish Grants for App Development
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              Ireland offers several government-backed grants designed specifically for app and software development. Here&apos;s a comparison of the main options:
            </p>

            {/* Grants comparison table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b-2 border-slate-300">
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">Grant Scheme</th>
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">Funding</th>
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">What It Covers</th>
                    <th className="text-left px-4 py-3 font-bold text-[#1E293B]">Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 font-semibold text-[#1E293B]"><a href="https://www.localenterprise.ie/" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">LEO Grow Digital</a></td>
                    <td className="px-4 py-3">Up to €5,000 (50% of costs)</td>
                    <td className="px-4 py-3">Digital tools, software, website updates, digital strategy</td>
                    <td className="px-4 py-3">SMEs 1&ndash;50 employees</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 font-semibold text-[#1E293B]"><a href="https://www.enterprise-ireland.com/en/supports/innovation-vouchers" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Innovation Vouchers</a></td>
                    <td className="px-4 py-3">€5,000&ndash;€10,000 (expert time)</td>
                    <td className="px-4 py-3">Research, prototyping, UX testing, technical feasibility</td>
                    <td className="px-4 py-3">SMEs &lt;250 employees, limited company, CRO registered</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 font-semibold text-[#1E293B]"><a href="https://www.enterprise-ireland.com/en/supports/start-ups" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Competitive Start Fund (CSF)</a></td>
                    <td className="px-4 py-3">Up to €50,000 (equity investment)</td>
                    <td className="px-4 py-3">Early-stage software, apps, digital products</td>
                    <td className="px-4 py-3">Startups &lt;3 years old, innovative tech focus</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#1E293B]"><a href="https://www.localenterprise.ie/" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">LEO Feasibility Grants</a></td>
                    <td className="px-4 py-3">50&ndash;75% of eligible costs</td>
                    <td className="px-4 py-3">Market research, technical development, UX prototyping</td>
                    <td className="px-4 py-3">SMEs in LEO catchment area</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-[#1E293B] mt-8 mb-4">Enterprise Ireland Innovation Vouchers in Detail</h3>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              <a href="https://www.enterprise-ireland.com/en/supports/innovation-vouchers" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Enterprise Ireland&apos;s Innovation Voucher Programme</a> is one of the most popular schemes for app developers. Vouchers are issued to SMEs to work with registered knowledge providers—typically universities, research institutes, or approved consultants—to validate ideas and explore technical feasibility.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-3">
              Vouchers cover:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 leading-relaxed">
              <li>Exploring a new product, service, or app concept</li>
              <li>Developing or prototyping a digital service or business model</li>
              <li>Solving technical problems in existing systems</li>
              <li>Researching user needs and accessibility requirements</li>
              <li>Validating market opportunity and feasibility</li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              <strong>Eligibility:</strong> Limited companies with fewer than 250 employees and under €50 million turnover, registered with <a href="https://www.cro.ie/" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">the Companies Registration Office (CRO)</a>. Vouchers are valid for 12 months.
            </p>

            <h3 className="text-xl font-bold text-[#1E293B] mt-8 mb-4">What Grants Fund (and Don't Fund)</h3>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              It's important to understand that most Irish grants do not pay for full, end-to-end app development. Instead, they fund the early, high-risk work that reduces project complexity and cost:
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-3">
              <strong>Typically funded by Innovation Vouchers and LEO Feasibility Grants:</strong>
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 leading-relaxed">
              <li>Market and user research to validate demand</li>
              <li>UX research and accessibility testing with real users</li>
              <li>Prototype development and proof-of-concept</li>
              <li>Technical feasibility studies and architecture planning</li>
              <li>Business case development and financial modeling</li>
              <li>Wireframes, designs, and interaction mockups</li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              <strong>Not typically funded:</strong> Full production development, ongoing support, or maintenance. Instead, grants fund the research and planning that makes your full build faster, cheaper, and lower-risk when you move to commercial development afterward.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-6">
              How to Access Irish App Development Grants: Step-by-Step
            </h2>
            <ol className="space-y-6 mb-10">
              {[
                {
                  n: "01",
                  title: "Determine Your Eligibility",
                  body: "Check which grant suits your business: Are you a startup (CSF), an SME under 250 employees (Innovation Vouchers), or a micro-business 1–50 employees (LEO Grow Digital)? Visit your local LEO's website to confirm regional availability and criteria.",
                },
                {
                  n: "02",
                  title: "Define Your Project Scope",
                  body: "Grants don't fund full development—they fund research, prototyping, and discovery. Clearly define what research or prototype work you need to validate your app idea. Document the problem you're solving, target users, and technical unknowns.",
                },
                {
                  n: "03",
                  title: "Identify a Knowledge Provider (for Innovation Vouchers & Feasibility Grants)",
                  body: "If applying for Enterprise Ireland Innovation Vouchers or LEO Feasibility Grants, you must partner with an approved knowledge provider: a university, research institute, or approved consultancy. Enterprise Ireland maintains a list of registered providers.",
                },
                {
                  n: "04",
                  title: "Prepare Your Application",
                  body: "Gather required documents: business plan, project outline, cost breakdown, proof of SME status (if applicable), and company registration details. For Innovation Vouchers, include the knowledge provider's proposed scope and timeline.",
                },
                {
                  n: "05",
                  title: "Submit Your Application",
                  body: "Submit via your Local Enterprise Office (LEO) for Grow Digital and Feasibility Grants, or via Enterprise Ireland for Innovation Vouchers and CSF. Check official deadlines—many schemes operate on rolling or periodic application windows.",
                },
                {
                  n: "06",
                  title: "Work with Your Knowledge Provider",
                  body: "Once approved, collaborate with your partner to conduct research, user testing, prototyping, and technical validation. Maintain detailed records of work completed and expenses for grant reporting.",
                },
              ].map(({ n, title, body }) => (
                <li key={n} className="flex gap-5">
                  <span aria-hidden="true" className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0F172A] text-[#22D3EE] font-extrabold text-sm flex items-center justify-center">
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
              Pro Tips for a Successful Grant Application
            </h2>
            <div className="space-y-6 mb-10">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Be specific about your research questions</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Grants fund unknown work, not known builds. Clearly articulate what you don't know about your app idea (user demand? technical feasibility? market size?) and how the funded research will answer those questions.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Choose the right knowledge provider</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For Innovation Vouchers, your knowledge provider's experience matters. Look for providers with expertise in your app's domain—whether that's e-commerce, health tech, FinTech, or another sector.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Document your costs thoroughly</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Grant agencies require detailed cost breakdowns. Break down labor, equipment, software licenses, and external services. Vague budgets reduce approval chances.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">Check local Enterprise Office programs first</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Local Enterprise Offices often have shorter application timelines and higher approval rates than national schemes. Visit <a href="https://www.localenterprise.ie/" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">LocalEnterprise.ie</a> to find your nearest LEO.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Key Resources for Irish App Development Grants
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-3 mb-10 text-slate-600 leading-relaxed">
              <li><strong><a href="https://www.localenterprise.ie/" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">LocalEnterprise.ie</a></strong> — Find your local LEO and access Grow Digital and Feasibility Grant information</li>
              <li><strong><a href="https://www.enterprise-ireland.com/en/supports/innovation-vouchers" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Enterprise Ireland Innovation Vouchers</a></strong> — Official scheme details, eligibility, and application portal</li>
              <li><strong><a href="https://www.enterprise-ireland.com/en/supports/start-ups" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Enterprise Ireland Start-Ups</a></strong> — Competitive Start Fund and other startup-focused grants</li>
              <li><strong><a href="https://www.cro.ie/" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Companies Registration Office (CRO)</a></strong> — Check SME classification and company registration requirements</li>
              <li><strong><a href="https://www.gov.ie/" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] underline">Gov.ie</a></strong> — Official Irish government portal for business supports and grants</li>
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
                This guide is based on publicly available information from Enterprise Ireland, Local Enterprise Offices, and gov.ie as of March 2026. Grant schemes, amounts, and eligibility criteria change periodically. Always verify current details on official websites before applying. This article does not constitute financial or legal advice.
              </p>
            </div>

            {/* Next Steps */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <p className="text-white font-extrabold text-xl mb-2">
                Ready to explore Irish app grants?
              </p>
              <p className="text-slate-400 text-sm mb-6">
                Contact your local Enterprise Office or visit the official Enterprise Ireland website to understand your eligibility and start the application process.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.localenterprise.ie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  Find Your Local LEO
                </a>
                <a
                  href="https://www.enterprise-ireland.com/en/supports/innovation-vouchers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[50px] px-8 bg-white text-[#0F172A] font-bold rounded-xl hover:bg-slate-100 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  View Innovation Vouchers
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
