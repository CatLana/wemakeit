const stats = [
  {
    value: "12+",
    label: "Years Founded in Ireland",
    ariaLabel: "12 plus years founded in Ireland",
  },
  {
    value: "150+",
    label: "Projects Delivered",
    ariaLabel: "150 plus projects delivered",
  },
  {
    value: "40+",
    label: "Clients Across 10 Sectors",
    ariaLabel: "40 plus clients across 10 sectors",
  },
  {
    value: "5★",
    label: "Verified Clutch Rating",
    ariaLabel: "5 star verified Clutch rating",
  },
];

export default function Stats() {
  return (
    <section
      aria-label="Company stats"
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
