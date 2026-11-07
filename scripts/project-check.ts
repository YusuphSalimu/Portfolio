import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { getPublicFilePath } from "../src/lib/projects";
import { parseProject, type ProjectStatus } from "../src/lib/projects/schema";

type SummaryRow = {
  slug: string;
  status: ProjectStatus | "invalid";
  published: boolean | "invalid";
  mediaCount: number;
  warnings: string[];
};

const root = process.cwd();
const contentRoot = path.join(root, "content", "projects");
const rows: SummaryRow[] = [];
const errors: string[] = [];
const slugs = new Set<string>();
const maxImageBytes = 500 * 1024;
const maxVideoBytes = 10 * 1024 * 1024;

function validateMedia(src: string, label: string, limit: number, slug: string) {
  try {
    const filePath = getPublicFilePath(src);
    if (!fs.existsSync(filePath)) {
      errors.push(`${slug}: ${label} is missing: ${src}`);
      return false;
    }
    const size = fs.statSync(filePath).size;
    if (size > limit) {
      errors.push(`${slug}: ${label} is ${Math.ceil(size / 1024)} KB; maximum is ${Math.floor(limit / 1024)} KB.`);
    }
    return true;
  } catch (error) {
    errors.push(`${slug}: ${label} path is invalid: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

if (!fs.existsSync(contentRoot)) {
  console.error(`Project content directory is missing: ${contentRoot}`);
  process.exit(1);
}

for (const folder of fs.readdirSync(contentRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
  const slug = folder.name;
  const row: SummaryRow = {
    slug,
    status: "invalid",
    published: "invalid",
    mediaCount: 0,
    warnings: [],
  };
  rows.push(row);

  if (slugs.has(slug)) {
    errors.push(`Duplicate project folder slug: "${slug}".`);
  }
  slugs.add(slug);

  const contentFile = path.join(contentRoot, slug, "index.mdx");
  if (!fs.existsSync(contentFile)) {
    errors.push(`${slug}: missing content/projects/${slug}/index.mdx.`);
    continue;
  }

  try {
    const parsed = matter.read(contentFile);
    const project = parseProject(parsed.data, slug);
    row.status = project.status;
    row.published = project.published;

    if (project.status === "live" && !project.liveUrl) {
      errors.push(`${slug}: live projects require a valid liveUrl.`);
    }

    const heroPath = getPublicFilePath(project.heroImage.src);
    const projectHeroPath = path.join(root, "public", "projects", slug, "hero.webp");
    const hasProjectHero = fs.existsSync(projectHeroPath);
    if (project.published && !hasProjectHero) {
      errors.push(`${slug}: published projects require public/projects/${slug}/hero.webp.`);
    } else if (!hasProjectHero) {
      row.warnings.push("Draft uses the shared placeholder hero.");
    }

    if (project.published && project.heroImage.src !== `/projects/${slug}/hero.webp`) {
      errors.push(`${slug}: published heroImage.src must be "/projects/${slug}/hero.webp".`);
    }

    if (fs.existsSync(heroPath)) {
      if (validateMedia(project.heroImage.src, "hero image", maxImageBytes, slug)) {
        row.mediaCount += 1;
      }
    } else if (project.published) {
      errors.push(`${slug}: hero image is missing: ${project.heroImage.src}`);
    } else {
      row.warnings.push("Placeholder hero file is missing.");
      errors.push(`${slug}: placeholder hero image is missing: ${project.heroImage.src}`);
    }

    for (const [index, screenshot] of (project.screenshots ?? []).entries()) {
      if (validateMedia(screenshot.src, `screenshot ${index + 1}`, maxImageBytes, slug)) {
        row.mediaCount += 1;
      }
    }

    const localVideo = path.join(root, "public", "projects", slug, "demo.mp4");
    if (fs.existsSync(localVideo)) {
      const size = fs.statSync(localVideo).size;
      row.mediaCount += 1;
      if (size > maxVideoBytes) {
        errors.push(`${slug}: demo.mp4 is ${Math.ceil(size / (1024 * 1024))} MB; maximum is 10 MB.`);
      }
    }

    if (!project.published) {
      row.warnings.push("Not published; visible only in development.");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.push(
        `${slug}: frontmatter does not match the project schema:\n${error.issues
          .map((issue) => `  - ${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
          .join("\n")}`,
      );
    } else {
      errors.push(`${slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

console.log("\nProject validation summary");
console.table(
  rows.map((row) => ({
    slug: row.slug,
    status: row.status,
    published: row.published,
    media: row.mediaCount,
    warnings: row.warnings.join(" "),
  })),
);

if (errors.length > 0) {
  console.error(`\nProject validation failed with ${errors.length} error(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`\nProject validation passed for ${rows.length} project(s).`);
}
