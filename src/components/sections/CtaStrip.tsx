export default function CtaStrip() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-[#0F172A] border-y border-white/10 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
        <div>
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
          >
            Not sure if your idea is ready?
          </h2>
          <p className="mt-2 text-slate-400 text-base lg:text-lg">
            That is exactly when to talk to us. We offer free idea validation
            consultations. No commitment, no jargon, just an honest conversation.
          </p>
          <p className="mt-3 text-slate-400 text-base lg:text-lg">
            We have in-house experience in Design Thinking and Minimum Viable
            Product design. We can help you figure out whether your idea can
            become a profitable business, or whether it is better to refine it
            first before spending money on development.
          </p>
        </div>
        <a
          href="/?inquiry=consultation#quote"
          className="shrink-0 inline-flex items-center justify-center min-h-[52px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base whitespace-nowrap focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Book a free consultation
        </a>
      </div>
    </section>
  );
}
