import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { MythModel } from "@/lib/models";
import { mythSchema } from "@/lib/validators";
import { fail, ok, requireAdmin } from "@/lib/api";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const doc = await MythModel.findById(id).lean();
  if (!doc) return fail("Not found", 404);
  return ok(doc);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const { id } = await params;
  const parsed = mythSchema.partial().safeParse(await req.json());
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid payload");
  const doc = await MythModel.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!doc) return fail("Not found", 404);
  return ok(doc);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const { id } = await params;
  await MythModel.findByIdAndDelete(id);
  return ok({ deleted: true });
}
