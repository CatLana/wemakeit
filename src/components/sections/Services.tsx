import {
  Code2,
  Cloud,
  BrainCircuit,
  Settings,
  Database,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "End-to-end web and mobile applications tailored to your business processes. From discovery to deployment and beyond.",
    color: "text-[#22D3EE]",
    bg: "bg-[#22D3EE]/10",
  },
  {
    icon: Cloud,
    title: "Cloud Migration & Infrastructure",
    description:
      "Modernise legacy systems and migrate to AWS, Azure, or GCP with zero-downtime strategies and ongoing cloud management.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  {
    icon: BrainCircuit,
    title: "AI Strategy & Implementation",
    description:
      "From proof-of-concept to production ML pipelines — we help Irish businesses unlock real value from artificial intelligence.",
    color: "text-[#A855F7]",
    bg: "bg-[#A855F7]/10",
  },
  {
    icon: Settings,
    title: "Managed IT Services",
    description:
      "Proactive monitoring, helpdesk, and infrastructure management so your team can focus on the business, not the tech.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Database,
    title: "Data Engineering & Analytics",
    description:
      "Build reliable data pipelines, warehouses, and dashboards that turn raw data into decisions you can act on today.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity & Compliance",
    description:
      "Penetration testing, ISO 27001 readiness, GDPR compliance, and 24/7 threat monitoring for peace of mind.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#F8FAFC] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
            What We Build
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight"
          >
            Services built for your{" "}
            <span className="text-[#0F172A]">growth</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            Whether you need a greenfield product or to modernise an existing
            system, our engineers have you covered from strategy to support.
          </p>
        </div>

        {/* Service cards grid */}
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map(({ icon: Icon, title, description, color, bg }) => (
            <li key={title}>
              <article className="group h-full flex flex-col p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#22D3EE]/50 hover:shadow-lg transition-all duration-200">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} mb-5`}
                >
                  <Icon
                    size={24}
                    className={color}
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                </div>

                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {description}
                </p>

                <a
                  href="#contact"
                  aria-label={`Learn more about ${title} — contact us`}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-[#22D3EE] hover:text-cyan-300 transition-colors group-hover:gap-2 gap-1 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  Learn more
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
