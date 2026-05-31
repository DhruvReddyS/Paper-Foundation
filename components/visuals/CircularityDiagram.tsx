"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Stage = {
  key: string;
  label: string;
  stat: string;
  detail: string;
  source: string;
};

const stages: Stage[] = [
  {
    key: "fibre",
    label: "Fibre Source",
    stat: "~70%",
    detail: "of fibre used by Indian paper mills comes from agri-residue and farm-forestry plantations, not natural forests.",
    source: "IPMA · CPPRI",
  },
  {
    key: "pulp",
    label: "Pulping",
    stat: "−40%",
    detail: "specific water consumption per tonne of paper achieved by Indian mills since 2000, with continued reductions reported by CPPRI.",
    source: "CPPRI",
  },
  {
    key: "paper",
    label: "Paper Making",
    stat: "~25 Mt",
    detail: "estimated annual paper & paperboard consumption in India (FY 2023), one of the world's fastest-growing markets.",
    source: "IPMA Industry Overview",
  },
  {
    key: "use",
    label: "Use",
    stat: "55+ kg",
    detail: "global per-capita paper consumption; India remains well below at roughly 17–18 kg/person/year.",
    source: "CEPI Key Stats",
  },
  {
    key: "collection",
    label: "Collection",
    stat: "Informal",
    detail: "India's recovery system is driven by waste-pickers and kabadiwalas — millions of livelihoods, formalising under EPR rules.",
    source: "TERI · MoEFCC",
  },
  {
    key: "recovery",
    label: "Recovered Fibre",
    stat: "~30%",
    detail: "domestic paper recovery rate, with ~60% of fibre furnish coming from recycled inputs (incl. imported recovered paper).",
    source: "CPPRI · IPMA",
  },
];

export function CircularityDiagram() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const a = stages[active];

  const cx = 250;
  const cy = 250;
  const r = 180;

  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
      <div className="relative aspect-square max-w-[500px] mx-auto">
        <svg viewBox="0 0 500 500" className="w-full h-full">
          <defs>
            <radialGradient id="cd-center" cx="0.5" cy="0.5" r="0.55">
              <stop offset="0%" stopColor="#2D5F3E" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#2D5F3E" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r="160" fill="url(#cd-center)" />
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#2D5F3E"
            strokeWidth="1"
            strokeDasharray="3 6"
            opacity="0.4"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />
          <circle cx={cx} cy={cy} r="120" fill="none" stroke="#E0DAD2" strokeWidth="1" />

          {stages.map((s, i) => {
            const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
            const x = Number((cx + r * Math.cos(angle)).toFixed(2));
            const y = Number((cy + r * Math.sin(angle)).toFixed(2));
            const isActive = i === active;
            return (
              <g
                key={s.key}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                role="button"
                aria-label={`${s.label}: ${s.stat}`}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 30 : 22}
                  fill={isActive ? "#2D5F3E" : "#FAF8F5"}
                  stroke="#2D5F3E"
                  strokeWidth={isActive ? 1.5 : 1.2}
                  className="transition-all duration-300"
                />
                <text
                  x={x}
                  y={y - 38}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#2C2C2C"
                  className="font-medium"
                  style={{ letterSpacing: "0.04em", textTransform: "uppercase" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill={isActive ? "#FAF8F5" : "#2D5F3E"}
                  className="font-semibold pointer-events-none"
                >
                  {s.stat}
                </text>
                <text
                  x={x}
                  y={y + 52}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6B6B6B"
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* arrows between nodes */}
          {stages.map((_, i) => {
            const a1 = (i / stages.length) * Math.PI * 2 - Math.PI / 2 + 0.18;
            const a2 = ((i + 1) / stages.length) * Math.PI * 2 - Math.PI / 2 - 0.18;
            const x1 = (cx + r * Math.cos(a1)).toFixed(2);
            const y1 = (cy + r * Math.sin(a1)).toFixed(2);
            const x2 = (cx + r * Math.cos(a2)).toFixed(2);
            const y2 = (cy + r * Math.sin(a2)).toFixed(2);
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke="#2D5F3E"
                strokeWidth="1"
                opacity="0.4"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-[180px]">
            <p className="font-serif text-h3 text-forest-deep">{a.stat}</p>
            <p className="text-[12px] uppercase tracking-[0.16em] text-ink-2 mt-1">{a.label}</p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">
          The Paper Circle
        </p>
        <h3 className="font-serif text-h2 text-forest-deep mb-5">
          A material that returns.
        </h3>
        <motion.p
          key={a.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-body-lg text-ink leading-relaxed mb-5"
        >
          {a.detail}
        </motion.p>
        <p className="text-[13px] text-ink-2">
          Stage: <span className="text-forest font-medium">{a.label}</span> · Source: {a.source}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {stages.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setActive(i)}
              className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                i === active
                  ? "bg-forest text-paper border-forest"
                  : "border-rule text-ink hover:border-forest hover:text-forest"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
