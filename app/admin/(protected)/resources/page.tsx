import Link from "next/link";
import { Plus } from "lucide-react";
import { connectDB } from "@/lib/db";
import { ResourceModel } from "@/lib/models";
import { DataTable, type Column } from "@/components/admin/DataTable";

export const dynamic = "force-dynamic";

type Row = {
  _id: string;
  title: string;
  type: string;
  org: string;
  year?: number;
  status: "draft" | "published";
};

const cols: Column<Row>[] = [
  {
    key: "title",
    header: "Title",
    render: (r) => (
      <>
        <p className="text-ink font-medium leading-snug">{r.title}</p>
        <p className="text-ink-2 text-[12px] mt-0.5 capitalize">
          {r.type} · {r.org} {r.year ? `· ${r.year}` : ""}
        </p>
      </>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (r) => (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] uppercase tracking-[0.12em] ${
          r.status === "published" ? "bg-forest/10 text-forest" : "bg-amber-50 text-amber-800"
        }`}
      >
        {r.status}
      </span>
    ),
    className: "w-32",
  },
];

export default async function AdminResources() {
  await connectDB();
  const docs = await ResourceModel.find().sort({ updatedAt: -1 }).lean();
  const rows = docs.map((d) => ({
    _id: String(d._id),
    title: d.title,
    type: d.type,
    org: d.org,
    year: d.year || undefined,
    status: d.status,
  }));
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-[1.5rem] text-ink leading-tight">Resources</h2>
          <p className="text-[13px] text-ink-2 mt-1">External reports we link to publicly.</p>
        </div>
        <Link
          href="/admin/resources/new"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-[8px] bg-forest text-paper text-[13px] hover:bg-forest-deep"
        >
          <Plus size={14} /> New resource
        </Link>
      </div>
      <DataTable<Row>
        rows={rows}
        columns={cols}
        searchableKeys={["title", "org", "type"]}
        bulkEndpoint="/api/resources/bulk"
        bulkActions={[
          { label: "Publish", action: "publish" },
          { label: "Unpublish", action: "unpublish" },
          { label: "Delete", action: "delete", tone: "danger" },
        ]}
        rowHref={(r) => `/admin/resources/${r._id}`}
        emptyLabel="No resources yet."
      />
    </div>
  );
}
