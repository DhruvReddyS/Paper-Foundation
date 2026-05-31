// research.jsx — Research / Reports page

function ResearchPage() {
  const [activeCat, setActiveCat] = useState('All');
  const cats = ['All', 'Policy briefs', 'Annual reports', 'Working papers', 'Data releases', 'Submissions'];

  const featured = {
    title: 'India Paper Circularity Index 2025',
    sub: 'Third edition · Comprehensive review of fibre flows, recovery infrastructure, and circularity gaps across 18 states.',
    pages: 184, year: 2025, lang: 'EN · HI',
    pdf: '4.2 MB', cites: 142,
    authors: 'Dr. Anjali Menon · Vivek Sharma · 9 contributors',
  };

  const reports = [
    { c:'Policy briefs',   t:'Extended Producer Responsibility, three years in',
      e:'A review of EPR implementation in paper packaging from 2022–2025, drawing on filings and field interviews.',
      pages:48, year:2025, lang:'EN', pdf:'1.4 MB' },
    { c:'Working papers',  t:'Recovery infrastructure in tier-2 Indian cities',
      e:'Mapping informal and formal collection networks across nine cities — capacity, gaps, and policy levers.',
      pages:72, year:2025, lang:'EN', pdf:'2.1 MB' },
    { c:'Data releases',   t:'Mill-yard intake dataset, 2019–2024',
      e:'Anonymised mill-yard intake records contributed by 14 mills. Open under CC-BY-NC 4.0.',
      pages:0, year:2025, lang:'CSV',pdf:'CSV · 38 MB' },
    { c:'Annual reports',  t:'Foundation Annual Report 2024–25',
      e:'Programme review, financials, governance, and editorial standards. Audited.',
      pages:96, year:2025, lang:'EN', pdf:'3.6 MB' },
    { c:'Working papers',  t:'Fibre rotation periods under clonal eucalyptus',
      e:'A five-state comparison of rotation lengths, plot productivity, and grower returns.',
      pages:36, year:2024, lang:'EN', pdf:'1.1 MB' },
    { c:'Submissions',     t:'Comments to MoEFCC on EPR draft rules, 2024',
      e:'Foundation submission to the Ministry of Environment, Forest and Climate Change consultation.',
      pages:18, year:2024, lang:'EN', pdf:'420 KB' },
    { c:'Policy briefs',   t:'Food-contact paper safety: a regulator’s guide',
      e:'A short brief written for state-level food-safety officers on contaminant migration testing.',
      pages:24, year:2024, lang:'EN · HI', pdf:'820 KB' },
    { c:'Working papers',  t:'Reading the LCA: a methodology comparison',
      e:'How life-cycle assessment methodology choices shape paper-vs-digital conclusions.',
      pages:64, year:2024, lang:'EN', pdf:'1.8 MB' },
  ];

  const filtered = activeCat==='All' ? reports : reports.filter(r => r.c === activeCat);

  return (
    <div className="pf">
      <PFNavbar active="reports"/>
      <section style={{borderBottom:'1px solid var(--pf-line)'}}>
        <div style={{maxWidth:1200, margin:'0 auto', padding:'72px 64px 32px'}}>
          <div className="pf-eyebrow" style={{marginBottom:18}}>Research & Publications</div>
          <h1 className="pf-h1" style={{fontSize:48, letterSpacing:'-0.015em', maxWidth:780, marginBottom:24}}>
            A working library of evidence on paper, sustainability, and the Indian system.
          </h1>
          <p className="pf-body-lg" style={{color:'var(--pf-ink-2)', maxWidth:680}}>
            All Foundation publications are released openly. Datasets are licensed under Creative
            Commons. Annotated peer commentary, where it exists, is appended to each working paper.
          </p>
        </div>
      </section>

      {/* Featured report */}
      <section style={{padding:'64px 64px 80px', borderBottom:'1px solid var(--pf-line)', background:'var(--pf-paper-2)'}}>
        <div style={{maxWidth:1200, margin:'0 auto'}}>
          <div className="pf-eyebrow" style={{marginBottom:24, color:'var(--pf-copper)'}}>Featured · just released</div>
          <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:64, alignItems:'center'}}>
            <div>
              <h2 className="pf-h2" style={{fontSize:40, lineHeight:1.1, letterSpacing:'-0.015em', marginBottom:20}}>{featured.title}</h2>
              <p className="pf-body-lg" style={{color:'var(--pf-ink-2)', maxWidth:520, marginBottom:32}}>{featured.sub}</p>
              <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, padding:'24px 0', borderTop:'1px solid var(--pf-line)', borderBottom:'1px solid var(--pf-line)', marginBottom:32, maxWidth:560}}>
                {[
                  {k:'PAGES', v:featured.pages},
                  {k:'YEAR', v:featured.year},
                  {k:'LANG.', v:featured.lang},
                  {k:'PDF', v:featured.pdf},
                ].map(s => (
                  <div key={s.k}>
                    <div className="pf-mono" style={{fontSize:10, letterSpacing:'0.14em'}}>{s.k}</div>
                    <div style={{fontFamily:'var(--pf-serif)', fontSize:18, color:'var(--pf-ink)', marginTop:6}}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="pf-mono" style={{fontSize:12, marginBottom:24}}>{featured.authors.toUpperCase()}</div>
              <div style={{display:'flex', gap:12, alignItems:'center', flexWrap:'wrap'}}>
                <button className="pf-btn pf-btn--primary"><Icon.Download/> Download report (PDF)</button>
                <button className="pf-btn pf-btn--secondary">Read summary</button>
                <div style={{marginLeft:8, fontSize:13, color:'var(--pf-ink-2)'}}>Cited {featured.cites} times</div>
              </div>
            </div>
            {/* report cover mockup */}
            <div style={{display:'flex', justifyContent:'center'}}>
              <div style={{
                width:340, height:460, background:'#fff', border:'1px solid var(--pf-line)',
                borderRadius:6, padding:'42px 36px', boxShadow:'0 20px 60px rgba(36,30,22,0.10)',
                position:'relative', overflow:'hidden',
              }}>
                <div className="pf-mono" style={{fontSize:10, color:'var(--pf-forest)', letterSpacing:'0.16em', marginBottom:18}}>PAPER FOUNDATION INDIA · 2025</div>
                <div style={{fontFamily:'var(--pf-serif)', fontSize:30, lineHeight:1.1, color:'var(--pf-ink)', letterSpacing:'-0.015em', marginBottom:14}}>India Paper Circularity Index</div>
                <div style={{fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize:16, color:'var(--pf-forest)'}}>Third edition</div>

                <div style={{position:'absolute', left:36, right:36, bottom:36}}>
                  <CircularitySVG size={180}/>
                  <div className="pf-mono" style={{fontSize:10, letterSpacing:'0.14em', color:'var(--pf-ink-2)', marginTop:14}}>VOL. 03 · OCT 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + list */}
      <section style={{padding:'56px 64px 96px', borderBottom:'1px solid var(--pf-line)'}}>
        <div style={{maxWidth:1200, margin:'0 auto'}}>
          <div style={{display:'flex', alignItems:'end', justifyContent:'space-between', gap:24, marginBottom:40, flexWrap:'wrap'}}>
            <div>
              <div className="pf-eyebrow" style={{marginBottom:12}}>Library</div>
              <h2 className="pf-h2" style={{fontSize:30}}>{filtered.length} publications</h2>
            </div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {cats.map(c => (
                <button key={c} onClick={()=>setActiveCat(c)} style={{
                  padding:'8px 16px', borderRadius:999,
                  border: c===activeCat ? '1px solid var(--pf-forest)' : '1px solid var(--pf-line)',
                  background: c===activeCat ? 'var(--pf-forest)' : 'transparent',
                  color: c===activeCat ? '#FAF8F5' : 'var(--pf-ink)',
                  fontSize:13, cursor:'pointer', fontFamily:'var(--pf-sans)',
                }}>{c}</button>
              ))}
            </div>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:0, borderTop:'1px solid var(--pf-line)'}}>
            {filtered.map((r, i) => (
              <div key={r.t} style={{
                padding:'28px 0',
                borderBottom:'1px solid var(--pf-line)',
                display:'grid',
                gridTemplateColumns:'140px 1fr 200px 160px',
                gap:32, alignItems:'center',
              }}>
                <div className="pf-mono" style={{fontSize:11, color:'var(--pf-forest)', letterSpacing:'0.12em'}}>{r.c.toUpperCase()}</div>
                <div>
                  <div style={{fontFamily:'var(--pf-serif)', fontSize:20, lineHeight:1.3, color:'var(--pf-ink)', marginBottom:8, letterSpacing:'-0.005em'}}>{r.t}</div>
                  <div style={{fontSize:14, color:'var(--pf-ink-2)', lineHeight:1.55, maxWidth:560}}>{r.e}</div>
                </div>
                <div className="pf-mono" style={{fontSize:11, display:'flex', flexDirection:'column', gap:4}}>
                  <div>{r.year} · {r.lang}</div>
                  {r.pages>0 && <div>{r.pages} pages</div>}
                  <div style={{color:'var(--pf-ink-3)'}}>{r.pdf}</div>
                </div>
                <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
                  <button className="pf-btn pf-btn--secondary" style={{padding:'9px 14px', fontSize:13}}><Icon.Download size={13}/> Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}

Object.assign(window, { ResearchPage });
