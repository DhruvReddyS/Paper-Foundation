"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/* Pinned scene: child element sticks while parent scrolls a given distance.
 * Returns scroll progress 0→1 the consumer can use for transforms. */
export function ScrollScene({
  children,
  heightVh = 300,
  className,
}: {
  children: (p: MotionValue<number>) => ReactNode;
  heightVh?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <section
      ref={ref}
      className={className}
      style={{ position: "relative", height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </section>
  );
}

export function ParallaxLayer({
  speed = 0.3,
  children,
  className,
}: {
  speed?: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-100 * speed, 100 * speed]
  );
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* Scroll-driven 3D tilt that rotates a card as it crosses the viewport. */
export function Scroll3DCard({
  children,
  className,
  maxRotate = 12,
}: {
  children: ReactNode;
  className?: string;
  maxRotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [maxRotate, 0, -maxRotate]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [0.94, 1, 0.96]
  );
  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        scale,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Word-by-word reveal driven by scroll progress (not viewport entry). */
export function ScrollWords({
  text,
  className,
  highlight,
}: {
  text: string;
  className?: string;
  highlight?: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const words = text.split(" ");
  return (
    <div ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = (i + 1.5) / words.length;
        return <Word key={i} w={w} start={start} end={end} progress={scrollYProgress} highlight={!!highlight?.includes(w)} />;
      })}
    </div>
  );
}

function Word({
  w,
  start,
  end,
  progress,
  highlight,
}: {
  w: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  highlight: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  return (
    <motion.span
      style={{
        opacity,
        y,
        display: "inline-block",
        color: highlight ? "var(--forest)" : undefined,
        fontStyle: highlight ? "italic" : undefined,
      }}
    >
      {w}{" "}
    </motion.span>
  );
}
