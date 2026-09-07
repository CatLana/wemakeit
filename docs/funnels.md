# Sales funnels

Two independent funnels. They are not connected and should not be merged into one journey.

## Funnel #1 — Consultation (free)

**Audience**: people building something themselves (often with AI tools), who feel out of their depth on a technical decision.

**Page**: [`/book`](../src/app/[locale]/book/page.tsx). Content lives in `messages/en.json` under `book.story`.

**Story shape**:
1. "Sounds familiar?" — a short list of pain points (out of tokens, too many tools, fear of picking the wrong stack, legal exposure from AI-built software).
2. "Why this matters" — GDPR, secure architecture, and data handling are the business owner's legal responsibility, not the AI's.
3. "You don't need a developer, you need a guide" — reframes the ask from "hire a developer" to "get an hour of expert judgement," then closes on the free 30-minute consultation CTA, which scrolls to the existing booking form.

Every "Book a consultation" / "Free consultation" link sitewide (header, footer, pricing, blog) points here.

## Funnel #2 — Website & digital presence audit (paid)

**Audience**: people who already have a website, app, or social presence, sense it isn't converting, and don't know exactly what to fix.

**Page**: [`/audit`](../src/app/[locale]/audit/page.tsx). Content lives in `messages/en.json` under `auditPage`.

**Offer**: order online, no call required. Report delivered by email within 48 hours. A free 30-minute follow-up consultation is included with every order, bookable immediately (not gated behind report delivery).

**Pricing** (`src/lib/audit-pricing.ts` is the single source of truth):
- Launch pricing: €80 website / €120 bundle, until `AUDIT_LAUNCH_ENDS_AT`.
- Standard pricing after that: €100 website / €150 bundle.
- The countdown shown on `/audit` and the price actually charged both read from this same file, so they can't drift out of sync. Confirm `AUDIT_LAUNCH_ENDS_AT` matches the real deploy date before going live.

**Story shape**:
1. "Something feels off, but you're not sure what" — names the audience's actual situation (has a presence, isn't performing, doesn't know why).
2. "How it works" — order, pay, 48-hour report, free follow-up call included.
3. "Why now" — doing it now is cheap and self-serve; not doing it means quietly losing enquiries to competitors.
4. Tier comparison (website vs bundle) with buy buttons.
5. Reassurance — no pressure, no upsell, human-delivered.

### Technical flow

1. Buyer submits a plain HTML form (no client JS) to `POST /api/stripe/checkout` with `tier` (`website` | `bundle`) and, if they arrived via the newsletter discount link, `promo`.
2. The route resolves the correct Stripe Price ID for the current pricing phase, looks up the promo code server-side if present (`stripe.promotionCodes.list`), and creates a Checkout Session, redirecting to Stripe's hosted page.
3. `POST /api/stripe/webhook` verifies the Stripe signature and handles `checkout.session.completed`:
   - Sends the customer a confirmation email: report ETA, a link to `/brief/general?context=audit` to tell us their goal, and a link to `/book` to claim the included follow-up call immediately.
   - Sends an urgent-flagged admin notification to the same recipient address used by every other form on the site.
4. Stripe redirects the buyer to `/audit/thank-you`, which repeats the two links above so they aren't solely dependent on the email arriving.
5. Report delivery itself is manual: the report is written and emailed by hand within 48 hours. Nothing in the codebase automates this.

### Promotion codes

The Checkout Studio configuration now sets `allow_promotion_codes: true`, so Stripe's hosted page shows its own manual "enter a promo code" box by default. On top of that, the newsletter welcome email carries a discount link (`?promo=NEWSLETTER10`) that the audit page threads into a hidden form field; when present, the checkout route resolves it to a Stripe promotion code and attaches it to the session as `discounts` instead of `allow_promotion_codes` (Stripe rejects a session that sets both), so a subscriber who follows that link gets the discount applied automatically without needing to type anything. See `STRIPE_INTEGRATION_TODO.md` for the full parameter list.

### Alternative payment path

Below the two Stripe buy buttons, a low-key "Card not working, or prefer another way to pay?" toggle reveals a small request form (`src/components/AuditAltPaymentForm.tsx`). It exists both as a genuine fallback if Stripe is unavailable or misconfigured, and as an alternative for anyone who'd rather not pay by card. It collects name, email, tier, and an optional message, gated behind the same required Terms of Service checkbox as the Stripe path, and posts to `POST /api/audit/alt-payment`, which sends the customer a "payment link on its way" confirmation and an urgent admin email asking the business owner to manually send a Revolut payment link for the correct amount. Nothing about Revolut is automated — no API integration, no stored payment state — the link itself is created and sent by hand, same as report delivery.

### Terms of Service and checkout consent

`src/app/[locale]/terms-of-service/page.tsx` has a new section 20, "Website & Digital Presence Audit — Additional Terms" (anchor `#audit-terms`), covering: the audit is advice and observation, not a guarantee of results or a compliance certification; the 48-hour delivery target with a 10-working-day exceptional-circumstances allowance; the 90-day window to book the included free follow-up; payment via Stripe and the non-refundable-after-delivery policy; and, importantly, the Irish/EU consumer right of cancellation.

Under EU/Irish consumer law, a consumer (someone ordering in a personal capacity, not for their trade or business) normally has a 14-day right to cancel a service before it's completed. Because this audit is meant to be delivered within 48 hours, that right needs to be expressly waived at the point of purchase, with the customer's informed consent, or the business is exposed to cancellation claims after report delivery. `src/components/AuditBuyForm.tsx` implements this: each buy button sits behind a required checkbox ("I agree to the Terms of Service for this audit") directly beneath a plain-language notice ("Delivery starts immediately. Once your report is delivered, you won't be able to cancel."), linking to the new ToS section (opens in a new tab). The checkbox uses native HTML `required` validation, so it works without JavaScript and is enforced again server-side in `/api/stripe/checkout` (rejects the request with no `agreed` field).

This is a reasonable draft, not a substitute for a solicitor's review — worth a quick professional check before relying on it, particularly the cancellation-waiver wording in section 20(f).

### What still needs to be supplied before this can go live

- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- Four Price IDs (website/bundle × launch/standard) — see `.env.local.example`
- A real Stripe Promotion Code named `NEWSLETTER10` (or update `NEWSLETTER_PROMO_CODE` in `src/lib/audit-pricing.ts` to match whatever code is actually created)
- Confirm `AUDIT_LAUNCH_ENDS_AT` against the real deploy date

## Quote form

Not a funnel — a contextual CTA shown only where someone is already reading about a large, project-scoped service (custom software, mobile apps, outsourcing): `/solutions/software` and the two large-project rows on `/pricing`. It links to the homepage quote form, never to `/book` or `/audit`.

## Blog cross-linking

Every post's closing CTA now points at whichever of the three offers actually fits its content, rather than a generic contact form:

| Post | Routed to |
|---|---|
| `accessibility-law-ireland-eaa-guide` | Audit (primary) + consultation (secondary) — was two buttons pointing at the same href |
| `legal-requirements-diy-brand-website` | Audit (primary) + consultation (secondary) — same duplicate-href bug, same fix |
| `web-accessibility-ireland` | Audit |
| `better-digital-presence-that-actually-works` | Audit |
| `is-your-website-helping-your-business-grow` | Audit |
| `website-that-works-for-your-users` | Audit |
| `got-an-idea-turn-it-into-a-real-product` | Consultation |
| `have-an-idea-worth-building` | Consultation |
| `validate-business-idea-design-thinking-value-proposition` | Consultation |
| `turn-business-problem-into-digital-solution` | Quote (unchanged, already correct) |
| `free-expense-tracking-for-irish-sole-traders` | No fit — third-party tool roundup, left as-is |
| `irish-grants-for-app-development` | No fit — no internal CTA today |

Two posts (`accessibility-law-ireland-eaa-guide`, `legal-requirements-diy-brand-website`) had a pre-existing bug where two differently-labelled buttons pointed at the identical `/contact#simple-contact-form` href, and the surrounding copy promised a "free website audit" that no longer exists. Both are fixed: the audit-labelled button now goes to `/audit`, the consultation-labelled button now goes to `/book`, and the copy no longer claims the audit is free.

`building-trust-online-website-needs-more-than-good-design` is an empty, unlinked blog directory with no `page.tsx`. It was flagged during this work but intentionally left alone, since removing it wasn't part of the brief.

## Brief reuse

Audit customers skip the `/brief` hub entirely (its "back to booking" framing doesn't fit someone who never booked a call) and go straight to `/brief/general?context=audit`, linked from both the confirmation email and the thank-you page. That query param swaps two strings in `GeneralBriefForm.tsx`:

- Email hint: "So we can match this to your booking" → "...to your order"
- Success message: "...before our call..." → "...before we start your audit..."

Everything else about `/brief` is unchanged.
