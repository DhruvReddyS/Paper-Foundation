import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { SubscriberModel } from "@/lib/models";
import { subscriberSchema } from "@/lib/validators";
import { fail, ok, rateLimit, requireAdmin } from "@/lib/api";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  await connectDB();
  const docs = await SubscriberModel.find().sort({ createdAt: -1 }).limit(1000).lean();
  return ok(docs);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`sub-${ip}`, 5, 60_000)) return fail("Too many requests", 429);
  await connectDB();
  const parsed = subscriberSchema.safeParse(await req.json());
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Invalid email");
  const email = parsed.data.email.toLowerCase().trim();
  const existing = await SubscriberModel.findOne({ email });
  if (existing) {
    if (existing.unsubscribedAt) {
      existing.unsubscribedAt = undefined;
      await existing.save();
    }
    return ok({ already: true });
  }
  await SubscriberModel.create({
    email,
    source: parsed.data.source || "homepage",
    confirmedAt: new Date(),
  });
  return ok({ created: true });
}
