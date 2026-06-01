// shared.jsx — shared atoms, icons, and the Paper Foundation hero SVG
// Loaded before screen components.

const { useState, useEffect, useRef, useMemo } = React;

/* ---------- ICONS ---------- */
const Icon = {
  Arrow: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Search: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  Menu: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  Close: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  Plus: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  Download: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2v8M3.5 6.5L7 10l3.5-3.5M2 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Check: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7.5L6 10.5 11.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Cross: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Chevron: ({ size = 14, dir = 'down' }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true"
         style={{transform: dir==='up'?'rotate(180deg)':dir==='right'?'rotate(-90deg)':dir==='left'?'rotate(90deg)':'none'}}>
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Quote: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 8c-2 1-3 3-3 6h3v4H1v-4c0-4 2-7 5-8l0 2zm12 0c-2 1-3 3-3 6h3v4h-5v-4c0-4 2-7 5-8l0 2z" fill="currentColor" />
    </svg>
  ),
  Doc: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 1.5h6l3 3V12.5a1 1 0 01-1 1H3a1 1 0 01-1-1v-10a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9 1.5v3h3" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
};

/* ---------- HERO SVG ----------
   Abstract paper-systems composition:
   - layered translucent rectangles (paper sheets)
   - concentric circular orbits (circularity)
   - nodal connectors
   - slow drift via SMIL fallback / CSS keyframes
*/
function PaperSystemsArt({ width = 560, height = 480 }) {
  return (
    <svg viewBox="0 0 560 480" width={width} height={height} role="img" aria-label="Abstract paper systems"
         style={{display:'block'}}>
      <defs>
        <linearGradient id="pf-sheet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95"/>
          <stop offset="1" stopColor="#F2EDE7" stopOpacity="0.95"/>
        </linearGradient>
        <linearGradient id="pf-sheet-sage" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B9D77" stopOpacity="0.18"/>
          <stop offset="1" stopColor="#8B9D77" stopOpacity="0.06"/>
        </linearGradient>
        <pattern id="pf-fibers" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#244D32" strokeOpacity="0.08" strokeWidth="0.6"/>
        </pattern>
        <radialGradient id="pf-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#2D5F3E" stopOpacity="0.07"/>
          <stop offset="1" stopColor="#2D5F3E" stopOpacity="0"/>
        </radialGradient>
        <filter id="pf-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.4"/>
        </filter>
      </defs>

      {/* faint background grid */}
      <g opacity="0.5">
        {Array.from({length:12}).map((_,i)=>(
          <line key={'v'+i} x1={i*48} y1="0" x2={i*48} y2="480" stroke="#E0DAD2" strokeWidth="0.5"/>
        ))}
        {Array.from({length:10}).map((_,i)=>(
          <line key={'h'+i} x1="0" y1={i*48} x2="560" y2={i*48} stroke="#E0DAD2" strokeWidth="0.5"/>
        ))}
      </g>

      {/* soft glow under circularity diagram */}
      <ellipse cx="290" cy="240" rx="220" ry="180" fill="url(#pf-glow)"/>

      {/* CONCENTRIC ORBITS — circularity */}
      <g transform="translate(290 240)" style={{transformOrigin:'center', animation:'pf-rotate-slow 80s linear infinite'}}>
        <circle r="180" fill="none" stroke="#2D5F3E" strokeOpacity="0.18" strokeWidth="0.75" strokeDasharray="2 6"/>
      </g>
      <g transform="translate(290 240)" style={{transformOrigin:'center', animation:'pf-rotate-rev 110s linear infinite'}}>
        <circle r="140" fill="none" stroke="#2D5F3E" strokeOpacity="0.22" strokeWidth="0.75"/>
        <circle r="140" cx="0" cy="0" fill="#2D5F3E" r="3" transform="translate(0 -140)"/>
        <circle r="140" cx="0" cy="0" fill="#8B9D77" r="2" transform="translate(121 70)"/>
      </g>
      <g transform="translate(290 240)" style={{transformOrigin:'center', animation:'pf-rotate-slow 60s linear infinite'}}>
        <circle r="100" fill="none" stroke="#2D5F3E" strokeOpacity="0.3" strokeWidth="0.75" strokeDasharray="3 4"/>
        <circle fill="#C4956A" r="2.5" transform="translate(0 -100)"/>
      </g>
      <circle cx="290" cy="240" r="60" fill="none" stroke="#2D5F3E" strokeOpacity="0.45" strokeWidth="1"/>

      {/* PAPER SHEETS — layered, drifting */}
      <g style={{transformOrigin:'80px 100px', animation:'pf-drift-a 14s ease-in-out infinite'}}>
        <rect x="50" y="80" width="160" height="210" rx="2" fill="url(#pf-sheet)" stroke="#E0DAD2" strokeWidth="0.75"/>
        <rect x="50" y="80" width="160" height="210" rx="2" fill="url(#pf-fibers)"/>
        <line x1="68" y1="120" x2="190" y2="120" stroke="#9A958E" strokeWidth="0.6" strokeOpacity="0.5"/>
        <line x1="68" y1="135" x2="190" y2="135" stroke="#9A958E" strokeWidth="0.6" strokeOpacity="0.5"/>
        <line x1="68" y1="150" x2="160" y2="150" stroke="#9A958E" strokeWidth="0.6" strokeOpacity="0.5"/>
        <line x1="68" y1="180" x2="190" y2="180" stroke="#9A958E" strokeWidth="0.6" strokeOpacity="0.35"/>
        <line x1="68" y1="195" x2="170" y2="195" stroke="#9A958E" strokeWidth="0.6" strokeOpacity="0.35"/>
        <line x1="68" y1="210" x2="190" y2="210" stroke="#9A958E" strokeWidth="0.6" strokeOpacity="0.35"/>
        <line x1="68" y1="225" x2="155" y2="225" stroke="#9A958E" strokeWidth="0.6" strokeOpacity="0.35"/>
      </g>

      <g style={{transformOrigin:'420px 320px', animation:'pf-drift-b 16s ease-in-out infinite'}}>
        <rect x="380" y="220" width="140" height="180" rx="2" fill="url(#pf-sheet-sage)" stroke="#8B9D77" strokeOpacity="0.4" strokeWidth="0.75" transform="rotate(6 450 310)"/>
        <rect x="395" y="240" width="140" height="180" rx="2" fill="url(#pf-sheet)" stroke="#E0DAD2" strokeWidth="0.75" transform="rotate(-3 465 330)"/>
      </g>

      {/* NODES & CONNECTIONS — paper system */}
      <g>
        <line x1="210" y1="150" x2="290" y2="180" stroke="#2D5F3E" strokeOpacity="0.45" strokeWidth="0.75"/>
        <line x1="290" y1="180" x2="395" y2="240" stroke="#2D5F3E" strokeOpacity="0.45" strokeWidth="0.75"/>
        <line x1="290" y1="240" x2="290" y2="380" stroke="#2D5F3E" strokeOpacity="0.3" strokeWidth="0.75" strokeDasharray="2 3"/>
        <line x1="170" y1="290" x2="290" y2="300" stroke="#2D5F3E" strokeOpacity="0.3" strokeWidth="0.75" strokeDasharray="2 3"/>

        <circle cx="210" cy="150" r="4" fill="#FAF8F5" stroke="#2D5F3E" strokeWidth="1.2"/>
        <circle cx="395" cy="240" r="4" fill="#FAF8F5" stroke="#2D5F3E" strokeWidth="1.2"/>
        <circle cx="290" cy="380" r="4" fill="#FAF8F5" stroke="#C4956A" strokeWidth="1.2"/>
        <circle cx="170" cy="290" r="4" fill="#FAF8F5" stroke="#8B9D77" strokeWidth="1.2"/>
      </g>

      {/* tiny labels */}
      <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#6B6B6B" letterSpacing="0.1em">
        <text x="220" y="146" textAnchor="start">FOREST</text>
        <text x="405" y="236" textAnchor="start">PRODUCTION</text>
        <text x="296" y="395" textAnchor="start">END USE</text>
        <text x="120" y="294" textAnchor="end">RECOVERY</text>
      </g>

      {/* corner reg marks */}
      <g stroke="#9A958E" strokeWidth="0.5">
        <path d="M16 16 L16 28 M16 16 L28 16"/>
        <path d="M544 16 L544 28 M544 16 L532 16"/>
        <path d="M16 464 L16 452 M16 464 L28 464"/>
        <path d="M544 464 L544 452 M544 464 L532 464"/>
      </g>
    </svg>
  );
}

/* ---------- Compact circular system diagram ---------- */
function CircularitySVG({ size = 220 }) {
  return (
    <svg viewBox="0 0 240 240" width={size} height={size} aria-label="Circularity diagram">
      <defs>
        <marker id="pf-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#2D5F3E"/>
        </marker>
      </defs>
      <circle cx="120" cy="120" r="100" fill="none" stroke="#E0DAD2" strokeWidth="1"/>
      {/* arc segments */}
      <g fill="none" strokeWidth="1.5">
        <path d="M120,30 A90,90 0 0,1 198,165" stroke="#2D5F3E" markerEnd="url(#pf-arrow)"/>
        <path d="M198,165 A90,90 0 0,1 42,165" stroke="#3A7A50" markerEnd="url(#pf-arrow)"/>
        <path d="M42,165 A90,90 0 0,1 120,30" stroke="#8B9D77" markerEnd="url(#pf-arrow)"/>
      </g>
      {/* nodes */}
      {[
        {x:120, y:30, label:'FIBER'},
        {x:198, y:165, label:'USE'},
        {x:42, y:165, label:'RECOVERY'},
      ].map(n=> (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="22" fill="#FAF8F5" stroke="#2D5F3E" strokeWidth="1.2"/>
          <text x={n.x} y={n.y+3} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="#2D5F3E" letterSpacing="0.08em">{n.label}</text>
        </g>
      ))}
      <text x="120" y="125" textAnchor="middle" fontFamily="'Libre Baskerville',serif" fontStyle="italic" fontSize="14" fill="#2C2C2C">circularity</text>
    </svg>
  );
}

/* ---------- Animated count-up ---------- */
function CountUp({ to, suffix = '', duration = 1400 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let raf, start;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const step = (t) => {
          if (!start) start = t;
          const p = Math.min(1, (t - start) / duration);
          setN(Math.round(to * (0.5 - Math.cos(Math.PI * p) / 2)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{n.toLocaleString('en-IN')}{suffix}</span>;
}

/* ---------- Source badge (citation tag) ---------- */
function CiteTag({ n, source = 'CPCB, 2024' }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{position:'relative', display:'inline-block'}}
          onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <span className="pf-cite">{n}</span>
      {open && (
        <span style={{
          position:'absolute', bottom:'calc(100% + 6px)', left:'-12px',
          background:'#2C2C2C', color:'#FAF8F5',
          fontFamily:'var(--pf-mono)', fontSize:11, letterSpacing:'0.04em',
          padding:'6px 10px', borderRadius:6, whiteSpace:'nowrap',
          boxShadow:'0 4px 12px rgba(0,0,0,0.18)', zIndex:5
        }}>{source}</span>
      )}
    </span>
  );
}

Object.assign(window, { Icon, PaperSystemsArt, CircularitySVG, CountUp, CiteTag });
