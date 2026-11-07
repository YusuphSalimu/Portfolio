import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yusuph-portfolio.vercel.app",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
