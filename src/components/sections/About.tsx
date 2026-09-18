"use client";
import { Heart, Award, Users, ShieldCheck, Handshake } from "lucide-react";
import { useTranslations } from "next-intl";
import GetQuoteButton from "@/components/GetQuoteButton";

const valueIcons = [Heart, Award, Users, ShieldCheck];

function PartnershipGraphic() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden bg-[#0F172A] flex items-center justify-center"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-[#22D3EE]/10 blur-3xl" />
      </div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[#A855F7]/10 blur-3xl" />

      <div className="relative flex flex-col items-center gap-8 p-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/30">
          <Handshake size={40} className="text-[#22D3EE]" strokeWidth={1.75} />
        </div>
        <div className="flex items-center gap-4">
          {valueIcons.map((Icon, i) => (
            <div
              key={i}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10"
            >
              <Icon size={18} className="text-slate-300" strokeWidth={1.75} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
              {t("eyebrow")}
            </span>
            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
              <p>{t("body3")}</p>
              <p className="font-semibold text-[#1E293B]">{t("tagline")}</p>
            </div>
            <GetQuoteButton className="mt-8 inline-flex items-center justify-center min-h-[50px] px-7 bg-[#0F172A] text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2">
              {t("cta")}
            </GetQuoteButton>
          </div>
          <PartnershipGraphic />
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
