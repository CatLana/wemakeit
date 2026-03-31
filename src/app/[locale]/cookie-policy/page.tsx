import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | We Make IT",
  description: "How and why We Make IT uses cookies on wemakeit.ie, and how you can manage or opt out of them.",
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "24 March 2026";

export default async function CookiePolicyPage({
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
              Cookie Policy
            </h1>
            <p className="mt-3 text-slate-400 text-sm">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-10 text-slate-600 leading-relaxed">

            {/* Introduction */}
            <section>
              <p className="text-base">
                This Cookie Policy explains what cookies are, which cookies <strong className="text-[#1E293B]">We Make IT</strong> uses on <strong className="text-[#1E293B]">wemakeit.ie</strong>, why we use them, and how you can manage or disable them. It should be read alongside our <a href="/privacy-policy" className="text-[#0E7490] hover:text-[#0891B2]">Privacy Policy</a>.
              </p>
              <p className="text-base mt-4">
                We operate under the EU <strong className="text-[#1E293B]">ePrivacy Directive</strong> (transposed in Ireland as the European Communities (Electronic Communications Networks and Services) (Privacy and Electronic Communications) Regulations 2011) and the <strong className="text-[#1E293B]">GDPR</strong>. Certain cookies require your consent before they are set; others are strictly necessary for the website to function and do not require consent.
              </p>
            </section>

            {/* What are cookies */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">1. What Are Cookies?</h2>
              <p className="text-sm">
                Cookies are small text files placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work, work more efficiently, and to provide information to the website owner. Cookies can be:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
                <li><strong className="text-[#1E293B]">Session cookies:</strong> Deleted automatically when you close your browser.</li>
                <li><strong className="text-[#1E293B]">Persistent cookies:</strong> Remain on your device for a set period or until you delete them manually.</li>
                <li><strong className="text-[#1E293B]">First-party cookies:</strong> Set by wemakeit.ie directly.</li>
                <li><strong className="text-[#1E293B]">Third-party cookies:</strong> Set by external services we use (for example, analytics providers).</li>
              </ul>
            </section>

            {/* Categories */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">2. Categories of Cookies We Use</h2>

              {/* Strictly Necessary */}
              <div className="mt-4 rounded-xl bg-white border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">Always active</span>
                  <h3 className="text-base font-bold text-[#1E293B]">Strictly Necessary</h3>
                </div>
                <p className="text-sm text-slate-500 mb-3">These cookies are essential for the website to function correctly. They cannot be disabled without breaking core functionality. No consent is required for these cookies under the ePrivacy Directive.</p>
                <p className="text-sm text-slate-500">Examples: maintaining your session, security tokens, and your cookie consent preference itself.</p>
              </div>

              {/* Functional */}
              <div className="mt-4 rounded-xl bg-white border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700">Consent required</span>
                  <h3 className="text-base font-bold text-[#1E293B]">Functional</h3>
                </div>
                <p className="text-sm text-slate-500">These cookies remember your preferences and choices to improve your experience, such as preferred language or previously entered form selections. Currently we do not use functional cookies beyond what is strictly necessary.</p>
              </div>

              {/* Analytics */}
              <div className="mt-4 rounded-xl bg-white border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-700">Consent required</span>
                  <h3 className="text-base font-bold text-[#1E293B]">Analytics / Performance</h3>
                </div>
                <p className="text-sm text-slate-500 mb-3">Analytics cookies help us understand how visitors interact with our website — which pages are popular, how people navigate, and where improvements can be made. This data is aggregated and anonymous.</p>
                <p className="text-sm font-medium text-[#1E293B]">Current status: We do not currently use analytics cookies. When we introduce analytics (for example, Google Analytics), we will update this policy, disclose the specific cookies used, and request your consent before setting any analytics cookies.</p>
              </div>

              {/* Marketing */}
              <div className="mt-4 rounded-xl bg-white border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-700">Consent required</span>
                  <h3 className="text-base font-bold text-[#1E293B]">Marketing / Advertising</h3>
                </div>
                <p className="text-sm text-slate-500">We do not currently use marketing, retargeting, or advertising cookies. No tracking pixels, Meta Pixel, Google Ads conversion tracking, or LinkedIn Insight Tags are active on this website at this time. If we introduce any in the future, this policy will be updated and your explicit consent will be sought in advance.</p>
              </div>
            </section>

            {/* Cookie table */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">3. Cookies Currently in Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0F172A] text-white">
                      <th className="text-left px-4 py-2">Cookie Name</th>
                      <th className="text-left px-4 py-2">Duration</th>
                      <th className="text-left px-4 py-2">Purpose</th>
                      <th className="text-left px-4 py-2 rounded-tr-lg">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-mono text-xs">wemakeit_cookie_consent</td>
                      <td className="px-4 py-3">12 months</td>
                      <td className="px-4 py-3">Stores your cookie consent preference (accepted all / essential only)</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700">Strictly Necessary</span></td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 font-mono text-xs">__Host-next-auth* (if used)</td>
                      <td className="px-4 py-3">Session</td>
                      <td className="px-4 py-3">Next.js application session management</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700">Strictly Necessary</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-500">This table will be updated whenever new cookies are introduced. Last reviewed: {LAST_UPDATED}.</p>
            </section>

            {/* Managing cookies */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">4. Managing and Disabling Cookies</h2>

              <h3 className="text-base font-semibold text-[#1E293B] mt-4 mb-2">a) Using our consent banner</h3>
              <p className="text-sm">When you first visit our website, a cookie consent banner is displayed. You may choose to accept all cookies or essential cookies only. You can update your preference at any time by clearing your browser&apos;s local storage for wemakeit.ie, which will cause the banner to reappear on your next visit.</p>

              <h3 className="text-base font-semibold text-[#1E293B] mt-4 mb-2">b) Browser settings</h3>
              <p className="text-sm">Most browsers allow you to control cookies through their settings. Please note that disabling cookies may affect the functionality of our website and other websites you visit. Browser-specific instructions:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] hover:text-[#0891B2]">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] hover:text-[#0891B2]">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] hover:text-[#0891B2]">Apple Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] hover:text-[#0891B2]">Microsoft Edge</a></li>
              </ul>

              <h3 className="text-base font-semibold text-[#1E293B] mt-4 mb-2">c) Opt-out tools</h3>
              <p className="text-sm">For analytics cookies (when introduced), you may also use opt-out tools provided by analytics vendors, such as the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] hover:text-[#0891B2]">Google Analytics opt-out browser add-on</a>.</p>
            </section>

            {/* Third-party cookies */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">5. Third-Party Cookies</h2>
              <p className="text-sm">
                We do not currently use third-party cookies from advertising or analytics platforms. Third-party services we use (such as Vercel for hosting) may set cookies that are strictly necessary for the delivery and security of our website. These providers operate under their own privacy policies:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
                <li><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] hover:text-[#0891B2]">Vercel Inc. Privacy Policy</a></li>
              </ul>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">6. Changes to This Cookie Policy</h2>
              <p className="text-sm">
                We will update this policy whenever we add or remove cookies or change how we use them. The &ldquo;Last updated&rdquo; date will always reflect the current version. Where we add new non-essential cookies, we will re-prompt you for consent.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">7. Contact</h2>
              <p className="text-sm">
                For questions about our use of cookies, contact us at <a href="mailto:info@wemakeit.ie" className="text-[#0E7490] hover:text-[#0891B2]">info@wemakeit.ie</a> or write to: We Make IT, Ashbourne, Co. Meath, Ireland.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
