import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  // Load Inter Variable font bundled alongside this route file.
  // Satori (used by ImageResponse) requires TTF/OTF — woff2 is not supported.
  const fontData = await fetch(
    new URL("./Inter-Variable.ttf", import.meta.url)
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#0F172A",
          fontFamily: "'Inter', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cyan top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            background: "#22D3EE",
            display: "flex",
          }}
        />

        {/* Decorative circles — bottom right, subtle */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            border: "2px solid #22D3EE",
            opacity: 0.08,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            right: "-20px",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            border: "2px solid #22D3EE",
            opacity: 0.12,
            display: "flex",
          }}
        />

        {/* Domain pill — top right */}
        <div
          style={{
            position: "absolute",
            top: "36px",
            right: "72px",
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "999px",
            padding: "8px 22px",
            color: "#64748B",
            fontSize: "17px",
            letterSpacing: "0.04em",
          }}
        >
          wemakeit.ie
        </div>

        {/* Main content — vertically centred */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingLeft: "80px",
            paddingRight: "80px",
            paddingTop: "28px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#22D3EE",
              marginBottom: "24px",
              display: "flex",
            }}
          >
            Web &amp; App Development &nbsp;&middot;&nbsp; Ireland
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                fontSize: "96px",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1,
                display: "flex",
                letterSpacing: "-0.02em",
              }}
            >
              We Make&nbsp;
            </span>
            <span
              style={{
                fontSize: "96px",
                fontWeight: 800,
                color: "#22D3EE",
                lineHeight: 1,
                display: "flex",
                letterSpacing: "-0.02em",
              }}
            >
              IT
            </span>
          </div>

          {/* Value prop — single line */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "#94A3B8",
              lineHeight: 1.4,
              marginBottom: "40px",
              display: "flex",
            }}
          >
            Websites &amp; Apps for Irish Businesses
          </div>

          {/* Cyan accent divider */}
          <div
            style={{
              width: "64px",
              height: "3px",
              background: "#22D3EE",
              borderRadius: "99px",
              marginBottom: "28px",
              display: "flex",
            }}
          />

          {/* Bottom tag */}
          <div
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#475569",
              letterSpacing: "0.04em",
              display: "flex",
            }}
          >
            Based in Ireland&nbsp;&nbsp;|&nbsp;&nbsp;15+ Years Experience&nbsp;&nbsp;|&nbsp;&nbsp;Free Quote
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
