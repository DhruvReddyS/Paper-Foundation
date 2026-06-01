"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { categoryLabel } from "@/lib/utils";

type Myth = {
  _id: string;
  slug: string;
  myth: string;
  fact: string;
  explanation: string;
  category: string;
  sources: { org: string; url: string }[];
};

export function MythCard({ m, initiallyOpen = false }: { m: Myth; initiallyOpen?: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);

  const share = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/myths#${m.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Myth vs Fact", text: m.myth, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {}
  };

  return (
    <div
      id={m.slug}
      className="group rounded-card border border-rule bg-paper shadow-card overflow-hidden cursor-pointer lift"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="p-7 md:p-8">
        <div className="flex items-center justify-between mb-5">
          <Badge tone="outline">{categoryLabel(m.category)}</Badge>
          <span className="text-[11px] uppercase tracking-[0.18em] text-copper">Myth</span>
        </div>
        <p
          className={`font-serif text-[1.35rem] md:text-[1.5rem] leading-snug text-forest-deep transition-all duration-500 ${
            open ? "line-through opacity-40" : ""
          }`}
        >
          "{m.myth}"
        </p>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-6 pt-6 border-t border-rule"
            >
              <span className="inline-flex items-center text-[11px] uppercase tracking-[0.18em] text-sage mb-3">
                <span className="w-5 h-px bg-sage mr-2" /> Fact
              </span>
              <p className="font-serif text-[1.25rem] leading-snug text-forest">{m.fact}</p>
              <p className="mt-3 text-[15px] text-ink/85 leading-relaxed">{m.explanation}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {m.sources.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Badge tone="forest">{s.org}</Badge>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[13px] text-forest">
            {open ? "Tap to collapse" : (
              <>
                See the evidence <ArrowRight size={14} />
              </>
            )}
          </span>
          <button
            onClick={share}
            className="text-ink-2 hover:text-forest transition-colors p-1.5"
            aria-label="Share this myth"
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
