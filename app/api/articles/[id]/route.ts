import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { ArticleModel } from "@/lib/models";
import { articleSchema } from "@/lib/validators";
import { fail, ok, requireAdmin } from "@/lib/api";
import { readingTimeMinutes } from "@/lib/utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const doc = await ArticleModel.findById(id).lean();
  if (!doc) return fail("Not found", 404);
  return ok(doc);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  if (body.body) body.readingTimeMin = readingTimeMinutes(body.body);
  const parsed = articleSchema.partial().safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid payload");
  const data = parsed.data as Record<string, unknown>;
  if (data.status === "published") {
    const existing = await ArticleModel.findById(id).lean();
    if (existing && !existing.publishedAt) data.publishedAt = new Date();
  }
  const doc = await ArticleModel.findByIdAndUpdate(id, data, { new: true });
  if (!doc) return fail("Not found", 404);
  return ok(doc);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const { id } = await params;
  await ArticleModel.findByIdAndDelete(id);
  return ok({ deleted: true });
}
