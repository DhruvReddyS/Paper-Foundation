"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { categoryLabel, formatDate } from "@/lib/utils";

type Props = {
  title: string;
  excerpt: string;
  category: string;
  author?: string;
  publishedAt?: string | Date;
  readingTimeMin?: number;
  coverImage?: { url?: string; alt?: string };
  quickRead?: boolean;
  refCount?: number;
};

export function ArticleHero({
  title,
  excerpt,
  category,
  author,
  publishedAt,
  readingTimeMin,
  coverImage,
  quickRead,
  refCount = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.4]);

  return (
    <header ref={ref} className="relative paper-grain border-b border-rule overflow-hidden">
      <motion.div
        style={{ y: textY, opacity }}
        className="container max-w-5xl relative z-10"
      >
        <div
          style={{
            padding: "clamp(80px, 12vw, 130px) 0 clamp(36px, 5vw, 60px)",
          }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-9">
            <Badge tone="forest">{categoryLabel(category)}</Badge>
            {quickRead && <Badge tone="copper">Quick Read</Badge>}
            <span className="j-mono">
              {readingTimeMin ?? 5} MIN · {formatDate(publishedAt)}
            </span>
            {refCount > 0 && (
              <span
                className="j-mono"
                style={{
                  color: "var(--forest)",
                  background: "rgba(45,95,62,0.08)",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                {refCount} SOURCES CITED
              </span>
            )}
          </div>

          <h1
            className="font-serif text-forest-deep"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 4.75rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              maxWidth: 1080,
              margin: 0,
            }}
          >
            {title}
          </h1>

          <p
            className="mt-7 max-w-3xl leading-relaxed text-ink/80"
            style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)" }}
          >
            {excerpt}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className="w-10 h-10 rounded-full grid place-items-center font-serif text-paper bg-forest"
                style={{ fontStyle: "italic", fontSize: 18 }}
              >
                {(author || "P")[0]}
              </div>
              <div>
                <div className="text-[13px] text-ink">
                  By {author || "Paper Foundation Editorial"}
                </div>
                <div className="j-mono mt-0.5">
                  PUBLISHED · {formatDate(publishedAt)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 j-mono">
              <span>SCROLL</span>
              <span
                className="inline-block w-px h-8"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--ink-2), transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {coverImage?.url && (
        <div className="container max-w-6xl pb-12 relative z-10">
          <div
            className="relative bg-paper-2 rounded-card overflow-hidden"
            style={{ aspectRatio: "16 / 7" }}
          >
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
              <Image
                src={coverImage.url}
                alt={coverImage.alt || title}
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(15,27,20,0.35))",
                }}
              />
            </motion.div>
          </div>
        </div>
      )}
    </header>
  );
}
