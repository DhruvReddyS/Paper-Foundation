import { fail, ok, requireAdmin } from "@/lib/api";
import { signUploadParams } from "@/lib/cloudinary";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  return ok(signUploadParams());
}
