"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/routing";
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
  delay = 0,
}: {
  project: ProjectEntry;
  priority?: boolean;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  const visibleStack = project.stack.slice(0, 4);
  const hiddenStackCount = project.stack.length - visibleStack.length;

  return (
    <motion.div
      className={`project-grid__item${project.featured ? " project-grid__item--featured" : ""}`}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reducedMotion ? undefined : { y: -4, rotateX: 1, rotateY: -1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.35, delay: reducedMotion ? 0 : delay }}
      style={{ transformPerspective: 1000 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-card glass-surface group block overflow-hidden rounded-3xl"
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
    </motion.div>
  );
}
