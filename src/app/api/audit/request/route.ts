import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const auditRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL"),
  business: z.string().min(10, "Business description must be at least 10 characters"),
  focus: z.string().optional(),
  locale: z.enum(["en", "it", "ru"]).default("en"),
});

type AuditRequest = z.infer<typeof auditRequestSchema>;

const RECIPIENT = ["ssavchenko8@gmail.com"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = auditRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation error", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "We Make IT <onboarding@resend.dev>",
      to: RECIPIENT,
      replyTo: data.email,
      subject: `[wemakeit.ie] Free Audit Request from ${data.name}`,
      html: buildAdminEmail(data),
    });

    if (error) {
      console.error("Resend error (audit):", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Audit request error:", error);
    return NextResponse.json(
      { error: "Failed to process audit request" },
      { status: 500 }
    );
  }
}

function buildAdminEmail(data: AuditRequest): string {
  return `
    <div style="font-family:sans-serif;color:#1E293B;line-height:1.6;max-width:600px">
      <h2 style="color:#0F172A;margin-bottom:4px">New Free Audit Request</h2>
      <p style="color:#64748B;font-size:13px;margin-top:0">${new Date().toUTCString()}</p>
      <table style="border-collapse:collapse;width:100%;margin-top:16px">
        <tr><td style="padding:8px 12px;font-size:13px;color:#64748B;white-space:nowrap">Name</td><td style="padding:8px 12px;font-size:13px;color:#0F172A">${data.name}</td></tr>
        <tr style="background:#F8FAFC"><td style="padding:8px 12px;font-size:13px;color:#64748B;white-space:nowrap">Email</td><td style="padding:8px 12px;font-size:13px;color:#0F172A">${data.email}</td></tr>
        <tr><td style="padding:8px 12px;font-size:13px;color:#64748B;white-space:nowrap">Website</td><td style="padding:8px 12px;font-size:13px"><a href="${data.website}">${data.website}</a></td></tr>
        <tr style="background:#F8FAFC"><td style="padding:8px 12px;font-size:13px;color:#64748B;white-space:nowrap;vertical-align:top">Business</td><td style="padding:8px 12px;font-size:13px;color:#0F172A">${data.business}</td></tr>
        ${data.focus ? `<tr><td style="padding:8px 12px;font-size:13px;color:#64748B;white-space:nowrap;vertical-align:top">Focus</td><td style="padding:8px 12px;font-size:13px;color:#0F172A">${data.focus}</td></tr>` : ""}
        <tr style="background:#F8FAFC"><td style="padding:8px 12px;font-size:13px;color:#64748B">Locale</td><td style="padding:8px 12px;font-size:13px;color:#0F172A">${data.locale}</td></tr>
      </table>
      <p style="margin-top:24px;font-size:13px;color:#64748B">Reply to this email to contact ${data.name} directly.</p>
    </div>
  `;
}
