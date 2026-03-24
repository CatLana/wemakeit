const steps = [
  {
    number: "01",
    title: "Tell Us Your Idea",
    description:
      "Fill in our short form below and describe your idea in plain words. No technical knowledge needed.",
  },
  {
    number: "02",
    title: "We Send You a Quote",
    description:
      "We review your idea and send you a clear email with the quote. No vague estimates, just a straight answer.",
  },
  {
    number: "03",
    title: "We Book a Call",
    description:
      "If you are happy to proceed, we send you a calendar to pick a date for a video or in-person call.",
  },
  {
    number: "04",
    title: "We Shake Hands",
    description:
      "When you are ready to start, we sign a simple contract to get everything in writing.",
  },
  {
    number: "05",
    title: "We Start the Work",
    description:
      "You pay the deposit and we get building. Easy as that.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-[#F8FAFC] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
            How It Works
          </span>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight"
          >
            From idea to app{" "}
            <span className="text-[#0F172A]">in five simple steps</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            You do not need to be technical to get started. Just tell us your
            idea and we will take it from there.
          </p>
        </div>

        {/* Steps */}
        <ol
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
          role="list"
        >
          {steps.map(({ number, title, description }, index) => (
            <li key={number} className="relative flex flex-col">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute top-6 left-[calc(100%_-_1rem)] w-full h-px bg-slate-200 z-0"
                  style={{ left: "calc(100% - 12px)", width: "calc(100% - 12px)" }}
                />
              )}

              {/* Step number */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#0F172A] text-[#22D3EE] font-extrabold text-sm mb-5 shrink-0">
                {number}
              </div>

              <h3 className="text-base font-bold text-[#1E293B] mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#quote"
            className="inline-flex items-center justify-center min-h-[52px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
          >
            Tell us your idea
            <span aria-hidden="true" className="ml-2">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
