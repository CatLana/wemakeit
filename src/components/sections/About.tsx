import { Heart, Zap, Globe, MapPin } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "We Speak Plain English",
    description:
      "No jargon, no confusion. We explain everything in a way that makes sense, and we never make you feel bad for asking questions.",
  },
  {
    icon: Zap,
    title: "Big-Company Experience, Small-Team Feel",
    description:
      "We have 15+ years of experience building apps for large companies. Now we bring that same quality to smaller projects, with the attention and care a big agency cannot offer.",
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
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
              About Us
            </span>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-6"
            >
              We turn your idea
              <br />
              <span className="text-[#0F172A]">into a real product.</span>
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>
                We Make IT is a small team of experienced engineers based in
                Ireland. We work with entrepreneurs, small businesses, and
                first-time founders who have a great idea but are not sure how
                to get it built.
              </p>
              <p>
                You do not need to know anything about technology. We will have
                a free, no-pressure conversation with you, help you figure out
                what you actually need, and give you an honest plan and price.
              </p>
              <p>
                We have helped businesses across Ireland and Europe build apps,
                websites, and digital platforms from scratch. We have worked at
                big tech companies and know what good looks like. Now we bring
                that experience to small teams and startups.
              </p>
              <p className="font-semibold text-[#1E293B]">
                Wherever you are, if you have an idea, we would love to hear it.
              </p>
            </div>
            <a
              href="#quote"
              className="mt-8 inline-flex items-center justify-center min-h-[50px] px-7 bg-[#0F172A] text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              Get a free quote
            </a>
          </div>

          {/* Visual */}
          <div
            aria-label="We Make IT - Ireland"
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
              <div className="w-16 h-16 rounded-full bg-[#22D3EE]/20 flex items-center justify-center mb-4">
                <MapPin size={28} aria-hidden="true" className="text-[#22D3EE]" />
              </div>
              <p className="text-white font-semibold text-lg">Based in Ireland</p>
              <p className="text-slate-400 text-sm mt-1">Working globally</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Globe size={12} aria-hidden="true" />
                <span>Europe · Remote · Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-slate-100">
          {values.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0F172A] mb-4">
                <Icon size={22} className="text-[#22D3EE]" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[#1E293B] mb-2">
                {title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
