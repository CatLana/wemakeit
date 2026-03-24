const stats = [
  {
    value: "15+",
    label: "Years Building Apps and Websites",
    ariaLabel: "15 plus years building apps and websites",
  },
  {
    value: "Free",
    label: "First Consultation. No Commitment.",
    ariaLabel: "Free first consultation with no commitment required",
  },
  {
    value: "1",
    label: "Fixed Price. No Hidden Extras.",
    ariaLabel: "One fixed price with no hidden extras",
  },
  {
    value: "0",
    label: "Tech Knowledge Required From You",
    ariaLabel: "Zero technical knowledge required from you",
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
              <dd
                aria-hidden="true"
                className="mt-2 text-sm text-slate-500 leading-snug"
              >
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
