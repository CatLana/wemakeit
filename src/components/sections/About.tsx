import { Heart, Zap, Globe } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Accessibility & UX Built In",
    description:
      "You do not have to pay extra to comply with modern accessibility standards required by European law, or hire separate UX experts. It is all included in our standard package.",
  },
  {
    icon: Zap,
    title: "Big-Tech Experience",
    description:
      "Our team has solid experience working for big tech companies and large-scale projects across multiple countries. We bring that expertise directly to your business.",
  },
  {
    icon: Globe,
    title: "We Speak Your Language",
    description:
      "We speak English, Italian, and Russian fluently. If you prefer support in a language other than English, we have you covered.",
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
              Senior Engineers.
              <br />
              <span className="text-[#0F172A]">Real Expertise.</span>
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>
                We Make IT is a software development company with a team of engineers
                bringing 15+ years of in-house expertise in full-stack applications development, UX research and WCAG Accessibility compliance.
              </p>
              <p>
                What makes us different in the Irish market is our excellent expertise
                in Accessibility and UX. As a team, we have solid experience working
                for big tech companies and large projects across multiple countries.
              </p>
              <p>
                We have now embarked on our own journey to assist other businesses with
                the best quality software and websites. Send us a quote from another
                company and we will beat it!
              </p>
              <p className="font-semibold text-[#1E293B]">
                Let&apos;s work together — we make your IT dreams happen!
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
            aria-label="We Make IT — Ireland"
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
                Ireland
              </p>
              <p className="text-slate-400 text-sm mt-2">
                English · Italiano · Русский
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
