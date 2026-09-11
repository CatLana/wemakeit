import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  const formData = await req.formData();
  const agreed = formData.get("agreed");

  if (!agreed) {
    return NextResponse.json({ error: "You must agree to the Terms of Service to continue." }, { status: 400 });
  }

  const priceId = process.env.STRIPE_PRICE_CONSULTATION;
  if (!priceId) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const baseUrl = req.nextUrl.origin;

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "hosted_page",
      line_items: [{ price: priceId, quantity: 1 }],
      billing_address_collection: "auto",
      phone_number_collection: { enabled: false },
      // This account has Managed Payments enabled by default, which requires every
      // product to carry a Stripe tax code unless explicitly turned off per session.
      managed_payments: { enabled: false },
      submit_type: "auto",
      integration_identifier: "hosted_web_0001",
      origin_context: "web",
      allow_promotion_codes: true,
      metadata: { product: "consultation" },
      success_url: `${baseUrl}/en/book/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/en/book`,
    });
  } catch (err) {
    console.error("Stripe checkout session creation failed:", err);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  if (!session.url) {
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  return NextResponse.redirect(session.url, { status: 303 });
}
