// 30-day launch window. Confirm/adjust this date to match the actual deploy date.
export const AUDIT_LAUNCH_ENDS_AT = "2026-10-01T00:00:00.000Z";

export const AUDIT_PRICES = {
  launch: { website: 80, bundle: 120 },
  standard: { website: 100, bundle: 150 },
} as const;

export const NEWSLETTER_PROMO_CODE = "NEWSLETTER10";

export function isLaunchPricingActive(now: Date = new Date()): boolean {
  return now.getTime() < new Date(AUDIT_LAUNCH_ENDS_AT).getTime();
}

export function getAuditPrices(now: Date = new Date()) {
  return isLaunchPricingActive(now) ? AUDIT_PRICES.launch : AUDIT_PRICES.standard;
}

export type AuditTier = "website" | "bundle";
