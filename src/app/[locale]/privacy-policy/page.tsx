import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Privacy Policy | We Make IT",
  description: "How We Make IT collects, uses, and protects your personal data. Compliant with GDPR and the Data Protection Act 2018.",
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "24 March 2026";

export default async function PrivacyPolicyPage({
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
              Privacy Policy
            </h1>
            <p className="mt-3 text-slate-400 text-sm">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">

            {/* Introduction */}
            <section>
              <p className="text-base">
                This Privacy Policy explains how <strong className="text-[#1E293B]">We Make IT</strong>, a sole trader business operated by <strong className="text-[#1E293B]">Svetlana Savchenko</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), collects, uses, stores, and protects your personal data when you visit our website at <strong className="text-[#1E293B]">wemakeit.ie</strong> or engage our services.
              </p>
              <p className="text-base mt-4">
                We are committed to protecting your privacy and processing your personal data lawfully, fairly, and transparently in accordance with the <strong className="text-[#1E293B]">General Data Protection Regulation (GDPR)</strong> and the <strong className="text-[#1E293B]">Data Protection Acts 2018</strong> (Ireland).
              </p>
            </section>

            {/* 1. Data Controller */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">1. Data Controller</h2>
              <p>The data controller for your personal data is:</p>
              <div className="mt-3 rounded-xl bg-white border border-slate-200 p-5 text-sm space-y-1">
                <p><strong className="text-[#1E293B]">We Make IT</strong></p>
                <p>Operated by: Svetlana Savchenko (sole trader)</p>
                <p>Registered: Ashbourne, Co. Meath, Ireland</p>
                <p>Email: <a href="mailto:info@wemakeit.ie" className="text-[#0E7490] hover:text-[#0891B2]">info@wemakeit.ie</a></p>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                We Make IT is not required to appoint a Data Protection Officer (DPO) as we do not carry out large-scale processing of special categories of data. For all privacy-related queries, please contact us at the email above.
              </p>
            </section>

            {/* 2. What Data We Collect */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">2. Personal Data We Collect</h2>
              <p>We collect personal data in the following circumstances:</p>

              <h3 className="text-base font-semibold text-[#1E293B] mt-5 mb-2">a) When you submit our contact or quote form</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Company name (optional)</li>
                <li>Project description and requirements</li>
                <li>Budget range and timeline preferences</li>
                <li>Type of enquiry (quote, consultation, general query)</li>
              </ul>

              <h3 className="text-base font-semibold text-[#1E293B] mt-5 mb-2">b) When you engage our services</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Business details (company name, address, VAT number if applicable)</li>
                <li>Payment information (processed by our payment provider; we do not store card details)</li>
                <li>Project-related communications and files</li>
                <li>Contract and invoice records</li>
              </ul>

              <h3 className="text-base font-semibold text-[#1E293B] mt-5 mb-2">c) Automatically when you visit our website</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>IP address (server logs)</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent (when analytics tools are in use — see our <Link href="/cookie-policy" className="text-[#0E7490] hover:text-[#0891B2]">Cookie Policy</Link>)</li>
                <li>Referral source (how you found us)</li>
              </ul>
              <p className="mt-3 text-sm text-slate-500">
                We do <strong>not</strong> collect special categories of personal data (such as health, ethnicity, religious beliefs, or criminal records) and we do not process children&apos;s personal data. Our services are directed at business professionals aged 18 and over.
              </p>
            </section>

            {/* 3. Legal Basis */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">3. Legal Basis for Processing</h2>
              <p>Under GDPR Article 6, we rely on the following legal bases:</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-lg bg-white border border-slate-200 p-4">
                  <p className="font-semibold text-[#1E293B]">Contract performance (Article 6(1)(b))</p>
                  <p className="mt-1 text-slate-500">Processing necessary to provide services you have contracted with us for, including responding to enquiries, preparing quotes, and delivering project work.</p>
                </div>
                <div className="rounded-lg bg-white border border-slate-200 p-4">
                  <p className="font-semibold text-[#1E293B]">Legitimate interests (Article 6(1)(f))</p>
                  <p className="mt-1 text-slate-500">Processing necessary for our legitimate business interests, including record-keeping, fraud prevention, business administration, and improving our services, where these interests are not overridden by your rights.</p>
                </div>
                <div className="rounded-lg bg-white border border-slate-200 p-4">
                  <p className="font-semibold text-[#1E293B]">Legal obligation (Article 6(1)(c))</p>
                  <p className="mt-1 text-slate-500">Processing required to comply with applicable law, including tax obligations under Irish Revenue requirements and anti-money-laundering regulations.</p>
                </div>
                <div className="rounded-lg bg-white border border-slate-200 p-4">
                  <p className="font-semibold text-[#1E293B]">Consent (Article 6(1)(a))</p>
                  <p className="mt-1 text-slate-500">Where we seek your explicit consent (for example, for analytics cookies or marketing communications), we will do so separately with a clear opt-in mechanism. You may withdraw consent at any time without affecting the lawfulness of earlier processing.</p>
                </div>
              </div>
            </section>

            {/* 4. How We Use Your Data */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">4. How We Use Your Personal Data</h2>
              <p>We use the personal data we collect to:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
                <li>Respond to your enquiries and prepare project quotes</li>
                <li>Enter into and perform contracts for the provision of development, design, and consultancy services</li>
                <li>Issue invoices and process payments</li>
                <li>Maintain business and accounting records as required by Irish law</li>
                <li>Communicate project updates, requests for approval, and deliverables</li>
                <li>Improve our website and services based on usage patterns</li>
                <li>Comply with legal, regulatory, and tax obligations</li>
                <li>Prevent fraud and protect the security of our systems</li>
                <li>Send you information about our services where you have provided consent or where permitted under legitimate interests</li>
              </ul>
              <p className="mt-4 text-sm">We will <strong className="text-[#1E293B]">never</strong> sell, rent, or trade your personal data to third parties for their marketing purposes.</p>
            </section>

            {/* 5. Data Retention */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">5. Data Retention</h2>
              <p>We retain personal data only for as long as necessary for the purposes described in this policy:</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0F172A] text-white">
                      <th className="text-left px-4 py-2 rounded-tl-lg">Data Type</th>
                      <th className="text-left px-4 py-2 rounded-tr-lg">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white"><td className="px-4 py-2">Enquiry and quote form submissions (no contract formed)</td><td className="px-4 py-2">12 months</td></tr>
                    <tr className="bg-slate-50"><td className="px-4 py-2">Client contracts, invoices, payment records</td><td className="px-4 py-2">6 years (Irish Revenue obligation)</td></tr>
                    <tr className="bg-white"><td className="px-4 py-2">Project communications and emails</td><td className="px-4 py-2">3 years after project completion</td></tr>
                    <tr className="bg-slate-50"><td className="px-4 py-2">Website server logs</td><td className="px-4 py-2">90 days</td></tr>
                    <tr className="bg-white rounded-b-lg"><td className="px-4 py-2">Cookie consent preferences</td><td className="px-4 py-2">12 months</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-500">After these periods, data is securely deleted or anonymised.</p>
            </section>

            {/* 6. Third-Party Disclosures */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">6. Sharing Your Personal Data</h2>
              <p>We do not sell your data. We may share it with the following categories of recipients, only where necessary and under appropriate data processing agreements:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm mt-3">
                <li><strong className="text-[#1E293B]">Hosting and infrastructure:</strong> Vercel Inc. (USA) — our website is hosted on Vercel. Data transfers to the USA are governed by Standard Contractual Clauses (SCCs) under GDPR Art. 46(2)(c).</li>
                <li><strong className="text-[#1E293B]">Email delivery:</strong> Where we use a transactional email service provider to deliver your quote or enquiry confirmation, that provider processes your email address under a data processing agreement.</li>
                <li><strong className="text-[#1E293B]">Accountants and advisors:</strong> Our accountant and legal advisors, who are bound by professional confidentiality obligations.</li>
                <li><strong className="text-[#1E293B]">Analytics providers:</strong> Where you have consented to analytics cookies, your usage data may be shared with analytics service providers in anonymised or pseudonymised form.</li>
                <li><strong className="text-[#1E293B]">Law enforcement and regulators:</strong> Where required by law, court order, or regulatory authority including the Irish Data Protection Commission, Irish Revenue, or An Garda Síochána.</li>
              </ul>
            </section>

            {/* 7. International Transfers */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">7. International Data Transfers</h2>
              <p className="text-sm">
                Some of our service providers are based outside the European Economic Area (EEA). Where we transfer personal data to countries not deemed adequate by the European Commission, we ensure appropriate safeguards are in place, including <strong className="text-[#1E293B]">Standard Contractual Clauses (SCCs)</strong> approved by the European Commission under GDPR Article 46(2)(c), or we rely on the recipient country&apos;s adequacy decision. You may request a copy of applicable transfer safeguards by contacting us at <a href="mailto:info@wemakeit.ie" className="text-[#0E7490] hover:text-[#0891B2]">info@wemakeit.ie</a>.
              </p>
            </section>

            {/* 8. Your Rights */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">8. Your Data Subject Rights</h2>
              <p>Under GDPR, you have the following rights regarding your personal data:</p>
              <div className="mt-4 space-y-3 text-sm">
                {[
                  ["Right of access (Art. 15)", "You may request confirmation of whether we process your data and obtain a copy of that data."],
                  ["Right to rectification (Art. 16)", "You may request correction of inaccurate or incomplete personal data we hold about you."],
                  ["Right to erasure (Art. 17)", "You may request deletion of your personal data where it is no longer necessary for the purposes collected, you withdraw consent, or you object to processing and there are no overriding legitimate grounds."],
                  ["Right to restriction of processing (Art. 18)", "You may request that we restrict processing your data in certain circumstances, for example while a complaint is being resolved."],
                  ["Right to data portability (Art. 20)", "Where processing is based on consent or contract, you may request your data in a structured, commonly used, machine-readable format."],
                  ["Right to object (Art. 21)", "You have the right to object at any time to processing based on legitimate interests. We will cease processing unless we demonstrate compelling legitimate grounds that override your interests."],
                  ["Rights related to automated decision-making (Art. 22)", "We do not make automated decisions that produce legal or similarly significant effects about you."],
                  ["Right to withdraw consent", "Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of processing prior to withdrawal."],
                ].map(([right, desc]) => (
                  <div key={right as string} className="rounded-lg bg-white border border-slate-200 p-4">
                    <p className="font-semibold text-[#1E293B]">{right}</p>
                    <p className="mt-1 text-slate-500">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm">
                To exercise any of these rights, contact us at <a href="mailto:info@wemakeit.ie" className="text-[#0E7490] hover:text-[#0891B2]">info@wemakeit.ie</a>. We will respond within <strong className="text-[#1E293B]">30 days</strong>. We may need to verify your identity before processing your request. There is no charge for exercising your rights in most circumstances.
              </p>
            </section>

            {/* 9. Data Breaches */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">9. Data Security and Breach Notification</h2>
              <p className="text-sm">
                We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, accidental loss, destruction, or disclosure. These include the use of HTTPS encryption, access controls, and secure hosting on Vercel.
              </p>
              <p className="mt-3 text-sm">
                In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the <strong className="text-[#1E293B]">Irish Data Protection Commission</strong> within <strong className="text-[#1E293B]">72 hours</strong> of becoming aware of the breach, and will notify you directly where required under GDPR Article 34.
              </p>
            </section>

            {/* 10. DPC */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">10. Right to Lodge a Complaint</h2>
              <p className="text-sm">
                If you believe we are processing your personal data unlawfully, you have the right to lodge a complaint with the supervisory authority:
              </p>
              <div className="mt-3 rounded-xl bg-white border border-slate-200 p-5 text-sm space-y-1">
                <p className="font-semibold text-[#1E293B]">Data Protection Commission (Ireland)</p>
                <p>21 Fitzwilliam Square South, Dublin 2, D02 RD28</p>
                <p>Email: <a href="mailto:info@dataprotection.ie" className="text-[#0E7490] hover:text-[#0891B2]">info@dataprotection.ie</a></p>
                <p>Web: <a href="https://www.dataprotection.ie" target="_blank" rel="noopener noreferrer" className="text-[#0E7490] hover:text-[#0891B2]">www.dataprotection.ie</a></p>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                We would, however, appreciate the opportunity to address your concerns before you approach the DPC, so please contact us first at <a href="mailto:info@wemakeit.ie" className="text-[#0E7490] hover:text-[#0891B2]">info@wemakeit.ie</a>.
              </p>
            </section>

            {/* 11. Cookies */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">11. Cookies</h2>
              <p className="text-sm">
                Our website uses cookies. For full details of the cookies we use, their purposes, and how to manage or opt out of them, please read our <Link href="/cookie-policy" className="text-[#0E7490] hover:text-[#0891B2]">Cookie Policy</Link>.
              </p>
            </section>

            {/* 12. Changes */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">12. Changes to This Policy</h2>
              <p className="text-sm">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The &ldquo;Last updated&rdquo; date at the top of this page will always reflect the current version. Where changes are material, we will take reasonable steps to notify you (for example, by updating the notice on our website).
              </p>
            </section>

            {/* 13. Contact */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">13. Contact Us</h2>
              <p className="text-sm">
                For any questions, concerns, or requests relating to this Privacy Policy or your personal data, please contact us:
              </p>
              <div className="mt-3 rounded-xl bg-white border border-slate-200 p-5 text-sm space-y-1">
                <p><strong className="text-[#1E293B]">We Make IT</strong></p>
                <p>Registered: Ashbourne, Co. Meath, Ireland</p>
                <p>Email: <a href="mailto:info@wemakeit.ie" className="text-[#0E7490] hover:text-[#0891B2]">info@wemakeit.ie</a></p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
