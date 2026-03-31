import type { MetadataRoute } from "next";

const BASE_URL = "https://www.wemakeit.ie";
const locales = ["en", "it", "ru"] as const;

const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "",                                        priority: 1.0, changeFrequency: "weekly" },
  { path: "/blog",                                   priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog/irish-grants-for-app-development",  priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy-policy",                         priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie-policy",                          priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service",                       priority: 0.3, changeFrequency: "yearly" },
  { path: "/accessibility-statement",                priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
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
