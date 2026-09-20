"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Info } from "lucide-react";

export default function InfoTooltip({
  text,
  label = "More information",
  align = "right",
}: {
  text: string;
  label?: string;
  /** Which edge of the icon the bubble hangs from. Use "left" when the icon
   * sits near the left of its row, so the bubble opens toward free space
   * instead of off the edge of the viewport. */
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  return (
    <div ref={wrapRef} className="relative shrink-0 inline-flex">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-slate-400 hover:border-[#22D3EE] hover:text-[#0E7490] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
      >
        <Info size={12} aria-hidden="true" />
      </button>
      {open && (
        <div
          role="tooltip"
          className={`absolute ${align === "left" ? "left-0" : "right-0"} top-full mt-2 w-56 rounded-lg bg-[#0F172A] text-white text-xs leading-relaxed p-3 shadow-xl z-20`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
