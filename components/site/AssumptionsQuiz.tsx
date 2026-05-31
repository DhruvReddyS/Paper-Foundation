"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, RotateCw } from "lucide-react";
import Link from "next/link";

type Item = {
  statement: string;
  answer: boolean;
  explanation: string;
  source: string;
};

const items: Item[] = [
  {
    statement: "Most pulp used by Indian paper mills comes from natural forests.",
    answer: false,
    explanation:
      "Roughly 70% of Indian fibre furnish comes from agri-residue (wheat straw, bagasse) and farm-forestry plantations grown by lakhs of farmers, not from natural forests.",
    source: "IPMA · CPPRI",
  },
  {
    statement: "Recycled paper always has a lower carbon footprint than virgin paper.",
    answer: false,
    explanation:
      "Lifecycle context matters. Recycling generally reduces impact, but at high recycled content the energy mix of mills and the loss of biogenic carbon credit can shift the balance.",
    source: "EPA WARM · CEPI",
  },
  {
    statement: "Going fully digital eliminates the environmental impact of paper.",
    answer: false,
    explanation:
      "Digital substitution shifts impact rather than removing it: device manufacturing, data-centre energy, and short replacement cycles carry their own carbon and material footprint.",
    source: "The Shift Project · Borderstep",
  },
];

export function AssumptionsQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>([null, null, null]);
  const done = step >= items.length;
  const score = answers.filter((a, i) => a === items[i].answer).length;

  const reset = () => {
    setStep(0);
    setAnswers([null, null, null]);
  };

  const onAnswer = (val: boolean) => {
    const copy = [...answers];
    copy[step] = val;
    setAnswers(copy);
    setTimeout(() => setStep((s) => s + 1), 1600);
  };

  const current = !done ? items[step] : null;
  const correct = !done && answers[step] !== null ? answers[step] === current!.answer : null;

  return (
    <section id="test-assumptions" className="section-y">
      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-xl">
            <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">
              An invitation, not a quiz
            </p>
            <h2 className="font-serif text-h2 md:text-[2.5rem] text-forest-deep leading-tight">
              Test your assumptions.
            </h2>
          </div>
          <p className="text-[14px] text-ink-2 max-w-sm">
            Three statements. Mark each true or false. We'll show you what the research says —
            with sources.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-stretch">
          <div className="space-y-3">
            {items.map((it, i) => {
              const status =
                answers[i] === null ? "pending" : answers[i] === it.answer ? "correct" : "wrong";
              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 rounded-card border transition-colors ${
                    i === step && !done
                      ? "border-forest bg-paper"
                      : "border-rule bg-paper/40"
                  }`}
                >
                  <span
                    className={`w-6 h-6 mt-0.5 rounded-full grid place-items-center text-[11px] font-semibold shrink-0 ${
                      status === "pending"
                        ? "bg-paper-2 text-ink-2 border border-rule"
                        : status === "correct"
                          ? "bg-forest text-paper"
                          : "bg-copper text-paper"
                    }`}
                  >
                    {status === "pending" ? i + 1 : status === "correct" ? <Check size={12} /> : <X size={12} />}
                  </span>
                  <span className={`text-[14px] leading-snug ${status === "pending" ? "text-ink/80" : "text-ink"}`}>
                    {it.statement}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="relative min-h-[360px] rounded-card border border-rule bg-paper shadow-card overflow-hidden">
            <AnimatePresence mode="wait">
              {!done && (
                <motion.div
                  key={`q-${step}-${answers[step] === null ? "ask" : "answer"}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="p-8 md:p-10 h-full flex flex-col"
                >
                  {answers[step] === null ? (
                    <>
                      <p className="text-caption uppercase tracking-[0.18em] text-ink-2 mb-4">
                        Statement {step + 1} of {items.length}
                      </p>
                      <p className="font-serif text-[1.6rem] md:text-[1.85rem] leading-snug text-forest-deep">
                        "{current!.statement}"
                      </p>
                      <div className="mt-auto pt-8 flex gap-3">
                        <button
                          onClick={() => onAnswer(true)}
                          className="flex-1 h-12 rounded-[8px] bg-forest text-paper hover:bg-forest-deep transition-colors"
                        >
                          True
                        </button>
                        <button
                          onClick={() => onAnswer(false)}
                          className="flex-1 h-12 rounded-[8px] border border-forest text-forest hover:bg-forest hover:text-paper transition-colors"
                        >
                          False
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-caption uppercase tracking-[0.18em] text-sage mb-4">
                        {correct ? "Well reasoned" : "Common assumption"}
                      </p>
                      <p className="font-serif text-h3 text-forest-deep leading-snug">
                        {correct ? "Yes — that's the evidence." : `Actually: ${current!.answer ? "True" : "False"}.`}
                      </p>
                      <p className="mt-4 text-body-lg text-ink/85 leading-relaxed">
                        {current!.explanation}
                      </p>
                      <p className="mt-auto pt-6 text-[12px] uppercase tracking-[0.18em] text-ink-2">
                        Source · {current!.source}
                      </p>
                    </>
                  )}
                </motion.div>
              )}

              {done && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 md:p-10 h-full flex flex-col"
                >
                  <p className="text-caption uppercase tracking-[0.18em] text-sage mb-4">
                    You scored
                  </p>
                  <p className="font-serif text-[3rem] text-forest-deep leading-none">
                    {score} / {items.length}
                  </p>
                  <p className="mt-4 text-body-lg text-ink/85 leading-relaxed">
                    Most readers get one or two of these wrong on the first try — and that's
                    exactly why a clear, sourced public understanding of paper matters.
                  </p>
                  <div className="mt-auto pt-8 flex gap-3 flex-wrap">
                    <Link
                      href="/knowledge"
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-forest text-paper hover:bg-forest-deep transition-colors text-sm"
                    >
                      Read the evidence <ArrowRight size={15} />
                    </Link>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] border border-forest text-forest hover:bg-forest hover:text-paper transition-colors text-sm"
                    >
                      <RotateCw size={14} /> Try again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
