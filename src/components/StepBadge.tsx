export default function StepBadge({ number, label }: { number: number; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-[#22D3EE] text-xs font-bold"
        aria-hidden="true"
      >
        {number}
      </span>
      <span className="text-xs font-semibold uppercase tracking-widest text-[#0E7490]">
        {label}
      </span>
    </div>
  );
}
