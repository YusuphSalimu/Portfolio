"use client";

import { useSearchParams } from "next/navigation";
import type { ProjectCategory } from "@/lib/projects/schema";
import CategoryFilter from "./CategoryFilter";
import ProjectGrid from "./ProjectGrid";
import type { ProjectEntry } from "@/lib/projects";

const categories: ProjectCategory[] = ["web", "data-ml", "saas", "competition", "mobile"];

export default function ProjectsCatalog({ projects }: { projects: ProjectEntry[] }) {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const activeCategory = categories.includes(requestedCategory as ProjectCategory)
    ? (requestedCategory as ProjectCategory)
    : "all";
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <CategoryFilter activeCategory={activeCategory} />
      <ProjectGrid projects={filteredProjects} />
    </>
  );
}
