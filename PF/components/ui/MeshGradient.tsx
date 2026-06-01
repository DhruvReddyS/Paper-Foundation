"use client";

import { useReducedMotion } from "framer-motion";

type Props = {
  palette?: [string, string, string];
  opacity?: number;
};

export function MeshGradient({
  palette = [
    "rgba(45,95,62,0.55)",
    "rgba(196,149,106,0.45)",
    "rgba(139,157,119,0.5)",
  ],
  opacity = 0.5,
}: Props) {
  const reduce = useReducedMotion();
  const anim = (n: 1 | 2 | 3, d: number) =>
    reduce ? "none" : `pf-mesh-${n} ${d}s ease-in-out infinite`;
  return (
    <div className="pf-mesh" style={{ opacity }} aria-hidden="true">
      <span
        style={{
          left: "-10%",
          top: "-15%",
          width: "55%",
          height: "55%",
          background: palette[0],
          animation: anim(1, 18),
        }}
      />
      <span
        style={{
          right: "-15%",
          top: "10%",
          width: "50%",
          height: "50%",
          background: palette[1],
          animation: anim(2, 22),
        }}
      />
      <span
        style={{
          left: "25%",
          bottom: "-25%",
          width: "60%",
          height: "60%",
          background: palette[2],
          animation: anim(3, 26),
        }}
      />
    </div>
  );
}
