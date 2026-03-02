export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-[#0F172A] overflow-hidden"
      aria-label="Hero: We Make IT home"
    >
      {/* Geometric background — aria-hidden so screen readers skip it */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
        {/* Large blurred circle — cyan */}
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#22D3EE]/10 blur-3xl motion-safe:animate-[pulse_8s_ease-in-out_infinite]" />
        {/* Large blurred circle — purple */}
        <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-[#A855F7]/10 blur-3xl motion-safe:animate-[pulse_10s_ease-in-out_2s_infinite]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 mb-8">
          <span aria-hidden="true">🇮🇪</span>
          <span>Based in Dublin, Ireland</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.07] tracking-tight mb-6">
          We Make{" "}
          <span className="text-[#22D3EE]">IT</span>
          <br className="hidden sm:block" />
          {" "}Happen.
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed mb-10">
          Custom software, cloud &amp; AI solutions — built by Irish engineers,
          delivered on time, built to last.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[52px] px-8 bg-[#22D3EE] text-[#0F172A] font-semibold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Talk to us
          </a>
          <a
            href="#case-studies"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[52px] px-8 bg-transparent text-white border border-white/20 font-semibold rounded-xl hover:bg-white/5 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
          >
            See our work
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          className="mt-20 flex justify-center motion-safe:animate-bounce"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-500"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
