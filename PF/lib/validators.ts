import { z } from "zod";

const ArticleCategory = z.enum([
  "forests",
  "recycling",
  "digital-vs-paper",
  "industry",
  "circularity",
  "policy",
  "research",
]);

export const referenceSchema = z.object({
  title: z.string().min(2),
  org: z.string().min(2),
  url: z.string().url(),
  note: z.string().optional().default(""),
});

export const articleSchema = z.object({
  title: z.string().min(4),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  category: ArticleCategory,
  author: z.string().default("Paper Foundation Editorial"),
  coverImage: z
    .object({
      url: z.string().url().or(z.literal("")),
      publicId: z.string().optional().default(""),
      alt: z.string().optional().default(""),
    })
    .optional(),
  excerpt: z.string().min(20).max(400),
  body: z.string().min(40),
  references: z.array(referenceSchema).default([]),
  tags: z.array(z.string()).default([]),
  quickRead: z.boolean().default(false),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: z.string().datetime().optional().or(z.date().optional()),
  seo: z
    .object({
      title: z.string().optional().default(""),
      description: z.string().optional().default(""),
      ogImage: z.string().optional().default(""),
    })
    .optional(),
  readingTimeMin: z.number().int().positive().default(5),
});

export const mythSchema = z.object({
  myth: z.string().min(4),
  fact: z.string().min(4),
  explanation: z.string().min(20),
  category: z.enum([
    "forests",
    "recycling",
    "digital-vs-paper",
    "industry",
    "circularity",
  ]),
  sources: z
    .array(z.object({ org: z.string(), url: z.string().url() }))
    .default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  featured: z.boolean().default(false),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
});

export const resourceSchema = z.object({
  title: z.string().min(4),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  type: z.enum(["report", "guide", "infographic", "dataset", "policy"]),
  org: z.string().min(2),
  year: z.number().int().optional(),
  fileUrl: z.string().url(),
  fileSize: z.string().optional().default(""),
  thumbnail: z.string().optional().default(""),
  summary: z.string().min(20),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  org: z.string().optional().default(""),
  type: z.enum(["partnership", "press", "general", "volunteer", "research"]).default("general"),
  message: z.string().min(10).max(4000),
  // honeypot
  website: z.string().max(0).optional(),
});

export const subscriberSchema = z.object({
  email: z.string().email(),
  source: z.string().optional().default("homepage"),
  consent: z.literal(true),
});

export const bulkActionSchema = z.object({
  ids: z.array(z.string().min(8)).min(1),
  action: z.enum(["publish", "unpublish", "delete", "feature", "unfeature"]),
});
