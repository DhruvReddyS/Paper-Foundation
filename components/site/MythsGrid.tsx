"use client";

import { useEffect, useMemo, useState } from "react";
import { MythCard } from "./MythCard";

type Myth = {
  _id: string;
  slug: string;
  myth: string;
  fact: string;
  explanation: string;
  category: string;
  sources: { org: string; url: string }[];
};

const cats = [
  { key: "all", label: "All" },
  { key: "forests", label: "Forests" },
  { key: "recycling", label: "Recycling" },
  { key: "digital-vs-paper", label: "Digital vs Paper" },
  { key: "industry", label: "Industry" },
  { key: "circularity", label: "Circularity" },
];

export function MythsGrid({ myths }: { myths: Myth[] }) {
  const [cat, setCat] = useState("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) setOpenSlug(hash);
  }, []);

  const list = useMemo(() => {
    if (cat === "all") return myths;
    return myths.filter((m) => m.category === cat);
  }, [myths, cat]);

  return (
    <>
      <section className="border-b border-rule bg-paper-2/40 sticky top-16 md:top-[72px] z-30 backdrop-blur">
        <div className="container py-4 flex gap-2 overflow-x-auto">
          {cats.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`shrink-0 text-[13px] px-3.5 h-9 rounded-full border transition-colors ${
                cat === c.key
                  ? "bg-forest text-paper border-forest"
                  : "border-rule text-ink hover:border-forest hover:text-forest"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          {list.length === 0 ? (
            <p className="text-center text-ink-2 py-24">No myths in this category yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {list.map((m) => (
                <MythCard key={m._id} m={m} initiallyOpen={openSlug === m.slug} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
