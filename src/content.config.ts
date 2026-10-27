import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const levels = ['beginner', 'intermediate', 'advanced'] as const;
export const tracks = ['backend', 'frontend'] as const;

const card = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  level: z.enum(levels),
  question: z.string().min(1),
  answer: z.string().min(1),
});

const resource = z.object({
  title: z.string().min(1),
  url: z.url({ protocol: /^https$/ }),
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/topics' }),
  schema: z.object({
    key: z.string().regex(/^[a-z0-9-]+$/),
    track: z.enum(tracks),
    order: z.number().int(),
    title: z.string().min(1),
    summary: z.string().min(1),
    diagram: z.string().optional(),
    cards: z.array(card).min(1),
    resources: z.array(resource),
  }),
});

export const collections = { topics };
