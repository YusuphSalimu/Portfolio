import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yusuph-portfolio.vercel.app";
  const locales = ["en", "sw", "fr"] as const;
  const projects = getAllProjects({ environment: "production" });
  return [
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(locales.map((alternate) => [alternate, `${baseUrl}/${alternate}`])),
      },
    })),
    ...locales.flatMap((locale) => [
      {
        url: `${baseUrl}/${locale}/projects`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      ...projects.map((project) => ({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alternate) => [alternate, `${baseUrl}/${alternate}/projects/${project.slug}`]),
          ),
        },
      })),
    ]),
  ];
}
