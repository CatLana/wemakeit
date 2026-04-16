---
description: "Use when creating or editing React components for this project. Covers client vs server component rules, brand tokens, accessibility, icons, and TypeScript conventions."
applyTo: "src/components/**/*.tsx"
---

# Component Guidelines

## Client vs Server

- Components are **Server Components by default**. Do NOT add `"use client"` unless the component uses state, effects, event handlers, browser APIs, or third-party client-only hooks.
- When adding `"use client"`, place it as the very first line of the file (before all imports).

## File Conventions

- One component per file; filename matches the exported component name (PascalCase).
- All components live under `src/components/`. Section-level components go in `src/components/sections/`, layout in `src/components/layout/`, reusable UI in `src/components/ui/` (shadcn).
- Export as named export, not default, for `src/components/ui/`. Default export for sections and layout components.

## TypeScript

- `strict: true` — no `any`, no `as any`.
- Use explicit prop interfaces; prefer `interface` over `type` for component props.
- Never cast away type errors; fix them properly.

## Styling

- Tailwind CSS v4 only — no inline `style={{}}` unless Tailwind cannot express the value (e.g. `willChange`, `--custom-css-var`).
- Use `cn()` from `@/lib/utils` for conditional class merging.
- Brand tokens (always use exact hex values — do not guess new colours):

| Purpose | Value |
|---------|-------|
| CTA buttons / links / focus rings | `#22D3EE` |
| Dark backgrounds (header, footer) | `#0F172A` |
| Body text | `#1E293B` |
| Light section backgrounds | `#F8FAFC` |
| Accent (use sparingly) | `#A855F7` |

- Focus ring standard (all interactive elements): `outline-2 outline-[#22D3EE] outline-offset-2`
- Font: `font-sans` (resolves to Inter via `--font-inter`).

## Icons

- Use `lucide-react` only. Tree-shaking is handled via `optimizePackageImports` in `next.config.ts` — import directly: `import { ArrowRight } from "lucide-react"`.
- Decorative icons: `aria-hidden="true"`.
- Icon-only interactive elements: `aria-label="..."` on the button/link, not on the icon.

## i18n in Components

- Translations via `next-intl`. Server components: `import { useTranslations } from "next-intl"`. Client components: same import but must also be inside a next-intl provider (already configured globally).
- Never hardcode user-visible strings in JSX. All copy goes through the translation system.
- Navigation: **never** import from `next/link` or `next/navigation`. Always use `@/i18n/navigation`:
  ```ts
  import { Link, usePathname, useRouter } from "@/i18n/navigation";
  ```

## Accessibility (WCAG 2.1 AA)

- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<button>` — never `<div onClick>`.
- All images: meaningful `alt` text.
- Interactive elements: visible focus styles (brand focus ring).
- Modal/drawer: `role="dialog"`, `aria-modal="true"`, focus trap, restore focus on close.

## Forms

- Use `react-hook-form` + zod for all forms.
- Validation schemas live in the same file as the form component (or in `@/lib/` if reused).
- Error messages come from translation files, not hardcoded strings.
