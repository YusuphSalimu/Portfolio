import type { Metadata } from "next";
import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getAllProjects } from "@/lib/projects";
import ProjectsCatalog from "@/components/projects/ProjectsCatalog";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Projects",
    description: "Selected software, data, and product case studies by Yusuph Salimu.",
    alternates: {
      canonical: `/${locale}/projects`,
      languages: { en: "/en/projects", sw: "/sw/projects", fr: "/fr/projects" },
    },
  };
}

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const projects = getAllProjects();
  return (
    <main className="page-shell" id="main-content">
      <header className="page-heading">
        <p className="eyebrow">Portfolio / Projects</p>
        <h1>{t("title")}</h1>
        <p>{t("intro")}</p>
      </header>
      <Suspense fallback={<p className="muted-copy">Loading project filters…</p>}>
        <ProjectsCatalog projects={projects} />
      </Suspense>
    </main>
  );
}
