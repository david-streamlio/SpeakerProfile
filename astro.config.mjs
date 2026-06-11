// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import yaml from "@rollup/plugin-yaml";

// Custom domain (must match public/CNAME). On a GitHub Pages custom domain the
// site serves from the root, so no `base` path is needed.
const SITE = "https://streaming-expert.com";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  vite: {
    plugins: [yaml(), tailwindcss()],
  },
});
