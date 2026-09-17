"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function getRemaining(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function LaunchCountdown({
  endsAt,
  label,
}: {
  endsAt: string;
  label: string;
}) {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining>>(() =>
    getRemaining(endsAt)
  );

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(endsAt)), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (!remaining) return null;

  const units = [
    { value: remaining.days, unitLabel: "days" },
    { value: remaining.hours, unitLabel: "hrs" },
    { value: remaining.minutes, unitLabel: "min" },
    { value: remaining.seconds, unitLabel: "sec" },
  ];

  return (
    <div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-[#22D3EE]/40 bg-[#22D3EE]/10 px-6 py-4 sm:px-8 sm:py-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#22D3EE]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE] motion-safe:animate-pulse" aria-hidden="true" />
        <Clock size={13} aria-hidden="true" />
        {label}
      </p>
      <div className="flex items-center gap-1.5 sm:gap-2.5" aria-hidden="true">
        {units.map((unit, i) => (
          <div key={unit.unitLabel} className="flex items-center gap-1.5 sm:gap-2.5">
            <div className="flex flex-col items-center">
              <span className="min-w-[2ch] text-2xl sm:text-4xl font-extrabold text-white tabular-nums leading-none">
                {pad(unit.value)}
              </span>
              <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {unit.unitLabel}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="pb-4 text-xl sm:text-3xl font-extrabold text-[#22D3EE]/50">:</span>
            )}
          </div>
        ))}
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {label} {remaining.days} days {remaining.hours} hours {remaining.minutes} minutes
      </span>
    </div>
  );
}
