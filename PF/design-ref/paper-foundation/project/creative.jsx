// creative.jsx — Creative homepage v2 for Paper Foundation
// Heavier animation, parallax, kinetic type, particle flows.

const { useState: useS2, useEffect: useE2, useRef: useR2, useMemo: useM2, useCallback: useC2 } = React;

/* ========== HOOKS ========== */
function useInView(opts = { threshold: 0.15 }) {
  const ref = useR2(null);
  const [seen, setSeen] = useS2(false);
  useE2(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setSeen(true); obs.disconnect(); }
    }, opts);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen]);
  return [ref, seen];
}

function useMousePos(elRef) {
  const [pos, setPos] = useS2({ x: 0.5, y: 0.5 });
  useE2(() => {
    const el = elRef?.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    const onLeave = () => setPos({ x: 0.5, y: 0.5 });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [elRef]);
  return pos;
}

/* ========== KINETIC HEADLINE ========== */
// "Understanding paper through [evidence|research|data|context], not assumption."
function CycleWord({ words = [], color = 'var(--pf-forest)', interval = 2600 }) {
  const [i, setI] = useS2(0);
  useE2(() => {
    const id = setInterval(() => setI(p => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, []);
  // Calculate longest word to reserve width
  const maxLen = Math.max(...words.map(w => w.length));
  return (
    <span style={{
      position: 'relative',
      display: 'inline-block',
      minWidth: `${maxLen * 0.55}ch`,
      verticalAlign: 'baseline',
      color,
      fontStyle: 'italic',
    }}>
      {words.map((w, idx) => (
        <span key={w} style={{
          position: idx === 0 ? 'relative' : 'absolute',
          left: 0, top: 0,
          opacity: idx === i ? 1 : 0,
          transform: idx === i ? 'translateY(0) skewY(0)' : (idx === (i - 1 + words.length) % words.length ? 'translateY(-100%) skewY(-6deg)' : 'translateY(100%) skewY(6deg)'),
          transition: 'opacity .6s cubic-bezier(.2,.7,.3,1), transform .7s cubic-bezier(.2,.7,.3,1)',
          whiteSpace: 'nowrap',
        }}>{w}</span>
      ))}
    </span>
  );
}

function StaggerText({ text, delay = 0, className, style }) {
  const [ref, seen] = useInView();
  const chars = text.split('');
  return (
    <span ref={ref} className={className} style={{...style, display:'inline-block'}}>
      {chars.map((c, i) => (
        <span key={i} style={{
          display: 'inline-block',
          opacity: seen ? 1 : 0,
          transform: seen ? 'translateY(0)' : 'translateY(0.6em)',
          transition: `opacity .55s cubic-bezier(.2,.7,.3,1) ${delay + i * 18}ms, transform .55s cubic-bezier(.2,.7,.3,1) ${delay + i * 18}ms`,
          whiteSpace: c === ' ' ? 'pre' : 'normal',
        }}>{c}</span>
      ))}
    </span>
  );
}

/* ========== MAGNETIC BUTTON ========== */
function MagneticBtn({ children, primary = false, style = {}, ...rest }) {
  const ref = useR2(null);
  const [t, setT] = useS2({ x: 0, y: 0 });
  return (
    <button
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        setT({
          x: (e.clientX - (r.left + r.width / 2)) * 0.25,
          y: (e.clientY - (r.top + r.height / 2)) * 0.25,
        });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className={`pf-btn ${primary ? 'pf-btn--primary' : 'pf-btn--secondary'}`}
      style={{
        transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
        transition: 'transform .25s cubic-bezier(.2,.7,.3,1), background .18s ease',
        ...style,
      }}
      {...rest}
    >{children}</button>
  );
}

/* ========== PARALLAX PAPER HERO ART ========== */
function HeroParallaxArt() {
  const wrapRef = useR2(null);
  const m = useMousePos(wrapRef);
  const layers = [
    { depth: 8,  rot: -6, w: 240, h: 320, x: 60,  y: 80,  fill: 'rgba(139,157,119,0.18)', stroke: '#8B9D77', tone: 'sage' },
    { depth: 14, rot:  3, w: 260, h: 340, x: 130, y: 120, fill: '#FFFFFF',                stroke: '#E0DAD2', tone: 'paper' },
    { depth: 20, rot: -2, w: 200, h: 280, x: 240, y: 160, fill: 'rgba(196,149,106,0.16)', stroke: '#C4956A', tone: 'copper' },
  ];
  const off = (d) => ({
    x: (m.x - 0.5) * d,
    y: (m.y - 0.5) * d,
  });
  return (
    <div ref={wrapRef} style={{position:'relative', width:560, height:520, perspective:1200}}>
      {/* base orbit + nodes */}
      <svg viewBox="0 0 560 520" width="560" height="520" style={{position:'absolute', inset:0, pointerEvents:'none'}}>
        <defs>
          <radialGradient id="hp-glow" cx="0.5" cy="0.5" r="0.55">
            <stop offset="0" stopColor="#2D5F3E" stopOpacity="0.10"/>
            <stop offset="1" stopColor="#2D5F3E" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="290" cy="260" rx="240" ry="210" fill="url(#hp-glow)"/>
        <g transform="translate(290 260)" style={{transformOrigin:'center', animation:'pf-rotate-slow 90s linear infinite'}}>
          <circle r="200" fill="none" stroke="#2D5F3E" strokeOpacity="0.18" strokeWidth="0.75" strokeDasharray="2 6"/>
          <circle r="160" fill="none" stroke="#2D5F3E" strokeOpacity="0.22" strokeWidth="0.75"/>
        </g>
        <g transform="translate(290 260)" style={{transformOrigin:'center', animation:'pf-rotate-rev 65s linear infinite'}}>
          <circle r="120" fill="none" stroke="#2D5F3E" strokeOpacity="0.3" strokeWidth="0.75" strokeDasharray="3 4"/>
          <circle r="80" fill="none" stroke="#2D5F3E" strokeOpacity="0.45" strokeWidth="1"/>
        </g>
        {/* Subtle drifting fibres */}
        <FibreField/>
      </svg>

      {/* Paper sheets with parallax + 3D tilt */}
      {layers.map((L, i) => {
        const o = off(L.depth);
        return (
          <div key={i} style={{
            position:'absolute', left:L.x, top:L.y, width:L.w, height:L.h,
            transform: `translate3d(${o.x}px, ${o.y}px, 0) rotateZ(${L.rot + (m.x - 0.5) * 2}deg) rotateY(${(m.x - 0.5) * 6}deg) rotateX(${-(m.y - 0.5) * 4}deg)`,
            transition:'transform .35s cubic-bezier(.2,.7,.3,1)',
            transformStyle:'preserve-3d',
          }}>
            <div style={{
              width:'100%', height:'100%',
              background: L.fill,
              border:`1px solid ${L.stroke}`,
              borderRadius:3,
              boxShadow:`${i * 4}px ${i * 6}px ${20 + i*8}px rgba(36,30,22,${0.08 + i*0.03})`,
              position:'relative', overflow:'hidden',
            }}>
              {/* Subtle paper fibres pattern */}
              <svg width="100%" height="100%" viewBox={`0 0 ${L.w} ${L.h}`} style={{position:'absolute', inset:0, opacity:L.tone==='paper'?1:0.6}}>
                <defs>
                  <pattern id={`hp-fib-${i}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform={`rotate(${30 + i*15})`}>
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#244D32" strokeOpacity="0.08" strokeWidth="0.6"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#hp-fib-${i})`}/>
                {/* ruled lines on white paper */}
                {L.tone==='paper' && Array.from({length:10}).map((_, k) => (
                  <line key={k} x1="20" y1={40 + k*28} x2={L.w - 20} y2={40 + k*28} stroke="#9A958E" strokeOpacity={k%3===2?0.18:0.35} strokeWidth="0.5"/>
                ))}
                {/* corner stamp */}
                <text x={L.w-50} y={28} fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#6B6B6B" letterSpacing="0.16em">{`FIG.0${i+1}`}</text>
              </svg>
            </div>
          </div>
        );
      })}

      {/* Floating data callout */}
      <div style={{
        position:'absolute', right:20, top:30,
        transform:`translate3d(${off(28).x}px, ${off(28).y}px, 0)`,
        transition:'transform .35s cubic-bezier(.2,.7,.3,1)',
      }}>
        <div style={{
          background:'#2C2C2C', color:'#FAF8F5', padding:'10px 14px', borderRadius:6,
          fontFamily:'var(--pf-mono)', fontSize:11, letterSpacing:'0.08em',
          boxShadow:'0 10px 30px rgba(0,0,0,0.18)',
        }}>
          <div style={{color:'#C4956A', marginBottom:4}}>RECOVERY · 2024</div>
          <div style={{fontFamily:'var(--pf-serif)', fontSize:18, color:'#FAF8F5', letterSpacing:'-0.005em'}}>72.4%</div>
        </div>
      </div>
      <div style={{
        position:'absolute', left:-10, bottom:60,
        transform:`translate3d(${off(22).x}px, ${off(22).y}px, 0)`,
        transition:'transform .35s cubic-bezier(.2,.7,.3,1)',
      }}>
        <div style={{
          background:'#FAF8F5', color:'#2C2C2C', padding:'10px 14px', borderRadius:6, border:'1px solid #E0DAD2',
          fontFamily:'var(--pf-mono)', fontSize:11, letterSpacing:'0.08em',
          boxShadow:'0 10px 30px rgba(36,30,22,0.10)',
        }}>
          <div style={{color:'#2D5F3E', marginBottom:4}}>FIBER · NON-FOREST</div>
          <div style={{fontFamily:'var(--pf-serif)', fontSize:18, letterSpacing:'-0.005em'}}>91%</div>
        </div>
      </div>
    </div>
  );
}

/* ========== FIBRE FIELD — animated SVG particles ========== */
function FibreField() {
  const [tick, setTick] = useS2(0);
  useE2(() => {
    let raf;
    const loop = () => { setTick(t => t + 1); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  // fibres orbit center
  const fibres = useM2(() => Array.from({length: 18}).map((_, i) => ({
    r: 90 + (i*7) % 130,
    speed: 0.0008 + (i%5)*0.0003,
    phase: (i * 137) % 360,
    len: 14 + (i*3)%18,
    op: 0.25 + ((i*7) % 30)/100,
  })), []);
  return (
    <g>
      {fibres.map((f, i) => {
        const a = (f.phase + tick * f.speed * 1000) % 360;
        const rad = (a * Math.PI) / 180;
        const cx = 290 + Math.cos(rad) * f.r;
        const cy = 260 + Math.sin(rad) * f.r;
        const dx = Math.cos(rad + Math.PI/2) * f.len/2;
        const dy = Math.sin(rad + Math.PI/2) * f.len/2;
        return <line key={i} x1={cx-dx} y1={cy-dy} x2={cx+dx} y2={cy+dy} stroke="#2D5F3E" strokeOpacity={f.op} strokeWidth="0.8" strokeLinecap="round"/>;
      })}
    </g>
  );
}

/* ========== INFINITE EVIDENCE MARQUEE ========== */
function EvidenceMarquee() {
  const items = [
    { k: 'CPCB 2024', v: 'Recovery rate of used paper · 72.4%' },
    { k: 'ICFRE 2023', v: 'Fibre from non-forest sources · 91%' },
    { k: 'IPMA 2024', v: 'Mills with public chain-of-custody · 38 of 78' },
    { k: 'FAO 2023', v: 'Cycles a fibre tolerates before degrading · 5–7' },
    { k: 'IEA 2023', v: 'Embedded CO₂ in a 5-year smartphone · ~85 kg' },
    { k: 'FSSAI 2024', v: 'Food-contact paper safety screenings published · 416' },
    { k: 'MoEFCC 2024', v: 'EPR plastic + paper compliance filings · 12,820' },
    { k: 'ISFR 2023', v: 'Tree cover on agricultural land · 19.45 Mha' },
  ];
  const Row = ({ dir = 1, speed = 60 }) => (
    <div style={{overflow:'hidden', borderTop:'1px solid var(--pf-line)', borderBottom:'1px solid var(--pf-line)', padding:'18px 0', maskImage:'linear-gradient(90deg, transparent 0, #000 100px, #000 calc(100% - 100px), transparent 100%)', WebkitMaskImage:'linear-gradient(90deg, transparent 0, #000 100px, #000 calc(100% - 100px), transparent 100%)'}}>
      <div style={{
        display:'inline-flex', gap:40,
        animation:`pf-marquee${dir>0?'':'-r'} ${speed}s linear infinite`,
        whiteSpace:'nowrap', paddingLeft: dir>0 ? 0 : '50%',
      }}>
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} style={{display:'inline-flex', alignItems:'center', gap:14}}>
            <span style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'var(--pf-copper)', letterSpacing:'0.14em'}}>{it.k}</span>
            <span style={{fontFamily:'var(--pf-serif)', fontSize:20, color:'var(--pf-ink)', letterSpacing:'-0.005em'}}>{it.v}</span>
            <span style={{width:6, height:6, borderRadius:'50%', background:'var(--pf-line-2)'}}></span>
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <section style={{background:'var(--pf-paper)', borderBottom:'1px solid var(--pf-line)'}}>
      <div style={{padding:'12px 64px 0', maxWidth:1400, margin:'0 auto'}}>
        <div style={{display:'flex', alignItems:'center', gap:14, paddingBottom:6}}>
          <span className="pf-dot" style={{background:'var(--pf-forest-2)', animation:'pf-pulse 2s ease-in-out infinite'}}></span>
          <span className="pf-eyebrow">Evidence index · live</span>
        </div>
      </div>
      <Row dir={1} speed={70}/>
    </section>
  );
}

/* ========== INTERACTIVE CIRCULARITY DIAGRAM ========== */
function FlowCircularity() {
  const nodes = [
    { id:'fiber', label:'FIBER', sub:'sourcing', angle: -90, c:'#2D5F3E', detail:{ stat:'91%', text:'non-forest origin', src:'ICFRE, 2023' } },
    { id:'mill',  label:'MILL',  sub:'production', angle: -18, c:'#3A7A50', detail:{ stat:'78', text:'large mills nationally', src:'IPMA, 2024' } },
    { id:'use',   label:'USE',   sub:'consumption', angle: 54,  c:'#8B9D77', detail:{ stat:'20.4M', text:'tonnes consumed / yr', src:'CPCB, 2024' } },
    { id:'rec',   label:'RECOVERY', sub:'collection', angle: 126, c:'#C4956A', detail:{ stat:'72%', text:'recovery rate', src:'CPCB, 2024' } },
    { id:'reuse', label:'RE-PULP', sub:'re-entry',   angle: 198, c:'#6B7280', detail:{ stat:'5–7', text:'cycles per fibre', src:'FAO, 2023' } },
  ];
  const [active, setActive] = useS2('fiber');
  const cur = nodes.find(n => n.id === active);

  const cx = 260, cy = 260, R = 180;
  const pos = nodes.map(n => ({
    ...n,
    x: cx + Math.cos(n.angle * Math.PI / 180) * R,
    y: cy + Math.sin(n.angle * Math.PI / 180) * R,
  }));

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center'}}>
      <div style={{position:'relative', width:520, height:520, margin:'0 auto'}}>
        <svg viewBox="0 0 520 520" width="520" height="520">
          <defs>
            <linearGradient id="fc-arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#2D5F3E" stopOpacity="0.4"/>
              <stop offset="1" stopColor="#2D5F3E" stopOpacity="0.8"/>
            </linearGradient>
          </defs>

          {/* outer dotted orbit */}
          <circle cx={cx} cy={cy} r={R + 30} fill="none" stroke="#E0DAD2" strokeWidth="0.75" strokeDasharray="2 5"/>
          <circle cx={cx} cy={cy} r={R - 30} fill="none" stroke="#E0DAD2" strokeWidth="0.75"/>

          {/* connection arcs */}
          {pos.map((n, i) => {
            const next = pos[(i+1) % pos.length];
            return (
              <path key={i} d={`M ${n.x},${n.y} A ${R+30},${R+30} 0 0 1 ${next.x},${next.y}`}
                    fill="none"
                    stroke={n.id === active || next.id === active ? n.c : '#D4CCC0'}
                    strokeWidth={n.id === active || next.id === active ? 1.6 : 1}
                    strokeOpacity={n.id === active || next.id === active ? 0.85 : 0.5}
                    style={{transition:'stroke .35s, stroke-width .35s, stroke-opacity .35s'}}
              />
            );
          })}

          {/* Flowing particles along loop */}
          <FlowParticles cx={cx} cy={cy} R={R + 30}/>

          {/* nodes */}
          {pos.map(n => {
            const isActive = n.id === active;
            return (
              <g key={n.id} onClick={() => setActive(n.id)} style={{cursor:'pointer'}}>
                <circle cx={n.x} cy={n.y} r={isActive ? 36 : 28}
                        fill={isActive ? '#FAF8F5' : '#FFFFFF'}
                        stroke={n.c} strokeWidth={isActive ? 2 : 1.2}
                        style={{transition:'r .3s, stroke-width .3s'}}
                />
                {isActive && (
                  <circle cx={n.x} cy={n.y} r={48} fill="none" stroke={n.c} strokeOpacity="0.4" strokeWidth="1"
                          style={{animation:'pf-pulse-ring 1.8s ease-out infinite'}}
                  />
                )}
                <text x={n.x} y={n.y + 2} textAnchor="middle"
                      fontFamily="'JetBrains Mono', monospace" fontSize="9"
                      fill={isActive ? n.c : '#6B6B6B'} fontWeight={isActive ? 600 : 400} letterSpacing="0.1em">{n.label}</text>
                <text x={n.x} y={n.y + 14} textAnchor="middle"
                      fontFamily="'Libre Baskerville', serif" fontSize="9" fontStyle="italic"
                      fill="#9A958E">{n.sub}</text>
              </g>
            );
          })}

          {/* center label */}
          <text x={cx} y={cy - 6} textAnchor="middle" fontFamily="'Libre Baskerville', serif" fontStyle="italic" fontSize="20" fill="#2C2C2C">a circular</text>
          <text x={cx} y={cy + 18} textAnchor="middle" fontFamily="'Libre Baskerville', serif" fontStyle="italic" fontSize="20" fill="#2C2C2C">system</text>
        </svg>
      </div>

      <div>
        <div className="pf-eyebrow" style={{color:'var(--pf-copper)', marginBottom:18}}>The circularity primer · interactive</div>
        <h2 style={{fontFamily:'var(--pf-serif)', fontSize:38, lineHeight:1.15, marginBottom:24, letterSpacing:'-0.015em', color:'#FAF8F5'}}>
          A material that already lives <em style={{fontStyle:'italic', color:'#C4956A'}}>inside a loop.</em>
        </h2>
        <p style={{fontSize:16, lineHeight:1.75, color:'rgba(242,237,231,0.78)', marginBottom:36, maxWidth:480}}>
          Hover any stage to inspect the data. From sourcing to re-pulping, a well-run paper system completes
          five to seven cycles before fibres return to soil.
        </p>

        <div style={{
          background:'rgba(250,248,245,0.05)', border:'1px solid rgba(250,248,245,0.12)',
          borderRadius:12, padding:28, minHeight:200,
        }}>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14}}>
            <span style={{width:10, height:10, borderRadius:'50%', background:cur.c, boxShadow:`0 0 12px ${cur.c}`}}></span>
            <span style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'#C4956A', letterSpacing:'0.14em'}}>STAGE · {cur.label}</span>
          </div>
          <div style={{fontFamily:'var(--pf-serif)', fontSize:54, color:'#FAF8F5', letterSpacing:'-0.02em', lineHeight:1, marginBottom:16}} key={cur.id}>
            <CountToStr value={cur.detail.stat}/>
          </div>
          <div style={{fontSize:16, color:'rgba(242,237,231,0.86)', marginBottom:14, lineHeight:1.5}}>{cur.detail.text}</div>
          <div style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'rgba(242,237,231,0.5)', letterSpacing:'0.1em'}}>SOURCE — {cur.detail.src}</div>
        </div>

        <div style={{display:'flex', gap:8, marginTop:24, flexWrap:'wrap'}}>
          {nodes.map(n => (
            <button key={n.id} onClick={() => setActive(n.id)} style={{
              padding:'7px 14px', borderRadius:999,
              background: n.id === active ? n.c : 'transparent',
              border: `1px solid ${n.id === active ? n.c : 'rgba(242,237,231,0.25)'}`,
              color: n.id === active ? '#FAF8F5' : 'rgba(242,237,231,0.65)',
              fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.14em',
              cursor:'pointer', transition:'all .2s ease',
            }}>{n.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowParticles({ cx, cy, R }) {
  const [tick, setTick] = useS2(0);
  useE2(() => {
    let raf;
    const loop = () => { setTick(t => t + 1); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const particles = useM2(() => Array.from({length: 24}).map((_, i) => ({
    phase: (i * 360 / 24),
    speed: 0.18,
    size: 1.6 + (i%3)*0.6,
    color: ['#2D5F3E', '#3A7A50', '#8B9D77', '#C4956A'][i%4],
  })), []);
  return (
    <g>
      {particles.map((p, i) => {
        const a = (p.phase + tick * p.speed) % 360;
        const rad = (a * Math.PI) / 180;
        const x = cx + Math.cos(rad) * R;
        const y = cy + Math.sin(rad) * R;
        return <circle key={i} cx={x} cy={y} r={p.size} fill={p.color} opacity="0.85"/>;
      })}
    </g>
  );
}

function CountToStr({ value }) {
  // Animate a numeric value when possible; otherwise crossfade
  const isNum = /^[0-9.]+/.test(value);
  if (!isNum) {
    return <span style={{animation:'pf-fade-up .5s both'}}>{value}</span>;
  }
  const match = value.match(/^([0-9.]+)(.*)$/);
  const n = parseFloat(match[1]);
  const suffix = match[2] || '';
  return <span>{<CountUp to={n}/>}{suffix}</span>;
}

/* ========== 3D FLIP MYTH CARDS ========== */
function MythDeck() {
  const items = [
    {
      myth: 'The paper industry drives most deforestation in India.',
      fact: 'Over 90% of fibre used by Indian mills now comes from farm-grown wood and agricultural residue, not reserve forests.',
      cat: 'FORESTS',
      src: 'ICFRE, 2024',
      stat: '91%',
      tone: 'forest',
    },
    {
      myth: 'Recycled paper is always better than virgin paper.',
      fact: 'Both carry trade-offs. Recycled fibre saves trees but is energy-intensive and degrades after 5–7 cycles. A circular system needs both.',
      cat: 'RECYCLING',
      src: 'FAO Forest Products, 2023',
      stat: '5–7×',
      tone: 'sage',
    },
    {
      myth: 'Going paperless is automatically the most sustainable choice.',
      fact: 'Digital infrastructure carries embedded carbon. The answer depends on frequency, devices and energy mix — not the medium alone.',
      cat: 'DIGITAL',
      src: 'IEA Digitalisation, 2023',
      stat: '~85 kg',
      tone: 'copper',
    },
    {
      myth: 'India imports most of its pulpwood.',
      fact: 'India is roughly 85% self-sufficient in fibre, sourced primarily from farm forestry in Andhra Pradesh, Punjab and Gujarat.',
      cat: 'SOURCING',
      src: 'IPMA, 2024',
      stat: '85%',
      tone: 'forest',
    },
  ];
  const [idx, setIdx] = useS2(0);
  const [flipped, setFlipped] = useS2(false);
  const cur = items[idx];

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:64, alignItems:'center'}}>
      <div>
        <div className="pf-eyebrow" style={{marginBottom:18}}>Myth · Fact · Source</div>
        <h2 className="pf-h2" style={{fontSize:38, maxWidth:460, marginBottom:24, letterSpacing:'-0.015em'}}>
          The most common belief is rarely the most complete one.
        </h2>
        <p className="pf-body-lg" style={{color:'var(--pf-ink-2)', maxWidth:440, marginBottom:32}}>
          Tap the card to flip it and see what current research suggests — including the source.
        </p>

        <div style={{display:'flex', gap:10, alignItems:'center', marginBottom:32}}>
          <button onClick={() => { setIdx((idx - 1 + items.length) % items.length); setFlipped(false); }}
            style={{width:44, height:44, borderRadius:'50%', border:'1px solid var(--pf-line)', background:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon.Chevron dir="left" size={14}/>
          </button>
          <button onClick={() => { setIdx((idx + 1) % items.length); setFlipped(false); }}
            style={{width:44, height:44, borderRadius:'50%', border:'1px solid var(--pf-forest)', background:'var(--pf-forest)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon.Chevron dir="right" size={14}/>
          </button>
          <div style={{marginLeft:18, fontFamily:'var(--pf-mono)', fontSize:12, color:'var(--pf-ink-2)', letterSpacing:'0.1em'}}>
            {String(idx+1).padStart(2,'0')} <span style={{color:'var(--pf-ink-3)'}}>/ {String(items.length).padStart(2,'0')}</span>
          </div>
        </div>

        <a href="#" className="pf-link">All 48 myth pairs <Icon.Arrow size={14}/></a>
      </div>

      <div style={{perspective:1400, position:'relative', height:480}}>
        {/* card stack — show next two behind */}
        {[2, 1].map(o => {
          const c = items[(idx + o) % items.length];
          return (
            <div key={o} style={{
              position:'absolute', inset:0,
              transform:`translate(${o*14}px, ${o*14}px) rotate(${o*1.5}deg)`,
              opacity: 0.5 - o*0.2,
              background:'#fff', borderRadius:14, border:'1px solid var(--pf-line)',
              boxShadow:'0 8px 30px rgba(36,30,22,0.06)',
            }}></div>
          );
        })}

        {/* Active flippable card */}
        <div style={{
          position:'absolute', inset:0,
          transformStyle:'preserve-3d',
          transition:'transform .9s cubic-bezier(.2,.7,.3,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
          cursor:'pointer',
        }} onClick={() => setFlipped(f => !f)}>
          {/* FRONT — Myth */}
          <div style={{
            position:'absolute', inset:0, backfaceVisibility:'hidden',
            background:'#fff', borderRadius:14, border:'1px solid var(--pf-line)',
            padding:'40px 40px 32px', display:'flex', flexDirection:'column',
            boxShadow:'0 12px 40px rgba(36,30,22,0.08)',
            overflow:'hidden',
          }}>
            {/* big watermark stat */}
            <div style={{
              position:'absolute', right:-20, bottom:-30,
              fontFamily:'var(--pf-serif)', fontSize:240, lineHeight:1, color:'var(--pf-paper-2)',
              letterSpacing:'-0.04em', pointerEvents:'none',
            }}>?</div>

            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32, position:'relative'}}>
              <span className="pf-pill pf-pill--copper">{cur.cat}</span>
              <span className="pf-mono" style={{fontSize:11}}>MYTH · 0{idx+1}</span>
            </div>

            <div className="pf-eyebrow" style={{color:'var(--pf-copper)', marginBottom:18, position:'relative'}}>Common belief</div>

            <div style={{
              fontFamily:'var(--pf-serif)', fontSize:30, lineHeight:1.25,
              color:'var(--pf-ink)', letterSpacing:'-0.01em', position:'relative', flex:1,
            }} key={'m'+idx}>
              <span style={{display:'inline-block', animation:'pf-fade-up .6s both'}}>“{cur.myth}”</span>
            </div>

            <div style={{marginTop:'auto', paddingTop:24, borderTop:'1px solid var(--pf-line)', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative'}}>
              <span style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'var(--pf-ink-2)'}}>Click to reveal evidence →</span>
              <span style={{width:36, height:36, borderRadius:'50%', background:'var(--pf-forest)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Icon.Arrow size={14}/>
              </span>
            </div>
          </div>

          {/* BACK — Fact */}
          <div style={{
            position:'absolute', inset:0, backfaceVisibility:'hidden',
            background:'var(--pf-forest-3)', color:'#FAF8F5', borderRadius:14,
            padding:'40px 40px 32px', display:'flex', flexDirection:'column',
            boxShadow:'0 12px 40px rgba(36,30,22,0.16)',
            transform:'rotateY(180deg)',
            overflow:'hidden',
          }}>
            <div style={{position:'absolute', right:-20, bottom:-50, fontFamily:'var(--pf-serif)', fontSize:200, lineHeight:1, color:'rgba(250,248,245,0.05)', letterSpacing:'-0.04em'}}>{cur.stat}</div>

            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32, position:'relative'}}>
              <span style={{padding:'5px 10px', borderRadius:999, background:'rgba(139,157,119,0.25)', color:'#C9DCB8', fontFamily:'var(--pf-mono)', fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', border:'1px solid rgba(139,157,119,0.35)'}}>Evidence</span>
              <span className="pf-mono" style={{fontSize:11, color:'#C4956A'}}>FACT · 0{idx+1}</span>
            </div>

            <div style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'#C4956A', letterSpacing:'0.14em', marginBottom:18, position:'relative'}}>What research suggests</div>

            <div style={{
              fontFamily:'var(--pf-serif)', fontSize:24, lineHeight:1.35,
              color:'#FAF8F5', letterSpacing:'-0.005em', position:'relative', flex:1,
            }}>{cur.fact}</div>

            <div style={{marginTop:'auto', paddingTop:24, borderTop:'1px solid rgba(250,248,245,0.15)', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative'}}>
              <span style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'rgba(250,248,245,0.65)'}}>SOURCE — {cur.src}</span>
              <span style={{width:36, height:36, borderRadius:'50%', background:'rgba(250,248,245,0.1)', color:'#FAF8F5', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(250,248,245,0.2)'}}>
                <Icon.Arrow size={14}/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== TIMELINE SCRUBBER ========== */
function TimelineScrubber() {
  const data = [
    { y:2001, forest:38, farm:28, residue:18, recycled:16 },
    { y:2005, forest:30, farm:34, residue:18, recycled:18 },
    { y:2010, forest:20, farm:42, residue:18, recycled:20 },
    { y:2015, forest:14, farm:50, residue:16, recycled:20 },
    { y:2020, forest: 9, farm:55, residue:15, recycled:21 },
    { y:2024, forest: 6, farm:58, residue:14, recycled:22 },
  ];
  const [t, setT] = useS2(5); // index
  const [playing, setPlaying] = useS2(false);
  useE2(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setT(p => (p + 1) % data.length);
    }, 1400);
    return () => clearInterval(id);
  }, [playing]);

  const layers = [
    { k:'forest',   color:'#244D32', label:'Reserve forest' },
    { k:'farm',     color:'#3A7A50', label:'Farm forestry' },
    { k:'residue',  color:'#8B9D77', label:'Ag. residue' },
    { k:'recycled', color:'#C4956A', label:'Recovered paper' },
  ];
  const cur = data[t];

  return (
    <section style={{padding:'120px 64px', background:'var(--pf-paper)', borderBottom:'1px solid var(--pf-line)'}}>
      <div style={{maxWidth:1200, margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:64, marginBottom:56, alignItems:'end'}}>
          <div>
            <div className="pf-eyebrow" style={{marginBottom:18}}>Two decades · interactive</div>
            <h2 className="pf-h2" style={{fontSize:44, maxWidth:600, letterSpacing:'-0.015em'}}>
              The fibre that ends up in your paper has <em style={{fontStyle:'italic', color:'var(--pf-forest)'}}>quietly switched origin.</em>
            </h2>
          </div>
          <div>
            <p style={{fontSize:16, lineHeight:1.7, color:'var(--pf-ink-2)', maxWidth:420}}>
              Drag the year handle, or press play, to see the source mix of mill-grade fibre rearrange itself across two decades.
            </p>
          </div>
        </div>

        {/* Big year + stat */}
        <div style={{display:'flex', alignItems:'end', justifyContent:'space-between', marginBottom:32, flexWrap:'wrap', gap:24}}>
          <div style={{display:'flex', alignItems:'end', gap:32}}>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:140, color:'var(--pf-forest)', letterSpacing:'-0.04em', lineHeight:0.85}}>
              {cur.y}
            </div>
            <div style={{paddingBottom:12, display:'flex', flexDirection:'column', gap:6}}>
              {layers.map(l => (
                <div key={l.k} style={{display:'flex', alignItems:'center', gap:12, fontSize:13}}>
                  <div style={{width:14, height:14, background:l.color, borderRadius:2}}></div>
                  <div style={{width:140, color:'var(--pf-ink-2)'}}>{l.label}</div>
                  <div style={{fontFamily:'var(--pf-mono)', color:'var(--pf-ink)', width:40, textAlign:'right'}}>{cur[l.k]}%</div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setPlaying(p => !p)} style={{
            padding:'14px 22px', borderRadius:8,
            background: playing ? 'var(--pf-forest-3)' : 'var(--pf-forest)',
            color:'#fff', border:0, cursor:'pointer',
            fontFamily:'var(--pf-sans)', fontSize:13, fontWeight:500,
            display:'flex', alignItems:'center', gap:10,
          }}>
            {playing ? '❚❚ Pause' : '▶ Play timeline'}
          </button>
        </div>

        {/* Stacked bar visualisation as a 100% horizontal bar */}
        <div style={{display:'flex', height:64, borderRadius:8, overflow:'hidden', marginBottom:24, border:'1px solid var(--pf-line)'}}>
          {layers.map(l => (
            <div key={l.k} style={{
              width: cur[l.k] + '%',
              background: l.color,
              transition:'width .8s cubic-bezier(.2,.7,.3,1)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FAF8F5', fontFamily:'var(--pf-mono)', fontSize:11, letterSpacing:'0.1em',
              minWidth: cur[l.k] < 5 ? 0 : 'auto',
              overflow:'hidden',
            }}>{cur[l.k] >= 8 && `${cur[l.k]}%`}</div>
          ))}
        </div>

        {/* Scrubber */}
        <div style={{position:'relative', padding:'24px 0'}}>
          <div style={{position:'absolute', left:0, right:0, top:'50%', height:2, background:'var(--pf-line)', borderRadius:1}}></div>
          <div style={{position:'absolute', left:0, top:'50%', height:2, width:`${(t/(data.length-1))*100}%`, background:'var(--pf-forest)', borderRadius:1, transition:'width .4s'}}></div>
          <div style={{display:'flex', justifyContent:'space-between', position:'relative'}}>
            {data.map((d, i) => (
              <button key={d.y} onClick={() => { setPlaying(false); setT(i); }} style={{
                position:'relative', width:48, height:48, background:'transparent', border:0, cursor:'pointer',
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              }}>
                <div style={{
                  width: i === t ? 22 : 12, height: i === t ? 22 : 12,
                  borderRadius:'50%',
                  background: i <= t ? 'var(--pf-forest)' : '#fff',
                  border:`2px solid ${i <= t ? 'var(--pf-forest)' : 'var(--pf-line-2)'}`,
                  transition:'all .3s cubic-bezier(.2,.7,.3,1)',
                  boxShadow: i === t ? '0 0 0 6px rgba(45,95,62,0.12)' : 'none',
                }}></div>
                <div style={{position:'absolute', top:'100%', marginTop:8, fontFamily:'var(--pf-mono)', fontSize:11, color: i === t ? 'var(--pf-forest)' : 'var(--pf-ink-2)', fontWeight: i===t?600:400}}>{d.y}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== KINETIC TYPE BANNER ========== */
function KineticBanner() {
  return (
    <section style={{padding:'120px 0', background:'var(--pf-paper-2)', borderBottom:'1px solid var(--pf-line)', overflow:'hidden'}}>
      <div style={{maxWidth:1400, margin:'0 auto', padding:'0 64px'}}>
        <div className="pf-eyebrow" style={{marginBottom:48}}>An editorial position</div>
        <div style={{fontFamily:'var(--pf-serif)', fontSize:96, lineHeight:1.02, letterSpacing:'-0.02em', color:'var(--pf-ink)'}}>
          <div>Paper is not</div>
          <div style={{display:'flex', alignItems:'baseline', gap:18, flexWrap:'wrap'}}>
            <span style={{textDecoration:'line-through', textDecorationColor:'var(--pf-copper)', textDecorationThickness:'5px', color:'var(--pf-ink-2)'}}>the enemy.</span>
            <span style={{fontStyle:'italic', color:'var(--pf-forest)'}}>It’s a system.</span>
          </div>
          <div style={{marginTop:24, fontSize:24, lineHeight:1.5, color:'var(--pf-ink-2)', maxWidth:760, fontFamily:'var(--pf-serif)', fontStyle:'italic'}}>
            One built from forests, fields, mills, hands, decisions — and the rare luxury of being recoverable.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== HERO V2 ========== */
function HeroV2() {
  return (
    <section style={{borderBottom:'1px solid var(--pf-line)', position:'relative', overflow:'hidden'}}>
      <div style={{maxWidth:1400, margin:'0 auto', padding:'80px 64px 96px',
                   display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:64, alignItems:'center'}}>
        <div style={{position:'relative', zIndex:2}}>
          <div className="pf-fade-up" style={{display:'flex', alignItems:'center', gap:14, marginBottom:32}}>
            <span style={{width:32, height:1, background:'var(--pf-forest)'}}></span>
            <span className="pf-eyebrow">A public knowledge platform · est. New Delhi</span>
          </div>
          <h1 style={{fontFamily:'var(--pf-serif)', fontSize:68, lineHeight:1.02, letterSpacing:'-0.02em', marginBottom:32, maxWidth:680}}>
            <StaggerText text="Understanding paper" delay={150}/><br/>
            through{' '}
            <CycleWord words={['evidence', 'research', 'context', 'method']}/>,<br/>
            <StaggerText text="not assumption." delay={900} style={{color:'var(--pf-ink-2)'}}/>
          </h1>
          <p className="pf-body-lg pf-fade-up" style={{maxWidth:540, color:'var(--pf-ink-2)', marginBottom:40, animationDelay:'.4s'}}>
            Public conversations about paper, recycling, and environmental impact are often shaped by
            simplified narratives. We exist to build a more balanced, research-backed understanding of how paper
            fits into responsible, circular systems.
          </p>
          <div className="pf-fade-up" style={{display:'flex', gap:14, alignItems:'center', flexWrap:'wrap', animationDelay:'.55s'}}>
            <MagneticBtn primary>Explore the Facts <Icon.Arrow size={15}/></MagneticBtn>
            <MagneticBtn>Read the Evidence</MagneticBtn>
          </div>

          {/* Mini live ticker under the buttons */}
          <div className="pf-fade-up" style={{marginTop:64, animationDelay:'.7s', display:'flex', alignItems:'center', gap:24, padding:'18px 24px', border:'1px solid var(--pf-line)', borderRadius:12, background:'rgba(255,255,255,0.5)', backdropFilter:'blur(8px)', maxWidth:560}}>
            <div style={{position:'relative'}}>
              <span className="pf-dot" style={{background:'var(--pf-forest-2)', animation:'pf-pulse 2s ease-in-out infinite'}}></span>
            </div>
            <div style={{flex:1}}>
              <div className="pf-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--pf-ink-2)'}}>LATEST · INDIA PAPER CIRCULARITY INDEX 2025</div>
              <div style={{fontSize:14, color:'var(--pf-ink)', marginTop:4}}>Third edition published · 184 pages · open license</div>
            </div>
            <a className="pf-link" style={{fontSize:13}}>Read →</a>
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'center', position:'relative'}}>
          <HeroParallaxArt/>
          <div style={{position:'absolute', top:0, right:0, fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--pf-ink-3)'}}>FIG. 01 — PAPER · SYSTEMS</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{position:'absolute', left:'50%', bottom:24, transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, color:'var(--pf-ink-2)'}}>
        <div className="pf-mono" style={{fontSize:10, letterSpacing:'0.2em'}}>SCROLL</div>
        <div style={{width:1, height:32, background:'var(--pf-line-2)', position:'relative', overflow:'hidden'}}>
          <div style={{position:'absolute', top:-32, left:0, width:1, height:32, background:'var(--pf-forest)', animation:'pf-scroll-drop 2s ease-in-out infinite'}}></div>
        </div>
      </div>
    </section>
  );
}

/* ========== ANIMATED ARTICLES with hover preview ========== */
function FeaturedV2() {
  const articles = [
    { c:'POLICY · 14 MIN', t:'How farm forestry quietly reshaped India’s pulp supply', a:'Dr. Anjali Menon', n:'01' },
    { c:'METHOD · 9 MIN',  t:'Counting cycles: a fibre-level look at recovery rates', a:'Vivek Sharma',     n:'02' },
    { c:'CONTEXT · 7 MIN', t:'Reading the LCA — what life-cycle studies do and don’t resolve', a:'Editorial Desk', n:'03' },
    { c:'BRIEF · 5 MIN',   t:'Extended Producer Responsibility, three years in',     a:'Foundation Desk',  n:'04' },
    { c:'WORKING · 18 MIN', t:'Recovery infrastructure in tier-2 Indian cities',     a:'V. Sharma · H. Iyer', n:'05' },
  ];
  const [hover, setHover] = useS2(null);
  return (
    <section style={{padding:'120px 64px', borderBottom:'1px solid var(--pf-line)'}}>
      <div style={{maxWidth:1400, margin:'0 auto'}}>
        <div style={{display:'flex', alignItems:'end', justifyContent:'space-between', marginBottom:48, gap:32}}>
          <div>
            <div className="pf-eyebrow" style={{marginBottom:14}}>Knowledge Hub · Recent</div>
            <h2 className="pf-h2" style={{fontSize:44, maxWidth:600, letterSpacing:'-0.015em'}}>Reading worth your time, on the <em style={{fontStyle:'italic', color:'var(--pf-forest)'}}>questions worth asking</em>.</h2>
          </div>
          <a href="#" className="pf-link">All publications <Icon.Arrow size={14}/></a>
        </div>

        <div style={{position:'relative'}}>
          {/* Floating preview image follows hover */}
          {hover !== null && (
            <div style={{
              position:'absolute', top:-24, right:80, width:300, height:380, zIndex:5,
              pointerEvents:'none',
              animation:'pf-fade-up .4s both',
            }}>
              <div className="pf-placeholder" style={{width:'100%', height:'100%', borderRadius:8, transform:'rotate(3deg)'}}>EDITORIAL · COVER 4:5</div>
            </div>
          )}

          <div style={{borderTop:'1px solid var(--pf-line)'}}>
            {articles.map((a, i) => (
              <a key={a.t} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{
                display:'grid', gridTemplateColumns:'80px 130px 1fr 220px 60px', gap:24, alignItems:'center',
                padding:'28px 0', borderBottom:'1px solid var(--pf-line)',
                position:'relative', cursor:'pointer',
                transition:'all .3s ease',
                background: hover === i ? 'var(--pf-paper)' : 'transparent',
                paddingLeft: hover === i ? 16 : 0,
                paddingRight: hover === i ? 16 : 0,
              }}>
                {/* hover indicator */}
                {hover === i && (
                  <span style={{position:'absolute', left:-32, top:'50%', transform:'translateY(-50%)', color:'var(--pf-forest)'}}>
                    <Icon.Arrow size={18}/>
                  </span>
                )}
                <span style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'var(--pf-ink-3)', letterSpacing:'0.12em'}}>{a.n}</span>
                <span style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'var(--pf-forest)', letterSpacing:'0.12em'}}>{a.c}</span>
                <span style={{
                  fontFamily:'var(--pf-serif)',
                  fontSize: hover === i ? 30 : 26,
                  lineHeight:1.2, color:'var(--pf-ink)', letterSpacing:'-0.01em',
                  transition:'font-size .3s ease',
                }}>{a.t}</span>
                <span style={{fontSize:13, color:'var(--pf-ink-2)'}}>{a.a}</span>
                <span style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'var(--pf-ink-3)', textAlign:'right'}}>OCT '25</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== ANIMATED IMPACT STATS V2 ========== */
function ImpactStatsV2() {
  const [ref, seen] = useInView({threshold: 0.3});
  const stats = [
    { k: 20.4, suf: 'M', l:'tonnes consumed annually', s:'CPCB, 2024', spark:[3,4,4,5,5,6,7,7,8,9,10] },
    { k: 72,   suf: '%', l:'recovery rate of used paper', s:'IPMA, 2024', spark:[5,5,6,7,8,8,9,10,11,12,13] },
    { k: 91,   suf: '%', l:'fibre from non-forest sources', s:'ICFRE, 2023', spark:[8,9,10,10,11,12,12,13,13,14,14] },
    { k: 500,  suf: 'K', l:'people across the chain', s:'Min. of Commerce', spark:[4,5,5,6,6,7,7,8,9,9,10] },
  ];
  return (
    <section ref={ref} style={{padding:'120px 64px', borderBottom:'1px solid var(--pf-line)', background:'var(--pf-paper)'}}>
      <div style={{maxWidth:1400, margin:'0 auto'}}>
        <div className="pf-eyebrow" style={{marginBottom:14}}>The Indian paper system · 2024 figures</div>
        <h2 className="pf-h2" style={{fontSize:44, maxWidth:680, marginBottom:64, letterSpacing:'-0.015em'}}>Numbers worth understanding, <em style={{fontStyle:'italic', color:'var(--pf-forest)'}}>in context.</em></h2>

        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0}}>
          {stats.map((s, i) => (
            <div key={s.l} style={{
              padding:'40px 32px', position:'relative',
              borderLeft:'1px solid var(--pf-line)',
              borderRight: i === stats.length-1 ? '1px solid var(--pf-line)' : 'none',
              opacity: seen ? 1 : 0,
              transform: seen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity .8s cubic-bezier(.2,.7,.3,1) ${i*150}ms, transform .8s cubic-bezier(.2,.7,.3,1) ${i*150}ms`,
            }}>
              <div style={{display:'flex', alignItems:'baseline', gap:6, marginBottom:8}}>
                <span style={{fontFamily:'var(--pf-serif)', fontSize:88, color:'var(--pf-forest)', letterSpacing:'-0.02em', lineHeight:0.9}}>
                  {seen && <CountUp to={s.k} duration={1600}/>}{!seen && '0'}
                </span>
                <span style={{fontFamily:'var(--pf-serif)', fontSize:32, color:'var(--pf-forest)'}}>{s.suf}</span>
              </div>
              {/* mini drawing-in sparkline */}
              <svg viewBox="0 0 200 40" width="100%" height="36" style={{marginBottom:14}}>
                <polyline
                  points={s.spark.map((v, j) => `${(j/(s.spark.length-1))*200},${40 - (v/14)*38}`).join(' ')}
                  fill="none" stroke="#8B9D77" strokeWidth="1.5" strokeLinecap="round"
                  strokeDasharray="400" strokeDashoffset={seen ? 0 : 400}
                  style={{transition:`stroke-dashoffset 1.6s cubic-bezier(.2,.7,.3,1) ${500 + i*150}ms`}}
                />
              </svg>
              <div style={{fontSize:15, color:'var(--pf-ink)', lineHeight:1.5, marginBottom:14}}>{s.l}</div>
              <div className="pf-mono" style={{fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--pf-ink-3)'}}>{s.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== CUSTOM CURSOR (in-frame) ========== */
function CustomCursor({ container }) {
  const dotRef = useR2(null);
  const ringRef = useR2(null);
  const [label, setLabel] = useS2(null);
  useE2(() => {
    const el = container?.current;
    if (!el) return;
    let rx = 0, ry = 0, dx = 0, dy = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      dx = e.clientX - r.left; dy = e.clientY - r.top;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      }
      // detect interactive
      const tgt = e.target.closest('[data-cursor]');
      setLabel(tgt ? tgt.getAttribute('data-cursor') : null);
    };
    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    el.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, [container]);
  return (
    <>
      <div ref={ringRef} style={{
        position:'absolute', left:0, top:0, pointerEvents:'none',
        width:label?60:36, height:label?60:36, borderRadius:'50%',
        border:'1px solid var(--pf-forest)',
        background: label ? 'rgba(45,95,62,0.06)' : 'transparent',
        mixBlendMode:'multiply',
        transition:'width .25s, height .25s, background .25s',
        zIndex:9999,
      }}>
        {label && <div style={{
          position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', marginTop:6,
          padding:'4px 8px', background:'var(--pf-ink)', color:'#FAF8F5',
          fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.1em', borderRadius:4, whiteSpace:'nowrap',
        }}>{label}</div>}
      </div>
      <div ref={dotRef} style={{
        position:'absolute', left:0, top:0, pointerEvents:'none',
        width:6, height:6, borderRadius:'50%',
        background:'var(--pf-forest)',
        zIndex:9999,
      }}></div>
    </>
  );
}

/* ========== HOMEPAGE V2 ========== */
function HomepageV2() {
  const wrapRef = useR2(null);
  return (
    <div className="pf" ref={wrapRef} style={{position:'relative', cursor:'none'}}>
      <CustomCursor container={wrapRef}/>
      <CampaignBanner/>
      <PFNavbar active="home"/>
      <HeroV2/>
      <EvidenceMarquee/>
      <FeaturedV2/>
      <KineticBanner/>
      <section style={{background:'var(--pf-forest-3)', padding:'120px 64px', color:'#FAF8F5', borderBottom:'1px solid var(--pf-forest-3)'}}>
        <div style={{maxWidth:1400, margin:'0 auto'}}>
          <FlowCircularity/>
        </div>
      </section>
      <TimelineScrubber/>
      <section style={{padding:'120px 64px', borderBottom:'1px solid var(--pf-line)', background:'var(--pf-paper-2)'}}>
        <div style={{maxWidth:1400, margin:'0 auto'}}>
          <MythDeck/>
        </div>
      </section>
      <ImpactStatsV2/>
      <NewsletterBlock/>
      <Footer/>
    </div>
  );
}

Object.assign(window, { HomepageV2, HeroV2, MythDeck, FlowCircularity, TimelineScrubber, EvidenceMarquee, KineticBanner });
