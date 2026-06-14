import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function BackLink({
  href,
  children,
}: {
  href: "/book" | "/brief";
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6 focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 rounded"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      {children}
    </Link>
  );
}

export function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#1E293B]">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-widest text-[#0E7490]">
      {children}
    </h3>
  );
}

export const inputBase =
  "w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-[#1E293B] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-[#22D3EE]";

export const textareaBase = `${inputBase} resize-y min-h-[88px]`;
