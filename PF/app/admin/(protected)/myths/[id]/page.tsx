import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { MythModel } from "@/lib/models";
import { MythEditor } from "@/components/admin/MythEditor";

export const dynamic = "force-dynamic";

export default async function EditMyth({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const doc = await MythModel.findById(id).lean();
  if (!doc) notFound();
  return (
    <MythEditor
      initial={{
        _id: String(doc._id),
        myth: doc.myth,
        fact: doc.fact,
        explanation: doc.explanation,
        category: doc.category,
        sources: doc.sources || [],
        slug: doc.slug,
        status: doc.status as "draft" | "published",
        featured: doc.featured,
      }}
    />
  );
}
