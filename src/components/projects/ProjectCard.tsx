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
  const visibleStack = project.stack.slice(0, 3);
  const hiddenStackCount = project.stack.length - visibleStack.length;

  return (
    <motion.div
      className={`project-grid__item${project.featured ? " project-grid__item--featured" : ""}`}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.35, delay: reducedMotion ? 0 : delay }}
    >
      <article className="project-card glass-surface">
        <div className="project-card__image">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            priority={priority}
          />
          <div className="project-card__image-overlay" />
          <div className="project-card__badges">
            <StatusBadge status={project.status} />
            {!project.published && <span className="draft-badge">Draft</span>}
          </div>
          {project.client && <span className="project-card__client">{project.client.name}</span>}
        </div>
        <div className="project-card__content">
          <div className="project-card__eyebrow">{categoryLabels[project.category]}</div>
          <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
          <p className="project-card__ownership">{project.client ? "Client project" : "Own project"}</p>
          <p className="project-card__summary">{project.summary}</p>
          <p className="project-card__role">{project.role}</p>
          <ul className="stack-chips" aria-label="Technology stack">
            {visibleStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {hiddenStackCount > 0 && <li>+{hiddenStackCount}</li>}
          </ul>
          <div className="project-card__actions">
            <Link href={`/projects/${project.slug}`} className="button button--primary">
              View case study <span aria-hidden="true">→</span>
            </Link>
            {project.liveUrl && (
              <a className="button" href={project.liveUrl} target="_blank" rel="noreferrer">
                Visit site <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
}
