"use client";

import { useEffect, useRef, useState, startTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ConsentValue = "all" | "essential" | null;

const STORAGE_KEY = "wemakeit_cookie_consent";

export function useCookieConsent(): ConsentValue {
  const [consent, setConsent] = useState<ConsentValue>(null);
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
    startTransition(() => setConsent(stored ?? null));
  }, []);
  return consent;
}

export default function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) startTransition(() => setVisible(true));
  }, []);

  useEffect(() => {
    if (visible) primaryBtnRef.current?.focus();
  }, [visible]);

  function accept(value: "all" | "essential") {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("ariaLabel")}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F172A] border-t border-white/10 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          {t("text")}{" "}
          <Link
            href="/cookie-policy"
            className="text-[#22D3EE] hover:text-cyan-300 underline underline-offset-2 transition-colors"
          >
            {t("learnMore")}
          </Link>
          .
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => accept("essential")}
            className="text-sm text-slate-400 hover:text-white transition-colors underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
          >
            {t("essential")}
          </button>
          <button
            ref={primaryBtnRef}
            type="button"
            onClick={() => accept("all")}
            className="inline-flex items-center justify-center min-h-[40px] px-5 bg-[#22D3EE] text-[#0F172A] font-semibold text-sm rounded-lg hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
