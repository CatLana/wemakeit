"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

const inputBase =
  "w-full px-4 py-3 rounded-lg border text-sm text-[#1E293B] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE]";

function makeSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().min(2, t("nameError")),
    email: z.string().email(t("emailError")),
    phone: z.string().optional(),
    message: z.string().min(10, t("messageError")),
  });
}

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

interface ConsultationFormProps {
  /** Which copy variant to use */
  variant?: "consultation" | "audit" | "retainer";
  /** Sent in the email to identify which service page the request came from */
  serviceName: string;
}

export default function ConsultationForm({
  variant = "consultation",
  serviceName,
}: ConsultationFormProps) {
  const t = useTranslations("consultationForm");
  const tv = useTranslations(`consultationForm.variants.${variant}`);
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
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, service: serviceName }),
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
        className="flex flex-col items-center justify-center text-center py-12"
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
        <h3 className="text-xl font-bold text-slate-50 mb-2">{t("successTitle")}</h3>
        <p className="text-slate-400 text-sm mb-6">{t("successBody")}</p>
        <button
          type="button"
          onClick={() => setOutcome(null)}
          className="text-sm text-[#22D3EE] hover:text-cyan-300 underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <section
      id="consultation"
      aria-labelledby="consultation-heading"
      className="bg-slate-950 rounded-2xl p-8 md:p-10"
    >
      <h2
        id="consultation-heading"
        className="text-2xl font-bold text-slate-50 mb-2"
      >
        {tv("heading")}
      </h2>
      <p className="text-slate-400 text-sm mb-8">{tv("subheading")}</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label={tv("heading")}
        className="flex flex-col gap-5"
      >
        {/* Name + Email row */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="cf-name"
              className="text-sm font-medium text-slate-300"
            >
              {t("nameLabel")}{" "}
              <span className="text-rose-400" aria-hidden="true">*</span>
            </label>
            <input
              id="cf-name"
              type="text"
              autoComplete="name"
              placeholder={t("namePlaceholder")}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "cf-name-error" : undefined}
              className={`${inputBase} ${errors.name ? "border-rose-400" : "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"}`}
              {...register("name")}
            />
            {errors.name && (
              <p id="cf-name-error" role="alert" className="text-xs text-rose-400 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="cf-email"
              className="text-sm font-medium text-slate-300"
            >
              {t("emailLabel")}{" "}
              <span className="text-rose-400" aria-hidden="true">*</span>
            </label>
            <input
              id="cf-email"
              type="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "cf-email-error" : undefined}
              className={`${inputBase} ${errors.email ? "border-rose-400" : "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"}`}
              {...register("email")}
            />
            {errors.email && (
              <p id="cf-email-error" role="alert" className="text-xs text-rose-400 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cf-phone"
            className="text-sm font-medium text-slate-300"
          >
            {t("phoneLabel")}
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            className={`${inputBase} border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500`}
            {...register("phone")}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cf-message"
            className="text-sm font-medium text-slate-300"
          >
            {tv("messageLabel")}{" "}
            <span className="text-rose-400" aria-hidden="true">*</span>
          </label>
          <textarea
            id="cf-message"
            rows={4}
            placeholder={tv("messagePlaceholder")}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "cf-message-error" : undefined}
            className={`${inputBase} resize-none ${errors.message ? "border-rose-400" : "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"}`}
            {...register("message")}
          />
          {errors.message && (
            <p id="cf-message-error" role="alert" className="text-xs text-rose-400 font-medium">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-7 py-3 bg-[#22D3EE] text-slate-950 font-bold text-sm rounded-lg hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
          >
            {isSubmitting ? t("submitting") : tv("submitLabel")}
          </button>
          <p className="text-xs text-slate-500">{t("privacyNote")}</p>
        </div>

        {outcome === "error" && (
          <p role="alert" className="text-sm text-rose-400 font-medium">
            {t("serverError")}
          </p>
        )}
      </form>
    </section>
  );
}
