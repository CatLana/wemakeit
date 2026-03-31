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
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent top bar */}
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

        {/* Eyebrow */}
        <div
          style={{
            fontSize: "18px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#22D3EE",
            marginBottom: "24px",
            display: "flex",
          }}
        >
          CUSTOM APP &amp; WEB DEVELOPMENT
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              fontSize: "88px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            We Make
          </span>
          <span
            style={{
              fontSize: "88px",
              fontWeight: 800,
              color: "#22D3EE",
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            IT Happen.
          </span>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: "26px",
            color: "#CBD5E1",
            maxWidth: "680px",
            lineHeight: 1.5,
            marginBottom: "48px",
            display: "flex",
          }}
        >
          Got a business idea? We turn it into a real app or website.
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(34,211,238,0.1)",
            border: "1px solid #22D3EE",
            borderRadius: "999px",
            padding: "10px 24px",
            color: "#22D3EE",
            fontSize: "18px",
            width: "fit-content",
          }}
        >
          🇮🇪 Based in Ireland · 15+ Years Experience
        </div>

        {/* Decorative right side circles */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            opacity: 0.15,
          }}
        >
          {[160, 120, 80].map((size, i) => (
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
