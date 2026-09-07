import { Link } from "@/i18n/navigation";
import type { AuditTier } from "@/lib/audit-pricing";

export default function AuditBuyForm({
  tier,
  promo,
  buyLabel,
  agreeLabel,
  termsLinkLabel,
  deliveryNotice,
  buttonClassName,
}: {
  tier: AuditTier;
  promo?: string;
  buyLabel: string;
  agreeLabel: string;
  termsLinkLabel: string;
  deliveryNotice: string;
  buttonClassName: string;
}) {
  return (
    <form action="/api/stripe/checkout" method="POST" className="flex flex-col gap-3">
      <input type="hidden" name="tier" value={tier} />
      {promo && <input type="hidden" name="promo" value={promo} />}
      <p className="text-xs text-slate-500 leading-relaxed">{deliveryNotice}</p>
      <label className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
        <input
          type="checkbox"
          name="agreed"
          required
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0E7490] focus-visible:outline-2 focus-visible:outline-[#22D3EE] focus-visible:outline-offset-2"
        />
        <span>
          {agreeLabel}{" "}
          <Link
            href="/terms-of-service#audit-terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#0E7490] hover:text-[#22D3EE]"
          >
            {termsLinkLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </Link>
        </span>
      </label>
      <button type="submit" className={buttonClassName}>
        {buyLabel}
      </button>
    </form>
  );
}
