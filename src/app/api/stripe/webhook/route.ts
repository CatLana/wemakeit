import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { CONSULTATION_BOOKING_URL } from "@/lib/consultation-booking";

const RECIPIENT = ["ssavchenko8@gmail.com"];
const BASE_URL = "https://www.wemakeit.ie";

function tierLabel(tier: string): string {
  return tier === "bundle" ? "Website + social media bundle audit" : "Website audit";
}

function customerHtml(tierName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellPadding="0" cellSpacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellPadding="0" cellSpacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <tr>
          <td style="background:#0f172a;padding:28px 32px;">
            <span style="font-size:22px;font-weight:800;color:#fff;">We Make <span style="color:#22d3ee;">IT</span></span>
            <p style="margin:8px 0 0;font-size:13px;color:#94a3b8;">Order confirmed</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px;">
            <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f172a;">
              Your ${tierName} is on its way
            </p>
            <p style="margin:0 0 16px;font-size:14px;color:#334155;line-height:1.6;">
              Thanks for your order. Your report will land in this inbox within 48 hours.
            </p>
            <p style="margin:0 0 16px;font-size:14px;font-weight:700;color:#0f172a;line-height:1.6;">
              One more thing before we start: take 5 minutes to fill in your brief.
            </p>
            <p style="margin:0 0 16px;font-size:14px;color:#334155;line-height:1.6;">
              It tells us what you're trying to achieve, so we can tailor the report to your goals instead of reviewing your site in a generic way.
            </p>
            <p style="margin:0 0 20px;">
              <a href="${BASE_URL}/en/brief/general?context=audit" style="display:inline-block;background:#22d3ee;color:#0f172a;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
                Fill in your brief now
              </a>
            </p>
            <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">
              Once your report is delivered, that order is complete. If you'd like it looked at again with more detail later, that's a new order, so it's worth getting the brief right now. Not in the mood to type? The brief page has a voice message option too, just message us on WhatsApp instead.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px;">
            <p style="font-size:12px;color:#94a3b8;margin:0;">This email was sent from wemakeit.ie following your audit order.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function adminHtml(email: string, tierName: string, amount: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellPadding="0" cellSpacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellPadding="0" cellSpacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:2px solid #f43f5e;">
        <tr>
          <td style="background:#f43f5e;padding:16px 32px;">
            <span style="font-size:14px;font-weight:800;color:#fff;letter-spacing:0.05em;text-transform:uppercase;">Urgent — new paid audit order</span>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px;">
            <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f172a;">
              ${tierName} — €${amount}
            </p>
            <table width="100%" cellPadding="0" cellSpacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              <tr><td style="padding:8px 12px;font-size:13px;color:#64748b;background:#f8fafc;">Customer email</td><td style="padding:8px 12px;font-size:13px;color:#0f172a;"><a href="mailto:${email}" style="color:#0891b2;">${email}</a></td></tr>
              <tr><td style="padding:8px 12px;font-size:13px;color:#64748b;">Report due</td><td style="padding:8px 12px;font-size:13px;color:#0f172a;">Within 48 hours</td></tr>
            </table>
            <p style="margin:20px 0 0;font-size:13px;color:#475569;">Deliver the report to this customer manually within 48 hours.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function consultationCustomerHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellPadding="0" cellSpacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellPadding="0" cellSpacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <tr>
          <td style="background:#0f172a;padding:28px 32px;">
            <span style="font-size:22px;font-weight:800;color:#fff;">We Make <span style="color:#22d3ee;">IT</span></span>
            <p style="margin:8px 0 0;font-size:13px;color:#94a3b8;">Payment confirmed</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px;">
            <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f172a;">
              Your paid consultation is confirmed
            </p>
            <p style="margin:0 0 16px;font-size:14px;color:#334155;line-height:1.6;">
              Thanks for booking. Pick a 60-minute slot that suits you using the link below, we'll make sure you get the full time:
            </p>
            <p style="margin:0 0 20px;">
              <a href="${CONSULTATION_BOOKING_URL}" style="display:inline-block;background:#22d3ee;color:#0f172a;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
                Pick your time slot
              </a>
            </p>
            <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">
              Prefer meeting in person? Book a slot anyway, then message us on WhatsApp or email to agree a location.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px;">
            <p style="font-size:12px;color:#94a3b8;margin:0;">This email was sent from wemakeit.ie following your consultation booking.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function consultationAdminHtml(email: string, amount: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellPadding="0" cellSpacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellPadding="0" cellSpacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:2px solid #f43f5e;">
        <tr>
          <td style="background:#f43f5e;padding:16px 32px;">
            <span style="font-size:14px;font-weight:800;color:#fff;letter-spacing:0.05em;text-transform:uppercase;">Urgent — new paid consultation booked</span>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px;">
            <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f172a;">
              Paid technical consultation — €${amount}
            </p>
            <table width="100%" cellPadding="0" cellSpacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              <tr><td style="padding:8px 12px;font-size:13px;color:#64748b;background:#f8fafc;">Customer email</td><td style="padding:8px 12px;font-size:13px;color:#0f172a;"><a href="mailto:${email}" style="color:#0891b2;">${email}</a></td></tr>
              <tr><td style="padding:8px 12px;font-size:13px;color:#64748b;">Duration</td><td style="padding:8px 12px;font-size:13px;color:#0f172a;">60 minutes</td></tr>
            </table>
            <p style="margin:20px 0 0;font-size:13px;color:#475569;">No report to prepare, they'll book their own slot via the calendar link.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature ?? "", process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : "0.00";
    const isConsultation = session.metadata?.product === "consultation";

    if (email && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      if (isConsultation) {
        const { error: customerError } = await resend.emails.send({
          from: "We Make IT <onboarding@resend.dev>",
          to: [email],
          subject: "Your paid consultation is confirmed",
          html: consultationCustomerHtml(),
        });
        if (customerError) console.error("Resend error (consultation customer):", customerError);

        const { error: adminError } = await resend.emails.send({
          from: "We Make IT <onboarding@resend.dev>",
          to: RECIPIENT,
          subject: `URGENT: New paid consultation booked (€${amount})`,
          html: consultationAdminHtml(email, amount),
        });
        if (adminError) console.error("Resend error (consultation admin):", adminError);
      } else {
        const tier = tierLabel(session.metadata?.tier ?? "website");

        const { error: customerError } = await resend.emails.send({
          from: "We Make IT <onboarding@resend.dev>",
          to: [email],
          subject: "Your website audit order is confirmed",
          html: customerHtml(tier),
        });
        if (customerError) console.error("Resend error (audit customer):", customerError);

        const { error: adminError } = await resend.emails.send({
          from: "We Make IT <onboarding@resend.dev>",
          to: RECIPIENT,
          subject: `URGENT: New audit order — ${tier} (€${amount})`,
          html: adminHtml(email, tier, amount),
        });
        if (adminError) console.error("Resend error (audit admin):", adminError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
