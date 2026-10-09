import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const servicesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    keyword: z.string(),
    shortTitle: z.string(),
    order: z.number().default(0),
    problem: z.string(),
    solution: z.string(),
    deliverables: z.array(z.string()),
    processSteps: z.array(
      z.object({
        step: z.string(),
        title: z.string(),
        desc: z.string(),
      })
    ),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    lang: z.enum(['ar', 'en']).default('ar'),
  }),
});

const industriesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/industries' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    industryName: z.string(),
    keyword: z.string(),
    marketOverview: z.string(),
    buyerPainPoints: z.array(z.string()),
    keyFeatures: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
      })
    ),
    sampleFlow: z.string(),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    lang: z.enum(['ar', 'en']).default('ar'),
  }),
});

const areasCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/areas' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    areaNameAr: z.string(),
    areaNameEn: z.string(),
    governorate: z.string(),
    commercialProfile: z.string(),
    prominentBusinesses: z.array(z.string()),
    localSearchTip: z.string(),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    lang: z.enum(['ar', 'en']).default('ar'),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    pubDate: z.date(),
    author: z.string().default('فريق webinOO'),
    category: z.string(),
    tags: z.array(z.string()),
    targetKeyword: z.string(),
    readTimeMinutes: z.number().default(5),
    lang: z.enum(['ar', 'en']).default('ar'),
  }),
});

export const collections = {
  services: servicesCollection,
  industries: industriesCollection,
  areas: areasCollection,
  blog: blogCollection,
};
