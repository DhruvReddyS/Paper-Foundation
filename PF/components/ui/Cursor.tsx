"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 30 });
  const sy = useSpring(y, { stiffness: 400, damping: 30 });

  useEffect(() => {
    if (reduce) return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]')
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ scale: hovering ? 2.2 : 1, opacity: hovering ? 0.5 : 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-multiply hidden lg:block"
    >
      <div className="w-3 h-3 rounded-full bg-forest" />
    </motion.div>
  );
}
