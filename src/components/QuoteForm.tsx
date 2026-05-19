"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Internal service codes — stable across locales
const SERVICE_CODES = [
  "consultation",
  "quote",
  "general",
  "audit",
] as const;

export type ServiceCode = (typeof SERVICE_CODES)[number];

// Maps internal code → i18n key within "contact.form.serviceOptions"
const SERVICE_I18N_KEY: Record<ServiceCode, string> = {
  consultation: "consultation",
  quote: "quote",
  general: "general",
  audit: "audit",
};

type FormValues = {
  service: ServiceCode;
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

function makeSchema(e: (k: string) => string) {
  return z.object({
    service: z.enum(SERVICE_CODES, { message: e("form.errors.service") }),
    name: z.string().min(2, e("form.errors.name")),
    email: z.string().email(e("form.errors.email")),
    phone: z.string().optional(),
    message: z.string().optional(),
  });
}

const inputBase =
  "w-full px-4 py-3 rounded-lg border text-sm text-[#1E293B] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE]";

const selectBase =
  "w-full px-4 py-3 rounded-lg border text-sm text-[#1E293B] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE] appearance-none";

interface QuoteFormProps {
  /**
   * Pre-select a service option. When provided, URL search params will NOT
   * override this value — the service dropdown is still editable by the user.
   */
  defaultService?: ServiceCode;
}

export default function QuoteForm({ defaultService }: QuoteFormProps) {
  const t = useTranslations("contact");
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [marketingConsent, setMarketingConsent] = useState(true);

  const schema = useMemo(() => makeSchema((k) => t(k as Parameters<typeof t>[0])), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService ?? "consultation" },
  });

  useEffect(() => {
    // If a defaultService was explicitly provided, don't let URL params override it.
    if (defaultService) return;

    const svc = searchParams.get("service") as ServiceCode | null;
    if (svc && (SERVICE_CODES as readonly string[]).includes(svc)) {
      setValue("service", svc);
      return;
    }
    // Backwards-compat with old ?inquiry= param
    const inquiry = searchParams.get("inquiry");
    if (inquiry === "consultation") setValue("service", "consultation");
    if (inquiry === "general") setValue("service", "general");
  }, [searchParams, setValue, defaultService]);

  async function onSubmit(data: FormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, marketingConsent }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setServerError((json as { error?: string }).error ?? t("form.serverError"));
        return;
      }
      setSubmitted(true);
      document.getElementById("quote-form-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      setServerError(t("form.networkError"));
    }
  }

  const serviceOptions = t.raw("form.serviceOptions") as Record<string, string>;

  return (
    <div
      id="quote-form-card"
      className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-8 shadow-sm"
    >
      <h3 className="text-xl font-bold text-[#1E293B] mb-4">{t("form.heading")}</h3>

      {submitted ? (
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
            {t("form.success.title")}
          </h3>
          <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
            {t("form.success.body")}
          </p>
          <button
            type="button"
            onClick={() => { reset(); setSubmitted(false); }}
            className="text-sm text-[#0E7490] hover:text-[#0891B2] underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
          >
            {t("form.submitAnother")}
          </button>
        </div>
      ) : (
        <form
          id="quote-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label={t("form.ariaLabel")}
          className="flex flex-col gap-5"
        >
          {/* Service type */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="qf-service" className="text-sm font-medium text-[#1E293B]">
              {t("form.service")}{" "}
              <span className="text-rose-500 ml-0.5" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <select
                id="qf-service"
                aria-required="true"
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? "qf-service-error" : undefined}
                className={`${selectBase} ${errors.service ? "border-rose-400" : "border-slate-200"}`}
                {...register("service")}
              >
                {SERVICE_CODES.map((code) => (
                  <option key={code} value={code}>
                    {serviceOptions[SERVICE_I18N_KEY[code]] ?? code}
                  </option>
                ))}
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-3 flex items-center"
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
            {errors.service && (
              <p id="qf-service-error" role="alert" className="text-xs text-rose-500 font-medium">
                {errors.service.message}
              </p>
            )}
          </div>

          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="qf-name" className="text-sm font-medium text-[#1E293B]">
                {t("form.name")}{" "}
                <span className="text-rose-500 ml-0.5" aria-hidden="true">*</span>
              </label>
              <input
                id="qf-name"
                type="text"
                autoComplete="name"
                placeholder={t("form.namePlaceholder")}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "qf-name-error" : undefined}
                className={`${inputBase} ${errors.name ? "border-rose-400" : "border-slate-200"}`}
                {...register("name")}
              />
              {errors.name && (
                <p id="qf-name-error" role="alert" className="text-xs text-rose-500 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="qf-email" className="text-sm font-medium text-[#1E293B]">
                {t("form.email")}{" "}
                <span className="text-rose-500 ml-0.5" aria-hidden="true">*</span>
              </label>
              <input
                id="qf-email"
                type="email"
                autoComplete="email"
                placeholder={t("form.emailPlaceholder")}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "qf-email-error" : undefined}
                className={`${inputBase} ${errors.email ? "border-rose-400" : "border-slate-200"}`}
                {...register("email")}
              />
              {errors.email && (
                <p id="qf-email-error" role="alert" className="text-xs text-rose-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="qf-phone" className="text-sm font-medium text-[#1E293B]">
              {t("form.phone")}
            </label>
            <input
              id="qf-phone"
              type="tel"
              autoComplete="tel"
              placeholder={t("form.phonePlaceholder")}
              className={`${inputBase} border-slate-200`}
              {...register("phone")}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="qf-message" className="text-sm font-medium text-[#1E293B]">
              {t("form.message")}
            </label>
            <p className="text-xs text-slate-400">{t("form.messageHint")}</p>
            <textarea
              id="qf-message"
              rows={3}
              placeholder={t("form.messagePlaceholder")}
              className={`${inputBase} resize-y min-h-[80px] border-slate-200`}
              {...register("message")}
            />
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

          <p className="text-xs text-slate-500 leading-relaxed">
            {t("form.consentText")}{" "}
            <Link
              href="/terms-of-service"
              className="underline underline-offset-2 hover:text-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              {t("form.consentTerms")}
            </Link>
            {" "}{t("form.consentAnd")}{" "}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-2 hover:text-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              {t("form.consentPrivacy")}
            </Link>
            {t("form.consentPost")}
          </p>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-[#22D3EE] shrink-0"
            />
            <span className="text-xs text-slate-500 leading-relaxed">{t("form.marketingConsent")}</span>
          </label>
        </form>
      )}
    </div>
  );
}
