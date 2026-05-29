# We Make IT — Copilot Workspace Instructions

## Project

**We Make IT** is an Irish web and app development agency based in Ashbourne, Co. Meath, Ireland. We work with early-stage startups (idea to MVP) and SMEs wanting to modernise their digital presence. Primary market: Ireland, with clients also in the EU.

Brand tone: warm and conversational. Write the way a knowledgeable person would talk to a friend who runs a small business. Never use corporate jargon or marketing buzzwords.

Site: https://www.wemakeit.ie  
Founder: Svetlana Savchenko

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, SSG) |
| Language | TypeScript 5, `strict: true`, no `any` |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI + shadcn (`@/components/ui/`) |
| Icons | lucide-react (tree-shaken via `optimizePackageImports`) |
| i18n | next-intl 4, single locale: `en` (British English) |
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

## i18n Rules

The site is **English-only**. The `[locale]` URL segment exists because of next-intl routing but only `en` is active.

- All user-visible text lives in `messages/en.json`. Never hardcode strings in JSX; always use `useTranslations`.
- Key naming: camelCase, nested by section (e.g. `hero.h1`, `services.heading`).
- In Server Components: `import { useTranslations } from "next-intl"`. In Client Components: same import.
- **Never** import `Link`, `usePathname`, or `useRouter` from `next/link` or `next/navigation`. Always use `@/i18n/navigation` (locale-aware wrappers).
- `generateStaticParams` returns `[{ locale: "en" }]` only.
- `alternates.canonical` and `openGraph.url` use `/en/page-path`. No `alternates.languages` with multiple locales.

## Server vs Client Components

- Components are **Server Components by default**. No `"use client"` unless needed.
- Add `"use client"` only when the component uses: state, effects, event handlers, browser APIs, or third-party hooks.
- The Contact section is lazy-loaded via `next/dynamic`. Keep it `"use client"`.
- `useSearchParams()` always requires a `<Suspense>` boundary in a parent Server Component.

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
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<button>`, not `<div onClick>`.

## Security

- All API routes validate request bodies with Zod before any processing.
- No secrets in client components or committed files.
- Required env vars: `RESEND_API_KEY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`.

## Content Writing Rules (apply to ALL generated copy)

These rules apply to every piece of text written for this project, including page copy, blog posts, email templates, button labels, metadata descriptions, and any other user-visible content. AI agents must follow these rules without exception.

### Language and spelling
- **British English** throughout: colour, organise, licence (noun), practise (verb), recognise, centre, programme, catalogue, travelling, etc.
- Write for an Irish audience. References to grants, regulations, or location should use Ireland as the default.

### Tone
- Warm and direct. Imagine explaining something to a smart friend who runs a small business — not to an investor, not to a regulator.
- Use contractions naturally: we're, it's, you'll, that's, don't, won't.
- Vary sentence length. Short punchy sentences work well for impact. Longer ones are fine when you need to explain something.
- Avoid passive voice where active is natural.

### Punctuation
- **No em dashes (—)**. Use a comma, colon, semicolon, parentheses, or start a new sentence instead.
- No en dashes as substitutes for em dashes either.
- No exclamation marks except in clear call-to-action contexts (e.g. "Let's talk!").
- Use straight apostrophes in JSX: `&apos;` or the literal `'`.

### Forbidden words and phrases
Never use any of the following. They read as AI-generated and undermine trust:
- leverage, utilise (use "use" instead)
- robust, cutting-edge, state-of-the-art, best-in-class
- seamless, seamlessly
- game-changer, game-changing
- transformative, revolutionise, disruptive
- elevate, unlock potential, harness the power of
- tailor-made (use "built for you" or "custom")
- ensure (use "make sure" or rewrite the sentence)
- streamline (use "simplify" or "make faster")
- dive in, delve into
- it's worth noting, importantly (just say the thing)
- in today's digital landscape / in the ever-evolving landscape
- navigate the complexities
- empower (use "help" or "give you the tools to")
- scalable solution (say what it actually does instead)
- at the end of the day
- touch base, circle back
- going forward (just use "from now on" or restructure)

### Emojis
- **No emojis** in any page content, component JSX, email templates, or metadata.
- Emojis are allowed only in developer-facing code comments and commit messages.

### Headlines and headings
- Sentence case for all headings: "How we work" not "How We Work".
- No full stops at the end of headings.
- Make headings informative, not clever. The reader should know what the section is about from the heading alone.

### Lists
- Bullet points end without a full stop if each item is a fragment; they end with a full stop if each item is a full sentence.
- Be consistent within a list.

### Metadata (title, description, OG)
- Titles: "Page name | We Make IT" format.
- Descriptions: 140-160 characters, written as a plain sentence, no em dashes.
- OG descriptions can be slightly more conversational but still no buzzwords.

## Planned Features (upcoming work)

- More blog posts: long-form SEO content targeting Irish and EU market keywords

New pages go under `src/app/[locale]/`. New sections follow the existing pattern in `src/components/sections/`.
