import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { RefObject } from "react";

export default function AuditBriefSuccess({
  successRef,
}: {
  successRef: RefObject<HTMLDivElement | null>;
}) {
  const t = useTranslations("auditBriefSuccess");

  return (
    <div
      ref={successRef}
      role="status"
      aria-live="polite"
      tabIndex={-1}
      className="py-16 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-[#22D3EE]/15 flex items-center justify-center mb-5 mx-auto">
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
      <p className="text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-2">
        {t("title")}
      </p>
      <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8">{t("body")}</p>

      <div className="rounded-2xl border-2 border-[#22D3EE] bg-[#F0FDFF] p-6 max-w-sm mx-auto text-left">
        <h3 className="font-bold text-[#1E293B] mb-2">{t("bookHeading")}</h3>
        <p className="text-sm text-slate-600 mb-4">{t("bookBody")}</p>
        <Link
          href="/discovery-call"
          className="w-full inline-flex items-center justify-center gap-2 min-h-[50px] px-6 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
        >
          {t("bookCta")}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
