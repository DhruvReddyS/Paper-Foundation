"use client";

import { useEffect, useState } from "react";

type Props = {
  words: string[];
  interval?: number;
  className?: string;
};

export function MorphWord({ words, interval = 2400, className }: Props) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  const maxLen = Math.max(...words.map((w) => w.length));
  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        minWidth: `${maxLen * 0.55}ch`,
        verticalAlign: "baseline",
      }}
    >
      {words.map((w, idx) => {
        const isActive = idx === i;
        const isPrev = idx === (i - 1 + words.length) % words.length;
        return (
          <span
            key={w}
            aria-hidden={!isActive}
            style={{
              position: idx === 0 ? "relative" : "absolute",
              left: 0,
              top: 0,
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? "translateY(0) scale(1)"
                : isPrev
                  ? "translateY(-60%) scale(0.92)"
                  : "translateY(60%) scale(0.92)",
              filter: isActive ? "blur(0)" : "blur(8px)",
              transition:
                "opacity .7s cubic-bezier(.2,.7,.3,1), transform .8s cubic-bezier(.2,.7,.3,1), filter .7s cubic-bezier(.2,.7,.3,1)",
              whiteSpace: "nowrap",
              fontStyle: "italic",
              color: "var(--forest)",
            }}
          >
            {w}
          </span>
        );
      })}
    </span>
  );
}
