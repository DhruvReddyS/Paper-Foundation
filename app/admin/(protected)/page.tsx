import Link from "next/link";
import { FileText, Lightbulb, Library, Inbox, Mail, ArrowRight, Plus } from "lucide-react";
import { connectDB } from "@/lib/db";
import {
  ArticleModel,
  MythModel,
  ResourceModel,
  InquiryModel,
  SubscriberModel,
} from "@/lib/models";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getStats() {
  await connectDB();
  const [
    articlesPub,
    articlesDraft,
    mythsPub,
    mythsDraft,
    resourcesPub,
    inquiries,
    subscribers,
    recentInquiries,
  ] = await Promise.all([
    ArticleModel.countDocuments({ status: "published" }),
    ArticleModel.countDocuments({ status: "draft" }),
    MythModel.countDocuments({ status: "published" }),
    MythModel.countDocuments({ status: "draft" }),
    ResourceModel.countDocuments({ status: "published" }),
    InquiryModel.countDocuments({ status: "new" }),
    SubscriberModel.countDocuments({}),
    InquiryModel.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);
  return {
    articlesPub,
    articlesDraft,
    mythsPub,
    mythsDraft,
    resourcesPub,
    inquiries,
    subscribers,
    recentInquiries,
  };
}

export default async function AdminDashboard() {
  const s = await getStats();

  const stats = [
    {
      label: "Published Articles",
      value: s.articlesPub,
      sub: `${s.articlesDraft} in draft`,
      href: "/admin/articles",
      icon: FileText,
    },
    {
      label: "Myths",
      value: s.mythsPub,
      sub: `${s.mythsDraft} in draft`,
      href: "/admin/myths",
      icon: Lightbulb,
    },
    {
      label: "Resources",
      value: s.resourcesPub,
      sub: "Published",
      href: "/admin/resources",
      icon: Library,
    },
    {
      label: "New Inquiries",
      value: s.inquiries,
      sub: "Awaiting reply",
      href: "/admin/inquiries",
      icon: Inbox,
    },
    {
      label: "Subscribers",
      value: s.subscribers,
      sub: "Fact of the Week",
      href: "/admin/subscribers",
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-[1.75rem] text-ink leading-tight">Editorial dashboard</h2>
          <p className="text-[13px] text-ink-2 mt-1">
            Publish carefully. Cite generously. Correct in public.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-[8px] bg-forest text-paper text-[13px] hover:bg-forest-deep"
          >
            <Plus size={14} /> Write article
          </Link>
          <Link
            href="/admin/myths/new"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-[8px] border border-admin-border text-ink text-[13px] hover:border-forest hover:text-forest"
          >
            <Plus size={14} /> Add myth
          </Link>
          <Link
            href="/admin/resources/new"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-[8px] border border-admin-border text-ink text-[13px] hover:border-forest hover:text-forest"
          >
            <Plus size={14} /> Add resource
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group bg-white border border-admin-border rounded-card p-5 hover:border-forest transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-[8px] bg-admin-surface grid place-items-center text-forest">
                <s.icon size={15} />
              </span>
              <ArrowRight size={14} className="text-ink-2 group-hover:text-forest" />
            </div>
            <p className="text-[28px] font-serif text-ink leading-none">{s.value}</p>
            <p className="mt-2 text-[12px] text-ink uppercase tracking-[0.14em]">{s.label}</p>
            <p className="mt-1 text-[12px] text-ink-2">{s.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white border border-admin-border rounded-card overflow-hidden">
          <div className="px-5 py-4 border-b border-admin-border flex items-center justify-between">
            <h3 className="text-[14px] font-medium text-ink">Recent inquiries</h3>
            <Link href="/admin/inquiries" className="text-[12px] text-forest hover:underline">
              View all →
            </Link>
          </div>
          <table className="w-full text-[13px]">
            <thead className="text-[11px] uppercase tracking-[0.14em] text-ink-2 bg-admin-surface">
              <tr>
                <th className="text-left font-medium px-5 py-3">Name</th>
                <th className="text-left font-medium px-5 py-3">Type</th>
                <th className="text-left font-medium px-5 py-3">Date</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {s.recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-ink-2">
                    No inquiries yet.
                  </td>
                </tr>
              ) : (
                s.recentInquiries.map((i) => (
                  <tr key={String(i._id)} className="border-t border-admin-border">
                    <td className="px-5 py-3">
                      <p className="text-ink">{i.name}</p>
                      <p className="text-ink-2 text-[12px]">{i.email}</p>
                    </td>
                    <td className="px-5 py-3 text-ink-2 capitalize">{i.type}</td>
                    <td className="px-5 py-3 text-ink-2">{formatDate(i.createdAt)}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] uppercase tracking-[0.12em] ${
                          i.status === "new"
                            ? "bg-forest/10 text-forest"
                            : i.status === "in-review"
                              ? "bg-amber-50 text-amber-800"
                              : i.status === "replied"
                                ? "bg-blue-50 text-blue-800"
                                : "bg-admin-surface text-ink-2"
                        }`}
                      >
                        {i.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-admin-border rounded-card p-5">
          <h3 className="text-[14px] font-medium text-ink">Editorial reminders</h3>
          <ul className="mt-4 space-y-3 text-[13px] text-ink-2">
            <li>Every claim should link to a primary source.</li>
            <li>If a draft sits idle for more than 14 days, ping a reader.</li>
            <li>Run a corrections pass on the most-read article each month.</li>
            <li>Don't publish on Fridays — Monday morning gets read.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
