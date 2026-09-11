import { getTranslations } from "next-intl/server";
import { Video, Clock, ArrowRight, Mail, FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";
import StepBadge from "@/components/StepBadge";
import ConsultationForm from "@/components/ConsultationForm";
import ConsultationBuyForm from "@/components/ConsultationBuyForm";
import { CONSULTATION_BOOKING_URL } from "@/lib/consultation-booking";

const WHATSAPP_URL = "https://wa.me/353838158383";
const EMAIL = "info@wemakeit.ie";

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default async function BookingEmbed({ locale, service }: { locale: string; service?: string }) {
  const t = await getTranslations({ locale, namespace: "book" });

  return (
    <div className="flex flex-col gap-6">
      {/* Step 1: lead-capture form */}
      <ConsultationForm
        variant="technicalConsultation"
        serviceName={service ?? "Technical consultation (book page)"}
        stepNumber={1}
        stepLabel={t("step1Label")}
      />

      {/* Step 2: choose your offer */}
      <div id="consultation" className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col gap-5">
        <StepBadge number={2} label={t("step2Label")} />

        <span className="inline-flex items-center gap-1.5 self-start rounded-full border bg-[#0F172A] border-[#22D3EE]/40 text-[#22D3EE] px-3 py-1 text-xs font-semibold">
          <Video size={15} aria-hidden="true" />
          {t("offersHeading")}
        </span>

        <p className="text-sm text-slate-600 leading-relaxed">
          {t("offersSubheading")}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Free offer */}
          <div className="rounded-xl border border-slate-200 p-5 flex flex-col gap-3">
            <span className="self-start rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-bold">
              {t("freeOffer.badge")}
            </span>
            <h3 className="text-base font-bold text-[#1E293B]">{t("freeOffer.heading")}</h3>
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={13} aria-hidden="true" />
              {t("freeOffer.duration")}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed flex-1">
              {t("freeOffer.description")}
            </p>
            <a
              href={CONSULTATION_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1E293B] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
            >
              {t("freeOffer.cta")}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>

          {/* Paid offer */}
          <div className="rounded-xl border-2 border-[#22D3EE] p-5 flex flex-col gap-3">
            <span className="self-start rounded-full bg-[#22D3EE]/15 text-[#0E7490] px-2.5 py-0.5 text-xs font-bold">
              {t("paidOffer.badge")}
            </span>
            <h3 className="text-base font-bold text-[#1E293B]">{t("paidOffer.heading")}</h3>
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={13} aria-hidden="true" />
              {t("paidOffer.duration")}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed flex-1">
              {t("paidOffer.description")}
            </p>
            <ConsultationBuyForm
              buyLabel={t("paidOffer.cta")}
              agreeLabel={t("paidOffer.agreeLabel")}
              termsLinkLabel={t("paidOffer.termsLinkLabel")}
              buttonClassName="inline-flex items-center justify-center gap-2 rounded-lg bg-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-cyan-300 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            />
          </div>
        </div>
      </div>

      {/* Step 3: pre-meeting brief */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col gap-4">
        <StepBadge number={3} label={t("step3Label")} />

        <h2 className="text-lg font-bold text-[#1E293B]">{t("briefHeading")}</h2>

        <p className="text-sm text-slate-600 leading-relaxed">
          {t("briefBody")}
        </p>

        <Link
          href="/brief"
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1E293B] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
        >
          <FileText size={15} aria-hidden="true" />
          {t("briefBtn")}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>

      {/* Secondary: direct contact for in-person or questions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold text-[#1E293B]">{t("contactHeading")}</p>
          <p className="mt-1 text-sm text-slate-500">{t("contactBody")}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2 text-sm font-semibold text-[#166534] hover:bg-[#25D366]/20 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
          >
            <WhatsAppIcon />
            {t("contactWhatsapp")}
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-[#1E293B] hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
          >
            <Mail size={15} aria-hidden="true" />
            {t("contactEmail")}
          </a>
        </div>
      </div>
    </div>
  );
}
