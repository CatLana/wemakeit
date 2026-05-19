"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function AuditRequestForm() {
  const t = useTranslations("audit");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    business: "",
    focus: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/audit/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, marketingConsent }),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? "Failed to submit form");
      }

      setSuccessMessage(t("successMessage"));
      setFormData({ name: "", email: "", website: "", business: "", focus: "" });
      setConsent(true);
      setMarketingConsent(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit your request. Please try again."
      );
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="audit-request-form" className="space-y-5">
      {successMessage && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-medium text-green-800">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">{errorMessage}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="audit-name"
          className="block text-sm font-semibold text-[#1E293B]"
        >
          {t("nameLabel")}
        </label>
        <input
          id="audit-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-[#1E293B] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label
          htmlFor="audit-email"
          className="block text-sm font-semibold text-[#1E293B]"
        >
          {t("emailLabel")}
        </label>
        <input
          id="audit-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-[#1E293B] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="audit-website"
          className="block text-sm font-semibold text-[#1E293B]"
        >
          {t("websiteLabel")}
        </label>
        <input
          id="audit-website"
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-[#1E293B] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20"
          placeholder="yourwebsite.ie or www.yourwebsite.ie"
        />
      </div>

      <div>
        <label
          htmlFor="audit-business"
          className="block text-sm font-semibold text-[#1E293B]"
        >
          {t("businessLabel")}
        </label>
        <textarea
          id="audit-business"
          name="business"
          value={formData.business}
          onChange={handleChange}
          required
          rows={3}
          className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-[#1E293B] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20"
          placeholder="Tell us briefly about what your business does..."
        />
      </div>

      <div>
        <label
          htmlFor="audit-focus"
          className="block text-sm font-semibold text-[#1E293B]"
        >
          {t("focusLabel")}
        </label>
        <textarea
          id="audit-focus"
          name="focus"
          value={formData.focus}
          onChange={handleChange}
          rows={2}
          className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-[#1E293B] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20"
          placeholder={t("focusPlaceholder")}
        />
      </div>

      {/* Consent */}
      <div className="space-y-3 pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            aria-required="true"
            className="mt-0.5 w-4 h-4 rounded accent-[#22D3EE] shrink-0"
          />
          <span className="text-xs text-slate-500 leading-relaxed">
            I agree to the processing of my personal data in accordance with the{" "}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-2 hover:text-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link
              href="/terms-of-service"
              className="underline underline-offset-2 hover:text-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
            >
              Terms of Service
            </Link>
            .{" "}<span className="text-rose-500" aria-hidden="true">*</span>
          </span>
        </label>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-[#22D3EE] shrink-0"
          />
          <span className="text-xs text-slate-500 leading-relaxed">
            I&apos;d like to receive tips, updates, and relevant offers from We Make IT.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !consent}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 disabled:bg-slate-300 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
      >
        {isLoading ? "Submitting..." : t("submitBtnText")}
        {!isLoading && <ArrowRight size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}
