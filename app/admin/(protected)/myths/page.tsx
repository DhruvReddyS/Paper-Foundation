import Link from "next/link";
import { Plus } from "lucide-react";
import { connectDB } from "@/lib/db";
import { MythModel } from "@/lib/models";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { categoryLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Row = {
  _id: string;
  myth: string;
  category: string;
  status: "draft" | "published";
  featured: boolean;
};

const cols: Column<Row>[] = [
  {
    key: "myth",
    header: "Myth",
    render: (r) => (
      <p className="font-serif text-ink leading-snug line-clamp-2 italic">"{r.myth}"</p>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (r) => <span className="text-ink-2 text-[12px]">{categoryLabel(r.category)}</span>,
    className: "w-40",
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
        {r.featured && <span className="ml-1 text-copper">★</span>}
      </span>
    ),
    className: "w-32",
  },
];

export default async function AdminMythsList() {
  await connectDB();
  const docs = await MythModel.find().sort({ updatedAt: -1 }).lean();
  const rows = docs.map((d) => ({
    _id: String(d._id),
    myth: d.myth,
    category: d.category,
    status: d.status,
    featured: d.featured,
  }));
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-[1.5rem] text-ink leading-tight">Myths</h2>
          <p className="text-[13px] text-ink-2 mt-1">Bulk-publish a category at once.</p>
        </div>
        <Link
          href="/admin/myths/new"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-[8px] bg-forest text-paper text-[13px] hover:bg-forest-deep"
        >
          <Plus size={14} /> New myth
        </Link>
      </div>
      <DataTable<Row>
        rows={rows}
        columns={cols}
        searchableKeys={["myth", "category"]}
        bulkEndpoint="/api/myths/bulk"
        bulkActions={[
          { label: "Publish", action: "publish" },
          { label: "Unpublish", action: "unpublish" },
          { label: "Feature", action: "feature" },
          { label: "Delete", action: "delete", tone: "danger" },
        ]}
        rowHref={(r) => `/admin/myths/${r._id}`}
        emptyLabel="No myths yet."
      />
    </div>
  );
}
