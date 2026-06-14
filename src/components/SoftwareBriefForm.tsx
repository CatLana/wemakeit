"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Field, SectionHeading, inputBase, textareaBase } from "@/components/BriefFormFields";

type FormValues = {
  name?: string;
  email?: string;
  projectType?: string;
  problem?: string;
  outcome?: string;
  users?: string;
  currentProcess?: string;
  integrations?: string;
  mustHaveFeatures?: string;
  timeline?: string;
  budget?: string;
};

export default function SoftwareBriefForm() {
  const t = useTranslations("softwareBrief");
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
      const res = await fetch("/api/brief/software", {
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
        <Field id="sb-name" label={t("form.name")}>
          <input
            id="sb-name"
            type="text"
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            className={inputBase}
            {...register("name")}
          />
        </Field>

        <Field id="sb-email" label={t("form.email")} hint={t("form.emailHint")}>
          <input
            id="sb-email"
            type="email"
            autoComplete="email"
            placeholder={t("form.emailPlaceholder")}
            className={inputBase}
            {...register("email")}
          />
        </Field>
      </div>

      <hr className="border-slate-200" />

      {/* Project type */}
      <div className="flex flex-col gap-5">
        <SectionHeading>{t("form.sections.projectType")}</SectionHeading>
        <Field id="sb-projectType" label={t("form.projectType")}>
          <textarea id="sb-projectType" rows={2} placeholder={t("form.projectTypePlaceholder")} className={textareaBase} {...register("projectType")} />
        </Field>
      </div>

      <hr className="border-slate-200" />

      {/* Problem and goals */}
      <div className="flex flex-col gap-5">
        <SectionHeading>{t("form.sections.problemAndGoals")}</SectionHeading>
        <Field id="sb-problem" label={t("form.problem")}>
          <textarea id="sb-problem" rows={2} placeholder={t("form.problemPlaceholder")} className={textareaBase} {...register("problem")} />
        </Field>
        <Field id="sb-outcome" label={t("form.outcome")}>
          <textarea id="sb-outcome" rows={2} placeholder={t("form.outcomePlaceholder")} className={textareaBase} {...register("outcome")} />
        </Field>
      </div>

      <hr className="border-slate-200" />

      {/* Users and workflows */}
      <div className="flex flex-col gap-5">
        <SectionHeading>{t("form.sections.usersAndWorkflows")}</SectionHeading>
        <Field id="sb-users" label={t("form.users")}>
          <textarea id="sb-users" rows={2} placeholder={t("form.usersPlaceholder")} className={textareaBase} {...register("users")} />
        </Field>
        <Field id="sb-currentProcess" label={t("form.currentProcess")}>
          <textarea id="sb-currentProcess" rows={2} placeholder={t("form.currentProcessPlaceholder")} className={textareaBase} {...register("currentProcess")} />
        </Field>
      </div>

      <hr className="border-slate-200" />

      {/* Existing tools and integrations */}
      <div className="flex flex-col gap-5">
        <SectionHeading>{t("form.sections.toolsAndIntegrations")}</SectionHeading>
        <Field id="sb-integrations" label={t("form.integrations")}>
          <textarea id="sb-integrations" rows={2} placeholder={t("form.integrationsPlaceholder")} className={textareaBase} {...register("integrations")} />
        </Field>
      </div>

      <hr className="border-slate-200" />

      {/* Scope, timeline and budget */}
      <div className="flex flex-col gap-5">
        <SectionHeading>{t("form.sections.scopeAndBudget")}</SectionHeading>
        <Field id="sb-mustHaveFeatures" label={t("form.mustHaveFeatures")}>
          <textarea id="sb-mustHaveFeatures" rows={2} placeholder={t("form.mustHaveFeaturesPlaceholder")} className={textareaBase} {...register("mustHaveFeatures")} />
        </Field>
        <Field id="sb-timeline" label={t("form.timeline")}>
          <textarea id="sb-timeline" rows={2} placeholder={t("form.timelinePlaceholder")} className={textareaBase} {...register("timeline")} />
        </Field>
        <Field id="sb-budget" label={t("form.budget")}>
          <textarea id="sb-budget" rows={2} placeholder={t("form.budgetPlaceholder")} className={textareaBase} {...register("budget")} />
        </Field>
      </div>

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
