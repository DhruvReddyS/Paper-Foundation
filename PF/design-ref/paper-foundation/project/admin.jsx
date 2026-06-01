// admin.jsx — Admin dashboard

const adminStyles = {
  shell: {
    fontFamily:'var(--pf-sans)',
    color:'var(--pf-admin-ink)',
    background:'var(--pf-admin-bg)',
    fontSize:14,
    minHeight:'100%',
  },
};

function AdminSidebar({ active = 'dashboard' }) {
  const groups = [
    { h: '', items: [
      { id:'dashboard', label:'Dashboard', icon:'⌂' },
      { id:'inbox', label:'Inbox', icon:'☉', badge:7 },
    ]},
    { h: 'Content', items: [
      { id:'articles', label:'Articles', icon:'¶', badge:48 },
      { id:'myths', label:'Myth pairs', icon:'⇌' },
      { id:'reports', label:'Reports & data', icon:'≡' },
      { id:'pages', label:'Pages', icon:'▤' },
    ]},
    { h: 'Audience', items: [
      { id:'subs', label:'Subscribers', icon:'◉' },
      { id:'inquiries', label:'Inquiries', icon:'?' },
      { id:'analytics', label:'Reading data', icon:'≈' },
    ]},
    { h: 'Foundation', items: [
      { id:'team', label:'Team', icon:'⌽' },
      { id:'settings', label:'Settings', icon:'⚙' },
    ]},
  ];
  return (
    <aside style={{
      width:240, borderRight:'1px solid var(--pf-admin-border)',
      padding:'20px 14px', display:'flex', flexDirection:'column', gap:18,
      background:'var(--pf-admin-bg)',
      flex:'0 0 240px',
    }}>
      <div style={{padding:'4px 10px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid var(--pf-admin-border)'}}>
        <svg width="22" height="22" viewBox="0 0 28 28" aria-hidden="true">
          <rect x="3" y="6" width="18" height="22" fill="#fff" stroke="#2D5F3E" strokeWidth="1.4"/>
          <rect x="7" y="2" width="18" height="22" fill="#fff" stroke="#2D5F3E" strokeWidth="1.4"/>
        </svg>
        <div style={{lineHeight:1.1}}>
          <div style={{fontFamily:'var(--pf-serif)', fontSize:14, color:'var(--pf-admin-ink)'}}>Paper Foundation</div>
          <div style={{fontFamily:'var(--pf-mono)', fontSize:9, letterSpacing:'0.16em', color:'var(--pf-admin-ink-2)', marginTop:3, textTransform:'uppercase'}}>Editorial · v2.4</div>
        </div>
      </div>

      {groups.map((g, gi) => (
        <div key={gi}>
          {g.h && <div style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.14em', color:'var(--pf-admin-ink-2)', textTransform:'uppercase', padding:'2px 10px 8px'}}>{g.h}</div>}
          <div style={{display:'flex', flexDirection:'column', gap:2}}>
            {g.items.map(it => (
              <button key={it.id} style={{
                display:'flex', alignItems:'center', gap:10,
                padding:'8px 10px', border:0,
                background: it.id===active ? 'var(--pf-admin-surface)' : 'transparent',
                color: it.id===active ? 'var(--pf-admin-ink)' : 'var(--pf-admin-ink-2)',
                borderRadius:6, fontSize:13, cursor:'pointer', textAlign:'left',
                fontWeight: it.id===active ? 500 : 400,
                fontFamily:'var(--pf-sans)',
              }}>
                <span style={{width:18, textAlign:'center', color: it.id===active ? 'var(--pf-forest)' : 'var(--pf-admin-ink-2)'}}>{it.icon}</span>
                <span style={{flex:1}}>{it.label}</span>
                {it.badge && <span style={{fontFamily:'var(--pf-mono)', fontSize:10, color:'var(--pf-admin-ink-2)'}}>{it.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div style={{marginTop:'auto', padding:10, borderTop:'1px solid var(--pf-admin-border)', display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:28, height:28, borderRadius:'50%', background:'#E0DAD2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'var(--pf-forest)', fontFamily:'var(--pf-serif)'}}>AM</div>
        <div style={{lineHeight:1.2, fontSize:12, flex:1}}>
          <div style={{color:'var(--pf-admin-ink)'}}>Anjali M.</div>
          <div style={{color:'var(--pf-admin-ink-2)', fontSize:11}}>Editor</div>
        </div>
        <button style={{background:'transparent', border:0, color:'var(--pf-admin-ink-2)', cursor:'pointer', padding:6}}>⋯</button>
      </div>
    </aside>
  );
}

function AdminTopbar() {
  return (
    <div style={{
      height:56, padding:'0 24px',
      borderBottom:'1px solid var(--pf-admin-border)',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      background:'var(--pf-admin-bg)',
    }}>
      <div style={{display:'flex', alignItems:'center', gap:14}}>
        <div className="pf-mono" style={{fontSize:11, letterSpacing:'0.14em', color:'var(--pf-admin-ink-2)'}}>EDITORIAL / DASHBOARD</div>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:14}}>
        <div style={{position:'relative'}}>
          <span style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--pf-admin-ink-2)'}}><Icon.Search size={13}/></span>
          <input placeholder="Search all content   ⌘ K" style={{
            border:'1px solid var(--pf-admin-border)', borderRadius:6, padding:'7px 12px 7px 32px',
            fontSize:12, fontFamily:'var(--pf-sans)', color:'var(--pf-admin-ink)', width:260,
            background:'var(--pf-admin-surface)',
          }}/>
        </div>
        <button style={{
          padding:'7px 14px', background:'var(--pf-forest)', color:'#fff', border:0, borderRadius:6,
          fontSize:12, fontWeight:500, cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontFamily:'var(--pf-sans)',
        }}><Icon.Plus size={12}/> New article</button>
      </div>
    </div>
  );
}

function StatCard({ k, v, delta, deltaPos = true, spark }) {
  return (
    <div style={{
      background:'#fff', border:'1px solid var(--pf-admin-border)', borderRadius:8, padding:20,
      display:'flex', flexDirection:'column', gap:14, minHeight:130,
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.12em', color:'var(--pf-admin-ink-2)', textTransform:'uppercase'}}>{k}</div>
        {delta && (
          <div style={{fontFamily:'var(--pf-mono)', fontSize:11, color: deltaPos ? 'var(--pf-forest)' : '#B6633C'}}>
            {deltaPos?'↑':'↓'} {delta}
          </div>
        )}
      </div>
      <div style={{fontFamily:'var(--pf-serif)', fontSize:30, letterSpacing:'-0.015em', color:'var(--pf-admin-ink)', lineHeight:1}}>{v}</div>
      {spark}
    </div>
  );
}

function Sparkline({ data = [3, 5, 4, 7, 6, 8, 7, 9, 11, 10, 12, 14], color = '#2D5F3E' }) {
  const W=160, H=36;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i/(data.length-1))*W;
    const y = H - ((v-min)/(max-min || 1))*H;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="32">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function AdminTable() {
  const rows = [
    { t:'Counting cycles: fibre recovery rates', s:'Vivek Sharma',     d:'Editing',   c:'Method',  u:'2h ago' },
    { t:'Reading the LCA',                       s:'Editorial Desk',   d:'Review',    c:'Context', u:'5h ago' },
    { t:'EPR three years in',                    s:'Dr. A. Menon',     d:'Published', c:'Policy',  u:'Yesterday' },
    { t:'Food-contact paper safety',             s:'H. Iyer',          d:'Draft',     c:'Brief',   u:'2 days ago' },
    { t:'Mill-yard intake — Q2 update',          s:'Data team',        d:'Scheduled', c:'Data',    u:'Oct 14' },
    { t:'Rotation periods under clonal eucalyptus', s:'Dr. A. Menon',  d:'Published', c:'Working', u:'Oct 03' },
  ];
  const statusColor = {
    Editing: '#C4956A', Review: '#8B9D77', Published: '#2D5F3E', Draft:'#6B7280', Scheduled:'#3A7A50'
  };
  return (
    <div style={{background:'#fff', border:'1px solid var(--pf-admin-border)', borderRadius:8, overflow:'hidden'}}>
      <div style={{padding:'14px 20px', borderBottom:'1px solid var(--pf-admin-border)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:18}}>
          <div style={{fontFamily:'var(--pf-serif)', fontSize:17, color:'var(--pf-admin-ink)'}}>Recent content</div>
          <div style={{display:'flex', gap:4}}>
            {['All', 'Articles', 'Reports', 'Pages'].map((t, i) => (
              <button key={t} style={{
                padding:'4px 10px', borderRadius:5, border:0, fontSize:12,
                background: i===0 ? 'var(--pf-admin-surface)' : 'transparent',
                color: i===0 ? 'var(--pf-admin-ink)' : 'var(--pf-admin-ink-2)',
                cursor:'pointer', fontFamily:'var(--pf-sans)',
              }}>{t}</button>
            ))}
          </div>
        </div>
        <button style={{background:'transparent', border:0, fontSize:12, color:'var(--pf-admin-ink-2)', cursor:'pointer'}}>Filters ⌄</button>
      </div>

      <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
        <thead>
          <tr style={{fontFamily:'var(--pf-mono)', fontSize:10, letterSpacing:'0.12em', color:'var(--pf-admin-ink-2)', textTransform:'uppercase'}}>
            <th style={{textAlign:'left', padding:'10px 20px', fontWeight:400, borderBottom:'1px solid var(--pf-admin-border)'}}>Title</th>
            <th style={{textAlign:'left', padding:'10px 12px', fontWeight:400, borderBottom:'1px solid var(--pf-admin-border)'}}>Author</th>
            <th style={{textAlign:'left', padding:'10px 12px', fontWeight:400, borderBottom:'1px solid var(--pf-admin-border)'}}>Category</th>
            <th style={{textAlign:'left', padding:'10px 12px', fontWeight:400, borderBottom:'1px solid var(--pf-admin-border)'}}>Status</th>
            <th style={{textAlign:'left', padding:'10px 12px', fontWeight:400, borderBottom:'1px solid var(--pf-admin-border)'}}>Updated</th>
            <th style={{padding:'10px 20px', borderBottom:'1px solid var(--pf-admin-border)'}}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.t} style={{borderBottom: i<rows.length-1 ? '1px solid var(--pf-admin-border)' : 'none'}}>
              <td style={{padding:'12px 20px', color:'var(--pf-admin-ink)'}}>{r.t}</td>
              <td style={{padding:'12px', color:'var(--pf-admin-ink-2)'}}>{r.s}</td>
              <td style={{padding:'12px'}}>
                <span style={{
                  padding:'3px 8px', borderRadius:4, background:'var(--pf-admin-surface)',
                  fontSize:11, color:'var(--pf-admin-ink-2)', fontFamily:'var(--pf-mono)',
                }}>{r.c}</span>
              </td>
              <td style={{padding:'12px'}}>
                <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, color:'var(--pf-admin-ink)'}}>
                  <span style={{width:6, height:6, borderRadius:'50%', background:statusColor[r.d]}}></span>
                  {r.d}
                </span>
              </td>
              <td style={{padding:'12px', color:'var(--pf-admin-ink-2)', fontFamily:'var(--pf-mono)', fontSize:11}}>{r.u}</td>
              <td style={{padding:'12px 20px', textAlign:'right', color:'var(--pf-admin-ink-2)'}}>⋯</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InboxList() {
  const items = [
    { n:'Press · Mint', s:'Comment on EPR draft rules?', t:'2h' },
    { n:'Speaking req.', s:'Panel — IIM Sustainability Week', t:'4h' },
    { n:'Data request', s:'Mill-yard CSV access for thesis', t:'1d' },
    { n:'Correction', s:'Footnote in Brief #08 has dead DOI', t:'1d' },
    { n:'Partnership', s:'TERI joint working paper', t:'2d' },
  ];
  return (
    <div style={{background:'#fff', border:'1px solid var(--pf-admin-border)', borderRadius:8}}>
      <div style={{padding:'14px 18px', borderBottom:'1px solid var(--pf-admin-border)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{fontFamily:'var(--pf-serif)', fontSize:16, color:'var(--pf-admin-ink)'}}>Inbox</div>
        <div className="pf-mono" style={{fontSize:11, color:'var(--pf-admin-ink-2)'}}>7 unread</div>
      </div>
      <div>
        {items.map((it, i) => (
          <div key={i} style={{padding:'12px 18px', borderBottom: i<items.length-1 ? '1px solid var(--pf-admin-border)' : 'none', display:'flex', alignItems:'center', gap:12}}>
            <span style={{width:6, height:6, borderRadius:'50%', background:'var(--pf-forest-2)'}}></span>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:12, color:'var(--pf-admin-ink-2)', fontFamily:'var(--pf-mono)', letterSpacing:'0.08em'}}>{it.n.toUpperCase()}</div>
              <div style={{fontSize:13, color:'var(--pf-admin-ink)', marginTop:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{it.s}</div>
            </div>
            <div className="pf-mono" style={{fontSize:11, color:'var(--pf-admin-ink-2)'}}>{it.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div style={adminStyles.shell}>
      <div style={{display:'flex', minHeight:'100%'}}>
        <AdminSidebar active="dashboard"/>
        <div style={{flex:1, display:'flex', flexDirection:'column'}}>
          <AdminTopbar/>
          <div style={{padding:24, background:'var(--pf-admin-surface)', flex:1}}>
            <div style={{display:'flex', alignItems:'end', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12}}>
              <div>
                <h1 style={{fontFamily:'var(--pf-serif)', fontSize:26, color:'var(--pf-admin-ink)', letterSpacing:'-0.01em'}}>Good morning, Anjali.</h1>
                <div style={{fontSize:13, color:'var(--pf-admin-ink-2)', marginTop:4}}>3 drafts waiting on you · 1 scheduled to publish today.</div>
              </div>
              <div style={{display:'flex', gap:4, background:'#fff', border:'1px solid var(--pf-admin-border)', borderRadius:6, padding:3}}>
                {['7D','30D','90D','YTD'].map((t,i)=>(
                  <button key={t} style={{
                    padding:'5px 12px', border:0, borderRadius:4, fontSize:12,
                    background: i===1 ? 'var(--pf-admin-surface)' : 'transparent',
                    color: i===1 ? 'var(--pf-admin-ink)' : 'var(--pf-admin-ink-2)',
                    cursor:'pointer', fontFamily:'var(--pf-sans)',
                  }}>{t}</button>
                ))}
              </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16, marginBottom:24}}>
              <StatCard k="READERS · 30d" v="48,210" delta="12.4%" spark={<Sparkline/>}/>
              <StatCard k="SUBSCRIBERS"   v="9,432"  delta="3.1%"  spark={<Sparkline data={[12,11,13,14,13,15,14,16,15,17,18,19]}/>}/>
              <StatCard k="REPORT DOWNLOADS" v="2,107" delta="28.9%" spark={<Sparkline data={[5,6,4,7,6,8,7,10,12,14,16,19]} color="#C4956A"/>}/>
              <StatCard k="MYTH PAIR REVEALS" v="11,884" delta="6.2%" spark={<Sparkline data={[8,9,10,9,11,10,12,12,13,14,13,15]} color="#8B9D77"/>}/>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16}}>
              <AdminTable/>
              <div style={{display:'flex', flexDirection:'column', gap:16}}>
                <InboxList/>
                <div style={{background:'#fff', border:'1px solid var(--pf-admin-border)', borderRadius:8, padding:18}}>
                  <div style={{fontFamily:'var(--pf-serif)', fontSize:16, marginBottom:14}}>Quick actions</div>
                  <div style={{display:'flex', flexDirection:'column', gap:6}}>
                    {[
                      'New article',
                      'New myth pair',
                      'Schedule newsletter',
                      'Upload report PDF',
                      'Open data release',
                    ].map(a => (
                      <button key={a} style={{
                        padding:'9px 12px', border:'1px solid var(--pf-admin-border)', borderRadius:6,
                        background:'transparent', textAlign:'left', fontSize:13, color:'var(--pf-admin-ink)',
                        cursor:'pointer', display:'flex', alignItems:'center', gap:10, fontFamily:'var(--pf-sans)',
                      }}>
                        <Icon.Plus size={12}/>{a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AdminDashboard, AdminSidebar, AdminTopbar });
