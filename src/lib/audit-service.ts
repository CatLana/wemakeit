import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { PageSpeedApiResponse } from "@/lib/audit-transform";

export type AuditStrategy = "mobile" | "desktop";

type CacheEnvelope = {
  savedAt: number;
  data: PageSpeedApiResponse;
};

export type HybridAuditResult = {
  data: PageSpeedApiResponse;
  source: "live" | "cache";
  normalisedUrl: string;
  cacheUntil?: number;
};

const CACHE_TTL_MS = 48 * 60 * 60 * 1000;
// /tmp is the only writable path on Vercel serverless functions
const CACHE_DIR = process.env.VERCEL
  ? "/tmp/audit-results"
  : path.join(process.cwd(), ".next", "cache", "audit-results");

function normaliseAuditUrl(input: string): string {
  let normalised = input.trim();
  if (!/^https?:\/\//i.test(normalised)) {
    normalised = `https://${normalised}`;
  }

  const parsed = new URL(normalised);
  // Strip hash and tracking params for stable cache key
  parsed.hash = "";
  parsed.searchParams.delete("utm_source");
  parsed.searchParams.delete("utm_medium");
  parsed.searchParams.delete("utm_campaign");
  parsed.searchParams.sort();
  return parsed.toString();
}

function cacheFilePath(url: string, strategy: AuditStrategy): string {
  const key = createHash("sha1").update(`${strategy}:${url}`).digest("hex");
  return path.join(CACHE_DIR, `${key}.json`);
}

async function readCache(url: string, strategy: AuditStrategy): Promise<CacheEnvelope | null> {
  const file = cacheFilePath(url, strategy);
  try {
    const raw = await fs.readFile(file, "utf-8");
    const parsed = JSON.parse(raw) as CacheEnvelope;
    if (!parsed?.savedAt || !parsed?.data) return null;
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function writeCache(url: string, strategy: AuditStrategy, data: PageSpeedApiResponse): Promise<void> {
  const file = cacheFilePath(url, strategy);
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const envelope: CacheEnvelope = { savedAt: Date.now(), data };
  await fs.writeFile(file, JSON.stringify(envelope), "utf-8");
}

function buildPageSpeedUrl(url: string, strategy: AuditStrategy): string {
  const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  apiUrl.searchParams.set("url", url);
  apiUrl.searchParams.set("strategy", strategy);
  for (const cat of ["accessibility", "best-practices", "performance", "seo"]) {
    apiUrl.searchParams.append("category", cat);
  }
  if (process.env.PAGESPEED_API_KEY) {
    apiUrl.searchParams.set("key", process.env.PAGESPEED_API_KEY);
  }
  return apiUrl.toString();
}

async function fetchPageSpeed(url: string, strategy: AuditStrategy): Promise<PageSpeedApiResponse> {
  const apiUrl = buildPageSpeedUrl(url, strategy);
  const attempts = [0, 1200, 2600];

  let lastError: Error | null = null;

  for (let i = 0; i < attempts.length; i++) {
    if (attempts[i] > 0) {
      await new Promise((resolve) => setTimeout(resolve, attempts[i]));
    }

    try {
      const res = await fetch(apiUrl, {
        signal: AbortSignal.timeout(45_000),
        next: { revalidate: 0 },
      });

      if (res.ok) {
        return (await res.json()) as PageSpeedApiResponse;
      }

      const detail = await res.text().catch(() => "");
      const retriable = res.status === 429 || res.status >= 500;
      lastError = new Error(`PageSpeed API error ${res.status}${detail ? `: ${detail.slice(0, 220)}` : ""}`);
      if (!retriable) break;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error("Unknown network error");
    }
  }

  throw lastError ?? new Error("PageSpeed request failed");
}

export async function runHybridAudit(
  requestedUrl: string,
  strategy: AuditStrategy,
): Promise<HybridAuditResult> {
  const normalisedUrl = normaliseAuditUrl(requestedUrl);

  try {
    const data = await fetchPageSpeed(normalisedUrl, strategy);
    // Cache write failure (e.g. read-only filesystem) must not discard a successful live result
    try {
      await writeCache(normalisedUrl, strategy, data);
    } catch {
      // non-fatal — continue without caching
    }
    return {
      data,
      source: "live",
      normalisedUrl,
      cacheUntil: Date.now() + CACHE_TTL_MS,
    };
  } catch {
    const cached = await readCache(normalisedUrl, strategy);
    if (cached) {
      return {
        data: cached.data,
        source: "cache",
        normalisedUrl,
        cacheUntil: cached.savedAt + CACHE_TTL_MS,
      };
    }
    throw new Error("No live result and no cached fallback available");
  }
}
