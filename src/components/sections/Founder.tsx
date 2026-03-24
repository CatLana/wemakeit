import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Founder() {
  const t = useTranslations("founder");

  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="bg-[#0F172A] py-20 lg:py-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-10">
          {t("eyebrow")}
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">

          {/* Left � portrait card */}
          <div className="flex flex-col items-center lg:items-start lg:sticky lg:top-24">
            <Image
              src="/profile_picture.jpg"
              alt={t("imgAlt")}
              width={240}
              height={280}
              className="rounded-2xl object-cover w-full max-w-[240px] lg:max-w-full border border-white/10"
              priority
            />
            <div className="mt-5 text-center lg:text-left">
              <h2
                id="founder-heading"
                className="text-2xl font-extrabold text-white"
              >
                {t("name")}
              </h2>
              <p className="mt-2 text-sm font-medium text-[#22D3EE] leading-snug">
                {t("identity")}
              </p>
            </div>
          </div>

          {/* Right � content */}
          <div className="flex flex-col gap-8">

            {/* Opening */}
            <p className="text-slate-300 leading-relaxed text-lg">
              {t("opening")}
            </p>

            {/* Bio */}
            <p className="text-slate-300 leading-relaxed text-base">
              {t("bio")}
            </p>

            {/* Passion */}
            <p className="text-slate-300 leading-relaxed text-base">
              {t("passion")}
            </p>

            {/* What makes us different */}
            <div className="rounded-xl bg-[#22D3EE]/8 border border-[#22D3EE]/20 p-6">
              <p className="text-white font-bold text-base mb-2">
                {t("differenceHeading")}
              </p>
              <p className="text-[#22D3EE] font-semibold text-base mb-2">
                {t("differenceHighlight")}
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                {t("differenceText")}
              </p>
            </div>

            {/* Quote */}
            <blockquote className="rounded-2xl bg-white/5 px-8 py-8">
              <p className="text-white text-2xl sm:text-3xl font-light leading-snug tracking-tight">
                {t("quote")}
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-[#22D3EE]">
                {t("quoteFooter")}
              </p>
            </blockquote>

            {/* Callout + CTA */}
            <div>
              <p className="text-slate-300 leading-relaxed text-base mb-5">
                {t("callout")}
              </p>
              <a
                href="#quote"
                className="inline-flex items-center justify-center min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                {t("cta")}
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
