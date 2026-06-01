import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { ArticleModel } from "@/lib/models";
import { articleSchema } from "@/lib/validators";
import { fail, ok, requireAdmin } from "@/lib/api";
import { readingTimeMinutes, slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
  } catch {
    return ok([]);
  }
  const sp = req.nextUrl.searchParams;
  const status = sp.get("status");
  const category = sp.get("category");
  const tag = sp.get("tag");
  const q = sp.get("q");
  const featured = sp.get("featured");
  const limit = Math.min(Number(sp.get("limit") || 50), 100);

  const session = await requireAdmin();
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  else if (!session) filter.status = "published";
  if (category) filter.category = category;
  if (tag) filter.tags = tag;
  if (featured === "true") filter.featured = true;
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { excerpt: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
    ];
  }

  const docs = await ArticleModel.find(filter)
    .sort({ featured: -1, publishedAt: -1, updatedAt: -1 })
    .limit(limit)
    .lean();

  return ok(docs);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const body = await req.json();
  body.slug = body.slug || slugify(body.title || "");
  body.readingTimeMin = body.readingTimeMin || readingTimeMinutes(body.body || "");
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid payload");
  const exists = await ArticleModel.findOne({ slug: parsed.data.slug }).lean();
  if (exists) return fail("Slug already exists", 409);
  if (parsed.data.status === "published" && !parsed.data.publishedAt) {
    parsed.data.publishedAt = new Date();
  }
  const doc = await ArticleModel.create(parsed.data);
  return ok(doc);
}
