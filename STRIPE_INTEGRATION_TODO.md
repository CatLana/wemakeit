# Stripe integration — remaining setup

This is Scenario A: a Checkout Session call already existed ([src/app/api/stripe/checkout/route.ts](src/app/api/stripe/checkout/route.ts)) before this pass. Only its parameters were brought in line with the current Checkout Studio configuration; nothing else was restructured.

## Values to replace

Nothing in the code itself is a hardcoded placeholder — `line_items`, `success_url`, and `cancel_url` are already built from real request data and environment variables, not sample strings. What's actually missing is that those environment variables aren't set yet.

**File containing the environment references:**
- [src/app/api/stripe/checkout/route.ts](src/app/api/stripe/checkout/route.ts)
- [src/app/api/stripe/webhook/route.ts](src/app/api/stripe/webhook/route.ts)

| Variable | Current value | What to set |
|---|---|---|
| `STRIPE_SECRET_KEY` | unset | Your secret key from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys). |
| `STRIPE_WEBHOOK_SECRET` | unset | The signing secret for the webhook endpoint below, from the [Webhooks page](https://dashboard.stripe.com/workbench/webhooks). |
| `STRIPE_PRICE_AUDIT_WEBSITE_LAUNCH` | unset | Price ID for the €80 website audit (launch pricing). |
| `STRIPE_PRICE_AUDIT_BUNDLE_LAUNCH` | unset | Price ID for the €120 website + social bundle (launch pricing). |
| `STRIPE_PRICE_AUDIT_WEBSITE_STANDARD` | unset | Price ID for the €100 website audit (standard pricing, after the launch window). |
| `STRIPE_PRICE_AUDIT_BUNDLE_STANDARD` | unset | Price ID for the €150 website + social bundle (standard pricing). |

All six live in [.env.local.example](.env.local.example) as a template — copy the ones you need into `.env.local`.

The launch/standard cutoff date itself is `AUDIT_LAUNCH_ENDS_AT` in [src/lib/audit-pricing.ts](src/lib/audit-pricing.ts), currently set to 2026-10-01 as a placeholder — confirm it against the real deploy date.

## Configured parameters

These came from your Checkout Studio session and are already set in the code.

**File:**
- [src/app/api/stripe/checkout/route.ts](src/app/api/stripe/checkout/route.ts)

| Parameter | Value |
|---|---|
| `mode` | `payment` (one-time charge, not a subscription) |
| `ui_mode` | `hosted_page` |
| `billing_address_collection` | `auto` |
| `phone_number_collection` | `{ enabled: false }` |
| `automatic_tax` | `{ enabled: false }` |
| `submit_type` | `auto` |
| `integration_identifier` | `hosted_web_0001` |
| `origin_context` | `web` |
| `allow_promotion_codes` | `true`, except on a session created from a newsletter discount link (see note below) |

**Note on `allow_promotion_codes` vs `discounts`**: Stripe rejects a session that sets both parameters at once. The newsletter welcome email links to `/audit?promo=NEWSLETTER10`; when that query param is present, the route resolves it to a Stripe promotion code and passes it as `discounts` instead, so that one session skips the manual promo box (the discount is already applied) while every other session keeps the manual box enabled per your Studio config.

**`payment_method_collection` was deliberately not included.** It's a subscription-mode-only parameter in the Stripe API (see the SDK's own type comment on `SessionCreateParams.payment_method_collection`); passing it alongside `mode: "payment"` would have caused Stripe to reject the request. An earlier draft of this route had it set — removed as part of this update.

## Setup and next steps

**Environment variables**: see the table above. `stripe` (v22.6.0) is already installed as a dependency.

**Project structure** (both already exist, from an earlier pass, not new in this update):
- `src/app/api/stripe/checkout/route.ts` — creates the Checkout Session and redirects to Stripe's hosted page. Called by a plain HTML form POST from `src/components/AuditBuyForm.tsx` (no client-side Stripe.js).
- `src/app/api/stripe/webhook/route.ts` — verifies the webhook signature and, on `checkout.session.completed`, emails the customer (report ETA + links to the brief and the free follow-up booking page) and an urgent internal notification.

**Flow overview**: buyer ticks the required Terms of Service checkbox and submits the form on `/audit` → `POST /api/stripe/checkout` creates the session and 303-redirects to Stripe → buyer pays on Stripe's hosted page → Stripe redirects to `/audit/thank-you` and, separately, POSTs the webhook event that triggers the two emails.

**Registering the webhook**: in the Stripe Dashboard, add an endpoint pointing at `https://www.wemakeit.ie/api/stripe/webhook` listening for `checkout.session.completed`, then copy its signing secret into `STRIPE_WEBHOOK_SECRET`. For local testing, use the [Stripe CLI](https://docs.stripe.com/stripe-cli): `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

**Test card numbers**: `4242 4242 4242 4242` (any future expiry, any CVC) for a successful payment; see [Stripe's testing docs](https://docs.stripe.com/testing) for decline and 3D Secure scenarios.

**Promotion code**: create a real Stripe Promotion Code named `NEWSLETTER10` (Dashboard → Product catalog → Coupons/Promotion codes), or update `NEWSLETTER_PROMO_CODE` in `src/lib/audit-pricing.ts` to match whatever code you actually create.

**Order tracking**: intentionally none — no database or spreadsheet for audit orders. Everything runs through the two transactional emails; report delivery itself stays manual.

**Resources**: https://support.stripe.com and https://docs.stripe.com/mcp
