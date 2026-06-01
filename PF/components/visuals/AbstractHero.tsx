"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AbstractHero() {
  const reduce = useReducedMotion();
  return (
    <div className="relative aspect-[6/5] w-full">
      <svg viewBox="0 0 600 500" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="ah-forest" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2D5F3E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#244D32" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="ah-sage" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8B9D77" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8B9D77" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="ah-copper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C4956A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C4956A" stopOpacity="0.5" />
          </linearGradient>
          <pattern id="ah-fibers" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
            <line x1="0" y1="10" x2="20" y2="10" stroke="#244D32" strokeWidth="0.4" opacity="0.25" />
          </pattern>
        </defs>

        {/* big rotating ring */}
        <motion.g
          style={{ transformOrigin: "300px 250px" }}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        >
          <circle cx="300" cy="250" r="200" fill="none" stroke="#2D5F3E" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.5" />
          <circle cx="300" cy="250" r="160" fill="none" stroke="#8B9D77" strokeWidth="0.6" strokeDasharray="1 5" opacity="0.6" />
          <circle cx="300" cy="250" r="120" fill="none" stroke="#2D5F3E" strokeWidth="0.5" opacity="0.3" />
          {/* nodes on rings */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const r = 200;
            const x = (300 + r * Math.cos((deg * Math.PI) / 180)).toFixed(2);
            const y = (250 + r * Math.sin((deg * Math.PI) / 180)).toFixed(2);
            return <circle key={i} cx={x} cy={y} r="4" fill="#2D5F3E" />;
          })}
        </motion.g>

        {/* central layered paper planes */}
        <motion.g
          animate={reduce ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        >
          <polygon
            points="180,150 380,130 410,260 220,310"
            fill="url(#ah-sage)"
          />
          <polygon
            points="180,150 380,130 410,260 220,310"
            fill="url(#ah-fibers)"
          />
          <polygon
            points="220,200 420,180 440,330 240,360"
            fill="url(#ah-forest)"
          />
          <polygon
            points="270,250 470,230 490,380 290,410"
            fill="url(#ah-copper)"
            opacity="0.92"
          />

          {/* fold lines */}
          <line x1="180" y1="150" x2="220" y2="310" stroke="#244D32" strokeWidth="0.5" opacity="0.6" />
          <line x1="220" y1="200" x2="240" y2="360" stroke="#244D32" strokeWidth="0.5" opacity="0.7" />
          <line x1="270" y1="250" x2="290" y2="410" stroke="#244D32" strokeWidth="0.5" opacity="0.7" />
        </motion.g>

        {/* knowledge graph nodes */}
        <motion.g
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        >
          <line x1="120" y1="100" x2="230" y2="180" stroke="#2D5F3E" strokeWidth="0.7" opacity="0.55" />
          <line x1="120" y1="100" x2="90" y2="220" stroke="#2D5F3E" strokeWidth="0.7" opacity="0.55" />
          <line x1="90" y1="220" x2="230" y2="180" stroke="#2D5F3E" strokeWidth="0.7" opacity="0.55" />
          <line x1="90" y1="220" x2="140" y2="380" stroke="#2D5F3E" strokeWidth="0.7" opacity="0.5" />
          <line x1="500" y1="100" x2="430" y2="200" stroke="#2D5F3E" strokeWidth="0.7" opacity="0.5" />
          <line x1="500" y1="100" x2="540" y2="220" stroke="#2D5F3E" strokeWidth="0.7" opacity="0.5" />
          <line x1="540" y1="220" x2="510" y2="380" stroke="#2D5F3E" strokeWidth="0.7" opacity="0.5" />
          {[
            [120, 100],
            [230, 180],
            [90, 220],
            [140, 380],
            [500, 100],
            [430, 200],
            [540, 220],
            [510, 380],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="#FAF8F5" stroke="#2D5F3E" strokeWidth="1.2" />
            </g>
          ))}
        </motion.g>

        {/* faint paper texture top-left corner accent */}
        <rect x="40" y="60" width="80" height="6" fill="#C4956A" opacity="0.5" />
        <rect x="40" y="72" width="40" height="6" fill="#C4956A" opacity="0.3" />
      </svg>
    </div>
  );
}
