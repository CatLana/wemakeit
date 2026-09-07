"use client";

import { useEffect, useState } from "react";

function getRemaining(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
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
    const id = setInterval(() => setRemaining(getRemaining(endsAt)), 60_000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (!remaining) return null;

  return (
    <p className="text-sm font-semibold text-[#0E7490]" role="status">
      {label} {remaining.days}d {remaining.hours}h {remaining.minutes}m
    </p>
  );
}
