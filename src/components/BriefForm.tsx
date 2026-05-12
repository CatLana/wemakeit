"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";

// Internal service codes — stable across locales (same as QuoteForm)
const SERVICE_CODES = [
  "consultation",
  "web-development",
  "app-development",
  "mobile-app",
  "idea-validation",
  "ux-research",
  "ux-design",
  "prototype",
  "accessibility-audit",
  "consultancy",
  "maintenance",
  "localisation",
  "other",
] as const;

type ServiceCode = (typeof SERVICE_CODES)[number];

const SERVICE_I18N_KEY: Record<ServiceCode, string> = {
  consultation: "consultation",
  "web-development": "webDevelopment",
  "app-development": "appDevelopment",
  "mobile-app": "mobileApp",
  "idea-validation": "ideaValidation",
  "ux-research": "uxResearch",
  "ux-design": "uxDesign",
  prototype: "prototype",
  "accessibility-audit": "accessibilityAudit",
  consultancy: "consultancy",
  maintenance: "maintenance",
  localisation: "localisation",
  other: "other",
};

type FormValues = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: ServiceCode;
  projectType: "web-app" | "mobile-app" | "website" | "e-commerce" | "redesign" | "other";
  description: string;
  budget: "under-5k" | "5k-15k" | "15k-30k" | "30k-50k" | "over-50k" | "not-sure";
  timeline: "asap" | "1-3-months" | "3-6-months" | "flexible";
  hasDesign: "yes" | "partial" | "no";
  competitorQuote?: string;
};

function makeSchema(e: (k: string) => string) {
  return z.object({
    name: z.string().min(2, e("form.errors.name")),
    email: z.string().email(e("form.errors.email")),
    company: z.string().optional(),
    phone: z.string().optional(),
    service: z.enum(SERVICE_CODES, { message: e("form.errors.service") }),
    projectType: z.enum(
      ["web-app", "mobile-app", "website", "e-commerce", "redesign", "other"],
      { message: e("form.errors.projectType") }
    ),
    description: z.string().min(10, e("form.errors.description")),
    budget: z.enum(
      ["under-5k", "5k-15k", "15k-30k", "30k-50k", "over-50k", "not-sure"],
      { message: e("form.errors.budget") }
    ),
    timeline: z.enum(["asap", "1-3-months", "3-6-months", "flexible"], {
      message: e("form.errors.timeline"),
    }),
    hasDesign: z.enum(["yes", "partial", "no"], {
      message: e("form.errors.hasDesign"),
    }),
    competitorQuote: z.string().optional(),
  });
}

function Field({
  id,
  label,
  error,
  required = false,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#1E293B]">
        {label}
        {required && (
          <span className="text-rose-500 ml-0.5" aria-hidden="true">*</span>
        )}
      </label>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-rose-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full px-4 py-3 rounded-lg border text-sm text-[#1E293B] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE]";

const selectBase =
  "w-full px-4 py-3 rounded-lg border text-sm text-[#1E293B] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE] appearance-none";

export default function BriefForm() {
  const t = useTranslations("projectBrief");
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = makeSchema((k) => t(k as Parameters<typeof t>[0]));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/project-brief", {
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

  const serviceOptions = t.raw("form.serviceOptions") as Record<string, string>;

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
        <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">{t("form.success.body")}</p>
        <button
          type="button"
          onClick={() => { reset(); setSubmitted(false); }}
          className="text-sm text-[#0E7490] hover:text-[#0891B2] underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
        >
          Submit another brief
        </button>
      </div>
    );
  }

  return (
    <form
      id="brief-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={t("form.ariaLabel")}
      className="flex flex-col gap-6"
    >
      {/* Contact details */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="bf-name" label={t("form.name")} error={errors.name?.message} required>
          <input
            id="bf-name"
            type="text"
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "bf-name-error" : undefined}
            className={`${inputBase} ${errors.name ? "border-rose-400" : "border-slate-200"}`}
            {...register("name")}
          />
        </Field>

        <Field id="bf-email" label={t("form.email")} error={errors.email?.message} required>
          <input
            id="bf-email"
            type="email"
            autoComplete="email"
            placeholder={t("form.emailPlaceholder")}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "bf-email-error" : undefined}
            className={`${inputBase} ${errors.email ? "border-rose-400" : "border-slate-200"}`}
            {...register("email")}
          />
        </Field>

        <Field id="bf-company" label={t("form.company")} error={errors.company?.message}>
          <input
            id="bf-company"
            type="text"
            autoComplete="organization"
            placeholder={t("form.companyPlaceholder")}
            className={`${inputBase} border-slate-200`}
            {...register("company")}
          />
        </Field>

        <Field id="bf-phone" label={t("form.phone")} error={errors.phone?.message}>
          <input
            id="bf-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("form.phonePlaceholder")}
            className={`${inputBase} border-slate-200`}
            {...register("phone")}
          />
        </Field>
      </div>

      <hr className="border-slate-200" />

      {/* Project details */}
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Service */}
        <Field id="bf-service" label={t("form.service")} error={errors.service?.message} required>
          <div className="relative">
            <select
              id="bf-service"
              aria-required="true"
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "bf-service-error" : undefined}
              className={`${selectBase} ${errors.service ? "border-rose-400" : "border-slate-200"}`}
              defaultValue=""
              {...register("service")}
            >
              <option value="" disabled>
                {t("form.projectTypePlaceholder")}
              </option>
              {SERVICE_CODES.map((code) => (
                <option key={code} value={code}>
                  {serviceOptions[SERVICE_I18N_KEY[code]] ?? code}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </Field>

        {/* Project type */}
        <Field id="bf-projectType" label={t("form.projectType")} error={errors.projectType?.message} required>
          <div className="relative">
            <select
              id="bf-projectType"
              aria-required="true"
              aria-invalid={!!errors.projectType}
              aria-describedby={errors.projectType ? "bf-projectType-error" : undefined}
              className={`${selectBase} ${errors.projectType ? "border-rose-400" : "border-slate-200"}`}
              defaultValue=""
              {...register("projectType")}
            >
              <option value="" disabled>{t("form.projectTypePlaceholder")}</option>
              <option value="web-app">{t("form.projectTypes.webApp")}</option>
              <option value="mobile-app">{t("form.projectTypes.mobileApp")}</option>
              <option value="website">{t("form.projectTypes.website")}</option>
              <option value="e-commerce">{t("form.projectTypes.eCommerce")}</option>
              <option value="redesign">{t("form.projectTypes.redesign")}</option>
              <option value="other">{t("form.projectTypes.other")}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </Field>
      </div>

      {/* Description */}
      <Field
        id="bf-description"
        label={t("form.description")}
        error={errors.description?.message}
        required
      >
        <textarea
          id="bf-description"
          rows={5}
          placeholder={t("form.descriptionPlaceholder")}
          aria-required="true"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "bf-description-error" : undefined}
          className={`${inputBase} resize-y min-h-[120px] ${errors.description ? "border-rose-400" : "border-slate-200"}`}
          {...register("description")}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Budget */}
        <Field id="bf-budget" label={t("form.budget")} error={errors.budget?.message} required>
          <div className="relative">
            <select
              id="bf-budget"
              aria-required="true"
              aria-invalid={!!errors.budget}
              aria-describedby={errors.budget ? "bf-budget-error" : undefined}
              className={`${selectBase} ${errors.budget ? "border-rose-400" : "border-slate-200"}`}
              defaultValue=""
              {...register("budget")}
            >
              <option value="" disabled>{t("form.budgetPlaceholder")}</option>
              <option value="under-5k">{t("form.budgetOptions.under5k")}</option>
              <option value="5k-15k">{t("form.budgetOptions.5k15k")}</option>
              <option value="15k-30k">{t("form.budgetOptions.15k30k")}</option>
              <option value="30k-50k">{t("form.budgetOptions.30k50k")}</option>
              <option value="over-50k">{t("form.budgetOptions.over50k")}</option>
              <option value="not-sure">{t("form.budgetOptions.notSure")}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </Field>

        {/* Timeline */}
        <Field id="bf-timeline" label={t("form.timeline")} error={errors.timeline?.message} required>
          <div className="relative">
            <select
              id="bf-timeline"
              aria-required="true"
              aria-invalid={!!errors.timeline}
              aria-describedby={errors.timeline ? "bf-timeline-error" : undefined}
              className={`${selectBase} ${errors.timeline ? "border-rose-400" : "border-slate-200"}`}
              defaultValue=""
              {...register("timeline")}
            >
              <option value="" disabled>{t("form.timelinePlaceholder")}</option>
              <option value="asap">{t("form.timelineOptions.asap")}</option>
              <option value="1-3-months">{t("form.timelineOptions.1to3")}</option>
              <option value="3-6-months">{t("form.timelineOptions.3to6")}</option>
              <option value="flexible">{t("form.timelineOptions.flexible")}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </Field>
      </div>

      {/* Has design */}
      <Field
        id="bf-hasDesign"
        label={t("form.hasDesign")}
        error={errors.hasDesign?.message}
        required
      >
        <div className="relative">
          <select
            id="bf-hasDesign"
            aria-required="true"
            aria-invalid={!!errors.hasDesign}
            aria-describedby={errors.hasDesign ? "bf-hasDesign-error" : undefined}
            className={`${selectBase} ${errors.hasDesign ? "border-rose-400" : "border-slate-200"}`}
            defaultValue=""
            {...register("hasDesign")}
          >
            <option value="" disabled>{t("form.hasDesignPlaceholder")}</option>
            <option value="yes">{t("form.hasDesignOptions.yes")}</option>
            <option value="partial">{t("form.hasDesignOptions.partial")}</option>
            <option value="no">{t("form.hasDesignOptions.no")}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </Field>

      {/* Competitor quote */}
      <Field
        id="bf-competitorQuote"
        label={t("form.competitorQuote")}
        error={errors.competitorQuote?.message}
      >
        <input
          id="bf-competitorQuote"
          type="text"
          placeholder={t("form.competitorPlaceholder")}
          className={`${inputBase} border-slate-200`}
          {...register("competitorQuote")}
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
