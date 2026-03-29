"use client";

import { useMemo, useState } from "react";
import { scrollToAndFocus } from "@/lib/scrollToAndFocus";
export function focusNewsletterForm() {
  scrollToAndFocus("newsletter-form", "newsletter-email");
}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function makeSchema(t: (k: string) => string) {
  return z.object({
    email: z.string().email(t("emailError")),
    consent: z.literal(true, { message: t("consentError") }),
  });
}

type FormValues = {
  email: string;
  consent: true;
};

const inputBase =
  "w-full px-4 py-3 rounded-lg border text-sm text-[#1E293B] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE]";

export default function NewsletterSignup() {
  const t = useTranslations("newsletter");
  const [outcome, setOutcome] = useState<"subscribed" | "already" | "error" | null>(null);

  const schema = useMemo(() => makeSchema((k) => t(k as Parameters<typeof t>[0])), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setOutcome(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setOutcome("error");
        return;
      }
      setOutcome(
        (json as { status?: string }).status === "already_subscribed"
          ? "already"
          : "subscribed"
      );
    } catch {
      setOutcome("error");
    }
  }

  return (
    <div className="mt-6">
      <p className="text-white font-semibold text-sm mb-1">{t("heading")}</p>
      <p className="text-slate-400 text-xs leading-relaxed mb-4">{t("body")}</p>

      {outcome === "subscribed" && (
        <p role="status" className="text-sm text-emerald-400 font-medium">
          {t("success")}
        </p>
      )}
      {outcome === "already" && (
        <p role="status" className="text-sm text-[#22D3EE] font-medium">
          {t("alreadySubscribed")}
        </p>
      )}
      {outcome === "error" && (
        <p role="alert" className="text-sm text-rose-400 font-medium">
          {t("error")}
        </p>
      )}

      {!outcome && (
        <form
          id="newsletter-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Newsletter signup"
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="newsletter-email" className="sr-only">
              {t("emailLabel")}
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "newsletter-email-error" : undefined}
              className={`${inputBase} ${errors.email ? "border-rose-400" : "border-white/20 bg-white/5 text-white placeholder:text-slate-500"} focus:ring-[#22D3EE]`}
              {...register("email")}
            />
            {errors.email && (
              <p id="newsletter-email-error" role="alert" className="text-xs text-rose-400 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* GDPR consent checkbox */}
          <div className="flex flex-col gap-1">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                aria-required="true"
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "newsletter-consent-error" : undefined}
                className="mt-0.5 w-4 h-4 rounded border-white/20 accent-[#22D3EE] shrink-0 cursor-pointer"
                {...register("consent")}
              />
              <span className="text-xs text-slate-400 leading-relaxed">
                {t("consentPrefix")}{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#22D3EE] underline underline-offset-2 hover:text-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-1 rounded"
                >
                  {t("consentLink")}
                </Link>{" "}
                {t("consentSuffix")}
              </span>
            </label>
            {errors.consent && (
              <p id="newsletter-consent-error" role="alert" className="text-xs text-rose-400 font-medium">
                {errors.consent.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="inline-flex items-center justify-center min-h-[40px] px-5 bg-[#22D3EE] text-[#0F172A] font-semibold text-sm rounded-lg hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            {isSubmitting ? t("subscribing") : t("submit")}
          </button>
        </form>
      )}
    </div>
  );
}
