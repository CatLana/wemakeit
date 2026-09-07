import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { isLaunchPricingActive, type AuditTier } from "@/lib/audit-pricing";

const TIER_PRICE_ENV: Record<AuditTier, { launch: string; standard: string }> = {
  website: { launch: "STRIPE_PRICE_AUDIT_WEBSITE_LAUNCH", standard: "STRIPE_PRICE_AUDIT_WEBSITE_STANDARD" },
  bundle: { launch: "STRIPE_PRICE_AUDIT_BUNDLE_LAUNCH", standard: "STRIPE_PRICE_AUDIT_BUNDLE_STANDARD" },
};

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  const formData = await req.formData();
  const tier = formData.get("tier");
  const promo = formData.get("promo");
  const agreed = formData.get("agreed");

  if (tier !== "website" && tier !== "bundle") {
    return NextResponse.json({ error: "Invalid audit tier" }, { status: 400 });
  }

  if (!agreed) {
    return NextResponse.json({ error: "You must agree to the Terms of Service to continue." }, { status: 400 });
  }

  const phase = isLaunchPricingActive() ? "launch" : "standard";
  const envKey = TIER_PRICE_ENV[tier][phase];
  const priceId = process.env[envKey];

  if (!priceId) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Stripe rejects a session that sets both `discounts` and `allow_promotion_codes`,
  // so a resolved link-based discount takes over from the manual promo box for that session.
  let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
  if (typeof promo === "string" && promo.trim()) {
    try {
      const codes = await stripe.promotionCodes.list({ code: promo.trim(), active: true, limit: 1 });
      const match = codes.data[0];
      if (match) discounts = [{ promotion_code: match.id }];
    } catch (err) {
      console.error("Stripe promotion code lookup failed:", err);
    }
  }

  const baseUrl = req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "hosted_page",
    line_items: [{ price: priceId, quantity: 1 }],
    billing_address_collection: "auto",
    phone_number_collection: { enabled: false },
    automatic_tax: { enabled: false },
    submit_type: "auto",
    integration_identifier: "hosted_web_0001",
    origin_context: "web",
    metadata: { tier },
    success_url: `${baseUrl}/en/audit/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/en/audit`,
    ...(discounts ? { discounts } : { allow_promotion_codes: true }),
  });

  if (!session.url) {
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  return NextResponse.redirect(session.url, { status: 303 });
}
