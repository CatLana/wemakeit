"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { scrollToAndFocus } from "@/lib/scrollToAndFocus";
import QuoteForm from "@/components/QuoteForm";

export function focusContactForm() {
  scrollToAndFocus("quote-form", "qf-name");
}

export default function Contact() {
  const t = useTranslations("contact");

  const trustPoints = t.raw("trustPoints") as string[];
  const whatNextSteps = t.raw("whatNextSteps") as string[];

  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="bg-[#F8FAFC] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

          {/* Left — copy + trust signals */}
          <div className="lg:col-span-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
              {t("eyebrow")}
            </span>
            <h2
              id="quote-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-4"
            >
              {t("heading")}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8 text-lg">
              {t("body")}
            </p>

            {/* Trust signals */}
            <ul className="space-y-3 mb-8" aria-label={t("trustLabel")}>
              {trustPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2
                    size={16}
                    className="text-[#22D3EE] shrink-0"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>

            {/* What happens next (desktop) */}
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-[#1E293B] mb-3">
                {t("whatNextHeading")}
              </p>
              <ol className="space-y-3">
                {whatNextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-[#22D3EE]/15 text-[#0E7490] flex items-center justify-center text-xs font-bold"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              {/* Link to project brief */}
              <p className="mt-8 text-xs text-slate-400 leading-relaxed">
                Need to share more detail?{" "}
                <Link
                  href="/project-brief"
                  className="text-[#0E7490] underline underline-offset-2 hover:text-[#0891B2] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  Fill in our full project brief →
                </Link>
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <QuoteForm />
          </div>

        </div>
      </div>
    </section>
  );
}
