import { NextRequest } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { InquiryModel } from "@/lib/models";
import { fail, ok, requireAdmin } from "@/lib/api";

const patchSchema = z.object({
  status: z.enum(["new", "in-review", "replied", "closed"]),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const { id } = await params;
  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) return fail("Invalid payload");
  const doc = await InquiryModel.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!doc) return fail("Not found", 404);
  return ok(doc);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const { id } = await params;
  await InquiryModel.findByIdAndDelete(id);
  return ok({ deleted: true });
}
