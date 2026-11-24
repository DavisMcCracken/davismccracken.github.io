import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    kind: z.enum(['excel', 'code', 'algo']),
    kindLabel: z.string(),
    year: z.number().int(),
    order: z.number().int().default(0),
    role: z.string().optional(),
    timeframe: z.string().optional(),
    figure: z.string().optional(),
    figureCaption: z.string().default('Illustrative · synthetic data'),
    stack: z.array(z.string()),
    impact: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    impactVerified: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
