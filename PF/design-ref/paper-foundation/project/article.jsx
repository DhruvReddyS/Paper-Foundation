// article.jsx — Knowledge Hub article page

function ReadingProgress() {
  const [p, setP] = useState(28);
  return (
    <div style={{position:'sticky', top:0, height:3, background:'transparent', zIndex:40}}>
      <div style={{height:'100%', width:p+'%', background:'var(--pf-forest)', transition:'width .3s ease'}}></div>
    </div>
  );
}

function ArticleTOC() {
  const items = [
    { id:'intro',     label:'Introduction', active:true },
    { id:'method',    label:'A note on method' },
    { id:'findings',  label:'Five findings' },
    { id:'state',     label:'State-level variation' },
    { id:'limits',    label:'What this study cannot tell us' },
    { id:'further',   label:'Further reading' },
  ];
  return (
    <aside style={{position:'sticky', top:96, alignSelf:'start'}}>
      <div className="pf-eyebrow" style={{marginBottom:18}}>In this article</div>
      <nav style={{borderLeft:'1px solid var(--pf-line)', paddingLeft:16}}>
        {items.map(it => (
          <a key={it.id} href={'#'+it.id} style={{
            display:'block', padding:'7px 0',
            fontSize:13, lineHeight:1.5,
            color: it.active ? 'var(--pf-forest)' : 'var(--pf-ink-2)',
            fontWeight: it.active ? 500 : 400,
            position:'relative',
          }}>
            {it.active && <span style={{position:'absolute', left:-17, top:0, bottom:0, width:1, background:'var(--pf-forest)'}}></span>}
            {it.label}
          </a>
        ))}
      </nav>

      <div style={{marginTop:36, paddingTop:24, borderTop:'1px solid var(--pf-line)'}}>
        <div className="pf-eyebrow" style={{marginBottom:14}}>Share & cite</div>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {['Copy citation', 'Download PDF', 'Email link'].map(x => (
            <button key={x} style={{
              background:'transparent', border:'1px solid var(--pf-line)',
              padding:'9px 12px', borderRadius:6, fontSize:12,
              color:'var(--pf-ink)', textAlign:'left', cursor:'pointer',
              fontFamily:'var(--pf-sans)',
            }}>{x}</button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function ArticleBody() {
  return (
    <article style={{maxWidth:680, margin:'0 auto', padding:'56px 0 80px'}}>
      <div style={{marginBottom:32, display:'flex', gap:14, alignItems:'center', flexWrap:'wrap'}}>
        <span className="pf-pill pf-pill--solid">Research note</span>
        <span className="pf-mono">METHOD · 14 MIN READ</span>
        <span className="pf-mono" style={{color:'var(--pf-ink-3)'}}>· OCT 12, 2025</span>
      </div>

      <h1 className="pf-h1" style={{fontSize:46, lineHeight:1.1, marginBottom:24, letterSpacing:'-0.015em'}}>
        How farm forestry quietly reshaped India’s pulp supply
      </h1>

      <p style={{fontFamily:'var(--pf-serif)', fontSize:20, lineHeight:1.55, color:'var(--pf-ink-2)', fontStyle:'italic', marginBottom:40, maxWidth:600}}>
        A two-decade shift moved fibre sourcing onto agricultural land — with implications for
        smallholders, mills, and forest cover. We revisit the data, the assumptions, and what
        the literature has yet to settle.
      </p>

      <div style={{display:'flex', alignItems:'center', gap:20, paddingBottom:32, marginBottom:48, borderBottom:'1px solid var(--pf-line)'}}>
        <div style={{width:48, height:48, borderRadius:'50%', background:'var(--pf-paper-3)', border:'1px solid var(--pf-line)',
                     display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--pf-serif)', fontSize:17, color:'var(--pf-forest)'}}>AM</div>
        <div>
          <div style={{fontSize:14, color:'var(--pf-ink)'}}>Dr. Anjali Menon</div>
          <div className="pf-mono" style={{fontSize:11}}>SENIOR RESEARCH FELLOW · WITH HARIT IYER</div>
        </div>
        <div style={{marginLeft:'auto', display:'flex', gap:24, fontSize:13, color:'var(--pf-ink-2)'}}>
          <div><span style={{color:'var(--pf-ink)'}}>3,142</span> read</div>
          <div><span style={{color:'var(--pf-ink)'}}>27</span> citations</div>
        </div>
      </div>

      <p className="pf-body-lg" style={{marginBottom:24}} id="intro">
        For most of the twentieth century, the pulp and paper industry was treated as a forest-products
        industry. <CiteTag n="1" source="FAO Forest Products Yearbook, 1998"/> Today, that frame fits
        India poorly. Mills draw the bulk of their fibre not from forests but from <em>farm forestry</em>:
        eucalyptus, casuarina, and subabul planted on agricultural land, often on holdings of less than
        two hectares.
      </p>

      <p className="pf-body-lg" style={{marginBottom:40}}>
        The transition was not the result of any single policy. It emerged from a slow alignment of
        mill demand, contract-buying schemes, and farmer interest in tree crops that offered predictable
        cash returns at five-to-seven-year cycles. <CiteTag n="2" source="ICFRE, Forest Products of India, 2021"/>
        The consequence is a paper system whose ecological footprint now sits primarily on farmland — a
        shift that mainstream reporting on Indian forests has been slow to register.
      </p>

      <h2 className="pf-h2" id="method" style={{marginTop:64, marginBottom:24, fontSize:30}}>A note on method</h2>
      <p className="pf-body-lg" style={{marginBottom:24}}>
        This brief draws on three datasets: the Indian Council of Forestry Research and Education’s 2021
        survey of agroforestry sourcing<CiteTag n="3" source="ICFRE-AS-21, dataset"/>, mill-yard intake
        records voluntarily released by 14 large mills under the IPMA transparency window
        <CiteTag n="4" source="IPMA, Member transparency window, 2023–24"/>, and our own field
        interviews across four states between January and May 2025.
      </p>

      <div style={{
        margin:'48px -24px',
        padding:'40px 56px',
        background:'var(--pf-paper-2)',
        borderRadius:12,
        borderLeft:'3px solid var(--pf-copper)',
      }}>
        <Icon.Quote size={28}/>
        <div style={{fontFamily:'var(--pf-serif)', fontSize:22, lineHeight:1.45, color:'var(--pf-ink)', margin:'14px 0 18px', letterSpacing:'-0.005em'}}>
          The interesting story is not whether paper consumes trees — it does — but whose trees, planted
          where, and under what arrangements with the people who grow them.
        </div>
        <div className="pf-mono" style={{fontSize:11}}>FROM THE FIELD NOTES · KHANNA DISTRICT, PUNJAB</div>
      </div>

      <h2 className="pf-h2" id="findings" style={{marginTop:64, marginBottom:24, fontSize:30}}>Five findings</h2>

      <ol style={{paddingLeft:0, listStyle:'none', display:'flex', flexDirection:'column', gap:28, margin:'0 0 32px'}}>
        {[
          { t: 'Over 90% of mill-grade fibre now originates outside reserve forests.', s:'Up from roughly 62% in 2001. The shift accelerated after 2010.' },
          { t: 'Contract-buying volumes grew fastest among mills above 100,000 TPA.', s:'Smaller mills remained more dependent on agricultural residue and recovered paper.' },
          { t: 'Average rotation periods shortened by 14 months between 2015 and 2024.', s:'Driven by clonal eucalyptus varieties and changes in plantation density.' },
          { t: 'Smallholder participation increased, but yield gaps widened by region.', s:'Punjab and Andhra Pradesh outpaced Odisha and Chhattisgarh on per-hectare output.' },
          { t: 'Forest cover trends are decoupling from pulp demand for the first time.', s:'A claim we examine cautiously in the closing section.' },
        ].map((f, i) => (
          <li key={i} style={{display:'grid', gridTemplateColumns:'56px 1fr', gap:24, alignItems:'start'}}>
            <div className="pf-mono" style={{fontSize:13, color:'var(--pf-forest)', borderTop:'1px solid var(--pf-forest)', paddingTop:8, letterSpacing:'0.08em'}}>0{i+1}</div>
            <div>
              <div style={{fontFamily:'var(--pf-serif)', fontSize:19, lineHeight:1.4, color:'var(--pf-ink)', marginBottom:8, letterSpacing:'-0.005em'}}>{f.t}</div>
              <div style={{fontSize:14, color:'var(--pf-ink-2)', lineHeight:1.6}}>{f.s}</div>
            </div>
          </li>
        ))}
      </ol>

      {/* Inline figure */}
      <figure style={{margin:'48px 0'}}>
        <div className="pf-card" style={{padding:32, background:'#fff'}}>
          <div className="pf-mono" style={{fontSize:11, marginBottom:18}}>FIG. 02 · SHARE OF FIBRE ORIGIN, 2001–2024</div>
          <PulpSourceChart/>
        </div>
        <figcaption style={{marginTop:14, fontSize:13, color:'var(--pf-ink-2)', textAlign:'center', fontStyle:'italic', fontFamily:'var(--pf-serif)'}}>
          Share of mill-grade pulp fibre by source. Indexed to 100% per year. Source: ICFRE-AS-21, author calculations.
        </figcaption>
      </figure>

      <h2 className="pf-h2" id="limits" style={{marginTop:64, marginBottom:24, fontSize:30}}>What this study cannot tell us</h2>
      <p className="pf-body-lg" style={{marginBottom:24}}>
        Mill-yard records describe arrivals, not the upstream land-use change those arrivals imply.
        Satellite-derived land cover layers exist but resolve poorly below five-hectare plot sizes —
        precisely the scale of most farm-forestry holdings.<CiteTag n="5" source="ISRO, NRSC LULC layer documentation"/>
        Conclusions about net forest impact therefore require care: <em>fewer logs from reserves</em>
        is a different empirical claim than <em>more trees on the landscape</em>, even when the two
        often co-occur.
      </p>

      {/* Related reading */}
      <div style={{marginTop:64, paddingTop:48, borderTop:'1px solid var(--pf-line)'}}>
        <div className="pf-eyebrow" style={{marginBottom:24}}>Continue reading</div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
          {[
            { t:'Counting cycles: a fibre-level look at recovery rates', m:'9 min · Method' },
            { t:'What the LCA literature settles and what it doesn’t', m:'7 min · Context' },
          ].map(r => (
            <a key={r.t} className="pf-card" style={{padding:24, display:'block'}}>
              <div className="pf-mono" style={{fontSize:11, marginBottom:10}}>{r.m}</div>
              <div style={{fontFamily:'var(--pf-serif)', fontSize:17, lineHeight:1.35, color:'var(--pf-ink)'}}>{r.t}</div>
            </a>
          ))}
        </div>
      </div>

      {/* References */}
      <div style={{marginTop:64, paddingTop:32, borderTop:'1px solid var(--pf-line)'}}>
        <div className="pf-eyebrow" style={{marginBottom:18}}>References</div>
        <ol style={{paddingLeft:18, margin:0, display:'flex', flexDirection:'column', gap:10, fontFamily:'var(--pf-mono)', fontSize:12, color:'var(--pf-ink-2)', lineHeight:1.6}}>
          <li>FAO. <em>Forest Products Yearbook</em>, Rome, 1998.</li>
          <li>ICFRE. <em>Forest Products of India: A Statistical Profile</em>, Dehradun, 2021.</li>
          <li>ICFRE-AS-21 agroforestry sourcing dataset, public extract.</li>
          <li>Indian Paper Manufacturers Association. Member transparency window, 2023–24.</li>
          <li>ISRO / NRSC. LULC layer technical documentation, v3.2.</li>
        </ol>
      </div>
    </article>
  );
}

/* Simple SVG stacked-area chart (purely illustrative, hand-tuned values) */
function PulpSourceChart() {
  const years = [2001, 2005, 2010, 2015, 2020, 2024];
  // each row sums to 100
  const data = [
    { y:2001, forest:38, farm:28, residue:18, recycled:16 },
    { y:2005, forest:30, farm:34, residue:18, recycled:18 },
    { y:2010, forest:20, farm:42, residue:18, recycled:20 },
    { y:2015, forest:14, farm:50, residue:16, recycled:20 },
    { y:2020, forest: 9, farm:55, residue:15, recycled:21 },
    { y:2024, forest: 6, farm:58, residue:14, recycled:22 },
  ];
  const W=620, H=240, P={l:48, r:18, t:14, b:32};
  const innerW = W-P.l-P.r, innerH = H-P.t-P.b;
  const xs = data.map((_,i)=> P.l + (i/(data.length-1))*innerW);
  const layers = ['forest','farm','residue','recycled'];
  const colors = { forest:'#244D32', farm:'#3A7A50', residue:'#8B9D77', recycled:'#C4956A' };
  const labels = { forest:'Reserve forest', farm:'Farm forestry', residue:'Ag. residue', recycled:'Recovered paper' };
  // build stacked y positions (top-down)
  const ys = data.map(d => {
    let acc = 0;
    const out = {};
    layers.forEach(k => { acc += d[k]; out[k] = P.t + innerH * (1 - acc/100); });
    return out;
  });
  const top = (layerIdx) => data.map((_, i) => `${xs[i]},${ys[i][layers[layerIdx]]}`).join(' ');
  const bottom = (layerIdx) => {
    if (layerIdx === 0) return data.map((_, i) => `${xs[i]},${P.t+innerH}`).reverse().join(' ');
    return data.map((_, i) => `${xs[i]},${ys[i][layers[layerIdx-1]]}`).reverse().join(' ');
  };

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{display:'block'}}>
        {/* gridlines */}
        {[0,25,50,75,100].map(g => (
          <g key={g}>
            <line x1={P.l} x2={W-P.r} y1={P.t+innerH*(1-g/100)} y2={P.t+innerH*(1-g/100)} stroke="#E0DAD2" strokeWidth="0.6"/>
            <text x={P.l-10} y={P.t+innerH*(1-g/100)+3} fontSize="10" fontFamily="'JetBrains Mono',monospace" fill="#9A958E" textAnchor="end">{g}%</text>
          </g>
        ))}
        {layers.map((k, i) => (
          <polygon key={k} points={`${top(i)} ${bottom(i)}`} fill={colors[k]} fillOpacity={i===0?0.85:i===1?0.95:0.85} stroke="#fff" strokeWidth="0.6"/>
        ))}
        {/* x labels */}
        {years.map((yr, i) => (
          <text key={yr} x={xs[i]} y={H-10} fontSize="10" fontFamily="'JetBrains Mono',monospace" fill="#6B6B6B" textAnchor="middle">{yr}</text>
        ))}
      </svg>
      <div style={{display:'flex', gap:20, flexWrap:'wrap', marginTop:18, fontSize:12, color:'var(--pf-ink-2)'}}>
        {layers.map(k => (
          <div key={k} style={{display:'flex', alignItems:'center', gap:8}}>
            <span style={{width:12, height:12, background:colors[k], borderRadius:2}}></span>
            <span>{labels[k]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticlePage() {
  return (
    <div className="pf" style={{background:'var(--pf-paper)'}}>
      <ReadingProgress/>
      <PFNavbar active="research"/>
      <div style={{maxWidth:1200, margin:'0 auto', padding:'48px 64px'}}>
        <div style={{display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--pf-ink-2)', marginBottom:32}}>
          <a style={{color:'var(--pf-ink-2)'}}>Knowledge Hub</a>
          <Icon.Chevron dir="right" size={12}/>
          <a style={{color:'var(--pf-ink-2)'}}>Policy</a>
          <Icon.Chevron dir="right" size={12}/>
          <span style={{color:'var(--pf-ink)'}}>Farm forestry & pulp supply</span>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'220px 1fr 220px', gap:48, alignItems:'start'}}>
          <ArticleTOC/>
          <ArticleBody/>
          <aside style={{position:'sticky', top:96, alignSelf:'start'}}>
            <div className="pf-card" style={{padding:24}}>
              <div className="pf-mono" style={{fontSize:11, marginBottom:14}}>EDITORIAL DESK</div>
              <div style={{fontFamily:'var(--pf-serif)', fontSize:17, lineHeight:1.35, marginBottom:14}}>Was this useful?</div>
              <div style={{fontSize:13, color:'var(--pf-ink-2)', lineHeight:1.55, marginBottom:20}}>We track signal carefully. A short tap helps prioritise future research.</div>
              <div style={{display:'flex', gap:8}}>
                <button className="pf-btn pf-btn--secondary" style={{flex:1, padding:'10px 0', justifyContent:'center', fontSize:13}}>Yes</button>
                <button className="pf-btn pf-btn--secondary" style={{flex:1, padding:'10px 0', justifyContent:'center', fontSize:13}}>Partly</button>
              </div>
            </div>

            <div style={{marginTop:24}} className="pf-card" >
              <div style={{padding:24}}>
                <div className="pf-mono" style={{fontSize:11, marginBottom:14}}>NEWSLETTER</div>
                <div style={{fontFamily:'var(--pf-serif)', fontSize:17, lineHeight:1.35, marginBottom:14}}>One letter a month.</div>
                <button className="pf-btn pf-btn--primary" style={{width:'100%', justifyContent:'center', fontSize:13}}>Subscribe</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

Object.assign(window, { ArticlePage });
