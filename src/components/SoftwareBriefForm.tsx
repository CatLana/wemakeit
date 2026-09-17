"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Field, inputBase, textareaBase } from "@/components/BriefFormFields";
import AuditBriefSuccess from "@/components/AuditBriefSuccess";

type FormValues = {
  name?: string;
  email?: string;
  projectType?: string;
  problem?: string;
  users?: string;
  mustHaveFeatures?: string;
  budget: string;
};

function makeSchema(e: (key: string) => string) {
  return z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    projectType: z.string().optional(),
    problem: z.string().optional(),
    users: z.string().optional(),
    mustHaveFeatures: z.string().optional(),
    budget: z.string().min(1, e("form.errors.budget")),
  });
}

export default function SoftwareBriefForm() {
  const t = useTranslations("softwareBrief");
  const isAuditContext = useSearchParams().get("context") === "audit";
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const schema = useMemo(() => makeSchema((key) => t(key as Parameters<typeof t>[0])), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

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
    if (isAuditContext) return <AuditBriefSuccess successRef={successRef} />;
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

      <Field id="sb-projectType" label={t("form.projectType")}>
        <textarea id="sb-projectType" rows={2} placeholder={t("form.projectTypePlaceholder")} className={textareaBase} {...register("projectType")} />
      </Field>

      <Field id="sb-problem" label={t("form.problem")}>
        <textarea id="sb-problem" rows={2} placeholder={t("form.problemPlaceholder")} className={textareaBase} {...register("problem")} />
      </Field>

      <Field id="sb-users" label={t("form.users")}>
        <textarea id="sb-users" rows={2} placeholder={t("form.usersPlaceholder")} className={textareaBase} {...register("users")} />
      </Field>

      <Field id="sb-mustHaveFeatures" label={t("form.mustHaveFeatures")}>
        <textarea id="sb-mustHaveFeatures" rows={2} placeholder={t("form.mustHaveFeaturesPlaceholder")} className={textareaBase} {...register("mustHaveFeatures")} />
      </Field>

      <Field id="sb-budget" label={t("form.budget")} required error={errors.budget?.message}>
        <textarea
          id="sb-budget"
          rows={2}
          placeholder={t("form.budgetPlaceholder")}
          aria-required="true"
          aria-invalid={!!errors.budget}
          aria-describedby={errors.budget ? "sb-budget-error" : undefined}
          className={`${textareaBase} ${errors.budget ? "border-rose-400" : "border-slate-200"}`}
          {...register("budget")}
        />
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
