import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { ResourceModel } from "@/lib/models";
import { ResourceEditor } from "@/components/admin/ResourceEditor";

export const dynamic = "force-dynamic";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const doc = await ResourceModel.findById(id).lean();
  if (!doc) notFound();
  return (
    <ResourceEditor
      initial={{
        _id: String(doc._id),
        title: doc.title,
        slug: doc.slug,
        type: doc.type as "report" | "guide" | "infographic" | "dataset" | "policy",
        org: doc.org,
        year: doc.year || undefined,
        fileUrl: doc.fileUrl,
        fileSize: doc.fileSize,
        summary: doc.summary,
        tags: doc.tags || [],
        status: doc.status as "draft" | "published",
      }}
    />
  );
}
