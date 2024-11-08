import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    excerpt: z.string().optional().nullable(),
    date: z.date(),
    tags: z.array(z.string()).or(z.string()).optional().nullable(),
    language: z.string().optional().default("es"),
    image: image().optional().refine((img) => img === undefined || img.width >= 1080, {
      message: "The featured image must be at least 1080 pixels wide.",
    }),
  }),
});

const data = defineCollection({
  type: "data",
  schema: ({ image }) => z.record(
    z.object({
      label: z.record(z.string()),
      banner: image().optional().refine((img) => img === undefined || img.width >= 1080, {
        message: "The featured image must be at least 1080 pixels wide.",
      }),
    })
  )
});

export const collections = { blog, data };
