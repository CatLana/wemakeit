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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-10">
          {t("eyebrow")}
        </span>

        <p className="text-slate-300 leading-relaxed text-lg mb-10">
          {t("opening")}
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-7 mb-10">
          <Image
            src="/profile_picture.jpg"
            alt={t("imgAlt")}
            width={120}
            height={120}
            className="rounded-2xl object-cover shrink-0 border-2 border-[#22D3EE]/30"
            priority
          />
          <div>
            <h2
              id="founder-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white mb-4"
            >
              {t("name")}
            </h2>
            <p className="text-base leading-loose">
              <span className="bg-[#22D3EE]/15 border border-[#22D3EE]/30 text-[#22D3EE] font-semibold rounded-lg px-3 py-1 inline">
                {t("identity")}
              </span>{" "}
              <span className="text-slate-300">{t("bio")}</span>
            </p>
          </div>
        </div>

        <p className="text-slate-300 leading-relaxed text-base mb-10">
          {t("passion")}
        </p>

        <div className="mb-10">
          <p className="text-white font-bold text-lg mb-3">
            {t("differenceHeading")}
          </p>
          <p className="text-slate-300 leading-relaxed text-base">
            <span className="inline-flex items-center gap-2 font-bold text-[#22D3EE]">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-[#22D3EE] shrink-0"
              />
              {t("differenceHighlight")}
            </span>{" "}
            {t("differenceText")}
          </p>
        </div>

        <blockquote className="relative pl-6 border-l-4 border-[#22D3EE] mb-10">
          <span
            aria-hidden="true"
            className="absolute -top-4 left-3 text-[#22D3EE]/40 text-7xl leading-none font-serif select-none"
          >
            &ldquo;
          </span>
          <p className="text-white text-xl sm:text-2xl font-semibold leading-snug italic">
            {t("quote")}
          </p>
          <p className="mt-3 text-slate-400 text-base not-italic">
            {t("quoteFooter")}
          </p>
        </blockquote>

        <p className="text-slate-300 leading-relaxed text-base mb-6">
          {t("callout")}
        </p>
        <a
          href="#quote"
          className="inline-flex items-center justify-center min-h-[50px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 transition-colors text-base focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
