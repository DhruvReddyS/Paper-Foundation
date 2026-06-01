import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { InquiryModel } from "@/lib/models";
import { inquirySchema } from "@/lib/validators";
import { fail, ok, rateLimit, requireAdmin } from "@/lib/api";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const docs = await InquiryModel.find().sort({ createdAt: -1 }).limit(200).lean();
  return ok(docs);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`inq-${ip}`, 5, 60_000)) return fail("Too many requests", 429);
  await connectDB();
  const body = await req.json();
  if (body.website) return ok({ received: true }); // honeypot
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid payload");
  const { website, ...data } = parsed.data;
  void website;
  const doc = await InquiryModel.create(data);
  return ok({ id: doc._id });
}
