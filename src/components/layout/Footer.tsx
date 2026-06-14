"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Globe, Tag } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/353838158383";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Footer() {
  const t = useTranslations("footer");
  const serviceLabels = t.raw("serviceLinks") as string[];
  const freeToolLinks = t.raw("freeToolLinks") as {
    websiteAudit: string;
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
                <Link
                  href={{ pathname: "/", hash: "quote" } as never}
                  className="text-[#22D3EE] underline underline-offset-2 hover:text-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {t("springSaleSendIt")}
                </Link>{" "}
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
              <div className="flex items-center gap-3">
                <span className="shrink-0 text-[#25D366]">
                  <WhatsAppIcon size={16} />
                </span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  aria-label={t("whatsappLabel") + " (opens in WhatsApp)"}
                >
                  {t("whatsappLabel")}
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

              {/* WhatsApp QR compact card */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-3 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 px-4 py-3 hover:bg-[#25D366]/10 transition-colors group focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                aria-label={t("whatsappLabel") + " (opens in WhatsApp)"}
              >
                <Image
                  src="/images/whatsapp_qr_code.jpeg"
                  alt={t("whatsappQrAlt")}
                  width={56}
                  height={56}
                  className="rounded-lg shrink-0 border border-[#25D366]/20"
                />
                <div>
                  <p className="text-xs font-semibold text-white group-hover:text-[#25D366] transition-colors flex items-center gap-1.5">
                    <span className="text-[#25D366]"><WhatsAppIcon size={13} /></span>
                    {t("whatsappLabel")}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{t("whatsappQrCaption")}</p>
                </div>
              </a>
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
                  "/solutions/software",
                  "/solutions/software",
                  "/audit",
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
                <Link href="/pricing" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.pricing")}
                </Link>
              </li>
              <li>
                <Link href="/pricing#faq-heading" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.faq")}
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/", query: { service: "quote" }, hash: "quote" } as never} className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.getAQuote")}
                </Link>
              </li>
              <li>
                <Link href="/book" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.bookFollowUp")}
                </Link>
              </li>
              <li>
                <Link href="/brief" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.preMeetingBrief")}
                </Link>
              </li>
              <li>
                <Link href="/solutions/for-entrepreneurs" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.forEntrepreneurs")}
                </Link>
              </li>
              <li>
                <Link href="/solutions/for-smes" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.forSMEs")}
                </Link>
              </li>
              <li>
                <Link href="/solutions/for-startups" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.forStartups")}
                </Link>
              </li>
              <li>
                <Link href="/solutions/for-software" className="block py-2 text-sm hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                  {t("companyLinks.forSoftware")}
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
