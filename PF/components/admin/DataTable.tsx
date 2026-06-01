"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

type BulkAction = {
  label: string;
  action: string;
  tone?: "default" | "danger";
};

type Props<T extends { _id: string }> = {
  rows: T[];
  columns: Column<T>[];
  searchableKeys?: (keyof T)[];
  bulkEndpoint: string;
  bulkActions: BulkAction[];
  rowHref?: (row: T) => string;
  emptyLabel?: string;
};

export function DataTable<T extends { _id: string }>({
  rows,
  columns,
  searchableKeys = [],
  bulkEndpoint,
  bulkActions,
  rowHref,
  emptyLabel = "Nothing here yet.",
}: Props<T>) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    if (!q) return rows;
    const ql = q.toLowerCase();
    return rows.filter((r) =>
      searchableKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(ql))
    );
  }, [rows, q, searchableKeys]);

  const allSelected = filtered.length > 0 && filtered.every((r) => selected.has(r._id));

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map((r) => r._id)));
  };

  const runBulk = async (action: string) => {
    if (selected.size === 0 || busy) return;
    if (action === "delete" && !confirm(`Delete ${selected.size} item(s)? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch(bulkEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected), action }),
      });
      if (!res.ok) throw new Error("Bulk action failed");
      setSelected(new Set());
      location.reload();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-80 max-w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="w-full h-9 pl-8 pr-3 rounded-[8px] border border-admin-border focus:border-forest outline-none text-[13px]"
          />
        </div>
        <p className="text-[12px] text-ink-2">
          {filtered.length} item{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-forest text-paper rounded-[8px] px-4 h-12 flex items-center justify-between text-[13px]"
          >
            <span>
              {selected.size} selected
              <button
                onClick={() => setSelected(new Set())}
                className="ml-3 underline opacity-80 hover:opacity-100"
              >
                Clear
              </button>
            </span>
            <div className="flex gap-1.5">
              {bulkActions.map((a) => (
                <button
                  key={a.action}
                  disabled={busy}
                  onClick={() => runBulk(a.action)}
                  className={`h-8 px-3 rounded-[6px] text-[12px] transition-colors ${
                    a.tone === "danger"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-paper text-forest-deep hover:bg-paper-2"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white border border-admin-border rounded-card overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="text-[11px] uppercase tracking-[0.14em] text-ink-2 bg-admin-surface">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="accent-forest"
                />
              </th>
              {columns.map((c) => (
                <th key={c.key} className={`text-left font-medium px-4 py-3 ${c.className || ""}`}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-12 text-center text-ink-2">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              filtered.map((row) => {
                const checked = selected.has(row._id);
                return (
                  <tr
                    key={row._id}
                    className={`border-t border-admin-border ${checked ? "bg-forest/5" : "hover:bg-admin-surface/60"}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(row._id)}
                        className="accent-forest"
                      />
                    </td>
                    {columns.map((c) => {
                      const content = c.render(row);
                      return (
                        <td key={c.key} className={`px-4 py-3 ${c.className || ""}`}>
                          {rowHref ? (
                            <Link href={rowHref(row)} className="block">
                              {content}
                            </Link>
                          ) : (
                            content
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
