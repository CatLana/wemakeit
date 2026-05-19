import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const auditRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  website: z.string().optional(),
  business: z.string().min(10, "Business description must be at least 10 characters"),
  focus: z.string().optional(),
  locale: z.enum(["en", "it", "ru"]).default("en"),
});

type AuditRequest = z.infer<typeof auditRequestSchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = auditRequestSchema.parse(body);

    // Send to Resend email service
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const emailContent = formatAuditRequestEmail(validatedData);

    // Confirmation to the user — non-blocking (onboarding@resend.dev can only
    // send to the Resend account email on the free plan, so don't fail the
    // submission if this bounces)
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "We Make IT <onboarding@resend.dev>",
        to: validatedData.email,
        subject: "Your Free Audit Request - We Make IT",
        html: emailContent.userEmail,
      }),
    }).catch((err) => console.error("User confirmation email error:", err));

    // Notification to We Make IT
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "We Make IT <onboarding@resend.dev>",
        to: "ssavchenko8@gmail.com",
        subject: `New Free Audit Request from ${validatedData.name}`,
        html: emailContent.adminEmail,
      }),
    }).catch(console.error);

    return NextResponse.json(
      { message: "Audit request received successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Audit request error:", error);
    return NextResponse.json(
      { error: "Failed to process audit request" },
      { status: 500 }
    );
  }
}

function formatAuditRequestEmail(data: AuditRequest) {
  const userEmailHtml = `
    <div style="font-family: sans-serif; color: #1E293B; line-height: 1.6;">
      <h2 style="color: #0F172A;">Thank you for requesting a free audit!</h2>
      <p>Hi ${data.name},</p>
      <p>We've received your audit request for <strong>${data.website}</strong>.</p>
      <p>Our team will review your website and business details within the next 24 hours. We'll send you a detailed questionnaire to help us tailor the audit specifically to your needs.</p>
      
      <h3 style="color: #0F172A; margin-top: 24px;">What happens next:</h3>
      <ol>
        <li>You'll receive a brief questionnaire from us</li>
        <li>We'll conduct a thorough review of your website</li>
        <li>We'll prepare a detailed plan with specific suggestions</li>
        <li>We'll reach out to schedule a call or meeting to discuss the results</li>
      </ol>
      
      <p style="margin-top: 24px; color: #64748B;">
        If you have any questions in the meantime, feel free to reply to this email.
      </p>
      
      <p>Best regards,<br>The We Make IT Team</p>
    </div>
  `;

  const adminEmailHtml = `
    <div style="font-family: sans-serif; color: #1E293B; line-height: 1.6;">
      <h2>New Free Audit Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Website:</strong> ${data.website}</p>
      <p><strong>Business:</strong> ${data.business}</p>
      ${data.focus ? `<p><strong>Main Concern:</strong> ${data.focus}</p>` : ""}
      <p><strong>Locale:</strong> ${data.locale}</p>
      <p><strong>Received:</strong> ${new Date().toISOString()}</p>
    </div>
  `;

  return {
    userEmail: userEmailHtml,
    adminEmail: adminEmailHtml,
  };
}
