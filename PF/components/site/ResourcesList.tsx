"use client";

import { useMemo, useState } from "react";
import { ResourceCard, type ResourceData } from "./ResourceCard";

const types = [
  { key: "all", label: "All" },
  { key: "report", label: "Reports" },
  { key: "policy", label: "Policy" },
  { key: "guide", label: "Guides" },
  { key: "dataset", label: "Datasets" },
  { key: "infographic", label: "Infographics" },
];

export function ResourcesList({ resources }: { resources: ResourceData[] }) {
  const [type, setType] = useState("all");
  const list = useMemo(
    () => (type === "all" ? resources : resources.filter((r) => r.type === type)),
    [resources, type]
  );

  return (
    <>
      <section className="border-b border-rule bg-paper-2/40 sticky top-16 md:top-[72px] z-30 backdrop-blur">
        <div className="container py-4 flex gap-2 overflow-x-auto">
          {types.map((t) => (
            <button
              key={t.key}
              onClick={() => setType(t.key)}
              className={`shrink-0 text-[13px] px-3.5 h-9 rounded-full border transition-colors ${
                type === t.key
                  ? "bg-forest text-paper border-forest"
                  : "border-rule text-ink hover:border-forest hover:text-forest"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container">
          {list.length === 0 ? (
            <p className="text-center text-ink-2 py-24">No resources in this category yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((r) => (
                <ResourceCard key={r._id} r={r} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
