// editor.jsx — Admin article editor

function EditorToolbar() {
  const tools = [
    { g: ['H1','H2','H3','¶'] },
    { g: ['B','I','U','S'] },
    { g: ['“ ”','— ', '⊕'] },
    { g: ['Link','Cite','Note'] },
    { g: ['Image','Chart','Embed'] },
  ];
  return (
    <div style={{
      position:'sticky', top:56, zIndex:5,
      background:'#fff', borderBottom:'1px solid var(--pf-admin-border)',
      padding:'8px 24px', display:'flex', alignItems:'center', gap:14, flexWrap:'wrap',
    }}>
      {tools.map((t, gi) => (
        <React.Fragment key={gi}>
          <div style={{display:'flex', alignItems:'center', gap:2}}>
            {t.g.map(x => (
              <button key={x} style={{
                padding:'5px 9px', minWidth:30, height:28, borderRadius:5,
                background:'transparent', border:0,
                fontSize: x.length>2 ? 12 : 13,
                color:'var(--pf-admin-ink)',
                fontFamily: ['H1','H2','H3','¶','B','I','U','S','“ ”','— ','⊕'].includes(x) ? 'var(--pf-serif)' : 'var(--pf-sans)',
                fontWeight: ['B'].includes(x)? 700 : ['I'].includes(x) ? 400 : 400,
                fontStyle: ['I'].includes(x) ? 'italic' : 'normal',
                textDecoration: ['U'].includes(x) ? 'underline' : ['S'].includes(x) ? 'line-through' : 'none',
                cursor:'pointer',
              }} onMouseDown={(e)=>e.preventDefault()}>{x}</button>
            ))}
          </div>
          {gi < tools.length-1 && <div style={{width:1, height:18, background:'var(--pf-admin-border)'}}></div>}
        </React.Fragment>
      ))}
      <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:12}}>
        <span className="pf-mono" style={{fontSize:11, color:'var(--pf-admin-ink-2)'}}>SAVED · 2 MIN AGO</span>
        <button style={{padding:'5px 12px', borderRadius:5, border:'1px solid var(--pf-admin-border)', background:'transparent', fontSize:12, cursor:'pointer', fontFamily:'var(--pf-sans)'}}>Preview</button>
      </div>
    </div>
  );
}

function EditorRightRail() {
  const [seoOpen, setSeoOpen] = useState(true);
  const [pubOpen, setPubOpen] = useState(true);
  const [refOpen, setRefOpen] = useState(false);

  const Section = ({title, isOpen, onToggle, children}) => (
    <div style={{borderBottom:'1px solid var(--pf-admin-border)'}}>
      <button onClick={onToggle} style={{
        width:'100%', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between',
        background:'transparent', border:0, cursor:'pointer', textAlign:'left', fontFamily:'var(--pf-sans)',
      }}>
        <div style={{fontFamily:'var(--pf-mono)', fontSize:11, letterSpacing:'0.14em', color:'var(--pf-admin-ink)', textTransform:'uppercase'}}>{title}</div>
        <Icon.Chevron dir={isOpen?'up':'down'} size={13}/>
      </button>
      {isOpen && <div style={{padding:'4px 20px 20px'}}>{children}</div>}
    </div>
  );

  const Field = ({label, children}) => (
    <div style={{marginBottom:14}}>
      <label style={{display:'block', fontSize:11, color:'var(--pf-admin-ink-2)', marginBottom:6, fontFamily:'var(--pf-mono)', letterSpacing:'0.08em', textTransform:'uppercase'}}>{label}</label>
      {children}
    </div>
  );

  const input = {
    width:'100%', padding:'8px 10px', border:'1px solid var(--pf-admin-border)',
    borderRadius:5, fontSize:13, fontFamily:'var(--pf-sans)', color:'var(--pf-admin-ink)', background:'#fff',
  };

  return (
    <aside style={{width:320, borderLeft:'1px solid var(--pf-admin-border)', background:'#fff', flex:'0 0 320px', overflowY:'auto'}}>
      <Section title="Publish" isOpen={pubOpen} onToggle={()=>setPubOpen(!pubOpen)}>
        <Field label="Status">
          <div style={{display:'flex', gap:4, padding:3, background:'var(--pf-admin-surface)', borderRadius:5}}>
            {['Draft','Review','Published'].map((s, i) => (
              <button key={s} style={{
                flex:1, padding:'6px 0', border:0, borderRadius:4, fontSize:12, cursor:'pointer',
                background: i===1 ? '#fff' : 'transparent',
                color: i===1 ? 'var(--pf-admin-ink)' : 'var(--pf-admin-ink-2)',
                boxShadow: i===1 ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                fontFamily:'var(--pf-sans)',
              }}>{s}</button>
            ))}
          </div>
        </Field>
        <Field label="Category"><select style={input}><option>Method · Research note</option><option>Policy brief</option><option>Context</option></select></Field>
        <Field label="Publish on"><input style={input} defaultValue="Oct 18, 2025 · 09:00 IST"/></Field>
        <Field label="Visibility">
          <div style={{display:'flex', gap:4, padding:3, background:'var(--pf-admin-surface)', borderRadius:5}}>
            {['Public','Subscribers','Private'].map((s, i) => (
              <button key={s} style={{
                flex:1, padding:'6px 0', border:0, borderRadius:4, fontSize:12, cursor:'pointer',
                background: i===0 ? '#fff' : 'transparent',
                color: i===0 ? 'var(--pf-admin-ink)' : 'var(--pf-admin-ink-2)',
                fontFamily:'var(--pf-sans)',
              }}>{s}</button>
            ))}
          </div>
        </Field>
        <button style={{
          width:'100%', padding:'10px 0', background:'var(--pf-forest)', color:'#fff',
          border:0, borderRadius:5, fontSize:13, fontWeight:500, cursor:'pointer',
          fontFamily:'var(--pf-sans)', marginTop:6,
        }}>Submit for review</button>
      </Section>

      <Section title="SEO & sharing" isOpen={seoOpen} onToggle={()=>setSeoOpen(!seoOpen)}>
        <Field label="Slug"><input style={input} defaultValue="counting-cycles-fibre-recovery"/></Field>
        <Field label="Meta title (58 / 60)">
          <input style={input} defaultValue="Counting cycles: a fibre-level look at recovery rates"/>
          <div style={{fontSize:11, color:'var(--pf-admin-ink-2)', marginTop:6}}>Within preferred length</div>
        </Field>
        <Field label="Meta description (142 / 160)">
          <textarea style={{...input, minHeight:72, resize:'vertical'}} defaultValue="Mill-yard sampling across four states reveals what India’s aggregate recycling number hides — a closer look at fibre-level recovery rates and what they mean for circularity."/>
        </Field>
        <Field label="Canonical URL"><input style={input} defaultValue="https://paperfoundation.in/knowledge/counting-cycles"/></Field>
        <div style={{
          padding:12, background:'var(--pf-admin-surface)', borderRadius:5, marginTop:8,
          display:'flex', gap:10, fontSize:12, color:'var(--pf-admin-ink-2)',
        }}>
          <span style={{color:'var(--pf-forest)'}}><Icon.Check size={13}/></span>
          <span>Reads well · alt-text present on all 3 figures</span>
        </div>
      </Section>

      <Section title="References" isOpen={refOpen} onToggle={()=>setRefOpen(!refOpen)}>
        <div style={{fontSize:12, color:'var(--pf-admin-ink-2)', marginBottom:10}}>5 citations · 2 unresolved DOIs</div>
        <button style={{...input, textAlign:'left', cursor:'pointer'}}>+ Add reference</button>
      </Section>

      <Section title="Reading & accessibility" isOpen={false} onToggle={()=>{}}>
        <div></div>
      </Section>
    </aside>
  );
}

function EditorBody() {
  return (
    <div style={{flex:1, overflowY:'auto', background:'#FBFBFA'}}>
      <div style={{maxWidth:760, margin:'0 auto', padding:'64px 32px 120px'}}>
        <div style={{marginBottom:24, display:'flex', alignItems:'center', gap:12}}>
          <span style={{
            padding:'4px 10px', background:'rgba(196,149,106,0.14)', color:'#8a6238',
            fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase',
            borderRadius:999,
          }}>Method · Research note</span>
          <span className="pf-mono" style={{fontSize:11, color:'var(--pf-admin-ink-2)'}}>v3.1 · last edited 2 min ago</span>
        </div>

        <h1 style={{
          fontFamily:'var(--pf-serif)', fontSize:42, lineHeight:1.1,
          color:'var(--pf-admin-ink)', letterSpacing:'-0.015em', marginBottom:18,
          outline:'none',
        }} contentEditable suppressContentEditableWarning>
          Counting cycles: a fibre-level look at recovery rates
        </h1>

        <p style={{
          fontFamily:'var(--pf-serif)', fontStyle:'italic', fontSize:19, lineHeight:1.55,
          color:'var(--pf-admin-ink-2)', marginBottom:36, outline:'none',
        }} contentEditable suppressContentEditableWarning>
          Mill-yard sampling across four states reveals what India’s aggregate recycling number hides —
          a closer look at fibre-level recovery rates and what they mean for circularity.
        </p>

        <div style={{display:'flex', alignItems:'center', gap:16, paddingBottom:28, marginBottom:36, borderBottom:'1px solid var(--pf-admin-border)'}}>
          <div style={{width:36, height:36, borderRadius:'50%', background:'#E0DAD2', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--pf-serif)', fontSize:14, color:'var(--pf-forest)'}}>VS</div>
          <div style={{fontSize:13, color:'var(--pf-admin-ink-2)'}}>
            <span style={{color:'var(--pf-admin-ink)'}}>Vivek Sharma</span> · Research Fellow
          </div>
          <button style={{marginLeft:'auto', padding:'5px 10px', background:'transparent', border:'1px solid var(--pf-admin-border)', borderRadius:4, fontSize:11, color:'var(--pf-admin-ink-2)', cursor:'pointer'}}>+ Co-author</button>
        </div>

        <p style={{
          fontFamily:'var(--pf-serif)', fontSize:18, lineHeight:1.75,
          color:'var(--pf-admin-ink)', marginBottom:24, outline:'none',
        }} contentEditable suppressContentEditableWarning>
          India’s headline recycling number — sitting at roughly 72% of recoverable paper — is widely
          quoted in policy briefs. Less commonly discussed is what that figure measures, and what it
          leaves out at the fibre level<span className="pf-cite">1</span>.
        </p>

        {/* Inline media slot */}
        <div style={{
          margin:'28px 0', padding:'32px 24px',
          border:'1.5px dashed #C4956A',
          borderRadius:8, background:'rgba(196,149,106,0.06)',
          display:'flex', alignItems:'center', justifyContent:'space-between', gap:16,
        }}>
          <div>
            <div style={{fontFamily:'var(--pf-mono)', fontSize:11, color:'#8a6238', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>Block · Figure</div>
            <div style={{fontFamily:'var(--pf-serif)', fontSize:17, color:'var(--pf-admin-ink)'}}>Fig. 02 · Recovery rate by mill capacity, 2019–2024</div>
            <div style={{fontSize:12, color:'var(--pf-admin-ink-2)', marginTop:4}}>Bound to data/mill-yard-2024.csv</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button style={{padding:'7px 12px', border:'1px solid var(--pf-admin-border)', borderRadius:5, background:'#fff', fontSize:12, cursor:'pointer', fontFamily:'var(--pf-sans)'}}>Replace data</button>
            <button style={{padding:'7px 12px', border:0, background:'var(--pf-forest)', color:'#fff', borderRadius:5, fontSize:12, cursor:'pointer', fontFamily:'var(--pf-sans)'}}>Edit chart</button>
          </div>
        </div>

        <p style={{
          fontFamily:'var(--pf-serif)', fontSize:18, lineHeight:1.75,
          color:'var(--pf-admin-ink)', marginBottom:24,
        }} contentEditable suppressContentEditableWarning>
          Aggregate figures average across mill capacities, fibre grades, and contamination thresholds.
          When the same dataset is partitioned by these dimensions, a more nuanced picture emerges:
          recovery rates above 80% are common in large mills handling clean kraft inputs, while rates
          for mixed paperboard hover below 55%<span className="pf-cite">2</span>.
        </p>

        {/* Active block insertion menu */}
        <div style={{position:'relative', height:0, margin:'8px 0'}}>
          <div style={{
            position:'absolute', left:-44, top:6,
            width:28, height:28, borderRadius:'50%', border:'1px solid var(--pf-admin-border)',
            background:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
            color:'var(--pf-admin-ink-2)', cursor:'pointer',
          }}><Icon.Plus size={13}/></div>
        </div>

        <p style={{
          fontFamily:'var(--pf-serif)', fontSize:18, lineHeight:1.75,
          color:'var(--pf-admin-ink-3, #9A958E)', fontStyle:'italic',
        }}>Continue writing — type <kbd style={{padding:'1px 5px', background:'var(--pf-admin-surface)', border:'1px solid var(--pf-admin-border)', borderRadius:3, fontFamily:'var(--pf-mono)', fontSize:11}}>/</kbd> for blocks.</p>
      </div>
    </div>
  );
}

function ArticleEditor() {
  return (
    <div style={{...adminStyles.shell, height:880, display:'flex', flexDirection:'column', overflow:'hidden'}}>
      {/* Slim top bar */}
      <div style={{
        height:56, padding:'0 24px', background:'#fff',
        borderBottom:'1px solid var(--pf-admin-border)',
        display:'flex', alignItems:'center', justifyContent:'space-between', flex:'0 0 56px',
      }}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <button style={{background:'transparent', border:0, color:'var(--pf-admin-ink-2)', cursor:'pointer', display:'flex', alignItems:'center', gap:8, fontSize:13, fontFamily:'var(--pf-sans)'}}>
            <Icon.Chevron dir="left" size={14}/> All articles
          </button>
          <span style={{width:1, height:18, background:'var(--pf-admin-border)'}}></span>
          <div className="pf-mono" style={{fontSize:11, letterSpacing:'0.14em', color:'var(--pf-admin-ink-2)'}}>EDITING · DRAFT v3.1</div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{display:'flex', alignItems:'center', gap:-8, marginRight:4}}>
            {['HI','VS','AM'].map((i, idx) => (
              <div key={i} style={{
                width:26, height:26, borderRadius:'50%', background:idx===0?'#C4956A':idx===1?'#8B9D77':'#2D5F3E', color:'#fff',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:10, fontFamily:'var(--pf-mono)', border:'2px solid #fff',
                marginLeft: idx>0 ? -8 : 0, position:'relative',
              }}>{i}</div>
            ))}
          </div>
          <button style={{padding:'6px 12px', border:'1px solid var(--pf-admin-border)', borderRadius:5, background:'#fff', fontSize:12, cursor:'pointer', fontFamily:'var(--pf-sans)'}}>Discard</button>
          <button style={{padding:'6px 14px', border:0, background:'var(--pf-forest)', color:'#fff', borderRadius:5, fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'var(--pf-sans)'}}>Save & publish</button>
        </div>
      </div>
      <EditorToolbar/>
      <div style={{flex:1, display:'flex', minHeight:0}}>
        <EditorBody/>
        <EditorRightRail/>
      </div>
    </div>
  );
}

Object.assign(window, { ArticleEditor });
