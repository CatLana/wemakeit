import { Heart, Zap, Handshake } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "People First",
    description:
      "Our engineers are permanent employees, not contractors. You get consistent, invested teams who care about your product as if it were their own.",
  },
  {
    icon: Zap,
    title: "No-nonsense Delivery",
    description:
      "We ship on time and in scope. Agile sprints, transparent roadmaps, and weekly demos — no surprises at go-live.",
  },
  {
    icon: Handshake,
    title: "Long-term Partners",
    description:
      "We measure success in years, not tickets. Most of our clients have been with us for 5+ years because we grow with them.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Text */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
              About Us
            </span>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-6"
            >
              Built in Ireland.
              <br />
              <span className="text-[#0F172A]">Built to Last.</span>
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>
                We Make IT was founded in Dublin with a simple mission: deliver
                software that actually works for Irish businesses. No offshoring,
                no bait-and-switch. Every project is staffed by engineers you
                meet on day one and work with until the end.
              </p>
              <p>
                Over the last 12 years we have helped some of Ireland&apos;s most
                ambitious companies — from Series A startups to FTSE-listed
                enterprises — build the digital products that define their
                market position.
              </p>
              <p>
                We are headquartered at Grand Canal Dock in Dublin 2, with
                additional engineers across Cork and Galway. 100% of our
                leadership team is Ireland-based.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center min-h-[50px] px-7 bg-[#0F172A] text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              Meet the team
            </a>
          </div>

          {/* Placeholder image / visual */}
          <div
            aria-label="Team photo placeholder — replace with a real team image"
            role="img"
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F172A] to-slate-800 border border-slate-200"
          >
            {/* Decorative circles */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-48 h-48 rounded-full bg-[#22D3EE]/10 blur-2xl" />
              <div className="absolute w-32 h-32 rounded-full bg-[#A855F7]/10 blur-xl" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <span className="text-6xl mb-4" aria-hidden="true">🇮🇪</span>
              <p className="text-white font-semibold text-lg">
                Dublin, Ireland
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Replace this with your real team photo
              </p>
            </div>
          </div>
        </div>

        {/* Values row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-slate-100">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0F172A] mb-4">
                <Icon size={22} className="text-[#22D3EE]" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[#1E293B] mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
