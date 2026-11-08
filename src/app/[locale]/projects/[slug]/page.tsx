import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ProjectGallery from "@/components/projects/ProjectGallery";
import StatusBadge from "@/components/projects/StatusBadge";
import { routing } from "@/i18n/routing";
import { getAllProjects, getProject } from "@/lib/projects";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProjects().map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const description = project.seo?.description ?? project.summary;
  const canonical = `/${locale}/projects/${project.slug}`;

  return {
    title: `${project.title} — Yusuph Salimu`,
    description,
    alternates: {
      canonical,
      languages: {
        en: `/en/projects/${project.slug}`,
        sw: `/sw/projects/${project.slug}`,
        fr: `/fr/projects/${project.slug}`,
      },
    },
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

export default async function LocaleProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const projects = getAllProjects();
  const currentIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <Link href={`/${locale}/projects`} className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        <span aria-hidden="true">←</span> All projects
      </Link>

      <article className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
        <div className="relative h-[280px] md:h-[420px]">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 900px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/35 to-transparent" />
        </div>

        <div className="space-y-5 p-6 md:p-8">
          <div className="flex flex-wrap gap-3">
            <StatusBadge status={project.status} />
            {!project.published && (
              <span className="draft-badge">Draft</span>
            )}
          </div>

          <h1 className="text-3xl font-semibold md:text-5xl">{project.title}</h1>
          <p className="max-w-3xl text-white/70">{project.summary}</p>

          <div className="flex flex-wrap gap-3">
            {project.status === "live" && project.liveUrl && (
              <a
                className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit live project
              </a>
            )}
            {project.repoUrl && (
              <a
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Repository
              </a>
            )}
            {project.videoUrl && (
              <a
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90"
                href={project.videoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Watch demo
              </a>
            )}
          </div>

          <ul className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Role</p>
              <p className="mt-2 text-white/80">{project.role}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Year</p>
              <p className="mt-2 text-white/80">{project.year}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Client</p>
              <p className="mt-2 text-white/80">{project.client?.name ?? "Confidential client"}</p>
            </div>
          </div>

          {project.metrics?.some((metric) => metric.verified) && (
            <section className="mt-6 grid gap-3 md:grid-cols-3">
              {project.metrics
                .filter((metric) => metric.verified)
                .map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-semibold">{metric.value}</div>
                    <div className="mt-1 text-sm text-white/65">{metric.label}</div>
                  </div>
                ))}
            </section>
          )}

          <div className="prose prose-invert max-w-none text-white/75">
            <MDXRemote source={project.body} />
          </div>

          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-2xl font-semibold">Project gallery</h2>
              <ProjectGallery images={project.screenshots} />
            </section>
          )}

          {nextProject && nextProject.slug !== project.slug && (
            <Link
              href={`/${locale}/projects/${nextProject.slug}`}
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/85 hover:bg-white/10"
            >
              Next project <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </article>
    </main>
  );
}
