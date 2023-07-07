import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    published: z.boolean(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.string()).optional(),
    emoji: z.string().optional(),
  }),
});

title: "2022年振り返り";
published: true;
date: "2022-12-28T00:00:00";
update: "2022-01-04T00:00:00";
tags: ["日記", "振り返り"];
emoji: "🐯";

export const collections = { blog };
