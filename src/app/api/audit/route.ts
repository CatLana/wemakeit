import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  url: z.string().url({ message: "A valid URL is required" }),
  strategy: z.enum(["mobile", "desktop"]).default("mobile"),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }

  const { url, strategy } = parsed.data;

  const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  apiUrl.searchParams.set("url", url);
  apiUrl.searchParams.set("strategy", strategy);
  for (const cat of ["accessibility", "best-practices", "performance", "seo"]) {
    apiUrl.searchParams.append("category", cat);
  }
  if (process.env.PAGESPEED_API_KEY) {
    apiUrl.searchParams.set("key", process.env.PAGESPEED_API_KEY);
  }

  const upstream = await fetch(apiUrl.toString(), {
    // PageSpeed audits can take up to 30 s
    signal: AbortSignal.timeout(45_000),
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return NextResponse.json(
      { error: `PageSpeed API returned ${upstream.status}`, detail: text },
      { status: 502 },
    );
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}
