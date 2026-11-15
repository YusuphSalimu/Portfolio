import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Yusuph Salimu — Software Engineer and Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [regular, bold] = await Promise.all([
    readFile(path.join(process.cwd(), "src/assets/fonts/SpaceGrotesk-Regular.ttf")),
    readFile(path.join(process.cwd(), "src/assets/fonts/SpaceGrotesk-Bold.ttf")),
  ]);
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
          color: "#edf5f4",
          background: "radial-gradient(circle at 88% 18%, rgba(124,228,200,.2), transparent 40%), linear-gradient(130deg,#0b151b 30%,#16372f 100%)",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        <div style={{ color: "#7ce4c8", fontSize: 28, letterSpacing: 2, marginBottom: 26 }}>&lt;yusuph.dev/&gt;</div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -1.52, lineHeight: 1.05 }}>Yusuph Salimu</div>
        <div style={{ color: "#a5bac2", fontSize: 34, marginTop: 22 }}>Software Engineer | Full-Stack Developer</div>
        <div style={{ display: "flex", width: 190, height: 8, marginTop: 48, borderRadius: 8, background: "linear-gradient(90deg,#7ce4c8,#398875)" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: regular, weight: 400, style: "normal" },
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
