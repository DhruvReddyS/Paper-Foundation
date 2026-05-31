"use client";

import { type CSSProperties } from "react";

type State = "crumple" | "recover" | "blend" | "reform";

export function PaperState({
  state = "crumple",
  width = 460,
  height = 520,
}: {
  state?: State;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      viewBox="0 0 400 500"
      width={width}
      height={height}
      style={{ display: "block", overflow: "visible" }}
      aria-label={`paper state ${state}`}
    >
      <defs>
        <linearGradient id={`ps-sheet-${state}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="1" stopColor="#F2EDE7" stopOpacity="0.94" />
        </linearGradient>
        <linearGradient id={`ps-edge-${state}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FAF8F5" />
          <stop offset="0.5" stopColor="#E8E0D0" />
          <stop offset="1" stopColor="#C7B89E" />
        </linearGradient>
        <radialGradient id={`ps-glow-${state}`} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#C4956A" stopOpacity="0.30" />
          <stop offset="0.5" stopColor="#C4956A" stopOpacity="0.06" />
          <stop offset="1" stopColor="#C4956A" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`ps-fibers-${state}`}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="4"
            stroke="#2D5F3E"
            strokeOpacity="0.10"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      <circle cx="200" cy="240" r="180" fill={`url(#ps-glow-${state})`} />

      {state === "crumple" && <CrumpleArt />}
      {state === "recover" && <RecoverArt />}
      {state === "blend" && <BlendArt />}
      {state === "reform" && <ReformArt />}
    </svg>
  );
}

/* ---------------- 01 · CRUMPLE ---------------- */
function CrumpleArt() {
  const facets = [
    { d: "M 150,60 L 240,80 L 210,170 L 180,180 Z", o: 0.0 },
    { d: "M 240,80 L 330,140 L 280,200 L 210,170 Z", o: 0.6 },
    { d: "M 330,140 L 350,250 L 290,250 L 280,200 Z", o: 1.2 },
    { d: "M 350,250 L 320,360 L 260,310 L 290,250 Z", o: 1.8 },
    { d: "M 320,360 L 240,420 L 220,340 L 260,310 Z", o: 2.4 },
    { d: "M 240,420 L 150,400 L 170,330 L 220,340 Z", o: 0.3 },
    { d: "M 150,400 L 80,320 L 130,290 L 170,330 Z", o: 0.9 },
    { d: "M 80,320 L 50,220 L 120,200 L 130,290 Z", o: 1.5 },
    { d: "M 50,220 L 70,120 L 150,60 L 180,180 L 120,200 Z", o: 2.1 },
  ];
  const fragments = [
    { r: 170, dur: 22, size: 8, color: "#FFFFFF", delay: 0 },
    { r: 200, dur: 28, size: 6, color: "#C4956A", delay: -8 },
    { r: 220, dur: 36, size: 5, color: "#8B9D77", delay: -16 },
  ];
  const motes = Array.from({ length: 14 }).map((_, i) => ({
    x: 70 + ((i * 23) % 260),
    delay: -(i * 0.7) % 6,
    dur: 5 + (i % 4),
    size: 1.2 + (i % 3) * 0.4,
  }));

  return (
    <g>
      <ellipse cx="200" cy="470" rx="160" ry="9" fill="#000" opacity="0.10" />

      {motes.map((m, i) => (
        <circle
          key={i}
          cx={m.x}
          cy="440"
          r={m.size}
          fill="#FAF8F5"
          style={
            {
              "--j-to-x": `${(i % 2 ? 1 : -1) * (10 + (i % 3) * 8)}px`,
              "--j-to-y": `-${220 + (i % 5) * 30}px`,
              animation: `j-emit ${m.dur}s ease-out ${m.delay}s infinite`,
              transformOrigin: `${m.x}px 440px`,
            } as CSSProperties
          }
        />
      ))}

      <g
        style={{
          transformOrigin: "200px 240px",
          animation: "j-breathe 6.5s ease-in-out infinite",
        }}
      >
        <path
          d="M70,120 L150,60 L240,80 L330,140 L350,250 L320,360 L240,420 L150,400 L80,320 L50,220 Z"
          fill="url(#ps-sheet-crumple)"
          stroke="#9A958E"
          strokeOpacity="0.55"
          strokeWidth="0.8"
        />
        <path
          d="M70,120 L150,60 L240,80 L330,140 L350,250 L320,360 L240,420 L150,400 L80,320 L50,220 Z"
          fill="url(#ps-fibers-crumple)"
        />

        {facets.map((f, i) => (
          <path
            key={i}
            d={f.d}
            fill="#FAF8F5"
            stroke="#6B6B6B"
            strokeOpacity="0.32"
            strokeWidth="0.55"
            style={{
              fillOpacity: 0.06,
              animation: `j-facet-pulse 3.6s ease-in-out ${f.o}s infinite`,
            }}
          />
        ))}

        <path
          d="M70,120 L150,60 L240,80 L330,140"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.85"
          strokeWidth="0.9"
        />
        <path
          d="M50,220 L80,320 L150,400"
          fill="none"
          stroke="#000"
          strokeOpacity="0.06"
          strokeWidth="1.6"
        />
      </g>

      <g style={{ transformOrigin: "200px 240px" }}>
        {fragments.map((f, i) => (
          <g
            key={i}
            style={{
              transformOrigin: "200px 240px",
              animation: `j-orbit-cw ${f.dur}s linear ${f.delay}s infinite`,
            }}
          >
            <rect
              x={200 - f.size / 2 + f.r}
              y={240 - f.size / 2}
              width={f.size}
              height={f.size * 1.2}
              fill={f.color}
              opacity="0.85"
              transform={`rotate(${i * 25} ${200 + f.r} 240)`}
            />
          </g>
        ))}
      </g>

      <g stroke="#6B6B6B" strokeWidth="0.6" strokeOpacity="0.45">
        <path d="M30,80  L40,80  M30,80  L30,90" />
        <path d="M370,80 L360,80 M370,80 L370,90" />
        <path d="M30,440 L40,440 M30,440 L30,430" />
        <path d="M370,440 L360,440 M370,440 L370,430" />
      </g>
      <text
        x="30"
        y="74"
        fontFamily="JetBrains Mono, monospace"
        fontSize="8.5"
        fill="#6B6B6B"
        letterSpacing="0.14em"
      >
        01 · DISCARD
      </text>
    </g>
  );
}

/* ---------------- 02 · RECOVER ---------------- */
function RecoverArt() {
  const arrivals = [
    { fx: -160, fy: -120, color: "#C4956A", delay: 0, dur: 5.4, size: 14 },
    { fx: 160, fy: -130, color: "#8B9D77", delay: -1.0, dur: 5.8, size: 11 },
    { fx: -180, fy: 20, color: "#FAF8F5", delay: -2.2, dur: 6.2, size: 9 },
    { fx: 180, fy: 10, color: "#C4956A", delay: -3.0, dur: 5.2, size: 13 },
    { fx: -140, fy: 150, color: "#8B9D77", delay: -1.6, dur: 6.6, size: 10 },
    { fx: 150, fy: 160, color: "#FAF8F5", delay: -2.8, dur: 5.0, size: 12 },
  ];

  return (
    <g>
      <ellipse cx="200" cy="470" rx="170" ry="9" fill="#000" opacity="0.10" />

      <g
        stroke="#2D5F3E"
        strokeWidth="0.5"
        strokeDasharray="2 6"
        fill="none"
        style={{ animation: "j-fiber-pulse 4s ease-in-out infinite" }}
      >
        <path d="M40,120 Q 120,180 200,240" />
        <path d="M360,110 Q 280,180 200,240" />
        <path d="M20,260 Q 110,250 200,240" />
        <path d="M380,250 Q 290,250 200,240" />
        <path d="M60,390 Q 130,320 200,240" />
        <path d="M350,400 Q 270,320 200,240" />
      </g>

      {arrivals.map((a, i) => (
        <g
          key={i}
          style={
            {
              transformOrigin: "200px 240px",
              "--j-from-x": `${a.fx}px`,
              "--j-from-y": `${a.fy}px`,
              animation: `j-converge ${a.dur}s cubic-bezier(.5,.05,.25,1) ${a.delay}s infinite`,
            } as CSSProperties
          }
        >
          <rect
            x={200 - a.size / 2}
            y={240 - a.size * 0.6}
            width={a.size}
            height={a.size * 1.2}
            rx="1.5"
            fill={a.color}
            stroke="#9A958E"
            strokeOpacity="0.5"
            strokeWidth="0.5"
            transform={`rotate(${i * 36} 200 240)`}
          />
        </g>
      ))}

      <g
        style={{
          transformOrigin: "200px 240px",
          animation: "j-bob 7s ease-in-out infinite",
        }}
      >
        <rect
          x="78"
          y="100"
          width="244"
          height="290"
          rx="2"
          fill="#F2EDE7"
          opacity="0.7"
          transform="rotate(-2.5 200 245)"
        />
        <rect
          x="82"
          y="96"
          width="244"
          height="290"
          rx="2"
          fill="url(#ps-sheet-recover)"
          stroke="#9A958E"
          strokeOpacity="0.6"
          strokeWidth="0.7"
        />
        <rect
          x="82"
          y="96"
          width="244"
          height="290"
          rx="2"
          fill="url(#ps-fibers-recover)"
        />

        <g
          style={{
            transformOrigin: "318px 100px",
            animation: "j-corner-curl 4.2s ease-in-out infinite",
          }}
        >
          <path
            d="M 296,96 L 326,96 L 326,126 Q 308,120 296,96 Z"
            fill="#FCF8EF"
            stroke="#9A958E"
            strokeOpacity="0.55"
            strokeWidth="0.65"
          />
          <path
            d="M 296,96 Q 308,120 326,126"
            fill="none"
            stroke="#9A958E"
            strokeOpacity="0.65"
            strokeWidth="0.65"
          />
        </g>

        <g stroke="#2D5F3E" strokeOpacity="0.4" strokeWidth="0.9">
          {[140, 158, 176, 194, 212].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1="160"
              x2={x}
              y2="200"
              style={{ animation: `j-blink-dot 2.4s ease-in-out ${-i * 0.4}s infinite` }}
            />
          ))}
          <line
            x1="142"
            y1="186"
            x2="216"
            y2="170"
            transform="rotate(-12 178 178)"
          />
        </g>
        <text
          x="180"
          y="240"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#6B6B6B"
          letterSpacing="0.14em"
        >
          + 38 KG
        </text>

        <g stroke="#9A958E" strokeOpacity="0.36" strokeWidth="0.5">
          <line x1="110" y1="280" x2="290" y2="280" />
          <line x1="110" y1="296" x2="270" y2="296" />
          <line x1="110" y1="312" x2="290" y2="312" />
          <line x1="110" y1="328" x2="244" y2="328" />
          <line x1="110" y1="344" x2="270" y2="344" />
        </g>
      </g>

      <text
        x="30"
        y="74"
        fontFamily="JetBrains Mono, monospace"
        fontSize="8.5"
        fill="#6B6B6B"
        letterSpacing="0.14em"
      >
        02 · RECOVER
      </text>
    </g>
  );
}

/* ---------------- 03 · BLEND ---------------- */
function BlendArt() {
  const strands = Array.from({ length: 36 }).map((_, i) => {
    const a = (i / 36) * Math.PI * 2;
    return {
      x1: +(200 + Math.cos(a) * 46).toFixed(2),
      y1: +(240 + Math.sin(a) * 46).toFixed(2),
      x2: +(200 + Math.cos(a) * 154).toFixed(2),
      y2: +(240 + Math.sin(a) * 154).toFixed(2),
      delay: -(i * 0.12) % 3,
    };
  });
  const particles = [
    { r: 110, dur: 12, size: 3, color: "#FAF8F5", delay: 0 },
    { r: 110, dur: 12, size: 2, color: "#C4956A", delay: -3 },
    { r: 110, dur: 12, size: 2.5, color: "#FAF8F5", delay: -6 },
    { r: 130, dur: 18, size: 2, color: "#8B9D77", delay: -2 },
    { r: 130, dur: 18, size: 2, color: "#FAF8F5", delay: -9 },
    { r: 130, dur: 18, size: 2.5, color: "#C4956A", delay: -14 },
    { r: 84, dur: 9, size: 1.6, color: "#FAF8F5", delay: -1 },
    { r: 84, dur: 9, size: 1.6, color: "#FAF8F5", delay: -5 },
  ];

  return (
    <g>
      <ellipse cx="200" cy="470" rx="170" ry="9" fill="#000" opacity="0.10" />

      <g
        style={{
          transformOrigin: "200px 240px",
          animation: "j-orbit-ccw 60s linear infinite",
        }}
      >
        <circle
          cx="200"
          cy="240"
          r="160"
          fill="none"
          stroke="#2D5F3E"
          strokeOpacity="0.22"
          strokeWidth="0.7"
          strokeDasharray="3 8"
        />
        <circle cx="200" cy="80" r="3" fill="#8B9D77" />
      </g>
      <g
        style={{
          transformOrigin: "200px 240px",
          animation: "j-orbit-cw 38s linear infinite",
        }}
      >
        <circle
          cx="200"
          cy="240"
          r="132"
          fill="none"
          stroke="#2D5F3E"
          strokeOpacity="0.3"
          strokeWidth="0.7"
        />
        <circle cx="332" cy="240" r="3.4" fill="#C4956A" />
        <circle cx="68" cy="240" r="2.6" fill="#2D5F3E" />
      </g>
      <g
        style={{
          transformOrigin: "200px 240px",
          animation: "j-orbit-ccw 22s linear infinite",
        }}
      >
        <circle
          cx="200"
          cy="240"
          r="100"
          fill="none"
          stroke="#2D5F3E"
          strokeOpacity="0.4"
          strokeWidth="0.7"
          strokeDasharray="2 5"
        />
      </g>

      <g>
        {strands.map((s, i) => (
          <line
            key={i}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke="#2D5F3E"
            strokeWidth="0.55"
            strokeLinecap="round"
            style={{ animation: `j-fiber-pulse 3.2s ease-in-out ${s.delay}s infinite` }}
          />
        ))}
      </g>

      <g fill="none" strokeWidth="0.9" strokeLinecap="round">
        <path
          d="M 90,200 Q 200,140 310,200 Q 360,260 280,310 Q 200,360 110,290 Q 60,240 90,200 Z"
          stroke="#8B9D77"
          strokeOpacity="0.55"
          strokeDasharray="6 14"
          style={{
            animation: "j-orbit-cw 28s linear infinite",
            transformOrigin: "200px 240px",
          }}
        />
        <path
          d="M 110,260 Q 160,180 240,180 Q 320,180 300,260 Q 270,320 200,300 Q 140,290 110,260 Z"
          stroke="#C4956A"
          strokeOpacity="0.45"
          strokeDasharray="4 10"
          style={{
            animation: "j-orbit-ccw 22s linear infinite",
            transformOrigin: "200px 240px",
          }}
        />
      </g>

      {particles.map((p, i) => (
        <g
          key={i}
          style={{
            transformOrigin: "200px 240px",
            animation: `j-orbit-cw ${p.dur}s linear ${p.delay}s infinite`,
          }}
        >
          <circle cx={200 + p.r} cy={240} r={p.size} fill={p.color} opacity="0.92" />
        </g>
      ))}

      <g
        style={{
          transformOrigin: "200px 240px",
          animation: "j-breathe 5.5s ease-in-out infinite",
        }}
      >
        <g style={{ transformOrigin: "200px 240px" }}>
          <circle
            cx="200"
            cy="240"
            r="40"
            fill="none"
            stroke="#2D5F3E"
            strokeOpacity="0.5"
            strokeWidth="0.8"
            style={{
              transformOrigin: "200px 240px",
              animation: "j-pulse-ring 3.4s ease-out infinite",
            }}
          />
        </g>
        <circle
          cx="200"
          cy="240"
          r="44"
          fill="#FAF8F5"
          stroke="#2D5F3E"
          strokeOpacity="0.7"
          strokeWidth="1"
        />
        <circle cx="200" cy="240" r="44" fill="url(#ps-glow-blend)" />
        <text
          x="200"
          y="237"
          textAnchor="middle"
          fontFamily="Libre Baskerville, serif"
          fontStyle="italic"
          fontSize="13"
          fill="#2D5F3E"
        >
          slurry
        </text>
        <text
          x="200"
          y="252"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill="#2D5F3E"
          letterSpacing="0.16em"
        >
          98% H₂O
        </text>
      </g>

      <text
        x="30"
        y="74"
        fontFamily="JetBrains Mono, monospace"
        fontSize="8.5"
        fill="#6B6B6B"
        letterSpacing="0.14em"
      >
        03 · BLEND
      </text>
    </g>
  );
}

/* ---------------- 04 · REFORM ---------------- */
function ReformArt() {
  return (
    <g>
      <rect x="115" y="378" width="170" height="6" rx="2" fill="#000" opacity="0.10" />

      <g style={{ transformOrigin: "200px 240px" }}>
        <rect
          x="74"
          y="104"
          width="244"
          height="290"
          rx="2"
          fill="#ECE5DC"
          stroke="#9A958E"
          strokeOpacity="0.35"
          strokeWidth="0.6"
          transform="rotate(-3.5 200 250)"
          style={{ animation: "j-stack-rise 1.2s ease-out 0s both" }}
        />
        <rect
          x="78"
          y="98"
          width="244"
          height="290"
          rx="2"
          fill="#F4EFE7"
          stroke="#9A958E"
          strokeOpacity="0.45"
          strokeWidth="0.6"
          transform="rotate(1.2 200 246)"
          style={{ animation: "j-stack-rise 1.2s ease-out 0.15s both" }}
        />
      </g>

      <g
        style={{
          transformOrigin: "200px 240px",
          animation: "j-bob 8s ease-in-out infinite",
        }}
      >
        <rect
          x="82"
          y="92"
          width="244"
          height="296"
          rx="2"
          fill="url(#ps-sheet-reform)"
          stroke="url(#ps-edge-reform)"
          strokeWidth="0.8"
          style={{ animation: "j-stack-rise 1.2s ease-out 0.3s both" }}
        />
        <rect
          x="82"
          y="92"
          width="244"
          height="296"
          rx="2"
          fill="url(#ps-fibers-reform)"
        />

        <defs>
          <clipPath id="ps-sheet-clip-reform">
            <rect x="82" y="92" width="244" height="296" rx="2" />
          </clipPath>
          <linearGradient id="ps-shimmer-reform" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g clipPath="url(#ps-sheet-clip-reform)">
          <rect
            x="82"
            y="92"
            width="120"
            height="296"
            fill="url(#ps-shimmer-reform)"
            opacity="0.7"
            style={{
              animation: "j-shimmer-x 6s ease-in-out infinite",
              transformOrigin: "200px 240px",
            }}
          />
        </g>

        <g transform="translate(204 232)">
          <g style={{ transformOrigin: "0 0", animation: "j-orbit-ccw 42s linear infinite" }}>
            <circle
              r="48"
              fill="none"
              stroke="#2D5F3E"
              strokeOpacity="0.30"
              strokeWidth="0.6"
              strokeDasharray="2 5"
            />
          </g>
          <g style={{ transformOrigin: "0 0", animation: "j-orbit-cw 30s linear infinite" }}>
            <circle r="38" fill="none" stroke="#2D5F3E" strokeOpacity="0.5" strokeWidth="0.7" />
            <circle r="2.4" cy="-38" fill="#C4956A" />
          </g>
          <circle r="28" fill="none" stroke="#2D5F3E" strokeOpacity="0.35" strokeWidth="0.6" />
          <text
            x="0"
            y="2"
            textAnchor="middle"
            fontFamily="Libre Baskerville, serif"
            fontStyle="italic"
            fontSize="13"
            fill="#2D5F3E"
          >
            reformed
          </text>
          <text
            x="0"
            y="16"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="7.5"
            fill="#2D5F3E"
            letterSpacing="0.16em"
          >
            CYCLE · 04
          </text>
        </g>

        <g stroke="#9A958E" strokeOpacity="0.5" strokeWidth="0.55" strokeLinecap="round">
          {[
            [110, 120, 290],
            [110, 134, 274],
            [110, 148, 242],
            [110, 320, 290],
            [110, 334, 268],
            [110, 348, 286],
          ].map((l, i) => (
            <line
              key={i}
              x1={l[0]}
              y1={l[1]}
              x2={l[2]}
              y2={l[1]}
              strokeDasharray="200"
              strokeDashoffset="200"
              style={{
                animation: `j-draw-line 1.4s cubic-bezier(.2,.7,.3,1) ${0.5 + i * 0.18}s both`,
              }}
            />
          ))}
        </g>

        <g transform="translate(296, 110)">
          <circle r="9" fill="#2D5F3E" />
          <path
            d="M -3.4,0 L -1,2.4 L 3.4,-2.6"
            stroke="#FAF8F5"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            r="9"
            fill="none"
            stroke="#2D5F3E"
            strokeOpacity="0.5"
            style={{
              transformOrigin: "296px 110px",
              animation: "j-pulse-ring 3s ease-out infinite",
            }}
          />
        </g>

        <g stroke="#9A958E" strokeWidth="0.5" strokeOpacity="0.6">
          <path d="M88,98  L96,98  M88,98  L88,106" />
          <path d="M320,98 L312,98 M320,98 L320,106" />
          <path d="M88,382 L96,382 M88,382 L88,374" />
          <path d="M320,382 L312,382 M320,382 L320,374" />
        </g>
      </g>

      <text
        x="30"
        y="74"
        fontFamily="JetBrains Mono, monospace"
        fontSize="8.5"
        fill="#6B6B6B"
        letterSpacing="0.14em"
      >
        04 · REFORM
      </text>
    </g>
  );
}
