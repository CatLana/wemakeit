---
description: "Use when creating new pages, blog posts, or service pages. Covers generateMetadata, JSON-LD, OG image, sitemap, robots, and SEO keyword strategy for the Irish/EU market."
---

# SEO & New Page Guidelines

## Page Location

All pages go under `src/app/[locale]/`:
```
src/app/[locale]/
  services/
    web-development/page.tsx
    mobile-app-development/page.tsx
  pricing/page.tsx
  blog/
    [slug]/page.tsx
```

## generateMetadata Pattern

Copy from an existing page (e.g. `src/app/[locale]/blog/page.tsx`). Key rules:

```tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageName" });
  const BASE_URL = "https://www.wemakeit.ie";

  return {
    title: t("title"),           // renders as "Page Title | We Make IT"
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/page-path`,
      languages: {
        "en": `${BASE_URL}/en/page-path`,
        "it": `${BASE_URL}/it/page-path`,
        "ru": `${BASE_URL}/ru/page-path`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}/page-path`,
      siteName: "We Make IT",
      locale: locale === "en" ? "en_IE" : locale === "it" ? "it_IT" : "ru_RU",
      images: [{ url: `${BASE_URL}/api/og`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}
```

Always call `setRequestLocale(locale)` at the top of the page component (enables SSG):
```tsx
import { setRequestLocale } from "next-intl/server";
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  // ...
}
```

## Static Generation (generateStaticParams)

Every new page needs `generateStaticParams` to pre-render all 3 locales:
```tsx
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "ru" }];
}
```

## JSON-LD Structured Data

Add per-page JSON-LD for service pages and blog articles:

**Blog article:**
```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "Svetlana Savchenko" },
  "publisher": { "@type": "Organization", "name": "We Make IT", "url": "https://www.wemakeit.ie" },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
};
```

**Service page:**
```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "...",
  "provider": { "@type": "Organization", "name": "We Make IT", "url": "https://www.wemakeit.ie" },
  "areaServed": ["IE", "IT", "CH", "RU"],
};
```

Inject with:
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

## Sitemap & Robots

`src/app/sitemap.ts` and `src/app/robots.ts` already exist — add new route paths to `sitemap.ts` manually when adding new pages.

## SEO Keyword Strategy

Target market: **Ireland-first**, then EU (IT, CH) and tech diaspora (RU).

Primary keyword patterns for service pages:
- `[service] ireland` — "web app development ireland", "mobile app developer ireland"
- `[service] dublin` / `[service] meath` for local SEO
- `mvp development`, `startup app developer`, `idea to app`, `custom software ireland`
- Italian variants: `sviluppo app irlanda`, `sviluppo web irlanda`

For blog posts:
- Long-tail: "how to get funding for app development ireland", "best way to build an mvp"
- Question-form h2 headings — these appear in Google's People Also Ask
- Include external links to .gov.ie, Enterprise Ireland, etc. for authority

## Content Tone

Warm and conversational — talk to the reader like a smart friend, not a corporate brochure. Short paragraphs, plain language, specific examples over abstract claims.
