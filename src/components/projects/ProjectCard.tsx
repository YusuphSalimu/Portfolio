import Image from "next/image";
import Link from "next/link";
import type { ProjectEntry } from "@/lib/projects";
import StatusBadge from "./StatusBadge";

const categoryLabels = {
  web: "Web",
  "data-ml": "Data & ML",
  saas: "SaaS",
  competition: "Competition",
  mobile: "Mobile",
} as const;

export default function ProjectCard({
  project,
  priority = false,
}: {
  project: ProjectEntry;
  priority?: boolean;
}) {
  const visibleStack = project.stack.slice(0, 4);
  const hiddenStackCount = project.stack.length - visibleStack.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`project-card glass-surface group block overflow-hidden rounded-3xl ${
        project.featured ? "project-card--featured" : ""
      }`}
    >
      <article>
        <div className="project-card__image">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 700px"
            priority={priority}
          />
          <div className="project-card__image-overlay" />
          <div className="project-card__badges">
            <StatusBadge status={project.status} />
            {!project.published && <span className="draft-badge">Draft</span>}
          </div>
        </div>
        <div className="project-card__content">
          <div className="project-card__eyebrow">{categoryLabels[project.category]}</div>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <ul className="stack-chips" aria-label="Technology stack">
            {visibleStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {hiddenStackCount > 0 && <li>+{hiddenStackCount}</li>}
          </ul>
          <span className="project-card__link-label">
            View case study <span aria-hidden="true">→</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
