# Changelog

## Contact and icon cleanup (2026-11-15)

- Removed the quick-navigation trigger, dialog, and shortcut from all localized pages; removed northeast-arrow decorations throughout the site.
- Replaced service glyphs with Lucide SVG icons on raised tiles and contact glyphs with mail/phone icons and Font Awesome GitHub/LinkedIn brand marks.
- Default the contact recipient to the owner's published inbox, trim environment values, validate recipient configuration, and handle provider exceptions. Resend failures now log safe diagnostic reasons without form contents or credentials.
- Documented Resend test-sender restrictions and production environment setup; ignored local environment files and added eight mocked contact-delivery tests.
- Live Resend delivery remains unverified: this checkout has no API key or authenticated access to the deployment's environment settings/logs.
- Disabled metadata streaming to resolve an intermittent outer-layout hydration mismatch on reload; eight repetitions of the previously failing theme/reload check passed.

## Portfolio refresh — Motion, themes, and compact work grid (2026-11-15)

- Studied https://eleo.netlify.app/ in Chromium and adapted its floating hero identity, interactive service selection, and project presentation into an original design.
- Added a gently rotating `<Yusuph.dev/>` hero with pointer tilt, pause/resume, and reduced-motion support.
- Replaced the split color systems with a shared navy, mint, and warm-white palette. Themes initialize before paint, follow system preference until overridden, persist across visits, and remain usable when storage is blocked.
- Show all seven published projects on the homepage with category filters, compact cards, browser-framed screenshot previews, and localized actions. The unpublished competition draft remains private.
- Reduced portrait size and section spacing; added sticky navigation, reading progress, service tabs with keyboard support, and a back-to-top link.
- Created a matching vector Y identity, multi-resolution favicon, 96px search icon, and Apple touch icon. Refreshed Open Graph colors and social preview.
- Fixed command-palette section navigation from project pages and added missing accessible section-heading IDs.
- Added browser coverage for themes, blocked storage, contrast, hero motion, service navigation, project filtering, and favicon routes.
- Kept reduced-motion state consistent during hydration while CSS honors the device preference immediately.
- Validation: production build, lint, TypeScript, all 8 unit tests, all 8 project entries, and all 35 Playwright checks passed. Also checked 30 fresh mobile page loads for hydration errors.

## Phase 4 — Completion audit (2026-11-14)

- Confirmed the homepage order: Zantan Company, Zantan Mining, Ayaven Kids, then Hardware Stores.
- Re-encoded the three client hero images at WebP quality 80, under 300 KB, and preserved full screenshot proportions in gallery copies. Owner originals remain unchanged.
- Fixed the mobile gallery column override, lightbox cropping, and mobile-menu focus timing; aligned headline letter spacing, increased navigation/title tap targets, and ensured mobile form/search inputs use 16px text.
- Kept image priority on the first project card; other content images lazy-load.
- Embedded licensed Space Grotesk fonts in Open Graph rendering and refreshed the social preview.
- Extended responsive checks to cover project ordering, mobile menu focus/dismissal, gallery columns, and full-image lightbox rendering.
- Validation: lint, TypeScript, all 8 unit tests, all 8 project entries, production build, and all 24 Playwright checks passed (6 each at 375, 390, 768, and 1280px). The seven required local routes returned HTTP 200.
- Owner TODO: confirm written permission before adding client logos; arrange native review of Swahili and French text; upload the refreshed social preview in GitHub repository settings if used there.

## Phase 4 — Client projects, responsive layout, and branding (2026-11-10)

- Featured Zantan Company, Zantan Mining, and Ayaven Kids first, followed by Hardware Stores, with updated project details and live-site actions.
- Converted copies of the three owner-provided screenshots to optimized 1600×900 WebP media; originals remain unchanged.
- Updated project cards, case-study media, responsive grids, mobile navigation, and reduced-motion behavior.
- Switched the interface typography to Space Grotesk and added the rotating gradient terminal logo.
- Regenerated the 1280×640 social preview from the updated Open Graph design.
- Added responsive Playwright coverage for the requested pages and viewport sizes.
- Verified all 20 responsive checks, the required local route responses, and the lint, type, unit, project, and production-build checks.
- Owner TODO: confirm written permission before adding client logos and arrange native review of Swahili and French text.

## Phase 3 — Homepage, localization, contact, and SEO (2026-11-10)

- Added the multilingual homepage, responsive navigation, theme switcher, and keyboard command palette.
- Added services, process, selected work, experience, skills, certificates, languages, and contact sections using the verified owner facts.
- Added localized English, Swahili, and French routes and messages, with project case studies remaining in English.
- Added a validated contact API with honeypot and per-instance rate limiting, plus optional Resend delivery.
- Added Person JSON-LD, localized sitemap entries, Open Graph generation, a social preview image, and Vercel analytics integrations.
- Connected the CV download to the owner-provided PDF without changing its contents, added privacy-safe client/own project labels, and aligned the Resend sender setting with `CONTACT_FROM`.
- Removed the obsolete duplicate project array and its stale test, and cleaned unverified or unfinished text from published project pages.
