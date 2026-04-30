"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = { en: "EN", it: "IT", ru: "RU" };

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Blog content is English-only — hide other locale options on blog routes
  const isBlog = pathname.startsWith("/blog");
  const visibleLocales: readonly string[] = isBlog ? ["en"] : routing.locales;

  return (
    <div className="flex items-center text-sm" aria-label="Language selector">
      {visibleLocales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className="text-slate-600 mx-1">|</span>
          )}
          <Link
            href={pathname}
            locale={loc}
            aria-label={`Switch to ${labels[loc]}`}
            aria-current={loc === locale ? "true" : undefined}
            className={`px-1 py-0.5 rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] ${
              loc === locale
                ? "font-bold text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {labels[loc]}
          </Link>
        </span>
      ))}
    </div>
  );
}
