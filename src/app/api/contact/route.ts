import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  enquiryType: z.enum(["need-a-quote", "business-idea-consultation", "general-query"]),
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.enum(["web-app", "mobile-app", "website", "e-commerce", "redesign", "other"]),
  description: z.string().min(10),
  budget: z.enum(["under-5k", "5k-15k", "15k-30k", "30k-50k", "over-50k", "not-sure"]),
  timeline: z.enum(["asap", "1-3-months", "3-6-months", "flexible"]),
  hasDesign: z.enum(["yes", "partial", "no"]),
  competitorQuote: z.string().optional(),
});

const RECIPIENT = "ssavchenko8@gmail.com";

const enquiryLabels: Record<string, string> = {
  "need-a-quote": "I need a quote for a project",
  "business-idea-consultation": "Business idea consultation",
  "general-query": "General query",
};
const projectTypeLabels: Record<string, string> = {
  "web-app": "Web Application",
  "mobile-app": "Mobile App",
  "website": "Website / Landing Page",
  "e-commerce": "E-Commerce Store",
  "redesign": "Redesign / Rebuild",
  "other": "Other",
};
const budgetLabels: Record<string, string> = {
  "under-5k": "Under €5,000",
  "5k-15k": "€5,000 – €15,000",
  "15k-30k": "€15,000 – €30,000",
  "30k-50k": "€30,000 – €50,000",
  "over-50k": "Over €50,000",
  "not-sure": "Not sure yet",
};
const timelineLabels: Record<string, string> = {
  "asap": "As soon as possible",
  "1-3-months": "1 – 3 months",
  "3-6-months": "3 – 6 months",
  "flexible": "Flexible",
};
const hasDesignLabels: Record<string, string> = {
  "yes": "Yes, I have designs ready",
  "partial": "Partial: I have some ideas or wireframes",
  "no": "No, starting from scratch",
};

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 12px;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;font-size:13px;color:#0f172a;vertical-align:top;">${value}</td>
    </tr>`;
}

function buildHtml(data: z.infer<typeof schema>): string {
  const subjectTag = enquiryLabels[data.enquiryType] ?? data.enquiryType;
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">

        <!-- Header -->
        <tr>
          <td style="background:#0f172a;padding:28px 32px;">
            <span style="font-size:22px;font-weight:800;color:#fff;">We Make <span style="color:#22d3ee;">IT</span></span>
            <p style="margin:8px 0 0;font-size:13px;color:#94a3b8;">New enquiry received via wemakeit.ie</p>
          </td>
        </tr>

        <!-- Type badge -->
        <tr>
          <td style="padding:24px 32px 0;">
            <span style="display:inline-block;padding:4px 12px;border-radius:999px;background:#22d3ee20;border:1px solid #22d3ee50;font-size:12px;font-weight:600;color:#0891b2;letter-spacing:0.05em;">
              ${subjectTag}
            </span>
          </td>
        </tr>

        <!-- Details table -->
        <tr>
          <td style="padding:20px 32px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
              <tbody>
                ${row("Name", data.name)}
                ${row("Email", `<a href="mailto:${data.email}" style="color:#0891b2;">${data.email}</a>`)}
                ${row("Phone", data.phone)}
                ${row("Company", data.company)}
                ${row("Enquiry type", enquiryLabels[data.enquiryType])}
                ${row("Project type", projectTypeLabels[data.projectType])}
                ${row("Budget", budgetLabels[data.budget])}
                ${row("Timeline", timelineLabels[data.timeline])}
                ${row("Has designs?", hasDesignLabels[data.hasDesign])}
                ${row("Competitor quote", data.competitorQuote)}
              </tbody>
            </table>

            <!-- Description -->
            <p style="margin:20px 0 6px;font-size:13px;font-weight:600;color:#475569;">Project description</p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;font-size:14px;color:#1e293b;line-height:1.6;white-space:pre-wrap;">${data.description}</div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="padding:0 32px 32px;">
            <a href="mailto:${data.email}?subject=Re: Your enquiry to We Make IT&body=Hi ${data.name},%0D%0A%0D%0AThank you for getting in touch..."
               style="display:inline-block;background:#22d3ee;color:#0f172a;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
              Reply to ${data.name}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">This email was sent automatically by wemakeit.ie. Do not reply to this address.</p>
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
    return NextResponse.json({ error: "Invalid form data.", details: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const subjectTag = enquiryLabels[data.enquiryType] ?? data.enquiryType;

  const { error } = await resend.emails.send({
    from: "We Make IT <onboarding@resend.dev>",
    to: [RECIPIENT],
    replyTo: data.email,
    subject: `[wemakeit.ie] ${subjectTag} from ${data.name}`,
    html: buildHtml(data),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
