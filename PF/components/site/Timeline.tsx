"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Item = {
  year: string;
  title: string;
  body: string;
  accent?: string;
};

const milestones: Item[] = [
  {
    year: "2024",
    title: "An idea, a few notes, a kitchen-table desk.",
    body: "The first conversations: editors, mill engineers, environmental researchers, journalists. A shared sense that the paper conversation in India was being held without evidence.",
    accent: "#8B9D77",
  },
  {
    year: "FEB 2025",
    title: "Registered as a society under Telangana law.",
    body: "Paper Foundation is formally registered under the Telangana Societies Registration Act, 2001 — Reg. No. 50 of 2025 — with a registered office in Hyderabad. Public bylaws, public membership form.",
    accent: "#C4956A",
  },
  {
    year: "2025",
    title: "Advisory board takes shape.",
    body: "Four advisors join — across industry leadership, environmental policy, regional journalism, and the print sector — bringing complementary domain expertise into editorial decisions.",
    accent: "#2D5F3E",
  },
  {
    year: "2026",
    title: "First public knowledge platform goes live.",
    body: "Knowledge Hub, Myths archive, Lab studies, Forestry chapter, and the membership programme launch publicly. CC BY 4.0 from day one. Corrections desk open.",
    accent: "#3A7A50",
  },
  {
    year: "NEXT",
    title: "An institute, not a website.",
    body: "Field-funded studies, regional-language editorial, partnerships with mills and municipal corporations, an open lab of reproducible research.",
    accent: "#C4956A",
  },
];

export function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="bg-paper-2 border-y border-rule"
      style={{ padding: "clamp(80px, 12vw, 140px) 0" }}
    >
      <div className="container max-w-5xl">
        <div className="j-mono mb-4 text-forest">
          A SHORT HISTORY · {String(milestones.length).padStart(2, "0")} MARKERS
        </div>
        <h2
          className="font-serif text-forest-deep"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: 900,
          }}
        >
          How a small society in Hyderabad got <em className="text-forest">started</em>.
        </h2>

        <div
          className="relative mt-16"
          style={{ paddingLeft: "clamp(50px, 7vw, 90px)" }}
        >
          {/* Background line */}
          <div
            className="absolute"
            style={{
              left: "clamp(18px, 2.5vw, 30px)",
              top: 0,
              bottom: 0,
              width: 2,
              background: "var(--rule)",
            }}
          />
          {/* Animated foreground line */}
          <motion.div
            className="absolute"
            style={{
              left: "clamp(18px, 2.5vw, 30px)",
              top: 0,
              width: 2,
              height: lineHeight,
              background: "var(--forest)",
              originY: 0,
            }}
          />

          <ol className="space-y-14">
            {milestones.map((m, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.05,
                }}
                className="relative"
              >
                {/* node */}
                <span
                  className="absolute"
                  style={{
                    left: "calc(clamp(18px, 2.5vw, 30px) - 7px - clamp(50px, 7vw, 90px))",
                    top: 6,
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    background: m.accent || "var(--forest)",
                    boxShadow: `0 0 0 5px var(--paper-2), 0 0 0 6px ${m.accent || "var(--forest)"}33`,
                  }}
                />
                <div className="j-mono text-forest mb-2">{m.year}</div>
                <h3
                  className="font-serif text-forest-deep"
                  style={{
                    fontSize: "clamp(1.4rem, 2.5vw, 1.875rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    marginBottom: 12,
                  }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-ink leading-relaxed max-w-2xl"
                  style={{ fontSize: 15.5 }}
                >
                  {m.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
