import React, { useState, useRef } from "react";

// ─── BRAND ────────────────────────────────────────────────────────────────────
const C = {
  navy:"#0F2744", terra:"#C8692A", terraLight:"#FBF0E9", terraDark:"#7A3A12",
  white:"#FFFFFF", offWhite:"#F7F5F1", body:"#555555", muted:"#888888",
  border:"#E8E5DE",
  success:{bg:"#E8F5EE",text:"#1a6b3a"},
  warning:{bg:"#FEF5E7",text:"#7a5200"},
  danger:{bg:"#FEECEC",text:"#7a1a1a"},
  info:{bg:"#E8EDF3",text:"#0F2744"},
};

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const INIT_ASSETS = [
  {
    id:1,name:"Lyon Nord",country:"FR",city:"Lyon",flag:"🇫🇷",
    gla:14200,acquiredDate:"Q3 2021",acquisitionPrice:8400000,
    capRateEntry:4.8,annualRentAcquisition:672000,ervAtAcquisition:106,
    lender:"Crédit Agricole",loanExpiry:"2027-09-30",loanMargin:"260bps + E3M",
    covenantLTV:60,covenantICR:1.4,appraiser:"CBRE",
    indexation:"100% ILC",guarantee:"3m rent deposit",leaseLink:"#",
    notes:"Refurbishment completed Q1 2023. Tenant extended lease +5y in Q4 2023.",
    quarters:[
      {period:"Q3 2021",valuation:8400000,rent:672000,erv:106,capRate:4.8,walt:5.0,walb:2.8,ltv:46.2,icr:null,creditScore:88,creditRating:"A",tenantName:"Renault Trucks SAS",loanAmount:3880000},
      {period:"Q4 2022",valuation:9100000,rent:685000,erv:110,capRate:4.9,walt:4.5,walb:2.3,ltv:42.6,icr:1.80,creditScore:88,creditRating:"A",tenantName:"Renault Trucks SAS",loanAmount:3880000},
      {period:"Q4 2023",valuation:10200000,rent:700000,erv:115,capRate:5.0,walt:4.9,walb:2.7,ltv:38.0,icr:1.74,creditScore:85,creditRating:"A-",tenantName:"Renault Trucks SAS",loanAmount:3880000},
      {period:"Q2 2024",valuation:10600000,rent:710000,erv:117,capRate:5.1,walt:4.6,walb:2.4,ltv:36.6,icr:1.73,creditScore:84,creditRating:"A-",tenantName:"Renault Trucks SAS",loanAmount:3880000},
      {period:"Q4 2024",valuation:11200000,rent:721000,erv:118,capRate:5.2,walt:4.2,walb:2.1,ltv:34.6,icr:1.72,creditScore:82,creditRating:"A-",tenantName:"Renault Trucks SAS",loanAmount:3880000},
    ],
  },
  {
    id:2,name:"Milan Est",country:"IT",city:"Milan",flag:"🇮🇹",
    gla:9800,acquiredDate:"Q1 2022",acquisitionPrice:7200000,
    capRateEntry:5.1,annualRentAcquisition:490000,ervAtAcquisition:78,
    lender:"BNP Paribas RE",loanExpiry:"2026-12-31",loanMargin:"320bps + E3M",
    covenantLTV:60,covenantICR:1.5,appraiser:"Colliers",
    indexation:"75% ISTAT",guarantee:"6m bank guarantee",leaseLink:"#",
    notes:"Prime logistics near A4. ESG upgrade scheduled Q3 2025.",
    quarters:[
      {period:"Q1 2022",valuation:7200000,rent:490000,erv:78,capRate:5.1,walt:7.2,walb:4.9,ltv:58.3,icr:null,creditScore:90,creditRating:"AA-",tenantName:"DHL Supply Chain S.r.l.",loanAmount:4200000},
      {period:"Q4 2022",valuation:7600000,rent:498000,erv:79,capRate:5.1,walt:6.7,walb:4.4,ltv:55.3,icr:2.05,creditScore:90,creditRating:"AA-",tenantName:"DHL Supply Chain S.r.l.",loanAmount:4200000},
      {period:"Q4 2023",valuation:8300000,rent:515000,erv:80,capRate:5.2,walt:5.7,walb:3.7,ltv:50.6,icr:2.04,creditScore:91,creditRating:"AA-",tenantName:"DHL Supply Chain S.r.l.",loanAmount:4200000},
      {period:"Q2 2024",valuation:8700000,rent:527000,erv:81,capRate:5.3,walt:5.3,walb:4.1,ltv:48.3,icr:2.05,creditScore:91,creditRating:"AA-",tenantName:"DHL Supply Chain S.r.l.",loanAmount:4200000},
      {period:"Q4 2024",valuation:8950000,rent:538000,erv:82,capRate:5.4,walt:5.8,walb:3.7,ltv:46.9,icr:2.04,creditScore:91,creditRating:"AA-",tenantName:"DHL Supply Chain S.r.l.",loanAmount:4200000},
    ],
  },
  {
    id:3,name:"Rotterdam Gate",country:"NL",city:"Rotterdam",flag:"🇳🇱",
    gla:18500,acquiredDate:"Q2 2022",acquisitionPrice:14100000,
    capRateEntry:4.4,annualRentAcquisition:814000,ervAtAcquisition:82,
    lender:"ABN AMRO",loanExpiry:"2025-12-31",loanMargin:"195bps (fixed)",
    covenantLTV:55,covenantICR:1.6,appraiser:"JLL",
    indexation:"100% CPI",guarantee:"3m rent deposit",leaseLink:"#",
    notes:"Valuation -2.3% YoY. Tenant credit downgrade Q2 2024. ICR near covenant floor.",
    quarters:[
      {period:"Q2 2022",valuation:14100000,rent:814000,erv:82,capRate:4.4,walt:4.8,walb:2.6,ltv:64.5,icr:null,creditScore:85,creditRating:"A-",tenantName:"Geodis BV",loanAmount:9100000},
      {period:"Q4 2022",valuation:15200000,rent:820000,erv:84,capRate:4.5,walt:4.3,walb:2.1,ltv:59.9,icr:1.72,creditScore:83,creditRating:"BBB+",tenantName:"Geodis BV",loanAmount:9100000},
      {period:"Q4 2023",valuation:16500000,rent:840000,erv:86,capRate:4.7,walt:2.9,walb:1.5,ltv:55.2,icr:1.65,creditScore:81,creditRating:"BBB+",tenantName:"Geodis BV",loanAmount:9100000},
      {period:"Q2 2024",valuation:17200000,rent:858000,erv:88,capRate:4.8,walt:2.5,walb:1.2,ltv:52.9,icr:1.60,creditScore:78,creditRating:"BBB+",tenantName:"Geodis BV",loanAmount:9100000},
      {period:"Q4 2024",valuation:16800000,rent:865000,erv:88,capRate:5.0,walt:1.9,walb:0.9,ltv:54.2,icr:1.58,creditScore:74,creditRating:"BBB+",tenantName:"Geodis BV",loanAmount:9100000},
    ],
  },
  {
    id:4,name:"Bordeaux Sud",country:"FR",city:"Bordeaux",flag:"🇫🇷",
    gla:7600,acquiredDate:"Q4 2022",acquisitionPrice:5100000,
    capRateEntry:5.4,annualRentAcquisition:315000,ervAtAcquisition:68,
    lender:"LCL",loanExpiry:"2028-06-30",loanMargin:"380bps (fixed)",
    covenantLTV:60,covenantICR:1.35,appraiser:"Knight Frank",
    indexation:"100% ILAT",guarantee:"3m rent deposit",leaseLink:"#",
    notes:"Stable performer. Indexation uplift applied Q1 2024.",
    quarters:[
      {period:"Q4 2022",valuation:5100000,rent:315000,erv:68,capRate:5.4,walt:8.2,walb:5.9,ltv:56.9,icr:null,creditScore:85,creditRating:"A",tenantName:"Kuehne+Nagel SAS",loanAmount:2900000},
      {period:"Q4 2023",valuation:5400000,rent:328000,erv:69,capRate:5.5,walt:7.2,walb:5.0,ltv:53.7,icr:1.87,creditScore:86,creditRating:"A",tenantName:"Kuehne+Nagel SAS",loanAmount:2900000},
      {period:"Q2 2024",valuation:5700000,rent:336000,erv:70,capRate:5.5,walt:6.8,walb:4.6,ltv:50.9,icr:1.88,creditScore:86,creditRating:"A",tenantName:"Kuehne+Nagel SAS",loanAmount:2900000},
      {period:"Q4 2024",valuation:5950000,rent:344000,erv:71,capRate:5.6,walt:6.4,walb:4.1,ltv:48.7,icr:1.89,creditScore:87,creditRating:"A",tenantName:"Kuehne+Nagel SAS",loanAmount:2900000},
    ],
  },
  {
    id:5,name:"Turin Ovest",country:"IT",city:"Turin",flag:"🇮🇹",
    gla:5200,acquiredDate:"Q1 2023",acquisitionPrice:3600000,
    capRateEntry:6.0,annualRentAcquisition:218000,ervAtAcquisition:62,
    lender:"Unlevered",loanExpiry:null,loanMargin:"N/A",
    covenantLTV:null,covenantICR:null,appraiser:"Colliers",
    indexation:"75% ISTAT",guarantee:"Parent guarantee (Bertelsmann)",leaseLink:"#",
    notes:"Tenant credit deteriorating — two consecutive downgrades. Management briefing recommended.",
    quarters:[
      {period:"Q1 2023",valuation:3600000,rent:218000,erv:62,capRate:6.0,walt:9.1,walb:5.8,ltv:0,icr:null,creditScore:72,creditRating:"BB-",tenantName:"Arvato SCM S.r.l.",loanAmount:0},
      {period:"Q4 2023",valuation:3750000,rent:219000,erv:63,capRate:6.1,walt:8.2,walb:5.0,ltv:0,icr:null,creditScore:68,creditRating:"B+",tenantName:"Arvato SCM S.r.l.",loanAmount:0},
      {period:"Q2 2024",valuation:3920000,rent:222000,erv:64,capRate:6.3,walt:7.8,walb:4.8,ltv:0,icr:null,creditScore:63,creditRating:"B+",tenantName:"Arvato SCM S.r.l.",loanAmount:0},
      {period:"Q4 2024",valuation:3850000,rent:224000,erv:65,capRate:6.5,walt:7.1,walb:4.8,ltv:0,icr:null,creditScore:58,creditRating:"B+",tenantName:"Arvato SCM S.r.l.",loanAmount:0},
    ],
  },
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const latest = a => a.quarters[a.quarters.length-1];
const first  = a => a.quarters[0];
const fmtM   = n => n>=1e6?`€${(n/1e6).toFixed(1)}m`:n>=1e3?`€${(n/1e3).toFixed(0)}k`:`€${n}`;
const fmtPct = (n,sign=true) => n==null?"—":`${sign&&n>0?"+":""}${n.toFixed(1)}%`;
const fmtX   = n => n==null?"—":`${n.toFixed(2)}×`;
const delta  = (a,b) => b?((a-b)/b)*100:0;

function ratingColor(r) {
  if(!r) return C.muted;
  if(r.startsWith("AA")||r==="A+"||r==="A") return C.success.text;
  if(r.startsWith("A")||r.startsWith("BBB")) return C.info.text;
  if(r.startsWith("BB")||r.startsWith("B+")) return C.warning.text;
  return C.danger.text;
}

function alertsFor(assets) {
  const out=[]; const today=new Date("2025-12-31");
  assets.forEach(a=>{
    const l=latest(a);
    if(a.loanExpiry){
      const mo=(new Date(a.loanExpiry)-today)/(1000*60*60*24*30.4);
      if(mo>0&&mo<=6) out.push({id:`${a.id}-refin`,sev:"danger",asset:a.name,flag:a.flag,msg:`Loan matures in ${Math.round(mo)}m (${a.lender}) — begin refinancing now.`});
      else if(mo>6&&mo<=12) out.push({id:`${a.id}-refin`,sev:"warning",asset:a.name,flag:a.flag,msg:`Loan matures in ${Math.round(mo)}m (${a.lender}).`});
    }
    const prev=a.quarters.length>=2?a.quarters[a.quarters.length-2]:null;
    if(prev&&l.creditScore<prev.creditScore){
      const d=prev.creditScore-l.creditScore;
      out.push({id:`${a.id}-credit`,sev:d>=10?"danger":"warning",asset:a.name,flag:a.flag,msg:`Credit score down ${d}pts (${prev.creditScore}→${l.creditScore}).${d>=10?" Management discussion required.":""}`});
    }
    if(l.walt<2.5) out.push({id:`${a.id}-walt`,sev:"danger",asset:a.name,flag:a.flag,msg:`WALT ${l.walt.toFixed(1)}y — high lease renewal risk.`});
    else if(l.walt<3.5) out.push({id:`${a.id}-walt`,sev:"warning",asset:a.name,flag:a.flag,msg:`WALT ${l.walt.toFixed(1)}y — monitor renewal intent.`});
    if(l.icr!=null&&a.covenantICR!=null){
      const h=(l.icr-a.covenantICR)/a.covenantICR;
      if(h<0.05) out.push({id:`${a.id}-icr`,sev:"danger",asset:a.name,flag:a.flag,msg:`ICR ${fmtX(l.icr)} within 5% of covenant (>${a.covenantICR}×).`});
      else if(h<0.15) out.push({id:`${a.id}-icr`,sev:"warning",asset:a.name,flag:a.flag,msg:`ICR headroom thin: ${fmtX(l.icr)} vs ${a.covenantICR}× covenant.`});
    }
    if(prev&&l.valuation<prev.valuation) out.push({id:`${a.id}-val`,sev:"warning",asset:a.name,flag:a.flag,msg:`Valuation declined ${fmtPct(delta(l.valuation,prev.valuation),false)} vs prior period.`});
    if(a.covenantLTV&&l.ltv>0){
      const h=a.covenantLTV-l.ltv;
      if(h<3) out.push({id:`${a.id}-ltv`,sev:"danger",asset:a.name,flag:a.flag,msg:`LTV ${l.ltv.toFixed(1)}% near ceiling (${a.covenantLTV}%).`});
      else if(h<6) out.push({id:`${a.id}-ltv`,sev:"warning",asset:a.name,flag:a.flag,msg:`LTV headroom: ${l.ltv.toFixed(1)}% vs ${a.covenantLTV}% covenant.`});
    }
  });
  return out;
}

function healthOf(a) {
  const al=alertsFor([a]);
  if(al.some(x=>x.sev==="danger")) return "danger";
  if(al.some(x=>x.sev==="warning")) return "warning";
  return "ok";
}

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function Badge({children,scheme="neutral"}) {
  const m={neutral:{bg:"#F2F0EC",text:C.body},info:C.info,success:C.success,warning:C.warning,danger:C.danger,accent:{bg:C.terraLight,text:C.terraDark}};
  const s=m[scheme]||m.neutral;
  return <span style={{background:s.bg,color:s.text,fontSize:11,fontWeight:500,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{children}</span>;
}
function MetricCard({label,value,sub,color}) {
  return (
    <div style={{background:C.offWhite,borderRadius:8,padding:"10px 14px",minWidth:0}}>
      <div style={{fontSize:10,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>{label}</div>
      <div style={{fontSize:21,fontWeight:600,color:color||C.terra,lineHeight:1.1}}>{value}</div>
      {sub&&<div style={{fontSize:11,color:C.muted,marginTop:3}}>{sub}</div>}
    </div>
  );
}
function Eyebrow({children}) {
  return <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.09em",color:"#aaa",textTransform:"uppercase",marginBottom:10}}>{children}</div>;
}
function DeltaChip({value,inverted=false}) {
  if(value==null) return <span style={{color:C.muted,fontSize:12}}>—</span>;
  const good=inverted?value<0:value>=0;
  return <span style={{fontSize:12,fontWeight:500,color:good?C.success.text:C.danger.text}}>{value>0?"+":""}{value.toFixed(1)}%</span>;
}

// ─── LINE CHART ───────────────────────────────────────────────────────────────
function LineChart({data,color=C.terra,height=60,fmtFn}) {
  const [hovered,setHovered]=useState(null);
  if(!data||data.length<2) return <div style={{height,display:"flex",alignItems:"center",justifyContent:"center",color:C.muted,fontSize:11}}>Not enough data</div>;
  const vals=data.map(d=>d.v);
  const min=Math.min(...vals),max=Math.max(...vals),range=max-min||1;
  const W=300, plotH=height, labelH=18, totalH=plotH+labelH, pad=10;
  const x=i=>pad+(i/(vals.length-1))*(W-pad*2);
  const y=v=>pad+((1-(v-min)/range)*(plotH-pad*2));
  const pts=vals.map((v,i)=>`${x(i)},${y(v)}`).join(" ");
  const fill=`${x(0)},${plotH} ${pts} ${x(vals.length-1)},${plotH}`;

  return (
    <div style={{position:"relative"}}>
      {hovered!==null&&(()=>{
        const d=data[hovered];
        const cx=x(hovered);
        const pct=(cx/W)*100;
        const tipW=110;
        const tipLeft=pct>70?`calc(${pct}% - ${tipW}px)`:`${pct}%`;
        return(
          <div style={{position:"absolute",top:0,left:tipLeft,width:tipW,background:C.navy,borderRadius:7,padding:"5px 9px",zIndex:10,pointerEvents:"none",transform:"translateY(-2px)"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",marginBottom:2}}>{d.label}</div>
            <div style={{fontSize:12,fontWeight:600,color:"#fff"}}>{fmtFn?fmtFn(d.v):d.v}</div>
          </div>
        );
      })()}
      <svg viewBox={`0 0 ${W} ${totalH}`} style={{width:"100%",height:totalH,display:"block"}}>
        <defs>
          <linearGradient id={`g${color.replace(/[^a-z0-9]/gi,"")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points={fill} fill={`url(#g${color.replace(/[^a-z0-9]/gi,"")})`}/>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
        {vals.map((v,i)=>(
          <g key={i}>
            <circle cx={x(i)} cy={y(v)} r={hovered===i?5:3} fill={color} style={{transition:"r 0.1s"}}/>
            <circle cx={x(i)} cy={y(v)} r="12" fill="transparent" style={{cursor:"crosshair"}}
              onMouseEnter={()=>setHovered(i)}
              onMouseLeave={()=>setHovered(null)}
            />
          </g>
        ))}
        {data.map((d,i)=>(i===0||i===data.length-1)&&(
          <text key={i} x={x(i)} y={plotH+labelH-2} fontSize="9" fill={C.muted} textAnchor={i===0?"start":"end"}>
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function ChartCard({title,data,color,fmtFn,note}) {
  if(!data||data.length<2) return null;
  const d=delta(data[data.length-1].v,data[0].v);
  const inv=title.toLowerCase().includes("cap")||title.toLowerCase().includes("ltv")||title.toLowerCase().includes("credit");
  return (
    <div style={{background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,padding:"14px 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
        <Eyebrow>{title}</Eyebrow>
        {note&&<span style={{fontSize:10,color:C.muted}}>{note}</span>}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:11,color:C.muted}}>Entry: <b style={{color:C.body}}>{fmtFn?fmtFn(data[0].v):data[0].v}</b></span>
        <span style={{fontSize:11,color:C.muted}}>Now: <b style={{color:color}}>{fmtFn?fmtFn(data[data.length-1].v):data[data.length-1].v}</b></span>
        <DeltaChip value={d} inverted={inv}/>
      </div>
      <LineChart data={data} color={color} height={80} fmtFn={fmtFn}/>
    </div>
  );
}

// ─── ALERT BANNER ─────────────────────────────────────────────────────────────
function AlertBanner({alerts}) {
  const [exp,setExp]=useState(false);
  const [dismissed,setDismissed]=useState([]);
  const vis=alerts.filter(a=>!dismissed.includes(a.id));
  if(!vis.length) return null;
  const dangers=vis.filter(a=>a.sev==="danger"),warnings=vis.filter(a=>a.sev==="warning");
  return (
    <div style={{background:C.offWhite,borderBottom:`0.5px solid ${C.border}`,padding:"10px 32px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:exp?10:0}}>
        <span style={{fontSize:13,fontWeight:600,color:C.navy}}>🔔 Alerts</span>
        {dangers.length>0&&<Badge scheme="danger">{dangers.length} critical</Badge>}
        {warnings.length>0&&<Badge scheme="warning">{warnings.length} watch</Badge>}
        <button onClick={()=>setExp(!exp)} style={{marginLeft:"auto",background:"none",border:"none",color:C.terra,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{exp?"Collapse ↑":`See all ${vis.length} →`}</button>
      </div>
      {exp&&vis.map(a=>(
        <div key={a.id} style={{display:"flex",alignItems:"flex-start",gap:10,background:a.sev==="danger"?C.danger.bg:C.warning.bg,borderRadius:8,padding:"8px 12px",marginBottom:6}}>
          <span style={{fontSize:13}}>{a.flag}</span>
          <div style={{flex:1}}><span style={{fontSize:11,fontWeight:600,color:a.sev==="danger"?C.danger.text:C.warning.text}}>{a.asset} — </span><span style={{fontSize:11,color:a.sev==="danger"?C.danger.text:C.warning.text}}>{a.msg}</span></div>
          <button onClick={()=>setDismissed(d=>[...d,a.id])} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:14,padding:0}}>×</button>
        </div>
      ))}
      {!exp&&<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{vis.slice(0,3).map(a=>(
        <div key={a.id} style={{display:"flex",alignItems:"center",gap:6,background:a.sev==="danger"?C.danger.bg:C.warning.bg,borderRadius:8,padding:"5px 10px"}}>
          <span style={{fontSize:11}}>{a.flag}</span>
          <span style={{fontSize:11,fontWeight:500,color:a.sev==="danger"?C.danger.text:C.warning.text}}>{a.asset}:</span>
          <span style={{fontSize:11,color:a.sev==="danger"?C.danger.text:C.warning.text,maxWidth:260,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.msg}</span>
        </div>
      ))}</div>}
    </div>
  );
}

// ─── QUARTERLY MODAL ──────────────────────────────────────────────────────────
const Q_FIELDS=[
  {key:"period",label:"Period",type:"text",placeholder:"e.g. Q2 2025",required:true},
  {key:"valuation",label:"Valuation (€)",type:"number",placeholder:"e.g. 11500000"},
  {key:"rent",label:"Annual Rent (€)",type:"number",placeholder:"e.g. 730000"},
  {key:"erv",label:"ERV (€/sqm)",type:"number",placeholder:"e.g. 120"},
  {key:"capRate",label:"Cap Rate (%)",type:"number",placeholder:"e.g. 5.2"},
  {key:"walt",label:"WALT (years)",type:"number",placeholder:"e.g. 4.0"},
  {key:"walb",label:"WALB (years)",type:"number",placeholder:"e.g. 2.0"},
  {key:"ltv",label:"LTV (%)",type:"number",placeholder:"e.g. 34.0"},
  {key:"icr",label:"ICR (×)",type:"number",placeholder:"e.g. 1.75"},
  {key:"loanAmount",label:"Loan Amount (€)",type:"number",placeholder:"e.g. 3880000"},
  {key:"creditScore",label:"Credit Score",type:"number",placeholder:"e.g. 82"},
  {key:"creditRating",label:"Credit Rating",type:"text",placeholder:"e.g. A-"},
  {key:"tenantName",label:"Tenant Name",type:"text",placeholder:"carry forward if unchanged"},
];

function QuarterModal({asset,onClose,onSave}) {
  const l=latest(asset);
  const empty=Q_FIELDS.reduce((o,f)=>({...o,[f.key]:""}),{});
  const [form,setForm]=useState(empty);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  function save(){
    if(!form.period.trim()) return;
    const row={...l};
    Q_FIELDS.forEach(f=>{if(form[f.key]!=="") row[f.key]=f.type==="number"?parseFloat(form[f.key]):form[f.key];});
    onSave(asset.id,row); onClose();
  }
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,39,68,0.55)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:C.white,borderRadius:16,padding:28,width:540,maxHeight:"88vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <div style={{fontSize:16,fontWeight:600,color:C.navy}}>{asset.flag} {asset.name} — Quarterly Update</div>
            <div style={{fontSize:12,color:C.muted,marginTop:2}}>Leave any field blank to carry forward the last recorded value</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted,padding:4}}>×</button>
        </div>
        <div style={{background:C.offWhite,borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:12,color:C.body}}>
          <b>Last period:</b> {l.period} · Val: {fmtM(l.valuation)} · Rent: {fmtM(l.rent)} · Cap rate: {l.capRate}% · WALT: {l.walt}y · Credit: {l.creditRating} ({l.creditScore})
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 16px",marginBottom:20}}>
          {Q_FIELDS.map(f=>(
            <div key={f.key} style={f.key==="period"?{gridColumn:"1/-1"}:{}}>
              <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:4}}>{f.label}{f.required&&<span style={{color:C.terra}}> *</span>}</label>
              <input type={f.type} value={form[f.key]} placeholder={f.placeholder} onChange={e=>set(f.key,e.target.value)}
                style={{width:"100%",fontFamily:"inherit",fontSize:13,padding:"7px 10px",borderRadius:7,border:`0.5px solid ${C.border}`,outline:"none",boxSizing:"border-box",color:C.navy}}/>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{fontFamily:"inherit",fontSize:12,padding:"8px 16px",borderRadius:8,border:`1px solid ${C.border}`,background:C.white,color:C.body,cursor:"pointer"}}>Cancel</button>
          <button onClick={save} disabled={!form.period.trim()} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"8px 20px",borderRadius:8,border:"none",background:form.period.trim()?C.terra:"#ccc",color:"#fff",cursor:form.period.trim()?"pointer":"default"}}>Save Period</button>
        </div>
      </div>
    </div>
  );
}

// ─── ADD ASSET MODAL ─────────────────────────────────────────────────────────
const ASSET_FIELDS = [
  {key:"name",       label:"Asset Name",         type:"text",   placeholder:"e.g. Paris Nord",        required:true},
  {key:"city",       label:"City",               type:"text",   placeholder:"e.g. Paris",             required:true},
  {key:"country",    label:"Country Code",       type:"text",   placeholder:"FR / IT / NL / DE",      required:true},
  {key:"gla",        label:"GLA (sqm)",          type:"number", placeholder:"e.g. 12000",             required:true},
  {key:"acquiredDate",label:"Acquisition Period",type:"text",   placeholder:"e.g. Q1 2025",           required:true},
  {key:"acquisitionPrice",label:"Acquisition Price (€)",type:"number",placeholder:"e.g. 9500000",    required:true},
  {key:"capRateEntry",label:"Entry Cap Rate (%)",type:"number", placeholder:"e.g. 5.2",              required:true},
  {key:"annualRentAcquisition",label:"Rent at Acquisition (€/yr)",type:"number",placeholder:"e.g. 480000",required:true},
  {key:"ervAtAcquisition",label:"ERV at Acquisition (€/sqm)",type:"number",placeholder:"e.g. 72",   required:false},
  {key:"tenantName", label:"Tenant Name",        type:"text",   placeholder:"e.g. Amazon EU SARL",   required:true},
  {key:"creditRating",label:"Credit Rating",     type:"text",   placeholder:"e.g. A-",               required:false},
  {key:"creditScore",label:"Credit Score",       type:"number", placeholder:"e.g. 84",               required:false},
  {key:"lender",     label:"Lender",             type:"text",   placeholder:"e.g. BNP Paribas RE or Unlevered", required:false},
  {key:"loanAmount", label:"Loan Amount (€)",    type:"number", placeholder:"e.g. 5200000",          required:false},
  {key:"loanExpiry", label:"Loan Expiry (date)", type:"text",   placeholder:"e.g. 2029-06-30",       required:false},
  {key:"loanMargin", label:"Loan Margin",        type:"text",   placeholder:"e.g. 280bps + E3M",     required:false},
  {key:"covenantLTV",label:"LTV Covenant (%)",   type:"number", placeholder:"e.g. 60",               required:false},
  {key:"covenantICR",label:"ICR Covenant (×)",   type:"number", placeholder:"e.g. 1.4",              required:false},
  {key:"appraiser",  label:"Appraiser",          type:"text",   placeholder:"e.g. CBRE",             required:false},
  {key:"indexation", label:"Indexation",         type:"text",   placeholder:"e.g. 100% ILAT",        required:false},
  {key:"guarantee",  label:"Guarantee",          type:"text",   placeholder:"e.g. 3m rent deposit",  required:false},
  {key:"notes",      label:"Notes",              type:"text",   placeholder:"Free text observations", required:false},
];

const FLAG_MAP = {FR:"🇫🇷",IT:"🇮🇹",NL:"🇳🇱",DE:"🇩🇪",ES:"🇪🇸",BE:"🇧🇪",PL:"🇵🇱",UK:"🇬🇧",GB:"🇬🇧"};

function AddAssetModal({onClose, onSave}) {
  const [step, setStep] = useState("method"); // method | manual | csv-upload | csv-result | confirm
  const [form, setForm] = useState(ASSET_FIELDS.reduce((o,f)=>({...o,[f.key]:""}),{}));
  const [csvState, setCsvState] = useState("idle");
  const [csvResult, setCsvResult] = useState(null);
  const [errors, setErrors] = useState([]);
  const fileRef = useRef();
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  // Sample CSV for new asset
  const DEMO_CSV = `Asset_Name;Ville;Pays;Surface_m2;Date_Acquisition;Prix_Acquisition_EUR;Taux_Capitalisation_Pct;Loyer_Acquisition_EUR;ERV_m2;Locataire;Notation_Credit;Score_Credit;Preteur;Encours_Dette;Echeance_Pret;Marge_Pret;Covenant_LTV;Covenant_ICR;Expert_Valeur;Indexation;Garantie;Notes
Marseille Sud;Marseille;FR;8400;Q1 2025;6800000;5.60;385000;78;XPO Logistics France;BBB+;76;Société Générale;3800000;2029-03-31;310bps + E3M;60;1.40;JLL;100% ILAT;3m rent deposit;Prime location near port. Value-add potential through ESG upgrade.`;

  function downloadDemo() {
    const blob=new Blob([DEMO_CSV],{type:"text/csv"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download="new_asset_demo.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCsv(e) {
    const file=e.target.files[0]; if(!file) return;
    setCsvState("parsing");
    const text=await file.text();
    try {
      const prompt=`You are a real estate analyst. Extract new asset data from this CSV. Column names may be in any language or format.

Fields to extract:
name(asset name), city, country(2-letter code), gla(sqm), acquiredDate(e.g. Q1 2025), acquisitionPrice(€), capRateEntry(%), annualRentAcquisition(€/yr), ervAtAcquisition(€/sqm), tenantName, creditRating, creditScore(0-100), lender, loanAmount(€), loanExpiry(date), loanMargin, covenantLTV(%), covenantICR(×), appraiser, indexation, guarantee, notes.

CSV:
${text.slice(0,4000)}

Respond ONLY with raw JSON:
{"mapped":{...},"columnMappings":{"original":"fieldName",...},"missing":[...],"summary":"1-2 sentences"}`;
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const d=await res.json();
      const parsed=JSON.parse(d.content[0].text.replace(/```json|```/g,"").trim());
      // Populate form with mapped values
      const m=parsed.mapped||{};
      const numFields=["gla","acquisitionPrice","capRateEntry","annualRentAcquisition","ervAtAcquisition","creditScore","loanAmount","covenantLTV","covenantICR"];
      const newForm={...form};
      Object.entries(m).forEach(([k,v])=>{if(v!=null&&k in newForm){newForm[k]=numFields.includes(k)?String(v):String(v);}});
      setForm(newForm);
      setCsvResult(parsed); setCsvState("done");
    } catch { setCsvState("error"); }
    e.target.value="";
  }

  function applyCsvAndContinue() { setStep("confirm"); }

  function validate() {
    const req=ASSET_FIELDS.filter(f=>f.required).map(f=>f.key);
    const missing=req.filter(k=>!form[k]||form[k].toString().trim()==="");
    setErrors(missing); return missing.length===0;
  }

  function buildNewAsset() {
    const flag=FLAG_MAP[form.country?.toUpperCase()]||"🏢";
    const numFields=["gla","acquisitionPrice","capRateEntry","annualRentAcquisition","ervAtAcquisition","creditScore","loanAmount","covenantLTV","covenantICR"];
    const parsed={};
    ASSET_FIELDS.forEach(f=>{
      const v=form[f.key];
      if(v===""||v==null) parsed[f.key]=null;
      else parsed[f.key]=numFields.includes(f.key)?parseFloat(v):v;
    });
    return {
      id: Date.now(),
      name: parsed.name, city: parsed.city, country: parsed.country?.toUpperCase()||"",
      flag, gla: parsed.gla||0, acquiredDate: parsed.acquiredDate,
      acquisitionPrice: parsed.acquisitionPrice||0,
      capRateEntry: parsed.capRateEntry||0,
      annualRentAcquisition: parsed.annualRentAcquisition||0,
      ervAtAcquisition: parsed.ervAtAcquisition||0,
      lender: parsed.lender||"Unlevered",
      loanExpiry: parsed.loanExpiry||null,
      loanMargin: parsed.loanMargin||"N/A",
      covenantLTV: parsed.covenantLTV||null,
      covenantICR: parsed.covenantICR||null,
      appraiser: parsed.appraiser||"",
      indexation: parsed.indexation||"",
      guarantee: parsed.guarantee||"",
      leaseLink:"#", notes: parsed.notes||"",
      quarters:[{
        period: parsed.acquiredDate||"Entry",
        valuation: parsed.acquisitionPrice||0,
        rent: parsed.annualRentAcquisition||0,
        erv: parsed.ervAtAcquisition||0,
        capRate: parsed.capRateEntry||0,
        walt:0, walb:0,
        ltv: parsed.loanAmount&&parsed.acquisitionPrice?(parsed.loanAmount/parsed.acquisitionPrice*100):0,
        icr:null,
        creditScore: parsed.creditScore||0,
        creditRating: parsed.creditRating||"N/A",
        tenantName: parsed.tenantName||"",
        loanAmount: parsed.loanAmount||0,
      }],
    };
  }

  function handleSave() {
    if(!validate()) return;
    onSave(buildNewAsset());
    onClose();
  }

  // ── STEP: METHOD ──
  if(step==="method") return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,39,68,0.55)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:C.white,borderRadius:16,padding:32,width:520}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
          <div>
            <div style={{fontSize:17,fontWeight:600,color:C.navy,marginBottom:4}}>Add New Asset</div>
            <div style={{fontSize:12,color:C.muted}}>Choose how to enter the initial data</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted,padding:4}}>×</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[
            {id:"manual", icon:"✏️", title:"Manual entry", desc:"Fill in a structured form field by field. Best when you have the data to hand."},
            {id:"csv-upload", icon:"✦", title:"AI CSV import", desc:"Upload any CSV — any column names, any language. Claude interprets and maps the fields automatically."},
          ].map(opt=>(
            <button key={opt.id} onClick={()=>setStep(opt.id)}
              style={{fontFamily:"inherit",display:"flex",alignItems:"flex-start",gap:14,padding:"14px 18px",borderRadius:10,border:`0.5px solid ${C.border}`,background:C.white,cursor:"pointer",textAlign:"left",transition:"background 0.12s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
              onMouseLeave={e=>e.currentTarget.style.background=C.white}>
              <span style={{fontSize:20,marginTop:1}}>{opt.icon}</span>
              <div>
                <div style={{fontSize:13,fontWeight:500,color:C.navy,marginBottom:3}}>{opt.title}</div>
                <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{marginTop:20,paddingTop:16,borderTop:`0.5px solid ${C.border}`,display:"flex",justifyContent:"center"}}>
          <button onClick={downloadDemo} style={{fontFamily:"inherit",fontSize:11,padding:"5px 12px",borderRadius:7,border:`0.5px solid ${C.border}`,background:C.white,color:C.muted,cursor:"pointer"}}>↓ Download sample CSV</button>
        </div>
      </div>
    </div>
  );

  // ── STEP: CSV UPLOAD ──
  if(step==="csv-upload") return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,39,68,0.55)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:C.white,borderRadius:16,padding:28,width:560,maxHeight:"85vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div>
            <div style={{fontSize:16,fontWeight:600,color:C.navy,marginBottom:2}}>✦ AI CSV Import</div>
            <div style={{fontSize:12,color:C.muted}}>Upload a CSV in any format — Claude will interpret the columns</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted,padding:4}}>×</button>
        </div>

        {csvState==="idle"&&(
          <>
            <div style={{background:C.terraLight,border:`0.5px solid #e8c4a8`,borderRadius:10,padding:"14px 18px",marginBottom:18,display:"flex",gap:12}}>
              <span style={{fontSize:18}}>✦</span>
              <div style={{fontSize:12,color:C.terraDark,lineHeight:1.6}}>Claude reads your CSV headers — even in French, Italian, Dutch or any other format — and maps them to the asset data model. Non-standard names like <i>Prix_Acquisition_EUR</i> or <i>Tasso_Capitalizzazione</i> are handled automatically.</div>
            </div>
            <input ref={fileRef} type="file" accept=".csv" style={{display:"none"}} onChange={handleCsv}/>
            <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:14}}>
              <button onClick={downloadDemo} style={{fontFamily:"inherit",fontSize:11,padding:"6px 12px",borderRadius:8,border:`0.5px solid ${C.border}`,background:C.white,color:C.muted,cursor:"pointer"}}>↓ Sample CSV</button>
              <button onClick={()=>fileRef.current.click()} style={{fontFamily:"inherit",fontSize:13,fontWeight:500,padding:"9px 22px",borderRadius:8,border:"none",background:C.terra,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><span>✦</span> Upload CSV</button>
            </div>
            <div style={{textAlign:"center"}}>
              <button onClick={()=>setStep("method")} style={{fontFamily:"inherit",fontSize:12,background:"none",border:"none",color:C.muted,cursor:"pointer"}}>← Back</button>
            </div>
          </>
        )}

        {csvState==="parsing"&&(
          <div style={{background:C.info.bg,borderRadius:10,padding:"16px 18px"}}>
            <div style={{fontSize:13,fontWeight:600,color:C.info.text,marginBottom:10,display:"flex",alignItems:"center",gap:8}}><span>✦</span> Claude is reading your CSV…</div>
            {["Parsing column headers","Detecting language and naming conventions","Mapping to asset data model","Identifying missing fields"].map((s,i)=>(
              <div key={i} style={{fontSize:12,color:C.info.text,padding:"3px 0",display:"flex",gap:8}}><span style={{opacity:0.6}}>→</span>{s}</div>
            ))}
          </div>
        )}

        {csvState==="error"&&<div style={{background:C.danger.bg,borderRadius:10,padding:"12px 18px",fontSize:12,color:C.danger.text}}>Could not parse CSV. Check the file format and try again.</div>}

        {csvState==="done"&&csvResult&&(
          <>
            <div style={{background:C.white,border:`0.5px solid ${C.border}`,borderRadius:10,padding:"16px 18px",marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{color:C.terra}}>✦</span>
                <span style={{fontSize:13,fontWeight:600,color:C.navy}}>AI Interpretation Complete</span>
                <Badge scheme="accent">Claude</Badge>
              </div>
              <div style={{fontSize:12,color:C.body,marginBottom:12}}>{csvResult.summary}</div>
              {csvResult.columnMappings&&(
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",color:C.muted,marginBottom:8}}>Column interpretation</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"4px 10px",alignItems:"center"}}>
                    {Object.entries(csvResult.columnMappings).slice(0,8).map(([orig,mapped])=>(
                      <>
                        <div key={`o-${orig}`} style={{fontSize:11,fontFamily:"monospace",background:C.offWhite,padding:"3px 8px",borderRadius:4,color:C.body}}>{orig}</div>
                        <div key={`a-${orig}`} style={{fontSize:12,color:C.terra,textAlign:"center"}}>→</div>
                        <div key={`m-${orig}`} style={{fontSize:11,fontWeight:500,color:C.navy}}>{mapped}</div>
                      </>
                    ))}
                  </div>
                </div>
              )}
              {(csvResult.missing||[]).length>0&&(
                <div>
                  <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",color:C.muted,marginBottom:6}}>Missing — will need manual entry</div>
                  {csvResult.missing.map(k=><div key={k} style={{fontSize:11,color:C.warning.text,padding:"2px 0"}}>⚠ {k}</div>)}
                </div>
              )}
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>{setCsvState("idle");setCsvResult(null);}} style={{fontFamily:"inherit",fontSize:12,padding:"7px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:C.white,color:C.body,cursor:"pointer"}}>Try another file</button>
              <button onClick={applyCsvAndContinue} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"7px 18px",borderRadius:8,border:"none",background:C.terra,color:"#fff",cursor:"pointer"}}>Continue to review →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ── STEP: MANUAL or CONFIRM (shared form) ──
  const isConfirm = step==="confirm";
  const reqFields = ASSET_FIELDS.filter(f=>f.required);
  const optFields = ASSET_FIELDS.filter(f=>!f.required);

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,39,68,0.55)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:C.white,borderRadius:16,padding:28,width:600,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
          <div>
            <div style={{fontSize:16,fontWeight:600,color:C.navy,marginBottom:2}}>{isConfirm?"Review & Confirm":"New Asset — Manual Entry"}</div>
            <div style={{fontSize:12,color:C.muted}}>{isConfirm?"Check all fields before saving. Blank optional fields will be added via Q Update later.":"Fields marked * are required to create the asset."}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted,padding:4}}>×</button>
        </div>

        {errors.length>0&&(
          <div style={{background:C.danger.bg,borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:12,color:C.danger.text}}>
            ⚠ Required fields missing: {errors.join(", ")}
          </div>
        )}

        <div style={{marginBottom:14,marginTop:14}}>
          <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",color:C.muted,marginBottom:10}}>Required fields</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 16px"}}>
            {reqFields.map(f=>(
              <div key={f.key} style={f.key==="name"||f.key==="notes"?{gridColumn:"1/-1"}:{}}>
                <label style={{fontSize:11,color:errors.includes(f.key)?C.danger.text:C.muted,display:"block",marginBottom:4}}>{f.label} <span style={{color:C.terra}}>*</span></label>
                <input type={f.type} value={form[f.key]} placeholder={f.placeholder} onChange={e=>set(f.key,e.target.value)}
                  style={{width:"100%",fontFamily:"inherit",fontSize:13,padding:"7px 10px",borderRadius:7,border:`0.5px solid ${errors.includes(f.key)?C.danger.text:C.border}`,outline:"none",boxSizing:"border-box",color:C.navy}}/>
              </div>
            ))}
          </div>
        </div>

        <div style={{borderTop:`0.5px solid ${C.border}`,paddingTop:14,marginBottom:18}}>
          <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",color:C.muted,marginBottom:10}}>Optional fields <span style={{fontWeight:400,textTransform:"none",letterSpacing:0}}>(can be added via Q Update later)</span></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 16px"}}>
            {optFields.map(f=>(
              <div key={f.key} style={f.key==="notes"?{gridColumn:"1/-1"}:{}}>
                <label style={{fontSize:11,color:C.muted,display:"block",marginBottom:4}}>{f.label}</label>
                <input type={f.type} value={form[f.key]||""} placeholder={f.placeholder} onChange={e=>set(f.key,e.target.value)}
                  style={{width:"100%",fontFamily:"inherit",fontSize:13,padding:"7px 10px",borderRadius:7,border:`0.5px solid ${C.border}`,outline:"none",boxSizing:"border-box",color:C.navy}}/>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"flex",gap:8,justifyContent:"space-between",alignItems:"center"}}>
          <button onClick={()=>setStep("method")} style={{fontFamily:"inherit",fontSize:12,background:"none",border:"none",color:C.muted,cursor:"pointer"}}>← Back</button>
          <div style={{display:"flex",gap:8}}>
            <button onClick={onClose} style={{fontFamily:"inherit",fontSize:12,padding:"8px 16px",borderRadius:8,border:`1px solid ${C.border}`,background:C.white,color:C.body,cursor:"pointer"}}>Cancel</button>
            <button onClick={handleSave} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"8px 22px",borderRadius:8,border:"none",background:C.terra,color:"#fff",cursor:"pointer"}}>Save Asset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COMMAND CENTRE ───────────────────────────────────────────────────────────
function CommandCentre({assets,onSelectAsset,onAddUpdate,onAddAsset}) {
  const [expandedId,setExpandedId]=useState(null);
  const totalGAV=assets.reduce((s,a)=>s+latest(a).valuation,0);
  const totalRent=assets.reduce((s,a)=>s+latest(a).rent,0);
  const totalDebt=assets.reduce((s,a)=>s+latest(a).loanAmount,0);
  const portWalt=assets.reduce((s,a)=>s+latest(a).walt*(latest(a).valuation/totalGAV),0);

  // Build aggregated portfolio time series across all assets
  // Collect all unique periods, sorted by first asset's period order as proxy
  const allPeriods = [...new Set(assets.flatMap(a=>a.quarters.map(q=>q.period)))];
  // Sort periods chronologically using a simple year+quarter key
  const periodSort = p => {
    const m = p.match(/Q(\d)\s*(\d{4})/);
    return m ? parseInt(m[2])*10+parseInt(m[1]) : 0;
  };
  allPeriods.sort((a,b)=>periodSort(a)-periodSort(b));

  // For each period, sum valuation + rent, weighted avg credit score
  const portTimeSeries = allPeriods.map(period=>{
    let sumVal=0, sumRent=0, wScore=0, wTotal=0, wWalt=0;
    assets.forEach(a=>{
      // Find the most recent quarter at or before this period
      const sorted=[...a.quarters].filter(q=>periodSort(q.period)<=periodSort(period));
      if(!sorted.length) return;
      const q=sorted[sorted.length-1];
      sumVal+=q.valuation;
      sumRent+=q.rent;
      if(q.creditScore){wScore+=q.creditScore*q.valuation;wTotal+=q.valuation;}
      if(q.walt){wWalt+=q.walt*q.valuation;}
    });
    return {period, valuation:sumVal, rent:sumRent, creditScore:wTotal>0?wScore/wTotal:0, walt:sumVal>0?wWalt/sumVal:0};
  }).filter(d=>d.valuation>0);

  const portValData   = portTimeSeries.map(d=>({v:d.valuation,   label:d.period}));
  const portRentData  = portTimeSeries.map(d=>({v:d.rent,        label:d.period}));
  const portCreditData= portTimeSeries.map(d=>({v:d.creditScore, label:d.period}));
  const portWaltData  = portTimeSeries.map(d=>({v:d.walt,        label:d.period}));

  return (
    <div style={{padding:"28px 32px"}}>
      <Eyebrow>Portfolio Summary</Eyebrow>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        <MetricCard label="Portfolio GAV" value={fmtM(totalGAV)} sub={`${assets.length} assets · 3 countries`}/>
        <MetricCard label="Total Gross Rent" value={fmtM(totalRent)} sub="per annum"/>
        <MetricCard label="Total Debt" value={fmtM(totalDebt)} sub={`Portfolio LTV: ${((totalDebt/totalGAV)*100).toFixed(1)}%`}/>
        <MetricCard label="Portfolio WALT" value={`${portWalt.toFixed(1)}y`} sub="valuation-weighted"/>
      </div>

      {/* Portfolio trend charts */}
      {portTimeSeries.length>=2&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
          <ChartCard title="Portfolio GAV" data={portValData} color={C.terra} fmtFn={fmtM}/>
          <ChartCard title="Portfolio Gross Rent" data={portRentData} color="#4a7c9e" fmtFn={fmtM}/>
          <ChartCard title="Portfolio WALT" data={portWaltData} color="#3a8c6e" fmtFn={v=>`${v.toFixed(1)}y`} note="↓ = lease shortening"/>
          <ChartCard title="Avg. Credit Score" data={portCreditData} color="#6b5ea8" fmtFn={v=>`${v.toFixed(0)}/100`} note="↓ = deterioration"/>
        </div>
      )}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <Eyebrow>Asset Overview — click row to expand</Eyebrow>
        <button onClick={onAddAsset} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"6px 14px",borderRadius:8,border:"none",background:C.terra,color:"#fff",cursor:"pointer",marginBottom:10}}>+ Add Asset</button>
      </div>
      <div style={{border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
        {/* Header */}
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 32px",padding:"8px 18px",background:C.offWhite,borderBottom:`0.5px solid ${C.border}`}}>
          {["Asset / Tenant","Valuation","Annual Rent","Cap Rate","WALT / WALB",""].map((h,i)=>(
            <div key={i} style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em"}}>{h}</div>
          ))}
        </div>

        {assets.map((a,idx)=>{
          const l=latest(a),h=healthOf(a);
          const hc=h==="ok"?C.success:h==="warning"?C.warning:C.danger;
          const isOpen=expandedId===a.id;
          const valD=delta(l.valuation,a.acquisitionPrice);
          const rentD=delta(l.rent,a.annualRentAcquisition);
          const capD=(l.capRate-a.capRateEntry);
          const today=new Date("2025-12-31");
          const loanMo=a.loanExpiry?(new Date(a.loanExpiry)-today)/(1000*60*60*24*30.4):null;
          const prevQ=a.quarters.length>=2?a.quarters[a.quarters.length-2]:null;
          const creditDiff=prevQ?l.creditScore-prevQ.creditScore:null;
          const creditTrendEl=prevQ?(
            <div style={{fontSize:11,marginTop:2,color:creditDiff<0?C.danger.text:creditDiff>0?C.success.text:C.muted}}>
              {creditDiff<0?`↓ ${Math.abs(creditDiff)}pts since ${prevQ.period}`:creditDiff>0?`↑ ${creditDiff}pts since ${prevQ.period}`:"→ Stable"}
            </div>
          ):null;
          return (
            <div key={a.id} style={{borderBottom:idx<assets.length-1?`0.5px solid ${C.border}`:"none"}}>
              {/* Summary row */}
              <div onClick={()=>setExpandedId(isOpen?null:a.id)}
                style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 32px",padding:"14px 18px",cursor:"pointer",background:isOpen?C.offWhite:C.white,transition:"background 0.12s"}}
                onMouseEnter={e=>{if(!isOpen)e.currentTarget.style.background=C.offWhite;}}
                onMouseLeave={e=>{if(!isOpen)e.currentTarget.style.background=C.white;}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:hc.text,flexShrink:0}}/>
                    <span style={{fontSize:14,fontWeight:500,color:C.navy}}>{a.flag} {a.name}</span>
                    <Badge scheme={h==="ok"?"success":h==="warning"?"warning":"danger"}>{h==="ok"?"Clean":h==="warning"?"Watch":"Flag"}</Badge>
                  </div>
                  <div style={{fontSize:11,color:C.muted,paddingLeft:16}}>{l.tenantName} · <span style={{color:ratingColor(l.creditRating),fontWeight:500}}>{l.creditRating}</span> · {a.gla.toLocaleString()} sqm</div>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:C.navy}}>{fmtM(l.valuation)}</div>
                  <div style={{fontSize:11,marginTop:2}}><DeltaChip value={valD}/><span style={{color:C.muted,fontSize:10,marginLeft:4}}>vs acq.</span></div>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:C.navy}}>{fmtM(l.rent)}</div>
                  <div style={{fontSize:11,marginTop:2}}><DeltaChip value={rentD}/><span style={{color:C.muted,fontSize:10,marginLeft:4}}>vs acq.</span></div>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:C.navy}}>{l.capRate.toFixed(2)}%</div>
                  <div style={{fontSize:11,marginTop:2,color:capD>0?C.warning.text:C.success.text}}>{capD>0?"+":""}{(capD*100).toFixed(0)}bps <span style={{color:C.muted,fontSize:10}}>vs entry</span></div>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:l.walt<3?C.danger.text:l.walt<4?C.warning.text:C.navy}}>{l.walt.toFixed(1)}y / {l.walb.toFixed(1)}y</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:2}}>WALT / WALB</div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",color:C.muted,fontSize:14,transition:"transform 0.2s",transform:isOpen?"rotate(180deg)":"none"}}>▾</div>
              </div>

              {/* Expanded panel */}
              {isOpen&&(
                <div style={{background:C.offWhite,borderTop:`0.5px solid ${C.border}`,padding:"18px 18px 18px 34px"}}>
                  {/* 4 detail cards */}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
                    <div style={{background:C.white,borderRadius:10,padding:"10px 14px",border:`0.5px solid ${C.border}`}}>
                      <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>Financing</div>
                      <div style={{fontSize:13,fontWeight:600,color:C.navy}}>{l.loanAmount>0?`LTV ${l.ltv.toFixed(1)}%`:"Unlevered"}</div>
                      {l.icr!=null&&<div style={{fontSize:12,marginTop:2,color:a.covenantICR&&(l.icr-a.covenantICR)/a.covenantICR<0.15?C.warning.text:C.body}}>ICR {fmtX(l.icr)}{a.covenantICR?` (cov >${a.covenantICR}×)`:""}</div>}
                      {loanMo!=null&&<div style={{fontSize:11,marginTop:4,color:loanMo<6?C.danger.text:loanMo<12?C.warning.text:C.muted}}>Matures {a.loanExpiry?.slice(0,7)} ({Math.round(loanMo)}m)</div>}
                    </div>
                    <div style={{background:C.white,borderRadius:10,padding:"10px 14px",border:`0.5px solid ${C.border}`}}>
                      <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>Return (at FMV)</div>
                      <div style={{fontSize:13,fontWeight:600,color:C.terra}}>MOIC {(l.valuation/a.acquisitionPrice).toFixed(2)}×</div>
                      <div style={{fontSize:12,color:C.body,marginTop:2}}>Val: <DeltaChip value={valD}/> · Rent: <DeltaChip value={rentD}/></div>
                    </div>
                    <div style={{background:C.white,borderRadius:10,padding:"10px 14px",border:`0.5px solid ${C.border}`}}>
                      <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>ERV</div>
                      <div style={{fontSize:13,fontWeight:600,color:C.navy}}>€{l.erv}/sqm</div>
                      <div style={{fontSize:12,color:C.body,marginTop:2}}>Entry: €{a.ervAtAcquisition} · <DeltaChip value={delta(l.erv,a.ervAtAcquisition)}/></div>
                    </div>
                    <div style={{background:C.white,borderRadius:10,padding:"10px 14px",border:`0.5px solid ${C.border}`}}>
                      <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>Tenant Credit</div>
                      <div style={{fontSize:13,fontWeight:600,color:ratingColor(l.creditRating)}}>{l.creditRating} <span style={{fontSize:11,color:C.muted,fontWeight:400}}>({l.creditScore}/100)</span></div>
                      {creditTrendEl}
                    </div>
                  </div>
                  {/* 3 mini sparklines */}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
                    {[
                      {label:"Valuation",data:a.quarters.map(q=>({v:q.valuation,label:q.period})),color:C.terra,fmtFn:fmtM},
                      {label:"Rent",data:a.quarters.map(q=>({v:q.rent,label:q.period})),color:"#4a7c9e",fmtFn:fmtM},
                      {label:"Credit score",data:a.quarters.map(q=>({v:q.creditScore,label:q.period})),color:"#6b5ea8",fmtFn:v=>`${v}/100`},
                    ].map(({label,data,color,fmtFn})=>(
                      <div key={label} style={{background:C.white,borderRadius:8,padding:"10px 12px",border:`0.5px solid ${C.border}`}}>
                        <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>{label}</div>
                        <LineChart data={data} color={color} height={50} fmtFn={fmtFn}/>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>onSelectAsset(a)} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"7px 16px",borderRadius:8,border:"none",background:C.terra,color:"#fff",cursor:"pointer"}}>Open Asset →</button>
                    <button onClick={()=>onAddUpdate(a)} style={{fontFamily:"inherit",fontSize:12,padding:"7px 14px",borderRadius:8,border:`1.5px solid ${C.terra}`,background:C.white,color:C.terra,cursor:"pointer"}}>+ Q Update</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PRE-GENERATED NEWS ───────────────────────────────────────────────────────
const NEWS_DATA = {
  portfolio: [
    {cat:"Logistics RE Market",date:"Dec 2024",headline:"European logistics vacancy edges up to 4.8% as new supply outpaces absorption",source:"JLL European Research",relevance:"Affects yield assumptions across all five assets. Cap rate expansion risk remains elevated in NL and FR.",flag:"warning"},
    {cat:"Macro / Rates",date:"Dec 2024",headline:"ECB holds rates at 3.15% — first pause after six consecutive cuts since Sept 2024",source:"ECB Press Release",relevance:"Euribor stabilisation reduces refinancing cost uncertainty for Milan Est and Rotterdam Gate facilities.",flag:"info"},
    {cat:"Regulatory / Policy",date:"Nov 2024",headline:"EU Carbon Border Adjustment Mechanism tightens ESG disclosure requirements for real assets",source:"European Commission",relevance:"EPC upgrade requirements now mandatory for assets seeking refinancing from major lenders. Affects Bordeaux Sud and Milan Est.",flag:"warning"},
    {cat:"Logistics RE Market",date:"Nov 2024",headline:"Prime logistics rents in Paris region stable at €62/sqm — Lyon shows modest +2% YoY",source:"CBRE European Logistics Outlook",relevance:"Supports ERV assumptions at Lyon Nord. No material reversion risk at current passing rent levels.",flag:"info"},
    {cat:"Macro / Rates",date:"Oct 2024",headline:"Euribor 3M settles at 2.9% following ECB rate path revision",source:"Bloomberg / ECB",relevance:"Reduces all-in cost of debt for floating-rate facilities. Lyon Nord (260bps + E3M) benefits most.",flag:"success"},
  ],
  1: [ // Lyon Nord — Renault Trucks SAS
    {cat:"Tenant News",date:"Dec 2024",headline:"Renault Trucks reports Q3 operating margin of 6.2% — in line with FY guidance",source:"Renault Group IR",relevance:"No deterioration in standalone financials. A- credit profile remains stable.",flag:"info"},
    {cat:"Tenant News",date:"Nov 2024",headline:"Renault Trucks awarded €380m French army logistics contract — largest in 10 years",source:"Les Echos",relevance:"Contract secures logistics network demand through 2031. Positive for lease renewal probability at Lyon Nord.",flag:"success"},
    {cat:"Country — FR",date:"Nov 2024",headline:"French industrial vacancy rate rises to 5.2% in Lyon metropolitan area",source:"BNP Paribas Real Estate France",relevance:"Broader market softening but Lyon Nord remains well-located. ERV headroom limited near-term.",flag:"warning"},
    {cat:"Tenant News",date:"Oct 2024",headline:"Renault Group announces EV transition plan — Trucks division to remain combustion-focused through 2030",source:"Renault Group Press",relevance:"Reduces operational disruption risk. Logistics network investment likely to continue at current scale.",flag:"success"},
    {cat:"Logistics RE Market",date:"Oct 2024",headline:"ILAT index Q3 2024 published — +1.8% YoY, below H1 pace",source:"INSEE / CBRE",relevance:"Indexation uplift at Lyon Nord will be lower than prior year. Rent growth moderating.",flag:"info"},
  ],
  2: [ // Milan Est — DHL Supply Chain
    {cat:"Tenant News",date:"Dec 2024",headline:"DHL Group FY2024 guidance reiterated — EBIT €6.2bn, logistics volumes recovering in H2",source:"DHL Group IR",relevance:"AA- credit profile reaffirmed. No covenant risk at Milan Est.",flag:"success"},
    {cat:"Country — IT",date:"Dec 2024",headline:"Northern Italy logistics take-up reaches 2.1m sqm in 2024 — second strongest year on record",source:"Colliers Italy",relevance:"Strong occupier demand supports ERV at current levels. Re-letting risk low if DHL exercises 2028 break.",flag:"success"},
    {cat:"Tenant News",date:"Nov 2024",headline:"DHL Supply Chain expands Italian network — new hub in Piacenza, 450 new hires",source:"Corriere della Sera",relevance:"Network expansion confirms long-term Italian logistics commitment. Positive for lease renewal prospects.",flag:"success"},
    {cat:"Regulatory / Policy",date:"Nov 2024",headline:"Italy extends PNRR logistics infrastructure funding to 2026 — €1.4bn earmarked for northern hubs",source:"Ministero delle Infrastrutture",relevance:"Policy tailwind for logistics asset values in Lombardia corridor.",flag:"info"},
    {cat:"Macro / Rates",date:"Oct 2024",headline:"BNP Paribas RE publishes 2025 Italian logistics debt outlook — refinancing conditions improving",source:"BNP Paribas Real Estate",relevance:"Relevant to Milan Est refinancing process (Dec 2026 maturity). Lender appetite for quality assets remains strong.",flag:"info"},
  ],
  3: [ // Rotterdam Gate — Geodis BV
    {cat:"Tenant News",date:"Dec 2024",headline:"Geodis parent SNCF Logistics reports €180m H1 operating loss — restructuring programme confirmed",source:"SNCF Logistics IR",relevance:"Parent company financial stress increases subsidiary risk. Geodis BV break option (Jan 2026) becomes more likely to be exercised.",flag:"danger"},
    {cat:"Tenant News",date:"Nov 2024",headline:"Geodis announces 12% global workforce reduction — European operations most affected",source:"Reuters",relevance:"Direct operational risk. Rotterdam Gate exposure is material — begin lease renewal dialogue immediately.",flag:"danger"},
    {cat:"Country — NL",date:"Nov 2024",headline:"Rotterdam logistics vacancy rises to 6.1% — highest since 2020 as new supply delivers",source:"JLL Netherlands",relevance:"Re-letting risk elevated if Geodis exits. Target ERV of €88/sqm may require discount in current market.",flag:"warning"},
    {cat:"Macro / Rates",date:"Oct 2024",headline:"ABN AMRO Q3 results — real estate lending book stable, no covenant enforcement activity reported",source:"ABN AMRO IR",relevance:"Lender relationship risk low. Extension facility discussion should be constructive.",flag:"info"},
    {cat:"Logistics RE Market",date:"Oct 2024",headline:"Port of Rotterdam throughput -3.2% YoY — container volumes recovering but below 2022 peak",source:"Port of Rotterdam Authority",relevance:"Macro headwind for logistics occupiers near the port. Consistent with Geodis volume softness.",flag:"warning"},
  ],
  4: [ // Bordeaux Sud — Kuehne+Nagel SAS
    {cat:"Tenant News",date:"Dec 2024",headline:"Kuehne+Nagel FY2024 operating profit CHF 1.6bn — France contract logistics division grows 4%",source:"Kuehne+Nagel IR",relevance:"Stable financials. A rating and 87/100 credit score well-supported.",flag:"success"},
    {cat:"Country — FR",date:"Nov 2024",headline:"Bordeaux metropolitan logistics market — vacancy stable at 3.8%, limited new supply pipeline",source:"Knight Frank France",relevance:"Tight supply supports ERV stability. Low re-letting risk at lease expiry.",flag:"success"},
    {cat:"Regulatory / Policy",date:"Nov 2024",headline:"ZAN (Zéro Artificialisation Nette) law enforcement tightens in Gironde — new logistics permits restricted",source:"Préfecture de la Gironde",relevance:"Limits new competing supply near Bordeaux Sud. Scarcity value of existing assets increases.",flag:"success"},
    {cat:"Tenant News",date:"Oct 2024",headline:"Kuehne+Nagel expands FNAC Darty contract in France — Bordeaux hub to serve South-West operations",source:"Kuehne+Nagel Press",relevance:"Confirms operational importance of Bordeaux Sud location. Renewal probability at 2028 break option very high.",flag:"success"},
    {cat:"Logistics RE Market",date:"Oct 2024",headline:"ILAT indexation Q3 2024 — +1.8% YoY. Applies to Bordeaux Sud lease",source:"INSEE",relevance:"Modest uplift at next indexation review. Passes through fully under 100% ILAT clause.",flag:"info"},
  ],
  5: [ // Turin Ovest — Arvato SCM
    {cat:"Tenant News",date:"Dec 2024",headline:"Bertelsmann Group posts €320m H1 net loss — Services division (Arvato) absorbs majority of provisions",source:"Bertelsmann IR",relevance:"Parent company under pressure. Parent guarantee enforceability review is now urgent.",flag:"danger"},
    {cat:"Tenant News",date:"Nov 2024",headline:"Arvato SCM restructures Italian operations — Turin and Milan facilities placed under review",source:"Il Sole 24 Ore",relevance:"Direct asset risk. Turin Ovest facility explicitly mentioned. Tenant may seek to renegotiate or exit.",flag:"danger"},
    {cat:"Tenant News",date:"Nov 2024",headline:"Arvato credit score downgraded to 58/100 (B+) — fourth consecutive quarterly decline",source:"D&B / Creditsafe",relevance:"Consistent with internal monitoring. Trajectory suggests sub-50 score within two quarters.",flag:"danger"},
    {cat:"Country — IT",date:"Oct 2024",headline:"Turin industrial/logistics market — vacancy at 7.4%, above national average",source:"Colliers Italy",relevance:"Re-letting would be challenging. Target re-letting timeline 12–18 months with ERV discount likely.",flag:"warning"},
    {cat:"Regulatory / Policy",date:"Oct 2024",headline:"Piedmont region announces €60m logistics infrastructure incentive — targeting green warehousing",source:"Regione Piemonte",relevance:"ESG upgrade at Turin Ovest could attract incentive funding and improve re-letting prospects.",flag:"info"},
  ],
};

const CAT_COLORS = {
  "Tenant News":       {bg:"#E8EDF3", text:"#0F2744"},
  "Logistics RE Market":{bg:"#E8F5EE", text:"#1a6b3a"},
  "Macro / Rates":     {bg:"#F2F0EC", text:"#555555"},
  "Regulatory / Policy":{bg:C.terraLight, text:C.terraDark},
  "Country — FR":      {bg:"#EEF2FF", text:"#3730a3"},
  "Country — IT":      {bg:"#FFF0F0", text:"#7a1a1a"},
  "Country — NL":      {bg:"#F0FFF4", text:"#1a6b3a"},
};

const FLAG_SCHEME = {danger:"danger", warning:"warning", success:"success", info:"info"};

// ─── MARKET INTELLIGENCE TAB ──────────────────────────────────────────────────
function MarketIntelligence({assets, selectedAsset}) {
  const [scope, setScope] = useState("portfolio"); // "portfolio" | asset id
  const [displayed, setDisplayed] = useState(null); // null = not yet generated
  const [streaming, setStreaming] = useState(false);
  const streamRef = useRef(null);

  function getItems() {
    if (scope === "portfolio") return NEWS_DATA.portfolio;
    const id = parseInt(scope);
    return NEWS_DATA[id] || [];
  }

  function streamIn() {
    if (streamRef.current) clearInterval(streamRef.current);
    setDisplayed([]); setStreaming(true);
    const items = getItems();
    let i = 0;
    streamRef.current = setInterval(() => {
      i++;
      setDisplayed(items.slice(0, i));
      if (i >= items.length) { clearInterval(streamRef.current); setStreaming(false); }
    }, 220);
  }

  function reset() {
    if (streamRef.current) clearInterval(streamRef.current);
    setDisplayed(null); setStreaming(false);
  }

  const items = getItems();
  const dangers = displayed ? displayed.filter(n => n.flag === "danger") : items.filter(n => n.flag === "danger");

  return (
    <div>
      {/* Demo notice */}
      <div style={{background:C.offWhite,border:`0.5px solid ${C.border}`,borderRadius:10,padding:"10px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:15}}>🔑</span>
        <div style={{flex:1}}>
          <span style={{fontSize:12,fontWeight:500,color:C.navy}}>Demo mode — pre-generated news. </span>
          <span style={{fontSize:12,color:C.body}}>Connect a Claude API key with web search to enable live intelligence pulled from trusted sources.</span>
        </div>
        <Badge scheme="info">Claude API</Badge>
      </div>

      {/* Scope selector + refresh */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em"}}>Scope</div>
        <select value={scope} onChange={e=>{setScope(e.target.value);reset();}}
          style={{fontFamily:"inherit",fontSize:13,padding:"6px 12px",borderRadius:8,border:`0.5px solid ${C.border}`,background:C.white,color:C.navy,cursor:"pointer"}}>
          <option value="portfolio">Full Portfolio</option>
          {assets.map(a=><option key={a.id} value={a.id}>{a.flag} {a.name}</option>)}
        </select>
        <button onClick={streamIn} disabled={streaming}
          style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"7px 18px",borderRadius:8,border:"none",background:streaming?C.muted:C.terra,color:"#fff",cursor:streaming?"default":"pointer",display:"flex",alignItems:"center",gap:7}}>
          {streaming ? <><span>✦</span> Fetching…</> : <><span>✦</span> {displayed ? "Refresh" : "Generate Intelligence"}</>}
        </button>
        {displayed && !streaming && (
          <div style={{fontSize:11,color:C.muted}}>
            {displayed.length} items · {scope==="portfolio"?"Portfolio-wide":assets.find(a=>a.id===+scope)?.name}
          </div>
        )}
        {displayed && dangers.length > 0 && !streaming && (
          <Badge scheme="danger">{dangers.length} critical signal{dangers.length>1?"s":""}</Badge>
        )}
      </div>

      {/* Empty / prompt state */}
      {!displayed && !streaming && (
        <div style={{textAlign:"center",padding:"60px 0",color:C.muted,fontSize:13}}>
          <div style={{fontSize:28,marginBottom:14,opacity:0.3}}>📰</div>
          Select a scope and click Generate Intelligence to pull the latest news.
        </div>
      )}

      {/* Streaming placeholder rows */}
      {streaming && displayed && displayed.length === 0 && (
        <div style={{textAlign:"center",padding:"40px 0",color:C.terra,fontSize:13}}>
          <div style={{fontSize:24,marginBottom:10}}>✦</div>Scanning sources…
        </div>
      )}

      {/* News items */}
      {displayed && displayed.length > 0 && (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {displayed.map((n,i)=>{
            const cs = CAT_COLORS[n.cat] || {bg:C.offWhite,text:C.body};
            const fs = FLAG_SCHEME[n.flag] || "neutral";
            return (
              <div key={i} style={{background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,padding:"16px 20px",display:"flex",gap:16,alignItems:"flex-start"}}>
                {/* Left: category + date */}
                <div style={{flexShrink:0,width:140}}>
                  <div style={{background:cs.bg,color:cs.text,fontSize:10,fontWeight:600,padding:"3px 9px",borderRadius:20,marginBottom:8,display:"inline-block",letterSpacing:"0.04em"}}>{n.cat}</div>
                  <div style={{fontSize:11,color:C.muted}}>{n.date}</div>
                </div>
                {/* Centre: headline + source */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,color:C.navy,marginBottom:5,lineHeight:1.4}}>{n.headline}</div>
                  <div style={{fontSize:11,color:C.muted}}>Source: {n.source}</div>
                </div>
                {/* Right: relevance + flag */}
                <div style={{flexShrink:0,width:260}}>
                  <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",color:C.muted,marginBottom:5}}>Portfolio Relevance</div>
                  <div style={{fontSize:12,color:C.body,lineHeight:1.55,marginBottom:8}}>{n.relevance}</div>
                  <Badge scheme={fs}>{n.flag==="danger"?"⚠ Critical":n.flag==="warning"?"Watch":n.flag==="success"?"Positive":"FYI"}</Badge>
                </div>
              </div>
            );
          })}
          {streaming && (
            <div style={{padding:"12px 20px",color:C.muted,fontSize:12,display:"flex",alignItems:"center",gap:8}}>
              <span style={{color:C.terra}}>✦</span> Loading next item…
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── ASSET VIEW ───────────────────────────────────────────────────────────────
function AssetView({assets,setAssets,initialAsset,openModal,onAddAsset}) {
  const [selId,setSelId]=useState(initialAsset?.id||assets[0].id);
  const [innerTab,setInnerTab]=useState("overview"); // "overview" | "intelligence"
  const [csvState,setCsvState]=useState("idle");
  const [csvResult,setCsvResult]=useState(null);
  const fileRef=useRef();
  const a=assets.find(x=>x.id===selId)||assets[0];
  const l=latest(a);

  const [uploadModal,setUploadModal]=useState(null); // null | "csv" | "ai"
  const csvFileRef=useRef();
  const aiFileRef=useRef();

  // ── TEMPLATE CSV ──
  const TEMPLATE_CSV=`period,valuation,rent,erv,capRate,walt,walb,ltv,icr,loanAmount,creditScore,creditRating,tenantName
Q2 2025,11500000,735000,120,5.25,3.9,2.0,33.7,1.74,3880000,81,A-,Renault Trucks SAS`;

  function downloadTemplate(){
    const blob=new Blob([TEMPLATE_CSV],{type:"text/csv"});
    const url=URL.createObjectURL(blob);
    const el=document.createElement("a");el.href=url;el.download="asset_update_template.csv";el.click();
    URL.revokeObjectURL(url);
  }

  // ── PLAIN CSV HANDLER ──
  async function handlePlainCsv(e){
    const file=e.target.files[0];if(!file)return;
    setUploadModal(null);
    const text=await file.text();
    try{
      const rows=text.trim().split("\n");
      const headers=rows[0].split(",").map(h=>h.trim().toLowerCase());
      const vals=rows[1]?.split(",").map(v=>v.trim())||[];
      const obj={};headers.forEach((h,i)=>{obj[h]=vals[i]||"";});
      const numF=["valuation","rent","erv","caprate","walt","walb","ltv","icr","loanamount","creditscore"];
      const newQ={...l};
      if(obj.period) newQ.period=obj.period;
      if(obj.valuation) newQ.valuation=parseFloat(obj.valuation);
      if(obj.rent) newQ.rent=parseFloat(obj.rent);
      if(obj.erv) newQ.erv=parseFloat(obj.erv);
      if(obj.caprate) newQ.capRate=parseFloat(obj.caprate);
      if(obj.walt) newQ.walt=parseFloat(obj.walt);
      if(obj.walb) newQ.walb=parseFloat(obj.walb);
      if(obj.ltv) newQ.ltv=parseFloat(obj.ltv);
      if(obj.icr) newQ.icr=parseFloat(obj.icr);
      if(obj.loanamount) newQ.loanAmount=parseFloat(obj.loanamount);
      if(obj.creditscore) newQ.creditScore=parseFloat(obj.creditscore);
      if(obj.creditrating) newQ.creditRating=obj.creditrating;
      if(obj.tenantname) newQ.tenantName=obj.tenantname;
      setAssets(prev=>prev.map(x=>x.id===a.id?{...x,quarters:[...x.quarters,newQ]}:x));
    }catch{setCsvState("error");}
    e.target.value="";
  }

  // ── AI CSV/PDF HANDLER ──
  async function handleAiUpload(e,type){
    const file=e.target.files[0];if(!file)return;
    setUploadModal(null);setCsvState("parsing");
    let content="";
    if(type==="pdf"){
      // base64 encode for Claude vision
      const buf=await file.arrayBuffer();
      const bytes=new Uint8Array(buf);
      let b64="";bytes.forEach(b=>{b64+=String.fromCharCode(b);});
      content=btoa(b64);
    }else{
      content=await file.text();
    }
    try{
      const userContent=type==="pdf"
        ?[{type:"document",source:{type:"base64",media_type:"application/pdf",data:content}},{type:"text",text:`Extract quarterly asset management data from this document. Fields: tenantName, creditRating, creditScore(0-100), valuation(€), rent/annualRent(€/yr), erv(€/sqm), walt(years), walb(years), loanAmount(€), lender, loanExpiry, ltv(%), icr, capRate(%), indexation, notes. Respond ONLY with raw JSON: {"mapped":{...},"columnMappings":{...},"missing":[...],"summary":"1-2 sentences"}`}]
        :`You are a real estate analyst. A user has uploaded a CSV file with non-standard column names (possibly in French, Italian, Dutch, or any other format). Extract quarterly asset management data and map it regardless of column naming or language.\n\nStandard fields:\n- tenantName, creditRating, creditScore(0-100), valuation(€), rent/annualRent(€/yr), erv(€/sqm), walt(years), walb(years), loanAmount(€), lender, loanExpiry, ltv(%), icr, capRate(%), indexation, notes\n\nCSV:\n${content.slice(0,4000)}\n\nRespond ONLY with raw JSON: {"mapped":{...},"columnMappings":{"original CSV column":"our field name",...},"missing":[...],"summary":"1-2 sentences"}`;
      const body={model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:userContent}]};
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      const d=await res.json();
      const parsed=JSON.parse(d.content[0].text.replace(/```json|```/g,"").trim());
      setCsvResult(parsed);setCsvState("done");
    }catch{setCsvState("error");}
    e.target.value="";
  }

  const charts=[
    {title:"Valuation History",data:a.quarters.map(q=>({v:q.valuation,label:q.period})),color:C.terra,fmtFn:fmtM},
    {title:"Annual Rent",data:a.quarters.map(q=>({v:q.rent,label:q.period})),color:"#4a7c9e",fmtFn:fmtM},
    {title:"Cap Rate (%)",data:a.quarters.map(q=>({v:q.capRate,label:q.period})),color:"#c84a4a",fmtFn:v=>`${v.toFixed(2)}%`,note:"↑ = compression pressure"},
    {title:"ERV (€/sqm)",data:a.quarters.map(q=>({v:q.erv,label:q.period})),color:"#3a8c6e",fmtFn:v=>`€${v}`},
    {title:"Credit Score",data:a.quarters.map(q=>({v:q.creditScore,label:q.period})),color:"#6b5ea8",fmtFn:v=>`${v}/100`,note:"↓ = deterioration"},
    {title:"LTV (%)",data:a.quarters.filter(q=>q.ltv>0).map(q=>({v:q.ltv,label:q.period})),color:"#e07b39",fmtFn:v=>`${v.toFixed(1)}%`},
    {title:"ICR (×)",data:a.quarters.filter(q=>q.icr!=null).map(q=>({v:q.icr,label:q.period})),color:"#5a8c3a",fmtFn:fmtX},
  ];

  return (
    <div style={{padding:"28px 32px"}}>
      {/* Hidden file inputs */}
      <input ref={csvFileRef} type="file" accept=".csv" style={{display:"none"}} onChange={handlePlainCsv}/>
      <input ref={aiFileRef} type="file" accept=".csv,.pdf" style={{display:"none"}} onChange={e=>handleAiUpload(e, e.target.files[0]?.name?.endsWith(".pdf")?"pdf":"csv")}/>

      {/* Upload CSV Modal */}
      {uploadModal==="csv"&&(
        <div style={{position:"fixed",inset:0,background:"rgba(15,39,68,0.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setUploadModal(null)}>
          <div style={{background:C.white,borderRadius:14,width:460,overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
            <div style={{background:C.navy,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:15,fontWeight:600,color:"#fff",marginBottom:3}}>Upload Deal Data</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.55)"}}>CSV must match Asset Manager template format exactly</div>
              </div>
              <button onClick={()=>setUploadModal(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:18,cursor:"pointer",padding:2}}>×</button>
            </div>
            <div style={{padding:"20px"}}>
              <div
                onClick={()=>csvFileRef.current.click()}
                style={{border:`1.5px dashed ${C.border}`,borderRadius:10,padding:"32px 20px",textAlign:"center",cursor:"pointer",background:C.offWhite,marginBottom:16}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=C.terra}
                onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{fontSize:14,fontWeight:500,color:C.navy,marginBottom:6}}>Drop file here or click to browse</div>
                <div style={{fontSize:12,color:C.muted}}>CSV · Columns must match template</div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <button onClick={downloadTemplate} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"7px 14px",borderRadius:8,border:`1.5px solid ${C.terra}`,background:C.white,color:C.terra,cursor:"pointer"}}>↓ Download Template</button>
                <button onClick={()=>setUploadModal(null)} style={{fontFamily:"inherit",fontSize:12,padding:"7px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:C.white,color:C.body,cursor:"pointer"}}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Upload Modal */}
      {uploadModal==="ai"&&(
        <div style={{position:"fixed",inset:0,background:"rgba(15,39,68,0.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setUploadModal(null)}>
          <div style={{background:C.white,borderRadius:14,width:480,overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
            <div style={{background:C.navy,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <span style={{fontSize:15,fontWeight:600,color:"#fff"}}>✦ AI Upload</span>
                  <span style={{fontSize:10,fontWeight:600,background:C.terra,color:"#fff",padding:"2px 7px",borderRadius:20,letterSpacing:"0.06em"}}>DEMO</span>
                </div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.55)"}}>Claude maps your file to asset data fields automatically</div>
              </div>
              <button onClick={()=>setUploadModal(null)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:18,cursor:"pointer",padding:2}}>×</button>
            </div>
            <div style={{padding:"20px"}}>
              <div style={{fontSize:12,color:C.muted,marginBottom:14}}>Choose your source format:</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
                {[
                  {id:"csv",icon:"📊",title:"CSV / Excel",desc:"Any column names — Claude maps to asset fields automatically"},
                  {id:"pdf",icon:"📄",title:"PDF",desc:"Valuation report, lease summary or asset factsheet — high-confidence fields only"},
                ].map(opt=>(
                  <button key={opt.id}
                    onClick={()=>{setUploadModal(null);aiFileRef.current.accept=opt.id==="pdf"?".pdf":".csv";setTimeout(()=>aiFileRef.current.click(),50);}}
                    style={{fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:8,padding:"20px 14px",borderRadius:10,border:`0.5px solid ${C.border}`,background:C.white,cursor:"pointer"}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.offWhite}
                    onMouseLeave={e=>e.currentTarget.style.background=C.white}>
                    <span style={{fontSize:28}}>{opt.icon}</span>
                    <div style={{fontSize:13,fontWeight:600,color:C.navy}}>{opt.title}</div>
                    <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>{opt.desc}</div>
                  </button>
                ))}
              </div>
              <div style={{textAlign:"right"}}>
                <button onClick={()=>setUploadModal(null)} style={{fontFamily:"inherit",fontSize:12,padding:"7px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:C.white,color:C.body,cursor:"pointer"}}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22}}>
        <select value={selId} onChange={e=>setSelId(+e.target.value)} style={{fontFamily:"inherit",fontSize:13,padding:"6px 12px",borderRadius:8,border:`0.5px solid ${C.border}`,background:C.white,color:C.navy,cursor:"pointer"}}>
          {assets.map(x=><option key={x.id} value={x.id}>{x.flag} {x.name}</option>)}
        </select>
        <Badge scheme={healthOf(a)==="ok"?"success":healthOf(a)==="warning"?"warning":"danger"}>{healthOf(a)==="ok"?"Clean":healthOf(a)==="warning"?"Watch":"Flag"}</Badge>
        <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setUploadModal("csv")} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"7px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:C.white,color:C.body,cursor:"pointer"}}>↑ Upload CSV</button>
          <button onClick={()=>setUploadModal("ai")} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"7px 14px",borderRadius:8,border:`1.5px solid ${C.terra}`,background:C.white,color:C.terra,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:12}}>✦</span> AI Upload
          </button>
          <button onClick={()=>openModal(a)} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"7px 16px",borderRadius:8,border:`1.5px solid ${C.terra}`,background:C.white,color:C.terra,cursor:"pointer"}}>+ Q Update</button>
          <button onClick={onAddAsset} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"7px 16px",borderRadius:8,border:"none",background:C.terra,color:"#fff",cursor:"pointer"}}>+ Add Asset</button>
        </div>
      </div>

      {/* Inner tab strip */}
      <div style={{display:"flex",gap:0,marginBottom:24,borderBottom:`0.5px solid ${C.border}`}}>
        {[{id:"overview",label:"Overview"},{id:"intelligence",label:"✦ Market Intelligence"}].map(t=>(
          <button key={t.id} onClick={()=>setInnerTab(t.id)}
            style={{fontFamily:"inherit",fontSize:13,fontWeight:innerTab===t.id?500:400,padding:"8px 20px",border:"none",borderBottom:innerTab===t.id?`2px solid ${C.terra}`:"2px solid transparent",background:"none",color:innerTab===t.id?C.terra:C.muted,cursor:"pointer",marginBottom:"-0.5px",transition:"color 0.15s"}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Market Intelligence tab */}
      {innerTab==="intelligence" && <MarketIntelligence assets={assets} selectedAsset={a}/>}

      {/* Overview tab */}
      {innerTab==="overview" && <React.Fragment>

      {/* AI parsing animation */}
      {csvState==="parsing"&&(
        <div style={{background:C.info.bg,border:`0.5px solid #b8cde0`,borderRadius:10,padding:"16px 20px",marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontSize:16,color:C.info.text}}>✦</span>
            <div style={{fontSize:13,fontWeight:600,color:C.info.text}}>Claude is reading your file…</div>
          </div>
          {["Parsing content and structure","Inferring field meanings across languages","Mapping to asset data model","Identifying missing fields"].map((step,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",fontSize:12,color:C.info.text,opacity:0.85}}>
              <span style={{fontSize:10}}>→</span>{step}
            </div>
          ))}
        </div>
      )}

      {csvState==="error"&&<div style={{background:C.danger.bg,borderRadius:10,padding:"12px 18px",marginBottom:18,fontSize:12,color:C.danger.text}}>Could not parse file — check the format and try again.</div>}

      {csvState==="done"&&csvResult&&(
        <div style={{background:C.white,border:`0.5px solid ${C.border}`,borderRadius:10,padding:"20px",marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,paddingBottom:12,borderBottom:`0.5px solid ${C.border}`}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <span style={{fontSize:15}}>✦</span>
                <span style={{fontSize:13,fontWeight:600,color:C.navy}}>AI Interpretation Complete</span>
                <Badge scheme="accent">Claude</Badge>
              </div>
              <div style={{fontSize:12,color:C.body}}>{csvResult.summary}</div>
            </div>
          </div>
          {csvResult.columnMappings&&Object.keys(csvResult.columnMappings).length>0&&(
            <div style={{marginBottom:16}}>
              <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",color:C.muted,marginBottom:8}}>Column interpretation — how Claude read your headers</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"4px 10px",alignItems:"center"}}>
                <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",paddingBottom:4,borderBottom:`0.5px solid ${C.border}`}}>Your column</div>
                <div style={{paddingBottom:4,borderBottom:`0.5px solid ${C.border}`}}/>
                <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",paddingBottom:4,borderBottom:`0.5px solid ${C.border}`}}>Mapped to</div>
                {Object.entries(csvResult.columnMappings).map(([orig,mapped])=>(
                  <>
                    <div key={`o-${orig}`} style={{fontSize:11,color:C.body,fontFamily:"monospace",background:C.offWhite,padding:"3px 8px",borderRadius:4}}>{orig}</div>
                    <div key={`a-${orig}`} style={{fontSize:12,color:C.terra,textAlign:"center"}}>→</div>
                    <div key={`m-${orig}`} style={{fontSize:11,fontWeight:500,color:C.navy}}>{mapped}</div>
                  </>
                ))}
              </div>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
            <div>
              <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",color:C.muted,marginBottom:8}}>Extracted values</div>
              {Object.entries(csvResult.mapped||{}).filter(([,v])=>v!=null).map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"4px 0",borderBottom:`0.5px solid ${C.border}`}}>
                  <span style={{color:C.muted}}>{k}</span>
                  <span style={{color:C.body,fontWeight:500}}>{String(v).slice(0,40)}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",color:C.muted,marginBottom:8}}>Missing — needs manual entry</div>
              {(csvResult.missing||[]).length===0
                ?<div style={{fontSize:11,color:C.success.text}}>✓ All standard fields found</div>
                :(csvResult.missing||[]).map(k=><div key={k} style={{fontSize:11,padding:"4px 0",color:C.warning.text,borderBottom:`0.5px solid ${C.border}`}}>⚠ {k}</div>)
              }
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{
              if(!csvResult?.mapped) return;
              const m=csvResult.mapped;const newQ={...l};
              const numFields=["valuation","rent","annualRent","capRate","walt","walb","ltv","icr","erv","loanAmount","creditScore"];
              Object.entries(m).forEach(([k,v])=>{if(v!=null){if(numFields.includes(k))newQ[k]=parseFloat(v);else newQ[k]=v;}});
              if(m.annualRent) newQ.rent=m.annualRent;
              if(m.tenantRating) newQ.creditRating=m.tenantRating;
              if(m.tenantScore) newQ.creditScore=parseFloat(m.tenantScore);
              newQ.period="AI Import";
              setAssets(prev=>prev.map(x=>x.id===a.id?{...x,quarters:[...x.quarters,newQ]}:x));
              setCsvState("idle");setCsvResult(null);
            }} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"7px 16px",borderRadius:8,border:"none",background:C.terra,color:"#fff",cursor:"pointer"}}>Apply to {a.name}</button>
            <button onClick={()=>{setCsvState("idle");setCsvResult(null);}} style={{fontFamily:"inherit",fontSize:12,padding:"7px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:C.white,color:C.body,cursor:"pointer"}}>Discard</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:20,paddingBottom:18,borderBottom:`0.5px solid ${C.border}`}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <span style={{fontSize:22}}>{a.flag}</span>
            <h2 style={{margin:0,fontSize:20,fontWeight:600,color:C.navy}}>{a.name}</h2>
          </div>
          <div style={{fontSize:12,color:C.muted}}>{a.city} · {a.gla.toLocaleString()} sqm · Acquired {a.acquiredDate} · Appraised by {a.appraiser} · {a.quarters.length} periods</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          <MetricCard label="MOIC (at FMV)" value={`${(l.valuation/a.acquisitionPrice).toFixed(2)}×`}/>
          <MetricCard label="Val. vs Acq." value={fmtPct(delta(l.valuation,a.acquisitionPrice))} color={delta(l.valuation,a.acquisitionPrice)>=0?C.success.text:C.danger.text}/>
          <MetricCard label="Rent vs Acq." value={fmtPct(delta(l.rent,a.annualRentAcquisition))} color={delta(l.rent,a.annualRentAcquisition)>=0?C.success.text:C.danger.text}/>
        </div>
      </div>

      {/* Key metrics */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:24}}>
        <MetricCard label="Current Valuation" value={fmtM(l.valuation)} sub={`Acq: ${fmtM(a.acquisitionPrice)}`}/>
        <MetricCard label="Annual Rent" value={fmtM(l.rent)} sub={`ERV: €${l.erv}/sqm`}/>
        <MetricCard label="Cap Rate" value={`${l.capRate.toFixed(2)}%`} sub={`Entry: ${a.capRateEntry.toFixed(2)}%`} color={l.capRate>a.capRateEntry?C.warning.text:C.success.text}/>
        <MetricCard label="WALT / WALB" value={`${l.walt.toFixed(1)}y`} sub={`Break: ${l.walb.toFixed(1)}y`} color={l.walt<3?C.danger.text:l.walt<4?C.warning.text:C.terra}/>
        <MetricCard label={l.loanAmount>0?"LTV / ICR":"Leverage"} value={l.loanAmount>0?`${l.ltv.toFixed(1)}%`:"Unlevered"} sub={l.loanAmount>0?`ICR: ${fmtX(l.icr)}`:"no debt"} color={l.ltv>55?C.warning.text:C.terra}/>
      </div>

      {/* Charts */}
      <Eyebrow>Quarterly History — {a.quarters.length} periods</Eyebrow>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24}}>
        {charts.filter(c=>c.data.length>=2).map(c=><ChartCard key={c.title} {...c}/>)}
      </div>

      {/* Tenancy + Financing */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <div style={{background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,padding:20}}>
          <Eyebrow>Tenancy</Eyebrow>
          {[["Tenant",l.tenantName],["Credit Rating",<span style={{color:ratingColor(l.creditRating),fontWeight:500}}>{l.creditRating} ({l.creditScore}/100)</span>],["Indexation",a.indexation],["Guarantee",a.guarantee],["Lease document",<a href={a.leaseLink} target="_blank" rel="noopener" style={{color:C.terra,fontSize:12}}>Open ↗</a>]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`0.5px solid ${C.border}`,fontSize:12}}>
              <span style={{color:C.muted}}>{k}</span><span style={{color:C.body,fontWeight:500}}>{v}</span>
            </div>
          ))}
          {a.notes&&<div style={{marginTop:14,background:C.offWhite,borderRadius:8,padding:"10px 12px",fontSize:12,color:C.body,lineHeight:1.6}}><b style={{color:C.navy}}>Notes: </b>{a.notes}</div>}
        </div>
        <div style={{background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,padding:20}}>
          <Eyebrow>Financing</Eyebrow>
          {l.loanAmount>0?[["Lender",a.lender],["Outstanding",fmtM(l.loanAmount)],["Expiry",a.loanExpiry],["Margin",a.loanMargin],["LTV",`${l.ltv.toFixed(1)}% (cov <${a.covenantLTV}%)`],["ICR",`${fmtX(l.icr)} (cov >${a.covenantICR}×)`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`0.5px solid ${C.border}`,fontSize:12}}>
              <span style={{color:C.muted}}>{k}</span><span style={{color:C.body,fontWeight:500}}>{v}</span>
            </div>
          )):<div style={{padding:"20px 0",textAlign:"center",fontSize:13,color:C.muted}}>Unlevered — no debt financing.</div>}
        </div>
      </div>

      {/* Period table */}
      <div style={{background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
        <div style={{padding:"12px 18px",borderBottom:`0.5px solid ${C.border}`,background:C.offWhite,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Eyebrow>Period-by-Period History</Eyebrow>
          <button onClick={()=>openModal(a)} style={{fontFamily:"inherit",fontSize:11,padding:"5px 12px",borderRadius:7,border:`1.5px solid ${C.terra}`,background:C.white,color:C.terra,cursor:"pointer"}}>+ Add period</button>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{background:C.offWhite}}>{["Period","Valuation","Rent","ERV","Cap Rate","WALT","WALB","LTV","ICR","Credit"].map(h=>(
              <th key={h} style={{padding:"7px 14px",textAlign:"left",fontWeight:600,fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",whiteSpace:"nowrap",borderBottom:`0.5px solid ${C.border}`}}>{h}</th>
            ))}</tr></thead>
            <tbody>{[...a.quarters].reverse().map((q,i)=>(
              <tr key={i} style={{borderBottom:`0.5px solid ${C.border}`,background:i===0?"#FFFDF9":C.white}}>
                <td style={{padding:"8px 14px",fontWeight:i===0?500:400,color:i===0?C.terra:C.body}}>{q.period}{i===0&&<span style={{fontSize:10,color:C.terra,marginLeft:6}}>latest</span>}</td>
                <td style={{padding:"8px 14px",color:C.navy,fontWeight:500}}>{fmtM(q.valuation)}</td>
                <td style={{padding:"8px 14px"}}>{fmtM(q.rent)}</td>
                <td style={{padding:"8px 14px"}}>€{q.erv}</td>
                <td style={{padding:"8px 14px"}}>{q.capRate.toFixed(2)}%</td>
                <td style={{padding:"8px 14px",color:q.walt<3?C.danger.text:q.walt<4?C.warning.text:C.body}}>{q.walt.toFixed(1)}y</td>
                <td style={{padding:"8px 14px"}}>{q.walb.toFixed(1)}y</td>
                <td style={{padding:"8px 14px"}}>{q.ltv>0?`${q.ltv.toFixed(1)}%`:"—"}</td>
                <td style={{padding:"8px 14px"}}>{q.icr!=null?fmtX(q.icr):"—"}</td>
                <td style={{padding:"8px 14px",color:ratingColor(q.creditRating)}}>{q.creditRating} ({q.creditScore})</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      </React.Fragment>}
    </div>
  );
}

// ─── PRE-GENERATED BRIEFINGS ─────────────────────────────────────────────────
const PREGENERATED = {
  portfolio: `**Situation**
The portfolio of five logistics assets across France, Italy, and the Netherlands is performing well at aggregate level — GAV has grown from €40.4m at acquisition to €46.75m (+15.7%), supported by rent uplift of +8.2% across the portfolio. However, three assets carry active watch flags that require near-term management attention, particularly around refinancing concentration and tenant credit deterioration.

**Key Risks**
- Rotterdam Gate faces a dual cliff in 2026: the ABN AMRO loan matures December 2025 (already overdue for refinancing) and the Geodis BV lease expires December 2026 with a break option in January 2026. Tenant credit has declined from 85 to 74/100 over the hold period — the combination of refinancing pressure and occupancy risk is the portfolio's most acute exposure.
- Milan Est loan matures December 2026 with €4.2m outstanding at 320bps + E3M — in the current rate environment this represents a meaningful refinancing cost increase. Begin lender conversations by Q2 2025.
- Turin Ovest tenant (Arvato SCM) has seen credit score decline from 72 to 58/100 across four quarters — two consecutive downgrades. No debt on this asset reduces financial risk, but tenant replacement in the current Turin submarket at €65 ERV would be challenging.
- Portfolio WALT of 3.9y (valuation-weighted) is adequate but masks a skew: Rotterdam Gate at 1.9y and Lyon Nord at 4.2y drag the average. Without lease renewals at Rotterdam, WALT will fall below 1y within 12 months.

**Positives**
- Lyon Nord is the standout performer: valuation +33.3% to €11.2m, rent +7.3%, WALT extended to 4.2y following tenant re-gear in Q4 2023. ICR of 1.72× remains above covenant with meaningful headroom.
- Bordeaux Sud is a clean, stable asset: ICR 1.89×, LTV 48.7%, WALT 6.4y, tenant credit stable at 87/100. No near-term financing or tenancy risk.
- DHL Supply Chain at Milan Est carries AA- credit rating with a score of 91/100 — the highest quality tenant in the portfolio, providing strong income security through December 2030.

**Recommended Actions**
- Immediately engage ABN AMRO regarding Rotterdam Gate refinancing — the loan is technically at maturity. Simultaneously open dialogue with Geodis BV on lease renewal intent ahead of the January 2026 break option.
- Commission an independent credit review of Arvato SCM (Turin Ovest) given the sustained score decline. Assess whether the Bertelsmann parent guarantee remains enforceable and current.
- Initiate refinancing process for Milan Est with target completion by Q3 2025, allowing 18 months of lead time and avoiding a forced refinancing in a potentially adverse rate environment.`,

  1: `**Situation**
Lyon Nord is the portfolio's strongest performer. Since acquisition in Q3 2021, GAV has increased 33.3% to €11.2m and passing rent has grown 7.3% to €721k pa. The asset benefits from a lease re-gear completed in Q4 2023 extending WALT to 4.2y, and a refurbishment completed Q1 2023 that enhanced the asset's logistics specification and ERV from €106 to €118/sqm (+11.3%).

**Key Risks**
- Cap rate has expanded 40bps from entry (4.8% to 5.2%), reflecting broader European logistics market repricing since 2022. ERV growth has partially offset this, but further expansion would apply downward pressure on valuation.
- Tenant credit (Renault Trucks SAS) has declined modestly from 88 to 82/100 — still an A- rating, but the trend warrants monitoring given the automotive sector's ongoing EV transition pressures on logistics networks.
- WALT of 4.2y with a break option means the next active lease event is within the likely hold period. Tenant re-gear economics will depend on the ERV trajectory.

**Positives**
- LTV of 34.6% is the lowest in the levered portfolio — strong headroom against the 60% covenant. ICR of 1.72× is comfortably above the 1.4× covenant minimum.
- The 2023 refurbishment has demonstrably supported ERV growth and tenant retention, validating the value-add thesis at acquisition.
- Loan maturity September 2027 provides a 20-month runway — adequate time for a structured refinancing process.

**Recommended Actions**
- Begin monitoring Renault Trucks SAS quarterly earnings and logistics network announcements. Proactively engage the tenant 18 months ahead of the break option to assess renewal probability.
- Commission CBRE for an updated ERV opinion ahead of the next indexation review to ensure rent is being marked to market.
- Consider whether partial capital recycling is appropriate given the strong valuation gain — assess exit timing relative to loan maturity in 2027.`,

  2: `**Situation**
Milan Est is a stable, well-tenanted asset with DHL Supply Chain S.r.l. occupying the full building on a lease expiring December 2030. The tenant carries the strongest credit profile in the portfolio (AA-, 91/100) and ICR of 2.04× is comfortably above covenant. The primary risk is the BNP Paribas loan maturing December 2026, which needs to be addressed within the next 12 months.

**Key Risks**
- Loan maturity December 2026: €4.2m at 320bps + E3M. The current Euribor environment means refinancing will carry a materially higher all-in cost than the existing facility. Model the ICR impact under a 150bps base rate increase scenario.
- Cap rate has expanded 30bps from entry (5.1% to 5.4%) — in line with Italian logistics market repricing. Colliers' latest valuation at €8.95m remains above acquisition at €7.2m (+24.3%), but further cap rate expansion driven by rate environment could compress this.
- LTV of 46.9% vs a 60% covenant leaves reasonable headroom, but a valuation decline of >21% would breach the LTV covenant — monitor closely in a repricing environment.

**Positives**
- DHL Supply Chain is among the most creditworthy logistics tenants in Europe. AA- Fitch / 91/100 score provides exceptional income security through December 2030 with a break only in June 2028.
- WALT of 5.8y is the second longest in the portfolio — no near-term lease risk.
- The asset is on the A4 corridor near Milan, one of Italy's prime logistics clusters. Location quality supports long-term ERV sustainability.

**Recommended Actions**
- Open refinancing discussions with BNP Paribas RE by Q2 2025. Prepare a competitive process with at least two alternative lenders (Helaba, Natixis RE) to create leverage on margin.
- Confirm ESG upgrade timeline (scheduled Q3 2025) — completion will support an EPC improvement and potentially reduce future financing costs under green loan frameworks.
- Request Colliers to provide updated yield advice on the Milan logistics submarket at next valuation cycle.`,

  3: `**Situation**
Rotterdam Gate is the highest-risk asset in the portfolio and requires immediate management action on two converging fronts: the ABN AMRO loan matured December 2025 and must be refinanced urgently, while the Geodis BV lease contains a break option in January 2026 and expires December 2026. Simultaneously, tenant credit has declined from 85 to 74/100 across the hold period. These three risks — refinancing, lease, and credit — are correlated and must be managed in parallel.

**Key Risks**
- Loan maturity has passed (ABN AMRO, December 2025, €9.1m, LTV 54.2%). The fund is technically in default or operating on an extended facility. This is the most urgent action in the portfolio — engage ABN AMRO immediately and prepare for a potentially punitive extension margin.
- Geodis BV break option January 2026: with WALT at 1.9y and WALB at 0.9y, the tenant can exit within months. Any refinancing discussion with a new lender will require certainty on occupancy — the two risks are directly linked.
- ICR of 1.58× is within 1.25% of the 1.6× covenant minimum — any rent interruption or financing cost increase will trigger a covenant breach.
- Valuation declined €400k (-2.3%) in H2 2024, reflecting cap rate expansion from 4.4% to 5.0% (+60bps since entry). LTV of 54.2% vs 55% covenant leaves only 80bps of headroom on a valuation decline.

**Positives**
- Rotterdam is a tier-1 European logistics market with strong structural demand. A vacant unit of 18,500sqm near the port would attract significant interest from logistics operators.
- Rent has grown 6.3% since acquisition to €865k pa, confirming the asset's income quality even as the tenant credit profile has weakened.

**Recommended Actions**
- Contact ABN AMRO this week to formalise a loan extension or initiate a refinancing mandate. Engage JLL Capital Markets in parallel to assess alternative debt providers.
- Commission a formal written communication to Geodis BV requesting confirmation of their break option intention by 31 October 2025 — a 3-month notice window is standard.
- Prepare a contingency leasing brief with JLL for the full 18,500sqm in the event Geodis exercises the break, including target ERV of €88/sqm and estimated void period.`,

  4: `**Situation**
Bordeaux Sud is the portfolio's cleanest, most stable asset. Kuehne+Nagel SAS occupies the full building on a lease with 6.4y WALT and no near-term break risk. The Crédit Agricole — sorry, LCL loan runs to June 2028 at a fixed 380bps margin, providing cost certainty. No active alerts are triggered. The asset is performing in line with the business plan.

**Key Risks**
- Cap rate has expanded 20bps since entry (5.4% to 5.6%), modest but consistent with French regional logistics repricing. ERV has grown only modestly from €68 to €71/sqm (+4.4%) — track whether market ERV is outpacing the indexation-driven rent growth.
- LTV of 48.7% and ICR of 1.89× are both healthy, but the fixed 380bps margin is relatively high versus current market rates for prime logistics. At 2028 refinancing, the asset may benefit from a rate reduction if credit markets improve.
- Tenant credit (Kuehne+Nagel SAS, A, 87/100) is stable but not immune to logistics sector headwinds — monitor quarterly.

**Positives**
- WALT of 6.4y / WALB of 4.1y is the most favourable lease profile in the portfolio alongside Milan Est. No lease risk within the foreseeable hold period.
- Stable, consistent valuation growth: €5.1m → €5.95m (+16.7%) over two years with no quarterly declines.
- The 100% ILAT indexation clause provides full inflation pass-through — in a period of elevated French inflation, this has been materially beneficial to income.

**Recommended Actions**
- No urgent actions required. Continue quarterly monitoring.
- At next lease event (break option December 2028), assess whether a lease extension negotiation in exchange for a modest rent concession would be in the fund's interest to lock in longer-term income.
- Commission Knight Frank for an informal market update on Bordeaux Sud logistics rents ahead of the next annual valuations cycle to ensure ERV assumptions remain current.`,

  5: `**Situation**
Turin Ovest is an unlevered, fully-occupied asset where the primary risk is tenant credit deterioration. Arvato SCM Solutions S.r.l. has experienced three consecutive credit score declines from 72 to 58/100 over four quarters, moving from BB- to B+ rating territory. The Bertelsmann parent guarantee provides some protection, but management should assess whether the guarantee terms remain adequate given the subsidiary's deteriorating standalone profile.

**Key Risks**
- Tenant credit has declined 14 points in 18 months — a material and accelerating deterioration. At the current trajectory, the score could fall below 50/100 within two quarters, which would typically constitute a default trigger under most fund monitoring frameworks.
- The asset is unlevered, which eliminates financing risk entirely, but also means the fund has no ICR metric to detect income stress. An early warning system based on Arvato's published accounts is advisable.
- Valuation declined €70k (-1.8%) in H2 2024 — the first quarterly decline — likely reflecting both cap rate expansion (6.0% → 6.5%, +50bps) and the market's pricing of tenant credit risk.
- WALT of 7.1y appears protective, but a tenant insolvency would render WALT irrelevant — lease longevity is only as valuable as the tenant's ability to pay.

**Positives**
- The Bertelsmann AG parent guarantee (one of Germany's largest private conglomerates, ~€20bn revenue) provides a strong backstop. This is meaningfully different from a guarantee from a mid-cap industrial.
- Unlevered structure means the fund has no covenant exposure and full operational flexibility — any workout scenario is not complicated by lender consent requirements.
- ERV of €65/sqm with WALT 7.1y: even in a default scenario, Turin logistics vacancy rates have declined. Re-letting risk is manageable.

**Recommended Actions**
- Immediately commission a formal legal review of the Bertelsmann parent guarantee terms — confirm it is unconditional, on-demand, and not subject to exhaustion of remedies against Arvato first.
- Request audited accounts from Arvato SCM Solutions S.r.l. for FY2023 and FY2024. Engage an independent credit analyst (D&B or Moody's Analytics) for a formal assessment.
- Present a detailed tenant credit report to the Investment Committee at the next quarterly meeting, including downside scenarios and recommended threshold for triggering the guarantee.`
};

// ─── AI BRIEFING ──────────────────────────────────────────────────────────────
function AIBriefing({assets}) {
  const [sel,setSel]=useState("portfolio");
  const [displayed,setDisplayed]=useState("");
  const [streaming,setStreaming]=useState(false);
  const [done,setDone]=useState(false);
  const [q,setQ]=useState("");
  const [chat,setChat]=useState([]);
  const [chatLoad,setChatLoad]=useState(false);
  const endRef=useRef();
  const streamRef=useRef(null);

  function buildCtx() {
    return assets.map(a=>{
      const l=latest(a);
      return `${a.name} (${a.city}): tenant=${l.tenantName} rating=${l.creditRating}(${l.creditScore}/100) GAV=${fmtM(l.valuation)} acq=${fmtM(a.acquisitionPrice)} Δval=${fmtPct(delta(l.valuation,a.acquisitionPrice))} rent=${fmtM(l.rent)} capRate=${l.capRate}% ERV=€${l.erv} WALT=${l.walt}y WALB=${l.walb}y LTV=${l.loanAmount>0?l.ltv.toFixed(1)+"%":"Unlevered"} ICR=${l.icr??"-"} loan=${a.loanExpiry??"N/A"} notes=${a.notes}`;
    }).join("\n");
  }

  function getPregenText() {
    if(sel==="portfolio") return PREGENERATED.portfolio;
    const id=parseInt(sel);
    return PREGENERATED[id]||PREGENERATED.portfolio;
  }

  function streamText(fullText) {
    if(streamRef.current) clearInterval(streamRef.current);
    setDisplayed(""); setStreaming(true); setDone(false);
    let i=0; const chunkSize=4;
    streamRef.current=setInterval(()=>{
      i+=chunkSize;
      setDisplayed(fullText.slice(0,i));
      if(i>=fullText.length){ clearInterval(streamRef.current); setStreaming(false); setDone(true); }
    },16);
  }

  function handleGenerate() {
    streamText(getPregenText());
  }

  async function send() {
    if(!q.trim()) return;
    const msg=q.trim(); setQ("");
    setChat(c=>[...c,{role:"user",text:msg}]); setChatLoad(true);
    // Pre-generated Q&A responses for demo
    const demoAnswers = {
      "Highest risk asset?": "Rotterdam Gate is unambiguously the highest-risk asset. Three risks converge simultaneously: the ABN AMRO loan matured December 2025 (€9.1m, LTV 54.2%), the Geodis BV break option is exercisable January 2026, and tenant credit has declined from 85→74/100 over the hold period. ICR of 1.58× is within 1% of the 1.6× covenant floor. No other asset in the portfolio has this combination of financing, leasing, and credit risk at the same time.",
      "Most urgent refinancing?": "Rotterdam Gate is the most urgent — the ABN AMRO loan technically matured December 2025. Milan Est is next in priority with BNP Paribas maturing December 2026 (€4.2m at 320bps + E3M). Lyon Nord (Crédit Agricole, Sept 2027) and Bordeaux Sud (LCL, June 2028) have adequate runway. Turin Ovest is unlevered — no refinancing required.",
      "Tenant credit trends": "Two assets show deterioration. Rotterdam Gate (Geodis BV): 85→74/100 over 4 quarters, a 13pt decline — the most significant drop in the portfolio. Turin Ovest (Arvato SCM): 72→58/100 over 4 quarters, now in B+ territory with a concerning trajectory. Stable assets: Milan Est (DHL, 90→91/100, stable AA-), Bordeaux Sud (Kuehne+Nagel, 85→87/100, improving), Lyon Nord (Renault Trucks, 88→82/100, modest decline).",
      "Compare WALT across assets": "WALT ranking from longest to shortest: Turin Ovest 7.1y (Arvato SCM, expiry 2032 — but credit concern), Bordeaux Sud 6.4y (Kuehne+Nagel, expiry 2031 — cleanest profile), Milan Est 5.8y (DHL, expiry 2030 — highest quality tenant), Lyon Nord 4.2y (Renault Trucks, extended in Q4 2023), Rotterdam Gate 1.9y (Geodis, expiry 2026 — critical). Portfolio WALT of ~3.9y (value-weighted) masks the Rotterdam Gate drag significantly.",
    };
    setTimeout(()=>{
      const answer = demoAnswers[msg] || `Based on the portfolio data: ${msg.includes("?")?msg.replace("?",""):msg} — this is a demo mode response. Connect a Claude API key to enable live portfolio Q&A with full context awareness.`;
      setChat(c=>[...c,{role:"assistant",text:answer}]);
      setChatLoad(false);
      setTimeout(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),100);
    },900);
  }

  function md(txt) {
    return txt.split("\n").map((ln,i)=>{
      if(ln.startsWith("**")&&ln.endsWith("**")) return <div key={i} style={{fontWeight:600,color:C.navy,marginTop:12,marginBottom:4}}>{ln.replace(/\*\*/g,"")}</div>;
      if(ln.startsWith("- ")) return <div key={i} style={{paddingLeft:16,color:C.body,fontSize:13,lineHeight:1.6,position:"relative"}}><span style={{position:"absolute",left:4,color:C.terra}}>·</span>{ln.slice(2)}</div>;
      return ln?<div key={i} style={{color:C.body,fontSize:13,lineHeight:1.65}}>{ln}</div>:<div key={i} style={{height:6}}/>;
    });
  }

  return (
    <div style={{padding:"28px 32px"}}>
      {/* API key notice */}
      <div style={{background:C.offWhite,border:`0.5px solid ${C.border}`,borderRadius:10,padding:"12px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:16}}>🔑</span>
        <div style={{flex:1}}>
          <span style={{fontSize:12,fontWeight:500,color:C.navy}}>Demo mode — pre-generated briefings. </span>
          <span style={{fontSize:12,color:C.body}}>Connect a Claude API key to enable live generation from live portfolio data and real-time Q&A.</span>
        </div>
        <Badge scheme="info">Claude API</Badge>
      </div>

      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <Eyebrow>AI Briefing</Eyebrow>
        <select value={sel} onChange={e=>{setSel(e.target.value);setDisplayed("");setDone(false);setStreaming(false);if(streamRef.current)clearInterval(streamRef.current);}} style={{fontFamily:"inherit",fontSize:13,padding:"6px 12px",borderRadius:8,border:`0.5px solid ${C.border}`,background:C.white,color:C.navy,cursor:"pointer"}}>
          <option value="portfolio">Full Portfolio</option>
          {assets.map(a=><option key={a.id} value={a.id}>{a.flag} {a.name}</option>)}
        </select>
        <button onClick={handleGenerate} disabled={streaming}
          style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"7px 18px",borderRadius:8,border:"none",background:streaming?C.muted:C.terra,color:"#fff",cursor:streaming?"default":"pointer",display:"flex",alignItems:"center",gap:6}}>
          {streaming?<>✦ Generating…</>:<><span>✦</span> Generate Briefing</>}
        </button>
      </div>

      {!displayed&&!streaming&&(
        <div style={{textAlign:"center",padding:"60px 0",color:C.muted,fontSize:13}}>
          <div style={{fontSize:24,marginBottom:12,color:C.border}}>✦</div>
          Select an asset or full portfolio and click Generate Briefing.
        </div>
      )}

      {(displayed||streaming)&&(
        <div style={{background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,padding:24,marginBottom:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,paddingBottom:12,borderBottom:`0.5px solid ${C.border}`}}>
            <div>
              <div style={{fontSize:15,fontWeight:600,color:C.navy}}>Analyst Briefing</div>
              <div style={{fontSize:11,color:C.muted}}>{sel==="portfolio"?"Full Portfolio":assets.find(x=>x.id===+sel)?.name} · {new Date().toLocaleDateString("en-GB")}</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              {streaming&&<span style={{fontSize:11,color:C.terra}}>✦ generating…</span>}
              {done&&<Badge scheme="accent">✦ Claude</Badge>}
            </div>
          </div>
          {md(displayed)}
          {streaming&&<span style={{display:"inline-block",width:2,height:14,background:C.terra,marginLeft:2,animation:"none",verticalAlign:"middle",opacity:0.8}}>|</span>}
        </div>
      )}

      {/* Q&A */}
      <div style={{background:C.white,border:`0.5px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:`0.5px solid ${C.border}`,background:C.offWhite}}>
          <Eyebrow>Ask the Portfolio</Eyebrow>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {["Highest risk asset?","Most urgent refinancing?","Tenant credit trends","Compare WALT across assets"].map(s=>(
              <button key={s} onClick={()=>setQ(s)} style={{fontFamily:"inherit",fontSize:11,padding:"4px 10px",borderRadius:20,border:`0.5px solid ${C.border}`,background:C.white,color:C.body,cursor:"pointer"}}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{height:240,overflowY:"auto",padding:"14px 18px",display:"flex",flexDirection:"column",gap:10}}>
          {!chat.length&&<div style={{color:C.muted,fontSize:13,textAlign:"center",paddingTop:60}}>Ask anything about the portfolio — demo answers pre-loaded for the suggested questions above.</div>}
          {chat.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
              <div style={{maxWidth:"80%",background:m.role==="user"?C.navy:C.offWhite,color:m.role==="user"?"#fff":C.body,borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",padding:"10px 14px",fontSize:12,lineHeight:1.6}}>
                {m.role==="user"?m.text:md(m.text)}
              </div>
            </div>
          ))}
          {chatLoad&&<div style={{color:C.muted,fontSize:12,display:"flex",alignItems:"center",gap:6}}><span style={{color:C.terra}}>✦</span> Thinking…</div>}
          <div ref={endRef}/>
        </div>
        <div style={{padding:"10px 18px",borderTop:`0.5px solid ${C.border}`,display:"flex",gap:8}}>
          <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="e.g. What's the refinancing situation at Rotterdam Gate?" style={{flex:1,fontFamily:"inherit",fontSize:13,padding:"8px 12px",borderRadius:8,border:`0.5px solid ${C.border}`,outline:"none",color:C.navy}}/>
          <button onClick={send} disabled={chatLoad||!q.trim()} style={{fontFamily:"inherit",fontSize:12,fontWeight:500,padding:"8px 16px",borderRadius:8,border:"none",background:q.trim()?C.terra:C.border,color:q.trim()?"#fff":C.muted,cursor:q.trim()?"pointer":"default"}}>Send</button>
        </div>
      </div>
    </div>
  );
}

// ─── ALERTS TAB ───────────────────────────────────────────────────────────────
function AlertsTab({assets}) {
  const all=alertsFor(assets);
  const dangers=all.filter(a=>a.sev==="danger"),warnings=all.filter(a=>a.sev==="warning");
  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
        <MetricCard label="Total Alerts" value={all.length} sub="across portfolio"/>
        <MetricCard label="Critical" value={dangers.length} sub="action required" color={dangers.length>0?C.danger.text:C.success.text}/>
        <MetricCard label="Watch" value={warnings.length} sub="monitor closely" color={warnings.length>0?C.warning.text:C.success.text}/>
      </div>
      {!all.length&&<div style={{textAlign:"center",padding:"60px 0",color:C.success.text,fontSize:14}}>✓ No active alerts.</div>}
      {[{title:"Critical — Action Required",items:dangers,sev:"danger"},{title:"Watch — Monitor Closely",items:warnings,sev:"warning"}].map(({title,items,sev})=>items.length>0&&(
        <div key={sev} style={{marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><Eyebrow>{title}</Eyebrow><Badge scheme={sev}>{items.length}</Badge></div>
          {items.map(a=>(
            <div key={a.id} style={{display:"flex",gap:14,background:sev==="danger"?C.danger.bg:C.warning.bg,borderRadius:10,padding:"12px 16px",marginBottom:8}}>
              <span style={{fontSize:20}}>{a.flag}</span>
              <div><div style={{fontSize:13,fontWeight:600,color:sev==="danger"?C.danger.text:C.warning.text,marginBottom:3}}>{a.asset}</div><div style={{fontSize:12,color:sev==="danger"?C.danger.text:C.warning.text,lineHeight:1.5}}>{a.msg}</div></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
const LOGO="https://res.cloudinary.com/dsgfts9gp/image/upload/Gemini_Generated_Image_uao02uao02uao02u-remove-bg-io_mb5sys.png";

const STEPS=[
  {num:"01",label:"Command Centre",desc:"Portfolio-level KPIs, aggregated trend charts and expandable asset rows — the daily check-in view.",ai:false},
  {num:"02",label:"Asset View",desc:"Per-asset drill-down with 7 quarterly history charts, tenancy and financing detail, and AI-powered data import.",ai:true},
  {num:"03",label:"AI Briefing",desc:"Claude generates a structured analyst note per asset or full portfolio — situation, risks, positives and recommended actions.",ai:true},
  {num:"04",label:"Alerts",desc:"Automatic flags for loan maturity, credit deterioration, WALT thresholds and ICR covenant proximity — sorted by urgency.",ai:false},
];

const FEATURES=[
  {label:"Quarterly data history",desc:"Track valuation, rent, cap rate, ERV, credit score, LTV and ICR across every period — with line charts and a period-by-period table."},
  {label:"Smart alert engine",desc:"Seven alert types fire automatically — refinancing timelines, credit score drops, WALT shortening, ICR covenant proximity and more."},
  {label:"AI Import — CSV & PDF",desc:"Upload a data export or valuation report in any format or language. Claude reads the headers, maps the fields and flags what's missing."},
  {label:"Portfolio-level aggregation",desc:"GAV, gross rent, WALT and average credit score trended across all assets — valuation-weighted, updated with every quarterly input."},
];

function Landing({onStart}) {
  const [hov,setHov]=useState(false);
  return (
    <div style={{minHeight:"100vh",background:C.white,fontFamily:"'DM Sans',sans-serif",display:"flex",flexDirection:"column"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      {/* Nav */}
      <header style={{background:C.navy,height:56,padding:"0 48px",display:"flex",alignItems:"center",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <img src={LOGO} alt="" style={{height:34,width:34,objectFit:"contain"}}/>
          <div style={{width:"0.5px",height:16,background:"rgba(255,255,255,0.15)"}}/>
          <span style={{fontSize:13,fontWeight:600,color:"#fff",letterSpacing:"0.01em"}}>Asset Manager</span>
          <div style={{width:4,height:4,borderRadius:"50%",background:C.terra}}/>
          <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.09em",color:"rgba(255,255,255,0.3)",textTransform:"uppercase"}}>RE Portfolio Intelligence</span>
        </div>
      </header>
      {/* Hero */}
      <div style={{background:C.navy,padding:"100px 48px 110px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:600,letterSpacing:"0.1em",color:"rgba(255,255,255,0.35)",textTransform:"uppercase",marginBottom:28}}>Asset Management Tool</div>
        <h1 style={{fontSize:40,fontWeight:600,color:"#fff",margin:"0 0 20px",letterSpacing:"-0.025em",lineHeight:1.15,maxWidth:580}}>
          Portfolio oversight,<br/>built for the asset manager.
        </h1>
        <p style={{fontSize:15,color:"rgba(255,255,255,0.5)",margin:"0 0 48px",maxWidth:460,lineHeight:1.7,fontWeight:400}}>
          Track valuation, rent, credit and financing across every asset in your fund — with quarterly history, smart alerts, and AI-generated briefings on demand.
        </p>
        <button
          onClick={onStart}
          onMouseEnter={()=>setHov(true)}
          onMouseLeave={()=>setHov(false)}
          style={{padding:"12px 28px",background:hov?"#A85520":C.terra,color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer",letterSpacing:"0.01em",transition:"background 0.15s",fontFamily:"inherit"}}>
          Get Started →
        </button>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.2)",marginTop:14}}>Pre-loaded with 5 fictionalised logistics assets</div>
      </div>
      {/* Steps */}
      <div style={{background:C.white,padding:"80px 48px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",color:"#aaa",textTransform:"uppercase",marginBottom:48,textAlign:"center"}}>Four screens</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"0 40px"}}>
            {STEPS.map(s=>(
              <div key={s.num}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                  <span style={{fontSize:11,fontWeight:500,color:C.terra,fontFamily:"monospace"}}>{s.num}</span>
                  {s.ai&&<span style={{fontSize:9,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.terraDark,background:C.terraLight,padding:"2px 7px",borderRadius:20}}>AI</span>}
                </div>
                <div style={{borderTop:`0.5px solid ${C.border}`,paddingTop:20}}>
                  <div style={{fontSize:15,fontWeight:500,color:C.navy,marginBottom:10}}>{s.label}</div>
                  <div style={{fontSize:13,color:C.muted,lineHeight:1.65}}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Features */}
      <div style={{background:C.offWhite,padding:"64px 48px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",color:"#aaa",textTransform:"uppercase",marginBottom:40,textAlign:"center"}}>What's inside</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"32px 64px"}}>
            {FEATURES.map(f=>(
              <div key={f.label} style={{borderTop:`0.5px solid ${C.border}`,paddingTop:20}}>
                <div style={{fontSize:13,fontWeight:500,color:C.navy,marginBottom:6}}>{f.label}</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.6}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* AI strip */}
      <div style={{background:C.navy,padding:"48px"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",alignItems:"flex-start",gap:80}}>
          <div style={{flex:1}}>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",color:C.terra,textTransform:"uppercase",marginBottom:16}}>AI features</div>
            <div style={{fontSize:15,fontWeight:500,color:"#fff",marginBottom:12,lineHeight:1.4}}>Claude acts as a second analyst on every asset in your portfolio</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.7}}>Briefings, data import mapping and Q&A are pre-computed in demo mode. Connect a Claude API key to enable live generation from your own portfolio data — no data is transmitted externally in demo mode.</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12,paddingTop:38,flexShrink:0}}>
            {["AI Briefing — per asset and full portfolio","Ask the Portfolio — free-text Q&A","AI Upload — CSV and PDF interpretation","Add Asset — AI-assisted onboarding"].map(f=>(
              <div key={f} style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:3,height:3,borderRadius:"50%",background:C.terra}}/>
                <span style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div style={{background:C.white,padding:"24px 48px",borderTop:`0.5px solid ${C.border}`}}>
        <div style={{fontSize:11,color:"#cccccc",textAlign:"center"}}>Asset Manager · RE Portfolio Intelligence · Built by Tomaso Portunato</div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [started,setStarted]=useState(false);
  const [tab,setTab]=useState("command");
  const [assets,setAssets]=useState(INIT_ASSETS);
  const [jumpAsset,setJumpAsset]=useState(null);
  const [modalAsset,setModalAsset]=useState(null);
  const [addAssetOpen,setAddAssetOpen]=useState(false);
  const alerts=alertsFor(assets);

  if(!started) return <Landing onStart={()=>setStarted(true)}/>;

  function addQuarter(assetId,row) {
    setAssets(prev=>prev.map(a=>a.id===assetId?{...a,quarters:[...a.quarters,row]}:a));
    setModalAsset(null);
  }

  function handleAddAsset(newAsset) {
    setAssets(prev=>[...prev,newAsset]);
    setJumpAsset(newAsset);
    setTab("asset");
  }

  function handleSelectAsset(a) { setJumpAsset(a); setTab("asset"); }
  function handleOpenModal(a) { setModalAsset(a); }

  const TABS=[
    {id:"command",label:"Command Centre"},
    {id:"asset",label:"Asset View"},
    {id:"briefing",label:"AI Briefing"},
    {id:"alerts",label:`Alerts${alerts.length>0?` (${alerts.length})`:""}`},
  ];

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:C.white,minHeight:"100vh",color:C.body}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      {modalAsset&&<QuarterModal asset={modalAsset} onClose={()=>setModalAsset(null)} onSave={addQuarter}/>}
      {addAssetOpen&&<AddAssetModal onClose={()=>setAddAssetOpen(false)} onSave={handleAddAsset}/>}
      <nav style={{background:C.navy,height:56,padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <img src="https://res.cloudinary.com/dsgfts9gp/image/upload/Gemini_Generated_Image_uao02uao02uao02u-remove-bg-io_mb5sys.png" alt="TP" style={{height:36,width:"auto",display:"block"}}/>
          <div style={{width:"0.5px",height:28,background:"rgba(255,255,255,0.18)"}}/>
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            <span style={{color:"#fff",fontSize:15,fontWeight:500,letterSpacing:"-0.01em"}}>Asset Manager</span>
            <span style={{width:5,height:5,borderRadius:"50%",background:C.terra,display:"inline-block",marginTop:1}}/>
            <span style={{fontSize:10,fontWeight:500,letterSpacing:"0.09em",color:"rgba(255,255,255,0.45)",textTransform:"uppercase"}}>RE Portfolio Intelligence</span>
          </div>
        </div>
        <div style={{display:"flex",gap:4}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{fontFamily:"inherit",fontSize:13,fontWeight:tab===t.id?500:400,padding:"6px 14px",borderRadius:6,border:"none",background:tab===t.id?"rgba(255,255,255,0.12)":"transparent",color:tab===t.id?"#fff":"rgba(255,255,255,0.55)",cursor:"pointer"}}>
              {t.label}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:6}}>{["🇫🇷 FR","🇮🇹 IT","🇳🇱 NL"].map(c=><Badge key={c} scheme="info">{c}</Badge>)}</div>
      </nav>
      <AlertBanner alerts={alerts}/>
      {tab==="command"&&<CommandCentre assets={assets} onSelectAsset={handleSelectAsset} onAddUpdate={handleOpenModal} onAddAsset={()=>setAddAssetOpen(true)}/>}
      {tab==="asset"&&<AssetView assets={assets} setAssets={setAssets} initialAsset={jumpAsset} openModal={handleOpenModal} onAddAsset={()=>setAddAssetOpen(true)}/>}
      {tab==="briefing"&&<AIBriefing assets={assets}/>}
      {tab==="alerts"&&<AlertsTab assets={assets}/>}
    </div>
  );
}
