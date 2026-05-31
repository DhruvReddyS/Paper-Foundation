"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const myths = [
  {
    myth: "Using paper destroys India's forests.",
    fact: "Most Indian paper mills run on agri-residue and farm-forestry plantations — not natural forests.",
    explanation:
      "According to the Indian Paper Manufacturers Association and the Central Pulp & Paper Research Institute, the wood used by Indian mills is largely sourced from plantations on farmer lands (eucalyptus, casuarina, subabul). Agri-residues such as wheat straw and bagasse make up a further large share of fibre furnish. Natural forest wood contributes a small fraction.",
    sources: ["IPMA", "CPPRI", "MoEFCC"],
  },
];

export function MythOfDay() {
  const [revealed, setRevealed] = useState(false);
  // pick deterministically by day
  const idx = new Date().getDate() % myths.length;
  const m = myths[idx];

  return (
    <section className="bg-paper-2 paper-grain section-y">
      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">
              Myth of the day
            </p>
            <h2 className="font-serif text-h2 md:text-[2.5rem] text-forest-deep leading-tight">
              What people often say.<br />
              <span className="italic text-forest">What the evidence actually shows.</span>
            </h2>
          </div>
          <Link href="/myths" className="text-[14px] editorial-link text-forest">
            See all myths →
          </Link>
        </div>

        <div className="rounded-card border border-rule bg-paper shadow-card overflow-hidden">
          <div className="p-8 md:p-12">
            <p className="text-caption uppercase tracking-[0.18em] text-copper mb-4">Myth</p>
            <p
              className={`font-serif text-[1.8rem] md:text-[2.2rem] leading-snug text-forest-deep transition-all duration-500 ${
                revealed ? "line-through opacity-40" : ""
              }`}
            >
              "{m.myth}"
            </p>

            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 pt-8 border-t border-rule"
                >
                  <p className="text-caption uppercase tracking-[0.18em] text-sage mb-4">Fact</p>
                  <p className="font-serif text-[1.5rem] md:text-[1.85rem] leading-snug text-forest">
                    {m.fact}
                  </p>
                  <p className="mt-5 text-body-lg text-ink/85 leading-relaxed max-w-3xl">
                    {m.explanation}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {m.sources.map((s) => (
                      <Badge key={s} tone="outline">{s}</Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!revealed && (
              <button
                onClick={() => setRevealed(true)}
                className="mt-8 inline-flex items-center gap-2 text-forest hover:text-forest-deep text-[14px] tracking-wide"
              >
                Reveal the evidence <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
