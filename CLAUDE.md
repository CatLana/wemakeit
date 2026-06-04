# CLAUDE.md

## Purpose

Use this file as the stable instruction prefix for Claude-driven work in this repository. Keep it concise and avoid churn so prompt caching has a better chance of hitting across repeated requests.

## Project

- Name: We Make IT
- Market: Ireland first, EU second
- Tone: warm, direct, conversational, no buzzwords
- Stack: Next.js 16 App Router, TypeScript strict mode, Tailwind CSS v4, Radix UI, shadcn, next-intl 4, react-hook-form, zod
- Locale model: English only, routed under `en`

## Core commands

```bash
npm run dev
npm run build
npm run lint
```

`npm run build` and `npm run lint` must pass before shipping changes.

## Codebase rules

- Use `@/*` for imports from `src/*`
- Keep TypeScript strict, do not introduce `any`
- Server Components by default, add `"use client"` only when needed
- Do not import navigation helpers from `next/link` or `next/navigation`, use `@/i18n/navigation`
- All user-visible copy belongs in `messages/en.json`, do not hardcode strings in JSX
- Generate only British English copy aimed at Irish businesses
- No em dashes, no emoji, no corporate jargon
- API routes must validate request bodies with Zod before processing
- Do not expose secrets in client code or committed files

## Design and content rules

- Use semantic HTML and visible focus styles
- Decorative icons must be `aria-hidden`
- Icon-only controls need `aria-label`
- Follow existing brand tokens and layout patterns
- Write headings in sentence case
- Prefer short, clear sentences over clever copy
- Avoid these words in user-facing copy: leverage, utilise, robust, seamless, game-changing, transformative, elevate, empower, streamline

## Working style

- Make the smallest change that solves the problem at the root
- Prefer targeted reads over broad repo exploration
- After the first real edit, run the narrowest useful validation immediately
- Do not revert user changes you did not make
- Preserve existing style and public APIs unless the task requires a change

## API usage

For any Claude API work in this repo: use prompt caching for interactive requests, and the Message Batches API for bulk offline jobs.

## Files to keep in sync

- `.github/copilot-instructions.md`
- `messages/en.json`
- any relevant `.github/instructions/*.md` file when adding or editing matching files