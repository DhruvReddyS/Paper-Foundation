"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PaperState } from "@/components/visuals/PaperState";

type Chapter = {
  id: "crumple" | "recover" | "blend" | "reform";
  label: string;
  title: string;
  sub: string;
  body: string;
  stat: { v: string; u: string; l: string };
  bg: string;
  ink: string;
  accent: string;
};

const chapters: Chapter[] = [
  {
    id: "crumple",
    label: "01 / Crumple",
    title: "Discard",
    sub: "Every twelve seconds a sheet of paper is thrown away in India.",
    body: "The arc of paper does not end at the waste basket. It begins there. From households, ministries, classrooms and millions of small shops, paper is condensed back into a raw material before any forest is touched.",
    stat: {
      v: "9.3M",
      u: "tonnes / year",
      l: "recovered post-consumer fibre, FY24",
    },
    bg: "#1A2B22",
    ink: "#FAF8F5",
    accent: "#8B9D77",
  },
  {
    id: "recover",
    label: "02 / Recover",
    title: "Recover",
    sub: "Paper is one of the most route-dense recyclables on the subcontinent.",
    body: "Local kabadiwalas collect from doorsteps; aggregators bale at neighbourhood depots; mills tender for trailers of mixed grade. The system is informal, dispersed, and — by mass — the largest paper recovery network in the world.",
    stat: {
      v: "~30%",
      u: "domestic recovery rate",
      l: "of India's paper, and rising under EPR",
    },
    bg: "#F2EDE7",
    ink: "#1F2A22",
    accent: "#2D5F3E",
  },
  {
    id: "blend",
    label: "03 / Blend",
    title: "Blend",
    sub: "Old fibre is shorter, weaker, and quietly extraordinary.",
    body: "Inside the pulper, recovered sheets break apart into a slurry of cellulose. A small fraction of virgin fibre — from farm-forestry plantations — is added for strength. The blend is washed, screened, refined and bleached without chlorine.",
    stat: {
      v: "5–7×",
      u: "recycling cycles",
      l: "before fibre length is exhausted",
    },
    bg: "#244D32",
    ink: "#FAF8F5",
    accent: "#C4956A",
  },
  {
    id: "reform",
    label: "04 / Reform",
    title: "Reform",
    sub: "A new sheet, watermarked with everything it remembers.",
    body: "On the wire, the slurry drains, presses, dries and emerges as paper again — the same fibres, now in their second, third or seventh life. The journey is not linear. It is a closed loop with widening margins of efficiency.",
    stat: {
      v: "~70%",
      u: "of fibre intake",
      l: "is agri-residue + farm-forestry, not natural forest",
    },
    bg: "#FAF8F5",
    ink: "#1F2A22",
    accent: "#2D5F3E",
  },
];

export function LifecycleChapters() {
  return (
    <>
      {chapters.map((c, i) => (
        <ChapterSection key={c.id} idx={i} chapter={c} total={chapters.length} />
      ))}
    </>
  );
}

function ChapterSection({
  idx,
  chapter: c,
  total,
}: {
  idx: number;
  chapter: Chapter;
  total: number;
}) {
  const flip = idx % 2 === 1;
  const dark = c.ink === "#FAF8F5";
  return (
    <section
      id={`chapter-0${idx + 1}`}
      className="relative overflow-hidden"
      style={{
        background: c.bg,
        color: c.ink,
        padding: "clamp(80px, 12vw, 130px) 0",
        minHeight: "min(100vh, 920px)",
      }}
    >
      <div
        className={dark ? "j-grain j-grain--dark" : "j-grain"}
        style={dark ? { opacity: 0.42 } : { opacity: 0.45 }}
      />

      <div
        className="container relative z-10 grid items-center"
        style={{
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: "clamp(40px, 8vw, 100px)",
        }}
      >
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "clamp(40px, 6vw, 80px)",
          }}
        >
          <div
            className={`grid lg:grid-cols-[480px_minmax(0,1fr)] items-center gap-12 lg:gap-20 ${flip ? "" : "lg:[direction:rtl]"}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 1.1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex justify-center lg:[direction:ltr]"
            >
              <div
                aria-hidden="true"
                className="absolute font-serif select-none pointer-events-none"
                style={{
                  top: -60,
                  [flip ? "left" : "right"]: -30,
                  fontSize: "clamp(120px, 16vw, 220px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: c.accent,
                  opacity: 0.1,
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>
              <PaperState state={c.id} width={460} height={520} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:[direction:ltr]"
            >
              <div
                className="j-mono mb-7"
                style={{
                  color: dark ? "rgba(250,248,245,0.62)" : "var(--ink-2)",
                }}
              >
                {c.label} · CHAPTER OF {String(total).padStart(2, "0")}
              </div>
              <h2
                className="font-serif"
                style={{
                  color: c.ink,
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  margin: 0,
                }}
              >
                {c.title}
                <span style={{ color: c.accent }}>.</span>
              </h2>
              <p
                className="font-serif italic mt-7"
                style={{
                  fontSize: "clamp(1.05rem, 1.6vw, 1.375rem)",
                  lineHeight: 1.45,
                  maxWidth: 560,
                  color: dark ? "rgba(250,248,245,0.85)" : c.ink,
                }}
              >
                {c.sub}
              </p>
              <p
                className="mt-7"
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.75,
                  maxWidth: 560,
                  color: dark ? "rgba(250,248,245,0.74)" : "var(--ink-2)",
                }}
              >
                {c.body}
              </p>

              <div
                className="mt-11 flex items-baseline gap-5"
                style={{
                  padding: "24px 26px",
                  borderLeft: `2px solid ${c.accent}`,
                  background: dark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(45,95,62,0.04)",
                }}
              >
                <div
                  className="font-serif"
                  style={{
                    fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: c.accent,
                  }}
                >
                  {c.stat.v}
                </div>
                <div>
                  <div
                    className="j-mono"
                    style={{
                      color: dark ? "rgba(250,248,245,0.7)" : "var(--ink-2)",
                    }}
                  >
                    {c.stat.u}
                  </div>
                  <div
                    className="font-serif italic mt-1.5"
                    style={{
                      fontSize: 15,
                      color: dark ? "rgba(250,248,245,0.78)" : c.ink,
                    }}
                  >
                    {c.stat.l}
                  </div>
                </div>
              </div>

              <a
                className="inline-flex items-center gap-2 mt-10 border-b pb-0.5"
                href="/knowledge"
                style={{
                  color: c.accent,
                  borderColor: c.accent,
                  fontWeight: 500,
                }}
              >
                Read the chapter notes <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
