import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { runHybridAudit } from "@/lib/audit-service";

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

  try {
    const result = await runHybridAudit(url, strategy);
    return NextResponse.json({
      source: result.source,
      cacheUntil: result.cacheUntil,
      data: result.data,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Audit provider unavailable and no cached fallback exists.",
      },
      { status: 503 },
    );
  }
}
