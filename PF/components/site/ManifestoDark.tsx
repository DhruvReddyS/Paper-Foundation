"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MeshGradient } from "@/components/ui/MeshGradient";

const principles = [
  {
    k: "01",
    t: "Evidence over assertion",
    s: "Every claim cites a public, reproducible source.",
  },
  {
    k: "02",
    t: "Trade-offs over slogans",
    s: "We resist binary framings of complex material systems.",
  },
  {
    k: "03",
    t: "Method over conclusion",
    s: "How a number is built matters as much as the number itself.",
  },
  {
    k: "04",
    t: "Open by default",
    s: "Our datasets, notes, and corrections live in public.",
  },
];

export function ManifestoDark() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xLeft = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const xRight = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden paper-grain dark-grain"
      style={{
        background: "#0E120E",
        color: "var(--paper)",
        padding: "120px 0 140px",
      }}
    >
      <MeshGradient
        palette={[
          "rgba(45,95,62,0.65)",
          "rgba(196,149,106,0.45)",
          "rgba(58,122,80,0.55)",
        ]}
        opacity={0.55}
      />

      <div className="relative z-10 container">
        <div className="pf-chip pf-chip--dark mb-12">An editorial position</div>

        <div
          className="font-serif"
          style={{
            fontSize: "clamp(48px, 9vw, 120px)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
          }}
        >
          <div className="flex items-baseline flex-wrap gap-x-6 gap-y-2">
            <motion.span style={{ x: xLeft }}>Paper</motion.span>
            <span style={{ color: "rgba(250,248,245,0.4)" }}>is not</span>
          </div>
          <div className="flex items-baseline flex-wrap gap-x-6 gap-y-2 mt-2">
            <span
              style={{
                textDecoration: "line-through",
                textDecorationColor: "var(--copper)",
                textDecorationThickness: "6px",
                color: "rgba(250,248,245,0.45)",
              }}
            >
              the&nbsp;enemy.
            </span>
            <motion.span
              style={{
                fontStyle: "italic",
                color: "var(--copper)",
                x: xRight,
              }}
            >
              It&apos;s a system.
            </motion.span>
          </div>
          <p
            className="font-serif italic mt-10 max-w-4xl"
            style={{
              fontSize: "clamp(18px, 2.2vw, 28px)",
              lineHeight: 1.45,
              color: "rgba(250,248,245,0.7)",
              letterSpacing: "-0.005em",
            }}
          >
            One built from forests, fields, mills, hands, decisions — and the rare
            luxury of being recoverable.
          </p>
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                borderTop: "1px solid rgba(250,248,245,0.18)",
                paddingTop: 22,
              }}
            >
              <div className="font-mono text-[11px] tracking-[0.18em] text-copper mb-3.5">
                {p.k} · PRINCIPLE
              </div>
              <div
                className="font-serif text-paper mb-2.5"
                style={{ fontSize: 22, letterSpacing: "-0.005em" }}
              >
                {p.t}
              </div>
              <div
                className="text-[14px] leading-relaxed"
                style={{ color: "rgba(250,248,245,0.6)" }}
              >
                {p.s}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
