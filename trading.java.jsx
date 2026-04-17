
import { useState, useEffect, useRef } from "react";

// ── Google Fonts ──────────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:#050508}
    ::-webkit-scrollbar-thumb{background:#00ffe1;border-radius:2px}

    :root {
      --bg: #050508;
      --bg2: #090910;
      --bg3: #0e0e18;
      --card: #0d0d16;
      --border: rgba(0,255,225,0.1);
      --accent: #00ffe1;
      --accent2: #7b5ea7;
      --accent3: #ff6b35;
      --green: #00e676;
      --red: #ff4444;
      --text: #e8e8f0;
      --muted: #6b6b8a;
      --font-head: 'Syne', sans-serif;
      --font-mono: 'Space Mono', monospace;
      --font-body: 'Inter', sans-serif;
    }

    body { background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }

    @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
    @keyframes spin { to{transform:rotate(360deg)} }
    @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes glow { 0%,100%{box-shadow:0 0 8px var(--accent)} 50%{box-shadow:0 0 24px var(--accent),0 0 48px rgba(0,255,225,.2)} }
    @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
    @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes countUp { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }

    .fade-up { animation: fadeUp .6s ease both; }
    .fade-up-1 { animation: fadeUp .6s .1s ease both; }
    .fade-up-2 { animation: fadeUp .6s .2s ease both; }
    .fade-up-3 { animation: fadeUp .6s .3s ease both; }
    .fade-up-4 { animation: fadeUp .6s .4s ease both; }

    .glow-btn {
      background: linear-gradient(135deg, var(--accent), #00b4d8);
      color: #000;
      border: none;
      padding: 12px 28px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all .2s;
      letter-spacing: .05em;
      text-transform: uppercase;
    }
    .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,255,225,.35); }

    .ghost-btn {
      background: transparent;
      color: var(--accent);
      border: 1px solid var(--accent);
      padding: 12px 28px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all .2s;
      letter-spacing: .05em;
      text-transform: uppercase;
    }
    .ghost-btn:hover { background: rgba(0,255,225,.08); transform: translateY(-2px); }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      transition: border-color .2s, transform .2s;
    }
    .card:hover { border-color: rgba(0,255,225,.3); transform: translateY(-2px); }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 11px;
      font-family: var(--font-mono);
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
    .badge-green { background: rgba(0,230,118,.12); color: var(--green); border: 1px solid rgba(0,230,118,.2); }
    .badge-red { background: rgba(255,68,68,.12); color: var(--red); border: 1px solid rgba(255,68,68,.2); }
    .badge-accent { background: rgba(0,255,225,.1); color: var(--accent); border: 1px solid rgba(0,255,225,.2); }
    .badge-purple { background: rgba(123,94,167,.15); color: #b48fe8; border: 1px solid rgba(123,94,167,.25); }

    .tag { background: rgba(0,255,225,.07); color: var(--accent); border: 1px solid rgba(0,255,225,.15); padding: 3px 10px; border-radius: 4px; font-size: 11px; font-family: var(--font-mono); }

    input, select {
      background: rgba(255,255,255,.04);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 10px 14px;
      border-radius: 8px;
      font-family: var(--font-body);
      font-size: 14px;
      outline: none;
      transition: border-color .2s;
      width: 100%;
    }
    input:focus, select:focus { border-color: var(--accent); }

    .nav-link { color: var(--muted); font-size: 14px; cursor: pointer; transition: color .2s; font-family: var(--font-body); text-decoration: none; }
    .nav-link:hover, .nav-link.active { color: var(--text); }

    .section-label {
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: .15em;
      color: var(--accent);
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .h1 { font-family: var(--font-head); font-size: clamp(2.2rem,5vw,4rem); font-weight: 800; line-height: 1.08; }
    .h2 { font-family: var(--font-head); font-size: clamp(1.6rem,3vw,2.4rem); font-weight: 700; line-height: 1.15; }
    .h3 { font-family: var(--font-head); font-size: 1.2rem; font-weight: 700; }

    .divider { border: none; border-top: 1px solid var(--border); }

    .dot-live { width:8px; height:8px; border-radius:50%; background:var(--green); animation: pulse 1.5s infinite; display:inline-block; }
    .dot-warn { width:8px; height:8px; border-radius:50%; background:#ffb300; animation: pulse 1.5s infinite; display:inline-block; }

    /* Mini sparkline */
    .sparkline { display:flex; align-items:flex-end; gap:2px; height:32px; }
    .sparkline-bar { width:3px; border-radius:2px; transition: height .3s; }

    /* Tab system */
    .tabs { display:flex; gap:4px; background:rgba(255,255,255,.03); border:1px solid var(--border); border-radius:8px; padding:4px; }
    .tab { padding:7px 16px; border-radius:6px; font-size:13px; cursor:pointer; transition:all .2s; font-family:var(--font-mono); color:var(--muted); border:none; background:transparent; }
    .tab.active { background:rgba(0,255,225,.12); color:var(--accent); }

    /* Table */
    table { width:100%; border-collapse:collapse; }
    th { text-align:left; padding:10px 14px; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); font-family:var(--font-mono); border-bottom:1px solid var(--border); }
    td { padding:12px 14px; font-size:13px; border-bottom:1px solid rgba(255,255,255,.04); }
    tr:hover td { background:rgba(255,255,255,.02); }

    /* Progress bar */
    .progress { height:4px; background:rgba(255,255,255,.06); border-radius:2px; overflow:hidden; }
    .progress-fill { height:100%; border-radius:2px; transition: width .8s ease; }

    /* Tooltip */
    .tooltip-wrap { position:relative; display:inline-flex; }
    .tooltip-wrap:hover .tooltip { opacity:1; transform:translateY(-4px); }
    .tooltip { position:absolute; bottom:calc(100% + 6px); left:50%; transform:translateX(-50%) translateY(0); background:#1a1a2e; border:1px solid var(--border); color:var(--text); font-size:12px; padding:6px 10px; border-radius:6px; white-space:nowrap; opacity:0; transition:all .2s; pointer-events:none; z-index:100; font-family:var(--font-body); }

    /* Heatmap cell */
    .heatmap-cell { border-radius:4px; display:flex; align-items:center; justify-content:center; flex-direction:column; cursor:pointer; transition:transform .15s; }
    .heatmap-cell:hover { transform:scale(1.05); z-index:10; }

    /* Scrollable */
    .scroll-x { overflow-x:auto; scrollbar-width:thin; }

    /* Noise overlay */
    .noise::after { content:''; position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E"); pointer-events:none; }

    /* Chart bar */
    .chart-bar { transition: height .5s ease, opacity .2s; cursor:pointer; }
    .chart-bar:hover { opacity:.85; }
  `}</style>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const MARKETS = [
  { sym: "BTC/USD", price: 84521.40, chg: 2.34, vol: "42.1B", mkt: "Crypto" },
  { sym: "ETH/USD", price: 3241.80, chg: 1.87, vol: "18.7B", mkt: "Crypto" },
  { sym: "EUR/USD", price: 1.0842, chg: -0.12, vol: "6.2T", mkt: "Forex" },
  { sym: "GBP/USD", price: 1.2714, chg: 0.31, vol: "3.1T", mkt: "Forex" },
  { sym: "AAPL",    price: 212.45, chg: 1.12, vol: "89.4M", mkt: "Stocks" },
  { sym: "TSLA",    price: 178.33, chg: -2.41, vol: "120.1M", mkt: "Stocks" },
  { sym: "GOLD",    price: 2341.60, chg: 0.54, vol: "14.2B", mkt: "Commodities" },
  { sym: "OIL",     price: 78.92, chg: -0.88, vol: "8.9B", mkt: "Commodities" },
  { sym: "SOL/USD", price: 142.30, chg: 4.21, vol: "3.8B", mkt: "Crypto" },
  { sym: "USD/JPY", price: 149.85, chg: 0.22, vol: "2.9T", mkt: "Forex" },
];

const SIGNALS = [
  { sym:"BTC/USD", type:"BUY",  conf:94, tf:"4H", entry:84100, tp:88500, sl:82000, reason:"Golden cross + RSI divergence + volume surge",  mkt:"Crypto",      time:"2m ago" },
  { sym:"EUR/USD", type:"SELL", conf:87, tf:"1H", entry:1.0845, tp:1.0780, sl:1.0890, reason:"Head & shoulders pattern completing",         mkt:"Forex",       time:"8m ago" },
  { sym:"AAPL",    type:"BUY",  conf:91, tf:"1D", entry:211.20, tp:225.00, sl:205.00, reason:"Earnings breakout + institutional buying",   mkt:"Stocks",      time:"15m ago" },
  { sym:"GOLD",    type:"BUY",  conf:83, tf:"4H", entry:2338, tp:2400, sl:2290, reason:"Safe haven demand + Fed dovish signals",           mkt:"Commodities", time:"22m ago" },
  { sym:"ETH/USD", type:"BUY",  conf:89, tf:"1H", entry:3210, tp:3450, sl:3100, reason:"Cup & handle breakout on high volume",            mkt:"Crypto",      time:"31m ago" },
  { sym:"TSLA",    type:"SELL", conf:76, tf:"1D", entry:180.00, tp:165.00, sl:188.00, reason:"Rising wedge breakdown + weak earnings",    mkt:"Stocks",      time:"45m ago" },
  { sym:"SOL/USD", type:"BUY",  conf:92, tf:"4H", entry:140.00, tp:158.00, sl:133.00, reason:"Accumulation zone + ecosystem growth",      mkt:"Crypto",      time:"1h ago" },
  { sym:"USD/JPY", type:"SELL", conf:80, tf:"1H", entry:149.90, tp:148.50, sl:150.60, reason:"BOJ intervention risk + overbought RSI",    mkt:"Forex",       time:"1h ago" },
];

const FEATURES = [
  { icon:"🧠", title:"Neural Signal Engine", desc:"Deep learning model trained on 12 years of multi-asset price action. Detects 47 chart patterns in real-time across 500+ instruments." },
  { icon:"⚡", title:"Ultra-Low Latency Alerts", desc:"Sub-100ms signal delivery via WebSocket. Never miss an entry again — alerts hit your screen before most brokers update their charts." },
  { icon:"🛡️", title:"Smart Risk Engine", desc:"Dynamic position sizing, correlation-aware stops, and portfolio heat maps. Protects capital first, profits follow." },
  { icon:"🌐", title:"All Markets. One Platform", desc:"Crypto, Forex, Stocks, Commodities, Indices — unified analytics across every major market and exchange." },
  { icon:"📊", title:"Institutional Orderflow", desc:"Real-time dark pool prints, block trades, and options flow analysis. See what the smart money is doing before the crowd reacts." },
  { icon:"🤖", title:"AI Trade Copilot", desc:"Chat with your AI trading assistant. Ask about any instrument, get custom analysis, backtests, and personalized strategy advice." },
  { icon:"🔁", title:"Automated Strategy Backtest", desc:"Test any signal combination on 10 years of tick data. Sharpe ratio, max drawdown, win rate — full statistics in seconds." },
  { icon:"📱", title:"Cross-Device Sync", desc:"Seamlessly continue from desktop to mobile. Watchlists, alerts, and preferences sync instantly across all your devices." },
];

const PLANS = [
  { name:"Starter", price:0,  period:"forever", color:"var(--border)", features:["10 AI signals/day","3 watchlists","Basic chart patterns","Email alerts","Community access"] },
  { name:"Pro",     price:49, period:"month",   color:"var(--accent)", hot:true, features:["Unlimited AI signals","50 watchlists","All 47 patterns","Push + SMS alerts","Orderflow data","Backtesting engine","AI Copilot (100 queries/day)","Priority support"] },
  { name:"Elite",   price:149,period:"month",   color:"#b48fe8", features:["Everything in Pro","Unlimited AI Copilot","Dark pool data","Custom signal builder","API access","White-label reports","1-on-1 strategy sessions","Dedicated manager"] },
];

const STATS = [
  { val:"94%",  label:"Average Signal Accuracy",    sub:"Based on 50k+ live signals" },
  { val:"500+", label:"Instruments Covered",         sub:"Crypto, Forex, Stocks & more" },
  { val:"12ms", label:"Average Alert Delivery",      sub:"Fastest in class" },
  { val:"80K+", label:"Active Traders",              sub:"Worldwide community" },
];

const HEATMAP = [
  { sym:"BTC",  chg: 3.2, size:140 }, { sym:"ETH",  chg: 1.8, size:110 },
  { sym:"SOL",  chg: 4.1, size:80  }, { sym:"AAPL", chg: 1.1, size:95  },
  { sym:"TSLA", chg:-2.4, size:85  }, { sym:"NVDA", chg: 2.9, size:90  },
  { sym:"GOLD", chg: 0.5, size:75  }, { sym:"OIL",  chg:-0.9, size:70  },
  { sym:"EUR",  chg:-0.1, size:65  }, { sym:"GBP",  chg: 0.3, size:60  },
  { sym:"AMZN", chg: 1.6, size:88  }, { sym:"MSFT", chg: 0.8, size:92  },
];

// ── Micro Components ──────────────────────────────────────────────────────────
const Logo = () => (
  <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
    <div style={{ width:32, height:32, background:"linear-gradient(135deg,var(--accent),#00b4d8)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"#000", fontFamily:"var(--font-head)", animation:"glow 3s ease infinite" }}>T</div>
    <span style={{ fontFamily:"var(--font-head)", fontWeight:800, fontSize:20, letterSpacing:"-.02em" }}>Trade<span style={{ color:"var(--accent)" }}>vio</span><span style={{ color:"var(--accent)", fontSize:11, marginLeft:4, verticalAlign:"super", fontFamily:"var(--font-mono)", fontWeight:400 }}>AI</span></span>
  </div>
);

const Sparkline = ({ up }) => {
  const bars = [4,7,5,9,6,8,5,10,7,12].map((h,i) => (
    <div key={i} className="sparkline-bar" style={{ height:`${h * 2.5}px`, background: up ? "var(--green)" : "var(--red)", opacity: i < 8 ? .5 : 1 }} />
  ));
  return <div className="sparkline">{bars}</div>;
};

const MiniChart = ({ data, color, height=60 }) => {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i/(data.length-1))*100},${((max-v)/range)*height}`).join(" ");
  return (
    <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`g${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
      <polygon points={`0,${height} ${pts} 100,${height}`} fill={`url(#g${color.replace("#","")})`}/>
    </svg>
  );
};

const ConfBar = ({ val }) => (
  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
    <div className="progress" style={{ width:60, flex:"0 0 60px" }}>
      <div className="progress-fill" style={{ width:`${val}%`, background: val>90?"var(--green)":val>75?"var(--accent)":"#ffb300" }}/>
    </div>
    <span style={{ fontSize:12, fontFamily:"var(--font-mono)", color: val>90?"var(--green)":val>75?"var(--accent)":"#ffb300" }}>{val}%</span>
  </div>
);

// ── Ticker Bar ────────────────────────────────────────────────────────────────
const TickerBar = ({ prices }) => {
  const items = [...prices, ...prices];
  return (
    <div style={{ background:"var(--bg2)", borderBottom:"1px solid var(--border)", padding:"8px 0", overflow:"hidden", position:"relative" }}>
      <div style={{ display:"flex", gap:48, animation:"ticker 30s linear infinite", width:"max-content" }}>
        {items.map((m, i) => (
          <span key={i} style={{ display:"flex", alignItems:"center", gap:8, whiteSpace:"nowrap", fontFamily:"var(--font-mono)", fontSize:12 }}>
            <span style={{ color:var(--muted) }}>{m.sym}</span>
            <span style={{ fontWeight:700 }}>{typeof m.price === "number" && m.price > 100 ? m.price.toLocaleString("en-US",{maximumFractionDigits:2}) : m.price.toFixed(4)}</span>
            <span style={{ color: m.chg >= 0 ? "var(--green)" : "var(--red)", fontSize:11 }}>{m.chg >= 0 ? "▲" : "▼"} {Math.abs(m.chg)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Nav ───────────────────────────────────────────────────────────────────────
const Nav = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Home","Dashboard","Signals","Markets","Pricing"];
  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background: scrolled ? "rgba(5,5,8,.96)" : "transparent", backdropFilter:"blur(20px)", borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent", transition:"all .3s", padding:"14px 0" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div onClick={() => setPage("Home")} style={{ cursor:"pointer" }}><Logo /></div>
        <div style={{ display:"flex", gap:28, alignItems:"center" }} className="hide-mobile">
          {links.map(l => (
            <span key={l} className={`nav-link${page===l?" active":""}`} onClick={() => setPage(l)}
              style={{ color: page===l ? "var(--text)" : undefined, fontWeight: page===l ? 600 : undefined }}>
              {l}
            </span>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <button className="ghost-btn" style={{ padding:"8px 18px", fontSize:12 }} onClick={() => setPage("Dashboard")}>Log In</button>
          <button className="glow-btn" style={{ padding:"8px 18px", fontSize:12 }} onClick={() => setPage("Pricing")}>Get Started</button>
        </div>
      </div>
      <style>{`.hide-mobile{display:flex}@media(max-width:768px){.hide-mobile{display:none}}`}</style>
    </nav>
  );
};

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
const HomePage = ({ setPage }) => {
  const [aiQuery, setAiQuery] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [email, setEmail] = useState("");

  const chartData = [48,52,49,55,53,58,56,62,59,64,61,68,65,71,68,75,72,78,74,80,77,84,81,88];
  const chart2 = [30,32,31,35,33,37,36,40,38,42,40,44,43,47,45,49,46,52,48,55];

  async function askAI() {
    if (!aiQuery.trim()) return;
    setAiLoading(true); setAiReply("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:"You are TradevioAI, an expert trading analyst assistant. Give concise, professional, actionable trading insights. Use trading terminology. Keep replies under 150 words. Format with bullet points when listing items.",
          messages:[{ role:"user", content: aiQuery }]
        })
      });
      const d = await res.json();
      setAiReply(d.content?.[0]?.text || "Analysis unavailable.");
    } catch { setAiReply("⚠️ Connection error. Please try again."); }
    setAiLoading(false);
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight:"90vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", padding:"80px 24px 60px" }}>
        {/* bg gfx */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 60% 30%, rgba(0,255,225,.06) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", right:-80, top:"10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(123,94,167,.12) 0%, transparent 70%)", pointerEvents:"none" }}/>
        {/* grid lines */}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.04, pointerEvents:"none" }}>
          {Array.from({length:12}).map((_,i)=><line key={i} x1={`${i*100/11}%`} y1="0" x2={`${i*100/11}%`} y2="100%" stroke="var(--accent)" strokeWidth="1"/>)}
          {Array.from({length:8}).map((_,i)=><line key={i} x1="0" y1={`${i*100/7}%`} x2="100%" y2={`${i*100/7}%`} stroke="var(--accent)" strokeWidth="1"/>)}
        </svg>

        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
          <div>
            <div className="badge badge-accent fade-up" style={{ marginBottom:20 }}>
              <span className="dot-live"/>
              <span>Live AI Signals Active</span>
            </div>
            <h1 className="h1 fade-up-1" style={{ marginBottom:16 }}>
              Trade Smarter<br/>
              <span style={{ background:"linear-gradient(90deg,var(--accent),#00b4d8,#7b5ea7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>With Neural AI</span>
            </h1>
            <p className="fade-up-2" style={{ color:"var(--muted)", fontSize:17, lineHeight:1.7, marginBottom:28, maxWidth:480 }}>
              Real-time AI-powered signals, institutional orderflow, and smart risk tools — across crypto, forex, stocks, and commodities. One platform. Every edge.
            </p>
            <div className="fade-up-3" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40 }}>
              <button className="glow-btn" onClick={() => setPage("Dashboard")}>Start Free Trial</button>
              <button className="ghost-btn" onClick={() => setPage("Signals")}>View Live Signals</button>
            </div>
            <div className="fade-up-4" style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
              {[["94%","Signal Accuracy"],["80K+","Active Traders"],["500+","Instruments"]].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"var(--font-mono)", fontWeight:700, fontSize:20, color:"var(--accent)" }}>{v}</div>
                  <div style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="fade-up-2" style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div className="card" style={{ padding:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:13, color:"var(--muted)", marginBottom:4 }}>BTC/USD • 4H Chart</div>
                  <div style={{ fontFamily:"var(--font-head)", fontSize:26, fontWeight:800 }}>$84,521<span style={{ fontSize:14, color:"var(--green)", marginLeft:8 }}>▲ +2.34%</span></div>
                </div>
                <span className="badge badge-green">AI: STRONG BUY</span>
              </div>
              <MiniChart data={chartData} color="var(--green)" height={80}/>
              <div style={{ display:"flex", gap:12, marginTop:12, fontSize:12, color:"var(--muted)", fontFamily:"var(--font-mono)" }}>
                <span>Entry: <b style={{ color:"var(--text)" }}>$84,100</b></span>
                <span>TP: <b style={{ color:"var(--green)" }}>$88,500</b></span>
                <span>SL: <b style={{ color:"var(--red)" }}>$82,000</b></span>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div className="card" style={{ padding:16 }}>
                <div style={{ fontSize:12, color:"var(--muted)", marginBottom:6 }}>ETH/USD</div>
                <div style={{ fontFamily:"var(--font-mono)", fontWeight:700, marginBottom:8 }}>$3,241.80 <span style={{ color:"var(--green)", fontSize:11 }}>+1.87%</span></div>
                <MiniChart data={chart2} color="var(--accent)" height={40}/>
              </div>
              <div className="card" style={{ padding:16 }}>
                <div style={{ fontSize:12, color:"var(--muted)", marginBottom:6 }}>Today's Signals</div>
                <div style={{ fontFamily:"var(--font-head)", fontSize:28, fontWeight:800, color:"var(--accent)" }}>47</div>
                <div style={{ fontSize:11, color:"var(--green)", marginTop:4 }}>38 active • 9 closed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding:"40px 24px", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", background:"var(--bg2)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ fontFamily:"var(--font-head)", fontSize:32, fontWeight:800, color:"var(--accent)", marginBottom:4 }}>{s.val}</div>
              <div style={{ fontSize:14, fontWeight:600, marginBottom:2 }}>{s.label}</div>
              <div style={{ fontSize:12, color:"var(--muted)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Copilot Demo */}
      <section style={{ padding:"80px 24px", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div className="section-label">Exclusive Feature</div>
          <h2 className="h2">Ask Your AI Trading Copilot</h2>
          <p style={{ color:"var(--muted)", marginTop:10, maxWidth:520, margin:"10px auto 0" }}>Get instant market analysis, trade ideas, and strategy advice — powered by advanced AI. Try it live below.</p>
        </div>
        <div className="card" style={{ maxWidth:720, margin:"0 auto", padding:28 }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
            {["Analyze BTC trend","Best Forex pairs today","Risk management tips","What is RSI divergence?"].map(q => (
              <button key={q} className="tag" style={{ cursor:"pointer", border:"1px solid rgba(0,255,225,.15)", background:"transparent", color:"var(--accent)", fontSize:11, fontFamily:"var(--font-mono)", padding:"4px 10px", borderRadius:4 }} onClick={() => setAiQuery(q)}>{q}</button>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, marginBottom:16 }}>
            <input value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key==="Enter"&&askAI()} placeholder="Ask anything about the markets..." style={{ flex:1 }}/>
            <button className="glow-btn" style={{ padding:"10px 20px", flexShrink:0 }} onClick={askAI} disabled={aiLoading}>
              {aiLoading ? "..." : "→"}
            </button>
          </div>
          {(aiReply || aiLoading) && (
            <div style={{ background:"rgba(0,255,225,.04)", border:"1px solid rgba(0,255,225,.12)", borderRadius:8, padding:16, fontFamily:"var(--font-body)", fontSize:14, lineHeight:1.7, color:"var(--text)", minHeight:60 }}>
              {aiLoading ? <span style={{ color:"var(--accent)", animation:"pulse 1.5s infinite", display:"block" }}>🧠 Analyzing markets...</span> : aiReply}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:"80px 24px", background:"var(--bg2)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-label">Platform Features</div>
            <h2 className="h2">Everything You Need to Win</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
            {FEATURES.map((f,i) => (
              <div key={f.title} className="card" style={{ animationDelay:`${i*.05}s` }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
                <h3 className="h3" style={{ marginBottom:8 }}>{f.title}</h3>
                <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Heatmap Preview */}
      <section style={{ padding:"80px 24px", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:32, flexWrap:"wrap", gap:16 }}>
          <div>
            <div className="section-label">Market Heatmap</div>
            <h2 className="h2">See the Whole Market at Once</h2>
          </div>
          <button className="ghost-btn" onClick={() => setPage("Markets")} style={{ padding:"8px 20px", fontSize:12 }}>Full Heatmap →</button>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, alignItems:"flex-end" }}>
          {HEATMAP.map(h => {
            const color = h.chg > 2 ? "#00e676" : h.chg > 0 ? "#4caf50" : h.chg > -1 ? "#f44336" : "#b71c1c";
            const bg = h.chg > 2 ? "rgba(0,230,118,.2)" : h.chg > 0 ? "rgba(76,175,80,.15)" : h.chg > -1 ? "rgba(244,67,54,.15)" : "rgba(183,28,28,.2)";
            return (
              <div key={h.sym} className="heatmap-cell" style={{ width:h.size, height:h.size*.75, background:bg, border:`1px solid ${color}30` }}>
                <span style={{ fontFamily:"var(--font-mono)", fontWeight:700, fontSize: h.size > 90 ? 14 : 11 }}>{h.sym}</span>
                <span style={{ color, fontSize: h.size > 90 ? 12 : 10, marginTop:2 }}>{h.chg > 0 ? "+" : ""}{h.chg}%</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(135deg, rgba(0,255,225,.05), rgba(123,94,167,.08))", borderTop:"1px solid var(--border)", textAlign:"center" }}>
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <div className="section-label">Get Started Today</div>
          <h2 className="h2" style={{ marginBottom:16 }}>Join 80,000+ Profitable Traders</h2>
          <p style={{ color:"var(--muted)", marginBottom:28 }}>Start free. No credit card required. Upgrade when you're ready.</p>
          <div style={{ display:"flex", gap:10, justifyContent:"center", maxWidth:400, margin:"0 auto" }}>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{ flex:1 }}/>
            <button className="glow-btn" onClick={() => setPage("Pricing")}>Start Free</button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ── DASHBOARD PAGE ────────────────────────────────────────────────────────────
const DashboardPage = () => {
  const [tab, setTab] = useState("overview");
  const [prices, setPrices] = useState(MARKETS.reduce((a,m)=>({...a,[m.sym]:m.price}),{}));

  useEffect(() => {
    const iv = setInterval(() => {
      setPrices(p => {
        const n = {...p};
        MARKETS.forEach(m => { n[m.sym] = m.price * (1 + (Math.random()-.5)*.002); });
        return n;
      });
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  const pnl = [
    { label:"Today", val:"+$1,240", sub:"+2.1%", up:true },
    { label:"Week",  val:"+$4,820", sub:"+8.3%", up:true },
    { label:"Month", val:"+$18,540",sub:"+31.2%",up:true },
    { label:"Portfolio", val:"$78,240", sub:"Total value", up:true },
  ];

  const histChart = [42,45,43,48,46,52,49,55,53,58,56,61,59,64,62,68,65,71,68,74,71,78,75,82];

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28, flexWrap:"wrap", gap:16 }}>
        <div>
          <h1 className="h2">Dashboard</h1>
          <div style={{ color:"var(--muted)", fontSize:13, marginTop:4, fontFamily:"var(--font-mono)" }}>
            <span className="dot-live" style={{ marginRight:6 }}/>Live · Updated {new Date().toLocaleTimeString()}
          </div>
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <select style={{ width:"auto", padding:"8px 14px" }}>
            <option>All Markets</option>
            <option>Crypto</option>
            <option>Forex</option>
            <option>Stocks</option>
          </select>
          <button className="glow-btn" style={{ padding:"8px 18px", fontSize:12 }}>+ New Alert</button>
        </div>
      </div>

      {/* PnL Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {pnl.map(p => (
          <div key={p.label} className="card" style={{ padding:18 }}>
            <div style={{ fontSize:12, color:"var(--muted)", marginBottom:6 }}>{p.label}</div>
            <div style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:800, color: p.up ? "var(--green)" : "var(--red)" }}>{p.val}</div>
            <div style={{ fontSize:12, color:"var(--muted)", marginTop:4 }}>{p.sub}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:20 }}>
        {/* Portfolio chart */}
        <div className="card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <h3 className="h3">Portfolio Performance</h3>
            <div className="tabs">
              {["1D","1W","1M","3M"].map(t => <button key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)}>{t}</button>)}
            </div>
          </div>
          <MiniChart data={histChart} color="var(--accent)" height={140}/>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--muted)", fontFamily:"var(--font-mono)", marginTop:8 }}>
            {["Jan","Feb","Mar","Apr","May","Jun"].map(m=><span key={m}>{m}</span>)}
          </div>
        </div>

        {/* Active signals */}
        <div className="card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <h3 className="h3">Active Signals</h3>
            <span className="badge badge-green"><span className="dot-live"/>8 live</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {SIGNALS.slice(0,5).map(s => (
              <div key={s.sym} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid var(--border)" }}>
                <div>
                  <div style={{ fontFamily:"var(--font-mono)", fontWeight:700, fontSize:13 }}>{s.sym}</div>
                  <div style={{ fontSize:11, color:"var(--muted)" }}>{s.tf} · {s.time}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <ConfBar val={s.conf}/>
                  <span className={`badge ${s.type==="BUY"?"badge-green":"badge-red"}`} style={{ fontSize:10 }}>{s.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market table */}
      <div className="card">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <h3 className="h3">Watchlist</h3>
          <button className="ghost-btn" style={{ padding:"6px 14px", fontSize:11 }}>Edit</button>
        </div>
        <div className="scroll-x">
          <table>
            <thead><tr>
              <th>Symbol</th><th>Price</th><th>24h Change</th><th>Volume</th><th>Trend</th><th>Signal</th><th>Market</th>
            </tr></thead>
            <tbody>
              {MARKETS.map(m => (
                <tr key={m.sym}>
                  <td style={{ fontFamily:"var(--font-mono)", fontWeight:700 }}>{m.sym}</td>
                  <td style={{ fontFamily:"var(--font-mono)" }}>{prices[m.sym] > 100 ? prices[m.sym].toLocaleString("en-US",{maximumFractionDigits:2}) : prices[m.sym].toFixed(4)}</td>
                  <td style={{ color: m.chg >= 0 ? "var(--green)" : "var(--red)", fontFamily:"var(--font-mono)", fontSize:13 }}>{m.chg >= 0 ? "+" : ""}{m.chg}%</td>
                  <td style={{ color:"var(--muted)", fontSize:13 }}>{m.vol}</td>
                  <td><Sparkline up={m.chg >= 0}/></td>
                  <td><span className={`badge ${m.chg > 1 ? "badge-green" : m.chg < -1 ? "badge-red" : "badge-accent"}`} style={{ fontSize:10 }}>{m.chg > 1 ? "BUY" : m.chg < -1 ? "SELL" : "HOLD"}</span></td>
                  <td><span className="tag" style={{ fontSize:10 }}>{m.mkt}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── SIGNALS PAGE ──────────────────────────────────────────────────────────────
const SignalsPage = () => {
  const [filter, setFilter] = useState("All");
  const [mktFilter, setMktFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const markets = ["All","Crypto","Forex","Stocks","Commodities"];
  const types = ["All","BUY","SELL"];

  const filtered = SIGNALS.filter(s =>
    (filter==="All"||s.type===filter) &&
    (mktFilter==="All"||s.mkt===mktFilter) &&
    (s.sym.toLowerCase().includes(search.toLowerCase()))
  );

  async function getAIAnalysis(sig) {
    setLoadingId(sig.sym); setSelected(sig);
    if (aiAnalysis[sig.sym]) { setLoadingId(null); return; }
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:"You are TradevioAI. Give a detailed trading analysis for a signal. Include: market context, key levels, risk/reward, and a confidence breakdown. Be concise but professional. Under 200 words.",
          messages:[{role:"user", content:`Analyze this ${sig.type} signal for ${sig.sym}: Entry ${sig.entry}, TP ${sig.tp}, SL ${sig.sl}. Reason: ${sig.reason}. Timeframe: ${sig.tf}.`}]
        })
      });
      const d = await res.json();
      setAiAnalysis(a => ({...a, [sig.sym]: d.content?.[0]?.text || "Analysis unavailable."}));
    } catch { setAiAnalysis(a => ({...a, [sig.sym]: "⚠️ Could not load analysis."})); }
    setLoadingId(null);
  }

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:28, flexWrap:"wrap", gap:16 }}>
        <div>
          <div className="section-label">AI-Powered</div>
          <h1 className="h2">Live Trading Signals</h1>
          <p style={{ color:"var(--muted)", marginTop:6, fontSize:14 }}>Real-time signals generated by our neural engine. Click any signal for full AI analysis.</p>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <span className="badge badge-green"><span className="dot-live"/>Live Feed</span>
          <span style={{ fontSize:12, color:"var(--muted)", fontFamily:"var(--font-mono)" }}>{SIGNALS.length} signals today</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search symbol..." style={{ width:180 }}/>
        <div className="tabs">{types.map(t=><button key={t} className={`tab${filter===t?" active":""}`} onClick={()=>setFilter(t)}>{t}</button>)}</div>
        <div className="tabs">{markets.map(m=><button key={m} className={`tab${mktFilter===m?" active":""}`} onClick={()=>setMktFilter(m)}>{m}</button>)}</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap:20 }}>
        {/* Signal cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16, alignContent:"start" }}>
          {filtered.map(s => (
            <div key={s.sym} className="card" style={{ cursor:"pointer", border: selected?.sym===s.sym ? "1px solid var(--accent)" : undefined }} onClick={() => getAIAnalysis(s)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <div>
                  <div style={{ fontFamily:"var(--font-mono)", fontWeight:700, fontSize:16 }}>{s.sym}</div>
                  <div style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>{s.mkt} · {s.tf} · {s.time}</div>
                </div>
                <span className={`badge ${s.type==="BUY"?"badge-green":"badge-red"}`}>{s.type}</span>
              </div>
              <ConfBar val={s.conf}/>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginTop:14, padding:"10px 0", borderTop:"1px solid var(--border)" }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:10, color:"var(--muted)", marginBottom:3 }}>ENTRY</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:12, fontWeight:700 }}>{s.entry}</div>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:10, color:"var(--green)", marginBottom:3 }}>TARGET</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:12, fontWeight:700, color:"var(--green)" }}>{s.tp}</div>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:10, color:"var(--red)", marginBottom:3 }}>STOP</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:12, fontWeight:700, color:"var(--red)" }}>{s.sl}</div>
                </div>
              </div>
              <div style={{ marginTop:10, fontSize:12, color:"var(--muted)", fontStyle:"italic" }}>"{s.reason}"</div>
              {loadingId===s.sym && <div style={{ marginTop:10, color:"var(--accent)", fontSize:12, fontFamily:"var(--font-mono)", animation:"pulse 1s infinite" }}>🧠 Loading AI analysis...</div>}
            </div>
          ))}
        </div>

        {/* AI Analysis Panel */}
        {selected && (
          <div className="card" style={{ position:"sticky", top:80, height:"fit-content", border:"1px solid rgba(0,255,225,.2)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div>
                <div style={{ fontSize:11, color:"var(--accent)", fontFamily:"var(--font-mono)", marginBottom:4 }}>AI DEEP ANALYSIS</div>
                <div style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:18 }}>{selected.sym}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background:"none", border:"none", color:"var(--muted)", cursor:"pointer", fontSize:18 }}>✕</button>
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              <span className={`badge ${selected.type==="BUY"?"badge-green":"badge-red"}`}>{selected.type}</span>
              <span className="badge badge-accent">{selected.tf}</span>
              <span className="badge badge-purple">AI {selected.conf}%</span>
            </div>
            {/* R/R visual */}
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:11, color:"var(--muted)", marginBottom:8, fontFamily:"var(--font-mono)" }}>RISK / REWARD</div>
              <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                <div style={{ flex:1, height:8, background:"var(--red)", borderRadius:4, opacity:.7 }}/>
                <div style={{ width:2, background:"var(--text)" }}/>
                <div style={{ flex: Math.abs(selected.tp-selected.entry)/Math.abs(selected.entry-selected.sl), height:8, background:"var(--green)", borderRadius:4 }}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--muted)", marginTop:4, fontFamily:"var(--font-mono)" }}>
                <span>SL {selected.sl}</span><span>Entry {selected.entry}</span><span>TP {selected.tp}</span>
              </div>
            </div>
            <div style={{ background:"rgba(0,255,225,.04)", border:"1px solid rgba(0,255,225,.1)", borderRadius:8, padding:14, fontSize:13, lineHeight:1.75, color:"var(--text)", minHeight:100 }}>
              {loadingId===selected.sym ? <span style={{ color:"var(--accent)", animation:"pulse 1.5s infinite", display:"block" }}>🧠 Generating deep analysis...</span>
               : aiAnalysis[selected.sym] || <span style={{ color:"var(--muted)" }}>Analysis loading...</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── MARKETS PAGE ──────────────────────────────────────────────────────────────
const MarketsPage = () => {
  const [mktTab, setMktTab] = useState("All");
  const [prices, setPrices] = useState(MARKETS.reduce((a,m)=>({...a,[m.sym]:m.price}),{}));
  const [changes, setChanges] = useState(MARKETS.reduce((a,m)=>({...a,[m.sym]:m.chg}),{}));

  useEffect(() => {
    const iv = setInterval(() => {
      setPrices(p => {
        const n = {...p};
        MARKETS.forEach(m => { n[m.sym] = parseFloat((m.price * (1 + (Math.random()-.5)*.003)).toFixed(m.price>100?2:5)); });
        return n;
      });
    }, 1200);
    return () => clearInterval(iv);
  }, []);

  const filtered = mktTab==="All" ? MARKETS : MARKETS.filter(m=>m.mkt===mktTab);

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ marginBottom:32 }}>
        <div className="section-label">All Markets</div>
        <h1 className="h2">Market Overview</h1>
      </div>

      {/* Heatmap */}
      <div className="card" style={{ marginBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
          <h3 className="h3">Market Heatmap</h3>
          <div style={{ display:"flex", gap:12, fontSize:12, color:"var(--muted)", alignItems:"center" }}>
            <span style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ width:10, height:10, borderRadius:2, background:"rgba(0,230,118,.3)", display:"inline-block" }}/>Strong Up</span>
            <span style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ width:10, height:10, borderRadius:2, background:"rgba(244,67,54,.3)", display:"inline-block" }}/>Strong Down</span>
          </div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, alignItems:"flex-end" }}>
          {HEATMAP.map(h => {
            const color = h.chg > 2 ? "#00e676" : h.chg > 0 ? "#4caf50" : h.chg > -1 ? "#f44336" : "#b71c1c";
            const bg = h.chg > 2 ? "rgba(0,230,118,.2)" : h.chg > 0 ? "rgba(76,175,80,.15)" : h.chg > -1 ? "rgba(244,67,54,.15)" : "rgba(183,28,28,.2)";
            return (
              <div key={h.sym} className="heatmap-cell" style={{ width:h.size, height:h.size*.75, background:bg, border:`1px solid ${color}30` }}>
                <span style={{ fontFamily:"var(--font-mono)", fontWeight:700, fontSize: h.size > 90 ? 14 : 11 }}>{h.sym}</span>
                <span style={{ color, fontSize: h.size > 90 ? 12 : 10, marginTop:2 }}>{h.chg > 0 ? "+" : ""}{h.chg}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Market tabs + table */}
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        <div className="tabs">
          {["All","Crypto","Forex","Stocks","Commodities"].map(t=>(
            <button key={t} className={`tab${mktTab===t?" active":""}`} onClick={()=>setMktTab(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="scroll-x">
          <table>
            <thead><tr>
              <th>#</th><th>Symbol</th><th>Price</th><th>24h %</th><th>Volume</th><th>7D Chart</th><th>AI Signal</th><th>Confidence</th>
            </tr></thead>
            <tbody>
              {filtered.map((m,i) => {
                const data = Array.from({length:20}, (_,j) => m.price * (1 + Math.sin(j*.5+i)*.05));
                return (
                  <tr key={m.sym}>
                    <td style={{ color:"var(--muted)", fontSize:12 }}>{i+1}</td>
                    <td>
                      <div style={{ fontFamily:"var(--font-mono)", fontWeight:700 }}>{m.sym}</div>
                      <div style={{ fontSize:10, color:"var(--muted)" }}><span className="tag" style={{ fontSize:9 }}>{m.mkt}</span></div>
                    </td>
                    <td style={{ fontFamily:"var(--font-mono)", fontWeight:600 }}>{prices[m.sym] > 100 ? prices[m.sym].toLocaleString("en-US",{maximumFractionDigits:2}) : prices[m.sym].toFixed(5)}</td>
                    <td style={{ color: m.chg >= 0 ? "var(--green)" : "var(--red)", fontFamily:"var(--font-mono)" }}>{m.chg >= 0 ? "+" : ""}{m.chg}%</td>
                    <td style={{ color:"var(--muted)", fontSize:13 }}>{m.vol}</td>
                    <td style={{ width:80 }}><MiniChart data={data} color={m.chg>=0?"var(--green)":"var(--red)"} height={32}/></td>
                    <td><span className={`badge ${m.chg > 1 ? "badge-green" : m.chg < -1 ? "badge-red" : "badge-accent"}`} style={{ fontSize:10 }}>{m.chg > 1 ? "BUY" : m.chg < -1 ? "SELL" : "HOLD"}</span></td>
                    <td><ConfBar val={70 + Math.floor(Math.abs(m.chg)*5)}/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── PRICING PAGE ──────────────────────────────────────────────────────────────
const PricingPage = () => {
  const [annual, setAnnual] = useState(false);
  const [selected, setSelected] = useState("Pro");

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"60px 24px" }}>
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <div className="section-label">Simple Pricing</div>
        <h1 className="h2" style={{ marginBottom:12 }}>Choose Your Edge</h1>
        <p style={{ color:"var(--muted)", marginBottom:24 }}>Start free. Upgrade anytime. Cancel whenever.</p>
        <div style={{ display:"flex", alignItems:"center", gap:12, justifyContent:"center" }}>
          <span style={{ fontSize:14, color: !annual ? "var(--text)" : "var(--muted)" }}>Monthly</span>
          <div onClick={() => setAnnual(!annual)} style={{ width:44, height:24, background: annual ? "var(--accent)" : "var(--bg3)", borderRadius:12, cursor:"pointer", position:"relative", transition:"background .2s", border:"1px solid var(--border)" }}>
            <div style={{ width:18, height:18, background: annual ? "#000" : "var(--muted)", borderRadius:"50%", position:"absolute", top:2, left: annual ? 22 : 2, transition:"left .2s" }}/>
          </div>
          <span style={{ fontSize:14, color: annual ? "var(--text)" : "var(--muted)" }}>Annual <span style={{ color:"var(--green)", fontSize:11 }}>-20%</span></span>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
        {PLANS.map(p => (
          <div key={p.name} className="card" onClick={() => setSelected(p.name)} style={{ position:"relative", cursor:"pointer", border: p.hot || selected===p.name ? `1px solid ${p.color}` : undefined, transform: p.hot ? "scale(1.03)" : undefined, background: p.hot ? "linear-gradient(145deg, #0d0d16, #12121f)" : undefined }}>
            {p.hot && <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:"var(--accent)", color:"#000", padding:"3px 14px", borderRadius:100, fontSize:11, fontFamily:"var(--font-mono)", fontWeight:700, whiteSpace:"nowrap" }}>MOST POPULAR</div>}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:13, color:"var(--muted)", marginBottom:6, fontFamily:"var(--font-mono)" }}>{p.name.toUpperCase()}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
                <span style={{ fontFamily:"var(--font-head)", fontSize:40, fontWeight:800, color: p.color !== "var(--border)" ? p.color : "var(--text)" }}>
                  ${annual && p.price > 0 ? Math.round(p.price*.8) : p.price}
                </span>
                <span style={{ color:"var(--muted)", fontSize:14 }}>/{p.period}</span>
              </div>
            </div>
            <hr className="divider" style={{ marginBottom:20 }}/>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
              {p.features.map(f => (
                <li key={f} style={{ display:"flex", gap:10, fontSize:14, alignItems:"flex-start" }}>
                  <span style={{ color:"var(--green)", flexShrink:0, marginTop:1 }}>✓</span>
                  <span style={{ color:"var(--text)" }}>{f}</span>
                </li>
              ))}
            </ul>
            <button className={p.hot ? "glow-btn" : "ghost-btn"} style={{ width:"100%", marginTop:24, borderColor: p.name==="Elite" ? "#b48fe8" : undefined, color: p.name==="Elite" && !p.hot ? "#b48fe8" : undefined }}>
              {p.price===0 ? "Start Free" : "Get " + p.name}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ marginTop:60 }}>
        <h2 className="h3" style={{ textAlign:"center", marginBottom:28 }}>Frequently Asked Questions</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {[
            ["Is there a free trial?","Yes — our Starter plan is free forever with 10 signals/day. Pro and Elite plans offer a 7-day free trial."],
            ["How accurate are the signals?","Our neural engine achieves an average 94% directional accuracy across all supported instruments over a 90-day rolling window."],
            ["Can I cancel anytime?","Absolutely. Cancel with one click from your dashboard. No questions asked."],
            ["What markets are supported?","Crypto (200+), Forex (50+ pairs), US & global stocks (500+), commodities, and indices."],
          ].map(([q,a]) => (
            <div key={q} className="card">
              <h3 style={{ fontSize:15, fontWeight:700, marginBottom:8 }}>{q}</h3>
              <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.65 }}>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [prices, setPrices] = useState(MARKETS);

  useEffect(() => {
    const iv = setInterval(() => {
      setPrices(p => p.map(m => ({ ...m, price: m.price * (1+(Math.random()-.5)*.001) })));
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  const pageMap = { Home: <HomePage setPage={setPage}/>, Dashboard: <DashboardPage/>, Signals: <SignalsPage/>, Markets: <MarketsPage/>, Pricing: <PricingPage/> };

  return (
    <>
      <FontLink/>
      <TickerBar prices={prices}/>
      <Nav page={page} setPage={setPage}/>
      <main>{pageMap[page] || <HomePage setPage={setPage}/>}</main>
      <footer style={{ borderTop:"1px solid var(--border)", padding:"28px 24px", textAlign:"center", color:"var(--muted)", fontSize:13 }}>
        <Logo/>
        <p style={{ marginTop:12 }}>© 2026 TradevioAI · All rights reserved · <span style={{ color:"var(--accent)" }}>Not financial advice</span></p>
      </footer>
    </>
  );
}
