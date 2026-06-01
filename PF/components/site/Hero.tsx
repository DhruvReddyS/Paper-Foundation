"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { AbstractHero } from "@/components/visuals/AbstractHero";
import { Button } from "@/components/ui/Button";
import { WordReveal } from "@/components/ui/WordReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { MorphWord } from "@/components/ui/MorphWord";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { CountUp } from "@/components/ui/CountUp";

const signals = [
  { to: 70, suffix: "%", sub: "agri-residue + farm-forestry", src: "IPMA · CPPRI" },
  { to: 30, suffix: "%+", sub: "domestic recovery rate", src: "CPPRI · '24" },
  { to: 5, suffix: "–7", sub: "cycles per fibre", src: "CEPI" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.4]);

  return (
    <section ref={ref} className="relative paper-grain overflow-hidden">
      <MeshGradient
        palette={[
          "rgba(45,95,62,0.42)",
          "rgba(196,149,106,0.36)",
          "rgba(139,157,119,0.45)",
        ]}
        opacity={0.45}
      />
      <motion.div
        style={{ y: heroY, opacity }}
        className="container relative z-10 pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center"
      >
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pf-chip mb-7"
          >
            <span
              className="w-[7px] h-[7px] rounded-full bg-forest"
              style={{
                boxShadow: "0 0 0 4px rgba(45,95,62,0.16)",
                animation: "pf-blink 2.4s ease-in-out infinite",
              }}
            />
            Registered Society · Hyderabad · 2025
          </motion.div>

          <h1 className="font-serif leading-[1.02] tracking-tight text-forest-deep" style={{ fontSize: "clamp(2.5rem, 6vw, 4.25rem)" }}>
            <WordReveal as="span" className="block">Understanding paper</WordReveal>
            <span className="block">
              through{" "}
              <MorphWord
                words={["evidence", "research", "context", "fibre"]}
              />
              ,
            </span>
            <WordReveal as="span" className="block text-ink-2" delay={0.35}>
              not assumption.
            </WordReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-serif italic text-[1.15rem] text-forest leading-snug"
          >
            &ldquo;Love Paper, use Paper — without hesitation.&rdquo;
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-body-lg text-ink/85 leading-relaxed max-w-lg"
          >
            Paper Foundation is a registered society advocating fair, factual
            understanding of paper, printing, recycling and the natural systems they
            depend on. We push back on misinformation in both directions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Magnetic strength={0.35}>
              <Button href="/knowledge" variant="primary" size="lg">
                Explore the evidence <ArrowRight size={16} />
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button href="#test-assumptions" variant="secondary" size="lg">
                Test your assumptions
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.12, delayChildren: 1.05 }}
            className="mt-10 grid grid-cols-3 gap-3 max-w-2xl"
          >
            {signals.map((s) => (
              <motion.div
                key={s.sub}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                }}
                className="border border-rule rounded-[14px] px-4 py-3.5"
              >
                <div
                  className="font-serif text-forest"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-[12px] text-ink mt-1.5 leading-snug">{s.sub}</div>
                <div className="pf-eyebrow mt-1.5 text-[9.5px]">{s.src}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-8 text-[13px] text-ink-2 leading-relaxed max-w-md"
          >
            <Link href="/about" className="editorial-link text-forest">
              Read our editorial principles
            </Link>{" "}
            · evidence-first, balanced, open by default.
          </motion.p>
        </div>

        <motion.div style={{ y: visualY, scale: visualScale }} className="relative">
          <AbstractHero />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-2 pointer-events-none"
      >
        <span>Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-ink-2 to-transparent"
          animate={reduce ? {} : { scaleY: [0.3, 1, 0.3] }}
          style={{ originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
