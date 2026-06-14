"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, Check } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/353838158383";

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const QUESTION_KEYS = [
  "form.business",
  "form.idealCustomer",
  "form.websiteGoal",
  "form.notWorking",
  "form.desiredAction",
  "form.triedMarketing",
  "form.competitors",
  "form.successLooksLike",
  "form.budgetTimeframe",
  "form.additionalInfo",
] as const;

export default function AudioBriefSection() {
  const t = useTranslations("brief");
  const [copied, setCopied] = useState(false);

  const questions = QUESTION_KEYS.map((key) => t(key));

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(questions.map((q, i) => `${i + 1}. ${q}`).join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access unavailable, nothing to recover from here.
    }
  }

  return (
    <section
      id="voice-note"
      aria-labelledby="voice-note-heading"
      className="scroll-mt-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#22D3EE] mb-3">
          {t("audio.eyebrow")}
        </span>
        <h2 id="voice-note-heading" className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-3">
          {t("audio.heading")}
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6 max-w-xl">{t("audio.body")}</p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-2.5 text-sm font-semibold text-[#166534] hover:bg-[#25D366]/20 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
        >
          <WhatsAppIcon />
          {t("audio.whatsappBtn")}
        </a>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="text-sm font-semibold text-[#1E293B]">{t("audio.questionsHeading")}</h3>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-[#1E293B] hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
              {copied ? t("audio.copiedBtn") : t("audio.copyBtn")}
            </button>
          </div>
          <ol className="rounded-xl border border-slate-200 bg-[#F8FAFC] divide-y divide-slate-200">
            {questions.map((question, index) => (
              <li key={index} className="flex gap-3 px-4 py-3 text-sm text-[#1E293B] leading-relaxed">
                <span className="text-slate-400 font-mono shrink-0">{index + 1}.</span>
                <span>{question}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
