"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AuditTier } from "@/lib/audit-pricing";

type FormValues = {
  name: string;
  email: string;
  tier: "website" | "bundle";
  message?: string;
  agreed: true;
};

function makeSchema(e: (key: string) => string) {
  return z.object({
    name: z.string().min(2, e("form.errors.name")),
    email: z.string().email(e("form.errors.email")),
    tier: z.enum(["website", "bundle"]),
    message: z.string().optional(),
    agreed: z.literal(true, { message: e("form.errors.agreed") }),
  });
}

const inputBase =
  "w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-[#1E293B] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE]";

export default function AuditAltPaymentForm({ defaultTier }: { defaultTier: AuditTier }) {
  const t = useTranslations("auditPage.altPayment");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = useMemo(() => makeSchema((key) => t(key as Parameters<typeof t>[0])), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { tier: defaultTier },
  });

  async function onSubmit(data: FormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/audit/alt-payment", {
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

  return (
    <div className="mt-6 text-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-sm text-slate-400 underline underline-offset-2 hover:text-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
      >
        {t("toggleLabel")}
      </button>

      {open && (
        <div className="mt-4 rounded-2xl bg-white p-6 text-left max-w-md mx-auto">
          {submitted ? (
            <div role="status" aria-live="polite" className="text-center py-2">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 size={30} className="text-emerald-600" aria-hidden="true" strokeWidth={2.5} />
              </div>
              <p className="font-bold text-[#1E293B] mb-1">{t("form.success.title")}</p>
              <p className="text-sm text-slate-500 mb-5">{t("form.success.body")}</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E7490] hover:text-[#22D3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                {t("form.success.backCta")}
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-base font-bold text-[#1E293B] mb-1">{t("heading")}</h3>
              <p className="text-sm text-slate-500 mb-5">{t("body")}</p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label={t("form.ariaLabel")}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ap-tier" className="text-sm font-medium text-[#1E293B]">
                    {t("form.tier")}
                  </label>
                  <select id="ap-tier" className={inputBase} {...register("tier")}>
                    <option value="website">{t("form.tierWebsite")}</option>
                    <option value="bundle">{t("form.tierBundle")}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ap-name" className="text-sm font-medium text-[#1E293B]">
                    {t("form.name")}
                  </label>
                  <input
                    id="ap-name"
                    type="text"
                    autoComplete="name"
                    placeholder={t("form.namePlaceholder")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "ap-name-error" : undefined}
                    className={`${inputBase} ${errors.name ? "border-rose-400" : "border-slate-200"}`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p id="ap-name-error" role="alert" className="text-xs text-rose-500 font-medium">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ap-email" className="text-sm font-medium text-[#1E293B]">
                    {t("form.email")}
                  </label>
                  <input
                    id="ap-email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("form.emailPlaceholder")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "ap-email-error" : undefined}
                    className={`${inputBase} ${errors.email ? "border-rose-400" : "border-slate-200"}`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="ap-email-error" role="alert" className="text-xs text-rose-500 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ap-message" className="text-sm font-medium text-[#1E293B]">
                    {t("form.message")}
                  </label>
                  <textarea
                    id="ap-message"
                    rows={2}
                    placeholder={t("form.messagePlaceholder")}
                    className={`${inputBase} resize-y min-h-[60px]`}
                    {...register("message")}
                  />
                </div>

                <div>
                  <label className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
                    <input
                      type="checkbox"
                      aria-invalid={!!errors.agreed}
                      aria-describedby={errors.agreed ? "ap-agreed-error" : undefined}
                      className={`mt-0.5 h-4 w-4 rounded text-[#0E7490] focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 ${errors.agreed ? "border-rose-400" : "border-slate-300"}`}
                      {...register("agreed")}
                    />
                    <span>
                      {t("form.agreeLabel")}{" "}
                      <Link
                        href="/terms-of-service#audit-terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[#0E7490] hover:text-[#22D3EE]"
                      >
                        {t("form.termsLinkLabel")}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </Link>
                    </span>
                  </label>
                  {errors.agreed && (
                    <p id="ap-agreed-error" role="alert" className="mt-1.5 text-xs text-rose-500 font-medium">
                      {errors.agreed.message}
                    </p>
                  )}
                </div>

                {serverError && (
                  <p role="alert" className="text-sm text-rose-600 font-medium rounded-lg bg-rose-50 border border-rose-200 px-4 py-3">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="inline-flex items-center justify-center min-h-[46px] px-6 bg-[#0F172A] text-white font-semibold rounded-lg hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
                >
                  {isSubmitting ? t("form.submitting") : t("form.submit")}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
