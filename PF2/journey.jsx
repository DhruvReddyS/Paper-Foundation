// journey.jsx — A24-documentary chapter pages for Paper Foundation India
// Cinematic Home · Root System · Modular Fibers · Horizontal Narrative
// All four share the same paper-grain ambient, fiber-thread connective tissue,
// and a floating "morphing dock" nav that adapts to each chapter's theme.

const { useState: useSJ, useEffect: useEJ, useRef: useRJ, useMemo: useMJ } = React;

/* ─────────────────────────── shared primitives ─────────────────────────── */

function useJReveal(threshold = 0.18) {
  const ref = useRJ(null);
  const [seen, setSeen] = useSJ(false);
  useEJ(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, seen];
}

/** Animated grain layered over a chapter. Two tones available. */
function JGrain({ tone = 'dark', opacity }) {
  const blend = tone === 'dark' ? 'overlay' : 'multiply';
  return <div className="pf-grain" style={{ mixBlendMode: blend, opacity: opacity ?? (tone === 'dark' ? 0.35 : 0.55) }} />;
}

/** Vertical paper-deckle edge between two paper colors */
function DeckleEdge({ from = '#FAF8F5', to = '#2D5F3E', flip = false }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
         style={{ display:'block', width:'100%', height:60, transform: flip?'scaleY(-1)':'none' }}>
      <path
        d="M0,60 L0,28 C 80,18 160,42 240,30 C 320,18 400,46 480,32 C 560,18 640,40 720,28 C 800,16 880,44 960,30 C 1040,16 1120,40 1200,28 C 1280,16 1360,42 1440,30 L1440,60 Z"
        fill={from}/>
      <path d="M0,28 C 80,18 160,42 240,30 C 320,18 400,46 480,32 C 560,18 640,40 720,28 C 800,16 880,44 960,30 C 1040,16 1120,40 1200,28 C 1280,16 1360,42 1440,30"
            fill="none" stroke={to} strokeOpacity="0.18" strokeWidth="0.75"/>
    </svg>
  );
}

/** Fiber thread — a thin weaving line that runs the full height of a page.
 *  Uses SVG path with stroke-dasharray flow and pf-ribbon-flow keyframes. */
function FiberThread({ height = 4000, color = 'var(--pf-forest)', opacity = 0.35, side = 'left', offset = 80, amplitude = 24 }) {
  const segs = Math.ceil(height / 180);
  let d = `M ${offset} 0`;
  for (let i = 0; i < segs; i++) {
    const y0 = i * 180 + 90;
    const y1 = (i + 1) * 180;
    const x = offset + (i % 2 === 0 ? amplitude : -amplitude);
    d += ` Q ${x} ${y0} ${offset} ${y1}`;
  }
  return (
    <svg
      width="200" height={height} viewBox={`0 0 200 ${height}`}
      style={{
        position:'absolute', top:0, [side]:0, pointerEvents:'none', zIndex:1,
      }}
      aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeOpacity={opacity} strokeWidth="1"
            strokeDasharray="2 6" />
      <path d={d} fill="none" stroke={color} strokeOpacity={opacity * 1.4} strokeWidth="1"
            strokeDasharray="80 1200" style={{ animation: 'pf-ribbon-flow 22s linear infinite' }}/>
    </svg>
  );
}

/** Floating morphing dock — adapts background based on theme prop */
function MorphingDock({ items, active = 0, theme = 'light' }) {
  const dark = theme === 'dark';
  return (
    <div style={{
      position:'sticky', top: 32, marginInline:'auto', zIndex: 20,
      display:'flex', justifyContent:'center', width:'fit-content',
    }}>
      <div style={{
        display:'flex', alignItems:'center', gap: 6, padding:'8px 10px',
        background: dark ? 'rgba(20,28,22,0.62)' : 'rgba(255,255,255,0.72)',
        border:`1px solid ${dark ? 'rgba(255,255,255,0.10)' : 'rgba(45,95,62,0.14)'}`,
        backdropFilter:'blur(14px) saturate(160%)',
        WebkitBackdropFilter:'blur(14px) saturate(160%)',
        borderRadius: 999,
        boxShadow: dark ? '0 12px 36px rgba(0,0,0,0.35)' : '0 12px 36px rgba(36,30,22,0.10)',
        color: dark ? '#FAF8F5' : 'var(--pf-ink)',
      }}>
        {/* monogram */}
        <div style={{
          width:30, height:30, borderRadius:999,
          background: dark ? 'var(--pf-paper)' : 'var(--pf-forest)',
          color: dark ? 'var(--pf-forest-3)' : '#FAF8F5',
          display:'grid', placeItems:'center',
          fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize:14,
        }}>p</div>
        {items.map((it, i) => {
          const isActive = i === active;
          return (
            <div key={it} style={{
              padding:'8px 14px', borderRadius:999,
              fontFamily:'var(--pf-mono)', fontSize:10.5, letterSpacing:'0.16em',
              textTransform:'uppercase',
              color: isActive ? (dark?'var(--pf-forest-3)':'#FAF8F5') : 'inherit',
              background: isActive ? (dark?'#FAF8F5':'var(--pf-forest)') : 'transparent',
              transition:'background .25s ease, color .25s ease',
              cursor:'pointer',
            }}>{it}</div>
          );
        })}
        <div style={{ width:1, height:18, background: dark?'rgba(255,255,255,0.16)':'rgba(0,0,0,0.10)', margin:'0 4px' }}/>
        <div style={{
          width:30, height:30, borderRadius:999,
          border:`1px solid ${dark?'rgba(255,255,255,0.22)':'rgba(0,0,0,0.14)'}`,
          display:'grid', placeItems:'center', cursor:'pointer',
        }}>
          <Icon.Search size={13}/>
        </div>
      </div>
    </div>
  );
}

const DOCK_ITEMS = ['Journey', 'Forestry', 'Lab', 'Stories'];

/* ───────────────── visual atoms: paper transformations ───────────────── */

/** PAPER STATE — crumpled / recovered / blended / reformed.
 *  Modern, continuously-animated SVG. Each state is its own composition. */
function PaperState({ state = 'crumple', width = 520, height = 580 }) {
  return (
    <svg viewBox="0 0 400 500" width={width} height={height}
         style={{ display:'block', overflow:'visible' }} aria-label={`paper state ${state}`}>
      <defs>
        <linearGradient id={'ps-sheet-'+state} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0"  stopColor="#FFFFFF" stopOpacity="0.98"/>
          <stop offset="1"  stopColor="#F2EDE7" stopOpacity="0.94"/>
        </linearGradient>
        <linearGradient id={'ps-edge-'+state} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FAF8F5"/>
          <stop offset="0.5" stopColor="#E8E0D0"/>
          <stop offset="1" stopColor="#C7B89E"/>
        </linearGradient>
        <radialGradient id={'ps-glow-'+state} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0"   stopColor="#C4956A" stopOpacity="0.30"/>
          <stop offset="0.5" stopColor="#C4956A" stopOpacity="0.06"/>
          <stop offset="1"   stopColor="#C4956A" stopOpacity="0"/>
        </radialGradient>
        <pattern id={'ps-fibers-'+state} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#2D5F3E" strokeOpacity="0.10" strokeWidth="0.5"/>
        </pattern>
        <filter id="ps-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6"/>
        </filter>
        <marker id={'ps-arrow-'+state} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
        </marker>
      </defs>

      {/* underlying soft glow shared across states */}
      <circle cx="200" cy="240" r="180" fill={`url(#ps-glow-${state})`}/>

      {state === 'crumple' && <CrumpleArt/>}
      {state === 'recover' && <RecoverArt/>}
      {state === 'blend'   && <BlendArt/>}
      {state === 'reform'  && <ReformArt/>}
    </svg>
  );
}

/* ── 01 · CRUMPLE — angular crystalline mass, facets pulsing,
       fragments orbiting, dust motes drifting up ───────────────── */
function CrumpleArt() {
  // facets of the polygon mass — each gets its own pulse delay
  const facets = [
    { d:'M 150,60 L 240,80 L 210,170 L 180,180 Z',  o: 0.0 },
    { d:'M 240,80 L 330,140 L 280,200 L 210,170 Z', o: 0.6 },
    { d:'M 330,140 L 350,250 L 290,250 L 280,200 Z', o: 1.2 },
    { d:'M 350,250 L 320,360 L 260,310 L 290,250 Z', o: 1.8 },
    { d:'M 320,360 L 240,420 L 220,340 L 260,310 Z', o: 2.4 },
    { d:'M 240,420 L 150,400 L 170,330 L 220,340 Z', o: 0.3 },
    { d:'M 150,400 L 80,320 L 130,290 L 170,330 Z',  o: 0.9 },
    { d:'M 80,320 L 50,220 L 120,200 L 130,290 Z',   o: 1.5 },
    { d:'M 50,220 L 70,120 L 150,60 L 180,180 L 120,200 Z', o: 2.1 },
    { d:'M 180,180 L 210,170 L 280,200 L 290,250 L 260,310 L 220,340 L 170,330 L 130,290 L 120,200 Z', o: 0.0 },
  ];
  // orbiting fragments
  const fragments = [
    { r: 170, dur: 22, size: 8, color:'#FFFFFF', delay: 0 },
    { r: 200, dur: 28, size: 6, color:'#C4956A', delay: -8 },
    { r: 220, dur: 36, size: 5, color:'#8B9D77', delay: -16 },
  ];
  // dust motes drifting upward
  const motes = Array.from({length: 14}).map((_,i)=>({
    x: 70 + (i*23)%260,
    delay: -(i*0.7) % 6,
    dur: 5 + (i%4),
    size: 1.2 + (i%3)*0.4,
  }));

  return (
    <g>
      {/* shadow */}
      <ellipse cx="200" cy="470" rx="160" ry="9" fill="#000" opacity="0.10"/>

      {/* dust motes rising */}
      {motes.map((m, i)=>(
        <circle key={i} cx={m.x} cy="440" r={m.size} fill="#FAF8F5"
                style={{
                  ['--j-to-x']: `${(i%2?1:-1) * (10 + (i%3)*8)}px`,
                  ['--j-to-y']: `-${220 + (i%5)*30}px`,
                  animation:`j-emit ${m.dur}s ease-out ${m.delay}s infinite`,
                  transformOrigin:`${m.x}px 440px`,
                }}/>
      ))}

      {/* breathing crumpled mass */}
      <g style={{ transformOrigin:'200px 240px', animation:'j-breathe 6.5s ease-in-out infinite' }}>
        {/* outline mass */}
        <path d="M70,120 L150,60 L240,80 L330,140 L350,250 L320,360 L240,420 L150,400 L80,320 L50,220 Z"
              fill="url(#ps-sheet-crumple)" stroke="#9A958E" strokeOpacity="0.55" strokeWidth="0.8"/>
        <path d="M70,120 L150,60 L240,80 L330,140 L350,250 L320,360 L240,420 L150,400 L80,320 L50,220 Z"
              fill="url(#ps-fibers-crumple)"/>

        {/* internal facets — each pulses on its own delay */}
        {facets.map((f, i)=>(
          <path key={i} d={f.d} fill="#FAF8F5" stroke="#6B6B6B" strokeOpacity="0.32" strokeWidth="0.55"
                style={{
                  fillOpacity: 0.06,
                  animation:`j-facet-pulse 3.6s ease-in-out ${f.o}s infinite`,
                }}/>
        ))}

        {/* edge highlight — single white path catching "light" */}
        <path d="M70,120 L150,60 L240,80 L330,140"
              fill="none" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="0.9"/>
        <path d="M50,220 L80,320 L150,400"
              fill="none" stroke="#000" strokeOpacity="0.06" strokeWidth="1.6"/>
      </g>

      {/* orbiting fragments */}
      <g style={{ transformOrigin:'200px 240px' }}>
        {fragments.map((f, i)=>(
          <g key={i} style={{
            transformOrigin:'200px 240px',
            animation:`j-orbit-cw ${f.dur}s linear ${f.delay}s infinite`,
          }}>
            <rect x={200 - f.size/2 + f.r} y={240 - f.size/2}
                  width={f.size} height={f.size*1.2}
                  fill={f.color} opacity="0.85"
                  transform={`rotate(${i*25} ${200+f.r} 240)`}/>
          </g>
        ))}
      </g>

      {/* corner ticks marking dimension */}
      <g stroke="#6B6B6B" strokeWidth="0.6" strokeOpacity="0.45">
        <path d="M30,80  L40,80  M30,80  L30,90"/>
        <path d="M370,80 L360,80 M370,80 L370,90"/>
        <path d="M30,440 L40,440 M30,440 L30,430"/>
        <path d="M370,440 L360,440 M370,440 L370,430"/>
      </g>
      <text x="30" y="74" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fill="#6B6B6B" letterSpacing="0.14em">01 · DISCARD</text>
    </g>
  );
}

/* ── 02 · RECOVER — central sheet, fragments converging into it,
       corner curl breathing, route lines pulsing ──────────────── */
function RecoverArt() {
  // fragments converging from 6 directions
  const arrivals = [
    { fx:-160, fy:-120, color:'#C4956A', delay:0,    dur:5.4, size:14 },
    { fx: 160, fy:-130, color:'#8B9D77', delay:-1.0, dur:5.8, size:11 },
    { fx:-180, fy:  20, color:'#FAF8F5', delay:-2.2, dur:6.2, size:9  },
    { fx: 180, fy:  10, color:'#C4956A', delay:-3.0, dur:5.2, size:13 },
    { fx:-140, fy: 150, color:'#8B9D77', delay:-1.6, dur:6.6, size:10 },
    { fx: 150, fy: 160, color:'#FAF8F5', delay:-2.8, dur:5.0, size:12 },
  ];

  return (
    <g>
      <ellipse cx="200" cy="470" rx="170" ry="9" fill="#000" opacity="0.10"/>

      {/* route guide lines — faint background */}
      <g stroke="var(--pf-forest)" strokeWidth="0.5" strokeDasharray="2 6" fill="none"
         style={{ animation:'j-fiber-pulse 4s ease-in-out infinite' }}>
        <path d="M40,120 Q 120,180 200,240"/>
        <path d="M360,110 Q 280,180 200,240"/>
        <path d="M20,260 Q 110,250 200,240"/>
        <path d="M380,250 Q 290,250 200,240"/>
        <path d="M60,390 Q 130,320 200,240"/>
        <path d="M350,400 Q 270,320 200,240"/>
      </g>

      {/* converging fragments */}
      {arrivals.map((a, i)=>(
        <g key={i} style={{
          transformOrigin:'200px 240px',
          ['--j-from-x']: `${a.fx}px`,
          ['--j-from-y']: `${a.fy}px`,
          animation:`j-converge ${a.dur}s cubic-bezier(.5,.05,.25,1) ${a.delay}s infinite`,
        }}>
          <rect x={200 - a.size/2} y={240 - a.size*0.6} width={a.size} height={a.size*1.2}
                rx="1.5" fill={a.color} stroke="#9A958E" strokeOpacity="0.5" strokeWidth="0.5"
                transform={`rotate(${i*36} 200 240)`}/>
        </g>
      ))}

      {/* receiving sheet — gentle bob */}
      <g style={{ transformOrigin:'200px 240px', animation:'j-bob 7s ease-in-out infinite' }}>
        {/* back sheet */}
        <rect x="78" y="100" width="244" height="290" rx="2"
              fill="#F2EDE7" opacity="0.7"
              transform="rotate(-2.5 200 245)"/>
        {/* main sheet */}
        <rect x="82" y="96" width="244" height="290" rx="2"
              fill="url(#ps-sheet-recover)" stroke="#9A958E" strokeOpacity="0.6" strokeWidth="0.7"/>
        <rect x="82" y="96" width="244" height="290" rx="2" fill="url(#ps-fibers-recover)"/>

        {/* corner curl — animated */}
        <g style={{ transformOrigin:'318px 100px', animation:'j-corner-curl 4.2s ease-in-out infinite' }}>
          <path d="M 296,96 L 326,96 L 326,126 Q 308,120 296,96 Z"
                fill="#FCF8EF" stroke="#9A958E" strokeOpacity="0.55" strokeWidth="0.65"/>
          <path d="M 296,96 Q 308,120 326,126"
                fill="none" stroke="#9A958E" strokeOpacity="0.65" strokeWidth="0.65"/>
        </g>

        {/* tally hash marks — recovered items */}
        <g stroke="var(--pf-forest)" strokeOpacity="0.4" strokeWidth="0.9">
          {[140, 158, 176, 194, 212].map((x,i)=>(
            <line key={i} x1={x} y1="160" x2={x} y2="200"
                  style={{ animation:`j-blink-dot 2.4s ease-in-out ${-i*0.4}s infinite` }}/>
          ))}
          <line x1="142" y1="186" x2="216" y2="170" transform="rotate(-12 178 178)"/>
        </g>
        <text x="180" y="240" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#6B6B6B" letterSpacing="0.14em">+ 38 KG</text>

        {/* receipt-style line items */}
        <g stroke="#9A958E" strokeOpacity="0.36" strokeWidth="0.5">
          <line x1="110" y1="280" x2="290" y2="280"/>
          <line x1="110" y1="296" x2="270" y2="296"/>
          <line x1="110" y1="312" x2="290" y2="312"/>
          <line x1="110" y1="328" x2="244" y2="328"/>
          <line x1="110" y1="344" x2="270" y2="344"/>
        </g>
      </g>

      <text x="30" y="74" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fill="#6B6B6B" letterSpacing="0.14em">02 · RECOVER</text>
    </g>
  );
}

/* ── 03 · BLEND — rotating concentric rings, vortex of fiber strands,
       particles orbiting in elliptical orbits, central pool breathing  */
function BlendArt() {
  const strands = Array.from({length: 36}).map((_,i)=>{
    const a = (i/36)*Math.PI*2;
    return {
      x1: 200 + Math.cos(a)*46,
      y1: 240 + Math.sin(a)*46,
      x2: 200 + Math.cos(a)*154,
      y2: 240 + Math.sin(a)*154,
      delay: -(i*0.12) % 3,
    };
  });
  const particles = [
    { r: 110, dur: 12, size: 3, color:'#FAF8F5', delay: 0 },
    { r: 110, dur: 12, size: 2, color:'#C4956A', delay: -3 },
    { r: 110, dur: 12, size: 2.5, color:'#FAF8F5', delay: -6 },
    { r: 130, dur: 18, size: 2, color:'#8B9D77', delay: -2 },
    { r: 130, dur: 18, size: 2, color:'#FAF8F5', delay: -9 },
    { r: 130, dur: 18, size: 2.5, color:'#C4956A', delay: -14 },
    { r: 84,  dur: 9,  size: 1.6, color:'#FAF8F5', delay: -1 },
    { r: 84,  dur: 9,  size: 1.6, color:'#FAF8F5', delay: -5 },
  ];

  return (
    <g>
      <ellipse cx="200" cy="470" rx="170" ry="9" fill="#000" opacity="0.10"/>

      {/* outer ring — rotating CCW slowly */}
      <g style={{ transformOrigin:'200px 240px', animation:'j-orbit-ccw 60s linear infinite' }}>
        <circle cx="200" cy="240" r="160" fill="none"
                stroke="var(--pf-forest)" strokeOpacity="0.22" strokeWidth="0.7"
                strokeDasharray="3 8"/>
        <circle cx="200" cy="80" r="3" fill="var(--pf-sage)"/>
      </g>
      {/* middle ring — rotating CW */}
      <g style={{ transformOrigin:'200px 240px', animation:'j-orbit-cw 38s linear infinite' }}>
        <circle cx="200" cy="240" r="132" fill="none"
                stroke="var(--pf-forest)" strokeOpacity="0.3" strokeWidth="0.7"/>
        <circle cx="332" cy="240" r="3.4" fill="var(--pf-copper)"/>
        <circle cx="68"  cy="240" r="2.6" fill="var(--pf-forest)"/>
      </g>
      {/* inner ring — fast CCW dashed */}
      <g style={{ transformOrigin:'200px 240px', animation:'j-orbit-ccw 22s linear infinite' }}>
        <circle cx="200" cy="240" r="100" fill="none"
                stroke="var(--pf-forest)" strokeOpacity="0.4" strokeWidth="0.7"
                strokeDasharray="2 5"/>
      </g>

      {/* radial fiber strands — pulse fade */}
      <g>
        {strands.map((s, i)=>(
          <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
                stroke="var(--pf-forest)" strokeWidth="0.55" strokeLinecap="round"
                style={{ animation:`j-fiber-pulse 3.2s ease-in-out ${s.delay}s infinite` }}/>
        ))}
      </g>

      {/* swirl arcs — two flowing curves */}
      <g fill="none" strokeWidth="0.9" strokeLinecap="round">
        <path d="M 90,200 Q 200,140 310,200 Q 360,260 280,310 Q 200,360 110,290 Q 60,240 90,200 Z"
              stroke="var(--pf-sage)" strokeOpacity="0.55"
              strokeDasharray="6 14"
              style={{ animation:'j-orbit-cw 28s linear infinite', transformOrigin:'200px 240px' }}/>
        <path d="M 110,260 Q 160,180 240,180 Q 320,180 300,260 Q 270,320 200,300 Q 140,290 110,260 Z"
              stroke="var(--pf-copper)" strokeOpacity="0.45"
              strokeDasharray="4 10"
              style={{ animation:'j-orbit-ccw 22s linear infinite', transformOrigin:'200px 240px' }}/>
      </g>

      {/* orbiting particles */}
      {particles.map((p, i)=>(
        <g key={i} style={{
          transformOrigin:'200px 240px',
          animation:`j-orbit-cw ${p.dur}s linear ${p.delay}s infinite`,
        }}>
          <circle cx={200 + p.r} cy={240} r={p.size} fill={p.color} opacity="0.92"/>
        </g>
      ))}

      {/* central pool — breathing */}
      <g style={{ transformOrigin:'200px 240px', animation:'j-breathe 5.5s ease-in-out infinite' }}>
        {/* expanding pulse ring */}
        <g style={{ transformOrigin:'200px 240px' }}>
          <circle cx="200" cy="240" r="40" fill="none" stroke="var(--pf-forest)" strokeOpacity="0.5" strokeWidth="0.8"
                  style={{ transformOrigin:'200px 240px', animation:'j-pulse-ring 3.4s ease-out infinite' }}/>
        </g>
        <circle cx="200" cy="240" r="44" fill="#FAF8F5" stroke="var(--pf-forest)" strokeOpacity="0.7" strokeWidth="1"/>
        <circle cx="200" cy="240" r="44" fill="url(#ps-glow-blend)"/>
        <text x="200" y="237" textAnchor="middle" fontFamily="'Libre Baskerville', serif" fontStyle="italic" fontSize="13" fill="var(--pf-forest)">slurry</text>
        <text x="200" y="252" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="var(--pf-forest)" letterSpacing="0.16em">98% H₂O</text>
      </g>

      <text x="30" y="74" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fill="#6B6B6B" letterSpacing="0.14em">03 · BLEND</text>
    </g>
  );
}

/* ── 04 · REFORM — fresh stack rising, watermark expanding,
       text lines drawing in, scan-line shimmer, complete-indicator   */
function ReformArt() {
  return (
    <g>
      <rect x="115" y="378" width="170" height="6" rx="2" fill="#000" opacity="0.10"/>

      {/* back-stack — three sheets fanning out, gentle tilt */}
      <g style={{ transformOrigin:'200px 240px' }}>
        <rect x="74" y="104" width="244" height="290" rx="2"
              fill="#ECE5DC" stroke="#9A958E" strokeOpacity="0.35" strokeWidth="0.6"
              transform="rotate(-3.5 200 250)"
              style={{ animation:'j-stack-rise 1.2s ease-out 0.0s both' }}/>
        <rect x="78" y="98" width="244" height="290" rx="2"
              fill="#F4EFE7" stroke="#9A958E" strokeOpacity="0.45" strokeWidth="0.6"
              transform="rotate(1.2 200 246)"
              style={{ animation:'j-stack-rise 1.2s ease-out 0.15s both' }}/>
      </g>

      {/* primary sheet — bobs gently */}
      <g style={{ transformOrigin:'200px 240px', animation:'j-bob 8s ease-in-out infinite' }}>
        <rect x="82" y="92" width="244" height="296" rx="2"
              fill="url(#ps-sheet-reform)"
              stroke="url(#ps-edge-reform)" strokeWidth="0.8"
              style={{ animation:'j-stack-rise 1.2s ease-out 0.3s both' }}/>
        <rect x="82" y="92" width="244" height="296" rx="2" fill="url(#ps-fibers-reform)"/>

        {/* shimmer band sweeping across */}
        <g clipPath="url(#ps-sheet-clip-reform)">
          <clipPath id="ps-sheet-clip-reform">
            <rect x="82" y="92" width="244" height="296" rx="2"/>
          </clipPath>
          <rect x="82" y="92" width="120" height="296"
                fill="url(#ps-shimmer-reform)" opacity="0.7"
                style={{ animation:'j-shimmer-x 6s ease-in-out infinite', transformOrigin:'200px 240px' }}/>
          <defs>
            <linearGradient id="ps-shimmer-reform" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0"   stopColor="#FFFFFF" stopOpacity="0"/>
              <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.55"/>
              <stop offset="1"   stopColor="#FFFFFF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </g>

        {/* watermark — concentric, rotating */}
        <g transform="translate(204 232)">
          <g style={{ transformOrigin:'0 0', animation:'j-orbit-ccw 42s linear infinite' }}>
            <circle r="48" fill="none" stroke="var(--pf-forest)" strokeOpacity="0.30" strokeWidth="0.6" strokeDasharray="2 5"/>
          </g>
          <g style={{ transformOrigin:'0 0', animation:'j-orbit-cw 30s linear infinite' }}>
            <circle r="38" fill="none" stroke="var(--pf-forest)" strokeOpacity="0.5" strokeWidth="0.7"/>
            <circle r="2.4" cy="-38" fill="var(--pf-copper)"/>
          </g>
          <circle r="28" fill="none" stroke="var(--pf-forest)" strokeOpacity="0.35" strokeWidth="0.6"/>
          <text x="0" y="2" textAnchor="middle" fontFamily="'Libre Baskerville', serif" fontStyle="italic" fontSize="13" fill="var(--pf-forest)">reformed</text>
          <text x="0" y="16" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="var(--pf-forest)" letterSpacing="0.16em">CYCLE · 04</text>
        </g>

        {/* text lines on sheet — drawing in */}
        <g stroke="#9A958E" strokeOpacity="0.5" strokeWidth="0.55" strokeLinecap="round">
          {[
            [110, 120, 290],
            [110, 134, 274],
            [110, 148, 242],
            [110, 320, 290],
            [110, 334, 268],
            [110, 348, 286],
          ].map((l, i)=>(
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[1]}
                  strokeDasharray="200" strokeDashoffset="200"
                  style={{ animation:`j-draw-line 1.4s cubic-bezier(.2,.7,.3,1) ${0.5 + i*0.18}s both` }}/>
          ))}
        </g>

        {/* "complete" indicator in upper right */}
        <g transform="translate(296, 110)">
          <circle r="9" fill="var(--pf-forest)"/>
          <path d="M -3.4,0 L -1,2.4 L 3.4,-2.6" stroke="#FAF8F5" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle r="9" fill="none" stroke="var(--pf-forest)" strokeOpacity="0.5"
                  style={{ transformOrigin:'296px 110px', animation:'j-pulse-ring 3s ease-out infinite' }}/>
        </g>

        {/* tiny corner reg-marks */}
        <g stroke="#9A958E" strokeWidth="0.5" strokeOpacity="0.6">
          <path d="M88,98  L96,98  M88,98  L88,106"/>
          <path d="M320,98 L312,98 M320,98 L320,106"/>
          <path d="M88,382 L96,382 M88,382 L88,374"/>
          <path d="M320,382 L312,382 M320,382 L320,374"/>
        </g>
      </g>

      <text x="30" y="74" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fill="#6B6B6B" letterSpacing="0.14em">04 · REFORM</text>
    </g>
  );
}

/* =========================================================================
   1) CINEMATIC HOME — vertical scrolly lifecycle
   ========================================================================= */
function CinematicHome() {
  const chapters = [
    {
      id: 'crumple', label: '01 / Crumple', title: 'Discard',
      sub: 'Every twelve seconds a sheet of paper is thrown away in India.',
      body: 'The arc of paper does not end at the waste basket. It begins there. From households, ministries, classrooms and millions of small shops, paper is condensed back into a raw material before any forest is touched.',
      stat: { v:'9.3M', u:'tonnes / year', l:'recovered post-consumer fibre, FY24' },
      bg:'#1A2B22', ink:'#FAF8F5', accent:'#8B9D77',
    },
    {
      id:'recover', label:'02 / Recover', title:'Recover',
      sub:'Paper is one of the most route-dense recyclables on the subcontinent.',
      body:'Local kabadiwalas collect from doorsteps; aggregators bale at neighbourhood depots; mills tender for trailers of mixed grade. The system is informal, dispersed, and — by mass — the largest paper recovery network in the world.',
      stat: { v:'87%', u:'of new mill input', l:'is recovered fibre, not virgin pulp' },
      bg:'#F2EDE7', ink:'#1F2A22', accent:'#2D5F3E',
    },
    {
      id:'blend', label:'03 / Blend', title:'Blend',
      sub:'Old fibre is shorter, weaker, and quietly extraordinary.',
      body:'Inside the pulper, recovered sheets break apart into a slurry of cellulose. A small fraction of virgin fibre — from FSC-managed plantations — is added for strength. The blend is washed, screened, refined and bleached without chlorine.',
      stat: { v:'11×', u:'maximum recycling cycles', l:'before fibre length is exhausted' },
      bg:'#244D32', ink:'#FAF8F5', accent:'#C4956A',
    },
    {
      id:'reform', label:'04 / Reform', title:'Reform',
      sub:'A new sheet, watermarked with everything it remembers.',
      body:'On the wire, the slurry drains, presses, dries and emerges as paper again — the same fibres, now in their second, third or seventh life. The journey is not linear. It is a closed loop with widening margins of efficiency.',
      stat: { v:'0.42', u:'kg CO₂e / kg paper', l:'mean grid-adjusted carbon intensity' },
      bg:'#FAF8F5', ink:'#1F2A22', accent:'#2D5F3E',
    },
  ];

  return (
    <div className="pf" style={{ position:'relative', background:'#FAF8F5' }}>
      {/* Nav dock — sticky at top */}
      <div style={{ position:'absolute', inset:'0 0 auto 0', display:'flex', justifyContent:'center', paddingTop:32, zIndex: 30 }}>
        <MorphingDock items={DOCK_ITEMS} active={0} theme="dark" />
      </div>

      {/* fiber thread — runs full length */}
      <FiberThread height={5200} color="#FAF8F5" opacity={0.22} side="left" offset={88} amplitude={32}/>
      <FiberThread height={5200} color="var(--pf-forest)" opacity={0.18} side="right" offset={88} amplitude={28}/>

      {/* HERO — chapter 00 */}
      <section style={{
        position:'relative', minHeight:880, padding:'140px 100px 110px',
        background:'linear-gradient(180deg, #0F1B14 0%, #1A2B22 100%)',
        color:'#FAF8F5', overflow:'hidden',
      }}>
        <JGrain tone="dark" opacity={0.55}/>
        {/* faint orbits in hero */}
        <svg viewBox="0 0 800 600" style={{ position:'absolute', right:-80, top:60, width:760, height:600, opacity:0.5 }} aria-hidden="true">
          <g transform="translate(400 300)" style={{ animation:'pf-rotate-slow 80s linear infinite', transformOrigin:'center' }}>
            <circle r="280" fill="none" stroke="#FAF8F5" strokeOpacity="0.10" strokeWidth="0.6" strokeDasharray="2 6"/>
          </g>
          <g transform="translate(400 300)" style={{ animation:'pf-rotate-rev 110s linear infinite', transformOrigin:'center' }}>
            <circle r="220" fill="none" stroke="#FAF8F5" strokeOpacity="0.14" strokeWidth="0.6"/>
            <circle r="3" fill="#8B9D77" transform="translate(0 -220)"/>
          </g>
          <g transform="translate(400 300)" style={{ animation:'pf-rotate-slow 60s linear infinite', transformOrigin:'center' }}>
            <circle r="160" fill="none" stroke="#FAF8F5" strokeOpacity="0.18" strokeWidth="0.6" strokeDasharray="3 4"/>
          </g>
          <circle cx="400" cy="300" r="100" fill="none" stroke="#FAF8F5" strokeOpacity="0.25" strokeWidth="0.7"/>
        </svg>

        <div style={{ position:'relative', zIndex:2, display:'grid', gridTemplateColumns:'minmax(0,1fr) 460px', gap:80, alignItems:'center' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:18, marginBottom:48 }}>
              <span className="pf-chip pf-chip--dark">A SUSTAINABILITY DOCUMENTARY</span>
              <span style={{ width:48, height:1, background:'rgba(250,248,245,0.4)' }}/>
              <span className="pf-mono" style={{ color:'rgba(250,248,245,0.7)' }}>FOUR CHAPTERS · 22 MINUTES</span>
            </div>

            <h1 style={{
              fontFamily:'var(--pf-serif)', fontSize: 104, lineHeight: 1.02,
              letterSpacing:'-0.025em', margin:0, color:'#FAF8F5',
            }}>
              How a sheet<br/>
              of paper<br/>
              <em style={{ color:'#C4956A' }}>comes home</em>.
            </h1>

            <p style={{ maxWidth: 520, marginTop: 36, fontSize: 18, lineHeight: 1.7, color:'rgba(250,248,245,0.78)' }}>
              An evidence-led study of the Indian paper system — from the moment a sheet is discarded to the moment it returns, indistinguishable, in your hand. Scroll to follow its arc.
            </p>

            <div style={{ display:'flex', gap:16, marginTop: 44 }}>
              <button className="pf-btn pf-btn--dark">
                Begin the journey <Icon.Chevron dir="down" size={14}/>
              </button>
              <button className="pf-btn pf-btn--ghost" style={{ color:'rgba(250,248,245,0.85)' }}>
                Read the research <Icon.Arrow/>
              </button>
            </div>
          </div>

          <div style={{ position:'relative' }}>
            <PaperState state="crumple" width={460} height={520}/>
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{
          position:'absolute', left:'50%', bottom:36, transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:10, zIndex:3
        }}>
          <span className="pf-mono" style={{ color:'rgba(250,248,245,0.6)' }}>SCROLL TO BEGIN</span>
          <div style={{ width:1, height:48, background:'linear-gradient(to bottom, rgba(250,248,245,0.6), rgba(250,248,245,0))' }}/>
        </div>
      </section>

      {/* CHAPTERS */}
      {chapters.map((c, i) => (
        <ChapterSection key={c.id} idx={i} chapter={c} total={chapters.length}/>
      ))}

      {/* CTA footer */}
      <section style={{
        position:'relative', padding:'140px 100px 90px',
        background:'#0F1B14', color:'#FAF8F5', overflow:'hidden',
      }}>
        <JGrain tone="dark" opacity={0.4}/>
        <div style={{ position:'relative', zIndex:2 }}>
          <div className="pf-mono" style={{ color:'rgba(250,248,245,0.6)', marginBottom:32 }}>
            ── CREDITS · PAPER FOUNDATION INDIA
          </div>
          <h2 style={{ fontFamily:'var(--pf-serif)', fontSize: 78, lineHeight:1.05, letterSpacing:'-0.02em', maxWidth: 1080, margin:0 }}>
            A standing institute for the<br/>
            <em style={{ color:'#C4956A' }}>evidence</em> behind everyday paper.
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 40, marginTop: 80, paddingTop:48, borderTop:'1px solid rgba(250,248,245,0.14)' }}>
            {[
              ['DIRECTION', 'Research & Policy'],
              ['BASE', 'New Delhi · Pune · Coimbatore'],
              ['PARTNERS', '32 mills · 14 universities'],
              ['LICENSE', 'CC BY-NC-SA 4.0'],
            ].map(([k,v])=>(
              <div key={k}>
                <div className="pf-mono" style={{ color:'rgba(250,248,245,0.55)', marginBottom:8 }}>{k}</div>
                <div style={{ fontFamily:'var(--pf-serif)', fontSize:22, lineHeight:1.3 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:72 }}>
            <div style={{ fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize: 22, color:'rgba(250,248,245,0.78)', maxWidth: 560, lineHeight: 1.5 }}>
              "The most sustainable sheet of paper is the one that never had to start from a tree."
              <div className="pf-mono" style={{ fontStyle:'normal', fontSize:11, color:'rgba(250,248,245,0.55)', marginTop:14 }}>
                — DR. ANANYA RAGHAVAN, DIRECTOR OF RESEARCH
              </div>
            </div>
            <button className="pf-btn pf-btn--dark">
              Subscribe to the field log <Icon.Arrow/>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ChapterSection({ idx, chapter: c, total }) {
  const [ref, seen] = useJReveal(0.16);
  const flip = idx % 2 === 1;
  return (
    <section ref={ref} style={{
      position:'relative', minHeight: 920, padding:'130px 100px',
      background: c.bg, color: c.ink, overflow:'hidden',
    }}>
      <JGrain tone={c.ink === '#FAF8F5' ? 'dark' : 'light'} opacity={c.ink==='#FAF8F5'?0.42:0.45}/>

      <div style={{
        position:'relative', zIndex:2,
        display:'grid', gridTemplateColumns: flip ? '480px minmax(0,1fr)' : 'minmax(0,1fr) 480px',
        gap: 100, alignItems:'center',
      }}>
        {/* art column */}
        <div style={{
          gridColumn: flip ? '1' : '2',
          opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(24px)',
          transition:'opacity 1.1s cubic-bezier(.2,.7,.3,1), transform 1.1s cubic-bezier(.2,.7,.3,1)',
          transitionDelay: '0.15s',
          position:'relative', display:'flex', justifyContent:'center',
        }}>
          {/* chapter index ghost */}
          <div style={{
            position:'absolute', top:-60, left:flip?-30:undefined, right:flip?undefined:-30,
            fontFamily:'var(--pf-serif)', fontSize: 220, lineHeight: 1, letterSpacing:'-0.03em',
            color: c.accent, opacity: 0.10, pointerEvents:'none', userSelect:'none',
          }}>{String(idx+1).padStart(2,'0')}</div>
          <PaperState state={c.id} width={480} height={540}/>
        </div>

        {/* text column */}
        <div style={{
          gridColumn: flip ? '2' : '1',
          opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(24px)',
          transition:'opacity 1.1s cubic-bezier(.2,.7,.3,1), transform 1.1s cubic-bezier(.2,.7,.3,1)',
        }}>
          <div className="pf-mono" style={{ color: c.ink === '#FAF8F5' ? 'rgba(250,248,245,0.62)' : 'var(--pf-ink-2)', marginBottom:28 }}>
            {c.label} · CHAPTER OF {String(total).padStart(2,'0')}
          </div>
          <h2 style={{
            fontFamily:'var(--pf-serif)', fontSize: 88, lineHeight: 1.02, letterSpacing:'-0.025em',
            margin: 0, color: c.ink,
          }}>
            {c.title}<span style={{ color: c.accent }}>.</span>
          </h2>
          <div style={{
            fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize: 22, lineHeight:1.45,
            color: c.ink === '#FAF8F5' ? 'rgba(250,248,245,0.85)' : 'var(--pf-ink)',
            marginTop: 28, maxWidth: 560,
          }}>{c.sub}</div>
          <p style={{
            fontSize: 16.5, lineHeight: 1.75, marginTop: 28, maxWidth: 560,
            color: c.ink === '#FAF8F5' ? 'rgba(250,248,245,0.74)' : 'var(--pf-ink-2)',
          }}>{c.body}</p>

          {/* embedded stat */}
          <div style={{
            marginTop: 44, padding: '24px 26px',
            borderLeft: `2px solid ${c.accent}`,
            background: c.ink === '#FAF8F5' ? 'rgba(255,255,255,0.04)' : 'rgba(45,95,62,0.04)',
            display:'flex', alignItems:'baseline', gap: 22,
          }}>
            <div style={{
              fontFamily:'var(--pf-serif)', fontSize: 64, lineHeight: 1, letterSpacing:'-0.02em',
              color: c.accent,
            }}>{c.stat.v}</div>
            <div>
              <div style={{ fontFamily:'var(--pf-mono)', fontSize: 11, letterSpacing:'0.14em', textTransform:'uppercase',
                color: c.ink === '#FAF8F5' ? 'rgba(250,248,245,0.7)' : 'var(--pf-ink-2)' }}>
                {c.stat.u}
              </div>
              <div style={{ fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize:15, marginTop:6,
                color: c.ink === '#FAF8F5' ? 'rgba(250,248,245,0.78)' : 'var(--pf-ink)' }}>
                {c.stat.l}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <a className="pf-link" style={{ color: c.accent, borderBottomColor: c.accent }}>
              Read the chapter notes <Icon.Arrow/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   2) FORESTRY INTELLIGENCE — "The Root System"
   ========================================================================= */
function RootSystemPage() {
  return (
    <div className="pf" style={{ position:'relative', background:'#F2EDE7', overflow:'hidden' }}>
      {/* nav */}
      <div style={{ position:'absolute', inset:'0 0 auto 0', display:'flex', justifyContent:'center', paddingTop:32, zIndex: 30 }}>
        <MorphingDock items={DOCK_ITEMS} active={1} theme="light"/>
      </div>

      <FiberThread height={4400} color="var(--pf-forest)" opacity={0.18} side="left" offset={64} amplitude={20}/>

      {/* Hero — sky above ground */}
      <section style={{
        position:'relative', minHeight: 720, padding:'140px 100px 80px',
        background:'linear-gradient(180deg, #E8E0D5 0%, #F2EDE7 80%, #ECE5DC 100%)',
        overflow:'hidden',
      }}>
        <JGrain tone="light" opacity={0.45}/>
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'flex', alignItems:'center', gap:18, marginBottom: 48 }}>
            <span className="pf-pill">CHAPTER II · FORESTRY</span>
            <span style={{ width:64, height:1, background:'var(--pf-line-2)' }}/>
            <span className="pf-mono">FILED 04.2024 · UPDATED 02.2026</span>
          </div>
          <h1 style={{ fontFamily:'var(--pf-serif)', fontSize: 120, lineHeight: 0.98, letterSpacing:'-0.03em', margin:0, maxWidth: 1180 }}>
            The forest is not<br/>
            what you see.<br/>
            <em style={{ color:'var(--pf-forest)' }}>It is what holds.</em>
          </h1>
          <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) 380px', gap:80, marginTop: 64, alignItems:'end' }}>
            <p className="pf-body-lg" style={{ maxWidth: 720 }}>
              Sustainable pulp does not grow from a tree alone. It grows from the soil chemistry beneath it, the mycorrhizal lattice that ties one tree to its neighbours, and the seventy-year rotational discipline that governs both. This page reads from the canopy down — through the trunk, through the floor, and into the system that decides whether a forest stays a forest.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap: 24 }}>
              {[
                ['423,000', 'hectares under managed rotation'],
                ['72 yr', 'mean stand age at harvest'],
                ['1.7M', 'tonnes pulp / year, certified'],
                ['+38%', 'soil carbon vs. baseline (2015)'],
              ].map(([v,l])=>(
                <div key={l} style={{ paddingTop:14, borderTop:'1px solid var(--pf-line)' }}>
                  <div style={{ fontFamily:'var(--pf-serif)', fontSize: 30, lineHeight:1, color:'var(--pf-forest)' }}>{v}</div>
                  <div className="pf-mono" style={{ marginTop: 8 }}>{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tree cross-section — long composition */}
      <RootSystemDiagram/>

      {/* Footer: management timeline */}
      <section style={{ position:'relative', padding:'100px 100px 140px', background:'var(--pf-forest-3)', color:'#FAF8F5', overflow:'hidden' }}>
        <JGrain tone="dark" opacity={0.4}/>
        <div style={{ position:'relative', zIndex:2 }}>
          <div className="pf-mono" style={{ color:'rgba(250,248,245,0.6)', marginBottom: 24 }}>SEVENTY-TWO YEARS, IN FOUR ACTS</div>
          <h2 style={{ fontFamily:'var(--pf-serif)', fontSize: 56, lineHeight:1.05, letterSpacing:'-0.02em', maxWidth: 980, margin:0 }}>
            A working forest is a slow contract<br/> between three generations.
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 32, marginTop: 80, position:'relative' }}>
            {/* horizontal time line */}
            <div style={{ position:'absolute', left:0, right:0, top: 18, height:1, background:'rgba(250,248,245,0.18)' }}/>
            {[
              ['Y 00–05', 'Establish', 'Native saplings co-planted with cover crop. Soil chemistry mapped at 12 sites per hectare.'],
              ['Y 05–25', 'Tend',      'Thinning at year 8 and 15. Continuous canopy cover maintained at >60%.'],
              ['Y 25–55', 'Mature',    'Selective harvest of upper canopy only. Understory and biodiversity audits annually.'],
              ['Y 55–72', 'Renew',     'Final harvest in coupes. Replanting begins year 71. Stand carbon stocked: 412 t / ha.'],
            ].map(([yr, title, body], i)=>(
              <div key={yr} style={{ position:'relative' }}>
                <div style={{ width:10, height:10, borderRadius:999, background:'#C4956A', position:'absolute', top:14, left:0, boxShadow:'0 0 0 4px rgba(196,149,106,0.18)' }}/>
                <div className="pf-mono" style={{ color:'#C4956A', paddingTop: 40, marginBottom: 14 }}>{yr}</div>
                <div style={{ fontFamily:'var(--pf-serif)', fontSize: 28, lineHeight:1.1, marginBottom: 14 }}>{title}</div>
                <p style={{ fontSize:14.5, lineHeight:1.7, color:'rgba(250,248,245,0.74)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/** The big diagram — canopy above, trunk centre, roots fanning to bottom.
 *  Data callouts pinned at three depths. */
function RootSystemDiagram() {
  const callouts = [
    { y:  60, side:'L', tag:'CANOPY',      v:'+38% photosynthate / m²', l:'mixed-species canopy outperforms monoculture by 38% in net primary production' },
    { y: 240, side:'R', tag:'TRUNK',       v:'412 t C / ha',             l:'mean carbon stock above and below ground, 60-year stand' },
    { y: 540, side:'L', tag:'TOPSOIL',     v:'9.2 g N / kg soil',        l:'nitrogen retention in upper 30cm — twice the regional baseline' },
    { y: 820, side:'R', tag:'MYCORRHIZA',  v:'1,300 km / m³',            l:'fungal hyphal length per cubic metre of root-zone soil' },
    { y:1080, side:'L', tag:'AQUIFER',     v:'82% precip retained',      l:'rotational forest retains four-fifths of monsoon precipitation in-basin' },
  ];
  return (
    <section style={{ position:'relative', padding:'40px 0 0', background:'linear-gradient(180deg, #ECE5DC 0%, #DDD3C3 30%, #6F5A3F 55%, #3A2A18 80%, #1F1408 100%)', overflow:'hidden' }}>
      <JGrain tone="dark" opacity={0.45}/>

      {/* center diagram */}
      <div style={{ position:'relative', height: 1480, width:'100%' }}>
        <svg viewBox="0 0 1440 1480" width="100%" height="1480" preserveAspectRatio="xMidYMid meet"
             style={{ position:'absolute', inset:0 }} aria-hidden="true">
          <defs>
            <radialGradient id="rs-sun" cx="0.5" cy="0.2" r="0.5">
              <stop offset="0" stopColor="#FAF3E2" stopOpacity="0.7"/>
              <stop offset="1" stopColor="#FAF3E2" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="rs-ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0"  stopColor="#7A6243"/>
              <stop offset="1"  stopColor="#2B1B0A"/>
            </linearGradient>
            <linearGradient id="rs-trunk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3A2A18"/>
              <stop offset="0.5" stopColor="#604633"/>
              <stop offset="1" stopColor="#2D1F12"/>
            </linearGradient>
          </defs>

          {/* sun */}
          <ellipse cx="720" cy="60" rx="320" ry="160" fill="url(#rs-sun)"/>

          {/* horizon line */}
          <line x1="0" y1="380" x2="1440" y2="380" stroke="rgba(255,255,255,0.18)" strokeDasharray="2 6"/>
          <text x="80" y="370" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(255,255,255,0.55)" letterSpacing="0.16em">— GROUND LINE</text>

          {/* canopy mass — stylised */}
          <g fill="#2D5F3E" opacity="0.92">
            <ellipse cx="720" cy="260" rx="220" ry="80"/>
            <ellipse cx="580" cy="230" rx="120" ry="60"/>
            <ellipse cx="860" cy="220" rx="140" ry="68"/>
            <ellipse cx="720" cy="180" rx="160" ry="58" fill="#3A7A50"/>
            <ellipse cx="640" cy="160" rx="80" ry="42" fill="#3A7A50"/>
            <ellipse cx="820" cy="160" rx="90" ry="44" fill="#3A7A50"/>
          </g>
          {/* fine canopy strokes for texture */}
          <g stroke="#244D32" strokeWidth="0.6" strokeOpacity="0.55" fill="none">
            {Array.from({length: 30}).map((_,i)=>{
              const a = (i/30)*Math.PI*2;
              const r = 70 + (i%5)*22;
              const x1 = 720 + Math.cos(a)*r*0.4;
              const y1 = 220 + Math.sin(a)*r*0.3;
              return <line key={i} x1={x1} y1={y1-10} x2={x1} y2={y1+12}/>;
            })}
          </g>

          {/* neighbour trees */}
          <g opacity="0.5">
            <ellipse cx="220" cy="320" rx="80" ry="40" fill="#244D32"/>
            <ellipse cx="280" cy="290" rx="60" ry="34" fill="#3A7A50"/>
            <rect x="245" y="320" width="10" height="60" fill="#3A2A18"/>
            <ellipse cx="1240" cy="320" rx="80" ry="40" fill="#244D32"/>
            <ellipse cx="1180" cy="295" rx="56" ry="32" fill="#3A7A50"/>
            <rect x="1235" y="320" width="10" height="60" fill="#3A2A18"/>
          </g>

          {/* trunk descending */}
          <path d="M 700,380 L 700,560 Q 700,620 712,700 L 720,820 L 728,940 Q 740,1020 740,1100 L 740,1200"
                stroke="url(#rs-trunk)" strokeWidth="44" fill="none" strokeLinecap="round" opacity="0.95"/>
          {/* bark grain */}
          <g stroke="#1F1408" strokeWidth="0.7" strokeOpacity="0.55" fill="none">
            <path d="M704,400 Q 706,500 710,600 Q 716,720 720,820 Q 726,940 736,1050 L 740,1180"/>
            <path d="M696,400 Q 692,520 700,640 Q 706,760 712,880 Q 720,1000 728,1100 L 732,1180"/>
            <path d="M712,400 Q 720,540 720,660 Q 720,780 730,900 Q 742,1020 748,1140"/>
          </g>

          {/* underground band */}
          <rect x="0" y="380" width="1440" height="1100" fill="url(#rs-ground)" opacity="0.5"/>

          {/* soil horizon ticks */}
          <g stroke="rgba(255,255,255,0.18)" strokeDasharray="2 8">
            <line x1="0" y1="520" x2="1440" y2="520"/>
            <line x1="0" y1="760" x2="1440" y2="760"/>
            <line x1="0" y1="1040" x2="1440" y2="1040"/>
          </g>
          <g fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(255,255,255,0.55)" letterSpacing="0.16em">
            <text x="80" y="514">— O / TOPSOIL — 30cm</text>
            <text x="80" y="754">— B / SUBSOIL — 90cm</text>
            <text x="80" y="1034">— C / WEATHERED — 180cm</text>
            <text x="80" y="1280">— R / BEDROCK</text>
          </g>

          {/* root system — branching downward */}
          <g stroke="#C4956A" strokeOpacity="0.85" fill="none" strokeLinecap="round">
            {/* primary roots */}
            <path d="M720,420 Q 580,500 460,640 Q 380,760 320,920 Q 280,1080 280,1240" strokeWidth="3.5"/>
            <path d="M720,420 Q 860,500 980,640 Q 1060,760 1120,920 Q 1160,1080 1160,1240" strokeWidth="3.5"/>
            <path d="M720,430 Q 700,580 700,760 Q 700,940 720,1140 Q 720,1280 720,1420" strokeWidth="3"/>
            <path d="M720,430 Q 640,560 580,720 Q 540,880 540,1040 Q 540,1180 560,1320" strokeWidth="2.6"/>
            <path d="M720,430 Q 800,560 860,720 Q 900,880 900,1040 Q 900,1180 880,1320" strokeWidth="2.6"/>
            {/* secondary roots */}
            <path d="M460,640 Q 360,700 280,720 Q 200,740 140,820" strokeWidth="1.4"/>
            <path d="M980,640 Q 1080,700 1160,720 Q 1240,740 1300,820" strokeWidth="1.4"/>
            <path d="M320,920 Q 240,950 180,1000 Q 120,1060 80,1140" strokeWidth="1.2"/>
            <path d="M1120,920 Q 1200,950 1260,1000 Q 1320,1060 1360,1140" strokeWidth="1.2"/>
            <path d="M700,760 Q 620,800 540,840 Q 460,890 400,960" strokeWidth="1.2"/>
            <path d="M700,760 Q 780,800 860,840 Q 940,890 1000,960" strokeWidth="1.2"/>
            <path d="M540,1040 Q 460,1100 400,1180 Q 360,1240 340,1330" strokeWidth="1.1"/>
            <path d="M900,1040 Q 980,1100 1040,1180 Q 1080,1240 1100,1330" strokeWidth="1.1"/>
          </g>

          {/* fine fibrous roots & mycorrhizal hairs */}
          <g stroke="#C4956A" strokeOpacity="0.45" strokeWidth="0.6" fill="none">
            {Array.from({length: 120}).map((_,i)=>{
              const seed = i*7919 % 1000;
              const x = 80 + (seed/1000)*1280;
              const y = 600 + ((i*131) % 800);
              const dx = ((i*173)%80) - 40;
              const dy = ((i*61)%60) - 30;
              return <line key={i} x1={x} y1={y} x2={x+dx} y2={y+dy}/>;
            })}
          </g>

          {/* dot mycelia nodes */}
          <g fill="#FAF8F5" opacity="0.55">
            {Array.from({length: 80}).map((_,i)=>{
              const seed = i*7211 % 1000;
              const x = 100 + (seed/1000)*1240;
              const y = 700 + ((i*199) % 700);
              return <circle key={i} cx={x} cy={y} r={0.8}/>;
            })}
          </g>

          {/* water table line at bottom */}
          <line x1="0" y1="1340" x2="1440" y2="1340" stroke="#8FB7CC" strokeOpacity="0.35" strokeDasharray="4 4"/>
          <text x="80" y="1334" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(143,183,204,0.7)" letterSpacing="0.16em">~ AQUIFER ~</text>
        </svg>

        {/* data callouts — overlayed text columns */}
        {callouts.map((co, i) => (
          <Callout key={co.tag} co={co} y={co.y + 380}/>
        ))}
      </div>
    </section>
  );
}

function Callout({ co, y }) {
  const [ref, seen] = useJReveal(0.2);
  const isL = co.side === 'L';
  return (
    <div ref={ref} style={{
      position:'absolute', top: y, [isL?'left':'right']: 80, width: 320,
      opacity: seen?1:0, transform: seen?'translateX(0)':`translateX(${isL?-24:24}px)`,
      transition:'opacity .8s ease, transform .8s ease',
      color:'#FAF8F5', zIndex:3,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <span className="pf-chip pf-chip--dark">{co.tag}</span>
        <span style={{ flex:1, height:1, background:'rgba(250,248,245,0.3)' }}/>
      </div>
      <div style={{ fontFamily:'var(--pf-serif)', fontSize: 36, lineHeight: 1.1, color:'#FAF8F5' }}>{co.v}</div>
      <p style={{ fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize:15, lineHeight:1.55, marginTop:12, color:'rgba(250,248,245,0.78)' }}>
        {co.l}
      </p>
    </div>
  );
}

/* =========================================================================
   3) CIRCULARITY LAB — "Modular Fibers"
   ========================================================================= */
function ModularFibersPage() {
  const fibers = [
    { id:'F-001', cat:'POLICY',   title:'Mandatory recovered-content thresholds in office paper',
      body:'A panel study of 14 procurement frameworks finds that minimum-recovered-content rules — when paired with auditable supply chains — reduce virgin-fibre demand by 22–34% within three procurement cycles.',
      m1: '–28%', m1l:'virgin demand', m2:'14', m2l:'frameworks reviewed', year:'2025', status:'OPEN' },
    { id:'F-002', cat:'MATERIAL', title:'Fibre length retention across recycling cycles',
      body:'Recovered cellulose loses 6–9% of mean fibre length per cycle under standard pulping. Mild enzymatic refining can recover up to 4% per cycle and extend functional life to eleven generations.',
      m1: '11×', m1l:'reuse cycles', m2:'–9%', m2l:'length / cycle', year:'2025', status:'OPEN' },
    { id:'F-003', cat:'SUPPLY',   title:'Informal-sector wage economics in dry-waste recovery',
      body:'A 14-city household survey of 6,300 waste pickers and aggregators measured income shares from paper streams. Paper alone contributes 42% of mean monthly earnings; instability is highest in tier-3 cities.',
      m1: '6,300', m1l:'respondents', m2:'42%', m2l:'income share', year:'2024', status:'OPEN' },
    { id:'F-004', cat:'CHEMICAL', title:'Chlorine-free brightening at municipal scale',
      body:'Three-mill pilot of totally-chlorine-free bleaching using ozone + hydrogen peroxide. Effluent AOX falls below detection limits while ISO brightness holds within 1.2 points of TCF benchmark.',
      m1: '–96%', m1l:'AOX effluent', m2:'82.4', m2l:'ISO brightness', year:'2025', status:'OPEN' },
    { id:'F-005', cat:'ENERGY',   title:'Black-liquor cogeneration efficiency map',
      body:'Twelve-mill instrumented study of black-liquor energy recovery. Modern recovery boilers achieve 64–72% thermal efficiency; legacy boilers (n=5) operate at 41% mean with 4× higher SO₂ output.',
      m1: '72%', m1l:'recovery η', m2:'5', m2l:'legacy units', year:'2024', status:'CLOSED' },
    { id:'F-006', cat:'WATER',    title:'Closed-loop water systems in writing-paper mills',
      body:'Survey of nine mills operating closed-loop water systems. Mean freshwater intake reduced from 38 to 6.4 m³ per tonne paper, with no measurable impact on machine runnability or sheet strength.',
      m1: '6.4', m1l:'m³ / tonne', m2:'–83%', m2l:'vs. baseline', year:'2026', status:'OPEN' },
  ];

  return (
    <div className="pf" style={{ position:'relative', background:'#FAF8F5', minHeight: 2400 }}>
      <div style={{ position:'absolute', inset:'0 0 auto 0', display:'flex', justifyContent:'center', paddingTop:32, zIndex: 30 }}>
        <MorphingDock items={DOCK_ITEMS} active={2} theme="light"/>
      </div>

      <FiberThread height={2400} color="var(--pf-forest)" opacity={0.18} side="right" offset={64} amplitude={18}/>

      {/* Hero */}
      <section style={{ position:'relative', padding:'140px 100px 60px', overflow:'hidden' }}>
        <JGrain tone="light" opacity={0.35}/>
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'flex', alignItems:'center', gap:18, marginBottom:48 }}>
            <span className="pf-pill pf-pill--solid">CIRCULARITY LAB</span>
            <span style={{ width:64, height:1, background:'var(--pf-line-2)' }}/>
            <span className="pf-mono">06 ACTIVE STUDIES · 04 PEER REVIEWED</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1.4fr) minmax(0,1fr)', gap: 100, alignItems:'end' }}>
            <h1 style={{ fontFamily:'var(--pf-serif)', fontSize: 96, lineHeight: 1.02, letterSpacing:'-0.025em', margin:0 }}>
              Each finding is a fibre. <em style={{ color:'var(--pf-forest)' }}>Together,</em> they form a sheet.
            </h1>
            <div>
              <p className="pf-body-lg" style={{ color:'var(--pf-ink-2)' }}>
                The Lab is the open research hub of the Foundation. Studies are versioned, peer-reviewed, and released into the public domain. Hover any fibre to see the full method, dataset, and citations.
              </p>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop: 28 }}>
                {['All', 'Policy', 'Material', 'Chemical', 'Energy', 'Water', 'Supply'].map((t, i)=>(
                  <button key={t} className={i===0?'pf-pill pf-pill--solid':'pf-pill'} style={{ cursor:'pointer' }}>{t}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* fibre bento grid */}
      <section style={{ position:'relative', padding:'40px 100px 80px' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(6, 1fr)',
          gridAutoRows: 'minmax(280px, auto)',
          gap: 20,
        }}>
          {fibers.map((f, i) => (
            <FiberCard key={f.id} f={f} span={ i===0 ? 4 : i===1 ? 2 : i===3 ? 3 : i===5 ? 3 : 2 } tall={i===0 || i===3}/>
          ))}
        </div>
      </section>

      {/* Method strip */}
      <section style={{ position:'relative', padding:'80px 100px 140px', background:'var(--pf-paper-2)', borderTop:'1px solid var(--pf-line)' }}>
        <div className="pf-mono" style={{ marginBottom: 22 }}>METHOD · OPEN BY DEFAULT</div>
        <h2 style={{ fontFamily:'var(--pf-serif)', fontSize: 56, lineHeight:1.05, letterSpacing:'-0.02em', maxWidth: 900, margin: 0 }}>
          Every fibre in this lab carries its working notes — raw data, code, dissent, and date of release.
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 32, marginTop: 64 }}>
          {[
            ['Datasets',  'CSV + Parquet'],
            ['Notebooks', 'Quarto + R'],
            ['Review',    'Public, ≥ 2 reviewers'],
            ['License',   'CC BY 4.0'],
          ].map(([k, v]) => (
            <div key={k} style={{ borderTop:'1px solid var(--pf-line-2)', paddingTop: 16 }}>
              <div className="pf-mono" style={{ marginBottom: 8 }}>{k.toUpperCase()}</div>
              <div style={{ fontFamily:'var(--pf-serif)', fontSize: 26, lineHeight:1.2 }}>{v}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FiberCard({ f, span = 2, tall = false }) {
  const [open, setOpen] = useSJ(false);
  return (
    <div
      className="pf-tile"
      onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}
      style={{
        gridColumn: `span ${span}`,
        gridRow: tall ? 'span 2' : 'auto',
        padding: 28, position:'relative',
        background: open ? '#1F2A22' : '#fff',
        color: open ? '#FAF8F5' : 'var(--pf-ink)',
        borderColor: open ? '#1F2A22' : 'var(--pf-line)',
        transition: 'background .35s ease, color .35s ease, border-color .35s ease, transform .35s ease',
        cursor:'pointer',
        display:'flex', flexDirection:'column', justifyContent:'space-between', gap: 16,
        overflow:'hidden',
      }}
    >
      {/* Fibre lines decoration */}
      <svg viewBox="0 0 400 220" preserveAspectRatio="none" style={{
        position:'absolute', right: -40, top: -20, width: 260, height: 160, opacity: open ? 0.4 : 0.18,
        transition:'opacity .35s ease',
      }}>
        {Array.from({length: 14}).map((_,i)=>(
          <path key={i}
                d={`M ${i*30} 0 Q ${i*30+40} 110 ${i*30-30} 220`}
                stroke={open?'#C4956A':'var(--pf-forest)'} strokeWidth="0.7" strokeOpacity="0.6" fill="none"/>
        ))}
      </svg>

      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom: 18 }}>
          <span className="pf-mono" style={{ color: open?'#C4956A':'var(--pf-forest)' }}>{f.id}</span>
          <span style={{ flex:1, height:1, background: open?'rgba(255,255,255,0.16)':'var(--pf-line)' }}/>
          <span className="pf-mono" style={{ color: open?'rgba(250,248,245,0.5)':'var(--pf-ink-2)' }}>{f.cat}</span>
        </div>
        <h3 style={{
          fontFamily:'var(--pf-serif)',
          fontSize: tall ? 34 : (span >= 4 ? 32 : 24),
          lineHeight: 1.15, letterSpacing:'-0.015em',
          color: open?'#FAF8F5':'var(--pf-ink)', marginBottom: 12,
        }}>{f.title}</h3>
        <p style={{
          fontSize: 14.5, lineHeight: 1.65,
          color: open?'rgba(250,248,245,0.72)':'var(--pf-ink-2)',
          maxHeight: open ? 240 : 0, overflow:'hidden',
          opacity: open ? 1 : 0,
          transition:'max-height .45s ease, opacity .3s ease',
        }}>{f.body}</p>
      </div>

      <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 20 }}>
        <div style={{ display:'flex', gap: 26 }}>
          <div>
            <div style={{ fontFamily:'var(--pf-serif)', fontSize: 38, lineHeight:1, color: open?'#C4956A':'var(--pf-forest)' }}>{f.m1}</div>
            <div className="pf-mono" style={{ color: open?'rgba(250,248,245,0.55)':'var(--pf-ink-2)', marginTop: 6 }}>{f.m1l.toUpperCase()}</div>
          </div>
          <div>
            <div style={{ fontFamily:'var(--pf-serif)', fontSize: 28, lineHeight:1, color: open?'#FAF8F5':'var(--pf-ink)' }}>{f.m2}</div>
            <div className="pf-mono" style={{ color: open?'rgba(250,248,245,0.55)':'var(--pf-ink-2)', marginTop: 6 }}>{f.m2l.toUpperCase()}</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span className="pf-mono" style={{ color: open?'rgba(250,248,245,0.55)':'var(--pf-ink-2)' }}>
            {f.status} · {f.year}
          </span>
          <span style={{
            width: 30, height: 30, borderRadius: 999, display:'grid', placeItems:'center',
            background: open ? '#C4956A' : 'transparent',
            border: open ? 'none' : '1px solid var(--pf-line-2)',
            color: open ? '#1F2A22' : 'var(--pf-ink)',
            transition:'all .25s ease',
          }}>
            <Icon.Arrow size={14}/>
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4) IMPACT STORIES — "The Horizontal Narrative"
   ========================================================================= */
function HorizontalNarrative() {
  const stories = [
    { ch:'I',   loc:'Muzaffarnagar, UP', year:'2022 → 2025',
      title:'A cooperative of 412 kabadiwalas builds the first formal aggregation depot west of Delhi.',
      lead:'When Reema Devi inherited her father\'s scrap business in 2019, she ran it from a single shed. By 2025 her cooperative aggregates 38 tonnes of paper a day for three regional mills.',
      metric:'38 t/day', mlabel:'recovered fibre throughput', accent:'#C4956A', bg:'#1F2A22', ink:'#FAF8F5' },
    { ch:'II',  loc:'Coimbatore, TN', year:'2023 → 2026',
      title:'A sixty-year-old kraft mill closes its water loop and becomes a regional anchor.',
      lead:'Sundaram Papers, founded 1964, had been drawing 3.1 ML/day from a depleted aquifer. Working with the Foundation, the mill rebuilt its water system over twenty-eight months and now draws less than 0.5 ML/day.',
      metric:'–84%', mlabel:'freshwater intake reduction', accent:'#8B9D77', bg:'#F2EDE7', ink:'#1F2A22' },
    { ch:'III', loc:'Khordha, Odisha', year:'2021 → 2026',
      title:'A schools programme rewrites the textbook economy of one district.',
      lead:'Across 312 government schools, end-of-year textbooks are now collected, repaired, rebound, and returned. The pilot saved an estimated 41 tonnes of new pulp in its first three years and now anchors the state\'s circular procurement policy.',
      metric:'312', mlabel:'schools, one district', accent:'#2D5F3E', bg:'#FAF8F5', ink:'#1F2A22' },
    { ch:'IV',  loc:'Idukki, Kerala', year:'2020 → ongoing',
      title:'A 72-year forestry rotation begins its 17th cycle.',
      lead:'The Idukki working-forest plan is the oldest continuous rotational forestry record in southern India. Its 2024 audit found soil carbon up 38% on baseline, with bird diversity within 4% of the adjacent reserve.',
      metric:'+38%', mlabel:'soil carbon vs. baseline', accent:'#C4956A', bg:'#244D32', ink:'#FAF8F5' },
    { ch:'V',   loc:'Pune, Maharashtra', year:'2024 → ongoing',
      title:'A municipal corporation rebuilds its waste contract around paper.',
      lead:'Pune Municipal Corporation\'s new contract separates dry paper from co-mingled MRF streams at the ward level. Audits report a 2.3× increase in recovered tonnage and a 19% drop in landfill diversion costs.',
      metric:'2.3×', mlabel:'recovered tonnage', accent:'#8B9D77', bg:'#0F1B14', ink:'#FAF8F5' },
  ];

  return (
    <div className="pf" style={{ position:'relative', background:'#FAF8F5', height: '100%' }}>
      {/* nav */}
      <div style={{ position:'absolute', inset:'0 0 auto 0', display:'flex', justifyContent:'center', paddingTop:32, zIndex: 30 }}>
        <MorphingDock items={DOCK_ITEMS} active={3} theme="light"/>
      </div>

      {/* Editorial header */}
      <section style={{ position:'relative', padding:'120px 100px 56px' }}>
        <JGrain tone="light" opacity={0.35}/>
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'flex', alignItems:'center', gap:18, marginBottom:36 }}>
            <span className="pf-pill">CHAPTER IV · STORIES</span>
            <span style={{ width:48, height:1, background:'var(--pf-line-2)' }}/>
            <span className="pf-mono">SCROLL HORIZONTALLY ↦</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1.5fr) minmax(0,1fr)', gap: 80, alignItems:'end' }}>
            <h1 style={{ fontFamily:'var(--pf-serif)', fontSize: 92, lineHeight: 1.02, letterSpacing:'-0.025em', margin:0 }}>
              Field chapters from a<br/>
              <em style={{ color:'var(--pf-forest)' }}>working system.</em>
            </h1>
            <div style={{ paddingBottom: 10 }}>
              <p className="pf-body-lg" style={{ color:'var(--pf-ink-2)', maxWidth: 460 }}>
                Five places where the paper system did not arrive in policy documents, but in trucks, in pulpers, in classrooms, and in the soil. Each chapter is a year of work — and counting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal scrolling strip */}
      <div style={{
        position:'relative', overflowX:'auto', overflowY:'hidden',
        paddingBottom: 30,
        scrollbarWidth:'thin',
      }}>
        <div style={{
          display:'flex', gap: 24, padding:'0 100px',
          minWidth: 'max-content',
        }}>
          {stories.map((s, i) => (
            <StoryPanel key={s.ch} s={s} i={i} total={stories.length}/>
          ))}
          {/* end card */}
          <div style={{
            flex:'0 0 460px', minHeight: 720, padding: 56, borderRadius: 4,
            border:'1px dashed var(--pf-line-2)',
            display:'flex', flexDirection:'column', justifyContent:'space-between',
            background:'transparent',
          }}>
            <div>
              <div className="pf-mono" style={{ marginBottom: 18 }}>VI · NEXT CHAPTER</div>
              <h3 style={{ fontFamily:'var(--pf-serif)', fontSize: 36, lineHeight:1.15, letterSpacing:'-0.015em', margin:0 }}>
                The next field study is yours.
              </h3>
              <p className="pf-body" style={{ color:'var(--pf-ink-2)', marginTop: 22, maxWidth: 340 }}>
                Working on a paper system — municipal, mill, school, household? Submit a chapter to the field log and we'll review within four weeks.
              </p>
            </div>
            <button className="pf-btn pf-btn--primary" style={{ alignSelf:'flex-start' }}>
              Propose a chapter <Icon.Arrow/>
            </button>
          </div>
        </div>
      </div>

      {/* Index strip below */}
      <section style={{ padding:'40px 100px 80px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:18, marginBottom: 18 }}>
          <span className="pf-mono">INDEX · {String(stories.length).padStart(2,'0')} CHAPTERS</span>
          <span style={{ flex:1, height:1, background:'var(--pf-line)' }}/>
          <span className="pf-mono">↤ ↦ KEYBOARD · TRACKPAD · DRAG</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${stories.length}, 1fr)`, gap: 4 }}>
          {stories.map((s,i)=>(
            <div key={s.ch} style={{
              height: 4, background: i===0 ? 'var(--pf-forest)' : 'var(--pf-line-2)',
            }}/>
          ))}
        </div>
      </section>
    </div>
  );
}

function StoryPanel({ s, i, total }) {
  const dark = s.ink === '#FAF8F5';
  return (
    <article style={{
      flex:'0 0 720px', minHeight: 720,
      position:'relative', overflow:'hidden',
      background: s.bg, color: s.ink, borderRadius: 4,
      padding: 56,
      display:'flex', flexDirection:'column', justifyContent:'space-between',
      border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid var(--pf-line)',
    }}>
      <JGrain tone={dark?'dark':'light'} opacity={dark?0.42:0.5}/>
      {/* corner reg-marks */}
      <svg width="28" height="28" style={{ position:'absolute', top:24, right:24, opacity:0.5 }}>
        <path d="M28 0 L28 12 M28 0 L16 0" stroke={dark?'#FAF8F5':'var(--pf-ink-2)'} strokeWidth="0.7"/>
      </svg>

      <div style={{ position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap: 22, marginBottom: 28 }}>
          <span style={{
            fontFamily:'var(--pf-serif)', fontSize: 84, lineHeight:1,
            color: s.accent, letterSpacing:'-0.02em',
          }}>{s.ch}</span>
          <div>
            <div className="pf-mono" style={{ color: dark?'rgba(250,248,245,0.6)':'var(--pf-ink-2)' }}>{s.loc.toUpperCase()}</div>
            <div className="pf-mono" style={{ color: dark?'rgba(250,248,245,0.45)':'var(--pf-ink-3)', marginTop: 6 }}>{s.year}</div>
          </div>
        </div>

        <h3 style={{
          fontFamily:'var(--pf-serif)', fontSize: 34, lineHeight: 1.18, letterSpacing:'-0.015em',
          color: s.ink, margin: 0, maxWidth: 580,
        }}>
          {s.title}
        </h3>

        <p style={{
          fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize: 17, lineHeight:1.6,
          marginTop: 28, color: dark?'rgba(250,248,245,0.78)':'var(--pf-ink-2)',
          maxWidth: 580,
        }}>{s.lead}</p>
      </div>

      <div style={{ position:'relative', zIndex:2, display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 30 }}>
        <div style={{ borderLeft:`2px solid ${s.accent}`, paddingLeft: 18 }}>
          <div style={{ fontFamily:'var(--pf-serif)', fontSize: 64, lineHeight:1, color: s.accent, letterSpacing:'-0.02em' }}>
            {s.metric}
          </div>
          <div className="pf-mono" style={{ color: dark?'rgba(250,248,245,0.62)':'var(--pf-ink-2)', marginTop: 10 }}>
            {s.mlabel.toUpperCase()}
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div className="pf-mono" style={{ color: dark?'rgba(250,248,245,0.45)':'var(--pf-ink-3)', marginBottom: 12 }}>
            CHAPTER {String(i+1).padStart(2,'0')} / {String(total).padStart(2,'0')}
          </div>
          <a className="pf-link" style={{ color: s.accent, borderBottomColor: s.accent }}>
            Read in full <Icon.Arrow/>
          </a>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { CinematicHome, RootSystemPage, ModularFibersPage, HorizontalNarrative });
