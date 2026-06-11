# Speaker Profile → Astro Personal Site

Goal: Turn the single-README speaker profile into an Astro static site deployed
free on GitHub Pages, with talks/videos/podcasts stored as structured data so the
content list maintains itself, plus a real blog.

## Phase 0 — Repo hygiene
- [ ] `git rm --cached` the committed `.idea/` folder and `SpeakerProfile.iml` (already in .gitignore)
- [ ] Rename opaque image files (e.g. `DSS25465.jpg` → `data-streaming-summit-2025-1.jpg`)
- [ ] Decide on the raw YouTube URL at README line 73 (title it or drop it)
- [ ] Confirm Twitter handle `@DavidKjerrumga1` is correct (looks truncated)

## Phase 1 — Scaffold Astro
- [ ] `npm create astro@latest` (minimal/empty template, TypeScript) at repo root
- [ ] Add Tailwind + `@astrojs/sitemap` integrations
- [ ] Configure `site` + `base` in astro.config for GitHub Pages
- [ ] Move profile content out of README; new README documents the *project* (build/dev/deploy)

## Phase 2 — Structured content model
- [ ] `src/data/profile.yaml` — name, title, company, bio paragraphs, social links, books
- [ ] `src/content/talks/` collection (typed schema): title, event, year, location, videoUrl, slidesUrl, abstract
- [ ] `src/data/videos.yaml` and `src/data/podcasts.yaml`
- [ ] `src/content/blog/` collection for posts (title, date, tags, draft)
- [ ] Migrate ALL existing README entries into these files (no content lost)

## Phase 3 — Pages & layout
- [ ] Base layout (header nav, footer, dark mode), responsive
- [ ] Home: hero image + bio + "available for" + book highlights
- [ ] /talks: filterable by year/event, links to video/slides
- [ ] /videos, /podcasts
- [ ] /blog index + post template (with one starter post)
- [ ] SEO: per-page meta, Open Graph image, JSON-LD Person schema

## Phase 4 — Deploy
- [ ] `.github/workflows/deploy.yml` — official Astro → GitHub Pages action
- [ ] Verify `npm run build` is clean
- [ ] Document the "add a talk / add a post" workflow in README

## Verification
- [ ] `npm run build` passes with zero broken internal links
- [ ] Every talk/video/podcast from the old README appears on the new site
- [ ] Site renders correctly at the Pages base path

## Open questions (defaults if no answer)
- Custom domain? RESOLVED: streaming-expert.com (set in astro.config.mjs + public/CNAME)
- Keep all 4 images or curate? Default applied: keynote = hero; others available for gallery/about

## Review (completed 2026-06-11)
Built an Astro static site at repo root, replacing the single-README profile.

What shipped:
- Astro 5 + Tailwind v4 + sitemap; `@rollup/plugin-yaml` for direct YAML imports
- Structured data: profile.yaml, talks.yaml (36 appearances), videos.yaml (13),
  podcasts.yaml (1) — all typed via content.config.ts (build fails on bad data)
- Pages: Home (hero/bio/books/available-for/recent-posts), /talks (year filter +
  watch links), /videos, /podcasts, /blog + post template, /rss.xml
- BaseLayout: SEO meta, Open Graph, JSON-LD Person schema, class-based dark mode
- Starter blog post drawn from the DSS 2025 broker-side-filtering talk
- Images moved to public/images/ with descriptive names (via git mv)
- GitHub Actions deploy workflow (withastro/action → Pages) + CNAME
- README rewritten as project docs (dev/build/deploy + how to add content)

Verification: `npm run build` clean; verified all 36 talks, 13 videos, 1 podcast,
blog post, and valid RSS in dist/. Hero image path resolves. CNAME + JSON-LD use
streaming-expert.com.

Follow-ups:
- [DONE] Image optimization: moved photos to src/assets/, home hero via Astro
  <Image> (responsive webp, 6.9MB→14-47KB), OG card generated 1200×630 (84KB).
  Built image payload ~25MB → 756KB. Extra gallery photos NOT imported (would
  emit full-size); re-add in src/data/images.ts when an About/gallery exists.
- [CONFIRMED] Twitter handle @DavidKjerrumga1 is correct.
- One README video had no title (https://www.youtube.com/watch?v=MpvEq5Qm13Q) —
  placeholder in videos.yaml, awaiting a title from David.
- GitHub repo Settings → Pages → Source = GitHub Actions, then add DNS records.
