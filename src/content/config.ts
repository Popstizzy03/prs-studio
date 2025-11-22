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

export const collections = { logs };
