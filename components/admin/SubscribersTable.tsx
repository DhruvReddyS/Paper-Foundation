"use client";

import { Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Row = { _id: string; email: string; source: string; createdAt: string; unsubscribedAt?: string };

export function SubscribersTable({ rows }: { rows: Row[] }) {
  const exportCsv = () => {
    const header = "email,source,subscribed_at,unsubscribed_at\n";
    const body = rows
      .map((r) => [r.email, r.source, r.createdAt, r.unsubscribedAt || ""].join(","))
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] text-ink-2">{rows.length} subscribers</p>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-[8px] border border-admin-border text-[12px] hover:border-forest hover:text-forest"
        >
          <Download size={13} /> Export CSV
        </button>
      </div>
      <div className="bg-white border border-admin-border rounded-card overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="text-[11px] uppercase tracking-[0.14em] text-ink-2 bg-admin-surface">
            <tr>
              <th className="text-left font-medium px-4 py-3">Email</th>
              <th className="text-left font-medium px-4 py-3">Source</th>
              <th className="text-left font-medium px-4 py-3">Joined</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-ink-2">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r._id} className="border-t border-admin-border">
                  <td className="px-4 py-3 text-ink">{r.email}</td>
                  <td className="px-4 py-3 text-ink-2">{r.source}</td>
                  <td className="px-4 py-3 text-ink-2">{formatDate(r.createdAt)}</td>
                  <td className="px-4 py-3">
                    {r.unsubscribedAt ? (
                      <span className="text-ink-2 text-[12px]">Unsubscribed</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] uppercase tracking-[0.12em] bg-forest/10 text-forest">
                        Active
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
