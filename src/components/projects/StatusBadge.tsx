import type { ProjectStatus } from "@/lib/projects/schema";

const labels: Record<ProjectStatus, string> = {
  live: "Live",
  "case-study": "Case study",
  competition: "Competition",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {status === "live" && <span aria-hidden="true" className="status-badge__dot" />}
      {labels[status]}
    </span>
  );
}
