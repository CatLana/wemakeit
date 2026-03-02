const cases = [
  {
    sector: "Fintech",
    sectorColor: "bg-[#22D3EE]/15 text-[#0891B2]",
    title: "Real-time payment processing platform for a leading Irish credit union",
    excerpt:
      "Replaced a 15-year-old batch-processing system with an event-driven microservices architecture, enabling instant member transactions.",
    metric: "↓ 94% transaction latency",
    gradient: "from-[#0F172A] to-slate-700",
  },
  {
    sector: "HealthTech",
    sectorColor: "bg-emerald-100 text-emerald-700",
    title: "Patient management portal used across 60 GP practices in Ireland",
    excerpt:
      "Built a GDPR-compliant, WCAG AA accessible web app used daily by 5,000+ healthcare professionals to manage appointments and records.",
    metric: "5,000+ daily active users",
    gradient: "from-[#0F172A] to-emerald-900",
  },
  {
    sector: "Public Sector",
    sectorColor: "bg-[#A855F7]/15 text-purple-700",
    title: "Digital planning application system for a county council",
    excerpt:
      "Designed and built an end-to-end digital submission and review portal, reducing average processing times from 12 weeks to 3 weeks.",
    metric: "↓ 75% processing time",
    gradient: "from-[#0F172A] to-purple-900",
  },
];

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="casestudies-heading"
      className="bg-white py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
            Case Studies
          </span>
          <h2
            id="casestudies-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight"
          >
            Work we&apos;re proud of
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            Real projects, real results. Placeholder content — replace with your
            actual case studies.
          </p>
        </div>

        {/* Cards */}
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cases.map(({ sector, sectorColor, title, excerpt, metric, gradient }) => (
            <li key={title}>
              <article className="group flex flex-col h-full rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-200">
                {/* Image placeholder */}
                <div
                  aria-label={`${sector} case study image placeholder`}
                  role="img"
                  className={`relative aspect-video bg-gradient-to-br ${gradient} flex items-end p-5`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  />
                  {/* Metric callout */}
                  <div className="relative z-10 inline-flex items-center px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-bold">
                    {metric}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6 bg-white">
                  <span
                    className={`inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full ${sectorColor} mb-3`}
                  >
                    {sector}
                  </span>
                  <h3 className="text-sm font-bold text-[#1E293B] leading-snug mb-3 flex-1">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    {excerpt}
                  </p>
                  <a
                    href="#contact"
                    aria-label={`Read case study: ${title}`}
                    className="inline-flex items-center text-sm font-semibold text-[#22D3EE] hover:text-cyan-300 transition-colors gap-1 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    Read case study <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
