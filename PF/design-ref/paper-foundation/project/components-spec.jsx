// components-spec.jsx — design system spec card

function SwatchRow({ items }) {
  return (
    <div style={{display:'grid', gridTemplateColumns:`repeat(${items.length}, 1fr)`, gap:14}}>
      {items.map(s => (
        <div key={s.name}>
          <div style={{height:80, borderRadius:8, background:s.value, border: s.value === '#FAF8F5' || s.value==='#F2EDE7' ? '1px solid var(--pf-line)' : 'none'}}></div>
          <div style={{marginTop:10, fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.1em', color:'var(--pf-ink-2)', textTransform:'uppercase'}}>{s.name}</div>
          <div style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'var(--pf-ink)', marginTop:3}}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function TypeRow({ tag, font, size, weight, sample }) {
  return (
    <div style={{display:'grid', gridTemplateColumns:'80px 1fr 200px', gap:24, alignItems:'baseline', paddingBottom:20, borderBottom:'1px solid var(--pf-line)'}}>
      <div className="pf-mono" style={{fontSize:11, color:'var(--pf-ink-2)'}}>{tag}</div>
      <div style={{fontFamily:font, fontSize:size, fontWeight:weight, lineHeight:1.15, color:'var(--pf-ink)', letterSpacing: tag==='display' || tag==='h1' ? '-0.015em' : 'normal'}}>{sample}</div>
      <div className="pf-mono" style={{fontSize:11, color:'var(--pf-ink-2)'}}>{font.split(',')[0].replace(/['"]/g,'')} · {size}px / {weight}</div>
    </div>
  );
}

function ComponentSpec() {
  return (
    <div className="pf" style={{padding:'56px 56px 72px', background:'var(--pf-paper)'}}>
      <div style={{display:'flex', alignItems:'end', justifyContent:'space-between', marginBottom:48, paddingBottom:32, borderBottom:'1px solid var(--pf-line)'}}>
        <div>
          <div className="pf-eyebrow" style={{marginBottom:18}}>System · v1.0</div>
          <h1 className="pf-h1" style={{fontSize:44, letterSpacing:'-0.015em'}}>The Paper Foundation design language</h1>
        </div>
        <div className="pf-mono" style={{fontSize:11, color:'var(--pf-ink-2)'}}>RELEASE 1.0 · OCT 2025</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, marginBottom:64}}>
        <div>
          <h2 className="pf-h3" style={{marginBottom:24}}>Primary palette</h2>
          <SwatchRow items={[
            {name:'Paper', value:'#FAF8F5'},
            {name:'Recycled', value:'#F2EDE7'},
            {name:'Forest', value:'#2D5F3E'},
            {name:'Forest 2', value:'#3A7A50'},
          ]}/>
        </div>
        <div>
          <h2 className="pf-h3" style={{marginBottom:24}}>Accent & ink</h2>
          <SwatchRow items={[
            {name:'Sage', value:'#8B9D77'},
            {name:'Copper', value:'#C4956A'},
            {name:'Ink', value:'#2C2C2C'},
            {name:'Ink 2', value:'#6B6B6B'},
          ]}/>
        </div>
      </div>

      <div style={{marginBottom:64}}>
        <h2 className="pf-h3" style={{marginBottom:24}}>Typography · Libre Baskerville × DM Sans</h2>
        <div style={{display:'flex', flexDirection:'column', gap:20}}>
          <TypeRow tag="display" font="Libre Baskerville, serif" size={48} weight={400} sample="Understanding paper through evidence."/>
          <TypeRow tag="h1"      font="Libre Baskerville, serif" size={36} weight={400} sample="How farm forestry reshaped pulp supply"/>
          <TypeRow tag="h2"      font="Libre Baskerville, serif" size={28} weight={400} sample="A note on method"/>
          <TypeRow tag="h3"      font="Libre Baskerville, serif" size={22} weight={400} sample="Five findings, briefly stated"/>
          <TypeRow tag="body-lg" font='"DM Sans", sans-serif'     size={17} weight={400} sample="A two-decade shift moved fibre sourcing onto agricultural land — with implications for smallholders and forest cover."/>
          <TypeRow tag="body"    font='"DM Sans", sans-serif'     size={15} weight={400} sample="The transition was not the result of any single policy. It emerged from a slow alignment of demand and incentive."/>
          <TypeRow tag="mono"    font='"JetBrains Mono", monospace' size={12} weight={400} sample="CPCB · 2024 · CITED 142×"/>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, marginBottom:64}}>
        <div>
          <h2 className="pf-h3" style={{marginBottom:24}}>Buttons</h2>
          <div style={{display:'flex', flexDirection:'column', gap:16}}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <button className="pf-btn pf-btn--primary">Primary <Icon.Arrow size={14}/></button>
              <button className="pf-btn pf-btn--secondary">Secondary</button>
              <button className="pf-btn pf-btn--ghost">Ghost</button>
            </div>
            <div style={{padding:'24px', background:'var(--pf-forest-3)', borderRadius:8}}>
              <button className="pf-btn pf-btn--dark">On dark</button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="pf-h3" style={{marginBottom:24}}>Pills & chips</h2>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            <span className="pf-pill">DEFAULT</span>
            <span className="pf-pill pf-pill--solid">SOLID</span>
            <span className="pf-pill pf-pill--sage">SAGE</span>
            <span className="pf-pill pf-pill--copper">COPPER</span>
          </div>
          <div style={{marginTop:32}}>
            <h2 className="pf-h3" style={{marginBottom:18}}>Citation tag</h2>
            <div style={{fontSize:14, color:'var(--pf-ink-2)', maxWidth:380}}>
              Inline citations appear as small monospace badges<CiteTag n="1" source="In-context · monospace tag"/> attached
              to the relevant clause. Hover surfaces the source.
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="pf-h3" style={{marginBottom:24}}>Surfaces, borders & shadow</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
          <div className="pf-card" style={{padding:24, height:140, display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
            <div className="pf-mono" style={{fontSize:10}}>SHADOW-1</div>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:16, marginTop:6}}>Default card</div>
          </div>
          <div className="pf-card" style={{padding:24, height:140, boxShadow:'var(--pf-shadow-2)', display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
            <div className="pf-mono" style={{fontSize:10}}>SHADOW-2</div>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:16, marginTop:6}}>Elevated</div>
          </div>
          <div className="pf-card" style={{padding:24, height:140, boxShadow:'var(--pf-shadow-3)', display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
            <div className="pf-mono" style={{fontSize:10}}>SHADOW-3</div>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:16, marginTop:6}}>Floating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mobile homepage screen ---------- */
function MobileHome() {
  return (
    <div className="pf" style={{height:'100%', overflow:'auto', background:'var(--pf-paper)'}}>
      <div style={{padding:'14px 20px', borderBottom:'1px solid var(--pf-line)', display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(250,248,245,0.95)', position:'sticky', top:0, zIndex:10, backdropFilter:'blur(8px)'}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <svg width="22" height="22" viewBox="0 0 28 28"><rect x="3" y="6" width="18" height="22" fill="#FAF8F5" stroke="#2D5F3E" strokeWidth="1.4"/><rect x="7" y="2" width="18" height="22" fill="#FAF8F5" stroke="#2D5F3E" strokeWidth="1.4"/></svg>
          <div style={{fontFamily:'var(--pf-serif)', fontSize:14}}>Paper Foundation</div>
        </div>
        <button style={{background:'transparent', border:0, color:'var(--pf-ink)'}}><Icon.Menu/></button>
      </div>

      <div style={{background:'var(--pf-forest-3)', color:'#F2EDE7', padding:'8px 20px', fontSize:11, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{fontFamily:'var(--pf-mono)', letterSpacing:'0.12em', color:'#C4956A'}}>NEW REPORT</span>
        <span style={{opacity:0.85}}>Circularity Index ’25 →</span>
      </div>

      <div style={{padding:'40px 24px 28px'}}>
        <div className="pf-eyebrow" style={{marginBottom:16}}>A public knowledge platform</div>
        <h1 style={{fontFamily:'var(--pf-serif)', fontSize:34, lineHeight:1.1, letterSpacing:'-0.015em', marginBottom:20}}>
          Understanding paper through evidence, <em style={{color:'var(--pf-forest)', fontStyle:'italic'}}>not assumption.</em>
        </h1>
        <p style={{fontSize:15, lineHeight:1.65, color:'var(--pf-ink-2)', marginBottom:24}}>
          A research-backed view of how paper fits into responsible, circular systems.
        </p>
        <div style={{display:'flex', gap:10, flexDirection:'column'}}>
          <button className="pf-btn pf-btn--primary" style={{justifyContent:'center'}}>Explore the Facts <Icon.Arrow size={14}/></button>
          <button className="pf-btn pf-btn--secondary" style={{justifyContent:'center'}}>Read the Evidence</button>
        </div>
      </div>

      <div style={{padding:'0 24px 40px'}}>
        <PaperSystemsArt width={320} height={260}/>
      </div>

      <div style={{padding:'40px 24px', background:'var(--pf-paper-2)', borderTop:'1px solid var(--pf-line)'}}>
        <div className="pf-eyebrow" style={{marginBottom:12}}>Myth · Fact</div>
        <h2 style={{fontFamily:'var(--pf-serif)', fontSize:22, lineHeight:1.25, marginBottom:18}}>What if the common belief isn’t complete?</h2>
        <div className="pf-card" style={{padding:24, background:'#fff'}}>
          <span className="pf-pill pf-pill--copper">Myth</span>
          <div style={{fontFamily:'var(--pf-serif)', fontSize:18, lineHeight:1.3, margin:'14px 0 18px'}}>“The paper industry drives deforestation in India.”</div>
          <button style={{width:'100%', padding:14, border:'1px dashed var(--pf-line-2)', borderRadius:6, background:'transparent', color:'var(--pf-forest)', fontSize:13, display:'flex', justifyContent:'center', alignItems:'center', gap:8}}>
            Reveal evidence <Icon.Arrow size={13}/>
          </button>
        </div>
      </div>

      <div style={{padding:'40px 24px'}}>
        <div className="pf-eyebrow" style={{marginBottom:12}}>Knowledge Hub · Recent</div>
        <h2 style={{fontFamily:'var(--pf-serif)', fontSize:22, lineHeight:1.25, marginBottom:20}}>Reading worth your time.</h2>
        {[
          {c:'POLICY', t:'How farm forestry quietly reshaped India’s pulp supply', r:'14 min'},
          {c:'METHOD', t:'Counting cycles: a fibre-level look at recovery rates', r:'9 min'},
        ].map(a => (
          <div key={a.t} className="pf-card" style={{padding:20, marginBottom:14}}>
            <div className="pf-placeholder" style={{height:140, marginBottom:14}}>FIGURE · 16:9</div>
            <div style={{display:'flex', gap:10, marginBottom:10}}>
              <span className="pf-pill">{a.c}</span>
              <span className="pf-mono" style={{fontSize:11}}>{a.r}</span>
            </div>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:18, lineHeight:1.25, letterSpacing:'-0.005em'}}>{a.t}</div>
          </div>
        ))}
      </div>

      <div style={{padding:'40px 24px', background:'var(--pf-forest-3)', color:'#F2EDE7'}}>
        <div className="pf-eyebrow" style={{color:'#C4956A', marginBottom:12}}>The Margin · monthly</div>
        <div style={{fontFamily:'var(--pf-serif)', fontSize:22, lineHeight:1.25, marginBottom:14}}>One careful letter a month.</div>
        <input className="pf-input" placeholder="you@example.in" style={{marginBottom:10}}/>
        <button className="pf-btn pf-btn--dark" style={{justifyContent:'center', width:'100%'}}>Subscribe</button>
      </div>
    </div>
  );
}

Object.assign(window, { ComponentSpec, MobileHome });
