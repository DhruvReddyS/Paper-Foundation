import { connectDB } from "@/lib/db";
import { InquiryModel } from "@/lib/models";
import { InquiriesTable } from "@/components/admin/InquiriesTable";

export const dynamic = "force-dynamic";

export default async function AdminInquiries() {
  await connectDB();
  const docs = await InquiryModel.find().sort({ createdAt: -1 }).lean();
  const rows = docs.map((d) => ({
    _id: String(d._id),
    name: d.name,
    email: d.email,
    org: d.org,
    type: d.type,
    message: d.message,
    status: d.status,
    createdAt: d.createdAt.toString(),
  }));
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-[1.5rem] text-ink leading-tight">Inquiries</h2>
        <p className="text-[13px] text-ink-2 mt-1">Reply within a few working days.</p>
      </div>
      <InquiriesTable rows={rows} />
    </div>
  );
}
