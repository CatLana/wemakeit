import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  projectType: z.string().optional(),
  problem: z.string().optional(),
  outcome: z.string().optional(),
  users: z.string().optional(),
  currentProcess: z.string().optional(),
  integrations: z.string().optional(),
  mustHaveFeatures: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
});

type BriefData = z.infer<typeof schema>;

const RECIPIENT = ["ssavchenko8@gmail.com"];

const FIELD_LABELS: Record<keyof Omit<BriefData, "name" | "email">, string> = {
  projectType: "What kind of project is this?",
  problem: "What problem are you trying to solve?",
  outcome: "What outcome do you want?",
  users: "Who will use this software?",
  currentProcess: "How are you doing this today?",
  integrations: "What systems does it need to connect with?",
  mustHaveFeatures: "What features are must-have for version 1?",
  timeline: "What is your timeline?",
  budget: "What budget range are you considering?",
};

const FIELD_ORDER = Object.keys(FIELD_LABELS) as Array<keyof typeof FIELD_LABELS>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function section(label: string, value: string): string {
  return `<tr><td style="padding:14px 0;border-bottom:1px solid #e2e8f0;">
    <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#475569;">${label}</p>
    <p style="margin:0;font-size:14px;color:#0f172a;line-height:1.6;white-space:pre-wrap;">${value}</p>
  </td></tr>`;
}

function buildHtml(data: BriefData): string {
  const answered = FIELD_ORDER.filter((key) => data[key]?.trim());
  const rows = answered.map((key) => section(FIELD_LABELS[key], data[key] as string)).join("");
  const empty = `<tr><td style="padding:14px 0;"><p style="margin:0;font-size:14px;color:#94a3b8;">No questions answered.</p></td></tr>`;

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
            <p style="margin:8px 0 0;font-size:13px;color:#94a3b8;">New custom software brief from wemakeit.ie</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 8px;">
            <table width="100%" cellPadding="0" cellSpacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              <tbody>
                ${data.name ? `<tr style="background:#f8fafc;"><td style="padding:8px 12px;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">Name</td><td style="padding:8px 12px;font-size:13px;color:#0f172a;vertical-align:top;">${data.name}</td></tr>` : ""}
                ${data.email ? `<tr><td style="padding:8px 12px;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">Email</td><td style="padding:8px 12px;font-size:13px;color:#0f172a;vertical-align:top;"><a href="mailto:${data.email}" style="color:#0891b2;">${data.email}</a></td></tr>` : ""}
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 32px 24px;">
            <table width="100%" cellPadding="0" cellSpacing="0">
              <tbody>
                ${rows || empty}
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px;">
            <p style="font-size:12px;color:#94a3b8;margin:0;">This email was sent from the custom software brief form at wemakeit.ie</p>
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

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const replyTo = data.email && EMAIL_REGEX.test(data.email) ? data.email : undefined;
  const subject = data.name ? `Custom software brief from ${data.name}` : "New custom software brief";

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "We Make IT <onboarding@resend.dev>",
    to: RECIPIENT,
    ...(replyTo ? { replyTo } : {}),
    subject,
    html: buildHtml(data),
  });

  if (error) {
    console.error("Resend error (software brief):", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
