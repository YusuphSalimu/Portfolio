"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { Link } from "@/i18n/routing";
import type { ProjectEntry } from "@/lib/projects";
import StatusBadge from "./StatusBadge";
import { useTranslations } from "next-intl";

export default function ProjectCard({
  project,
  priority = false,
  delay = 0,
}: {
  project: ProjectEntry;
  priority?: boolean;
  delay?: number;
}) {
  const reducedMotion = useReducedMotionPreference();
  const t = useTranslations("projects");
  const preview = project.screenshots?.[0] ?? project.heroImage;
  const visibleStack = project.stack.slice(0, 3);
  const hiddenStackCount = project.stack.length - visibleStack.length;

  return (
    <motion.div
      className={`project-grid__item${project.featured ? " project-grid__item--featured" : ""}`}
      initial={reducedMotion ? false : { y: 18 }}
      whileInView={reducedMotion ? undefined : { y: 0 }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.35, delay: reducedMotion ? 0 : delay }}
    >
      <article className="project-card glass-surface">
        <Link className="project-card__preview" href={`/projects/${project.slug}`} aria-label={`${t("caseStudy")}: ${project.title}`} tabIndex={-1}>
          <div className="preview-chrome" aria-hidden="true"><span><i /><i /><i /></span><span>{project.liveUrl ? new URL(project.liveUrl).hostname : project.slug}</span><span>↗</span></div>
          <div className="project-card__image">
          <Image
            src={preview.src}
            alt={preview.alt}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            priority={priority}
          />
          </div>
        </Link>
        <div className="project-card__content">
          <div className="project-card__meta">
            <span className="project-card__eyebrow">{t(`categories.${project.category}`)}</span>
            <StatusBadge status={project.status} />
            {!project.published && <span className="draft-badge">Draft</span>}
          </div>
          <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
          <p className="project-card__ownership">{project.client ? `${t("clientProject")} · ${project.client.name}` : t("ownProject")}</p>
          <p className="project-card__summary">{project.summary}</p>
          <p className="project-card__role" title={project.role}>{project.role}</p>
          <ul className="stack-chips" aria-label="Technology stack">
            {visibleStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {hiddenStackCount > 0 && <li>+{hiddenStackCount}</li>}
          </ul>
          <div className="project-card__actions">
            <Link href={`/projects/${project.slug}`} className="button button--primary">
              {t("caseStudy")} <span aria-hidden="true">→</span>
            </Link>
            {project.liveUrl && (
              <a className="button" href={project.liveUrl} target="_blank" rel="noreferrer">
                {t("visitSite")} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
}
