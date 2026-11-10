import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/routing";
import ProjectGallery from "@/components/projects/ProjectGallery";
import StatusBadge from "@/components/projects/StatusBadge";
import { getAllProjects, getProject } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects({ environment: "production" }).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug, { environment: "production" });
  if (!project) return {};

  const description = project.seo?.description ?? project.summary;
  const canonical = `/${locale}/projects/${project.slug}`;
  const localizedUrls = {
    en: `/en/projects/${project.slug}`,
    sw: `/sw/projects/${project.slug}`,
    fr: `/fr/projects/${project.slug}`,
  };
  return {
    title: `${project.title} — Yusuph Salimu`,
    description,
    alternates: { canonical, languages: localizedUrls },
    openGraph: {
      type: "article",
      title: project.title,
      description,
      url: canonical,
      images: [{ url: project.heroImage.src, alt: project.heroImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [project.heroImage.src],
    },
  };
}

const categoryLabels = {
  web: "Web",
  "data-ml": "Data & ML",
  saas: "SaaS",
  competition: "Competition",
  mobile: "Mobile",
} as const;

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("common");
  const project = getProject(slug, { environment: "production" });
  if (!project) notFound();

  const projects = getAllProjects({ environment: "production" });
  const currentIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="page-shell case-study" id="main-content">
      <Link href="/projects" className="back-link">
        <span aria-hidden="true">←</span> All projects
      </Link>
      <div className="case-study__hero">
        <Image src={project.heroImage.src} alt={project.heroImage.alt} fill priority sizes="(max-width: 900px) 100vw, 1200px" />
        <div className="case-study__hero-shade" />
        <div className="case-study__hero-copy">
          <div className="case-study__badges"><StatusBadge status={project.status} /></div>
          <p className="eyebrow">{categoryLabels[project.category]}</p>
          <h1>{project.title}</h1>
          <p className="case-study__summary">{project.summary}</p>
        </div>
      </div>

      {locale !== "en" && <p className="language-note">{t("englishOnlyNote")}</p>}

      <div className="case-study__actions">
        {project.status === "live" && project.liveUrl && <a className="button button--primary" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project <span aria-hidden="true">↗</span></a>}
        {project.repoUrl && <a className="button" href={project.repoUrl} target="_blank" rel="noreferrer">Repository <span aria-hidden="true">↗</span></a>}
        {project.videoUrl && <a className="button" href={project.videoUrl} target="_blank" rel="noreferrer">Watch demo <span aria-hidden="true">↗</span></a>}
      </div>

      <section className="case-study__facts" aria-label="Project details">
        <div><h2>Role</h2><p>{project.role}</p></div>
        <div><h2>Year</h2><p>{project.year}</p></div>
        {project.client && <div><h2>Client</h2><p>{project.client.name}</p></div>}
        <div className="case-study__stack">
          <h2>Stack</h2>
          <ul className="stack-chips">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      {project.metrics?.some((metric) => metric.verified) && (
        <section className="case-study__metrics" aria-label="Verified project metrics">
          {project.metrics.filter((metric) => metric.verified).map((metric) => (
            <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
          ))}
        </section>
      )}
      {project.features && project.features.length > 0 && (
        <section className="case-study__features"><h2>Highlights</h2><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
      )}
      <article className="mdx-content"><MDXRemote source={project.body} /></article>
      {project.demoVideoSrc && (
        <section className="case-study__media">
          <h2>Product demo</h2>
          <video controls preload="metadata" src={project.demoVideoSrc}>Your browser does not support embedded video.</video>
        </section>
      )}
      <section className="case-study__media"><h2>Project gallery</h2><ProjectGallery images={project.screenshots ?? []} /></section>
      {nextProject && nextProject.slug !== project.slug && (
        <Link href={`/projects/${nextProject.slug}`} className="next-project">
          <span><span className="eyebrow">Next project</span><strong>{nextProject.title}</strong></span>
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </main>
  );
}
