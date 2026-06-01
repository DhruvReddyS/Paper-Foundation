import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { ArticleModel } from "@/lib/models";
import { ArticleEditor } from "@/components/admin/ArticleEditor";

export const dynamic = "force-dynamic";

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const doc = await ArticleModel.findById(id).lean();
  if (!doc) notFound();
  const initial = {
    _id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    author: doc.author,
    coverImage: doc.coverImage?.url ? doc.coverImage : undefined,
    excerpt: doc.excerpt,
    body: doc.body,
    references: doc.references || [],
    tags: doc.tags || [],
    quickRead: doc.quickRead,
    featured: doc.featured,
    status: doc.status as "draft" | "published",
    seo: doc.seo || undefined,
  };
  return <ArticleEditor initial={initial} />;
}
