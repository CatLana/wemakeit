"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const inputBase =
  "w-full px-4 py-3 rounded-lg border text-sm text-[#1E293B] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE]";

function makeSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().min(2, t("form.nameError")),
    email: z.string().email(t("form.emailError")),
    phone: z.string().optional(),
    message: z.string().min(2, t("form.messageError")),
  });
}

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export default function ContactSimpleForm() {
  const t = useTranslations("contactPage");
  const [consented, setConsented] = useState(false);
  const [outcome, setOutcome] = useState<"success" | "error" | null>(null);

  const schema = makeSchema((k) => t(k as Parameters<typeof t>[0]));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/simple-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setOutcome(res.ok ? "success" : "error");
      if (res.ok) reset();
    } catch {
      setOutcome("error");
    }
  }

  if (outcome === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-[#22D3EE]/15 flex items-center justify-center mb-5">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">{t("form.successTitle")}</h3>
        <p className="text-slate-500 text-sm mb-6">{t("form.successBody")}</p>
        <button
          type="button"
          onClick={() => { setOutcome(null); setConsented(false); }}
          className="text-sm text-[#0E7490] hover:text-[#0891B2] underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
        >
          {t("form.sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      id="simple-contact-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-5"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="sc-name" className="text-sm font-medium text-[#1E293B]">
          {t("form.name")} <span className="text-rose-500" aria-hidden="true">*</span>
        </label>
        <input
          id="sc-name"
          type="text"
          autoComplete="name"
          placeholder={t("form.namePlaceholder")}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "sc-name-error" : undefined}
          className={`${inputBase} ${errors.name ? "border-rose-400" : "border-slate-200"}`}
          {...register("name")}
        />
        {errors.name && (
          <p id="sc-name-error" role="alert" className="text-xs text-rose-700 font-medium">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="sc-email" className="text-sm font-medium text-[#1E293B]">
          {t("form.email")} <span className="text-rose-500" aria-hidden="true">*</span>
        </label>
        <input
          id="sc-email"
          type="email"
          autoComplete="email"
          placeholder={t("form.emailPlaceholder")}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "sc-email-error" : undefined}
          className={`${inputBase} ${errors.email ? "border-rose-400" : "border-slate-200"}`}
          {...register("email")}
        />
        {errors.email && (
          <p id="sc-email-error" role="alert" className="text-xs text-rose-700 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="sc-phone" className="text-sm font-medium text-[#1E293B]">
          {t("form.phone")}
        </label>
        <input
          id="sc-phone"
          type="tel"
          autoComplete="tel"
          placeholder={t("form.phonePlaceholder")}
          className={`${inputBase} border-slate-200`}
          {...register("phone")}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="sc-message" className="text-sm font-medium text-[#1E293B]">
          {t("form.message")} <span className="text-rose-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="sc-message"
          rows={5}
          placeholder={t("form.messagePlaceholder")}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "sc-message-error" : undefined}
          className={`${inputBase} resize-y min-h-[120px] ${errors.message ? "border-rose-400" : "border-slate-200"}`}
          {...register("message")}
        />
        {errors.message && (
          <p id="sc-message-error" role="alert" className="text-xs text-rose-700 font-medium">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Consent — auto-ticks when Submit is clicked */}
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="sc-consent"
          checked={consented}
          readOnly
          aria-label="Data processing consent"
          className="mt-0.5 w-4 h-4 rounded accent-[#22D3EE] shrink-0 cursor-pointer"
        />
        <label htmlFor="sc-consent" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
          {t("form.consentText")}{" "}
          <Link
            href="/privacy-policy"
            className="text-[#0E7490] underline underline-offset-2 hover:text-[#0891B2] transition-colors"
          >
            {t("form.consentLink")}
          </Link>{" "}
          {t("form.consentSuffix")}
        </label>
      </div>

      {outcome === "error" && (
        <p role="alert" className="text-sm text-rose-600 font-medium rounded-lg bg-rose-50 border border-rose-200 px-4 py-3">
          {t("form.serverError")}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        onClick={() => setConsented(true)}
        className="inline-flex items-center justify-center min-h-[52px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
      >
        {isSubmitting ? t("form.submitting") : t("form.submit")}
      </button>
    </form>
  );
}
