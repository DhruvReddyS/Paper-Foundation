// modern.jsx — HomepageV3 · "Editorial-Modern"
// Pushes the brand further: mesh + grain ambient, cursor spotlight,
// bento composition, ribbon flow, perspective marquee, scroll-driven reveals.

const { useState: useS3, useEffect: useE3, useRef: useR3, useMemo: useM3 } = React;

/* ───────────────── hooks ───────────────── */
function useReveal(opts = { threshold: 0.18 }) {
  const ref = useR3(null);
  const [seen, setSeen] = useS3(false);
  useE3(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); obs.disconnect(); }
    }, opts);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, seen];
}

function useScrollProgress(elRef) {
  const [p, setP] = useS3(0);
  useE3(() => {
    const find = () => {
      const el = elRef.current;
      if (!el) return null;
      let s = el.parentElement;
      while (s && getComputedStyle(s).overflowY !== 'auto' && getComputedStyle(s).overflowY !== 'scroll') {
        s = s.parentElement;
      }
      return s || el.ownerDocument.scrollingElement;
    };
    const scroller = find();
    if (!scroller) return;
    const onScroll = () => {
      const r = elRef.current.getBoundingClientRect();
      const sr = scroller.getBoundingClientRect();
      const total = sr.height + r.height;
      const passed = sr.bottom - r.top;
      setP(Math.max(0, Math.min(1, passed / total)));
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [elRef]);
  return p;
}

function usePointer(elRef) {
  const [p, setP] = useS3({ x: 0.5, y: 0.5, active: false });
  useE3(() => {
    const el = elRef?.current; if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      setP({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, active: true });
    };
    const leave = () => setP(p => ({ ...p, active: false }));
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [elRef]);
  return p;
}

/* ───────────────── ambient backdrop ───────────────── */
function MeshGradient({ palette = ['#2D5F3E', '#8B9D77', '#C4956A'], opacity = 0.7 }) {
  return (
    <div className="pf-mesh" style={{ opacity }}>
      <span style={{ left:'-10%', top:'-15%', width:'55%', height:'55%', background:palette[0], animation:'pf-mesh-1 18s ease-in-out infinite' }}/>
      <span style={{ right:'-15%', top:'10%', width:'50%', height:'50%', background:palette[1], animation:'pf-mesh-2 22s ease-in-out infinite' }}/>
      <span style={{ left:'25%', bottom:'-25%', width:'60%', height:'60%', background:palette[2], animation:'pf-mesh-3 26s ease-in-out infinite' }}/>
    </div>
  );
}

function Grain({ light }) { return <div className={'pf-grain' + (light?' pf-grain--light':'')}/>; }

/* ───────────────── cursor spotlight ───────────────── */
function Spotlight({ container, color = 'rgba(45,95,62,0.18)', size = 520 }) {
  const p = usePointer(container);
  return (
    <div style={{
      position:'absolute', inset:0, pointerEvents:'none', zIndex:1,
      background: `radial-gradient(${size}px circle at ${p.x*100}% ${p.y*100}%, ${color}, transparent 60%)`,
      opacity: p.active ? 1 : 0.4,
      transition:'opacity .35s ease',
      mixBlendMode:'multiply',
    }}/>
  );
}

/* ───────────────── word morpher ───────────────── */
function MorphWord({ words, color = 'var(--pf-forest)', interval = 2400 }) {
  const [i, setI] = useS3(0);
  useE3(() => { const id = setInterval(() => setI(p => (p+1)%words.length), interval); return () => clearInterval(id); }, []);
  const maxLen = Math.max(...words.map(w => w.length));
  return (
    <span style={{ position:'relative', display:'inline-block', minWidth:`${maxLen*0.55}ch`, color, fontStyle:'italic', verticalAlign:'baseline' }}>
      {words.map((w, idx) => (
        <span key={w} style={{
          position: idx===0 ? 'relative' : 'absolute', left:0, top:0,
          opacity: idx===i ? 1 : 0,
          transform: idx===i ? 'translateY(0) scale(1)' : (idx===(i-1+words.length)%words.length ? 'translateY(-60%) scale(0.92)' : 'translateY(60%) scale(0.92)'),
          filter: idx===i ? 'blur(0)' : 'blur(8px)',
          transition:'opacity .7s cubic-bezier(.2,.7,.3,1), transform .8s cubic-bezier(.2,.7,.3,1), filter .7s cubic-bezier(.2,.7,.3,1)',
          whiteSpace:'nowrap',
        }}>{w}</span>
      ))}
    </span>
  );
}

/* ───────────────── magnetic CTA ───────────────── */
function PullBtn({ children, primary, dark, onClick, style }) {
  const ref = useR3(null);
  const [t, setT] = useS3({x:0,y:0});
  return (
    <button ref={ref} onClick={onClick}
      onMouseMove={(e)=>{const r=ref.current.getBoundingClientRect();setT({x:(e.clientX-(r.left+r.width/2))*0.3,y:(e.clientY-(r.top+r.height/2))*0.3})}}
      onMouseLeave={()=>setT({x:0,y:0})}
      style={{
        position:'relative', overflow:'hidden',
        display:'inline-flex', alignItems:'center', gap:12,
        padding:'16px 26px', borderRadius:999,
        border:'1px solid transparent',
        fontFamily:'var(--pf-sans)', fontSize:14, fontWeight:500, letterSpacing:'0.005em',
        cursor:'pointer',
        background: primary ? 'var(--pf-ink)' : dark ? '#FAF8F5' : 'transparent',
        color: primary ? '#FAF8F5' : dark ? 'var(--pf-ink)' : 'var(--pf-ink)',
        borderColor: primary || dark ? 'transparent' : 'var(--pf-line-2)',
        transform:`translate3d(${t.x}px, ${t.y}px, 0)`,
        transition:'transform .3s cubic-bezier(.2,.7,.3,1), background .25s ease',
        ...style,
      }}>
      {children}
    </button>
  );
}

/* ───────────────── tiny tick chart ───────────────── */
function MicroChart({ data, color = 'var(--pf-forest)', height = 36, animate = true }) {
  const [ref, seen] = useReveal({threshold:0.4});
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v,i)=>`${(i/(data.length-1))*200},${36 - ((v-min)/(max-min||1))*32}`).join(' ');
  return (
    <svg ref={ref} viewBox="0 0 200 36" width="100%" height={height} style={{display:'block'}}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="400" strokeDashoffset={animate ? (seen ? 0 : 400) : 0}
        style={{ transition:'stroke-dashoffset 1.4s cubic-bezier(.2,.7,.3,1)' }}/>
      <polyline points={`0,36 ${pts} 200,36`} fill={color} fillOpacity="0.08" opacity={seen ? 1 : 0} style={{transition:'opacity .8s .4s ease'}}/>
    </svg>
  );
}

/* ───────────────── ambient nav (modernized) ───────────────── */
function NavV3() {
  const items = ['Research','Myths & Facts','Circularity','Reports','About'];
  const [hover, setHover] = useS3(-1);
  return (
    <header style={{
      position:'sticky', top:0, zIndex:40,
      borderBottom:'1px solid rgba(224,218,210,0.6)',
      background:'rgba(250,248,245,0.7)',
      backdropFilter:'blur(20px) saturate(160%)',
      WebkitBackdropFilter:'blur(20px) saturate(160%)',
    }}>
      <div style={{maxWidth:1400, margin:'0 auto', padding:'16px 64px',
                   display:'flex', alignItems:'center', justifyContent:'space-between', gap:32}}>
        <a href="#" style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{position:'relative', width:30, height:30}}>
            <div style={{position:'absolute', inset:0, background:'var(--pf-forest)', borderRadius:6, animation:'pf-spin-slow 40s linear infinite'}}/>
            <div style={{position:'absolute', inset:4, background:'var(--pf-paper)', borderRadius:3, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--pf-serif)', fontSize:13, color:'var(--pf-forest)'}}>P</div>
          </div>
          <div style={{lineHeight:1}}>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:17, letterSpacing:'-0.005em'}}>Paper Foundation</div>
            <div style={{fontFamily:'var(--pf-mono)', fontSize:9.5, letterSpacing:'0.2em', color:'var(--pf-ink-2)', marginTop:3, textTransform:'uppercase'}}>India · est. 2021</div>
          </div>
        </a>
        <nav style={{display:'flex', gap:4, padding:4, borderRadius:999, background:'rgba(255,255,255,0.55)', border:'1px solid var(--pf-line)'}}
             onMouseLeave={() => setHover(-1)}>
          {items.map((it, i) => (
            <a key={it} href="#" onMouseEnter={() => setHover(i)}
              style={{
                position:'relative',
                padding:'8px 16px', borderRadius:999,
                fontSize:13.5, color:'var(--pf-ink)', zIndex:1,
                transition:'color .2s ease',
              }}>
              {hover === i && <span style={{position:'absolute', inset:0, background:'var(--pf-ink)', borderRadius:999, zIndex:-1, transition:'all .25s'}}/>}
              <span style={{color: hover === i ? '#FAF8F5' : 'var(--pf-ink)', transition:'color .2s ease'}}>{it}</span>
            </a>
          ))}
        </nav>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <button style={{
            display:'flex', alignItems:'center', gap:10, padding:'9px 14px',
            borderRadius:999, border:'1px solid var(--pf-line)', background:'rgba(255,255,255,0.55)',
            fontSize:12.5, color:'var(--pf-ink-2)', fontFamily:'var(--pf-sans)', cursor:'pointer',
          }}>
            <Icon.Search size={13}/> Search the index
            <span style={{padding:'2px 6px', borderRadius:4, border:'1px solid var(--pf-line-2)', fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.08em', color:'var(--pf-ink-3)'}}>⌘K</span>
          </button>
          <PullBtn primary style={{padding:'10px 18px', fontSize:13}}>Subscribe <Icon.Arrow size={13}/></PullBtn>
        </div>
      </div>
    </header>
  );
}

/* ───────────────── hero v3 ───────────────── */
function HeroV3() {
  const wrap = useR3(null);
  const p = usePointer(wrap);
  return (
    <section ref={wrap} style={{position:'relative', overflow:'hidden', borderBottom:'1px solid var(--pf-line)'}}>
      {/* atmospheric layers */}
      <MeshGradient palette={['rgba(45,95,62,0.55)', 'rgba(196,149,106,0.45)', 'rgba(139,157,119,0.5)']} opacity={0.5}/>
      <Spotlight container={wrap} color="rgba(45,95,62,0.14)" size={620}/>
      <Grain light/>

      <div style={{position:'relative', zIndex:2, maxWidth:1400, margin:'0 auto', padding:'96px 64px 64px',
                   display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:64, alignItems:'center'}}>
        <div>
          <div className="pf-chip" style={{marginBottom:36}}>
            <span style={{width:7, height:7, borderRadius:'50%', background:'var(--pf-forest)', boxShadow:'0 0 0 4px rgba(45,95,62,0.16)', animation:'pf-blink 2.4s ease-in-out infinite'}}/>
            Editorial · circularity index 2025 live
          </div>

          <h1 style={{fontFamily:'var(--pf-serif)', fontSize:80, lineHeight:0.98, letterSpacing:'-0.025em', marginBottom:32, maxWidth:780}}>
            Understanding paper<br/>
            through{' '}<MorphWord words={['evidence', 'research', 'context', 'fibre']}/>,<br/>
            <span style={{color:'var(--pf-ink-2)'}}>not assumption.</span>
          </h1>

          <p style={{fontSize:19, lineHeight:1.65, color:'var(--pf-ink-2)', maxWidth:540, marginBottom:40}}>
            A public knowledge platform building a balanced, research-backed
            view of how paper fits into responsible, circular systems.
          </p>

          <div style={{display:'flex', gap:12, alignItems:'center', flexWrap:'wrap'}}>
            <PullBtn primary>Explore the facts <Icon.Arrow size={15}/></PullBtn>
            <PullBtn>Read the evidence</PullBtn>
          </div>

          {/* live signals row */}
          <div style={{marginTop:64, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14, maxWidth:640}}>
            {[
              { k:<><CountUp to={20.4}/>M</>, sub:'tonnes / yr', src:'CPCB' },
              { k:<><CountUp to={72}/>%</>,   sub:'recovery rate', src:'IPMA' },
              { k:<><CountUp to={91}/>%</>,   sub:'non-forest fibre', src:'ICFRE' },
            ].map((s,i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,0.55)', backdropFilter:'blur(14px)',
                border:'1px solid var(--pf-line)', borderRadius:14, padding:'16px 18px',
              }}>
                <div style={{fontFamily:'var(--pf-serif)', fontSize:36, color:'var(--pf-forest)', letterSpacing:'-0.02em', lineHeight:1}}>{s.k}</div>
                <div style={{fontSize:13, color:'var(--pf-ink)', marginTop:8}}>{s.sub}</div>
                <div style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.16em', color:'var(--pf-ink-3)', marginTop:6, textTransform:'uppercase'}}>{s.src}</div>
              </div>
            ))}
          </div>
        </div>

        {/* hero composition: stacked tilting cards */}
        <HeroComposition pointer={p}/>
      </div>
    </section>
  );
}

function HeroComposition({ pointer }) {
  const tilt = (depth) => ({
    transform: `perspective(1200px) rotateX(${(pointer.y-0.5)*-8}deg) rotateY(${(pointer.x-0.5)*8}deg) translate3d(${(pointer.x-0.5)*depth}px, ${(pointer.y-0.5)*depth}px, 0)`,
    transition: 'transform .4s cubic-bezier(.2,.7,.3,1)',
  });
  return (
    <div style={{position:'relative', width:'100%', height:600, display:'flex', justifyContent:'center', alignItems:'center'}}>
      {/* orbiting dotted rings */}
      <svg viewBox="0 0 560 560" width="560" height="560" style={{position:'absolute', inset:'50% 50% auto auto', transform:'translate(50%, -50%)'}}>
        <g transform="translate(280 280)" style={{animation:'pf-rotate-slow 80s linear infinite', transformOrigin:'center'}}>
          <circle r="240" fill="none" stroke="var(--pf-forest)" strokeOpacity="0.15" strokeWidth="0.75" strokeDasharray="2 6"/>
          <circle r="200" fill="none" stroke="var(--pf-forest)" strokeOpacity="0.18" strokeWidth="0.75"/>
        </g>
        <g transform="translate(280 280)" style={{animation:'pf-rotate-rev 55s linear infinite', transformOrigin:'center'}}>
          <circle r="160" fill="none" stroke="var(--pf-forest)" strokeOpacity="0.25" strokeWidth="0.75" strokeDasharray="3 4"/>
        </g>
      </svg>

      {/* main editorial card */}
      <div style={{...tilt(10), position:'relative', width:340, height:440, borderRadius:18,
                   background:'#fff', border:'1px solid var(--pf-line)', boxShadow:'0 30px 80px rgba(36,30,22,0.12)', overflow:'hidden'}}>
        <div style={{padding:'24px 26px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <span style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.18em', color:'var(--pf-forest)'}}>VOL.07 · ISS.04</span>
          <span style={{fontFamily:'var(--pf-mono)', fontSize:10, color:'var(--pf-ink-3)'}}>NEW DELHI · '25</span>
        </div>
        <div style={{padding:'18px 26px'}}>
          <div style={{fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize:14, color:'var(--pf-ink-2)', marginBottom:10}}>cover essay</div>
          <div style={{fontFamily:'var(--pf-serif)', fontSize:34, lineHeight:1.05, letterSpacing:'-0.015em'}}>
            The quiet&nbsp;rewiring of India's pulp&nbsp;chain.
          </div>
        </div>
        <div style={{margin:'0 26px', borderTop:'1px solid var(--pf-line)', paddingTop:14, paddingBottom:14, display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--pf-ink-2)'}}>
          <span>Anjali Menon</span><span style={{fontFamily:'var(--pf-mono)'}}>14 MIN</span>
        </div>
        {/* page texture */}
        <svg width="100%" height="180" viewBox="0 0 340 180" style={{display:'block'}}>
          {Array.from({length:7}).map((_,i)=>(
            <line key={i} x1="26" y1={20+i*22} x2="314" y2={20+i*22} stroke="#9A958E" strokeOpacity={0.35-i*0.03} strokeWidth="0.5"/>
          ))}
        </svg>
        <div style={{position:'absolute', left:26, bottom:18, fontFamily:'var(--pf-mono)', fontSize:10, color:'var(--pf-ink-3)', letterSpacing:'0.14em'}}>↳ KNOWLEDGE HUB / FEATURE</div>
      </div>

      {/* floating chart card */}
      <div style={{...tilt(22), position:'absolute', right:-10, top:30, width:240, padding:'18px 18px 14px',
                   background:'var(--pf-forest-3)', color:'#FAF8F5', borderRadius:14, boxShadow:'0 24px 60px rgba(36,30,22,0.18)'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
          <span style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.16em', color:'#C4956A'}}>RECOVERY · IND</span>
          <span style={{fontFamily:'var(--pf-mono)', fontSize:10, color:'rgba(250,248,245,0.5)'}}>'01–'24</span>
        </div>
        <div style={{fontFamily:'var(--pf-serif)', fontSize:32, letterSpacing:'-0.02em', lineHeight:1}}>72.4%</div>
        <div style={{marginTop:10, opacity:0.92}}>
          <MicroChart data={[28,32,33,36,40,44,49,54,58,63,68,72]} color="#C4956A" height={48}/>
        </div>
        <div style={{fontFamily:'var(--pf-mono)', fontSize:10, color:'rgba(250,248,245,0.5)', marginTop:6}}>CPCB · ANNUAL</div>
      </div>

      {/* fibre token */}
      <div style={{...tilt(28), position:'absolute', left:-30, bottom:80, width:200,
                   background:'#FAF8F5', border:'1px solid var(--pf-line)', borderRadius:14, padding:'16px 18px', boxShadow:'0 18px 40px rgba(36,30,22,0.10)'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
          <span style={{width:6, height:6, borderRadius:'50%', background:'var(--pf-forest)', animation:'pf-blink 2s ease-in-out infinite'}}/>
          <span style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.16em', color:'var(--pf-ink-2)'}}>LIVE INDEX</span>
        </div>
        <div style={{fontFamily:'var(--pf-serif)', fontSize:14, lineHeight:1.35, color:'var(--pf-ink)'}}>
          Farm-grown fibre share — <span style={{color:'var(--pf-forest)', fontStyle:'italic'}}>now 58%</span> of mill intake.
        </div>
      </div>

      {/* badge */}
      <div style={{...tilt(34), position:'absolute', right:60, bottom:30, width:120, height:120, borderRadius:'50%',
                   background:'#C4956A', color:'#FAF8F5', display:'flex', alignItems:'center', justifyContent:'center',
                   fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize:16, textAlign:'center',
                   boxShadow:'0 18px 40px rgba(196,149,106,0.4)'}}>
        <div>
          <div style={{fontFamily:'var(--pf-mono)', fontStyle:'normal', fontSize:9, letterSpacing:'0.2em', marginBottom:4, opacity:0.78}}>NEW</div>
          INDEX<br/>2025
        </div>
      </div>

      <div style={{position:'absolute', top:0, right:0, fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.18em', color:'var(--pf-ink-3)'}}>
        FIG.01 — PAPER · SYSTEMS
      </div>
    </div>
  );
}

/* ───────────────── perspective marquee ───────────────── */
function MarqueeBand() {
  const items = [
    { k:'CPCB·24',   v:'recovery rate · 72.4%' },
    { k:'ICFRE·23',  v:'non-forest fibre · 91%' },
    { k:'IPMA·24',   v:'mills w/ chain-of-custody · 38/78' },
    { k:'FAO·23',    v:'cycles per fibre · 5–7' },
    { k:'IEA·23',    v:'embedded CO₂ · phone · ~85 kg' },
    { k:'MoEFCC·24', v:'EPR filings · 12,820' },
    { k:'ISFR·23',   v:'agri tree cover · 19.45 Mha' },
    { k:'FSSAI·24',  v:'food-contact screens · 416' },
  ];
  const Row = () => (
    <div style={{display:'inline-flex', gap:48, animation:'pf-marquee-3d 50s linear infinite', whiteSpace:'nowrap'}}>
      {[...items, ...items, ...items].map((it,i)=>(
        <span key={i} style={{display:'inline-flex', alignItems:'center', gap:14}}>
          <span style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'var(--pf-copper)', letterSpacing:'0.16em'}}>{it.k}</span>
          <span style={{fontFamily:'var(--pf-serif)', fontSize:26, color:'var(--pf-ink)', letterSpacing:'-0.005em'}}>{it.v}</span>
          <span style={{width:6, height:6, borderRadius:'50%', background:'var(--pf-line-2)'}}/>
        </span>
      ))}
    </div>
  );
  return (
    <section style={{background:'var(--pf-paper)', borderBottom:'1px solid var(--pf-line)', padding:'24px 0', overflow:'hidden', perspective:1000}}>
      <div style={{padding:'0 64px 14px', maxWidth:1400, margin:'0 auto', display:'flex', alignItems:'center', gap:12}}>
        <span style={{width:6, height:6, borderRadius:'50%', background:'var(--pf-forest-2)', animation:'pf-blink 2s ease-in-out infinite'}}/>
        <span className="pf-eyebrow">Evidence index · live</span>
      </div>
      <div style={{transform:'rotateX(12deg)', transformOrigin:'center', overflow:'hidden',
                   maskImage:'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
                   WebkitMaskImage:'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)'}}>
        <Row/>
      </div>
    </section>
  );
}

/* ───────────────── bento board ───────────────── */
function BentoBoard() {
  const [ref, seen] = useReveal({threshold:0.2});
  const fade = (i) => ({
    opacity: seen ? 1 : 0,
    transform: seen ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity .8s cubic-bezier(.2,.7,.3,1) ${i*120}ms, transform .8s cubic-bezier(.2,.7,.3,1) ${i*120}ms`,
  });
  return (
    <section ref={ref} style={{padding:'120px 64px', borderBottom:'1px solid var(--pf-line)'}}>
      <div style={{maxWidth:1400, margin:'0 auto'}}>
        <div style={{display:'flex', alignItems:'end', justifyContent:'space-between', marginBottom:56, gap:24}}>
          <div>
            <div className="pf-eyebrow" style={{marginBottom:14}}>The board · october</div>
            <h2 style={{fontFamily:'var(--pf-serif)', fontSize:54, lineHeight:1.04, letterSpacing:'-0.02em', maxWidth:780}}>
              A composition of <em style={{color:'var(--pf-forest)'}}>open data</em>, essays, and inquiries.
            </h2>
          </div>
          <a href="#" className="pf-link">Open the index <Icon.Arrow size={14}/></a>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(12, 1fr)', gridAutoRows:'minmax(160px, auto)', gap:16}}>

          {/* big editorial */}
          <article className="pf-tile" style={{...fade(0), gridColumn:'span 6', gridRow:'span 2', padding:'32px 32px 28px', display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22}}>
              <span className="pf-pill">POLICY · 14 MIN</span>
              <span className="pf-mono" style={{fontSize:11}}>01 / OCT '25</span>
            </div>
            <div className="pf-placeholder" style={{height:240, marginBottom:24, borderRadius:10}}>EDITORIAL · COVER 16:9</div>
            <h3 style={{fontFamily:'var(--pf-serif)', fontSize:32, lineHeight:1.15, letterSpacing:'-0.01em', marginBottom:12}}>
              How farm forestry quietly reshaped India's pulp supply.
            </h3>
            <p style={{fontSize:15, lineHeight:1.65, color:'var(--pf-ink-2)', marginBottom:20}}>
              A two-decade shift moved fibre sourcing onto agricultural land — with implications for smallholders, mills, and forest cover.
            </p>
            <div style={{marginTop:'auto', display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:18, borderTop:'1px solid var(--pf-line)'}}>
              <span style={{fontSize:13, color:'var(--pf-ink)'}}>Dr. Anjali Menon</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6, color:'var(--pf-forest)', fontSize:13}}>Read essay <Icon.Arrow size={13}/></span>
            </div>
          </article>

          {/* live stat */}
          <article className="pf-tile pf-tile--forest" style={{...fade(1), gridColumn:'span 3', gridRow:'span 1', padding:'24px 24px 22px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <span style={{width:6, height:6, borderRadius:'50%', background:'#C4956A', animation:'pf-blink 2s ease-in-out infinite'}}/>
              <span style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.18em', color:'#C4956A'}}>LIVE · FIBRE MIX</span>
            </div>
            <div>
              <div style={{fontFamily:'var(--pf-serif)', fontSize:52, letterSpacing:'-0.02em', color:'#FAF8F5', lineHeight:1}}><CountUp to={58}/>%</div>
              <div style={{fontSize:13, color:'rgba(250,248,245,0.78)', marginTop:8, lineHeight:1.5}}>of mill intake is now farm-grown fibre — up from 28% in '01.</div>
            </div>
            <MicroChart data={[28,30,34,42,50,55,58]} color="#C4956A" height={32}/>
          </article>

          {/* quote */}
          <article className="pf-tile pf-tile--sage" style={{...fade(2), gridColumn:'span 3', gridRow:'span 1', padding:'24px 24px 22px', display:'flex', flexDirection:'column'}}>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:60, lineHeight:0.6, color:'var(--pf-forest)', marginBottom:4}}>"</div>
            <div style={{fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize:17, lineHeight:1.45, color:'var(--pf-ink)', marginBottom:14}}>
              The paper question is rarely the question we think we're answering.
            </div>
            <div className="pf-mono" style={{fontSize:11, color:'var(--pf-ink-2)', marginTop:'auto'}}>EDITORIAL · BOARD MEMO</div>
          </article>

          {/* myth tile */}
          <article className="pf-tile pf-tile--copper" style={{...fade(3), gridColumn:'span 3', gridRow:'span 2', padding:'28px 24px', display:'flex', flexDirection:'column'}}>
            <span className="pf-pill pf-pill--copper" style={{alignSelf:'flex-start', marginBottom:18}}>MYTH 04</span>
            <div style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.16em', color:'var(--pf-ink-2)', marginBottom:10}}>COMMON BELIEF</div>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:22, lineHeight:1.3, letterSpacing:'-0.005em', marginBottom:24}}>
              "Going paperless is automatically the most sustainable choice."
            </div>
            <div style={{borderTop:'1px dashed rgba(196,149,106,0.45)', paddingTop:18, marginTop:'auto'}}>
              <div style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.16em', color:'#8a6238', marginBottom:8}}>WHAT RESEARCH SUGGESTS</div>
              <div style={{fontSize:13, lineHeight:1.55, color:'var(--pf-ink)'}}>Digital infrastructure carries embedded carbon — the medium alone doesn't decide.</div>
            </div>
            <div className="pf-mono" style={{fontSize:10, color:'var(--pf-ink-3)', marginTop:14}}>SOURCE — IEA, 2023</div>
          </article>

          {/* method */}
          <article className="pf-tile" style={{...fade(4), gridColumn:'span 3', gridRow:'span 1', padding:'24px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span className="pf-pill">METHOD · 9 MIN</span>
              <span className="pf-mono" style={{fontSize:11}}>02</span>
            </div>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:22, lineHeight:1.2, letterSpacing:'-0.005em'}}>Counting cycles: a fibre-level look at recovery rates.</div>
            <div style={{fontSize:12.5, color:'var(--pf-ink-2)'}}>Vivek Sharma · Editorial Desk</div>
          </article>

          {/* dataset */}
          <article className="pf-tile pf-tile--dark" style={{...fade(5), gridColumn:'span 3', gridRow:'span 1', padding:'24px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span className="pf-chip pf-chip--dark" style={{padding:'5px 10px', fontSize:10}}>DATA · CSV</span>
              <span style={{fontFamily:'var(--pf-mono)', fontSize:10, color:'rgba(250,248,245,0.5)'}}>OPEN LICENSE</span>
            </div>
            <div>
              <div style={{fontFamily:'var(--pf-serif)', fontSize:22, lineHeight:1.2, marginBottom:8}}>Fibre source mix — quarterly, mill-grade.</div>
              <div style={{fontSize:12, color:'rgba(250,248,245,0.6)'}}>5,820 rows · last updated 14 Oct 2025</div>
            </div>
            <a href="#" style={{display:'inline-flex', alignItems:'center', gap:8, color:'#C4956A', fontSize:13, fontFamily:'var(--pf-mono)', letterSpacing:'0.06em'}}>↓ DOWNLOAD</a>
          </article>

        </div>
      </div>
    </section>
  );
}

/* ───────────────── kinetic manifesto, dark ───────────────── */
function ManifestoDark() {
  const ref = useR3(null);
  const p = useScrollProgress(ref);
  return (
    <section ref={ref} style={{position:'relative', overflow:'hidden', background:'#0E120E', color:'#FAF8F5', padding:'160px 64px', borderBottom:'1px solid #0E120E'}}>
      <MeshGradient palette={['rgba(45,95,62,0.65)','rgba(196,149,106,0.5)','rgba(58,122,80,0.6)']} opacity={0.55}/>
      <Grain/>

      <div style={{position:'relative', zIndex:2, maxWidth:1400, margin:'0 auto'}}>
        <div className="pf-chip pf-chip--dark" style={{marginBottom:48}}>An editorial position</div>

        <div style={{fontFamily:'var(--pf-serif)', fontSize:120, lineHeight:0.95, letterSpacing:'-0.03em'}}>
          <div style={{display:'flex', alignItems:'baseline', gap:24, flexWrap:'wrap'}}>
            <span style={{transform:`translateX(${(p-0.5)*-60}px)`, transition:'transform .2s linear'}}>Paper</span>
            <span style={{color:'rgba(250,248,245,0.4)'}}>is not</span>
          </div>
          <div style={{display:'flex', alignItems:'baseline', gap:24, flexWrap:'wrap'}}>
            <span style={{textDecoration:'line-through', textDecorationColor:'#C4956A', textDecorationThickness:'6px', color:'rgba(250,248,245,0.45)'}}>the&nbsp;enemy.</span>
            <span style={{fontStyle:'italic', color:'#C4956A', transform:`translateX(${(p-0.5)*60}px)`, transition:'transform .2s linear'}}>It's a system.</span>
          </div>
          <div style={{marginTop:36, fontSize:28, lineHeight:1.45, color:'rgba(250,248,245,0.7)', maxWidth:880, fontFamily:'var(--pf-serif)', fontStyle:'italic', letterSpacing:'-0.005em'}}>
            One built from forests, fields, mills, hands, decisions — and the rare luxury of being recoverable.
          </div>
        </div>

        <div style={{marginTop:80, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:24}}>
          {[
            { k:'01', t:'Evidence over assertion', s:'Every claim cites a public, reproducible source.' },
            { k:'02', t:'Trade-offs over slogans', s:'We resist binary framings of complex material systems.' },
            { k:'03', t:'Method over conclusion', s:'How a number is built matters as much as the number itself.' },
            { k:'04', t:'Open by default', s:'Our datasets, notes, and corrections live in public.' },
          ].map(it => (
            <div key={it.k} style={{borderTop:'1px solid rgba(250,248,245,0.18)', paddingTop:22}}>
              <div style={{fontFamily:'var(--pf-mono)', fontSize:11, letterSpacing:'0.18em', color:'#C4956A', marginBottom:14}}>{it.k} · PRINCIPLE</div>
              <div style={{fontFamily:'var(--pf-serif)', fontSize:22, color:'#FAF8F5', marginBottom:10, letterSpacing:'-0.005em'}}>{it.t}</div>
              <div style={{fontSize:13.5, color:'rgba(250,248,245,0.6)', lineHeight:1.55}}>{it.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── ribbon flow (circularity v3) ───────────────── */
function RibbonFlow() {
  // Sankey-ish stack: 4 sources → 4 uses → 2 fates
  const sources = [
    { id:'farm', label:'Farm forestry', val:58, c:'#3A7A50' },
    { id:'res',  label:'Agri residue',  val:14, c:'#8B9D77' },
    { id:'rec',  label:'Recovered',     val:22, c:'#C4956A' },
    { id:'for',  label:'Reserve forest', val:6, c:'#244D32' },
  ];
  const uses = [
    { id:'pack',  label:'Packaging', val:55, c:'#3A7A50' },
    { id:'print', label:'Printing & writing', val:24, c:'#8B9D77' },
    { id:'hyg',   label:'Hygiene', val:13, c:'#C4956A' },
    { id:'spec',  label:'Specialty', val:8, c:'#244D32' },
  ];

  const [hover, setHover] = useS3(null);
  const [ref, seen] = useReveal({threshold:0.25});

  const H = 520, leftX = 80, rightX = 860, midY = H/2;
  let lyL = 40, lyR = 40;
  const left = sources.map(s => {
    const h = (s.val/100) * (H - 80);
    const o = { ...s, y: lyL, h };
    lyL += h + 8;
    return o;
  });
  const right = uses.map(u => {
    const h = (u.val/100) * (H - 80);
    const o = { ...u, y: lyR, h };
    lyR += h + 8;
    return o;
  });

  return (
    <section ref={ref} style={{padding:'140px 64px', background:'var(--pf-paper-2)', borderBottom:'1px solid var(--pf-line)', position:'relative', overflow:'hidden'}}>
      <div style={{maxWidth:1400, margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, marginBottom:56}}>
          <div>
            <div className="pf-eyebrow" style={{marginBottom:14}}>The circularity primer · interactive</div>
            <h2 style={{fontFamily:'var(--pf-serif)', fontSize:54, lineHeight:1.04, letterSpacing:'-0.02em', maxWidth:560}}>
              Where India's fibre <em style={{color:'var(--pf-forest)'}}>actually comes from</em> — and where it ends up.
            </h2>
          </div>
          <div>
            <p style={{fontSize:17, lineHeight:1.7, color:'var(--pf-ink-2)', maxWidth:480, marginBottom:18}}>
              Hover any band to follow a flow from origin through end-use. Widths are proportional to share of national volume in 2024.
            </p>
            <div style={{display:'flex', alignItems:'center', gap:14, fontFamily:'var(--pf-mono)', fontSize:11, color:'var(--pf-ink-2)', letterSpacing:'0.1em'}}>
              <span>SOURCE → USE</span>
              <span style={{flex:1, height:1, background:'var(--pf-line)'}}/>
              <span>CPCB · IPMA · 2024</span>
            </div>
          </div>
        </div>

        <div style={{background:'#fff', border:'1px solid var(--pf-line)', borderRadius:18, padding:'32px', boxShadow:'var(--pf-shadow-1)'}}>
          <svg viewBox={`0 0 940 ${H}`} width="100%" height={H} style={{display:'block'}}>
            <defs>
              {left.map((s,i)=> right.map((u,j) => (
                <linearGradient key={`g-${s.id}-${u.id}`} id={`rf-${s.id}-${u.id}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor={s.c} stopOpacity="0.7"/>
                  <stop offset="1" stopColor={u.c} stopOpacity="0.6"/>
                </linearGradient>
              )))}
            </defs>

            {/* ribbons */}
            {left.map((s, si) => {
              let sCursor = s.y;
              return right.map((u, ui) => {
                const share = (s.val * u.val) / 100;
                const h = (share/100) * (H - 80);
                let uCursor = u.y + (ui * 0); // place ribbons stacked on right
                // To stack on right per use, compute offset from already-drawn pieces
                const rightOffset = left.slice(0, si).reduce((acc, ss) => acc + (ss.val * u.val) / 100, 0) / 100 * (H - 80);
                const y1 = sCursor;
                const y2 = u.y + rightOffset;
                sCursor += h;
                const path = `M ${leftX+10},${y1} C ${leftX+260},${y1} ${rightX-260},${y2} ${rightX-10},${y2} L ${rightX-10},${y2+h} C ${rightX-260},${y2+h} ${leftX+260},${y1+h} ${leftX+10},${y1+h} Z`;
                const isActive = hover === null || hover === s.id || hover === u.id;
                return (
                  <path key={`p-${s.id}-${u.id}`} d={path}
                    fill={`url(#rf-${s.id}-${u.id})`}
                    opacity={ seen ? (isActive ? 0.85 : 0.18) : 0 }
                    style={{transition:'opacity .35s ease'}}
                  />
                );
              });
            })}

            {/* left bars */}
            {left.map(s => (
              <g key={'L'+s.id} onMouseEnter={()=>setHover(s.id)} onMouseLeave={()=>setHover(null)} style={{cursor:'pointer'}}>
                <rect x={leftX} y={s.y} width={10} height={s.h} fill={s.c}/>
                <text x={leftX-12} y={s.y+s.h/2+4} textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill={hover===s.id?s.c:'#6B6B6B'} letterSpacing="0.04em" fontWeight={hover===s.id?600:400}>{s.label}</text>
                <text x={leftX-12} y={s.y+s.h/2+20} textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#9A958E">{s.val}%</text>
              </g>
            ))}

            {/* right bars */}
            {right.map(u => (
              <g key={'R'+u.id} onMouseEnter={()=>setHover(u.id)} onMouseLeave={()=>setHover(null)} style={{cursor:'pointer'}}>
                <rect x={rightX} y={u.y} width={10} height={u.h} fill={u.c}/>
                <text x={rightX+18} y={u.y+u.h/2+4} fontFamily="'JetBrains Mono', monospace" fontSize="11" fill={hover===u.id?u.c:'#6B6B6B'} letterSpacing="0.04em" fontWeight={hover===u.id?600:400}>{u.label}</text>
                <text x={rightX+18} y={u.y+u.h/2+20} fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#9A958E">{u.val}%</text>
              </g>
            ))}

            {/* labels */}
            <text x={leftX-12} y={22} textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize="10" letterSpacing="0.16em" fill="#9A958E">SOURCE</text>
            <text x={rightX+18} y={22} fontFamily="'JetBrains Mono', monospace" fontSize="10" letterSpacing="0.16em" fill="#9A958E">END USE</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── articles row with parallax preview ───────────────── */
function ArticlesV3() {
  const articles = [
    { c:'POLICY · 14 MIN', t:"How farm forestry quietly reshaped India's pulp supply", a:'Dr. Anjali Menon', n:'01', tone:'#3A7A50' },
    { c:'METHOD · 9 MIN',  t:'Counting cycles: a fibre-level look at recovery rates', a:'Vivek Sharma', n:'02', tone:'#8B9D77' },
    { c:'CONTEXT · 7 MIN', t:"Reading the LCA — what life-cycle studies do and don't resolve", a:'Editorial Desk', n:'03', tone:'#C4956A' },
    { c:'BRIEF · 5 MIN',   t:'Extended Producer Responsibility, three years in', a:'Foundation Desk', n:'04', tone:'#244D32' },
    { c:'WORKING · 18 MIN', t:'Recovery infrastructure in tier-2 Indian cities', a:'V. Sharma · H. Iyer', n:'05', tone:'#3A7A50' },
  ];
  const [hover, setHover] = useS3(null);
  const wrap = useR3(null);
  const p = usePointer(wrap);
  return (
    <section ref={wrap} style={{position:'relative', padding:'120px 64px', borderBottom:'1px solid var(--pf-line)'}}>
      <div style={{maxWidth:1400, margin:'0 auto', position:'relative'}}>
        <div style={{display:'flex', alignItems:'end', justifyContent:'space-between', marginBottom:48, gap:24}}>
          <div>
            <div className="pf-eyebrow" style={{marginBottom:14}}>Knowledge Hub · recent</div>
            <h2 style={{fontFamily:'var(--pf-serif)', fontSize:54, lineHeight:1.04, letterSpacing:'-0.02em', maxWidth:680}}>
              Reading worth your time, on the <em style={{color:'var(--pf-forest)'}}>questions worth asking</em>.
            </h2>
          </div>
          <a href="#" className="pf-link">All publications <Icon.Arrow size={14}/></a>
        </div>

        {/* floating preview tile that follows pointer when an article is hovered */}
        {hover !== null && (
          <div style={{
            position:'absolute', top:p.y*100+'%', left:p.x*100+'%',
            transform:'translate(-50%, -110%) rotate(-3deg)',
            width:280, height:340, pointerEvents:'none', zIndex:5,
            transition:'opacity .2s ease',
          }}>
            <div style={{width:'100%', height:'100%', background:'#fff', border:'1px solid var(--pf-line)', borderRadius:14, boxShadow:'0 30px 60px rgba(36,30,22,0.16)', overflow:'hidden', display:'flex', flexDirection:'column'}}>
              <div className="pf-placeholder" style={{flex:1, borderRadius:0, border:0, background:`linear-gradient(135deg, ${articles[hover].tone}26, ${articles[hover].tone}10)`}}>FIG · COVER</div>
              <div style={{padding:'14px 16px'}}>
                <div className="pf-mono" style={{fontSize:10, color:'var(--pf-ink-2)', letterSpacing:'0.14em', marginBottom:6}}>{articles[hover].c}</div>
                <div style={{fontFamily:'var(--pf-serif)', fontSize:15, lineHeight:1.3}}>{articles[hover].t}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{borderTop:'1px solid var(--pf-line)'}}>
          {articles.map((a,i)=>(
            <a key={a.t} href="#"
               onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}
               style={{
                 display:'grid', gridTemplateColumns:'60px 140px 1fr 220px 80px', gap:24, alignItems:'center',
                 padding:'28px 0', borderBottom:'1px solid var(--pf-line)',
                 position:'relative', cursor:'none',
                 transition:'padding .3s ease, background .3s ease',
                 paddingLeft: hover===i ? 24 : 0,
                 background: hover===i ? 'linear-gradient(90deg, var(--pf-paper-2), transparent 60%)' : 'transparent',
               }}>
              {/* tone bar */}
              <span style={{position:'absolute', left:0, top:0, bottom:0, width:3, background:a.tone, transformOrigin:'top', transform: hover===i ? 'scaleY(1)' : 'scaleY(0)', transition:'transform .35s ease'}}/>
              <span style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'var(--pf-ink-3)', letterSpacing:'0.12em'}}>{a.n}</span>
              <span style={{fontFamily:'var(--pf-mono)', fontSize:11, color:a.tone, letterSpacing:'0.12em'}}>{a.c}</span>
              <span style={{fontFamily:'var(--pf-serif)', fontSize: hover===i ? 32 : 28, lineHeight:1.18, letterSpacing:'-0.01em', transition:'font-size .3s ease'}}>{a.t}</span>
              <span style={{fontSize:13.5, color:'var(--pf-ink-2)'}}>{a.a}</span>
              <span style={{textAlign:'right', color:'var(--pf-forest)', display:'inline-flex', alignItems:'center', justifyContent:'flex-end', gap:6}}>
                <Icon.Arrow size={18}/>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── newsletter v3 ───────────────── */
function NewsletterV3() {
  const [email, setEmail] = useS3('');
  const [sent, setSent] = useS3(false);
  return (
    <section style={{padding:'140px 64px', borderBottom:'1px solid var(--pf-line)', background:'var(--pf-paper)'}}>
      <div style={{maxWidth:1400, margin:'0 auto'}}>
        <div style={{position:'relative', overflow:'hidden', borderRadius:24, background:'var(--pf-ink)', color:'#FAF8F5', padding:'72px 64px'}}>
          <MeshGradient palette={['rgba(45,95,62,0.7)','rgba(196,149,106,0.5)','rgba(58,122,80,0.6)']} opacity={0.6}/>
          <Grain/>
          <div style={{position:'relative', zIndex:2, display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:48, alignItems:'center'}}>
            <div>
              <div className="pf-chip pf-chip--dark" style={{marginBottom:24}}>The Margin · monthly</div>
              <h2 style={{fontFamily:'var(--pf-serif)', fontSize:52, lineHeight:1.05, letterSpacing:'-0.02em', marginBottom:20, maxWidth:540}}>
                One careful letter a month. <em style={{color:'#C4956A'}}>Nothing more.</em>
              </h2>
              <p style={{fontSize:17, lineHeight:1.65, color:'rgba(250,248,245,0.7)', maxWidth:480}}>
                A short reading from our editorial desk: new research notes, a corrected misconception, and one chart worth examining. No campaigns. No urgency.
              </p>
            </div>
            <div style={{background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(10px)', borderRadius:18, padding:28}}>
              <label style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.16em', color:'rgba(250,248,245,0.55)', textTransform:'uppercase', display:'block', marginBottom:14}}>Email address</label>
              <div style={{display:'flex', gap:10, alignItems:'center', background:'rgba(0,0,0,0.25)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:14, padding:'6px 6px 6px 18px', marginBottom:14}}>
                <input type="email" placeholder="you@example.in" value={email} onChange={e=>setEmail(e.target.value)}
                  style={{flex:1, background:'transparent', border:0, outline:'none', color:'#FAF8F5', fontFamily:'var(--pf-sans)', fontSize:15, padding:'10px 0'}}/>
                <PullBtn dark onClick={()=>setSent(true)} style={{padding:'12px 20px'}}>
                  {sent ? <><Icon.Check/> Subscribed</> : <>Subscribe <Icon.Arrow size={13}/></>}
                </PullBtn>
              </div>
              <div style={{fontSize:12, color:'rgba(250,248,245,0.5)', lineHeight:1.55}}>
                One monthly email. Unsubscribe any time. We don't share data — read our <a style={{color:'#C4956A', borderBottom:'1px solid currentColor'}}>data ethics</a> note.
              </div>
              <div style={{marginTop:18, paddingTop:18, borderTop:'1px solid rgba(255,255,255,0.1)', display:'flex', gap:18, fontFamily:'var(--pf-mono)', fontSize:10, color:'rgba(250,248,245,0.5)', letterSpacing:'0.14em'}}>
                <span>4,820 READERS</span>
                <span>· OPEN RATE 64%</span>
                <span>· EST. 2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── homepage v3 root ───────────────── */
function HomepageV3() {
  return (
    <div className="pf" style={{position:'relative'}}>
      <NavV3/>
      <HeroV3/>
      <MarqueeBand/>
      <BentoBoard/>
      <ManifestoDark/>
      <RibbonFlow/>
      <ArticlesV3/>
      <TimelineScrubber/>
      <ImpactStatsV2/>
      <NewsletterV3/>
      <Footer/>
    </div>
  );
}

Object.assign(window, { HomepageV3, NavV3, HeroV3, MeshGradient, Grain, Spotlight, BentoBoard, ManifestoDark, RibbonFlow, ArticlesV3, NewsletterV3, MorphWord, PullBtn });
