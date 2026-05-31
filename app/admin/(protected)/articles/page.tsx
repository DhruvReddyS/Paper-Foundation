import Link from "next/link";
import { Plus } from "lucide-react";
import { connectDB } from "@/lib/db";
import { ArticleModel } from "@/lib/models";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { categoryLabel, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Row = {
  _id: string;
  title: string;
  category: string;
  author: string;
  status: "draft" | "published";
  publishedAt?: string;
  updatedAt: string;
  featured: boolean;
};

const cols: Column<Row>[] = [
  {
    key: "title",
    header: "Title",
    render: (r) => (
      <>
        <p className="text-ink font-medium leading-snug">{r.title}</p>
        <p className="text-ink-2 text-[12px] mt-0.5">
          {categoryLabel(r.category)} · {r.author}
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
        {r.featured && <span className="ml-1 text-copper">★</span>}
      </span>
    ),
    className: "w-32",
  },
  {
    key: "date",
    header: "Date",
    render: (r) => (
      <span className="text-ink-2 text-[12px]">
        {r.status === "published"
          ? formatDate(r.publishedAt)
          : `Updated ${formatDate(r.updatedAt)}`}
      </span>
    ),
    className: "w-44",
  },
];

export default async function AdminArticlesList() {
  await connectDB();
  const docs = await ArticleModel.find()
    .sort({ updatedAt: -1 })
    .select("title category author status publishedAt updatedAt featured")
    .lean();
  const rows = docs.map((d) => ({
    _id: String(d._id),
    title: d.title,
    category: d.category,
    author: d.author,
    status: d.status,
    publishedAt: d.publishedAt ? d.publishedAt.toString() : undefined,
    updatedAt: d.updatedAt.toString(),
    featured: d.featured,
  }));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-[1.5rem] text-ink leading-tight">Articles</h2>
          <p className="text-[13px] text-ink-2 mt-1">
            Drafts publish one by one — or select a batch and publish them together.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-[8px] bg-forest text-paper text-[13px] hover:bg-forest-deep"
        >
          <Plus size={14} /> New article
        </Link>
      </div>
      <DataTable<Row>
        rows={rows}
        columns={cols}
        searchableKeys={["title", "author", "category"]}
        bulkEndpoint="/api/articles/bulk"
        bulkActions={[
          { label: "Publish", action: "publish" },
          { label: "Unpublish", action: "unpublish" },
          { label: "Feature", action: "feature" },
          { label: "Unfeature", action: "unfeature" },
          { label: "Delete", action: "delete", tone: "danger" },
        ]}
        rowHref={(r) => `/admin/articles/${r._id}`}
        emptyLabel="No articles yet. Write the first one."
      />
    </div>
  );
}
