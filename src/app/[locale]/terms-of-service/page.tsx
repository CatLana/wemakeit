import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | We Make IT",
  description: "Terms and conditions governing the website development, design, and software consultancy services provided by We Make IT.",
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "24 March 2026";

export default async function TermsOfServicePage({
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
              Terms of Service
            </h1>
            <p className="mt-3 text-slate-400 text-sm">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-10 text-slate-600 leading-relaxed">

            {/* Notice */}
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-800">
              <strong>Important:</strong> Please read these Terms of Service carefully before engaging our services or using this website. By submitting a quote request, signing a contract, or making any payment to We Make IT, you confirm that you have read, understood, and agree to be bound by these Terms.
            </div>

            {/* 1. About Us */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">1. About Us</h2>
              <p className="text-sm">
                <strong className="text-[#1E293B]">We Make IT</strong> is a sole trader business operated by <strong className="text-[#1E293B]">Lana [Surname]</strong>, registered and trading in Ireland.
              </p>
              <div className="mt-3 rounded-xl bg-white border border-slate-200 p-5 text-sm space-y-1">
                <p><strong className="text-[#1E293B]">We Make IT</strong></p>
                <p>Operated by: Lana [Surname] (sole trader)</p>
                <p>Address: 32 Millbourne Drive, Ashbourne, Co. Meath, Ireland</p>
                <p>Email: <a href="mailto:info@wemakeit.ie" className="text-[#0E7490] hover:text-[#0891B2]">info@wemakeit.ie</a></p>
              </div>
            </section>

            {/* 2. Definitions */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">2. Definitions</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong className="text-[#1E293B]">&ldquo;We&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;</strong> refers to We Make IT and its operator Lana [Surname].</li>
                <li><strong className="text-[#1E293B]">&ldquo;You&rdquo;, &ldquo;Client&rdquo;</strong> refers to the individual or business entity that engages our services.</li>
                <li><strong className="text-[#1E293B]">&ldquo;Services&rdquo;</strong> means web development, mobile app development, UI/UX design, prototyping, software consultancy, UX research, accessibility audits, maintenance, and any other services agreed in writing.</li>
                <li><strong className="text-[#1E293B]">&ldquo;Deliverables&rdquo;</strong> means the specific outputs produced under an agreed project scope (code, designs, documents, prototypes).</li>
                <li><strong className="text-[#1E293B]">&ldquo;Scope&rdquo;</strong> means the agreed description of work, features, and deliverables set out in a written quote, proposal, or Statement of Work.</li>
                <li><strong className="text-[#1E293B]">&ldquo;Contract&rdquo;</strong> means the agreement formed when a written quote is accepted and a deposit is paid.</li>
              </ul>
            </section>

            {/* 3. Services & Quotes */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">3. Services and Quotes</h2>
              <p className="text-sm">
                All Services are provided on the basis of a written quote or proposal issued by us and accepted by you. A quote is valid for <strong className="text-[#1E293B]">30 days</strong> from the date of issue unless expressly stated otherwise.
              </p>
              <p className="mt-3 text-sm">
                A project commences only once: (a) both parties have agreed the Scope in writing; and (b) the agreed deposit has been received in full. Submission of an enquiry form does not constitute a contract or binding commitment by either party.
              </p>
              <p className="mt-3 text-sm">
                We reserve the right to decline any project at our discretion, including but not limited to projects that are unlawful, unethical, or incompatible with our values or capacity.
              </p>
            </section>

            {/* 4. Payment */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">4. Payment Terms</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>A non-refundable <strong className="text-[#1E293B]">deposit</strong> (as stated in the quote, typically 30–50% of the total project value) is required before any work begins. The deposit covers initial planning, research, and setup work.</li>
                <li>Interim payments may be required for larger projects at agreed milestones. Milestones will be defined in the project plan.</li>
                <li>The <strong className="text-[#1E293B]">final balance</strong> is due upon project completion, before final deliverables are released or handed over.</li>
                <li>Invoices are payable within <strong className="text-[#1E293B]">14 calendar days</strong> of issue unless otherwise stated.</li>
                <li>We reserve the right to apply statutory interest on overdue amounts under the <strong className="text-[#1E293B]">European Communities (Late Payment in Commercial Transactions) Regulations 2012</strong> at the applicable rate.</li>
                <li>All prices are in <strong className="text-[#1E293B]">EUR</strong> and exclusive of VAT where applicable. Irish VAT obligations will apply where required by law.</li>
                <li>If a Client does not proceed after paying a deposit, the deposit is non-refundable. Any work already completed beyond the deposit value will be invoiced separately.</li>
              </ul>
            </section>

            {/* 5. Scope Changes */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">5. Scope Changes and Additional Work</h2>
              <p className="text-sm">
                Any request for work outside the agreed Scope — including additional features, design changes, platform changes, or integrations not specified in the original quote — constitutes a <strong className="text-[#1E293B]">scope change</strong> and will require a separate written quote and acceptance before work commences.
              </p>
              <p className="mt-3 text-sm">
                We are not obliged to perform work outside the agreed Scope. Requests for scope changes submitted verbally (e.g., by phone or in conversation) do not bind us until confirmed in writing.
              </p>
              <p className="mt-3 text-sm">
                Where we carry out additional work at a Client&apos;s request without a formal change order, we reserve the right to invoice for that work at our standard day rate.
              </p>
            </section>

            {/* 6. Client Responsibilities */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">6. Client Responsibilities</h2>
              <p className="text-sm">To enable us to deliver the Services, you agree to:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm mt-3">
                <li>Provide all required content, materials, logos, images, copy, and access credentials in a timely manner and in the formats specified.</li>
                <li>Review and provide feedback or approval of deliverables within <strong className="text-[#1E293B]">5 business days</strong> of submission. If no feedback is received within this period, the deliverable is deemed approved.</li>
                <li>Ensure that all content, materials, and data you provide do not infringe any third-party intellectual property rights, do not violate any applicable law (including GDPR and consumer protection regulations), and do not contain malware or malicious code.</li>
                <li>Ensure that your intended use of the Deliverables complies with all applicable laws, regulations, and platform terms of service.</li>
                <li>Maintain secure access credentials and notify us immediately of any suspected unauthorised access.</li>
                <li>Designate a single point of contact with authority to make decisions and give approvals on your behalf.</li>
              </ul>
              <p className="mt-3 text-sm">
                Project delays caused by Client&apos;s failure to provide content, approvals, or required information may result in revised delivery dates and/or additional charges at our standard day rate.
              </p>
            </section>

            {/* 7. Intellectual Property */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">7. Intellectual Property</h2>

              <h3 className="text-base font-semibold text-[#1E293B] mt-4 mb-2">a) Custom deliverables</h3>
              <p className="text-sm">
                Upon receipt of full payment of all amounts due, we assign to you all intellectual property rights in the custom Deliverables created specifically for your project, including copyright in original code, designs, and documentation. This assignment takes effect only upon payment in full; until then, all IP in the Deliverables remains with us and you are granted a limited, non-exclusive licence to review the work.
              </p>

              <h3 className="text-base font-semibold text-[#1E293B] mt-4 mb-2">b) Pre-existing and third-party IP</h3>
              <p className="text-sm">
                We retain all rights in our pre-existing intellectual property, including frameworks, libraries, tools, templates, components, methodologies, and processes (&ldquo;Background IP&rdquo;) used in delivering the Services. We grant you a <strong className="text-[#1E293B]">non-exclusive, perpetual, royalty-free licence</strong> to use any Background IP incorporated into your Deliverables solely as part of those Deliverables.
              </p>
              <p className="mt-3 text-sm">
                Open-source components included in the Deliverables are subject to their respective open-source licences (e.g. MIT, Apache 2.0). We will inform you of any such components and their licence terms.
              </p>

              <h3 className="text-base font-semibold text-[#1E293B] mt-4 mb-2">c) Client IP</h3>
              <p className="text-sm">
                You retain full ownership of all content, trademarks, and materials you provide to us. You grant us a limited, non-exclusive licence to use your materials solely for the purpose of delivering the Services.
              </p>

              <h3 className="text-base font-semibold text-[#1E293B] mt-4 mb-2">d) Portfolio rights</h3>
              <p className="text-sm">
                Unless you expressly request otherwise in writing, we reserve the right to display examples of our work for your project in our portfolio, website, and marketing materials. We will not disclose confidential business information when doing so.
              </p>
            </section>

            {/* 8. Confidentiality */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">8. Confidentiality</h2>
              <p className="text-sm">
                Each party agrees to keep confidential any proprietary or sensitive information of the other party obtained in connection with the Services and not to disclose such information to third parties without prior written consent. This obligation does not apply to information that is publicly available, was already known to the receiving party, or is required to be disclosed by law or regulatory authority.
              </p>
            </section>

            {/* 9. Warranties */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">9. Warranties and Disclaimers</h2>
              <div className="rounded-xl bg-[#0F172A] border border-slate-700 p-5 text-sm text-slate-300 mt-2">
                <p className="font-semibold text-white mb-2">DISCLAIMER OF WARRANTIES</p>
                <p>
                  The Services and Deliverables are provided <strong className="text-white">&ldquo;AS IS&rdquo;</strong> and <strong className="text-white">&ldquo;AS AVAILABLE&rdquo;</strong>. To the fullest extent permitted by applicable law, We Make IT expressly disclaims all warranties, express or implied, including but not limited to:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-3">
                  <li>Implied warranties of merchantability or fitness for a particular purpose</li>
                  <li>That Deliverables will be error-free, uninterrupted, or free from bugs or security vulnerabilities</li>
                  <li>That the Services will achieve any particular business outcome, revenue target, or commercial result</li>
                  <li>That third-party platforms, APIs, or services integrated into your project will remain available, function correctly, or continue to be provided on the same terms</li>
                </ul>
                <p className="mt-3">
                  Nothing in these Terms limits or excludes liability for fraud, death, or personal injury caused by negligence, or any liability that cannot be excluded by law.
                </p>
              </div>
              <p className="text-sm mt-4">
                We warrant that the Services will be performed with reasonable skill and care by competent professionals in accordance with generally accepted industry standards.
              </p>
            </section>

            {/* 10. Limitation of Liability */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">10. Limitation of Liability</h2>
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-5 text-sm text-rose-900 mt-2">
                <p className="font-bold mb-2">IMPORTANT — PLEASE READ THIS SECTION CAREFULLY</p>
                <p>
                  To the maximum extent permitted by applicable law:
                </p>
                <ol className="list-decimal pl-5 space-y-2 mt-3">
                  <li><strong>Cap on liability:</strong> Our total liability to you under or in connection with these Terms, whether arising in contract, tort (including negligence), breach of statutory duty, or otherwise, shall not exceed the greater of: (a) the total fees actually paid by you to us in the <strong>12 months immediately preceding the event giving rise to the claim</strong>; or (b) <strong>EUR 500</strong>.</li>
                  <li><strong>Excluded losses:</strong> We shall not be liable for any: loss of profits; loss of revenue or anticipated savings; loss of business or contracts; loss of goodwill or reputation; loss of data or corruption of data; loss of opportunity; or any indirect, special, incidental, punitive, or consequential damages of any kind — even if we have been advised of the possibility of such losses.</li>
                  <li><strong>Third-party failures:</strong> We shall not be liable for failures, delays, errors, or interruptions caused by third-party services, hosting providers, domain registrars, payment processors, APIs, or any technology or infrastructure outside our direct control.</li>
                  <li><strong>Client content:</strong> We shall not be liable for any claims, damages, or losses arising from Client-provided content, materials, or data, including intellectual property infringement, defamation, or regulatory non-compliance.</li>
                  <li><strong>Security:</strong> While we take reasonable security precautions, we shall not be liable for data breaches, hacking, or security incidents resulting from vulnerabilities in third-party software, hosting infrastructure, or actions outside our reasonable control.</li>
                </ol>
              </div>
            </section>

            {/* 11. Indemnification */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">11. Indemnification</h2>
              <p className="text-sm">
                You agree to indemnify, defend, and hold harmless We Make IT and its operator from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or in connection with:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
                <li>Your breach of these Terms;</li>
                <li>Your violation of any applicable law or regulation;</li>
                <li>Content, materials, or data you provide to us;</li>
                <li>Your infringement of any third-party intellectual property, privacy, or other rights;</li>
                <li>Your failure to comply with GDPR, data protection laws, or other regulatory requirements applicable to your business;</li>
                <li>The use or misuse of Deliverables by you or any third party acting with your authorisation.</li>
              </ul>
            </section>

            {/* 12. Force Majeure */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">12. Force Majeure</h2>
              <p className="text-sm">
                Neither party shall be liable for any failure or delay in performing their obligations under these Terms where such failure or delay results from causes beyond their reasonable control, including but not limited to: acts of God; natural disasters; fire; flood; war; terrorism; government action or regulation; pandemic or epidemic; energy or telecommunications infrastructure failure; cyberattacks or major internet outages (&ldquo;Force Majeure Event&rdquo;).
              </p>
              <p className="mt-3 text-sm">
                The affected party must notify the other in writing as soon as practicable. If a Force Majeure Event continues for more than <strong className="text-[#1E293B]">30 consecutive days</strong>, either party may terminate the affected engagement by written notice, with no further liability, except that the Client shall pay for all work completed to date.
              </p>
            </section>

            {/* 13. Termination */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">13. Termination</h2>
              <p className="text-sm">
                Either party may terminate an ongoing project engagement by giving <strong className="text-[#1E293B]">14 days&apos; written notice</strong>. Upon termination:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
                <li>You shall pay for all work completed and reasonable costs incurred up to the termination date.</li>
                <li>The deposit is non-refundable in all circumstances.</li>
                <li>We will provide you with all completed Deliverables and work-in-progress files upon receipt of payment for work done to date.</li>
                <li>IP in Deliverables transfers to you only upon full payment of all outstanding amounts.</li>
              </ul>
              <p className="mt-3 text-sm">
                We may terminate immediately and without notice if you: fail to pay any amount by its due date; become insolvent or enter administration; or materially breach these Terms and fail to remedy the breach within 7 days of written notice.
              </p>
            </section>

            {/* 14. Maintenance */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">14. Post-Launch Maintenance and Support</h2>
              <p className="text-sm">
                Unless a separate ongoing maintenance agreement is in place, our responsibility for a project ends upon final handover and receipt of final payment. We are not obliged to provide bug fixes, updates, security patches, or support after project completion without a separate agreement.
              </p>
              <p className="mt-3 text-sm">
                Where maintenance or support services are agreed, the terms of those services (including scope, response times, and fees) will be set out in a separate written agreement.
              </p>
            </section>

            {/* 15. Website use */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">15. Use of This Website</h2>
              <p className="text-sm">
                The content on <strong className="text-[#1E293B]">wemakeit.ie</strong> is provided for general information purposes only. We make no representations or warranties about the accuracy, completeness, or suitability of any information on this website. The website is provided without any guarantee of uninterrupted availability.
              </p>
              <p className="mt-3 text-sm">
                You may not use this website in any way that is unlawful, fraudulent, harmful, or that infringes the rights of any third party. We reserve the right to restrict access to the website at any time.
              </p>
            </section>

            {/* 16. Governing law */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">16. Governing Law and Jurisdiction</h2>
              <p className="text-sm">
                These Terms and any dispute or claim arising in connection with them (including non-contractual disputes) shall be governed by and construed in accordance with the <strong className="text-[#1E293B]">laws of Ireland</strong>. Each party irrevocably agrees that the courts of Ireland shall have exclusive jurisdiction to settle any dispute arising out of or in connection with these Terms.
              </p>
            </section>

            {/* 17. Entire agreement */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">17. Entire Agreement and Severability</h2>
              <p className="text-sm">
                These Terms, together with any written quote, proposal, or Statement of Work issued by us and accepted by you, constitute the entire agreement between the parties with respect to the subject matter hereof and supersede all prior agreements, representations, and understandings.
              </p>
              <p className="mt-3 text-sm">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable, that provision shall be severed, and the remaining provisions shall continue in full force and effect.
              </p>
              <p className="mt-3 text-sm">
                No waiver of any breach of these Terms shall constitute a waiver of any other or subsequent breach. A waiver is only effective if given in writing.
              </p>
            </section>

            {/* 18. Changes */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">18. Changes to These Terms</h2>
              <p className="text-sm">
                We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date at the top of this page indicates when the current version took effect. Continued use of our website or Services after changes are posted constitutes acceptance of the revised Terms. For active projects governed by a contract, terms agreed at contract formation apply unless both parties agree otherwise in writing.
              </p>
            </section>

            {/* 19. Contact */}
            <section>
              <h2 className="text-xl font-bold text-[#1E293B] mb-3">19. Contact</h2>
              <p className="text-sm">For questions about these Terms, please contact:</p>
              <div className="mt-3 rounded-xl bg-white border border-slate-200 p-5 text-sm space-y-1">
                <p><strong className="text-[#1E293B]">We Make IT</strong></p>
                <p>32 Millbourne Drive, Ashbourne, Co. Meath, Ireland</p>
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
