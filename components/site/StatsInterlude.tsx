"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const stats = [
  {
    big: "Twelve seconds.",
    sub: "The interval at which a sheet of paper is discarded in India.",
    src: "FOUNDATION FIELD ESTIMATE",
  },
  {
    big: "Seventeen kilograms.",
    sub: "India's per-capita paper consumption — far below the global average of ~55kg.",
    src: "CEPI KEY STATS",
  },
  {
    big: "Five to seven cycles.",
    sub: "The number of times a single paper fibre can be recovered before its length is exhausted.",
    src: "CEPI RECYCLING",
  },
  {
    big: "Roughly seventy percent.",
    sub: "The share of fibre intake at Indian mills sourced from agri-residue and farm-forestry plantations.",
    src: "IPMA · CPPRI",
  },
];

export function StatsInterlude() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = stats.length;

  return (
    <section
      ref={ref}
      style={{ position: "relative", height: `${total * 80}vh` }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "var(--paper-2)" }}
      >
        <div className="j-grain" style={{ opacity: 0.35 }} />

        <div className="container relative z-10 h-full grid place-items-center">
          <div className="w-full max-w-5xl">
            <div className="j-mono mb-7 text-forest">
              FOUR FIGURES · ONE SYSTEM
            </div>

            {stats.map((s, i) => (
              <StatSlide
                key={i}
                stat={s}
                index={i}
                total={total}
                progress={scrollYProgress}
                reduce={!!reduce}
              />
            ))}

            {/* progress dots */}
            <div
              className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3"
              style={{ zIndex: 5 }}
            >
              {stats.map((_, i) => (
                <Dot key={i} idx={i} total={total} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatSlide({
  stat,
  index,
  total,
  progress,
  reduce,
}: {
  stat: { big: string; sub: string; src: string };
  index: number;
  total: number;
  progress: import("framer-motion").MotionValue<number>;
  reduce: boolean;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const peakStart = start + segment * 0.15;
  const peakEnd = start + segment * 0.85;
  const end = start + segment;

  const opacity = useTransform(
    progress,
    [start, peakStart, peakEnd, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, peakStart, peakEnd, end],
    reduce ? [0, 0, 0, 0] : [40, 0, 0, -40]
  );
  const rotateX = useTransform(
    progress,
    [start, peakStart, peakEnd, end],
    reduce ? [0, 0, 0, 0] : [12, 0, 0, -12]
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        rotateX,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        padding: "0 clamp(24px, 5vw, 64px)",
      }}
    >
      <div className="w-full max-w-4xl">
        <div className="j-mono text-copper mb-4">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <h2
          className="font-serif text-forest-deep"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {stat.big}
        </h2>
        <p
          className="mt-7 font-serif italic text-ink"
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.45rem)",
            lineHeight: 1.5,
            maxWidth: 680,
          }}
        >
          {stat.sub}
        </p>
        <div className="j-mono mt-7" style={{ color: "var(--ink-2)" }}>
          SOURCE · {stat.src}
        </div>
      </div>
    </motion.div>
  );
}

function Dot({
  idx,
  total,
  progress,
}: {
  idx: number;
  total: number;
  progress: import("framer-motion").MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = idx * segment;
  const end = start + segment;
  const active = useTransform(progress, [start, start + segment / 2, end], [0, 1, 0]);
  const scale = useTransform(active, [0, 1], [1, 1.6]);
  const bg = useTransform(active, [0, 1], ["#D4CCC0", "#2D5F3E"]);
  return (
    <motion.span
      style={{
        width: 8,
        height: 8,
        borderRadius: 999,
        background: bg,
        scale,
      }}
    />
  );
}
