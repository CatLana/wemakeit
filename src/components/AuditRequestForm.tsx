"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  website: z.string().min(1).refine(
    (val) => {
      const normalized = /^https?:\/\//i.test(val.trim()) ? val.trim() : `https://${val.trim()}`;
      try { new URL(normalized); return true; } catch { return false; }
    },
    { message: "invalid" }
  ),
  business: z.string().min(10),
  focus: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputBase =
  "mt-1.5 w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-[#1E293B] placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30 focus:border-[#22D3EE]";
const inputError = "border-red-400 focus:ring-red-200 focus:border-red-400";
const inputOk = "border-slate-200";

export default function AuditRequestForm() {
  const t = useTranslations("auditExpert");
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  useEffect(() => {
    if (submitted) scrollToRef(successRef);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  useEffect(() => {
    if (serverError) scrollToRef(errorRef);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const website = /^https?:\/\//i.test(data.website.trim())
        ? data.website.trim()
        : `https://${data.website.trim()}`;
      const res = await fetch("/api/audit/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website, locale: "en" }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      reset();
    } catch {
      setServerError(t("serverError"));
    }
  };

  if (submitted) {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center"
      >
        <CheckCircle2
          size={40}
          className="mx-auto mb-3 text-green-500"
          aria-hidden="true"
        />
        <p className="text-base font-semibold text-green-800">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Audit request form"
      className="space-y-5"
    >
      {serverError && (
        <div ref={errorRef} role="alert" tabIndex={-1} className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">{serverError}</p>
        </div>
      )}

      {/* Name + Email side by side on md+ */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="af-name" className="block text-sm font-semibold text-[#1E293B]">
            {t("nameLabel")} <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="af-name"
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "af-name-err" : undefined}
            className={`${inputBase} ${errors.name ? inputError : inputOk}`}
            {...register("name")}
          />
          {errors.name && (
            <p id="af-name-err" role="alert" className="mt-1 text-xs text-red-600">
              {t("errors.name")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="af-email" className="block text-sm font-semibold text-[#1E293B]">
            {t("emailLabel")} <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="af-email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "af-email-err" : undefined}
            className={`${inputBase} ${errors.email ? inputError : inputOk}`}
            {...register("email")}
          />
          {errors.email && (
            <p id="af-email-err" role="alert" className="mt-1 text-xs text-red-600">
              {t("errors.email")}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="af-website" className="block text-sm font-semibold text-[#1E293B]">
          {t("websiteLabel")} <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="af-website"
          type="text"
          autoComplete="url"
          inputMode="url"
          placeholder={t("websitePlaceholder")}
          aria-invalid={!!errors.website}
          aria-describedby={errors.website ? "af-website-err" : undefined}
          className={`${inputBase} ${errors.website ? inputError : inputOk}`}
          {...register("website")}
        />
        {errors.website && (
          <p id="af-website-err" role="alert" className="mt-1 text-xs text-red-600">
            {t("errors.website")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="af-business" className="block text-sm font-semibold text-[#1E293B]">
          {t("businessLabel")} <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="af-business"
          rows={3}
          placeholder={t("businessPlaceholder")}
          aria-invalid={!!errors.business}
          aria-describedby={errors.business ? "af-business-err" : undefined}
          className={`${inputBase} resize-none ${errors.business ? inputError : inputOk}`}
          {...register("business")}
        />
        {errors.business && (
          <p id="af-business-err" role="alert" className="mt-1 text-xs text-red-600">
            {t("errors.business")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="af-focus" className="block text-sm font-semibold text-[#1E293B]">
          {t("focusLabel")}
        </label>
        <textarea
          id="af-focus"
          rows={2}
          placeholder={t("focusPlaceholder")}
          className={`${inputBase} resize-none ${inputOk}`}
          {...register("focus")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submitBtnText")}
            <ArrowRight size={16} aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400 leading-relaxed">
        By clicking &ldquo;{t("submitBtnText")}&rdquo; you agree to our{" "}
        <a
          href="/en/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-600 transition-colors"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="/en/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-600 transition-colors"
        >
          Terms of Service
        </a>
        , and consent to be contacted by email including for service updates. No commitment required.
      </p>
    </form>
  );
}
