"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { ArticleCard, type ArticleCardData } from "./ArticleCard";
import { categoryLabel, formatDate } from "@/lib/utils";
import { Tilt } from "@/components/ui/Tilt";

type Article = ArticleCardData & {
  _id: string;
  featured?: boolean;
  tags?: string[];
};

const categories = [
  { key: "all", label: "All" },
  { key: "forests", label: "Forests & Fibre" },
  { key: "recycling", label: "Recycling" },
  { key: "digital-vs-paper", label: "Digital vs Paper" },
  { key: "industry", label: "Industry" },
  { key: "circularity", label: "Circularity" },
  { key: "policy", label: "Policy" },
  { key: "research", label: "Research" },
];

export function KnowledgeHub({ articles }: { articles: Article[] }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [quickOnly, setQuickOnly] = useState(false);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (cat !== "all" && a.category !== cat) return false;
      if (quickOnly && !a.quickRead) return false;
      if (q) {
        const hay = (
          a.title +
          " " +
          a.excerpt +
          " " +
          (a.tags || []).join(" ")
        ).toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [articles, cat, q, quickOnly]);

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a !== featured);

  // Editorial categorisation for sidebar
  const tagCounts = useMemo(() => {
    const map = new Map<string, number>();
    articles.forEach((a) =>
      a.tags?.forEach((t) => map.set(t, (map.get(t) || 0) + 1))
    );
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 18);
  }, [articles]);

  return (
    <>
      {/* Sticky search + filter rail */}
      <section
        className="sticky z-30 border-b border-rule backdrop-blur"
        style={{
          top: 64,
          background: "rgba(250,248,245,0.85)",
        }}
      >
        <div className="container py-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the editorial library…"
              className="w-full h-10 pl-9 pr-3 rounded-[8px] border border-rule bg-paper text-[14px] focus:border-forest outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto -mx-1 px-1 flex-1">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className="shrink-0 transition-colors"
                style={{
                  padding: "7px 12px",
                  borderRadius: 999,
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: cat === c.key ? "var(--forest)" : "transparent",
                  color: cat === c.key ? "var(--paper)" : "var(--ink-2)",
                  border: `1px solid ${cat === c.key ? "var(--forest)" : "var(--rule)"}`,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 j-mono cursor-pointer">
            <input
              type="checkbox"
              checked={quickOnly}
              onChange={(e) => setQuickOnly(e.target.checked)}
              className="accent-forest"
            />
            QUICK READS
          </label>
        </div>
      </section>

      <section style={{ padding: "clamp(56px, 8vw, 90px) 0 120px" }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-32">
              <p className="font-serif text-h2 text-ink-2 mb-3">
                No articles match those filters.
              </p>
              <button
                onClick={() => {
                  setCat("all");
                  setQ("");
                  setQuickOnly(false);
                }}
                className="editorial-link text-forest"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                {featured && (
                  <motion.div
                    key={`feat-${featured.slug}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FeaturedHero a={featured} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 mt-20">
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } },
                  }}
                  className="grid sm:grid-cols-2 gap-6"
                >
                  {rest.map((a) => (
                    <motion.div
                      key={a._id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                    >
                      <ArticleCard a={a} />
                    </motion.div>
                  ))}
                </motion.div>

                <aside className="lg:sticky lg:top-32 self-start space-y-9">
                  <div>
                    <div className="j-mono text-forest mb-3">LATEST · 5</div>
                    <ul className="border-t border-rule">
                      {articles.slice(0, 5).map((a) => (
                        <li key={a._id} className="border-b border-rule py-3.5">
                          <Link href={`/knowledge/${a.slug}`} className="group block">
                            <p className="font-serif text-[15px] leading-snug text-forest-deep group-hover:text-forest transition-colors line-clamp-2">
                              {a.title}
                            </p>
                            <p className="j-mono mt-1.5">
                              {a.readingTimeMin ?? 5} MIN · {formatDate(a.publishedAt)}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tagCounts.length > 0 && (
                    <div>
                      <div className="j-mono text-forest mb-3">TAGS</div>
                      <div className="flex flex-wrap gap-1.5">
                        {tagCounts.map(([t, n]) => (
                          <button
                            key={t}
                            onClick={() => setQ(t)}
                            className="inline-flex items-center gap-1 j-mono"
                            style={{
                              padding: "5px 10px",
                              borderRadius: 999,
                              border: "1px solid var(--rule)",
                              background: "var(--paper)",
                              color: "var(--ink-2)",
                            }}
                          >
                            {t}{" "}
                            <span style={{ color: "var(--forest)" }}>· {n}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className="rounded-card p-6 paper-grain"
                    style={{
                      background: "var(--forest-deep)",
                      color: "var(--paper)",
                    }}
                  >
                    <div
                      className="j-mono"
                      style={{ color: "var(--copper)", marginBottom: 12 }}
                    >
                      FACT OF THE WEEK
                    </div>
                    <p
                      className="font-serif italic leading-snug"
                      style={{ fontSize: 18 }}
                    >
                      &ldquo;Water needed to make a tonne of paper in Indian
                      mills has dropped roughly 40% since 2000 — and continues
                      to fall.&rdquo;
                    </p>
                    <Link
                      href="/#test-assumptions"
                      className="inline-flex items-center gap-2 mt-5 text-[13px]"
                      style={{ color: "var(--copper)" }}
                    >
                      Test your assumptions <ArrowRight size={13} />
                    </Link>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function FeaturedHero({ a }: { a: Article }) {
  return (
    <Tilt intensity={3}>
      <Link
        href={`/knowledge/${a.slug}`}
        className="group lift block rounded-card overflow-hidden border border-rule bg-paper shadow-card hover:shadow-card-hover"
      >
        <div className="grid lg:grid-cols-[1.2fr_1fr]">
          <div
            className="relative bg-paper-2 overflow-hidden"
            style={{ aspectRatio: "16 / 11" }}
          >
            {a.coverImage?.url ? (
              <img
                src={a.coverImage.url}
                alt={a.coverImage.alt || a.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            ) : (
              <FeaturedPlaceholder />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(15,27,20,0.35))",
              }}
            />
            <div
              className="absolute top-5 left-5"
              style={{
                padding: "5px 12px",
                borderRadius: 999,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                background: "var(--forest)",
                color: "var(--paper)",
              }}
            >
              FEATURED · {categoryLabel(a.category).toUpperCase()}
            </div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="j-mono mb-5">
                {a.readingTimeMin ?? 5} MIN READ · {formatDate(a.publishedAt)}
              </div>
              <h2
                className="font-serif text-forest-deep group-hover:text-forest transition-colors"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                }}
              >
                {a.title}
              </h2>
              <p
                className="mt-5 text-ink-2 leading-relaxed line-clamp-4"
                style={{ fontSize: 15.5 }}
              >
                {a.excerpt}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3 j-mono text-forest">
              <span>READ THE ARTICLE</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}

function FeaturedPlaceholder() {
  return (
    <svg
      viewBox="0 0 800 550"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="fp-glow" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#C4956A" stopOpacity="0.25" />
          <stop offset="1" stopColor="#C4956A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="550" fill="#F2EDE7" />
      <circle cx="400" cy="275" r="220" fill="url(#fp-glow)" />
      <g
        style={{
          transformOrigin: "400px 275px",
          animation: "j-orbit-cw 80s linear infinite",
        }}
      >
        <circle
          cx="400"
          cy="275"
          r="200"
          fill="none"
          stroke="#2D5F3E"
          strokeOpacity="0.2"
          strokeWidth="0.8"
          strokeDasharray="3 6"
        />
        <circle cx="400" cy="75" r="4" fill="#2D5F3E" />
      </g>
      <g
        style={{
          transformOrigin: "400px 275px",
          animation: "j-orbit-ccw 50s linear infinite",
        }}
      >
        <circle
          cx="400"
          cy="275"
          r="140"
          fill="none"
          stroke="#2D5F3E"
          strokeOpacity="0.3"
          strokeWidth="0.8"
        />
        <circle cx="540" cy="275" r="3" fill="#C4956A" />
      </g>
      <polygon
        points="320,180 480,170 500,360 340,380"
        fill="#8B9D77"
        opacity="0.4"
      />
      <polygon
        points="340,200 500,190 520,380 360,400"
        fill="#2D5F3E"
        opacity="0.2"
      />
    </svg>
  );
}
