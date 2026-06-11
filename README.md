# streaming-expert.com

Personal speaker profile and blog for **David Kjerrumgaard** — Developer Advocate,
Apache Pulsar committer, and author of *Pulsar in Action*. Built with
[Astro](https://astro.build) and deployed to GitHub Pages on a custom domain.

The site content (bio, talks, videos, podcasts) lives as **structured data** so
adding an appearance is a one-line edit — no HTML required.

## Develop

```bash
npm install      # one-time
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  data/
    profile.yaml      # bio, social links, books, "available for"
    talks.yaml        # every conference appearance
    videos.yaml       # webinars & video content
    podcasts.yaml     # podcast appearances
  content/
    blog/             # Markdown blog posts
  content.config.ts   # typed schemas for the data above
  components/          # Header, Footer
  layouts/             # BaseLayout (SEO, JSON-LD, dark mode)
  pages/               # routes: /, /talks, /videos, /podcasts, /blog, rss.xml
  styles/global.css    # Tailwind v4 + theme
public/
  images/              # speaker photos (served at /images/...)
  CNAME                # custom domain for GitHub Pages
```

## Adding content

**A talk** — append to `src/data/talks.yaml`:

```yaml
- id: some-conf-2026
  event: Some Conference
  year: 2026
  title: My Talk Title        # optional
  videoUrl: https://...        # optional
  slidesUrl: https://...       # optional
```

**A video or podcast** — append a `{ id, title, url }` block to
`src/data/videos.yaml` or `src/data/podcasts.yaml`.

**A blog post** — add a Markdown file under `src/content/blog/` with frontmatter:

```yaml
---
title: "Post title"
description: "One-sentence summary for SEO and listings."
pubDate: 2026-01-15
tags: ["apache-pulsar", "streaming"]
draft: false          # true = hidden in production, visible in dev
---
```

Schemas in `src/content.config.ts` validate every entry at build time, so a
typo fails the build instead of shipping broken.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages. The custom domain is set in two places that
must agree: `public/CNAME` and `site` in `astro.config.mjs`.

**One-time GitHub setup:** repo **Settings → Pages → Source = GitHub Actions**,
then add the `streaming-expert.com` domain and the DNS records GitHub provides.
