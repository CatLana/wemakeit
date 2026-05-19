import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  service: z.enum(["consultation", "quote", "general", "audit"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  marketingConsent: z.boolean().optional(),
});

const RECIPIENT = ["ssavchenko8@gmail.com"];

const SERVICE_LABELS: Record<string, string> = {
  consultation: "Free Consultation",
  quote: "Quote Request",
  general: "General Query",
  audit: "Free Audit Request",
};

function row(label: string, value: string, alt = false): string {
  const bg = alt ? "background:#f8fafc;" : "";
  return `<tr style="${bg}"><td style="padding:8px 12px;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:8px 12px;font-size:13px;color:#0f172a;vertical-align:top;">${value}</td></tr>`;
}

function buildHtml(data: z.infer<typeof schema>): string {
  const serviceLabel = SERVICE_LABELS[data.service] ?? data.service;
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
            <p style="margin:8px 0 0;font-size:13px;color:#94a3b8;">New quote request from wemakeit.ie</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px;">
            <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f172a;">
              Free Quote Request — ${serviceLabel}
            </p>
            <table width="100%" cellPadding="0" cellSpacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              <tbody>
                ${row("Service", serviceLabel, true)}
                ${row("Name", data.name)}
                ${row("Email", `<a href="mailto:${data.email}" style="color:#0891b2;">${data.email}</a>`, true)}
                ${data.phone ? row("Phone", data.phone) : ""}
                ${data.marketingConsent ? row("Marketing opt-in", "Yes") : ""}
              </tbody>
            </table>
            ${data.message ? `<p style="margin:20px 0 6px;font-size:13px;font-weight:600;color:#475569;">Message</p><div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;font-size:14px;color:#1e293b;line-height:1.6;white-space:pre-wrap;">${data.message}</div>` : ""}
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 32px;">
            <a href="mailto:${data.email}?subject=Re: Your quote request to We Make IT&body=Hi ${data.name},%0D%0A%0D%0AThank you for your request..."
               style="display:inline-block;background:#22d3ee;color:#0f172a;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
              Reply to ${data.name}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px;">
            <p style="font-size:12px;color:#94a3b8;margin:0;">This email was sent from the quote form at wemakeit.ie</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
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

  const data = parsed.data;
  const serviceLabel = SERVICE_LABELS[data.service] ?? data.service;

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "We Make IT <onboarding@resend.dev>",
    to: RECIPIENT,
    replyTo: data.email,
    subject: `Quote Request: ${serviceLabel} from ${data.name}`,
    html: buildHtml(data),
  });

  if (error) {
    console.error("Resend error (quote):", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
