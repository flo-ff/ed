import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const galleries = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    cover: z.string().optional(),
    draft: z.boolean().optional().default(false),
    images: z.array(
      z.object({
        image: z.string(),
        caption: z.string().optional(),
        alt: z.string().optional(),
      })
    ).default([]),
  }),
});

const settings = defineCollection({
  type: 'content',
  schema: z.object({
    siteTitle: z.string(),
    siteDescription: z.string(),
    instagram: z.string().optional(),
    email: z.string().optional(),
    heroTitle: z.string().optional(),
    heroText: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { pages, galleries, settings };
