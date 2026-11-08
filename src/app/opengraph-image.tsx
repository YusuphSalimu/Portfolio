import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(120deg, #7C5CFF 0%, #4F8CFF 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: 48,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: 32,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(10,10,15,0.35)",
            padding: 72,
            boxShadow: "0 0 40px rgba(124,92,255,0.25)",
          }}
        >
          <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", opacity: 0.8 }}>
            Yusuph Salimu
          </div>
          <div style={{ fontSize: 66, fontWeight: 700, marginTop: 20 }}>Software Engineer</div>
          <div style={{ fontSize: 48, fontWeight: 500, opacity: 0.9 }}>Full-Stack Developer</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
