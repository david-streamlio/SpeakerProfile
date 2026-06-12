import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const talks = defineCollection({
  loader: file("src/data/talks.yaml"),
  schema: z.object({
    event: z.string(),
    year: z.number(),
    title: z.string().optional(),
    location: z.string().optional(),
    videoUrl: z.string().url().optional(),
    slidesUrl: z.string().url().optional(),
    // An embeddable web deck (e.g. decks.streamnative.io) shown in an inline
    // viewer at /slides/<id>/. Use slidesUrl instead for link-out decks.
    deckUrl: z.string().url().optional(),
    // true (default) = shown in lists. false = counted in totals but hidden.
    display: z.boolean().default(true),
  }),
});

const videos = defineCollection({
  loader: file("src/data/videos.yaml"),
  schema: z.object({
    title: z.string(),
    url: z.string().url().optional(),
    description: z.string().optional(),
    coHost: z.string().optional(),
  }),
});

const podcasts = defineCollection({
  loader: file("src/data/podcasts.yaml"),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
  }),
});

const projects = defineCollection({
  loader: file("src/data/projects.yaml"),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    language: z.string().optional(),
    stars: z.number().optional(),
    category: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ base: "src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { talks, videos, podcasts, projects, blog };
