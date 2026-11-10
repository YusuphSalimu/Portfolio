import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  axes: ["wdth"],
  subsets: ["latin"],
  weight: "variable",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yusuph-portfolio.vercel.app"),
  title: {
    default: "Yusuph Salimu — Software Engineer | Full-Stack Developer",
    template: "%s | Yusuph Salimu",
  },
  description: "Software engineer building web platforms, business websites, and backend systems for clients in Tanzania and worldwide.",
  alternates: {
    canonical: "/en",
    languages: { en: "/en", sw: "/sw", fr: "/fr" },
  },
  openGraph: {
    type: "website",
    siteName: "Yusuph Salimu",
    url: "https://yusuph-portfolio.vercel.app",
    images: [{ url: "/images/social-preview.png", width: 1280, height: 640, alt: "Yusuph Salimu — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} ${jetBrainsMono.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
