"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import { toast } from "./Toaster";

type Resource = {
  _id?: string;
  title: string;
  slug: string;
  type: "report" | "guide" | "infographic" | "dataset" | "policy";
  org: string;
  year?: number;
  fileUrl: string;
  fileSize?: string;
  thumbnail?: string;
  summary: string;
  tags: string[];
  status: "draft" | "published";
};

const types = [
  { k: "report", l: "Report" },
  { k: "guide", l: "Guide" },
  { k: "infographic", l: "Infographic" },
  { k: "dataset", l: "Dataset" },
  { k: "policy", l: "Policy" },
];

export function ResourceEditor({ initial }: { initial?: Resource }) {
  const router = useRouter();
  const [r, setR] = useState<Resource>(
    initial ?? {
      title: "",
      slug: "",
      type: "report",
      org: "",
      fileUrl: "",
      summary: "",
      tags: [],
      status: "draft",
    }
  );
  const [busy, setBusy] = useState(false);
  const slugTouched = useRef(!!initial);

  useEffect(() => {
    if (!slugTouched.current) setR((p) => ({ ...p, slug: slugify(p.title) }));
  }, [r.title]);

  const u = <K extends keyof Resource>(k: K, v: Resource[K]) => setR((p) => ({ ...p, [k]: v }));

  const save = async (publish?: boolean) => {
    setBusy(true);
    try {
      const payload = { ...r, status: publish ? "published" : r.status };
      const url = initial?._id ? `/api/resources/${initial._id}` : `/api/resources`;
      const method = initial?._id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      toast({ kind: "ok", message: publish ? "Published" : "Saved" });
      if (!initial?._id) router.push(`/admin/resources/${data.data._id}`);
      else router.refresh();
    } catch (e) {
      toast({ kind: "err", message: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!initial?._id) return;
    if (!confirm("Delete this resource?")) return;
    const res = await fetch(`/api/resources/${initial._id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/resources");
  };

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
      <div className="space-y-5">
        <Field label="Title">
          <input value={r.title} onChange={(e) => u("title", e.target.value)} className={inputCls} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Slug">
            <input
              value={r.slug}
              onChange={(e) => {
                slugTouched.current = true;
                u("slug", slugify(e.target.value));
              }}
              className={inputCls}
            />
          </Field>
          <Field label="Type">
            <select
              value={r.type}
              onChange={(e) => u("type", e.target.value as Resource["type"])}
              className={inputCls}
            >
              {types.map((t) => (
                <option key={t.k} value={t.k}>
                  {t.l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Organisation">
            <input value={r.org} onChange={(e) => u("org", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Year">
            <input
              type="number"
              value={r.year || ""}
              onChange={(e) => u("year", e.target.value ? Number(e.target.value) : undefined)}
              className={inputCls}
            />
          </Field>
          <Field label="File URL (public PDF / page)">
            <input
              value={r.fileUrl}
              onChange={(e) => u("fileUrl", e.target.value)}
              className={`${inputCls} sm:col-span-2`}
            />
          </Field>
          <Field label="File size (display only)">
            <input
              value={r.fileSize || ""}
              onChange={(e) => u("fileSize", e.target.value)}
              placeholder="e.g. 3.4 MB"
              className={inputCls}
            />
          </Field>
        </div>
        <Field label="Summary">
          <textarea
            rows={4}
            value={r.summary}
            onChange={(e) => u("summary", e.target.value)}
            className={`${inputCls} h-auto py-3 resize-none`}
          />
        </Field>
        <Field label="Tags (comma-separated)">
          <input
            value={r.tags.join(", ")}
            onChange={(e) => u("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
            className={inputCls}
          />
        </Field>
      </div>

      <aside className="sticky top-20 space-y-4">
        <div className="bg-white border border-admin-border rounded-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-ink-2">Status</span>
            <span
              className={`text-[11px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full ${
                r.status === "published" ? "bg-forest/10 text-forest" : "bg-amber-50 text-amber-800"
              }`}
            >
              {r.status}
            </span>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => save(false)}
              disabled={busy}
              className="w-full h-10 rounded-[8px] border border-admin-border text-ink hover:border-forest hover:text-forest text-[13px] inline-flex items-center justify-center gap-2"
            >
              {busy && <Loader2 size={13} className="animate-spin" />}
              Save draft
            </button>
            <button
              onClick={() => save(true)}
              disabled={busy}
              className="w-full h-10 rounded-[8px] bg-forest text-paper hover:bg-forest-deep text-[13px]"
            >
              {r.status === "published" ? "Update published" : "Save & publish"}
            </button>
          </div>
        </div>
        {initial?._id && (
          <button
            onClick={remove}
            className="w-full h-10 rounded-[8px] text-[12px] text-red-700 hover:bg-red-50 inline-flex items-center justify-center gap-2"
          >
            <Trash2 size={13} /> Delete
          </button>
        )}
      </aside>
    </div>
  );
}

const inputCls =
  "w-full h-10 px-3 rounded-[8px] border border-admin-border focus:border-forest outline-none text-[13px] bg-white";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.16em] text-ink-2 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
