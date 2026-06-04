import { getTranslations } from "next-intl/server";
import { Video, Clock, ArrowRight, MapPin } from "lucide-react";

// Paste your Proton Calendar booking page link here.
// In Proton Calendar: open your booking page → Share → copy the link.
const BOOKING_URL = "https://calendar.proton.me/bookings#4LyanwXZ6I-nReLtfXpsB6eUdIQ3v-BlDCdI2vq7G_U=";

export default async function BookingEmbed({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "book" });

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col gap-5">
        <span className="inline-flex items-center gap-1.5 self-start rounded-full border bg-[#22D3EE]/10 border-[#22D3EE]/30 text-[#22D3EE] px-3 py-1 text-xs font-semibold">
          <Video size={15} aria-hidden="true" />
          {t("onlineBadge")}
        </span>

        <div>
          <h2 className="text-lg font-bold text-[#1E293B]">{t("onlineLabel")}</h2>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
            <Clock size={13} aria-hidden="true" />
            {t("onlineDuration")}
          </p>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          {t("onlineDescription")}
        </p>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1E293B] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
        >
          {t("bookBtn")}
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>

      <p className="flex items-start gap-2 text-sm text-slate-500">
        <MapPin size={15} className="shrink-0 mt-0.5 text-slate-400" aria-hidden="true" />
        {t("inpersonNote")}
      </p>
    </div>
  );
}
