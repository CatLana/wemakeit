"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Field, inputBase, textareaBase } from "@/components/BriefFormFields";

type FormValues = {
  name?: string;
  email?: string;
  business?: string;
  challenge?: string;
  triedSoFar?: string;
  successLooksLike?: string;
  budgetTimeframe?: string;
  additionalInfo?: string;
};

export default function GeneralBriefForm() {
  const t = useTranslations("generalBrief");
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>();

  useEffect(() => {
    if (!submitted) return;
    const el = successRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [submitted]);

  async function onSubmit(data: FormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/brief/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError((json as { error?: string }).error ?? t("form.serverError"));
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError(t("form.networkError"));
    }
  }

  if (submitted) {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="flex flex-col items-center justify-center text-center py-20"
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
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">{t("form.success.title")}</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">{t("form.success.body")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={t("form.ariaLabel")}
      className="flex flex-col gap-6"
    >
      {/* Contact details */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="gb-name" label={t("form.name")}>
          <input
            id="gb-name"
            type="text"
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            className={inputBase}
            {...register("name")}
          />
        </Field>

        <Field id="gb-email" label={t("form.email")} hint={t("form.emailHint")}>
          <input
            id="gb-email"
            type="email"
            autoComplete="email"
            placeholder={t("form.emailPlaceholder")}
            className={inputBase}
            {...register("email")}
          />
        </Field>
      </div>

      <hr className="border-slate-200" />

      <Field id="gb-business" label={t("form.business")}>
        <textarea id="gb-business" rows={2} placeholder={t("form.businessPlaceholder")} className={textareaBase} {...register("business")} />
      </Field>

      <Field id="gb-challenge" label={t("form.challenge")}>
        <textarea id="gb-challenge" rows={2} placeholder={t("form.challengePlaceholder")} className={textareaBase} {...register("challenge")} />
      </Field>

      <Field id="gb-triedSoFar" label={t("form.triedSoFar")}>
        <textarea id="gb-triedSoFar" rows={2} placeholder={t("form.triedSoFarPlaceholder")} className={textareaBase} {...register("triedSoFar")} />
      </Field>

      <Field id="gb-successLooksLike" label={t("form.successLooksLike")}>
        <textarea id="gb-successLooksLike" rows={2} placeholder={t("form.successLooksLikePlaceholder")} className={textareaBase} {...register("successLooksLike")} />
      </Field>

      <Field id="gb-budgetTimeframe" label={t("form.budgetTimeframe")}>
        <textarea id="gb-budgetTimeframe" rows={2} placeholder={t("form.budgetTimeframePlaceholder")} className={textareaBase} {...register("budgetTimeframe")} />
      </Field>

      <Field id="gb-additionalInfo" label={t("form.additionalInfo")}>
        <textarea id="gb-additionalInfo" rows={2} placeholder={t("form.additionalInfoPlaceholder")} className={textareaBase} {...register("additionalInfo")} />
      </Field>

      {serverError && (
        <p
          role="alert"
          className="text-sm text-rose-600 font-medium rounded-lg bg-rose-50 border border-rose-200 px-4 py-3"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="inline-flex items-center justify-center min-h-[52px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
      >
        {isSubmitting ? t("form.submitting") : t("form.submit")}
      </button>
    </form>
  );
}
