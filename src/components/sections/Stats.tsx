const stats = [
  {
    value: "15+",
    label: "Years of Combined Engineering Experience",
    ariaLabel: "15 plus years of combined engineering experience",
  },
  {
    value: "2",
    label: "Core Specialisations: Frontend & Backend",
    ariaLabel: "2 core specialisations: Frontend and Backend",
  },
  {
    value: "3",
    label: "Languages Spoken: English, Italian, Russian",
    ariaLabel: "3 languages spoken: English, Italian, and Russian",
  },
  {
    value: "1",
    label: "All-in-One Package — No Hidden Extras",
    ariaLabel: "All-in-one package with no hidden extras",
  },
];

export default function Stats() {
  return (
    <section
      aria-label="Company highlights"
      className="bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label, ariaLabel }) => (
            <div key={label} className="flex flex-col items-center">
              <dt className="sr-only">{ariaLabel}</dt>
              <dd
                aria-hidden="true"
                className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight"
              >
                {value}
              </dd>
              <p
                aria-hidden="true"
                className="mt-2 text-sm text-slate-500 leading-snug"
              >
                {label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
