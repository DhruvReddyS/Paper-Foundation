import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { ArticleModel } from "@/lib/models";
import { bulkActionSchema } from "@/lib/validators";
import { fail, ok, requireAdmin } from "@/lib/api";

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const parsed = bulkActionSchema.safeParse(await req.json());
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid payload");
  const { ids, action } = parsed.data;
  let result;
  switch (action) {
    case "publish":
      result = await ArticleModel.updateMany(
        { _id: { $in: ids } },
        { $set: { status: "published" }, $currentDate: { publishedAt: true } }
      );
      break;
    case "unpublish":
      result = await ArticleModel.updateMany({ _id: { $in: ids } }, { $set: { status: "draft" } });
      break;
    case "feature":
      result = await ArticleModel.updateMany({ _id: { $in: ids } }, { $set: { featured: true } });
      break;
    case "unfeature":
      result = await ArticleModel.updateMany({ _id: { $in: ids } }, { $set: { featured: false } });
      break;
    case "delete":
      result = await ArticleModel.deleteMany({ _id: { $in: ids } });
      break;
  }
  return ok(result);
}
