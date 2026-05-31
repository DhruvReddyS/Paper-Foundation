import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { ResourceModel } from "@/lib/models";
import { resourceSchema } from "@/lib/validators";
import { fail, ok, requireAdmin } from "@/lib/api";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
  } catch {
    return ok([]);
  }
  const sp = req.nextUrl.searchParams;
  const session = await requireAdmin();
  const filter: Record<string, unknown> = {};
  if (sp.get("status")) filter.status = sp.get("status");
  else if (!session) filter.status = "published";
  if (sp.get("type")) filter.type = sp.get("type");
  const docs = await ResourceModel.find(filter).sort({ year: -1, createdAt: -1 }).lean();
  return ok(docs);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const body = await req.json();
  body.slug = body.slug || slugify(body.title || "");
  const parsed = resourceSchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid payload");
  const exists = await ResourceModel.findOne({ slug: parsed.data.slug }).lean();
  if (exists) return fail("Slug already exists", 409);
  const doc = await ResourceModel.create(parsed.data);
  return ok(doc);
}
