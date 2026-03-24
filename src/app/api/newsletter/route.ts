import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { google } from "googleapis";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  email: z.string().email(),
  consent: z.literal(true, { message: "Consent is required" }),
});

async function appendToSheet(email: string): Promise<"subscribed" | "already_subscribed"> {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  // Check for duplicate — read existing emails in column A
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A:A",
  });
  const rows = existing.data.values ?? [];
  const already = rows.some(
    (row) => row[0]?.toString().toLowerCase() === email.toLowerCase()
  );
  if (already) return "already_subscribed";

  // Append new row: email | date | GDPR consent
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[email, new Date().toISOString(), "yes — agreed to Privacy Policy"]],
    },
  });

  return "subscribed";
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
  if (
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_SHEET_ID
  ) {
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

  let sheetStatus: "subscribed" | "already_subscribed";
  try {
    sheetStatus = await appendToSheet(email);
  } catch (err) {
    console.error("Google Sheets error:", err);
    return NextResponse.json({ error: "Could not save subscription" }, { status: 500 });
  }

  if (sheetStatus === "already_subscribed") {
    return NextResponse.json({ status: "already_subscribed" }, { status: 200 });
  }

  // Send admin notification (non-blocking)
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
          This contact has been saved to your Google Sheet.
        </p>
      </div>
    `,
  });

  if (mailError) {
    console.error("Resend notification email error:", mailError);
  }

  return NextResponse.json({ status: "subscribed" }, { status: 200 });
}
