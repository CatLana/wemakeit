import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(2),
  message: z.string().min(2),
});

const RECIPIENT = ["ssavchenko8@gmail.com", "info@wemakeit.ie"];

function buildHtml(data: z.infer<typeof schema>): string {
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
            <p style="margin:8px 0 0;font-size:13px;color:#94a3b8;">New consultation request from wemakeit.ie</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px;">
            <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f172a;">
              Free Consultation Request — ${data.service}
            </p>
            <table width="100%" cellPadding="0" cellSpacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              <tbody>
                <tr style="background:#f8fafc;">
                  <td style="padding:8px 12px;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">Service</td>
                  <td style="padding:8px 12px;font-size:13px;color:#0f172a;font-weight:600;vertical-align:top;">${data.service}</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">Name</td>
                  <td style="padding:8px 12px;font-size:13px;color:#0f172a;vertical-align:top;">${data.name}</td>
                </tr>
                <tr style="background:#f8fafc;">
                  <td style="padding:8px 12px;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">Email</td>
                  <td style="padding:8px 12px;font-size:13px;color:#0f172a;vertical-align:top;"><a href="mailto:${data.email}" style="color:#0891b2;">${data.email}</a></td>
                </tr>
                ${data.phone ? `<tr><td style="padding:8px 12px;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">Phone</td><td style="padding:8px 12px;font-size:13px;color:#0f172a;vertical-align:top;">${data.phone}</td></tr>` : ""}
              </tbody>
            </table>
            <p style="margin:20px 0 6px;font-size:13px;font-weight:600;color:#475569;">Message</p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;font-size:14px;color:#1e293b;line-height:1.6;white-space:pre-wrap;">${data.message}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 32px;">
            <a href="mailto:${data.email}?subject=Re: Free Consultation — ${data.service}&body=Hi ${data.name},%0D%0A%0D%0AThank you for requesting a free consultation. I'd love to learn more about your project.%0D%0A%0D%0AKind regards,%0D%0ALana%0D%0AWe Make IT"
               style="display:inline-block;background:#22d3ee;color:#0f172a;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
              Reply to ${data.name}
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">This email was sent automatically by wemakeit.ie.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", issues: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "We Make IT <onboarding@resend.dev>",
    to: RECIPIENT,
    subject: `[wemakeit.ie] Free consultation — ${data.service} from ${data.name}`,
    html: buildHtml(data),
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
