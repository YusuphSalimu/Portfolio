import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parseProject, type Project, type ProjectCategory } from "./schema";

export type ProjectEntry = Project & {
  body: string;
  demoVideoSrc?: string;
};

const contentDirectory = path.join(process.cwd(), "content", "projects");
const publicDirectory = path.join(process.cwd(), "public");
let allProjectEntries: ProjectEntry[] | undefined;

function readProjectEntries(): ProjectEntry[] {
  if (allProjectEntries) {
    return allProjectEntries;
  }

  if (!fs.existsSync(contentDirectory)) {
    throw new Error(`Project content directory is missing: ${contentDirectory}`);
  }

  const entries = fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((folder) => {
      const folderPath = path.join(contentDirectory, folder.name);
      const contentPath = path.join(folderPath, "index.mdx");
      if (!fs.existsSync(contentPath)) {
        throw new Error(`Missing project content file: ${contentPath}`);
      }

      const parsed = matter.read(contentPath);
      const project = parseProject(parsed.data, folder.name);
      const localVideoPath = path.join(publicDirectory, "projects", folder.name, "demo.mp4");

      return {
        ...project,
        body: parsed.content.trim(),
        ...(fs.existsSync(localVideoPath)
          ? { demoVideoSrc: `/projects/${folder.name}/demo.mp4` }
          : {}),
      };
    })
    .sort((left, right) => left.order - right.order || right.year - left.year);

  const seenSlugs = new Set<string>();
  for (const project of entries) {
    if (seenSlugs.has(project.slug)) {
      throw new Error(`Duplicate project slug found: "${project.slug}".`);
    }
    seenSlugs.add(project.slug);
  }

  allProjectEntries = entries;
  return entries;
}

export function getAllProjects(options: { environment?: "development" | "production" } = {}) {
  const environment = options.environment ?? (process.env.NODE_ENV === "production" ? "production" : "development");
  const projects = readProjectEntries();
  return environment === "production"
    ? projects.filter((project) => project.published)
    : projects;
}

export function getProject(slug: string, options?: { environment?: "development" | "production" }) {
  return getAllProjects(options).find((project) => project.slug === slug);
}

export function getFeaturedProjects(options?: { environment?: "development" | "production" }) {
  return getAllProjects(options).filter((project) => project.featured);
}

export function getProjectsByCategory(
  category: ProjectCategory,
  options?: { environment?: "development" | "production" },
) {
  return getAllProjects(options).filter((project) => project.category === category);
}

export function getProjectDisplayName(project: Project) {
  return project.client?.name ?? "Confidential client";
}

export function getPublicFilePath(src: string) {
  const filePath = path.resolve(publicDirectory, `.${src.startsWith("/") ? src : `/${src}`}`);
  if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) {
    throw new Error(`Project media path escapes the public directory: "${src}".`);
  }
  return filePath;
}
