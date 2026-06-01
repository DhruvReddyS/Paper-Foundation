// homepage.jsx — Paper Foundation India homepage

function PFNavbar({ active = 'home' }) {
  const items = [
    { id: 'research', label: 'Research' },
    { id: 'myths', label: 'Myths & Facts' },
    { id: 'circularity', label: 'Circularity' },
    { id: 'reports', label: 'Reports' },
    { id: 'about', label: 'About' },
  ];
  return (
    <header style={{
      borderBottom:'1px solid var(--pf-line)',
      background:'rgba(250,248,245,0.92)',
      backdropFilter:'saturate(140%) blur(10px)',
      position:'sticky', top:0, zIndex:30,
    }}>
      <div style={{maxWidth:1200, margin:'0 auto', padding:'18px 64px',
                   display:'flex', alignItems:'center', justifyContent:'space-between', gap:32}}>
        <a href="#" style={{display:'flex', alignItems:'center', gap:12}}>
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <rect x="3" y="6" width="18" height="22" fill="#FAF8F5" stroke="#2D5F3E" strokeWidth="1.4"/>
            <rect x="7" y="2" width="18" height="22" fill="#FAF8F5" stroke="#2D5F3E" strokeWidth="1.4"/>
            <line x1="11" y1="9" x2="21" y2="9" stroke="#2D5F3E" strokeWidth="1"/>
            <line x1="11" y1="13" x2="21" y2="13" stroke="#2D5F3E" strokeWidth="1"/>
            <line x1="11" y1="17" x2="18" y2="17" stroke="#2D5F3E" strokeWidth="1"/>
          </svg>
          <div style={{lineHeight:1}}>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:17, color:'var(--pf-ink)', letterSpacing:'-0.005em'}}>Paper Foundation</div>
            <div style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.18em', color:'var(--pf-ink-2)', marginTop:4, textTransform:'uppercase'}}>India · est. 2021</div>
          </div>
        </a>
        <nav style={{display:'flex', gap:36}}>
          {items.map(it => (
            <a key={it.id} href={'#'+it.id} style={{
              fontSize:14, color: active===it.id ? 'var(--pf-forest)' : 'var(--pf-ink)',
              fontWeight: active===it.id ? 500 : 400,
              position:'relative', paddingBottom:4,
              borderBottom: active===it.id ? '1px solid var(--pf-forest)' : '1px solid transparent',
              transition:'color .18s ease, border-color .18s ease'
            }}>{it.label}</a>
          ))}
        </nav>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <button aria-label="Search" style={{background:'transparent', border:0, color:'var(--pf-ink)', padding:8, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6}}>
            <Icon.Search size={16}/>
          </button>
          <a className="pf-btn pf-btn--secondary" href="#" style={{padding:'9px 18px', fontSize:13}}>Subscribe</a>
        </div>
      </div>
    </header>
  );
}

function CampaignBanner() {
  return (
    <div style={{background:'var(--pf-forest-3)', color:'#F2EDE7', fontFamily:'var(--pf-sans)'}}>
      <div style={{maxWidth:1200, margin:'0 auto', padding:'10px 64px',
                   display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, fontSize:13}}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <span style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:'#C4956A'}}>New Report</span>
          <span style={{opacity:0.55}}>·</span>
          <span style={{opacity:0.92}}>India Paper Circularity Index 2025 — third edition</span>
        </div>
        <a href="#" style={{display:'inline-flex', alignItems:'center', gap:8, opacity:0.92, borderBottom:'1px solid rgba(242,237,231,0.5)', paddingBottom:1}}>
          Read the findings <Icon.Arrow size={13}/>
        </a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section style={{borderBottom:'1px solid var(--pf-line)'}}>
      <div style={{maxWidth:1200, margin:'0 auto', padding:'96px 64px 80px',
                   display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:80, alignItems:'center'}}>
        <div className="pf-fade-up">
          <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:28}}>
            <span style={{width:32, height:1, background:'var(--pf-forest)'}}></span>
            <span className="pf-eyebrow">A public knowledge platform</span>
          </div>
          <h1 className="pf-display" style={{maxWidth:560, marginBottom:28}}>
            Understanding paper through&nbsp;evidence,<br/>
            <em style={{fontStyle:'italic', color:'var(--pf-forest)'}}>not assumption.</em>
          </h1>
          <p className="pf-body-lg" style={{maxWidth:520, color:'var(--pf-ink-2)', marginBottom:40}}>
            Public conversations about paper, recycling, and environmental impact are often shaped by
            simplified narratives. Paper Foundation India exists to build a more balanced, research-backed
            understanding of how paper fits into responsible, circular systems.
          </p>
          <div style={{display:'flex', gap:14, alignItems:'center', flexWrap:'wrap'}}>
            <button className="pf-btn pf-btn--primary">Explore the Facts <Icon.Arrow size={15}/></button>
            <button className="pf-btn pf-btn--secondary">Read the Evidence</button>
          </div>

          <div style={{marginTop:64, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32, maxWidth:520}}>
            {[
              { k:'142', l:'peer-reviewed citations' },
              { k:'37', l:'industry & policy partners' },
              { k:'2021', l:'founded in New Delhi' },
            ].map(s => (
              <div key={s.l}>
                <div style={{fontFamily:'var(--pf-serif)', fontSize:30, color:'var(--pf-forest)'}}>{s.k}</div>
                <div className="pf-mono" style={{marginTop:6, textTransform:'uppercase', fontSize:10, letterSpacing:'0.14em', lineHeight:1.5, color:'var(--pf-ink-2)'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{position:'relative'}}>
          <PaperSystemsArt width={560} height={480} />
          <div style={{position:'absolute', top:0, right:0, fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--pf-ink-3)'}}>FIG. 01 — PAPER · SYSTEMS</div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const partners = [
    'Indian Council of Forestry Research',
    'TERI',
    'IIM Ahmedabad — Sustainability',
    'CSE',
    'CPCB',
    'IIT Roorkee — Paper Tech',
  ];
  return (
    <section style={{padding:'48px 64px', borderBottom:'1px solid var(--pf-line)', background:'var(--pf-paper-2)'}}>
      <div style={{maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', gap:48, flexWrap:'wrap'}}>
        <div className="pf-eyebrow" style={{flex:'0 0 auto'}}>Cited & cited by</div>
        <div style={{flex:1, display:'flex', gap:44, flexWrap:'wrap', alignItems:'center'}}>
          {partners.map(p => (
            <div key={p} style={{fontFamily:'var(--pf-serif)', fontSize:14, color:'var(--pf-ink-2)', letterSpacing:'-0.005em'}}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MythWidget() {
  const items = [
    {
      myth: 'Recycled paper is always better than virgin paper.',
      fact: 'Each has trade-offs. Recycled fibre saves trees but is energy-intensive and degrades after 5–7 cycles. A circular system depends on both.',
      source: 'FAO Forest Products, 2023',
    },
    {
      myth: 'The paper industry drives deforestation in India.',
      fact: 'Over 90% of fibre used by Indian paper mills comes from farm-grown wood and agricultural residue, not natural forests.',
      source: 'IPMA Sustainability Report, 2024',
    },
    {
      myth: 'Going paperless is the most sustainable choice.',
      fact: 'Digital infrastructure carries embedded carbon. The right answer depends on use, frequency, and source — not the medium alone.',
      source: 'IEA Digitalisation & Energy, 2023',
    },
  ];
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const cur = items[idx];

  return (
    <section style={{padding:'96px 64px', background:'var(--pf-paper-2)', borderBottom:'1px solid var(--pf-line)'}}>
      <div style={{maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'0.9fr 1.1fr', gap:64, alignItems:'center'}}>
        <div>
          <div className="pf-eyebrow" style={{marginBottom:18}}>Myth · Fact · Source</div>
          <h2 className="pf-h2" style={{marginBottom:20, maxWidth:420}}>What if the most common belief isn’t the most complete one?</h2>
          <p className="pf-body-lg" style={{color:'var(--pf-ink-2)', maxWidth:440, marginBottom:32}}>
            Sustainability is rarely binary. Reveal what current research says about the assumptions
            we hold most strongly.
          </p>
          <a href="#" className="pf-link">Browse all 48 myth pairs <Icon.Arrow size={14}/></a>
        </div>

        <div className="pf-card" style={{padding:0, background:'#fff', overflow:'hidden'}}>
          <div style={{display:'flex', borderBottom:'1px solid var(--pf-line)'}}>
            {items.map((_, i) => (
              <button key={i} onClick={() => { setIdx(i); setRevealed(false); }}
                style={{
                  flex:1, padding:'14px 18px', border:0,
                  background: i===idx ? '#fff' : 'var(--pf-paper)',
                  color: i===idx ? 'var(--pf-forest)' : 'var(--pf-ink-2)',
                  fontFamily:'var(--pf-mono)', fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase',
                  borderRight: i<items.length-1 ? '1px solid var(--pf-line)' : 'none',
                  borderTop: i===idx ? '2px solid var(--pf-forest)' : '2px solid transparent',
                  cursor:'pointer', transition:'all .18s ease',
                }}>0{i+1}</button>
            ))}
          </div>
          <div style={{padding:'36px 40px 32px'}}>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:18}}>
              <span className="pf-pill pf-pill--copper">Myth</span>
              <span className="pf-mono" style={{fontSize:11}}>Common belief</span>
            </div>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:26, lineHeight:1.28, color:'var(--pf-ink)', marginBottom:24, letterSpacing:'-0.01em'}}>
              “{cur.myth}”
            </div>
            <div style={{height:1, background:'var(--pf-line)', margin:'24px 0'}}></div>
            {revealed ? (
              <div className="pf-fade-up">
                <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14}}>
                  <span className="pf-pill pf-pill--sage">Evidence</span>
                  <span className="pf-mono" style={{fontSize:11}}>Research consensus</span>
                </div>
                <div className="pf-body-lg" style={{color:'var(--pf-ink)', marginBottom:20}}>{cur.fact}</div>
                <div className="pf-mono" style={{fontSize:11}}>Source — {cur.source}</div>
              </div>
            ) : (
              <button onClick={() => setRevealed(true)}
                style={{background:'transparent', border:'1px dashed var(--pf-line-2)', color:'var(--pf-ink-2)',
                        padding:'18px', width:'100%', borderRadius:8, fontSize:13, fontFamily:'var(--pf-sans)',
                        display:'flex', alignItems:'center', justifyContent:'center', gap:10}}>
                Reveal what research suggests <Icon.Arrow size={14}/>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedResearch() {
  const articles = [
    {
      cat: 'POLICY',
      title: 'How farm forestry quietly reshaped India’s pulp supply',
      excerpt: 'A two-decade shift moved fibre sourcing onto agricultural land — with implications for smallholders, mills, and forest cover.',
      author: 'Dr. Anjali Menon',
      read: '14 min read',
      tone: 'lg',
    },
    {
      cat: 'METHOD',
      title: 'Counting cycles: a fibre-level look at recovery rates',
      excerpt: 'Mill-yard sampling across four states reveals what India’s aggregate recycling number hides.',
      author: 'Vivek Sharma',
      read: '9 min read',
    },
    {
      cat: 'CONTEXT',
      title: 'Reading the LCA: what life-cycle studies do and don’t resolve',
      excerpt: 'A field guide to interpreting paper-versus-digital comparisons — and the assumptions behind them.',
      author: 'Editorial Desk',
      read: '7 min read',
    },
  ];

  return (
    <section style={{padding:'96px 64px', borderBottom:'1px solid var(--pf-line)'}}>
      <div style={{maxWidth:1200, margin:'0 auto'}}>
        <div style={{display:'flex', alignItems:'end', justifyContent:'space-between', marginBottom:56, gap:32}}>
          <div>
            <div className="pf-eyebrow" style={{marginBottom:14}}>Knowledge Hub · Recent</div>
            <h2 className="pf-h2" style={{maxWidth:560}}>Reading worth your time, on the questions worth asking.</h2>
          </div>
          <a href="#" className="pf-link">All publications <Icon.Arrow size={14}/></a>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gap:32}}>
          {articles.map((a, i) => (
            <article key={a.title} className="pf-card" style={{padding: i===0 ? '36px' : '28px', display:'flex', flexDirection:'column', gap:20}}>
              <div className="pf-placeholder" style={{
                height: i===0 ? 280 : 180,
                marginBottom: i===0 ? 8 : 0,
              }}>{i===0 ? 'EDITORIAL · COVER IMAGE 16:9' : 'FIGURE · 4:3'}</div>

              <div style={{display:'flex', alignItems:'center', gap:14}}>
                <span className="pf-pill">{a.cat}</span>
                <span className="pf-mono" style={{fontSize:11}}>{a.read}</span>
              </div>

              <h3 style={{
                fontFamily:'var(--pf-serif)',
                fontSize: i===0 ? 28 : 20,
                lineHeight: 1.22,
                letterSpacing:'-0.01em',
                color:'var(--pf-ink)',
              }}>{a.title}</h3>

              <p style={{
                fontSize: i===0 ? 16 : 14,
                lineHeight:1.6,
                color:'var(--pf-ink-2)',
                margin:0,
              }}>{a.excerpt}</p>

              <div style={{marginTop:'auto', paddingTop:16, borderTop:'1px solid var(--pf-line)',
                          display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{fontSize:13, color:'var(--pf-ink)'}}>{a.author}</div>
                <div className="pf-mono" style={{fontSize:11}}>OCT 2025</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CircularityExplainer() {
  return (
    <section style={{padding:'96px 64px', background:'var(--pf-forest-3)', color:'#F2EDE7', borderBottom:'1px solid var(--pf-forest-3)'}}>
      <div style={{maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center'}}>
        <div>
          <div className="pf-eyebrow" style={{color:'#C4956A', marginBottom:18}}>The circularity primer</div>
          <h2 style={{fontFamily:'var(--pf-serif)', fontSize:38, lineHeight:1.15, marginBottom:28, color:'#FAF8F5', letterSpacing:'-0.01em'}}>
            Paper is one of the few materials that already lives inside a circular system.
          </h2>
          <p style={{fontSize:17, lineHeight:1.75, color:'rgba(242,237,231,0.78)', marginBottom:36, maxWidth:480}}>
            From fibre cultivation through recovery and re-pulping, a well-run paper system can complete
            five to seven loops before fibres are returned to soil. Understanding each stage is the first
            step toward making responsible choices.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24, maxWidth:520}}>
            {[
              {n:'01', t:'Fiber sourcing', s:'Farm forestry, residues, recovered paper'},
              {n:'02', t:'Use & reuse',   s:'Print, packaging, hygiene, archive'},
              {n:'03', t:'Recovery',      s:'Sorting, deinking, re-pulping'},
            ].map(s => (
              <div key={s.n}>
                <div className="pf-mono" style={{fontSize:11, color:'#C4956A', letterSpacing:'0.16em', marginBottom:10}}>{s.n}</div>
                <div style={{fontFamily:'var(--pf-serif)', fontSize:16, color:'#FAF8F5', marginBottom:8}}>{s.t}</div>
                <div style={{fontSize:13, color:'rgba(242,237,231,0.6)', lineHeight:1.5}}>{s.s}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:40}}>
            <button className="pf-btn pf-btn--dark">Read the circularity primer <Icon.Arrow size={15}/></button>
          </div>
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
          <div style={{background:'rgba(250,248,245,0.04)', border:'1px solid rgba(250,248,245,0.12)', padding:32, borderRadius:12}}>
            <CircularitySVG size={320}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactStats() {
  return (
    <section style={{padding:'96px 64px', borderBottom:'1px solid var(--pf-line)'}}>
      <div style={{maxWidth:1200, margin:'0 auto'}}>
        <div className="pf-eyebrow" style={{marginBottom:14}}>The Indian paper system · 2024 figures</div>
        <h2 className="pf-h2" style={{maxWidth:680, marginBottom:64}}>Numbers worth understanding, in context.</h2>

        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0, borderTop:'1px solid var(--pf-line)', borderBottom:'1px solid var(--pf-line)'}}>
          {[
            { k:<><CountUp to={20.4}/>M</>, l:'tonnes consumed annually', s:'CPCB, 2024' },
            { k:<><CountUp to={72}/>%</>,   l:'recovery rate of used paper', s:'IPMA, 2024' },
            { k:<><CountUp to={91}/>%</>,   l:'fibre from non-forest sources', s:'ICFRE, 2023' },
            { k:<>~<CountUp to={500}/>K</>, l:'people employed across the chain', s:'Min. of Commerce' },
          ].map((s, i) => (
            <div key={i} style={{
              padding:'40px 32px',
              borderRight: i<3 ? '1px solid var(--pf-line)' : 'none',
            }}>
              <div style={{fontFamily:'var(--pf-serif)', fontSize:48, color:'var(--pf-forest)', letterSpacing:'-0.02em', lineHeight:1}}>{s.k}</div>
              <div style={{fontSize:14, color:'var(--pf-ink)', marginTop:18, lineHeight:1.5}}>{s.l}</div>
              <div className="pf-mono" style={{fontSize:10, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--pf-ink-3)', marginTop:14}}>{s.s}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:24, fontSize:13, color:'var(--pf-ink-2)', maxWidth:680}}>
          Figures reflect the most recent published year. Methodologies vary between sources — see our
          <a href="#" style={{color:'var(--pf-forest)', borderBottom:'1px solid currentColor', marginLeft:4}}>methodology note</a>.
        </div>
      </div>
    </section>
  );
}

function NewsletterBlock() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <section style={{padding:'96px 64px', borderBottom:'1px solid var(--pf-line)'}}>
      <div style={{maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center'}}>
        <div>
          <div className="pf-eyebrow" style={{marginBottom:18}}>The Margin · monthly</div>
          <h2 className="pf-h2" style={{marginBottom:22, maxWidth:500}}>One careful letter a month. Nothing more.</h2>
          <p className="pf-body-lg" style={{color:'var(--pf-ink-2)', maxWidth:480}}>
            A short reading from our editorial desk: new research notes, a corrected misconception,
            and one chart worth examining. No campaigns. No urgency.
          </p>
        </div>
        <div className="pf-card" style={{padding:36, background:'#fff'}}>
          <label className="pf-mono" style={{fontSize:11, color:'var(--pf-ink-2)', textTransform:'uppercase', letterSpacing:'0.14em', display:'block', marginBottom:12}}>Email address</label>
          <div style={{display:'flex', gap:12, marginBottom:14}}>
            <input className="pf-input" type="email" placeholder="you@example.in" value={email} onChange={e=>setEmail(e.target.value)}/>
            <button className="pf-btn pf-btn--primary" onClick={()=>setSent(true)} style={{flex:'0 0 auto'}}>
              {sent ? <><Icon.Check/> Subscribed</> : 'Subscribe'}
            </button>
          </div>
          <div style={{fontSize:12, color:'var(--pf-ink-2)', lineHeight:1.55}}>
            By subscribing you agree to receive one monthly email. Unsubscribe at any time. We do not share or
            sell subscriber data — read our <a style={{color:'var(--pf-forest)', borderBottom:'1px solid currentColor'}}>data ethics</a> note.
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: 'Research', l:['Knowledge Hub', 'Reports & Publications', 'Methodology', 'Open data'] },
    { h: 'Programs', l:['Myth · Fact Library', 'Circularity Primer', 'Schools Programme', 'Policy briefs'] },
    { h: 'Foundation', l:['About', 'Editorial standards', 'Partners', 'Funding & transparency'] },
    { h: 'Connect', l:['Newsletter', 'Press enquiries', 'Speaking & advisory', 'Contact'] },
  ];
  return (
    <footer style={{padding:'80px 64px 40px', background:'var(--pf-paper-2)'}}>
      <div style={{maxWidth:1200, margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.4fr repeat(4, 1fr)', gap:48, paddingBottom:64, borderBottom:'1px solid var(--pf-line)'}}>
          <div>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:24}}>
              <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <rect x="3" y="6" width="18" height="22" fill="#FAF8F5" stroke="#2D5F3E" strokeWidth="1.4"/>
                <rect x="7" y="2" width="18" height="22" fill="#FAF8F5" stroke="#2D5F3E" strokeWidth="1.4"/>
                <line x1="11" y1="9" x2="21" y2="9" stroke="#2D5F3E" strokeWidth="1"/>
                <line x1="11" y1="13" x2="21" y2="13" stroke="#2D5F3E" strokeWidth="1"/>
                <line x1="11" y1="17" x2="18" y2="17" stroke="#2D5F3E" strokeWidth="1"/>
              </svg>
              <div style={{fontFamily:'var(--pf-serif)', fontSize:17}}>Paper Foundation</div>
            </div>
            <p style={{fontSize:14, color:'var(--pf-ink-2)', lineHeight:1.7, maxWidth:300}}>
              A non-profit knowledge platform on paper sustainability, circularity, and responsible use in India.
              Registered Section 8 Company. New Delhi.
            </p>
            <div style={{marginTop:24, display:'flex', gap:16, fontSize:13, color:'var(--pf-ink-2)'}}>
              <a className="pf-link" style={{borderBottom:'none', color:'var(--pf-forest)'}}>Annual report ↓</a>
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div className="pf-mono" style={{fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--pf-ink)', marginBottom:18}}>{c.h}</div>
              <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12}}>
                {c.l.map(li => (
                  <li key={li}><a href="#" style={{fontSize:14, color:'var(--pf-ink-2)'}}>{li}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{paddingTop:32, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16}}>
          <div className="pf-mono" style={{fontSize:11, color:'var(--pf-ink-3)'}}>© 2021–2025 Paper Foundation India · CIN U85100DL2021NPL···</div>
          <div className="pf-mono" style={{fontSize:11, color:'var(--pf-ink-3)', display:'flex', gap:24}}>
            <a>Editorial standards</a>
            <a>Privacy</a>
            <a>Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Homepage() {
  return (
    <div className="pf">
      <CampaignBanner/>
      <PFNavbar active="home"/>
      <Hero/>
      <TrustStrip/>
      <MythWidget/>
      <FeaturedResearch/>
      <CircularityExplainer/>
      <ImpactStats/>
      <NewsletterBlock/>
      <Footer/>
    </div>
  );
}

Object.assign(window, { Homepage, PFNavbar, Footer });
