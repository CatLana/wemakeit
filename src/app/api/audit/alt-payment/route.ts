import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getAuditPrices, type AuditTier } from "@/lib/audit-pricing";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  tier: z.enum(["website", "bundle"]),
  message: z.string().optional(),
  agreed: z.literal(true, { message: "Consent is required" }),
});

const RECIPIENT = ["ssavchenko8@gmail.com"];

function tierLabel(tier: AuditTier): string {
  return tier === "bundle" ? "Website + social media bundle audit" : "Website audit";
}

function row(label: string, value: string, alt = false): string {
  const bg = alt ? "background:#f8fafc;" : "";
  return `<tr style="${bg}"><td style="padding:8px 12px;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:8px 12px;font-size:13px;color:#0f172a;vertical-align:top;">${value}</td></tr>`;
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, email, tier, message } = parsed.data;
  const label = tierLabel(tier);
  const price = getAuditPrices()[tier];

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error: customerError } = await resend.emails.send({
    from: "We Make IT <onboarding@resend.dev>",
    to: [email],
    subject: "Your audit request — payment link on its way",
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellPadding="0" cellSpacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellPadding="0" cellSpacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <tr>
          <td style="background:#0f172a;padding:28px 32px;">
            <span style="font-size:22px;font-weight:800;color:#fff;">We Make <span style="color:#22d3ee;">IT</span></span>
            <p style="margin:8px 0 0;font-size:13px;color:#94a3b8;">Audit request received</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px;">
            <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f172a;">
              Thanks, ${name}
            </p>
            <p style="margin:0 0 16px;font-size:14px;color:#334155;line-height:1.6;">
              We've received your request for the ${label} (€${price}). We'll send you a secure Revolut payment link by email within one business day. Once payment is received, your 48-hour delivery window starts.
            </p>
            <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">
              Questions in the meantime? Just reply to this email.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px;">
            <p style="font-size:12px;color:#94a3b8;margin:0;">This email was sent from the audit request form at wemakeit.ie</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
  if (customerError) console.error("Resend error (alt-payment customer):", customerError);

  const { error: adminError } = await resend.emails.send({
    from: "We Make IT <onboarding@resend.dev>",
    to: RECIPIENT,
    replyTo: email,
    subject: `URGENT: Audit request — send Revolut link — ${label} (€${price})`,
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellPadding="0" cellSpacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellPadding="0" cellSpacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:2px solid #f43f5e;">
        <tr>
          <td style="background:#f43f5e;padding:16px 32px;">
            <span style="font-size:14px;font-weight:800;color:#fff;letter-spacing:0.05em;text-transform:uppercase;">Action needed — send Revolut payment link</span>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px;">
            <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f172a;">${label} — €${price}</p>
            <table width="100%" cellPadding="0" cellSpacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              <tbody>
                ${row("Name", name, true)}
                ${row("Email", `<a href="mailto:${email}" style="color:#0891b2;">${email}</a>`)}
                ${message ? row("Message", message, true) : ""}
              </tbody>
            </table>
            <p style="margin:20px 0 0;font-size:13px;color:#475569;">Send a Revolut payment link for €${price} to this customer to complete their order.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
  if (adminError) console.error("Resend error (alt-payment admin):", adminError);

  return NextResponse.json({ ok: true });
}
