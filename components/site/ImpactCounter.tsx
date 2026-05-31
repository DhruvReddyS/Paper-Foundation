"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";

const stats = [
  {
    to: 70,
    suffix: "%",
    label: "of Indian fibre furnish",
    sub: "from agri-residue + farm-forestry plantations.",
    source: "IPMA · CPPRI",
  },
  {
    to: 30,
    suffix: "%+",
    label: "domestic recovery rate",
    sub: "for paper in India, and rising under EPR rules.",
    source: "CPPRI",
  },
  {
    to: 1.5,
    decimals: 1,
    suffix: "M+",
    label: "livelihoods in informal recovery",
    sub: "wastepickers and kabadiwalas across India.",
    source: "TERI · ILO estimates",
  },
  {
    to: 25,
    suffix: " Mt",
    label: "annual paper consumption",
    sub: "India is among the world's fastest-growing markets.",
    source: "IPMA Industry Overview",
  },
];

export function ImpactCounter() {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-forest-deep text-paper paper-grain dark-grain section-y overflow-hidden">
      {/* Animated subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg width="100%" height="100%" aria-hidden="true">
          <defs>
            <pattern id="impact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#impact-grid)" />
        </svg>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(196,149,106,0.22), transparent 70%)" }}
        animate={reduce ? {} : { x: [0, 20, -10, 0], y: [0, -10, 15, 0] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-14"
        >
          <p className="text-caption uppercase tracking-[0.18em] text-copper mb-3">
            India · By the numbers
          </p>
          <h2 className="font-serif text-h2 md:text-[2.5rem] leading-tight">
            A system bigger — and more circular — than most people realise.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="relative group"
            >
              <span className="absolute -left-3 top-0 w-px h-0 bg-copper transition-all duration-500 group-hover:h-full" />
              <p className="font-serif text-[3rem] leading-none tracking-tight">
                <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="mt-4 text-[15px] font-medium">{s.label}</p>
              <p className="mt-1 text-[14px] opacity-70 leading-relaxed">{s.sub}</p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.18em] opacity-50">{s.source}</p>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-12 text-[12px] opacity-50 max-w-3xl">
          Figures are rounded order-of-magnitude indicators drawn from cited sources. Definitive
          numbers vary by year and methodology — explore the linked references in each article
          for the latest.
        </p>
      </div>
    </section>
  );
}
