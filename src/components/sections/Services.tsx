import {
  Code2,
  Layers,
  Accessibility,
  Palette,
  Globe,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Modern, responsive web applications built with the latest technologies. Fast, accessible, and beautiful interfaces that your users will love.",
    color: "text-[#22D3EE]",
    bg: "bg-[#22D3EE]/10",
  },
  {
    icon: Layers,
    title: "Backend Development",
    description:
      "Robust, scalable server-side solutions — APIs, databases, authentication, and integrations. We build the engine that powers your product.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  {
    icon: Accessibility,
    title: "Accessibility (WCAG & EU Law)",
    description:
      "Accessibility is built in from day one — not bolted on at the end. We ensure your product meets WCAG 2.2 and European Accessibility Act requirements at no extra cost.",
    color: "text-[#A855F7]",
    bg: "bg-[#A855F7]/10",
  },
  {
    icon: Palette,
    title: "UX Design & Strategy",
    description:
      "Great software starts with great UX. Our in-house UX expertise means you get research-backed, user-centred design included — no need to hire separately.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "From marketing sites to full e-commerce platforms — we deliver polished, performant websites that convert visitors and represent your brand.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Best Practices",
    description:
      "Code reviews, automated testing, and continuous integration baked into every project. We build software that lasts and is easy to maintain.",
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
            What We Do
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight"
          >
            Everything you need,{" "}
            <span className="text-[#0F172A]">in one package</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            Frontend, Backend, UX, and Accessibility — all under one roof at one
            price. No extras, no surprises.
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
                  href="#quote"
                  aria-label={`Get a quote for ${title}`}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-[#22D3EE] hover:text-cyan-300 transition-colors group-hover:gap-2 gap-1 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  Get a quote
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
