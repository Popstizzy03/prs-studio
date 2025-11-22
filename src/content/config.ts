import { defineCollection, z } from 'astro:content';

const logs = defineCollection({
  // v2.5+ API uses 'content' for Markdown/MDX
  type: 'content', 
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default(['session']),
    // Musician specific fields
    bpm: z.number().optional(),
    instruments: z.array(z.string()).optional(),
    // Path to audio file in /public/audio/
    audio_src: z.string().optional(), 
    // Path to cover image
    cover: z.string().optional(),
  }),
});

const timeline = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.string(),
    date: z.date(),
    category: z.string().default('Milestone'),
    images: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional(),
  }),
});

export const collections = { logs, timeline };
