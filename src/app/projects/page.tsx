import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProjects } from "@/lib/projects";
import ProjectsCatalog from "@/components/projects/ProjectsCatalog";

export const metadata: Metadata = {
  title: "Projects — Yusuph Salimu",
  description: "Selected software, data, and product case studies by Yusuph Salimu.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Portfolio / Projects</p>
        <h1>Selected Work</h1>
        <p>Product, engineering, and data projects shaped around real-world problems.</p>
      </header>
      <Suspense fallback={<p className="muted-copy">Loading project filters…</p>}>
        <ProjectsCatalog projects={projects} />
      </Suspense>
    </main>
  );
}
