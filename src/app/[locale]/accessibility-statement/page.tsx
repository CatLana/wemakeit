import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Accessibility Statement | We Make IT",
  description: "We Make IT's commitment to digital accessibility. WCAG 2.1 Level AA conformance statement for wemakeit.ie.",
  robots: { index: false, follow: false },
};

const LAST_REVIEWED = "24 March 2026";

const features = [
  "Skip navigation link to bypass the header and reach main content directly (keyboard and screen reader support)",
  "Semantic HTML landmarks: <header>, <main>, <nav>, <footer>, <section>, <article>",
  "All interactive elements are keyboard focusable with visible focus indicators",
  "ARIA labels and roles applied to navigation, forms, icons, and landmark regions",
  "Decorative icons marked aria-hidden to prevent screen reader noise",
  "Form fields associated with labels via htmlFor/id pairing",
  "Form error messages announced with role=\"alert\" for screen readers",
  "Colour contrast ratios exceed 4.5:1 for normal text and 3:1 for large text throughout",
  "The 'alt' attribute is provided for all meaningful images",
  "No content flashes or rapid animations that could cause seizures; animations respect prefers-reduced-motion where supported",
  "Mobile-responsive layout — the site is fully functional at all viewport widths without horizontal scrolling",
  "Text can be resized up to 200% in the browser without loss of content or functionality",
  "Links have descriptive, contextually meaningful text (no bare 'click here' links)",
  "Page language declared in the HTML lang attribute",
];

const limitations = [
  "Third-party content embedded in future pages (e.g. embedded videos, maps, or social media widgets) may have accessibility limitations beyond our direct control. We will seek accessible alternatives where possible.",
  "PDF documents, if linked from the website, may not be fully accessible. We will provide HTML alternatives on request.",
];

export default async function AccessibilityStatementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-[#F8FAFC]">
        {/* Page hero */}
        <div className="bg-[#0F172A] pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              Legal
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Accessibility Statement
            </h1>
            <p className="mt-3 text-slate-400 text-sm">
              Last reviewed: {LAST_REVIEWED}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-10 text-slate-600 leading-relaxed">

            {/* Commitment */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">Our Commitment</h2>
              <p className="text-sm">
                <strong className="text-[#1E293B]">We Make IT</strong> is committed to ensuring that our website, <strong className="text-[#1E293B]">wemakeit.ie</strong>, is accessible to all users, including people with disabilities. We believe that everyone deserves equal access to digital services and information, and accessibility is not an afterthought — it is a core part of how we build.
              </p>
              <p className="mt-3 text-sm">
                We are working towards conformance with the <strong className="text-[#1E293B]">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> and the European standard <strong className="text-[#1E293B]">EN 301 549</strong>.
              </p>
            </section>

            {/* Conformance status */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">Conformance Status</h2>
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-sm text-emerald-800 flex items-start gap-3">
                <CheckCircle size={20} className="shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Substantially conformant</p>
                  <p className="mt-1">wemakeit.ie is substantially conformant with WCAG 2.1 Level AA. &ldquo;Substantially conformant&rdquo; means that most content meets the standard, with only minor exceptions noted below.</p>
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">Accessibility Features Implemented</h2>
              <ul className="space-y-2 mt-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <CheckCircle size={16} className="shrink-0 mt-0.5 text-emerald-500" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Known limitations */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">Known Limitations</h2>
              <ul className="space-y-3 mt-3">
                {limitations.map((limitation) => (
                  <li key={limitation} className="flex items-start gap-3 text-sm">
                    <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-500" aria-hidden="true" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Technologies */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">Technologies Used</h2>
              <p className="text-sm">This website relies on the following technologies for conformance:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
                <li>HTML5 (semantic elements)</li>
                <li>CSS (Tailwind CSS utility classes)</li>
                <li>JavaScript / TypeScript (React / Next.js)</li>
                <li>WAI-ARIA attributes</li>
              </ul>
              <p className="mt-3 text-sm">
                The website has been assessed using manual keyboard and screen reader testing. We use a combination of the <strong className="text-[#1E293B]">VoiceOver</strong> (macOS/iOS) and <strong className="text-[#1E293B]">NVDA</strong> (Windows) screen readers during development.
              </p>
            </section>

            {/* Feedback */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">Feedback and Contact</h2>
              <p className="text-sm">
                We welcome feedback on the accessibility of wemakeit.ie. If you experience barriers or difficulty accessing any part of our website, please contact us:
              </p>
              <div className="mt-3 rounded-xl bg-white border border-slate-200 p-5 text-sm space-y-1">
                <p><strong className="text-[#1E293B]">We Make IT</strong></p>
                <p>Email: <a href="mailto:info@wemakeit.ie" className="text-[#0E7490] hover:text-[#0891B2]">info@wemakeit.ie</a></p>
                <p>Registered: Ashbourne, Co. Meath, Ireland</p>
              </div>
              <p className="mt-3 text-sm">
                We aim to respond to accessibility feedback within <strong className="text-[#1E293B]">5 business days</strong> and to provide a remediation plan or an accessible alternative within a reasonable timeframe.
              </p>
            </section>

            {/* Enforcement */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">Enforcement</h2>
              <p className="text-sm">
                If you are not satisfied with our response to an accessibility complaint, you may contact the <strong className="text-[#1E293B]">Irish Human Rights and Equality Commission (IHREC)</strong>:
              </p>
              <div className="mt-3 rounded-xl bg-white border border-slate-200 p-5 text-sm space-y-1">
                <p><strong className="text-[#1E293B]">Irish Human Rights and Equality Commission</strong></p>
                <p>16–22 Green Street, Dublin 7, D07 CR20</p>
                <p>Web: <a href="https://www.ihrec.ie" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] hover:text-[#0891B2]">www.ihrec.ie</a></p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
