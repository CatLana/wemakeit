import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Clock, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Fund Your App Idea with an Irish State Grant | We Make IT Blog",
  description:
    "Irish SMEs can use Enterprise Ireland Innovation Vouchers and LEO grants to fund early app development, UX research, and prototyping. Learn how We Make IT helps you make the most of these supports.",
  openGraph: {
    title: "Fund Your App Idea with an Irish State Grant",
    description:
      "Irish SMEs can use Innovation Vouchers and LEO grants to fund app development, UX research, and prototyping. We Make IT helps you use these supports.",
    type: "article",
  },
};

export default function ArticlePage() {
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
              Funding
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Did you know you can fund your app idea with an Irish state grant?
            </h1>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                24 March 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                7 min read
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <p className="text-slate-600 leading-relaxed text-base mb-5">
              If you run a small business in Ireland and have an idea for an app
              or a new online service, the biggest barrier is usually cost. Many
              owners park great ideas because they assume custom software or app
              development is out of reach for an SME.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              The truth is, there are Irish government supports that can cover a
              large chunk of the early work on your project, and you can combine
              them with an experienced, accessibility-first development partner
              like us.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              What are Innovation Vouchers?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              Enterprise Ireland&apos;s Innovation Voucher Programme gives small
              and medium-sized limited companies vouchers that can be used to
              work with a registered knowledge provider, usually a university or
              research centre. Vouchers are typically worth around
              &euro;5,000&ndash;&euro;10,000 in expert time and are valid for 12
              months.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-3">
              You can use an Innovation Voucher to:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 leading-relaxed">
              <li>Explore a new product, service, or app idea</li>
              <li>
                Develop or prototype a new digital service or business model
              </li>
              <li>Solve a technical problem in your existing systems</li>
              <li>
                Research user needs and accessibility requirements before
                building anything
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              The scheme is aimed at companies that lack the time, resources, or
              in-house expertise to invest in research and innovation. To
              qualify, you must generally be an SME (fewer than 250 employees,
              under &euro;50m turnover) and a limited company registered with
              the CRO.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              How does that help you get an app or website built?
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              An Innovation Voucher will not usually pay for a full commercial
              app to be built end-to-end. Instead, it funds the early work that
              makes the rest of the project faster, cheaper, and less risky.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-3">
              That early work can include:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mb-5 text-slate-600 leading-relaxed">
              <li>Clarifying what your app should do and who it is for</li>
              <li>Designing accessible user journeys and screens</li>
              <li>Building a prototype or proof-of-concept</li>
              <li>
                Testing ideas with real users, including people with
                disabilities
              </li>
              <li>Choosing the right technical approach and architecture</li>
            </ul>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              This is exactly where our team comes in. With over 15 years of
              experience in software development, UX research, and
              accessibility, we work alongside your chosen knowledge provider
              to turn that funded research into a clear, practical roadmap for
              your product.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-6">
              How we work with you through this process
            </h2>
            <ol className="space-y-6 mb-10">
              {[
                {
                  n: "01",
                  title: "Tell us your idea",
                  body: "Fill in our short form and describe your idea in plain words. Tell us what you want to build and mention that you are interested in grant-supported options. No jargon needed.",
                },
                {
                  n: "02",
                  title: "Grant-friendly project scoping",
                  body: "We help you define a focused piece of research or prototyping work that fits the Innovation Voucher rules and directly supports your app or website idea.",
                },
                {
                  n: "03",
                  title: "Support with the application",
                  body: "We are not grant administrators, but we can provide technical descriptions and work plans that you can include in your application to Enterprise Ireland or your local support body.",
                },
                {
                  n: "04",
                  title: "Delivering the funded phase",
                  body: "Once your voucher is approved and you are working with a knowledge provider, we collaborate to design and prototype an accessible, user-tested version of your product concept.",
                },
                {
                  n: "05",
                  title: "From prototype to full build",
                  body: "After the funded phase, we deliver the production-ready app or website on a commercial basis, using the research and designs already in place.",
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
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              This approach can significantly reduce the upfront cost of
              exploring and validating a new app or software idea.
            </p>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Other Irish supports worth knowing about
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              Alongside Innovation Vouchers, there are other grants that can
              contribute to digital projects:
            </p>

            <div className="space-y-6 mb-10">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  Feasibility and Innovation Grants via Local Enterprise Offices
                  (LEOs)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  These can cover a percentage, often 50&ndash;60 percent
                  depending on region, of costs for market research, technical
                  development, prototypes, and consultancy. This can include
                  early software development and UX work on a new product or
                  service.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  Grow Digital vouchers
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Some schemes offer matched funding to help small businesses
                  improve their online presence, adopt digital tools, or
                  implement recommendations from a digital plan. Eligible
                  spending can include software and configuration.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  Digital process innovation and transformation supports
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Enterprise Ireland runs programmes that fund digital strategy
                  and process innovation projects, sometimes covering up to 50
                  percent of eligible costs to a substantial cap. This is mainly
                  for companies with growth potential and can involve software
                  and automation projects.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-[#1E293B] mt-10 mb-4">
              Get your app idea moving with government-backed funding
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              If you are an Irish SME with an idea for an app or online service,
              you may be able to use state supports such as Enterprise Ireland
              Innovation Vouchers or LEO feasibility grants to fund the
              research, design, and early development stages of your project.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-5">
              We help you shape a grant-friendly project, collaborate with
              approved research partners, and turn the results into a
              production-ready accessible application for your business. You
              focus on the business case, we handle the technical side and make
              sure the project is structured in a way that fits the available
              supports.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-10">
              Use Irish government supports to significantly reduce the upfront
              cost of your app or web project. Fund the research, prototyping,
              and planning for your app idea, then work with us to bring it to
              life.
            </p>

            {/* Disclaimer */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 flex gap-4 mb-12">
              <AlertCircle
                size={18}
                className="text-slate-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-sm text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-600">
                  Please note:
                </span>{" "}
                We are not a grant agency and we cannot guarantee funding.
                Eligibility and funding decisions rest entirely with Enterprise
                Ireland, Local Enterprise Offices, and other state bodies. What
                we do is design and deliver software projects that make smart
                use of the supports that are available.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-[#0F172A] p-8 text-center">
              <p className="text-white font-extrabold text-xl mb-2">
                Want to explore this for your idea?
              </p>
              <p className="text-slate-400 text-sm mb-6">
                Fill in our short form and mention that you are interested in
                grant-supported options. We will come back to you with a clear
                plan and a transparent quote.
              </p>
              <a
                href="/#quote"
                className="inline-flex items-center justify-center min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Tell us your idea
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
