"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type FormValues = {
  name?: string;
  email?: string;
  business?: string;
  idealCustomer?: string;
  websiteGoal?: string;
  notWorking?: string;
  desiredAction?: string;
  triedMarketing?: string;
  competitors?: string;
  successLooksLike?: string;
  budgetTimeframe?: string;
  additionalInfo?: string;
};

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#1E293B]">
        {label}
      </label>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
      {children}
    </div>
  );
}

const inputBase =
  "w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-[#1E293B] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE]";

const textareaBase = `${inputBase} resize-y min-h-[88px]`;

export default function BriefForm() {
  const t = useTranslations("brief");
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/brief", {
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError(t("form.networkError"));
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
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
        <Field id="bf-name" label={t("form.name")}>
          <input
            id="bf-name"
            type="text"
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            className={inputBase}
            {...register("name")}
          />
        </Field>

        <Field id="bf-email" label={t("form.email")} hint={t("form.emailHint")}>
          <input
            id="bf-email"
            type="email"
            autoComplete="email"
            placeholder={t("form.emailPlaceholder")}
            className={inputBase}
            {...register("email")}
          />
        </Field>
      </div>

      <hr className="border-slate-200" />

      <Field id="bf-business" label={t("form.business")}>
        <textarea id="bf-business" rows={2} placeholder={t("form.businessPlaceholder")} className={textareaBase} {...register("business")} />
      </Field>

      <Field id="bf-idealCustomer" label={t("form.idealCustomer")}>
        <textarea id="bf-idealCustomer" rows={2} placeholder={t("form.idealCustomerPlaceholder")} className={textareaBase} {...register("idealCustomer")} />
      </Field>

      <Field id="bf-websiteGoal" label={t("form.websiteGoal")}>
        <textarea id="bf-websiteGoal" rows={2} placeholder={t("form.websiteGoalPlaceholder")} className={textareaBase} {...register("websiteGoal")} />
      </Field>

      <Field id="bf-notWorking" label={t("form.notWorking")}>
        <textarea id="bf-notWorking" rows={2} placeholder={t("form.notWorkingPlaceholder")} className={textareaBase} {...register("notWorking")} />
      </Field>

      <Field id="bf-desiredAction" label={t("form.desiredAction")}>
        <textarea id="bf-desiredAction" rows={2} placeholder={t("form.desiredActionPlaceholder")} className={textareaBase} {...register("desiredAction")} />
      </Field>

      <Field id="bf-triedMarketing" label={t("form.triedMarketing")}>
        <textarea id="bf-triedMarketing" rows={2} placeholder={t("form.triedMarketingPlaceholder")} className={textareaBase} {...register("triedMarketing")} />
      </Field>

      <Field id="bf-competitors" label={t("form.competitors")}>
        <textarea id="bf-competitors" rows={2} placeholder={t("form.competitorsPlaceholder")} className={textareaBase} {...register("competitors")} />
      </Field>

      <Field id="bf-successLooksLike" label={t("form.successLooksLike")}>
        <textarea id="bf-successLooksLike" rows={2} placeholder={t("form.successLooksLikePlaceholder")} className={textareaBase} {...register("successLooksLike")} />
      </Field>

      <Field id="bf-budgetTimeframe" label={t("form.budgetTimeframe")}>
        <textarea id="bf-budgetTimeframe" rows={2} placeholder={t("form.budgetTimeframePlaceholder")} className={textareaBase} {...register("budgetTimeframe")} />
      </Field>

      <Field id="bf-additionalInfo" label={t("form.additionalInfo")}>
        <textarea id="bf-additionalInfo" rows={2} placeholder={t("form.additionalInfoPlaceholder")} className={textareaBase} {...register("additionalInfo")} />
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
