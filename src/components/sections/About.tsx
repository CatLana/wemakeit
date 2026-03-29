"use client";
import { Heart, Award, Users, ShieldCheck, Globe, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const valueIcons = [Heart, Award, Users, ShieldCheck];

export default function About() {
  const t = useTranslations("about");
  const values = t.raw("values") as Array<{ title: string; description: string }>;

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
              {t("eyebrow")}
            </span>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-6"
            >
              {t("headingLine1")}
              <br />
              <span className="text-[#0F172A]">{t("headingLine2")}</span>
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
              <p>{t("body3")}</p>
              <p className="font-semibold text-[#1E293B]">{t("tagline")}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  // Dynamically import to avoid SSR issues
                  import("@/components/sections/Contact").then(mod => {
                    if (mod.focusContactForm) mod.focusContactForm();
                  });
                }
              }}
              className="mt-8 inline-flex items-center justify-center min-h-[50px] px-7 bg-[#0F172A] text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {t("cta")}
            </button>
          </div>

          {/* Visual */}
          <div
            aria-label={t("visualLabel")}
            role="img"
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F172A] to-slate-800 border border-slate-200"
          >
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
              <p className="text-white font-semibold text-lg">{t("visualHeading")}</p>
              <p className="text-slate-400 text-sm mt-1">{t("visualSub")}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Globe size={12} aria-hidden="true" />
                <span>{t("visualRegions")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 border-t border-slate-100">
          {values.map(({ title, description }, i) => {
            const Icon = valueIcons[i] ?? Heart;
            return (
              <div key={title} className="flex flex-col items-start rounded-2xl border border-slate-100 bg-slate-50 p-6 hover:border-slate-200 hover:bg-white transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0F172A] mb-4">
                  <Icon size={22} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
