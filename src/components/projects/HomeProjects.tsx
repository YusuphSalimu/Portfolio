"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ProjectEntry } from "@/lib/projects";
import type { ProjectCategory } from "@/lib/projects/schema";
import ProjectGrid from "./ProjectGrid";

export default function HomeProjects({ projects }: { projects: ProjectEntry[] }) {
  const t = useTranslations("projects");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const categories = ["all", ...new Set(projects.map((project) => project.category))] as const;
  const visible = category === "all" ? projects : projects.filter((project) => project.category === category);
  return (
    <>
      <div className="category-filter" role="group" aria-label={t("categories.filterLabel")}>
        {categories.map((value) => <button type="button" className="category-filter__chip" key={value}
          aria-pressed={category === value} onClick={() => setCategory(value)}>
          {t(`categories.${value}`)} <span>{value === "all" ? projects.length : projects.filter((project) => project.category === value).length}</span>
        </button>)}
      </div>
      <div id="projects-grid"><ProjectGrid projects={visible} variant="standard" /></div>
      <span className="visually-hidden" role="status">{t("resultCount", { count: visible.length })}</span>
    </>
  );
}
