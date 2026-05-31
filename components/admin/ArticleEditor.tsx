"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RichEditor } from "./RichEditor";
import { ImageUploader } from "./ImageUploader";
import { slugify } from "@/lib/utils";
import { Trash2, Plus, Loader2, Save } from "lucide-react";
import { toast } from "./Toaster";

type Reference = { title: string; org: string; url: string; note?: string };

type Article = {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  coverImage?: { url: string; publicId: string; alt: string };
  excerpt: string;
  body: string;
  references: Reference[];
  tags: string[];
  quickRead: boolean;
  featured: boolean;
  status: "draft" | "published";
  seo?: { title: string; description: string; ogImage: string };
};

const categories = [
  { key: "forests", label: "Forests & Fibre" },
  { key: "recycling", label: "Recycling" },
  { key: "digital-vs-paper", label: "Digital vs Paper" },
  { key: "industry", label: "Industry" },
  { key: "circularity", label: "Circularity" },
  { key: "policy", label: "Policy" },
  { key: "research", label: "Research" },
];

export function ArticleEditor({ initial }: { initial?: Article }) {
  const router = useRouter();
  const [a, setA] = useState<Article>(
    initial ?? {
      title: "",
      slug: "",
      category: "recycling",
      author: "Paper Foundation Editorial",
      coverImage: undefined,
      excerpt: "",
      body: "",
      references: [],
      tags: [],
      quickRead: false,
      featured: false,
      status: "draft",
    }
  );
  const [seoOpen, setSeoOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [autoStatus, setAutoStatus] = useState<"idle" | "saving" | "saved" | "err">("idle");
  const dirty = useRef(false);

  // auto-slug from title until manually changed
  const slugTouched = useRef(!!initial);
  useEffect(() => {
    if (!slugTouched.current) {
      setA((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [a.title]);

  const update = <K extends keyof Article>(k: K, v: Article[K]) => {
    dirty.current = true;
    setA((prev) => ({ ...prev, [k]: v }));
  };

  // autosave existing drafts every 12s
  useEffect(() => {
    if (!initial?._id) return;
    const t = setInterval(async () => {
      if (!dirty.current) return;
      dirty.current = false;
      setAutoStatus("saving");
      try {
        const res = await fetch(`/api/articles/${initial._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(a),
        });
        if (!res.ok) throw new Error("autosave");
        setAutoStatus("saved");
      } catch {
        setAutoStatus("err");
      }
    }, 12000);
    return () => clearInterval(t);
  }, [a, initial?._id]);

  const save = async (publish?: boolean) => {
    setSaving(true);
    try {
      const payload = { ...a, status: publish ? "published" : a.status };
      const url = initial?._id ? `/api/articles/${initial._id}` : `/api/articles`;
      const method = initial?._id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      toast({ kind: "ok", message: publish ? "Published" : "Saved" });
      if (!initial?._id) router.push(`/admin/articles/${data.data._id}`);
      else router.refresh();
    } catch (e) {
      toast({ kind: "err", message: (e as Error).message });
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!initial?._id) return;
    if (!confirm("Delete this article? This cannot be undone.")) return;
    const res = await fetch(`/api/articles/${initial._id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin/articles");
    else toast({ kind: "err", message: "Delete failed" });
  };

  const addRef = () =>
    update("references", [...a.references, { title: "", org: "", url: "", note: "" }]);
  const updateRef = (i: number, patch: Partial<Reference>) =>
    update(
      "references",
      a.references.map((r, idx) => (idx === i ? { ...r, ...patch } : r))
    );
  const removeRef = (i: number) =>
    update("references", a.references.filter((_, idx) => idx !== i));

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
      <div className="space-y-5 min-w-0">
        <input
          value={a.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Article title"
          className="w-full h-14 px-4 rounded-card border border-admin-border focus:border-forest outline-none bg-white text-[1.4rem] font-serif text-ink"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Slug">
            <input
              value={a.slug}
              onChange={(e) => {
                slugTouched.current = true;
                update("slug", slugify(e.target.value));
              }}
              className={inputCls}
            />
          </Field>
          <Field label="Category">
            <select
              value={a.category}
              onChange={(e) => update("category", e.target.value)}
              className={inputCls}
            >
              {categories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Author">
            <input value={a.author} onChange={(e) => update("author", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Tags (comma-separated)">
            <input
              value={tagInput || a.tags.join(", ")}
              onChange={(e) => setTagInput(e.target.value)}
              onBlur={() => {
                update(
                  "tags",
                  tagInput
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                );
                setTagInput("");
              }}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Cover image">
          <ImageUploader
            value={a.coverImage}
            onChange={(v) => update("coverImage", v || undefined)}
          />
        </Field>

        <Field label="Excerpt (shown on cards & SEO)">
          <textarea
            rows={3}
            value={a.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            className={`${inputCls} h-auto py-3 resize-none`}
          />
        </Field>

        <Field label="Body">
          <RichEditor value={a.body} onChange={(html) => update("body", html)} />
          <p className="mt-1.5 text-[11px] text-ink-2">
            Insert citation markers with the [sup] button. Each marker like <code>[1]</code>{" "}
            corresponds to the 1st reference below, in order.
          </p>
        </Field>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] uppercase tracking-[0.16em] text-ink-2">References</span>
            <button
              type="button"
              onClick={addRef}
              className="text-[12px] text-forest inline-flex items-center gap-1"
            >
              <Plus size={13} /> Add reference
            </button>
          </div>
          {a.references.length === 0 ? (
            <p className="text-[12px] text-ink-2 border border-dashed border-admin-border rounded-card p-4 text-center">
              No references yet — add at least one for any factual claim.
            </p>
          ) : (
            <div className="space-y-3">
              {a.references.map((r, i) => (
                <div
                  key={i}
                  className="bg-white border border-admin-border rounded-card p-4 grid sm:grid-cols-2 gap-3"
                >
                  <div className="sm:col-span-2 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-ink-2">
                      Reference [{i + 1}]
                    </span>
                    <button
                      type="button"
                      onClick={() => removeRef(i)}
                      className="text-ink-2 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input
                    value={r.title}
                    onChange={(e) => updateRef(i, { title: e.target.value })}
                    placeholder="Title"
                    className={inputCls}
                  />
                  <input
                    value={r.org}
                    onChange={(e) => updateRef(i, { org: e.target.value })}
                    placeholder="Organisation"
                    className={inputCls}
                  />
                  <input
                    value={r.url}
                    onChange={(e) => updateRef(i, { url: e.target.value })}
                    placeholder="https://…"
                    className={`${inputCls} sm:col-span-2`}
                  />
                  <input
                    value={r.note || ""}
                    onChange={(e) => updateRef(i, { note: e.target.value })}
                    placeholder="Optional note (page, table, etc.)"
                    className={`${inputCls} sm:col-span-2`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-admin-border rounded-card">
          <button
            type="button"
            onClick={() => setSeoOpen((v) => !v)}
            className="w-full px-5 h-12 flex items-center justify-between text-[13px]"
          >
            <span>
              SEO & Open Graph
              <span className="ml-2 text-ink-2">(optional)</span>
            </span>
            <span className="text-ink-2">{seoOpen ? "−" : "+"}</span>
          </button>
          {seoOpen && (
            <div className="p-5 border-t border-admin-border space-y-4">
              <Field label="SEO title">
                <input
                  value={a.seo?.title || ""}
                  onChange={(e) => update("seo", { ...(a.seo || { title: "", description: "", ogImage: "" }), title: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Meta description">
                <textarea
                  rows={2}
                  value={a.seo?.description || ""}
                  onChange={(e) => update("seo", { ...(a.seo || { title: "", description: "", ogImage: "" }), description: e.target.value })}
                  className={`${inputCls} h-auto py-2.5 resize-none`}
                />
              </Field>
              <Field label="OG image URL">
                <input
                  value={a.seo?.ogImage || ""}
                  onChange={(e) => update("seo", { ...(a.seo || { title: "", description: "", ogImage: "" }), ogImage: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>
          )}
        </div>
      </div>

      <aside className="sticky top-20 space-y-4">
        <div className="bg-white border border-admin-border rounded-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-ink-2">Status</span>
            <span
              className={`text-[11px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full ${
                a.status === "published" ? "bg-forest/10 text-forest" : "bg-amber-50 text-amber-800"
              }`}
            >
              {a.status}
            </span>
          </div>
          <label className="flex items-center justify-between text-[13px]">
            <span>Featured on home</span>
            <input
              type="checkbox"
              checked={a.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="accent-forest"
            />
          </label>
          <label className="flex items-center justify-between text-[13px]">
            <span>Quick read</span>
            <input
              type="checkbox"
              checked={a.quickRead}
              onChange={(e) => update("quickRead", e.target.checked)}
              className="accent-forest"
            />
          </label>
          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={() => save(false)}
              disabled={saving}
              className="w-full h-10 rounded-[8px] border border-admin-border text-ink hover:border-forest hover:text-forest text-[13px] inline-flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save draft
            </button>
            <button
              type="button"
              onClick={() => save(true)}
              disabled={saving}
              className="w-full h-10 rounded-[8px] bg-forest text-paper hover:bg-forest-deep text-[13px]"
            >
              {a.status === "published" ? "Update published" : "Save & publish"}
            </button>
            {a.status === "published" && initial?._id && (
              <button
                type="button"
                onClick={async () => {
                  const res = await fetch(`/api/articles/${initial._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "draft" }),
                  });
                  if (res.ok) router.refresh();
                }}
                className="w-full h-10 rounded-[8px] text-[12px] text-ink-2 hover:text-ink"
              >
                Unpublish
              </button>
            )}
          </div>
          {autoStatus !== "idle" && (
            <p className="text-[11px] text-ink-2">
              {autoStatus === "saving" && "Autosaving…"}
              {autoStatus === "saved" && "Autosaved"}
              {autoStatus === "err" && "Autosave failed"}
            </p>
          )}
        </div>

        {initial?._id && (
          <button
            type="button"
            onClick={remove}
            className="w-full h-10 rounded-[8px] text-[12px] text-red-700 hover:bg-red-50 inline-flex items-center justify-center gap-2"
          >
            <Trash2 size={13} /> Delete article
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
