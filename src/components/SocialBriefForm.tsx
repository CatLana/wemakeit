"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Field, SectionHeading, inputBase, textareaBase } from "@/components/BriefFormFields";

type FormValues = {
  name?: string;
  email?: string;
  topServices?: string;
  growthGoal?: string;
  idealClient?: string;
  differentiator?: string;
  contentDislikes?: string;
  accountsAdmired?: string;
  desiredTone?: string;
  filmingOnSite?: string;
  beforeAfterComfort?: string;
  onCamera?: string;
  brandAssets?: string;
  approver?: string;
  budgetRange?: string;
};

export default function SocialBriefForm() {
  const t = useTranslations("socialBrief");
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
      const res = await fetch("/api/brief/social", {
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
        <Field id="smb-name" label={t("form.name")}>
          <input
            id="smb-name"
            type="text"
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            className={inputBase}
            {...register("name")}
          />
        </Field>

        <Field id="smb-email" label={t("form.email")} hint={t("form.emailHint")}>
          <input
            id="smb-email"
            type="email"
            autoComplete="email"
            placeholder={t("form.emailPlaceholder")}
            className={inputBase}
            {...register("email")}
          />
        </Field>
      </div>

      <hr className="border-slate-200" />

      {/* About the business */}
      <div className="flex flex-col gap-5">
        <SectionHeading>{t("form.sections.aboutBusiness")}</SectionHeading>
        <Field id="smb-topServices" label={t("form.topServices")}>
          <textarea id="smb-topServices" rows={2} placeholder={t("form.topServicesPlaceholder")} className={textareaBase} {...register("topServices")} />
        </Field>
        <Field id="smb-growthGoal" label={t("form.growthGoal")}>
          <textarea id="smb-growthGoal" rows={2} placeholder={t("form.growthGoalPlaceholder")} className={textareaBase} {...register("growthGoal")} />
        </Field>
        <Field id="smb-idealClient" label={t("form.idealClient")}>
          <textarea id="smb-idealClient" rows={2} placeholder={t("form.idealClientPlaceholder")} className={textareaBase} {...register("idealClient")} />
        </Field>
        <Field id="smb-differentiator" label={t("form.differentiator")}>
          <textarea id="smb-differentiator" rows={2} placeholder={t("form.differentiatorPlaceholder")} className={textareaBase} {...register("differentiator")} />
        </Field>
      </div>

      <hr className="border-slate-200" />

      {/* About current Instagram */}
      <div className="flex flex-col gap-5">
        <SectionHeading>{t("form.sections.aboutInstagram")}</SectionHeading>
        <Field id="smb-contentDislikes" label={t("form.contentDislikes")}>
          <textarea id="smb-contentDislikes" rows={2} placeholder={t("form.contentDislikesPlaceholder")} className={textareaBase} {...register("contentDislikes")} />
        </Field>
        <Field id="smb-accountsAdmired" label={t("form.accountsAdmired")}>
          <textarea id="smb-accountsAdmired" rows={2} placeholder={t("form.accountsAdmiredPlaceholder")} className={textareaBase} {...register("accountsAdmired")} />
        </Field>
        <Field id="smb-desiredTone" label={t("form.desiredTone")}>
          <textarea id="smb-desiredTone" rows={2} placeholder={t("form.desiredTonePlaceholder")} className={textareaBase} {...register("desiredTone")} />
        </Field>
      </div>

      <hr className="border-slate-200" />

      {/* About content */}
      <div className="flex flex-col gap-5">
        <SectionHeading>{t("form.sections.aboutContent")}</SectionHeading>
        <Field id="smb-filmingOnSite" label={t("form.filmingOnSite")}>
          <textarea id="smb-filmingOnSite" rows={2} placeholder={t("form.filmingOnSitePlaceholder")} className={textareaBase} {...register("filmingOnSite")} />
        </Field>
        <Field id="smb-beforeAfterComfort" label={t("form.beforeAfterComfort")}>
          <textarea id="smb-beforeAfterComfort" rows={2} placeholder={t("form.beforeAfterComfortPlaceholder")} className={textareaBase} {...register("beforeAfterComfort")} />
        </Field>
        <Field id="smb-onCamera" label={t("form.onCamera")}>
          <textarea id="smb-onCamera" rows={2} placeholder={t("form.onCameraPlaceholder")} className={textareaBase} {...register("onCamera")} />
        </Field>
        <Field id="smb-brandAssets" label={t("form.brandAssets")}>
          <textarea id="smb-brandAssets" rows={2} placeholder={t("form.brandAssetsPlaceholder")} className={textareaBase} {...register("brandAssets")} />
        </Field>
      </div>

      <hr className="border-slate-200" />

      {/* Logistics */}
      <div className="flex flex-col gap-5">
        <SectionHeading>{t("form.sections.logistics")}</SectionHeading>
        <Field id="smb-approver" label={t("form.approver")}>
          <textarea id="smb-approver" rows={2} placeholder={t("form.approverPlaceholder")} className={textareaBase} {...register("approver")} />
        </Field>
        <Field id="smb-budgetRange" label={t("form.budgetRange")}>
          <textarea id="smb-budgetRange" rows={2} placeholder={t("form.budgetRangePlaceholder")} className={textareaBase} {...register("budgetRange")} />
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
