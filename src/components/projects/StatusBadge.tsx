"use client";

import type { ProjectStatus } from "@/lib/projects/schema";
import { useTranslations } from "next-intl";

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const t = useTranslations("projects.status");
  return (
    <span className={`status-badge status-badge--${status}`}>
      {status === "live" && <span aria-hidden="true" className="status-badge__dot" />}
      {t(status)}
    </span>
  );
}
