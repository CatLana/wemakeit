import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0F172A",
          padding: "68px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Cyan top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: "#22D3EE",
            display: "flex",
          }}
        />

        {/* Domain pill â€” top right */}
        <div
          style={{
            position: "absolute",
            top: "32px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "999px",
            padding: "8px 20px",
            color: "#64748B",
            fontSize: "16px",
          }}
        >
          wemakeit.ie
        </div>

        {/* Eyebrow */}
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#22D3EE",
            marginBottom: "18px",
            display: "flex",
          }}
        >
          Web &amp; App Development Â· Ireland
        </div>

        {/* Headline: "We Make IT" */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: "26px",
          }}
        >
          <span
            style={{
              fontSize: "84px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            We Make&nbsp;
          </span>
          <span
            style={{
              fontSize: "84px",
              fontWeight: 800,
              color: "#22D3EE",
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            IT
          </span>
        </div>

        {/* Primary value prop */}
        <div
          style={{
            fontSize: "22px",
            color: "#E2E8F0",
            maxWidth: "740px",
            lineHeight: 1.5,
            marginBottom: "18px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          We help entrepreneurs to grow revenue through building digital solutions.
        </div>

        {/* Hook + summary */}
        <div
          style={{
            fontSize: "18px",
            color: "#64748B",
            maxWidth: "700px",
            lineHeight: 1.55,
            marginBottom: "36px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Need to improve your digital presence or a custom software? We build websites & apps that help your business grow.
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(34,211,238,0.08)",
            border: "1px solid rgba(34,211,238,0.30)",
            borderRadius: "999px",
            padding: "10px 24px",
            color: "#22D3EE",
            fontSize: "16px",
            width: "fit-content",
          }}
        >
          ðŸ‡®ðŸ‡ª Based in Ireland Â· Helping local businesses succeed.
        </div>

        {/* Decorative circles â€” right side */}
        <div
          style={{
            position: "absolute",
            right: "72px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            opacity: 0.1,
          }}
        >
          {[180, 130, 80].map((size, i) => (
            <div
              key={i}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                border: "2px solid #22D3EE",
                display: "flex",
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
