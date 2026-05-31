// myths.jsx — Myths vs Facts page

function MythCard({ myth, fact, source, category, initialRevealed = false }) {
  const [revealed, setRevealed] = useState(initialRevealed);
  return (
    <div className="pf-card" style={{padding:0, background:'#fff', display:'flex', flexDirection:'column', overflow:'hidden'}}>
      <div style={{padding:'24px 28px', borderBottom:'1px solid var(--pf-line)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <span className="pf-pill pf-pill--copper">{category}</span>
        <span className="pf-mono" style={{fontSize:11}}>MYTH #{Math.floor(Math.random()*100).toString().padStart(2,'0')}</span>
      </div>

      <div style={{padding:'28px 28px 8px'}}>
        <div className="pf-eyebrow" style={{color:'var(--pf-copper)', marginBottom:14}}>Common belief</div>
        <div style={{fontFamily:'var(--pf-serif)', fontSize:21, lineHeight:1.35, color:'var(--pf-ink)', letterSpacing:'-0.005em'}}>
          “{myth}”
        </div>
      </div>

      <div style={{margin:'0 28px', height:1, background:'var(--pf-line)', marginTop:24}}></div>

      <div style={{padding:'24px 28px 28px', flex:1, display:'flex', flexDirection:'column'}}>
        {revealed ? (
          <div className="pf-fade-up" style={{flex:1}}>
            <div className="pf-eyebrow" style={{color:'var(--pf-forest)', marginBottom:14}}>What research suggests</div>
            <div style={{fontSize:15, lineHeight:1.65, color:'var(--pf-ink)', marginBottom:18}}>{fact}</div>
            <div style={{paddingTop:14, borderTop:'1px solid var(--pf-line)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <span className="pf-mono" style={{fontSize:11}}>{source}</span>
              <button onClick={()=>setRevealed(false)} style={{
                background:'transparent', border:0, fontSize:12, color:'var(--pf-ink-2)',
                cursor:'pointer', textDecoration:'underline', textUnderlineOffset:3, fontFamily:'var(--pf-sans)',
              }}>Hide evidence</button>
            </div>
          </div>
        ) : (
          <button onClick={()=>setRevealed(true)} style={{
            flex:1,
            display:'flex', alignItems:'center', justifyContent:'space-between', gap:12,
            background:'var(--pf-paper)', border:'1px dashed var(--pf-line-2)', borderRadius:8,
            padding:'18px 20px', cursor:'pointer', minHeight:96,
            fontFamily:'var(--pf-sans)', fontSize:13, color:'var(--pf-forest)',
          }}>
            <span style={{textAlign:'left'}}>Reveal what research says</span>
            <Icon.Arrow size={15}/>
          </button>
        )}
      </div>
    </div>
  );
}

function FaqAccordion() {
  const items = [
    { q: 'Is paper a major source of deforestation in India?',
      a: 'No, current evidence suggests it is not. Over 90% of fibre used by Indian mills now originates from farm-grown wood, agricultural residue, and recovered paper. Reserve-forest extraction has fallen continuously since the early 2000s.' },
    { q: 'Should I go paperless to lower my footprint?',
      a: 'The answer is conditional. Frequency of use, device replacement cycles, and the energy mix of supporting data infrastructure all change the calculation. For low-frequency reading, paper can have a lower footprint than equivalent digital use.' },
    { q: 'How many times can paper actually be recycled?',
      a: 'Fibres typically tolerate five to seven recovery cycles before they become too short for new paper production. After this, they are still usable in tissue, packaging fillers, or returned to soil as compost.' },
    { q: 'Is the “save trees, save paper” framing accurate?',
      a: 'It is over-simplified. Most pulpwood in India is purpose-grown for harvest. Reducing demand can in some cases reduce farmer incentive to maintain tree cover — the relationship is not one-to-one.' },
    { q: 'How transparent is the Indian paper industry on sourcing?',
      a: 'Transparency has improved through IPMA voluntary disclosures, but third-party verified chain-of-custody coverage remains uneven across mills. Our 2024 audit covers what is and isn’t public.' },
  ];
  const [open, setOpen] = useState(0);
  return (
    <div style={{borderTop:'1px solid var(--pf-line)'}}>
      {items.map((it, i) => (
        <div key={i} style={{borderBottom:'1px solid var(--pf-line)'}}>
          <button onClick={()=>setOpen(open===i?-1:i)} style={{
            width:'100%', padding:'24px 0', background:'transparent', border:0, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, textAlign:'left',
          }}>
            <div style={{display:'flex', gap:24, alignItems:'baseline', flex:1, minWidth:0}}>
              <span className="pf-mono" style={{fontSize:11, color:'var(--pf-ink-3)', flex:'0 0 auto'}}>Q.{(i+1).toString().padStart(2,'0')}</span>
              <span style={{fontFamily:'var(--pf-serif)', fontSize:19, lineHeight:1.35, color:'var(--pf-ink)', letterSpacing:'-0.005em'}}>{it.q}</span>
            </div>
            <span style={{
              width:32, height:32, borderRadius:'50%', border:'1px solid var(--pf-line)',
              display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 auto',
              color:'var(--pf-ink-2)',
              transform: open===i ? 'rotate(45deg)' : 'none', transition:'transform .25s ease',
            }}><Icon.Plus size={14}/></span>
          </button>
          {open===i && (
            <div className="pf-fade-up" style={{paddingBottom:28, paddingLeft:60, maxWidth:760}}>
              <p style={{fontSize:15.5, lineHeight:1.7, color:'var(--pf-ink-2)', margin:0}}>{it.a}</p>
              <a href="#" className="pf-link" style={{marginTop:18, fontSize:13}}>Read the underlying note <Icon.Arrow size={13}/></a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MythsPage() {
  const cats = ['All', 'Recycling', 'Forests', 'Digital vs paper', 'Sourcing', 'Health'];
  const [activeCat, setActiveCat] = useState('All');

  const myths = [
    { c:'Forests',   m:'The paper industry causes most deforestation in India.', f:'Over 90% of fibre used by Indian mills now comes from farm-grown wood and agricultural residue. Reserve-forest extraction has declined steadily since 2001.', s:'ICFRE, 2024' },
    { c:'Recycling', m:'Recycled paper is always better than virgin paper.', f:'Each has trade-offs. Recycled fibre saves trees but uses energy and degrades after 5–7 cycles. A balanced circular system relies on both.', s:'FAO Forest Products, 2023' },
    { c:'Digital vs paper', m:'Going paperless is automatically more sustainable.', f:'Digital reading carries embedded carbon in devices, servers, and grids. For infrequent use, paper can be the lower-footprint medium.', s:'IEA Digitalisation, 2023' },
    { c:'Sourcing',  m:'India imports most of its pulpwood.', f:'India is roughly 85% self-sufficient in fibre, sourced primarily from farm forestry concentrated in Andhra Pradesh, Punjab and Gujarat.', s:'IPMA Annual, 2024' },
    { c:'Health',    m:'Newsprint and packaging paper contain harmful chemicals.', f:'Food-contact paper in India is regulated under FSSAI norms. Recycled paper used for food packaging undergoes mandated screening for contaminant migration.', s:'FSSAI Reg. 2.6.2' },
    { c:'Recycling', m:'All paper put in recycling bins is actually recycled.', f:'Recovery rates depend on contamination, fibre length and local infrastructure. Roughly 72% of recoverable paper in India re-enters the system; the rest is lost to mixed waste.', s:'CPCB, 2024' },
  ];

  const filtered = activeCat === 'All' ? myths : myths.filter(m => m.c === activeCat);

  return (
    <div className="pf">
      <PFNavbar active="myths"/>
      <section style={{borderBottom:'1px solid var(--pf-line)'}}>
        <div style={{maxWidth:1200, margin:'0 auto', padding:'72px 64px 56px', display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:80, alignItems:'end'}}>
          <div>
            <div className="pf-eyebrow" style={{marginBottom:18}}>Myth · Fact · Source</div>
            <h1 className="pf-h1" style={{maxWidth:600, marginBottom:24, fontSize:48, letterSpacing:'-0.015em'}}>
              The conversation about paper is full of half-truths. We sit with them carefully.
            </h1>
            <p className="pf-body-lg" style={{color:'var(--pf-ink-2)', maxWidth:540}}>
              Forty-eight commonly held beliefs about paper, sustainability, and the Indian industry —
              each examined against current peer-reviewed research and sourced for inspection.
            </p>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:14, fontSize:13, color:'var(--pf-ink-2)'}}>
            <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid var(--pf-line)', paddingBottom:12}}>
              <span className="pf-mono">PAIRS PUBLISHED</span><span style={{fontFamily:'var(--pf-serif)', fontSize:18, color:'var(--pf-ink)'}}>48</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid var(--pf-line)', paddingBottom:12}}>
              <span className="pf-mono">PEER REVIEWERS</span><span style={{fontFamily:'var(--pf-serif)', fontSize:18, color:'var(--pf-ink)'}}>11</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid var(--pf-line)', paddingBottom:12}}>
              <span className="pf-mono">LAST UPDATED</span><span style={{fontFamily:'var(--pf-serif)', fontSize:18, color:'var(--pf-ink)'}}>Oct 2025</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{padding:'40px 64px 32px', borderBottom:'1px solid var(--pf-line)', position:'sticky', top:0, background:'rgba(250,248,245,0.95)', backdropFilter:'blur(8px)', zIndex:10}}>
        <div style={{maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, flexWrap:'wrap'}}>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {cats.map(c => (
              <button key={c} onClick={()=>setActiveCat(c)} style={{
                padding:'8px 16px',
                borderRadius:999,
                border: c===activeCat ? '1px solid var(--pf-forest)' : '1px solid var(--pf-line)',
                background: c===activeCat ? 'var(--pf-forest)' : 'transparent',
                color: c===activeCat ? '#FAF8F5' : 'var(--pf-ink)',
                fontSize:13, cursor:'pointer', fontFamily:'var(--pf-sans)',
                transition:'all .18s ease',
              }}>{c}</button>
            ))}
          </div>
          <div style={{display:'flex', gap:14, alignItems:'center'}}>
            <div style={{position:'relative'}}>
              <span style={{position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--pf-ink-2)'}}><Icon.Search size={14}/></span>
              <input className="pf-input" placeholder="Search myths" style={{paddingLeft:38, width:240, fontSize:13}}/>
            </div>
            <span className="pf-mono" style={{fontSize:11}}>{filtered.length} OF 48</span>
          </div>
        </div>
      </section>

      <section style={{padding:'48px 64px 80px', borderBottom:'1px solid var(--pf-line)'}}>
        <div style={{maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
          {filtered.map((x, i) => (
            <MythCard key={x.m} myth={x.m} fact={x.f} source={x.s} category={x.c} initialRevealed={i===0}/>
          ))}
        </div>
      </section>

      <section style={{padding:'80px 64px', borderBottom:'1px solid var(--pf-line)'}}>
        <div style={{maxWidth:1000, margin:'0 auto'}}>
          <div className="pf-eyebrow" style={{marginBottom:18}}>Frequently asked</div>
          <h2 className="pf-h2" style={{marginBottom:48, maxWidth:680}}>The questions we’re asked most often, answered briefly.</h2>
          <FaqAccordion/>
        </div>
      </section>

      <Footer/>
    </div>
  );
}

Object.assign(window, { MythsPage });
