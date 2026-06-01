"use client";

import { motion } from "framer-motion";

const items = [
  "Source-Cited",
  "Peer-Reviewed Where Possible",
  "Non-Partisan",
  "India-First",
  "Open Access",
];

export function TrustStrip() {
  return (
    <section className="border-y border-rule bg-paper-2/50 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.08 }}
        className="container py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[12px] uppercase tracking-[0.18em] text-ink-2"
      >
        {items.map((t, i) => (
          <motion.span
            key={t}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ color: "#2D5F3E" }}
            className="flex items-center gap-10 cursor-default transition-colors"
          >
            <span>{t}</span>
            {i < items.length - 1 && <span className="w-6 h-px bg-rule hidden md:inline-block" />}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
