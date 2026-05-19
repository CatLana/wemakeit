"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function AuditRequestForm() {
  const t = useTranslations("audit");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSuccessMessage(t("successMessage"));
      setFormData({ name: "", email: "", website: "", business: "", focus: "" });
    } catch (error) {
      setErrorMessage("Failed to submit your request. Please try again.");
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
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-[#1E293B] placeholder:text-slate-400 focus:border-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/20"
          placeholder="https://yourwebsite.com"
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

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#22D3EE] px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-cyan-300 disabled:bg-slate-300 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
      >
        {isLoading ? "Submitting..." : t("submitBtnText")}
        {!isLoading && <ArrowRight size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}
