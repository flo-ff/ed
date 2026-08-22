import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
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
    paperBgImage: z.string().optional(),
  }),
});

const infocard = defineCollection({
  type: 'content',
  schema: z.object({
    label: z.string().optional(),
    title: z.string(),
    titleHighlight: z.string().optional(),
    box1Title: z.string().optional(),
    box1Text: z.string().optional(),
    box2Title: z.string().optional(),
    box2Text: z.string().optional(),
    footer: z.string().optional(),
  }),
});

const hero = defineCollection({
  type: 'content',
  schema: z.object({
    image: z.string(),
    alt: z.string().optional(),
  }),
});

export const collections = { pages, galleries, settings, infocard, hero };
