import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            tags: z.array(z.string()).default([]),
            servings: z.number().optional(),
            calories: z.number().optional(),
            protein: z.number().optional(),
            carbs: z.number().optional(),
            fat: z.number().optional(),
            image: image().optional(),
            sourceUrl: z.string().url().optional(),
        }),
});

export const collections = { recipes };
