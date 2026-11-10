import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yusuph Salimu — Software Engineer and Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          padding: "76px",
          color: "#f4f2ff",
          background: "radial-gradient(circle at 88% 18%, rgba(79,140,255,.32), transparent 34%), linear-gradient(130deg,#0a0a0f 30%,#17132a 100%)",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        <div style={{ color: "#b7aaff", fontSize: 24, letterSpacing: 4, marginBottom: 26 }}>YUSUPH.DEV</div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05 }}>Yusuph Salimu</div>
        <div style={{ color: "#d0ccdb", fontSize: 34, marginTop: 22 }}>Software Engineer | Full-Stack Developer</div>
        <div style={{ display: "flex", width: 190, height: 8, marginTop: 48, borderRadius: 8, background: "linear-gradient(90deg,#7c5cff,#4f8cff)" }} />
      </div>
    ),
    { ...size },
  );
}
