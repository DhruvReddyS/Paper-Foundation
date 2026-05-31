"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Share2, ArrowRight, X } from "lucide-react";
import { categoryLabel } from "@/lib/utils";

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
  { key: "all", label: "All Myths" },
  { key: "forests", label: "Forests & Fibre" },
  { key: "recycling", label: "Recycling" },
  { key: "digital-vs-paper", label: "Digital vs Paper" },
  { key: "industry", label: "Industry" },
  { key: "circularity", label: "Circularity" },
];

const tones: Record<
  number,
  { bg: string; accent: string; ink: "light" | "dark" }
> = {
  0: { bg: "#1A2B22", accent: "#C4956A", ink: "light" },
  1: { bg: "#F2EDE7", accent: "#2D5F3E", ink: "dark" },
  2: { bg: "#244D32", accent: "#FAF8F5", ink: "light" },
  3: { bg: "#FAF8F5", accent: "#C4956A", ink: "dark" },
  4: { bg: "#0F1B14", accent: "#8B9D77", ink: "light" },
  5: { bg: "#ECE5DC", accent: "#2D5F3E", ink: "dark" },
};

export function MythsImmersive({ myths }: { myths: Myth[] }) {
  const [cat, setCat] = useState("all");
  const list = useMemo(
    () => (cat === "all" ? myths : myths.filter((m) => m.category === cat)),
    [myths, cat]
  );

  return (
    <>
      {/* Sticky filter chip rail */}
      <div
        className="sticky z-30 border-y border-rule backdrop-blur"
        style={{
          top: 64,
          background: "rgba(250,248,245,0.85)",
        }}
      >
        <div className="container py-4 flex items-center gap-3 overflow-x-auto">
          <span className="j-mono shrink-0 mr-2">FILTER</span>
          {cats.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className="shrink-0 transition-all"
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: cat === c.key ? "var(--forest)" : "transparent",
                color: cat === c.key ? "var(--paper)" : "var(--ink-2)",
                border: `1px solid ${cat === c.key ? "var(--forest)" : "var(--rule)"}`,
              }}
            >
              {c.label}
            </button>
          ))}
          <span className="ml-auto j-mono text-ink-2 shrink-0">
            {String(list.length).padStart(2, "0")} ·{" "}
            {String(myths.length).padStart(2, "0")} TOTAL
          </span>
        </div>
      </div>

      {/* Stacked full-bleed myth scenes */}
      {list.length === 0 ? (
        <div className="container py-32 text-center text-ink-2">
          No myths in this category.
        </div>
      ) : (
        list.map((m, i) => (
          <MythScene
            key={m._id}
            m={m}
            i={i}
            total={list.length}
            tone={tones[i % 6]}
            flip={i % 2 === 1}
          />
        ))
      )}

      {/* Closing CTA */}
      <section
        className="relative overflow-hidden paper-grain dark-grain"
        style={{
          background: "#0F1B14",
          color: "var(--paper)",
          padding: "clamp(80px, 12vw, 140px) 0",
        }}
      >
        <div className="container relative z-10 max-w-4xl">
          <span className="j-mono" style={{ color: "rgba(250,248,245,0.6)" }}>
            CORRECTIONS DESK
          </span>
          <h2
            className="font-serif mt-5"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            Spotted a myth we haven&apos;t addressed?<br />
            <em style={{ color: "#C4956A" }}>Or one we got wrong?</em>
          </h2>
          <p
            className="mt-7 max-w-2xl"
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "rgba(250,248,245,0.78)",
            }}
          >
            We correct in public, dated, and visible. Write to the corrections
            desk and we&apos;ll respond within five working days.
          </p>
          <Link
            href="/contact?type=general"
            className="inline-flex items-center gap-2.5 mt-10 px-6 h-12 rounded-[8px] bg-paper text-forest-deep hover:bg-paper-2 transition-colors text-[14px] font-medium"
          >
            Send a correction <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}

function MythScene({
  m,
  i,
  total,
  tone,
  flip,
}: {
  m: Myth;
  i: number;
  total: number;
  tone: { bg: string; accent: string; ink: "light" | "dark" };
  flip: boolean;
}) {
  const [open, setOpen] = useState(false);
  const dark = tone.ink === "light";
  const reduce = useReducedMotion();

  const share = async () => {
    const url = `${window.location.origin}/myths#${m.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Myth vs Fact", text: m.myth, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {}
  };

  return (
    <section
      id={m.slug}
      className="relative overflow-hidden"
      style={{
        background: tone.bg,
        color: dark ? "var(--paper)" : "var(--ink)",
        padding: "clamp(80px, 12vw, 140px) 0",
        minHeight: "min(100vh, 760px)",
      }}
    >
      <div
        className={dark ? "j-grain j-grain--dark" : "j-grain"}
        style={dark ? { opacity: 0.42 } : { opacity: 0.45 }}
      />

      {/* Giant ghost numeral */}
      <div
        aria-hidden="true"
        className="absolute font-serif pointer-events-none select-none"
        style={{
          [flip ? "right" : "left"]: "-2vw",
          top: "20%",
          fontSize: "clamp(180px, 26vw, 360px)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          color: tone.accent,
          opacity: 0.12,
        }}
      >
        {String(i + 1).padStart(2, "0")}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="container relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center"
      >
        <div>
          <div className="flex items-center gap-3 mb-7 flex-wrap">
            <span
              style={{
                padding: "5px 10px",
                borderRadius: 999,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: tone.accent,
                color: dark ? "var(--forest-deep)" : "var(--paper)",
              }}
            >
              MYTH {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="j-mono"
              style={{
                color: dark ? "rgba(250,248,245,0.55)" : "var(--ink-2)",
              }}
            >
              {categoryLabel(m.category).toUpperCase()} · {String(i + 1).padStart(2, "0")}/
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: dark ? "var(--paper)" : "var(--forest-deep)",
              textDecoration: open ? "line-through" : "none",
              textDecorationColor: tone.accent,
              textDecorationThickness: "3px",
              opacity: open ? 0.4 : 1,
              transition: "all .5s ease",
            }}
          >
            &ldquo;{m.myth}&rdquo;
          </h2>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9 pt-9"
                style={{
                  borderTop: `1px solid ${dark ? "rgba(250,248,245,0.22)" : "var(--rule)"}`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-block w-7 h-px"
                    style={{ background: tone.accent }}
                  />
                  <span
                    className="j-mono"
                    style={{ color: tone.accent }}
                  >
                    THE EVIDENCE
                  </span>
                </div>
                <p
                  className="font-serif italic"
                  style={{
                    fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
                    lineHeight: 1.4,
                    color: dark ? "var(--paper)" : "var(--forest)",
                  }}
                >
                  {m.fact}
                </p>
                <p
                  className="mt-5"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.75,
                    color: dark ? "rgba(250,248,245,0.78)" : "var(--ink)",
                    maxWidth: 640,
                  }}
                >
                  {m.explanation}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-2">
                  <span
                    className="j-mono mr-2"
                    style={{
                      color: dark ? "rgba(250,248,245,0.55)" : "var(--ink-2)",
                    }}
                  >
                    SOURCES
                  </span>
                  {m.sources.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: "5px 12px",
                        borderRadius: 999,
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        background: dark
                          ? "rgba(250,248,245,0.08)"
                          : "rgba(45,95,62,0.08)",
                        color: dark ? "var(--paper)" : "var(--forest)",
                        border: `1px solid ${dark ? "rgba(250,248,245,0.16)" : "rgba(45,95,62,0.18)"}`,
                      }}
                    >
                      {s.org}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-4 flex-wrap">
            {!open ? (
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 h-12 rounded-[8px] transition-colors text-[14px] font-medium"
                style={{
                  background: tone.accent,
                  color: dark ? "var(--forest-deep)" : "var(--paper)",
                }}
              >
                Reveal the evidence <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2.5 px-5 h-11 text-[13px]"
                style={{
                  color: dark ? "rgba(250,248,245,0.7)" : "var(--ink-2)",
                  border: `1px solid ${dark ? "rgba(250,248,245,0.2)" : "var(--rule)"}`,
                  borderRadius: 999,
                }}
              >
                <X size={14} /> Collapse
              </button>
            )}
            <button
              onClick={share}
              className="inline-flex items-center gap-2 text-[13px] opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: dark ? "var(--paper)" : "var(--ink)" }}
              aria-label="Share this myth"
            >
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>

        {/* Right column: stat & ornament */}
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : flip ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <MythSigil tone={tone} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function MythSigil({
  tone,
}: {
  tone: { bg: string; accent: string; ink: "light" | "dark" };
}) {
  const dark = tone.ink === "light";
  const stroke = dark ? "rgba(250,248,245,0.45)" : "rgba(45,95,62,0.4)";
  return (
    <svg
      viewBox="0 0 400 400"
      width="100%"
      height="auto"
      style={{ maxWidth: 400, display: "block", margin: "0 auto" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ms-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={tone.accent} stopOpacity="0.4" />
          <stop offset="1" stopColor={tone.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#ms-glow)" />
      <g
        style={{
          transformOrigin: "200px 200px",
          animation: "j-orbit-cw 80s linear infinite",
        }}
      >
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke={stroke}
          strokeWidth="0.6"
          strokeDasharray="2 6"
        />
        <circle cx="200" cy="40" r="3" fill={tone.accent} />
      </g>
      <g
        style={{
          transformOrigin: "200px 200px",
          animation: "j-orbit-ccw 50s linear infinite",
        }}
      >
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke={stroke}
          strokeWidth="0.6"
        />
        <circle cx="320" cy="200" r="2.5" fill={tone.accent} />
      </g>
      <g
        style={{
          transformOrigin: "200px 200px",
          animation: "j-orbit-cw 30s linear infinite",
        }}
      >
        <circle
          cx="200"
          cy="200"
          r="80"
          fill="none"
          stroke={stroke}
          strokeWidth="0.6"
          strokeDasharray="3 4"
        />
      </g>
      <circle
        cx="200"
        cy="200"
        r="60"
        fill={dark ? "rgba(15,27,20,0.6)" : "rgba(255,255,255,0.6)"}
        stroke={tone.accent}
        strokeWidth="0.8"
      />
      <text
        x="200"
        y="196"
        textAnchor="middle"
        fontFamily="Libre Baskerville, serif"
        fontStyle="italic"
        fontSize="16"
        fill={tone.accent}
      >
        myth
      </text>
      <text
        x="200"
        y="216"
        textAnchor="middle"
        fontFamily="Libre Baskerville, serif"
        fontStyle="italic"
        fontSize="16"
        fill={dark ? "var(--paper)" : "var(--ink)"}
      >
        vs. fact
      </text>
    </svg>
  );
}
