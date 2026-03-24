import type { MetadataRoute } from "next";

const BASE_URL = "https://wemakeit.ie";
const locales = ["en", "it", "ru"] as const;

const pages = [
  "",
  "/blog",
  "/blog/irish-grants-for-app-development",
  "/privacy-policy",
  "/cookie-policy",
  "/terms-of-service",
  "/accessibility-statement",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page.startsWith("/blog/") ? 0.7 : 0.5,
      });
    }
  }

  return entries;
}
