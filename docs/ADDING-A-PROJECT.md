# Adding a Project

1. Collect the project details using the checklist in [PROJECT-INTAKE.md](./PROJECT-INTAKE.md).
2. Run `npm run project:new -- <slug>` with a lowercase, hyphenated slug.
3. Add a 1600×900 `hero.webp` and any screenshots under `public/projects/<slug>/`. Keep each image under 500 KB. A local `demo.mp4` must be under 10 MB.
4. Fill in `content/projects/<slug>/index.mdx`. Keep `published: false` until the details and media are reviewed.
5. Run `npm run project:check` and fix every reported issue.
6. Run `npm run dev` and review `/projects` and `/projects/<slug>`. Drafts are visible during development.
7. Commit with `feat(projects): add <slug>` and push directly to `main`.
8. Vercel deploys `main` automatically.

Only verified metrics should have `verified: true`. Set client consent explicitly before publishing a client name or logo.
