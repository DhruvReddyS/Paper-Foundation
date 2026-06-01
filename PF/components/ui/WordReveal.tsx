"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function WordReveal({ children, className, delay = 0, as = "h1" }: Props) {
  const reduce = useReducedMotion();
  const words = children.split(" ");
  const Comp = motion[as] as typeof motion.h1;

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: reduce ? 0 : "100%", opacity: reduce ? 1 : 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

type CharProps = {
  children: ReactNode;
  className?: string;
};
export function ShineText({ children, className }: CharProps) {
  return (
    <span
      className={`relative inline-block bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_4s_ease-in-out_infinite] ${className || ""}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #2D5F3E 0%, #3A7A50 30%, #C4956A 50%, #3A7A50 70%, #2D5F3E 100%)",
      }}
    >
      {children}
    </span>
  );
}
