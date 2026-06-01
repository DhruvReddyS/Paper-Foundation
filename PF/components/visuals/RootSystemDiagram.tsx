"use client";

import { motion } from "framer-motion";

type Callout = {
  y: number;
  side: "L" | "R";
  tag: string;
  v: string;
  l: string;
};

const callouts: Callout[] = [
  {
    y: 60,
    side: "L",
    tag: "CANOPY",
    v: "+38% photosynthate / m²",
    l: "mixed-species canopy outperforms monoculture by 38% in net primary production",
  },
  {
    y: 240,
    side: "R",
    tag: "TRUNK",
    v: "412 t C / ha",
    l: "mean carbon stock above and below ground, 60-year stand",
  },
  {
    y: 540,
    side: "L",
    tag: "TOPSOIL",
    v: "9.2 g N / kg soil",
    l: "nitrogen retention in upper 30cm — twice the regional baseline",
  },
  {
    y: 820,
    side: "R",
    tag: "MYCORRHIZA",
    v: "1,300 km / m³",
    l: "fungal hyphal length per cubic metre of root-zone soil",
  },
  {
    y: 1080,
    side: "L",
    tag: "AQUIFER",
    v: "82% precip retained",
    l: "rotational forest retains four-fifths of monsoon precipitation in-basin",
  },
];

export function RootSystemDiagram() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "40px 0 0",
        background:
          "linear-gradient(180deg, #ECE5DC 0%, #DDD3C3 30%, #6F5A3F 55%, #3A2A18 80%, #1F1408 100%)",
      }}
    >
      <div className="j-grain j-grain--dark" style={{ opacity: 0.45 }} />

      <div style={{ position: "relative", height: 1480, width: "100%" }}>
        <svg
          viewBox="0 0 1440 1480"
          width="100%"
          height="1480"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute", inset: 0 }}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="rs-sun" cx="0.5" cy="0.2" r="0.5">
              <stop offset="0" stopColor="#FAF3E2" stopOpacity="0.7" />
              <stop offset="1" stopColor="#FAF3E2" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rs-ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7A6243" />
              <stop offset="1" stopColor="#2B1B0A" />
            </linearGradient>
            <linearGradient id="rs-trunk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3A2A18" />
              <stop offset="0.5" stopColor="#604633" />
              <stop offset="1" stopColor="#2D1F12" />
            </linearGradient>
          </defs>

          <ellipse cx="720" cy="60" rx="320" ry="160" fill="url(#rs-sun)" />

          <line
            x1="0"
            y1="380"
            x2="1440"
            y2="380"
            stroke="rgba(255,255,255,0.18)"
            strokeDasharray="2 6"
          />
          <text
            x="80"
            y="370"
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            fill="rgba(255,255,255,0.55)"
            letterSpacing="0.16em"
          >
            — GROUND LINE
          </text>

          {/* canopy */}
          <g fill="#2D5F3E" opacity="0.92">
            <ellipse cx="720" cy="260" rx="220" ry="80" />
            <ellipse cx="580" cy="230" rx="120" ry="60" />
            <ellipse cx="860" cy="220" rx="140" ry="68" />
            <ellipse cx="720" cy="180" rx="160" ry="58" fill="#3A7A50" />
            <ellipse cx="640" cy="160" rx="80" ry="42" fill="#3A7A50" />
            <ellipse cx="820" cy="160" rx="90" ry="44" fill="#3A7A50" />
          </g>
          <g
            stroke="#244D32"
            strokeWidth="0.6"
            strokeOpacity="0.55"
            fill="none"
          >
            {Array.from({ length: 30 }).map((_, i) => {
              const a = (i / 30) * Math.PI * 2;
              const r = 70 + (i % 5) * 22;
              const x1 = +(720 + Math.cos(a) * r * 0.4).toFixed(2);
              const y1 = +(220 + Math.sin(a) * r * 0.3).toFixed(2);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1 - 10}
                  x2={x1}
                  y2={y1 + 12}
                />
              );
            })}
          </g>

          {/* neighbour trees */}
          <g opacity="0.5">
            <ellipse cx="220" cy="320" rx="80" ry="40" fill="#244D32" />
            <ellipse cx="280" cy="290" rx="60" ry="34" fill="#3A7A50" />
            <rect x="245" y="320" width="10" height="60" fill="#3A2A18" />
            <ellipse cx="1240" cy="320" rx="80" ry="40" fill="#244D32" />
            <ellipse cx="1180" cy="295" rx="56" ry="32" fill="#3A7A50" />
            <rect x="1235" y="320" width="10" height="60" fill="#3A2A18" />
          </g>

          {/* trunk */}
          <path
            d="M 700,380 L 700,560 Q 700,620 712,700 L 720,820 L 728,940 Q 740,1020 740,1100 L 740,1200"
            stroke="url(#rs-trunk)"
            strokeWidth="44"
            fill="none"
            strokeLinecap="round"
            opacity="0.95"
          />
          <g stroke="#1F1408" strokeWidth="0.7" strokeOpacity="0.55" fill="none">
            <path d="M704,400 Q 706,500 710,600 Q 716,720 720,820 Q 726,940 736,1050 L 740,1180" />
            <path d="M696,400 Q 692,520 700,640 Q 706,760 712,880 Q 720,1000 728,1100 L 732,1180" />
            <path d="M712,400 Q 720,540 720,660 Q 720,780 730,900 Q 742,1020 748,1140" />
          </g>

          <rect
            x="0"
            y="380"
            width="1440"
            height="1100"
            fill="url(#rs-ground)"
            opacity="0.5"
          />

          {/* soil horizon ticks */}
          <g stroke="rgba(255,255,255,0.18)" strokeDasharray="2 8">
            <line x1="0" y1="520" x2="1440" y2="520" />
            <line x1="0" y1="760" x2="1440" y2="760" />
            <line x1="0" y1="1040" x2="1440" y2="1040" />
          </g>
          <g
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            fill="rgba(255,255,255,0.55)"
            letterSpacing="0.16em"
          >
            <text x="80" y="514">— O / TOPSOIL — 30cm</text>
            <text x="80" y="754">— B / SUBSOIL — 90cm</text>
            <text x="80" y="1034">— C / WEATHERED — 180cm</text>
            <text x="80" y="1280">— R / BEDROCK</text>
          </g>

          {/* root system */}
          <g
            stroke="#C4956A"
            strokeOpacity="0.85"
            fill="none"
            strokeLinecap="round"
          >
            <path
              d="M720,420 Q 580,500 460,640 Q 380,760 320,920 Q 280,1080 280,1240"
              strokeWidth="3.5"
            />
            <path
              d="M720,420 Q 860,500 980,640 Q 1060,760 1120,920 Q 1160,1080 1160,1240"
              strokeWidth="3.5"
            />
            <path
              d="M720,430 Q 700,580 700,760 Q 700,940 720,1140 Q 720,1280 720,1420"
              strokeWidth="3"
            />
            <path
              d="M720,430 Q 640,560 580,720 Q 540,880 540,1040 Q 540,1180 560,1320"
              strokeWidth="2.6"
            />
            <path
              d="M720,430 Q 800,560 860,720 Q 900,880 900,1040 Q 900,1180 880,1320"
              strokeWidth="2.6"
            />
            <path
              d="M460,640 Q 360,700 280,720 Q 200,740 140,820"
              strokeWidth="1.4"
            />
            <path
              d="M980,640 Q 1080,700 1160,720 Q 1240,740 1300,820"
              strokeWidth="1.4"
            />
            <path
              d="M320,920 Q 240,950 180,1000 Q 120,1060 80,1140"
              strokeWidth="1.2"
            />
            <path
              d="M1120,920 Q 1200,950 1260,1000 Q 1320,1060 1360,1140"
              strokeWidth="1.2"
            />
            <path
              d="M700,760 Q 620,800 540,840 Q 460,890 400,960"
              strokeWidth="1.2"
            />
            <path
              d="M700,760 Q 780,800 860,840 Q 940,890 1000,960"
              strokeWidth="1.2"
            />
            <path
              d="M540,1040 Q 460,1100 400,1180 Q 360,1240 340,1330"
              strokeWidth="1.1"
            />
            <path
              d="M900,1040 Q 980,1100 1040,1180 Q 1080,1240 1100,1330"
              strokeWidth="1.1"
            />
          </g>

          {/* fine roots & mycelia */}
          <g stroke="#C4956A" strokeOpacity="0.45" strokeWidth="0.6" fill="none">
            {Array.from({ length: 120 }).map((_, i) => {
              const seed = (i * 7919) % 1000;
              const x = +(80 + (seed / 1000) * 1280).toFixed(2);
              const y = +(600 + ((i * 131) % 800)).toFixed(2);
              const dx = ((i * 173) % 80) - 40;
              const dy = ((i * 61) % 60) - 30;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={y}
                  x2={x + dx}
                  y2={y + dy}
                />
              );
            })}
          </g>
          <g fill="#FAF8F5" opacity="0.55">
            {Array.from({ length: 80 }).map((_, i) => {
              const seed = (i * 7211) % 1000;
              const x = +(100 + (seed / 1000) * 1240).toFixed(2);
              const y = +(700 + ((i * 199) % 700)).toFixed(2);
              return <circle key={i} cx={x} cy={y} r={0.8} />;
            })}
          </g>

          <line
            x1="0"
            y1="1340"
            x2="1440"
            y2="1340"
            stroke="#8FB7CC"
            strokeOpacity="0.35"
            strokeDasharray="4 4"
          />
          <text
            x="80"
            y="1334"
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            fill="rgba(143,183,204,0.7)"
            letterSpacing="0.16em"
          >
            ~ AQUIFER ~
          </text>
        </svg>

        {callouts.map((co) => (
          <Callout key={co.tag} co={co} y={co.y + 380} />
        ))}
      </div>
    </section>
  );
}

function Callout({ co, y }: { co: Callout; y: number }) {
  const isL = co.side === "L";
  return (
    <motion.div
      initial={{ opacity: 0, x: isL ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        top: y,
        [isL ? "left" : "right"]: 80,
        width: 320,
        color: "#FAF8F5",
        zIndex: 3,
      }}
    >
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="pf-chip pf-chip--dark">{co.tag}</span>
        <span style={{ flex: 1, height: 1, background: "rgba(250,248,245,0.3)" }} />
      </div>
      <div
        className="font-serif"
        style={{ fontSize: 36, lineHeight: 1.1, color: "#FAF8F5" }}
      >
        {co.v}
      </div>
      <p
        className="font-serif italic mt-3"
        style={{
          fontSize: 15,
          lineHeight: 1.55,
          color: "rgba(250,248,245,0.78)",
        }}
      >
        {co.l}
      </p>
    </motion.div>
  );
}
