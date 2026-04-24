"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Globe, Tag } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Footer() {
  const t = useTranslations("footer");
  const serviceLabels = t.raw("serviceLinks") as string[];

  return (
    <footer
      className="bg-[#0F172A] text-slate-400 border-t border-white/10"
      aria-label={t("footerLabel")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              aria-label="We Make IT - Home"
              className="inline-flex items-center text-white font-bold text-2xl mb-4 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              We Make <span className="text-[#22D3EE] ml-1">IT</span>
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
            {/* Contact info */}
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
            </address>
            {/* Language note */}
            <p className="mt-5 text-xs text-slate-400 flex items-center gap-1.5">
              <Globe size={12} aria-hidden="true" className="shrink-0" />
              <span>{t("languageNote")}</span>
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("sections.services")}
            </h3>
            <ul className="space-y-1" role="list">
              {serviceLabels.map((label) => (
                <li key={label}>
                  <Link
                    href="/#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("sections.company")}
            </h3>
            <ul className="space-y-1" role="list">
              <li>
                <Link href="/#about" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/#process" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.blog")}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      import("@/components/sections/Contact").then(mod => {
                        if (mod.focusContactForm) mod.focusContactForm();
                      });
                    }
                  }}
                  className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {t("companyLinks.getAQuote")}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
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
            <a
              href="https://www.wemakeit.ie"
              className="text-[#22D3EE] hover:text-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              We Make IT
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
