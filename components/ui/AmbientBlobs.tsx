"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AmbientBlobs() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(139,157,119,0.18), transparent 70%)" }}
        animate={reduce ? {} : { x: [0, 30, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(196,149,106,0.14), transparent 70%)" }}
        animate={reduce ? {} : { x: [0, -25, 15, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 right-1/3 w-[480px] h-[480px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(45,95,62,0.12), transparent 70%)" }}
        animate={reduce ? {} : { x: [0, 15, -20, 0], y: [0, -15, 20, 0] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
