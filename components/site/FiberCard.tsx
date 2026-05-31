"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export type Fiber = {
  id: string;
  cat: string;
  title: string;
  body: string;
  m1: string;
  m1l: string;
  m2: string;
  m2l: string;
  year: string;
  status: "OPEN" | "CLOSED";
};

export function FiberCard({
  f,
  span = 2,
  tall = false,
}: {
  f: Fiber;
  span?: number;
  tall?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="pf-tile"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      style={{
        gridColumn: `span ${span}`,
        gridRow: tall ? "span 2" : "auto",
        padding: 28,
        position: "relative",
        background: open ? "#1F2A22" : "#fff",
        color: open ? "var(--paper)" : "var(--ink)",
        borderColor: open ? "#1F2A22" : "var(--rule)",
        transition:
          "background .35s ease, color .35s ease, border-color .35s ease, transform .35s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 16,
        overflow: "hidden",
        minHeight: tall ? 560 : 280,
      }}
    >
      <svg
        viewBox="0 0 400 220"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -40,
          top: -20,
          width: 260,
          height: 160,
          opacity: open ? 0.4 : 0.18,
          transition: "opacity .35s ease",
        }}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M ${i * 30} 0 Q ${i * 30 + 40} 110 ${i * 30 - 30} 220`}
            stroke={open ? "#C4956A" : "var(--forest)"}
            strokeWidth="0.7"
            strokeOpacity="0.6"
            fill="none"
          />
        ))}
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="flex items-center gap-2.5 mb-4">
          <span
            className="j-mono"
            style={{ color: open ? "#C4956A" : "var(--forest)" }}
          >
            {f.id}
          </span>
          <span
            style={{
              flex: 1,
              height: 1,
              background: open ? "rgba(255,255,255,0.16)" : "var(--rule)",
            }}
          />
          <span
            className="j-mono"
            style={{
              color: open ? "rgba(250,248,245,0.5)" : "var(--ink-2)",
            }}
          >
            {f.cat}
          </span>
        </div>
        <h3
          className="font-serif"
          style={{
            fontSize: tall ? 34 : span >= 4 ? 32 : 24,
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            color: open ? "var(--paper)" : "var(--ink)",
            marginBottom: 12,
          }}
        >
          {f.title}
        </h3>
        <p
          style={{
            fontSize: 14.5,
            lineHeight: 1.65,
            color: open ? "rgba(250,248,245,0.72)" : "var(--ink-2)",
            maxHeight: open ? 320 : 0,
            overflow: "hidden",
            opacity: open ? 1 : 0,
            transition: "max-height .45s ease, opacity .3s ease",
          }}
        >
          {f.body}
        </p>
      </div>

      <div
        className="flex items-end justify-between gap-5"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="flex gap-6">
          <div>
            <div
              className="font-serif"
              style={{
                fontSize: 38,
                lineHeight: 1,
                color: open ? "#C4956A" : "var(--forest)",
              }}
            >
              {f.m1}
            </div>
            <div
              className="j-mono mt-1.5"
              style={{ color: open ? "rgba(250,248,245,0.55)" : "var(--ink-2)" }}
            >
              {f.m1l.toUpperCase()}
            </div>
          </div>
          <div>
            <div
              className="font-serif"
              style={{
                fontSize: 28,
                lineHeight: 1,
                color: open ? "var(--paper)" : "var(--ink)",
              }}
            >
              {f.m2}
            </div>
            <div
              className="j-mono mt-1.5"
              style={{ color: open ? "rgba(250,248,245,0.55)" : "var(--ink-2)" }}
            >
              {f.m2l.toUpperCase()}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            className="j-mono"
            style={{ color: open ? "rgba(250,248,245,0.55)" : "var(--ink-2)" }}
          >
            {f.status} · {f.year}
          </span>
          <span
            className="grid place-items-center"
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              background: open ? "#C4956A" : "transparent",
              border: open ? "none" : "1px solid var(--rule)",
              color: open ? "#1F2A22" : "var(--ink)",
              transition: "all .25s ease",
            }}
          >
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}
