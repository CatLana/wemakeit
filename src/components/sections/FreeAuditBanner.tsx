import { Link } from "@/i18n/navigation";
import { CheckCircle2, Zap, Code } from "lucide-react";

export default function FreeAuditBanner() {
  return (
    <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] border-y border-[#22D3EE]/20 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-sm text-[#22D3EE] mb-6">
            <Zap size={14} aria-hidden="true" />
            <span className="font-semibold">Free Audit Program</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Connect with fellow business owners who want to grow.
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
            We are looking to connect with business owners. Whether you are an early entrepreneur or established company who want to grow your revenue and improve how your business runs online — let&rsquo;s connect!
          </p>
        </div>

        {/* Three-column feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-[#22D3EE]/50 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#22D3EE]/20 border border-[#22D3EE]/40 mb-5">
              <Code size={24} className="text-[#22D3EE]" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Website Performance & UX</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We review your digital presence for performance, usability, and design quality to identify opportunities for improvement.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-[#22D3EE]/50 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#22D3EE]/20 border border-[#22D3EE]/40 mb-5">
              <Zap size={24} className="text-[#22D3EE]" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Business Process Automation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Discover opportunities to automate manual processes, save time, and reduce operational costs with tailored IT solutions.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-[#22D3EE]/50 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#22D3EE]/20 border border-[#22D3EE]/40 mb-5">
              <CheckCircle2 size={24} className="text-[#22D3EE]" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Clear Practical Plan</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get a comprehensive report with specific, actionable recommendations tailored to your business goals.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-[#22D3EE]/10 to-[#0E7490]/10 border border-[#22D3EE]/30 p-8 sm:p-12 text-center">
          <p className="text-white font-semibold text-lg mb-2">No business is too small. All sizes are welcome.</p>
          <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto">
            This is free because we are researching the real needs of local businesses to create solutions that truly deliver results.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center justify-center min-h-[48px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
          >
            Start your free audit now
          </Link>
        </div>
      </div>
    </section>
  );
}
