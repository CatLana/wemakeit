---
description: "Use when creating or editing API routes. Covers Zod validation, Resend email, Google Sheets newsletter, error response format, and environment variable requirements."
applyTo: "src/app/api/**/*.ts"
---

# API Route Guidelines

## Request Validation (Always First)

Parse and validate the request body with Zod **before any other logic**. Return `400` immediately on invalid input:

```ts
import { z } from "zod";

const schema = z.object({ /* ... */ });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: "Validation failed", issues: result.error.issues }, { status: 422 });
  }

  const data = result.data;
  // proceed...
}
```

## Email — Resend

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "We Make IT <onboarding@resend.dev>",
  to: ["ssavchenko8@gmail.com", "info@wemakeit.ie"],
  subject: "...",
  html: "...",
});
```

- Admin notification emails always go to both `ssavchenko8@gmail.com` and `info@wemakeit.ie`.
- Send in a `try/catch` — a failed email must not crash the primary response.

## Newsletter — Google Sheets

Subscribers are stored in Google Sheets via a JWT service account:
- Sheet: `"Sheet1"`, columns: `[email, ISO date, consent string]`
- Check for duplicate email (column A) before appending.
- See `src/app/api/newsletter/route.ts` for the full implementation pattern.

Required env vars:
| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Transactional email |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Sheets auth |
| `GOOGLE_PRIVATE_KEY` | Sheets auth |
| `GOOGLE_SHEET_ID` | Target spreadsheet |

Guard against missing vars at the top of any route that needs them:
```ts
if (!process.env.RESEND_API_KEY) {
  return Response.json({ error: "Email service unavailable" }, { status: 503 });
}
```

## Error Response Format

```ts
// client error
Response.json({ error: "Human-readable message" }, { status: 400 | 422 | 404 })

// server error
Response.json({ error: "Service unavailable" }, { status: 503 | 500 })

// success
Response.json({ status: "ok" | "subscribed" | "already_subscribed" }, { status: 200 })
```

## Security

- Never log or return secrets.
- Rate-limiting is not yet implemented — note this if adding new public-facing endpoints.
- All routes already benefit from the global security headers in `next.config.ts`.
- Zod schemas must reject unexpected fields (use `.strict()` if needed) to prevent mass-assignment issues.
