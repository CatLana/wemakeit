import { MapPin, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-[#0F172A] overflow-hidden"
      aria-label={t("ariaLabel")}
    >
      {/* Geometric background — aria-hidden so screen readers skip it */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
        {/* Large blurred circle — cyan */}
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] motion-safe:lg:animate-[pulse_8s_ease-in-out_infinite]">
          <div className="w-full h-full rounded-full bg-[#22D3EE]/10 blur-xl lg:blur-3xl" />
        </div>
        {/* Large blurred circle — purple */}
        <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] motion-safe:lg:animate-[pulse_10s_ease-in-out_2s_infinite]">
          <div className="w-full h-full rounded-full bg-[#A855F7]/10 blur-xl lg:blur-3xl" />
        </div>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 mb-8">
          <MapPin size={14} aria-hidden="true" className="text-slate-400" />
          <span>{t("badge")}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.07] tracking-tight mb-6">
          We Make{" "}
          <span className="text-[#22D3EE]">IT</span>
          <br className="hidden sm:block" />
          {" "}Happen.
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed mb-6">
          {t("subtitle")}
        </p>

        {/* Summer sale offer */}
        <div className="inline-flex items-start gap-2 px-5 py-3 max-w-full rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-[#22D3EE] text-sm font-semibold mb-10">
          <Tag size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>{t("springSale")}</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#quote"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[52px] px-8 bg-[#22D3EE] text-[#0F172A] font-semibold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            {t("cta1")}
          </a>
          <a
            href="#process"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[52px] px-8 bg-transparent text-white border border-white/20 font-semibold rounded-xl hover:bg-white/5 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
          >
            {t("cta2")}
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          className="mt-20 flex justify-center motion-safe:animate-bounce"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-500"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
