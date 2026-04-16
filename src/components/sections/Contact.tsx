"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageSquare, MapPin, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Type is stable across locales since enum values are internal codes
type FormValues = {
  enquiryType: "business-idea-consultation" | "general-query";
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: "web-app" | "mobile-app" | "website" | "e-commerce" | "redesign" | "other";
  description: string;
  budget: "under-5k" | "5k-15k" | "15k-30k" | "30k-50k" | "over-50k" | "not-sure";
  timeline: "asap" | "1-3-months" | "3-6-months" | "flexible";
  hasDesign: "yes" | "partial" | "no";
  competitorQuote?: string;
};

function makeSchema(e: (k: string) => string) {
  return z.object({
    enquiryType: z.enum(
      ["business-idea-consultation", "general-query"],
      { message: e("form.errors.enquiryType") }
    ),
    name: z.string().min(2, e("form.errors.name")),
    email: z.string().email(e("form.errors.email")),
    company: z.string().optional(),
    phone: z.string().optional(),
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
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#1E293B]">
        {label}
        {required && (
          <span className="text-rose-500 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-rose-500 font-medium"
        >
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

import { scrollToAndFocus } from "@/lib/scrollToAndFocus";
export function focusContactForm() {
  scrollToAndFocus("contact-form", "name");
}

export default function Contact() {
  const t = useTranslations("contact");
  const searchParams = useSearchParams();
  const [submittedType, setSubmittedType] = useState<FormValues["enquiryType"] | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = useMemo(() => makeSchema((k) => t(k as Parameters<typeof t>[0])), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { enquiryType: "business-idea-consultation" },
  });

  useEffect(() => {
    const inquiry = searchParams.get("inquiry");
    const map: Record<string, FormValues["enquiryType"]> = {
      consultation: "business-idea-consultation",
      general: "general-query",
    };
    if (inquiry && map[inquiry]) {
      setValue("enquiryType", map[inquiry]);
    }
  }, [searchParams, setValue]);

  async function onSubmit(data: FormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError((json as { error?: string }).error ?? t("form.serverError"));
        return;
      }
      setSubmittedType(data.enquiryType);
      document.getElementById("contact-form-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      setServerError(t("form.networkError"));
    }
  }

  return (
    <section
      id="quote"
      aria-labelledby="contact-heading"
      className="bg-[#F8FAFC] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left — copy + contact details */}
          <div className="lg:col-span-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">
              {t("eyebrow")}
            </span>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-6"
            >
              {t("heading")}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8 text-lg">
              {t("body")}
            </p>

            <div className="hidden lg:block mt-8">
            <address className="not-italic space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <MapPin size={18} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">{t("officeLabel")}</p>
                  <p className="text-sm text-slate-500">{t("officeLocation")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <MessageSquare size={18} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">{t("contactLink")}</p>
                  <Link
                    href="/contact"
                    className="text-sm text-[#0E7490] hover:text-[#0891B2] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    {t("contactLinkText")}
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <Linkedin size={18} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">{t("linkedinLabel")}</p>
                  <a
                    href="https://www.linkedin.com/in/svetlana-savchenko-08868764"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Svetlana Savchenko on LinkedIn — ${t("linkedinNewTab")}`}
                    className="text-sm text-[#0E7490] hover:text-[#0891B2] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    Svetlana Savchenko on LinkedIn
                  </a>
                </div>
              </div>
            </address>
            </div>
          </div>

          {/* Right — quote form */}
          <div id="contact-form-card" className="lg:col-span-3 rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
            {submittedType !== null ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-center justify-center h-full text-center py-16"
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
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">
                  {submittedType === "business-idea-consultation"
                    ? t("form.success.consultationTitle")
                    : t("form.success.generalTitle")}
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  {submittedType === "business-idea-consultation"
                    ? t("form.success.consultationBody")
                    : t("form.success.generalBody")}
                </p>
                <button
                  type="button"
                  onClick={() => { reset(); setSubmittedType(null); }}
                  className="text-sm text-[#0E7490] hover:text-[#0891B2] underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                >
                  {t("form.submitAnother")}
                </button>
              </div>
            ) : (
              <form
                id="contact-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Quote request form"
                className="flex flex-col gap-5"
              >
                <p className="text-xs text-slate-500">
                  {t("form.requiredNote")}{" "}
                  <span aria-hidden="true" className="text-rose-500">*</span>
                  <span className="sr-only">{t("form.requiredSr")}</span>{" "}
                  {t("form.requiredSuffix")}
                </p>

                {/* Enquiry type */}
                <Field
                  id="enquiryType"
                  label={t("form.enquiryType")}
                  error={errors.enquiryType?.message}
                  required
                >
                  <select
                    id="enquiryType"
                    aria-required="true"
                    aria-describedby={errors.enquiryType ? "enquiryType-error" : undefined}
                    aria-invalid={!!errors.enquiryType}
                    className={`${selectBase} ${errors.enquiryType ? "border-rose-400" : "border-slate-200"}`}
                    {...register("enquiryType")}
                  >
                    <option value="business-idea-consultation">{t("form.enquiryOptions.consultation")}</option>
                    <option value="general-query">{t("form.enquiryOptions.general")}</option>
                  </select>
                </Field>

                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="name" label={t("form.name")} error={errors.name?.message} required>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t("form.namePlaceholder")}
                      aria-required="true"
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={!!errors.name}
                      className={`${inputBase} ${errors.name ? "border-rose-400" : "border-slate-200"}`}
                      {...register("name")}
                    />
                  </Field>

                  <Field id="email" label={t("form.email")} error={errors.email?.message} required>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t("form.emailPlaceholder")}
                      aria-required="true"
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={!!errors.email}
                      className={`${inputBase} ${errors.email ? "border-rose-400" : "border-slate-200"}`}
                      {...register("email")}
                    />
                  </Field>

                  <Field id="company" label={t("form.company")} error={errors.company?.message}>
                    <input
                      id="company"
                      type="text"
                      autoComplete="organization"
                      placeholder={t("form.companyPlaceholder")}
                      className={`${inputBase} border-slate-200`}
                      {...register("company")}
                    />
                  </Field>

                  <Field id="phone" label={t("form.phone")} error={errors.phone?.message}>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={t("form.phonePlaceholder")}
                      className={`${inputBase} border-slate-200`}
                      {...register("phone")}
                    />
                  </Field>
                </div>

                {/* Project type */}
                <Field id="projectType" label={t("form.projectType")} error={errors.projectType?.message} required>
                  <select
                    id="projectType"
                    aria-required="true"
                    aria-describedby={errors.projectType ? "projectType-error" : undefined}
                    aria-invalid={!!errors.projectType}
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
                </Field>

                {/* Project description */}
                <Field id="description" label={t("form.description")} error={errors.description?.message} required>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder={t("form.descriptionPlaceholder")}
                    aria-required="true"
                    aria-describedby={errors.description ? "description-error" : undefined}
                    aria-invalid={!!errors.description}
                    className={`${inputBase} resize-y min-h-[100px] ${errors.description ? "border-rose-400" : "border-slate-200"}`}
                    {...register("description")}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Budget */}
                  <Field id="budget" label={t("form.budget")} error={errors.budget?.message} required>
                    <select
                      id="budget"
                      aria-required="true"
                      aria-describedby={errors.budget ? "budget-error" : undefined}
                      aria-invalid={!!errors.budget}
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
                  </Field>

                  {/* Timeline */}
                  <Field id="timeline" label={t("form.timeline")} error={errors.timeline?.message} required>
                    <select
                      id="timeline"
                      aria-required="true"
                      aria-describedby={errors.timeline ? "timeline-error" : undefined}
                      aria-invalid={!!errors.timeline}
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
                  </Field>
                </div>

                {/* Do you have a design? */}
                <Field id="hasDesign" label={t("form.hasDesign")} error={errors.hasDesign?.message} required>
                  <select
                    id="hasDesign"
                    aria-required="true"
                    aria-describedby={errors.hasDesign ? "hasDesign-error" : undefined}
                    aria-invalid={!!errors.hasDesign}
                    className={`${selectBase} ${errors.hasDesign ? "border-rose-400" : "border-slate-200"}`}
                    defaultValue=""
                    {...register("hasDesign")}
                  >
                    <option value="" disabled>{t("form.hasDesignPlaceholder")}</option>
                    <option value="yes">{t("form.hasDesignOptions.yes")}</option>
                    <option value="partial">{t("form.hasDesignOptions.partial")}</option>
                    <option value="no">{t("form.hasDesignOptions.no")}</option>
                  </select>
                </Field>

                {/* Competitor quote */}
                <Field id="competitorQuote" label={t("form.competitorQuote")} error={errors.competitorQuote?.message}>
                  <input
                    id="competitorQuote"
                    type="text"
                    placeholder={t("form.competitorPlaceholder")}
                    className={`${inputBase} border-slate-200`}
                    {...register("competitorQuote")}
                  />
                </Field>

                {serverError && (
                  <p role="alert" className="text-sm text-rose-600 font-medium rounded-lg bg-rose-50 border border-rose-200 px-4 py-3">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="mt-1 inline-flex items-center justify-center min-h-[52px] px-8 bg-[#22D3EE] text-[#0F172A] font-bold rounded-xl hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-base focus-visible:outline-2 focus-visible:outline-[#0F172A] focus-visible:outline-offset-2"
                >
                  {isSubmitting ? t("form.submitting") : t("form.submit")}
                </button>
              </form>
            )}
          </div>

          {/* Mobile-only address — shown below form */}
          <div className="lg:hidden">
            <address className="not-italic space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <MapPin size={18} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">{t("officeLabel")}</p>
                  <p className="text-sm text-slate-500">{t("officeLocation")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <MessageSquare size={18} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">{t("contactLink")}</p>
                  <Link href="/contact" className="text-sm text-[#0E7490] hover:text-[#0891B2] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded">
                    {t("contactLinkText")}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                  <Linkedin size={18} className="text-[#22D3EE]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">{t("linkedinLabel")}</p>
                  <a
                    href="https://www.linkedin.com/in/svetlana-savchenko-08868764"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Svetlana Savchenko on LinkedIn — ${t("linkedinNewTab")}`}
                    className="text-sm text-[#0E7490] hover:text-[#0891B2] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
                  >
                    Svetlana Savchenko on LinkedIn
                  </a>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
