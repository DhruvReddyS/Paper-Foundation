import { connectDB } from "@/lib/db";
import { SubscriberModel } from "@/lib/models";
import { SubscribersTable } from "@/components/admin/SubscribersTable";

export const dynamic = "force-dynamic";

export default async function AdminSubs() {
  await connectDB();
  const docs = await SubscriberModel.find().sort({ createdAt: -1 }).limit(2000).lean();
  const rows = docs.map((d) => ({
    _id: String(d._id),
    email: d.email,
    source: d.source,
    createdAt: d.createdAt.toString(),
    unsubscribedAt: d.unsubscribedAt ? d.unsubscribedAt.toString() : undefined,
  }));
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-[1.5rem] text-ink leading-tight">Subscribers</h2>
        <p className="text-[13px] text-ink-2 mt-1">Fact of the Week recipients.</p>
      </div>
      <SubscribersTable rows={rows} />
    </div>
  );
}
