"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { PaperState } from "@/components/visuals/PaperState";
import { WordReveal } from "@/components/ui/WordReveal";

export function CinematicHero() {
  const reduce = useReducedMotion();
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0F1B14 0%, #1A2B22 100%)",
        color: "var(--paper)",
        minHeight: "min(94vh, 880px)",
        padding: "clamp(120px, 14vw, 180px) 0 110px",
      }}
    >
      <div className="j-grain j-grain--dark" />

      {/* faint orbital rings */}
      <svg
        viewBox="0 0 800 600"
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -80,
          top: 60,
          width: 760,
          height: 600,
          opacity: 0.5,
        }}
      >
        <g
          transform="translate(400 300)"
          style={
            reduce
              ? {}
              : {
                  animation: "pf-rotate-slow 80s linear infinite",
                  transformOrigin: "center",
                }
          }
        >
          <circle
            r="280"
            fill="none"
            stroke="#FAF8F5"
            strokeOpacity="0.10"
            strokeWidth="0.6"
            strokeDasharray="2 6"
          />
        </g>
        <g
          transform="translate(400 300)"
          style={
            reduce
              ? {}
              : {
                  animation: "pf-rotate-rev 110s linear infinite",
                  transformOrigin: "center",
                }
          }
        >
          <circle
            r="220"
            fill="none"
            stroke="#FAF8F5"
            strokeOpacity="0.14"
            strokeWidth="0.6"
          />
          <circle r="3" fill="#8B9D77" transform="translate(0 -220)" />
        </g>
        <g
          transform="translate(400 300)"
          style={
            reduce
              ? {}
              : {
                  animation: "pf-rotate-slow 60s linear infinite",
                  transformOrigin: "center",
                }
          }
        >
          <circle
            r="160"
            fill="none"
            stroke="#FAF8F5"
            strokeOpacity="0.18"
            strokeWidth="0.6"
            strokeDasharray="3 4"
          />
        </g>
        <circle
          cx="400"
          cy="300"
          r="100"
          fill="none"
          stroke="#FAF8F5"
          strokeOpacity="0.25"
          strokeWidth="0.7"
        />
      </svg>

      <div className="container relative z-10 grid lg:grid-cols-[minmax(0,1fr)_460px] gap-12 lg:gap-20 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <span className="pf-chip pf-chip--dark">
              A SUSTAINABILITY DOCUMENTARY
            </span>
            <span
              style={{
                width: 48,
                height: 1,
                background: "rgba(250,248,245,0.4)",
              }}
            />
            <span className="j-mono j-mono--paper">
              FOUR CHAPTERS · 22 MINUTES
            </span>
          </motion.div>

          <h1
            className="font-serif text-paper"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 6.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            <WordReveal as="span" className="block">How a sheet</WordReveal>
            <WordReveal as="span" className="block" delay={0.15}>
              of paper
            </WordReveal>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <em style={{ color: "#C4956A" }}>comes home</em>.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-9 max-w-xl leading-relaxed"
            style={{
              fontSize: 18,
              color: "rgba(250,248,245,0.78)",
            }}
          >
            An evidence-led study of the Indian paper system — from the moment a
            sheet is discarded to the moment it returns, indistinguishable, in
            your hand. Scroll to follow its arc.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-11 flex flex-wrap gap-4 items-center"
          >
            <a
              href="#chapter-01"
              className="inline-flex items-center gap-2.5 px-6 h-12 rounded-[8px] bg-paper text-forest-deep hover:bg-paper-2 transition-colors text-[14px] font-medium"
            >
              Begin the journey <ChevronDown size={14} />
            </a>
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2.5 px-6 h-12 text-[14px] font-medium"
              style={{ color: "rgba(250,248,245,0.85)" }}
            >
              Read the research <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative justify-self-center"
        >
          <PaperState state="crumple" width={460} height={520} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-9 flex flex-col items-center gap-3 z-10 pointer-events-none"
      >
        <span className="j-mono" style={{ color: "rgba(250,248,245,0.6)" }}>
          SCROLL TO BEGIN
        </span>
        <div
          style={{
            width: 1,
            height: 48,
            background:
              "linear-gradient(to bottom, rgba(250,248,245,0.6), rgba(250,248,245,0))",
          }}
        />
      </motion.div>
    </section>
  );
}
