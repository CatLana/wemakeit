# We Make IT

Website for **We Make IT**, an Irish web and app development agency based in Ashbourne, Co. Meath. The site targets Irish businesses and entrepreneurs looking to build or modernise their digital presence.

Live: [wemakeit.ie](https://www.wemakeit.ie)

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, SSG) |
| Language | TypeScript 5, strict mode |
| Styling | Tailwind CSS v4 |
| UI | Radix UI + shadcn/ui |
| Icons | lucide-react |
| i18n | next-intl 4, single locale: `en` (British English) |
| Forms | react-hook-form + zod |
| Email | Resend |
| Newsletter DB | Google Sheets via googleapis |
| Deployment | Vercel |

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build (must pass before any commit)
npm run lint     # ESLint (must be 0 errors, 0 warnings)
```

## Project structure

```
src/
  app/
    [locale]/        # all pages (locale is always "en")
      page.tsx       # home
      blog/          # blog posts
      services/      # service pages
      solutions/     # solution pages
      pricing/
      about/
      contact/
      audit/
    api/             # API routes (Zod-validated)
  components/
    layout/          # Header, Footer
    sections/        # page sections (Hero, Services, etc.)
    ui/              # shadcn components
  i18n/              # next-intl routing config
  lib/               # utilities
messages/
  en.json            # all user-visible copy (British English)
```

## Locale

The site is English-only, targeting Ireland and the EU. All copy is in British English (colour, organise, licence as a noun, etc.). The `[locale]` segment in the URL exists because of next-intl routing, but only `en` is active.

All user-visible text lives in `messages/en.json`. Never hardcode strings in components; always use `useTranslations`.

## Content guidelines

See `.github/instructions/content.instructions.md` for the full writing rules all contributors (human and AI) must follow.

Short version:
- British English throughout
- Warm, conversational tone aimed at Irish business owners
- No em dashes; use commas, colons, or a new sentence instead
- No emojis in page content or components
- No AI-sounding buzzwords (leverage, robust, seamless, cutting-edge, etc.)
- Write as a knowledgeable person talking to a friend, not as a marketing bot

## Environment variables

```
RESEND_API_KEY
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
GOOGLE_SHEET_ID
```

## Deployment

Deployed on Vercel. Every push to `master` triggers a production build.
