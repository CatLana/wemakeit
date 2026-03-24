const clients = [
  "Acme Corp",
  "Bright Finance",
  "HealthNode",
  "Codalab",
  "GreenGrid",
  "StateCo",
  "Pulsify",
  "DataBridge",
];

export default function Clients() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="bg-[#F8FAFC] border-y border-slate-200 py-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="clients-heading"
          className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400 mb-10"
        >
          Trusted by teams across Ireland
        </h2>

        {/* Marquee container */}
        <div
          className="relative"
          aria-label="Client logos: Acme Corp, Bright Finance, HealthNode, Codalab, GreenGrid, StateCo, Pulsify, DataBridge"
        >
          {/* Fade edges */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none"
          />

          {/* Scrolling track */}
          <div
            className="flex gap-10 w-max motion-safe:animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {[...clients, ...clients].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center justify-center w-36 h-14 rounded-lg bg-white border border-slate-200 shrink-0"
              >
                <span className="text-xs font-semibold text-slate-400 tracking-wide">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
