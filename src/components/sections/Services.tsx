import {
  Code2,
  Lightbulb,
  ScanSearch,
  PenTool,
  Smartphone,
  Monitor,
  Accessibility,
  Briefcase,
  Users,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom App Development",
    description:
      "We design and build custom applications tailored to exactly how your business works. No off-the-shelf compromises. Just the right tool, built for you.",
    color: "text-[#22D3EE]",
    bg: "bg-[#22D3EE]/10",
  },
  {
    icon: Lightbulb,
    title: "Idea Validation and MVP",
    description:
      "Not sure if your idea will work? We help you validate it before spending a penny on a full build. We then create a Minimum Viable Product (MVP) so you can test it with real users fast.",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  {
    icon: ScanSearch,
    title: "UX Research",
    description:
      "Already have a product or prototype? As a UI UX design agency, we research how real people use it, find what is confusing or broken, and give you a clear, prioritised list of improvements.",
    color: "text-[#A855F7]",
    bg: "bg-[#A855F7]/10",
  },
  {
    icon: PenTool,
    title: "App Prototype",
    description:
      "Before committing to a full build, we create an interactive prototype of your app. You can click through it, test it with users, and get investor feedback.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "We build mobile apps that work on both iOS and Android from a single codebase, keeping costs down without compromising on look or feel.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Monitor,
    title: "Web Application Development",
    description:
      "Need something more powerful than a website? We build web apps: dashboards, booking systems, portals, marketplaces. If you can imagine it, we can build it.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    icon: Accessibility,
    title: "Accessibility Audits",
    description:
      "EU law now requires digital products to be accessible to people with disabilities. We audit your existing app or website and fix what needs fixing.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: Briefcase,
    title: "Software Consultancy",
    description:
      "Not sure what to build, which technology to choose, or whether your idea is viable? Our software consultancy and app development consulting service gives you honest, jargon-free answers.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: Users,
    title: "Discovery Workshops",
    description:
      "A structured session where we work with you to map out your idea, define what your users need, and agree on the scope before a single line of code is written.",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
  },
  {
    icon: Wrench,
    title: "Maintenance and Support",
    description:
      "Already have an app that needs looking after? We take on ongoing support, fix bugs, add new features, and keep things running smoothly.",
    color: "text-slate-400",
    bg: "bg-slate-400/10",
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
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
            What We Do
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight"
          >
            App and website development{" "}
            <span className="text-[#0F172A]">services for your business</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            From idea validation and prototyping, to mobile app development,
            web applications, IT consulting, and ongoing support. Everything
            under one roof.
          </p>
        </div>

        {/* Service cards grid */}
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                  className="mt-5 inline-flex items-center text-sm font-semibold text-[#0E7490] hover:text-[#0891B2] transition-colors group-hover:gap-2 gap-1 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  Tell us your idea
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
