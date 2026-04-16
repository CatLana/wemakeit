# We Make IT — Copilot Workspace Instructions

## Project

**We Make IT** is an Irish web & app development agency based in Ashbourne, Co. Meath, Ireland. We serve both early-stage startups (idea → MVP) and SMEs wanting to modernise. Target markets: IE, IT, CH, RU, EU. Brand tone is **warm and conversational** — never corporate jargon, never overly technical.

Site: https://www.wemakeit.ie  
Founder: Svetlana Savchenko

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, SSG) |
| Language | TypeScript 5 — `strict: true`, no `any` |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI + shadcn (`@/components/ui/`) |
| Icons | lucide-react (tree-shaken via `optimizePackageImports`) |
| i18n | next-intl 4 — 3 locales: `en` (default), `it`, `ru` |
| Forms | react-hook-form + zod |
| Email | Resend (from: `"We Make IT <onboarding@resend.dev>"`) |
| Newsletter DB | Google Sheets via googleapis |
| Deployment | Vercel |

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build (must pass before any commit)
npm run lint     # ESLint (must be 0 errors, 0 warnings)
```

## Path Alias

`@/*` → `./src/*`

## i18n Rules (Critical)

- **Always update all three files** — `messages/en.json`, `messages/it.json`, `messages/ru.json` — when adding or changing any user-visible text.
- `en.json` is the canonical source of truth; all three files must have identical key structure.
- Key naming: camelCase, nested by section (e.g. `hero.h1`, `services.heading`).
- In components, use `useTranslations("section")` (Server Components) or `useTranslations` from `next-intl` (Client Components).
- **Never** import `Link`, `usePathname`, or `useRouter` from `next/link` or `next/navigation`. Always use `@/i18n/navigation` instead (locale-aware wrappers).

## Server vs Client Components

- Components are **Server Components by default** — no `"use client"` unless needed.
- Add `"use client"` only when the component uses: state, effects, event handlers, browser APIs, or third-party hooks.
- The Contact section is lazy-loaded via `next/dynamic` — keep it `"use client"`.
- `useSearchParams()` always requires `<Suspense>` boundary in a parent Server Component.

## Brand Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `#22D3EE` | Cyan 400 | CTA buttons, links, focus rings, icons |
| `#0F172A` | Slate 950 | Dark background (header, footer, dark sections) |
| `#1E293B` | Slate 800 | Body text |
| `#F8FAFC` | Slate 50 | Light section backgrounds |
| `#A855F7` | Purple 500 | Accent only (use sparingly) |

Focus ring standard: `outline-2 outline-[#22D3EE] outline-offset-2`

Font: Inter via CSS var `--font-inter` → Tailwind class `font-sans`.

## Accessibility (WCAG 2.1 AA)

- All interactive elements must have visible focus styles (use brand focus ring above).
- Images: always include meaningful `alt` text.
- Icon-only buttons: include `aria-label`.
- Decorative icons: `aria-hidden="true"`.
- Use semantic HTML — `<nav>`, `<main>`, `<section>`, `<article>`, `<button>` not `<div onClick>`.

## Security

- All API routes validate request bodies with Zod before any processing.
- No secrets in client components or committed files.
- Required env vars: `RESEND_API_KEY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`.

## Planned Features (upcoming work)

- **Pricing page** — transparent pricing tiers for services
- **Individual service pages** — one page per service, SEO-focused (e.g. `/services/web-development`, `/services/mobile-app-development`)
- **More blog posts** — long-form SEO content targeting Irish/EU market keywords

Keep these in mind when suggesting architecture — e.g. new pages go under `src/app/[locale]/`, new sections follow existing section patterns in `src/components/sections/`.
