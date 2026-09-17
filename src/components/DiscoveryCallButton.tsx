import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function DiscoveryCallButton({
  service,
  label,
  className = "",
}: {
  service: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={{ pathname: "/discovery-call", query: { service } } as never}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#0E7490]/40 bg-transparent px-4 py-2 text-sm font-semibold text-[#0E7490] transition-colors hover:border-[#22D3EE] hover:bg-[#22D3EE]/5 hover:text-[#22D3EE] focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2 ${className}`}
    >
      {label}
      <ArrowRight size={13} aria-hidden="true" />
    </Link>
  );
}
