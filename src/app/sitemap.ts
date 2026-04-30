import type { MetadataRoute } from "next";

const BASE_URL = "https://www.wemakeit.ie";
const locales = ["en", "it", "ru"] as const;

const pages: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified: Date;
}[] = [
  { path: "",                                        priority: 1.0, changeFrequency: "weekly",  lastModified: new Date("2026-04-16") },
  { path: "/contact",                                priority: 0.6, changeFrequency: "monthly", lastModified: new Date("2026-04-16") },
  { path: "/pricing",                                priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/blog",                                   priority: 0.8, changeFrequency: "weekly",  lastModified: new Date("2026-03-24") },
  { path: "/blog/irish-grants-for-app-development",  priority: 0.7, changeFrequency: "monthly", lastModified: new Date("2026-03-31") },
  { path: "/blog/free-expense-tracking-for-irish-sole-traders", priority: 0.7, changeFrequency: "monthly", lastModified: new Date("2026-04-26") },
  { path: "/blog/validate-business-idea-design-thinking-value-proposition", priority: 0.7, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services",                               priority: 0.9, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/web-development",               priority: 0.9, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/app-development",               priority: 0.9, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/idea-validation-mvp",           priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/ux-research",                   priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/ux-design",                     priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/app-prototype",                 priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/mobile-app-development",        priority: 0.9, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/ux-accessibility-audit",        priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/software-consultancy",          priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/maintenance-support",           priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/services/localisation",                  priority: 0.7, changeFrequency: "monthly", lastModified: new Date("2026-04-30") },
  { path: "/privacy-policy",                         priority: 0.3, changeFrequency: "yearly",  lastModified: new Date("2025-09-01") },
  { path: "/cookie-policy",                          priority: 0.3, changeFrequency: "yearly",  lastModified: new Date("2025-09-01") },
  { path: "/terms-of-service",                       priority: 0.3, changeFrequency: "yearly",  lastModified: new Date("2025-09-01") },
  { path: "/accessibility-statement",                priority: 0.3, changeFrequency: "yearly",  lastModified: new Date("2025-09-01") },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency, lastModified } of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
