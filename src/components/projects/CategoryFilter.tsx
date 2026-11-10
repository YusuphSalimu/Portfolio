"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { ProjectCategory } from "@/lib/projects/schema";

const categories: (ProjectCategory | "all")[] = ["all", "web", "data-ml", "saas", "competition", "mobile"];

export default function CategoryFilter({
  activeCategory,
}: {
  activeCategory: ProjectCategory | "all";
}) {
  const t = useTranslations("projects.categories");
  const router = useRouter();
  const pathname = usePathname();

  function selectCategory(category: ProjectCategory | "all") {
    const query = category === "all" ? "" : `?category=${encodeURIComponent(category)}`;
    router.push(`${pathname}${query}`, { scroll: false });
  }

  return (
    <div className="category-filter" role="group" aria-label={t("filterLabel")}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={activeCategory === category}
          className="category-filter__chip"
          onClick={() => selectCategory(category)}
        >
          {t(category)}
        </button>
      ))}
    </div>
  );
}
