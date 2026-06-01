import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { ResourceModel } from "@/lib/models";
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
      result = await ResourceModel.updateMany({ _id: { $in: ids } }, { $set: { status: "published" } });
      break;
    case "unpublish":
      result = await ResourceModel.updateMany({ _id: { $in: ids } }, { $set: { status: "draft" } });
      break;
    case "delete":
      result = await ResourceModel.deleteMany({ _id: { $in: ids } });
      break;
    default:
      return fail("Unsupported action");
  }
  return ok(result);
}
