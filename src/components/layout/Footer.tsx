"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Globe, Tag } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Footer() {
  const t = useTranslations("footer");
  const serviceLabels = t.raw("serviceLinks") as string[];
  const freeToolLinks = t.raw("freeToolLinks") as {
    websiteAudit: string;
    appAudit: string;
    freeConsultation: string;
  };

  return (
    <footer
      className="bg-[#0F172A] text-slate-400 border-t border-white/10"
      aria-label={t("footerLabel")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link
              href="/"
              aria-label="We Make IT - Home"
              className="inline-flex items-center mb-4 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              <Image
                src="/images/logo_wemakeit.svg"
                alt=""
                width={350}
                height={110}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              {t("tagline")}
            </p>

            {/* Spring sale banner */}
            <div className="rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 p-4 mb-6">
              <p className="text-xs font-semibold text-[#22D3EE] mb-1 flex items-center gap-1.5">
                <Tag size={12} aria-hidden="true" />
                {t("springSaleTitle")}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("springSaleBody")}
              </p>
              <p className="text-xs text-slate-400 mt-1.5">
                {t("springSaleBeat")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      import("@/components/sections/Contact").then((mod) => {
                        if (mod.focusContactForm) mod.focusContactForm();
                      });
                    }
                  }}
                  className="text-[#22D3EE] underline underline-offset-2 hover:text-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {t("springSaleSendIt")}
                </button>{" "}
                {t("springSaleBeatSuffix")}
              </p>
            </div>

            <NewsletterSignup />
            {/* Contact info with small map */}
            <address className="not-italic text-sm space-y-3 mt-6">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="shrink-0 text-[#22D3EE]" aria-hidden="true" />
                <span>{t("remoteText")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-[#22D3EE]" aria-hidden="true" />
                <a
                  href="mailto:info@wemakeit.ie"
                  className="hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  info@wemakeit.ie
                </a>
              </div>
              {/* Location card */}
              <div className="mt-6 relative w-full rounded-xl overflow-hidden border border-white/10">
                {/* Dot-grid map background */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  aria-hidden="true"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <pattern id="footer-map-dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.9" fill="#22D3EE" opacity="0.22" />
                    </pattern>
                    <radialGradient id="footer-map-vignette" cx="50%" cy="45%" r="65%">
                      <stop offset="0%" stopColor="#0B1628" stopOpacity="0" />
                      <stop offset="100%" stopColor="#0B1628" stopOpacity="0.85" />
                    </radialGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="#0B1628" />
                  <rect width="100%" height="100%" fill="url(#footer-map-dots)" />
                  <rect width="100%" height="100%" fill="url(#footer-map-vignette)" />
                </svg>

                {/* Card content */}
                <div className="relative z-10 px-5 pt-5 pb-4">
                  {/* Pin row */}
                  <div className="flex items-start gap-3">
                    <div className="relative mt-0.5 shrink-0">
                      <span className="absolute inset-0 rounded-full bg-[#22D3EE]/30 animate-ping [animation-duration:2s]" />
                      <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#22D3EE]/20 ring-1 ring-[#22D3EE]/50">
                        <MapPin size={11} className="text-[#22D3EE]" aria-hidden="true" />
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-snug">
                        Ashbourne, Co. Meath
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">Republic of Ireland</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-3.5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Footer row */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Based in Ireland, working locally and globally</span>
                    <a
                      href="https://maps.google.com/?q=Ashbourne,+Co.+Meath,+Ireland"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#22D3EE]/70 hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                      aria-label="Open Ashbourne, Co. Meath in Google Maps (opens in new tab)"
                    >
                      View on map ↗
                    </a>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-[#22D3EE]/50 to-transparent" />
              </div>
            </address>
            {/* Language note */}
            <p className="mt-5 text-xs text-slate-400 flex items-center gap-1.5">
              <Globe size={12} aria-hidden="true" className="shrink-0" />
              <span>{t("languageNote")}</span>
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3 className="chalk-heading font-semibold text-sm uppercase tracking-wider mb-4">
              {t("sections.services")}
            </h3>
            <ul className="space-y-1" role="list">
              {serviceLabels.map((label, index) => {
                const serviceHrefs = [
                  "/solutions/websites",
                  "/solutions/websites",
                  "/solutions/websites",
                  "/solutions/software",
                  "/solutions/software",
                ];
                return (
                  <li key={label}>
                    <Link
                      href={serviceHrefs[index] ?? "/solutions"}
                      className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="chalk-heading font-semibold text-sm uppercase tracking-wider mb-4">
              {t("sections.company")}
            </h3>
            <ul className="space-y-1" role="list">
              <li>
                <Link href="/about" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.blog")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.getAQuote")}
                </Link>
              </li>
              <li>
                <Link href="/solutions/for-entrepreneurs" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  For Small Entrepreneurs
                </Link>
              </li>
              <li>
                <Link href="/solutions/for-smes" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  For SMEs
                </Link>
              </li>
              <li>
                <Link href="/solutions/for-startups" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  For Startups
                </Link>
              </li>
              <li>
                <Link href="/solutions/for-software" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  Custom Software Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Free Tools column */}
          <div>
            <h3 className="chalk-heading font-semibold text-sm uppercase tracking-wider mb-4">
              {t("sections.freeTools")}
            </h3>
            <ul className="space-y-1" role="list">
              <li>
                <Link
                  href="/audit"
                  className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {freeToolLinks.websiteAudit}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/", query: { service: "audit" }, hash: "quote" } as never}
                  className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {freeToolLinks.appAudit}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/", query: { service: "consultation" }, hash: "quote" } as never}
                  className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {freeToolLinks.freeConsultation}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="chalk-heading font-semibold text-sm uppercase tracking-wider mb-4">
              {t("sections.legal")}
            </h3>
            <ul className="space-y-1" role="list">
              <li>
                <Link href="/privacy-policy" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("legalLinks.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("legalLinks.cookiePolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("legalLinks.termsOfService")}
                </Link>
              </li>
              <li>
                <Link href="/accessibility-statement" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("legalLinks.accessibilityStatement")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>{t("copyright")}</p>
          <p>
            {t("builtBy")}{" "}
            <Link
              href="/"
              className="text-[#22D3EE] hover:text-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              We Make IT
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
