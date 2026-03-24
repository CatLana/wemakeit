import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  email: z.string().email(),
  consent: z.literal(true, { message: "Consent is required" }),
});

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
  if (!process.env.RESEND_AUDIENCE_ID) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid data", issues: result.error.issues },
      { status: 422 }
    );
  }

  const { email } = result.data;

  // Add contact to Resend Audience
  const { error: contactError } = await resend.contacts.create({
    email,
    audienceId: process.env.RESEND_AUDIENCE_ID,
    unsubscribed: false,
  });

  // Resend returns a validation error if email already exists; treat this as already-subscribed
  if (contactError) {
    const msg = (contactError as { message?: string }).message ?? "";
    if (
      msg.toLowerCase().includes("already") ||
      msg.toLowerCase().includes("exists") ||
      msg.toLowerCase().includes("duplicate")
    ) {
      return NextResponse.json({ status: "already_subscribed" }, { status: 200 });
    }
    console.error("Resend contacts.create error:", contactError);
    return NextResponse.json({ error: "Could not save subscription" }, { status: 500 });
  }

  // Send admin notification
  const { error: mailError } = await resend.emails.send({
    from: "We Make IT <onboarding@resend.dev>",
    to: ["ssavchenko8@gmail.com"],
    replyTo: email,
    subject: "🔔 New newsletter subscriber",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;background:#F8FAFC;padding:32px;border-radius:12px;">
        <h2 style="color:#0F172A;margin-top:0;">New Newsletter Subscriber</h2>
        <p style="color:#475569;">Someone just subscribed to the We Make IT newsletter.</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <tr>
            <td style="padding:10px 12px;background:#fff;border:1px solid #E2E8F0;font-weight:600;color:#1E293B;width:120px;">Email</td>
            <td style="padding:10px 12px;background:#fff;border:1px solid #E2E8F0;color:#475569;">${email}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;background:#fff;border:1px solid #E2E8F0;font-weight:600;color:#1E293B;">Date</td>
            <td style="padding:10px 12px;background:#fff;border:1px solid #E2E8F0;color:#475569;">${new Date().toUTCString()}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;background:#fff;border:1px solid #E2E8F0;font-weight:600;color:#1E293B;">Consent</td>
            <td style="padding:10px 12px;background:#fff;border:1px solid #E2E8F0;color:#22c55e;">✓ Confirmed — agreed to Privacy Policy and marketing emails</td>
          </tr>
        </table>
        <p style="color:#94A3B8;font-size:12px;margin-top:24px;">
          This contact has been saved to your Resend Audience. You can export all subscribers as CSV/Excel from the Resend dashboard.
        </p>
      </div>
    `,
  });

  if (mailError) {
    // Notification failure is non-blocking — subscription already saved
    console.error("Resend notification email error:", mailError);
  }

  return NextResponse.json({ status: "subscribed" }, { status: 200 });
}
