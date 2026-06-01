import { connectDB } from "@/lib/db";
import { QuizItemModel } from "@/lib/models";
import { ok } from "@/lib/api";

export async function GET() {
  try {
    await connectDB();
    const docs = await QuizItemModel.find({ active: true }).sort({ order: 1 }).lean();
    return ok(docs);
  } catch {
    return ok([]);
  }
}
