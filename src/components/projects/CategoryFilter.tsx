"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ProjectCategory } from "@/lib/projects/schema";

const categories: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "data-ml", label: "Data & ML" },
  { value: "saas", label: "SaaS" },
  { value: "competition", label: "Competition" },
  { value: "mobile", label: "Mobile" },
];

export default function CategoryFilter({
  activeCategory,
}: {
  activeCategory: ProjectCategory | "all";
}) {
  const router = useRouter();
  const pathname = usePathname();

  function selectCategory(category: ProjectCategory | "all") {
    const query = category === "all" ? "" : `?category=${encodeURIComponent(category)}`;
    router.push(`${pathname}${query}`, { scroll: false });
  }

  return (
    <div className="category-filter" role="group" aria-label="Filter projects by category">
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          aria-pressed={activeCategory === category.value}
          className="category-filter__chip"
          onClick={() => selectCategory(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
