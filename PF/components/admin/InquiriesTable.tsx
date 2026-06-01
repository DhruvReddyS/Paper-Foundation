"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Row = {
  _id: string;
  name: string;
  email: string;
  org?: string;
  type: string;
  message: string;
  status: "new" | "in-review" | "replied" | "closed";
  createdAt: string;
};

const statuses: Row["status"][] = ["new", "in-review", "replied", "closed"];
const statusTone: Record<Row["status"], string> = {
  new: "bg-forest/10 text-forest",
  "in-review": "bg-amber-50 text-amber-800",
  replied: "bg-blue-50 text-blue-800",
  closed: "bg-admin-surface text-ink-2",
};

export function InquiriesTable({ rows: initial }: { rows: Row[] }) {
  const [rows, setRows] = useState(initial);
  const [open, setOpen] = useState<Row | null>(null);
  const [filter, setFilter] = useState<"all" | Row["status"]>("all");
  const filtered = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  const update = async (id: string, status: Row["status"]) => {
    setRows((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    if (open?._id === id) setOpen((o) => (o ? { ...o, status } : o));
    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  return (
    <>
      <div className="flex gap-2 mb-3">
        {(["all", ...statuses] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-[12px] h-8 px-3 rounded-full border ${
              filter === s
                ? "bg-forest text-paper border-forest"
                : "border-admin-border text-ink hover:border-forest hover:text-forest"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="bg-white border border-admin-border rounded-card overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="text-[11px] uppercase tracking-[0.14em] text-ink-2 bg-admin-surface">
            <tr>
              <th className="text-left font-medium px-4 py-3">Name</th>
              <th className="text-left font-medium px-4 py-3">Type</th>
              <th className="text-left font-medium px-4 py-3">Date</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-ink-2">
                  No inquiries.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr
                  key={r._id}
                  onClick={() => setOpen(r)}
                  className="border-t border-admin-border hover:bg-admin-surface/50 cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <p className="text-ink">{r.name}</p>
                    <p className="text-ink-2 text-[12px]">{r.email}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-2 capitalize">{r.type}</td>
                  <td className="px-4 py-3 text-ink-2">{formatDate(r.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] uppercase tracking-[0.12em] ${statusTone[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(null)}
              className="fixed inset-0 bg-black/30 z-40"
            />
            <motion.aside
              initial={{ x: 480 }}
              animate={{ x: 0 }}
              exit={{ x: 480 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-admin-border z-50 overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-ink-2">
                  Inquiry · {formatDate(open.createdAt)}
                </span>
                <button onClick={() => setOpen(null)} className="text-ink-2 hover:text-ink">
                  <X size={18} />
                </button>
              </div>
              <h3 className="font-serif text-[1.4rem] text-ink leading-snug">{open.name}</h3>
              <p className="text-[13px] text-ink-2">{open.email}</p>
              {open.org && <p className="text-[13px] text-ink-2">{open.org}</p>}
              <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-ink-2">
                Type · {open.type}
              </p>
              <div className="mt-5 p-4 bg-admin-surface rounded-card text-[14px] leading-relaxed whitespace-pre-wrap">
                {open.message}
              </div>
              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink-2 mb-2">Status</p>
                <div className="flex gap-2 flex-wrap">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => update(open._id, s)}
                      className={`text-[12px] h-8 px-3 rounded-full border ${
                        open.status === s
                          ? "bg-forest text-paper border-forest"
                          : "border-admin-border text-ink hover:border-forest hover:text-forest"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <a
                href={`mailto:${open.email}?subject=Re: your message to Paper Foundation India`}
                className="mt-6 inline-flex items-center justify-center h-10 px-4 rounded-[8px] bg-forest text-paper text-[13px] hover:bg-forest-deep"
              >
                Reply by email
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
