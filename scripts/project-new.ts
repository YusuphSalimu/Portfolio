import fs from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: npm run project:new -- <lowercase-hyphenated-slug>");
  process.exit(1);
}

const contentDirectory = path.join(process.cwd(), "content", "projects", slug);
const publicDirectory = path.join(process.cwd(), "public", "projects", slug);
if (fs.existsSync(contentDirectory) || fs.existsSync(publicDirectory)) {
  console.error(`Cannot create "${slug}": a project folder already exists.`);
  process.exit(1);
}

fs.mkdirSync(contentDirectory, { recursive: true });
fs.mkdirSync(path.join(publicDirectory, "shots"), { recursive: true });

const title = slug
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

const template = `---
title: "${title}"
slug: "${slug}"
summary: "Replace with a concise project summary under 160 characters."
category: "web"
status: "case-study"
role: "To be confirmed"
stack:
  - "To be confirmed"
year: ${new Date().getFullYear()}
featured: false
order: 99
published: false
heroImage:
  src: "/projects/_placeholder/hero.webp"
  alt: "Dark violet and blue gradient placeholder cover"
---

## Problem

Describe the problem.

## Solution

Describe the solution.

## My Role

Describe your role.

## Architecture

Describe the architecture.

## Results

Add verified outcomes and metrics.

## What I Learned

Describe what you learned.
`;

fs.writeFileSync(path.join(contentDirectory, "index.mdx"), template, "utf8");
console.log(`Created draft project "${slug}". Add the required files:\n`);
console.log(`- content/projects/${slug}/index.mdx`);
console.log(`- public/projects/${slug}/hero.webp (1600×900 WebP, under 500 KB)`);
console.log(`- public/projects/${slug}/shots/ (optional, each image under 500 KB with alt text in frontmatter)`);
console.log(`- public/projects/${slug}/demo.mp4 (optional, under 10 MB)`);
