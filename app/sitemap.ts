import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import { ArticleModel } from "@/lib/models";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/knowledge`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/myths`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/resources`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/get-involved`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    await connectDB();
    const articles = await ArticleModel.find({ status: "published" })
      .select("slug updatedAt publishedAt")
      .lean();
    return [
      ...base,
      ...articles.map((a) => ({
        url: `${SITE}/knowledge/${a.slug}`,
        lastModified: (a.updatedAt || a.publishedAt) as Date,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ];
  } catch {
    return base;
  }
}
