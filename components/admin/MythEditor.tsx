"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import { toast } from "./Toaster";

type Source = { org: string; url: string };
type Myth = {
  _id?: string;
  myth: string;
  fact: string;
  explanation: string;
  category: string;
  sources: Source[];
  slug: string;
  status: "draft" | "published";
  featured: boolean;
};

const cats = [
  { k: "forests", l: "Forests" },
  { k: "recycling", l: "Recycling" },
  { k: "digital-vs-paper", l: "Digital vs Paper" },
  { k: "industry", l: "Industry" },
  { k: "circularity", l: "Circularity" },
];

export function MythEditor({ initial }: { initial?: Myth }) {
  const router = useRouter();
  const [m, setM] = useState<Myth>(
    initial ?? {
      myth: "",
      fact: "",
      explanation: "",
      category: "recycling",
      sources: [],
      slug: "",
      status: "draft",
      featured: false,
    }
  );
  const [busy, setBusy] = useState(false);
  const slugTouched = useRef(!!initial);

  useEffect(() => {
    if (!slugTouched.current) setM((prev) => ({ ...prev, slug: slugify(prev.myth) }));
  }, [m.myth]);

  const update = <K extends keyof Myth>(k: K, v: Myth[K]) => setM((p) => ({ ...p, [k]: v }));

  const save = async (publish?: boolean) => {
    setBusy(true);
    try {
      const payload = { ...m, status: publish ? "published" : m.status };
      const url = initial?._id ? `/api/myths/${initial._id}` : `/api/myths`;
      const method = initial?._id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      toast({ kind: "ok", message: publish ? "Published" : "Saved" });
      if (!initial?._id) router.push(`/admin/myths/${data.data._id}`);
      else router.refresh();
    } catch (e) {
      toast({ kind: "err", message: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!initial?._id) return;
    if (!confirm("Delete this myth?")) return;
    const res = await fetch(`/api/myths/${initial._id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/myths");
  };

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
      <div className="space-y-5">
        <Field label="Myth (the common assumption)">
          <textarea
            rows={3}
            value={m.myth}
            onChange={(e) => update("myth", e.target.value)}
            className={`${inputCls} h-auto py-3 resize-none font-serif text-[1.05rem]`}
          />
        </Field>
        <Field label="Fact (one-sentence corrective)">
          <textarea
            rows={2}
            value={m.fact}
            onChange={(e) => update("fact", e.target.value)}
            className={`${inputCls} h-auto py-3 resize-none`}
          />
        </Field>
        <Field label="Explanation (context, nuance, 2–4 sentences)">
          <textarea
            rows={5}
            value={m.explanation}
            onChange={(e) => update("explanation", e.target.value)}
            className={`${inputCls} h-auto py-3 resize-none`}
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Slug">
            <input
              value={m.slug}
              onChange={(e) => {
                slugTouched.current = true;
                update("slug", slugify(e.target.value));
              }}
              className={inputCls}
            />
          </Field>
          <Field label="Category">
            <select
              value={m.category}
              onChange={(e) => update("category", e.target.value)}
              className={inputCls}
            >
              {cats.map((c) => (
                <option key={c.k} value={c.k}>
                  {c.l}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] uppercase tracking-[0.16em] text-ink-2">Sources</span>
            <button
              type="button"
              onClick={() => update("sources", [...m.sources, { org: "", url: "" }])}
              className="text-[12px] text-forest inline-flex items-center gap-1"
            >
              <Plus size={13} /> Add source
            </button>
          </div>
          <div className="space-y-2">
            {m.sources.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={s.org}
                  onChange={(e) =>
                    update(
                      "sources",
                      m.sources.map((x, idx) => (idx === i ? { ...x, org: e.target.value } : x))
                    )
                  }
                  placeholder="Org (e.g. CPPRI)"
                  className={`${inputCls} max-w-[200px]`}
                />
                <input
                  value={s.url}
                  onChange={(e) =>
                    update(
                      "sources",
                      m.sources.map((x, idx) => (idx === i ? { ...x, url: e.target.value } : x))
                    )
                  }
                  placeholder="https://…"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => update("sources", m.sources.filter((_, idx) => idx !== i))}
                  className="w-9 h-10 grid place-items-center text-ink-2 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="sticky top-20 space-y-4">
        <div className="bg-white border border-admin-border rounded-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-ink-2">Status</span>
            <span
              className={`text-[11px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full ${
                m.status === "published" ? "bg-forest/10 text-forest" : "bg-amber-50 text-amber-800"
              }`}
            >
              {m.status}
            </span>
          </div>
          <label className="flex items-center justify-between text-[13px]">
            <span>Featured</span>
            <input
              type="checkbox"
              checked={m.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="accent-forest"
            />
          </label>
          <div className="pt-2 space-y-2">
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
              {m.status === "published" ? "Update published" : "Save & publish"}
            </button>
          </div>
        </div>
        {initial?._id && (
          <button
            onClick={remove}
            className="w-full h-10 rounded-[8px] text-[12px] text-red-700 hover:bg-red-50 inline-flex items-center justify-center gap-2"
          >
            <Trash2 size={13} /> Delete myth
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
      <span className="block text-[11px] uppercase tracking-[0.16em] text-ink-2 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
