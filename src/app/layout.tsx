import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: "variable",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/favicon-96.png", type: "image/png", sizes: "96x96" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t;try{t=localStorage.getItem('portfolio-theme')}catch(e){}document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()` }} />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
