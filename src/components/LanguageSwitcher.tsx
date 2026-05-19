"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Check, ChevronDown } from "lucide-react";

const labels: Record<string, string> = { en: "EN", it: "IT", ru: "RU" };

// Language switcher is temporarily hidden — only EN is active
const LANGUAGE_SWITCHER_ENABLED = false;

export default function LanguageSwitcher() {
  if (!LANGUAGE_SWITCHER_ENABLED) return null;
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Blog content is English-only — hide other locale options on blog routes
  const isBlog = pathname.startsWith("/blog");
  const visibleLocales: readonly string[] = isBlog ? ["en"] : routing.locales;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerLabel = locale === "en" ? "IE" : labels[locale] ?? "IE";
  const triggerVisual = locale === "en" ? "🇮🇪" : triggerLabel;

  return (
    <div ref={rootRef} className="relative text-sm" aria-label={t("selectorAriaLabel")}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-slate-200 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
      >
        <span aria-hidden="true" className="text-base leading-none">{triggerVisual}</span>
        <span className="sr-only">{t("currentLanguage", { language: labels[locale] ?? "EN" })}</span>
        <ChevronDown size={14} aria-hidden="true" className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={t("menuAriaLabel")}
          className="absolute right-0 mt-2 min-w-[120px] rounded-lg border border-slate-700 bg-[#0F172A] p-1 shadow-xl"
        >
          {visibleLocales.map((loc) => {
            const selected = loc === locale;
            return (
              <li key={loc} role="none">
                {selected ? (
                  <span
                    role="menuitem"
                    aria-disabled="true"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-slate-100 bg-white/10 cursor-default"
                  >
                    <span>{labels[loc]}</span>
                    <Check size={14} aria-hidden="true" className="text-[#22D3EE]" />
                  </span>
                ) : (
                  <Link
                    href={pathname}
                    locale={loc}
                    role="menuitem"
                    aria-label={t("switchTo", { language: labels[loc] })}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-slate-200 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                  >
                    <span>{labels[loc]}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
