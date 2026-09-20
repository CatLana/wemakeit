"use client";

import { useTranslations } from "next-intl";
import { scrollToAndFocus } from "@/lib/scrollToAndFocus";
import QuoteForm from "@/components/QuoteForm";

export function focusContactForm() {
  scrollToAndFocus("quote-form", "qf-name");
}

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="bg-[#F8FAFC] py-16 lg:py-24"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
          {t("eyebrow")}
        </span>
        <h2
          id="quote-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-4"
        >
          {t("heading")}
        </h2>
        <p className="text-slate-500 leading-relaxed mb-10 text-lg">
          {t("body")}
        </p>

        <div className="text-left">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
