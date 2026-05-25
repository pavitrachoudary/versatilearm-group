import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ExternalLink, CheckCircle2, Zap, Shield, TrendingUp, Globe, BarChart3, FileText, Vote, Layers, Target, Award, Cpu, DollarSign, Users, ArrowRight, Database, Eye } from 'lucide-react';
import { HowVLandsWorks } from '../components/HowVLandsWorks';
import { VLandsLogo } from '../components/VLandsLogo';
import { VLands3DInteractive } from '../components/VLands3DInteractive';
import { ProductDemo } from '../components/ProductDemo';

const VLandsDeepDive = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'How It Works', 'Product', 'Business Model', 'Market', 'Moat', 'Company Profile'];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && tabs.includes(tabParam)) {
      setActiveTab(tabParam);
    } else if (window.location.hash === '#demo') {
      setActiveTab('Product');
      setTimeout(() => {
        const demoEl = document.getElementById('demo');
        if (demoEl) { demoEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      }, 500);
    }
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      const element = document.getElementById('vlands-tab-content');
      if (element) {
        const headerOffset = 180;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative flex items-center bg-surface overflow-hidden" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,212,170,0.05),transparent_60%)] pointer-events-none" />
        <div className="container no-prose grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center relative z-10 w-full">
          <div className="lg:col-span-6 flex flex-col gap-8 w-full min-w-0">
            <div className="flex items-center gap-6">
              <VLandsLogo className="w-20 h-20 shadow-xl" />
              <div className="flex flex-col">
                <h1 className="text-5xl font-display font-bold leading-[var(--leading-title)]" style={{ color: '#000000' }}>VLands</h1>
                <p className="text-primary font-mono text-sm uppercase tracking-widest font-semibold">A Versatile Arm Group Company</p>
              </div>
            </div>
            <p className="text-4xl leading-[var(--leading-title)] font-display font-medium text-neutral-950">The world's first live-order-book land Marketplace. Buy 3 Sq. Yd of physical Indian land in 5 clicks, secured with Dual-rail: government UDS mutation + ERC-721 blockchain registry. Exit in days, not decades with effective lockins.</p>
            <p className="text-xl text-neutral-600 leading-relaxed">VLands doesn't just fractionalise land — it liquifies it. For the first time in history, investors can post a MARKET, LIMIT, or STOP-LOSS order on a physical land parcel. That's not a feature. That's a new asset class.</p>
            <div className="flex flex-wrap gap-4 items-center mt-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase">PropTech</span>
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase">RegTech</span>
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase">FinTech</span>
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase">Blockchain</span>
                <span className="bg-accent/20 text-primary-dark px-4 py-1 rounded-full text-xs font-bold uppercase font-extrabold">Prototype Live</span>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <a href="https://vlands.app" target="_blank" rel="noopener noreferrer" className="bg-primary text-white hover:bg-primary-dark px-8 py-3 rounded-sm font-bold flex items-center gap-2 w-fit transition-all hover:-translate-y-0.5 hover:shadow-xl">Visit vlands.app <ExternalLink size={18} /></a>
                <Link to="/pitch/vlands" className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-sm font-bold flex items-center gap-2 w-fit transition-all hover:-translate-y-0.5 hover:shadow-xl">View Pitch Deck</Link>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative w-full flex items-center justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[600px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,107,90,0.05),transparent)] pointer-events-none" />
            <div className="w-full h-full max-w-lg md:max-w-xl"><VLands3DInteractive /></div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className={`${activeTab === 'How It Works' ? 'relative' : 'sticky top-[var(--header-height)]'} z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100`}>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex justify-start overflow-x-auto no-scrollbar">
            <div className="flex gap-8 pt-6 pb-4">
              {tabs.map((tab) => (
                <button key={tab} onClick={() => handleTabClick(tab)}
                  className={`text-xs font-bold uppercase tracking-[0.2em] pb-4 border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-neutral-400 hover:text-neutral-600'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section id="vlands-tab-content" className="section" style={{ paddingBottom: '0px' }}>
        <div className="container no-prose max-w-5xl w-full">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>

              {/* OVERVIEW */}
              {activeTab === 'Overview' && (
                <div className="flex flex-col gap-24">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="flex flex-col gap-8">
                      <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">Land as liquid as a stock. Legal as a registered deed.</h2>
                      <p className="text-xl text-neutral-600 leading-relaxed">VLands is the world's first platform to run a live bid/ask order book on fractional physical land. Investors buy in Sq. Yd units — registered via Aadhaar OTP with a government-mutated UDS title — and exit through a live secondary market. Not a promise of liquidity. Actual liquidity.</p>
                      <p className="text-lg text-neutral-500 leading-relaxed">Every parcel on VLands runs on a dual-rail architecture: a physical UDS mutation tracked through 9 government stages, and an ERC-721 NFT deed that fractionalises into ERC-20 tokens. The blockchain and the government land record are co-authoritative. That's never been done before.</p>
                      <ul className="flex flex-col gap-4">
                        {[
                          { label: 'Founded', val: 'October 2025' },
                          { label: 'Incorporated', val: 'May 2026' },
                          { label: 'Public Launch', val: 'April 2027 (Prototype Live Now)' },
                          { label: 'Target Market', val: 'India + NRI Diaspora (35M+) + International' },
                          { label: 'Minimum Entry', val: '3 Sq. Yd (≈ ₹45K–₹2.2L based on location)' },
                          { label: 'Stage', val: 'Pre-Seed Fundraising' },
                          { label: 'Infrastructure', val: 'Dual-Rail: UDS Mutation + ERC-721/ERC-20' },
                        ].map(item => (
                          <li key={item.label} className="flex items-start gap-3 text-neutral-600">
                            <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                            <span><strong>{item.label}:</strong> {item.val}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="bg-primary p-10 rounded-2xl flex flex-col items-center justify-center text-center gap-4 text-white">
                        <span className="font-mono text-accent text-xs uppercase tracking-widest">The moat no one sees coming</span>
                        <div className="text-5xl font-display font-bold">Live Order Book</div>
                        <p className="text-white/70 text-sm max-w-xs">Market · Limit · Stop-Loss orders on physical land. The world's first price-discovery marketplace for real estate.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { val: '$393T', label: 'Global Real Estate TAM' },
                          { val: '12–18%', label: 'Target Land Yield p.a. (capital appreciation + rentals)' },
                          { val: '24–36 mo', label: 'Competitor Replication Time' },
                          { val: '33/33', label: 'Land Features vs 3/33 for competitors' },
                        ].map(s => (
                          <div key={s.label} className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 text-center">
                            <div className="text-2xl font-display font-bold text-primary">{s.val}</div>
                            <p className="text-xs text-neutral-500 mt-1 leading-tight">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-neutral-950 text-white p-14 rounded-3xl flex flex-col gap-8">
                    <span className="font-mono text-accent text-xs uppercase tracking-widest">The unclaimed quadrant</span>
                    <h3 className="text-4xl font-display font-medium italic leading-[var(--leading-title)] text-white">"Every CRE platform is competing in a $80 billion market. VLands is targeting the $1 T+ land market that has no digital-native competitor."</h3>
                    <p className="text-neutral-400 text-lg leading-relaxed max-w-3xl">Strata, hBits, and PropertyShare have collectively raised hundreds of crores and built zero land-specific features. The compliance complexity of UDS law, sub-registrar workflows, and Aadhaar OTP is not a feature sprint — it's a 24-month regulatory engineering problem. VLands has already solved it. This is not a first-mover advantage. It's a fortress advantage.</p>
                  </div>
                </div>
              )}

              {/* HOW IT WORKS */}
              {activeTab === 'How It Works' && <HowVLandsWorks />}

              {/* PRODUCT */}
              {activeTab === 'Product' && (
                <div className="flex flex-col gap-20">
                  <div className="flex flex-col gap-6">
                    <span className="font-mono text-primary text-xs uppercase tracking-widest">The Platform</span>
                    <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">world's first live-order-book land Marketplace, Ready to capture $890 million som in 5 years.</h2>
                    <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl">Every competitor in Indian PropTech built a listing platform. VLands built a Marketplace. That distinction — the live order book, the dual-rail registry, the instant exit mechanism — is what separates a property website from a new asset class.</p>
                  </div>
                  <ProductDemo
                    productName="VLands"
                    demoTitle="Explore the VLands Marketplace"
                    demoSubtitle="See how simple it is to browse, buy, and trade physical land fractions in 5 clicks via our dual-rail sovereign infrastructure."
                    features={[
                      { icon: "⚡", label: "24/7 Live Order Book" },
                      { icon: "📜", label: "Government UDS Mutation (M1-M9)" },
                      { icon: "🔒", label: "ERC-721 Cryptographic Title NFT" },
                      { icon: "🌍", label: "Global NRI-LRS Payment Rail" }
                    ]}
                    accentColor="primary"
                  />
                  <div className="bg-primary text-white p-14 rounded-3xl flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                      <span className="font-mono text-accent text-xs uppercase tracking-widest">Flagship Innovation</span>
                      <h3 className="text-4xl font-display font-medium" style={{ color: '#ffffff' }}>Live 24/7 Order Book for Physical Land</h3>
                      <p className="text-white/70 text-lg leading-relaxed max-w-2xl">The same infrastructure that makes equities liquid — now applied to real estate. For the first time ever, land has a bid/ask spread, a depth chart, and a price-discovery mechanism driven by real market demand.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { type: 'MARKET', desc: 'Execute instantly at the best available price. Land trades in minutes, not months.', tag: 'Instant' },
                        { type: 'LIMIT', desc: 'Set your target price and exit automatically when the market clears — no phone calls, no brokers.', tag: 'Automated' },
                        { type: 'STOP-LOSS', desc: 'Define your floor. Land now has downside protection mechanics that only equities markets had before.', tag: 'Protected' },
                      ].map(o => (
                        <div key={o.type} className="bg-white/10 p-8 rounded-xl border border-white/10">
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-accent font-display font-bold text-2xl" style={{ color: '#ffffff' }}>{o.type}</span>
                            <span className="text-xs font-mono bg-accent/20 text-accent px-2 py-1 rounded-full">{o.tag}</span>
                          </div>
                          <p className="text-white/70 text-sm leading-relaxed">{o.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { icon: <Cpu size={24} />, title: 'Dual-Rail Ownership Registry', desc: 'ERC-721 NFT deed fractionalised into ERC-20 tokens (1 per Sq. Yd), running in parallel with physical UDS mutation through M1–M9 government stages. Blockchain state and government records are co-authoritative — an industry first.', badge: 'World First' },
                      { icon: <Zap size={24} />, title: '5-Click Land Ownership', desc: 'Browse → Select → Review & e-Sign (Aadhaar OTP) → Pay → Own. No sub-registrar visits. No physical paperwork. No waiting rooms. Legally recognised under the Registration Bill 2025 and IT Act.', badge: 'Patented Flow' },
                      { icon: <Shield size={24} />, title: 'Soulbound Lock-in Enforcement', desc: 'The 45-day lock-in period is enforced at smart contract level via a Soulbound token mechanism — no admin override is possible. Investor protection without counterparty risk. Immutable, auditable, provable.', badge: 'Smart Contract' },
                      { icon: <TrendingUp size={24} />, title: 'Seller Royalty Flywheel', desc: 'After exit, sellers earn a 0.05% royalty for every 1% NAV growth of the land they once owned. Converts one-time sellers into permanent platform advocates — a referral engine that compounds with every completed transaction.', badge: 'Flywheel' },
                      { icon: <BarChart3 size={24} />, title: 'Weekly Market-Price Engine', desc: 'A proprietary algorithm calculates real-time NAV for every parcel weekly — factoring demand depth, comparable sales, mutation status, and rental yields. VLands becomes the authoritative pricing source for fractional Indian land.', badge: 'Proprietary Algo' },
                      { icon: <Globe size={24} />, title: 'Cross-Border SPV + LRS Rail', desc: 'NRI and international investors access Indian land via SPV tokenisation and LRS-compliant flows. Dubai listings on the same interface as Andhra Pradesh plots — one login, one wallet, a global land portfolio.', badge: 'Global' },
                      { icon: <Eye size={24} />, title: 'Drone + Satellite + Grid Views', desc: 'Every listing ships with drone footage, satellite imagery, and grid-coordinate land views — so investors can visually verify exactly what they are buying from anywhere in the world. No trust-me-bro listings.', badge: 'Verified' },
                      { icon: <Vote size={24} />, title: 'My Control Hub — Governance', desc: 'Per-property governance voting, broadcast updates, and concern ticketing — all scoped to verified co-investors of each specific asset. Passive holders become active co-owners with a direct line to decision-making.', badge: 'On-Chain' },
                      { icon: <Database size={24} />, title: 'Multi-Unit Land Intelligence', desc: 'Native support for Gaj, Sq Yd, Sq Ft, Cent (South India), Guntha (Gujarat), Rood, Acre, and Hectare with dynamic price-per-unit conversion. Localisation depth that forces any competitor to rebuild their entire data model.', badge: 'Localised' },
                      { icon: <FileText size={24} />, title: '7/12 Extract Integration', desc: 'Pre- and post-mutation 7/12 extract (Pahani) integration gives investors direct access to the government revenue record for their property — the gold standard of Indian land ownership verification.', badge: 'Government Link' },
                      { icon: <DollarSign size={24} />, title: 'In-App Land-Backed Loans', desc: 'Investors can borrow against their land holdings at fixed EMI rates — turning illiquid equity into working capital without selling. The first embedded lending product purpose-built for fractional land collateral.', badge: 'FinTech' },
                      { icon: <Users size={24} />, title: 'Agent CRM + Deal Pipeline', desc: "A dedicated agent app with CRM and deal pipeline management for property agents. Converts a fragmented 1.2M-agent offline network into a digital distribution engine — extending VLands' reach into Tier 2 and 3 markets.", badge: 'Distribution' },
                    ].map((f) => (
                      <div key={f.title} className="p-8 border border-neutral-100 rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all group flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div className="text-primary">{f.icon}</div>
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-1 rounded-full">{f.badge}</span>
                        </div>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{f.title}</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-neutral-950 text-white p-12 rounded-2xl flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <span className="font-mono text-accent text-xs uppercase tracking-widest">The 9-Stage Mutation Pipeline</span>
                      <h3 className="text-3xl font-display font-medium" style={{ color: '#ffffff' }}>Government land records updated in 30–45 days. Every stage tracked in real time.</h3>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
                      {['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9'].map((m, i) => (
                        <div key={m} className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center font-bold text-accent text-xs">{m}</div>
                          {i < 8 && <div className="hidden md:block w-full h-0.5 bg-accent/20 mt-4" />}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                      {[
                        { stage: 'M1–M3: Application', desc: 'Mutation filed → Revenue dept acknowledgement → Notice period activated.' },
                        { stage: 'M4–M6: Verification', desc: 'Objection clearance → Field officer verification → Taluk office approval.' },
                        { stage: 'M7–M9: Confirmation', desc: 'Revenue officer sign-off → Pahani (7/12) updated → Mutation certificate issued.' },
                      ].map(s => (
                        <div key={s.stage} className="flex flex-col gap-2">
                          <p className="text-accent font-bold text-sm">{s.stage}</p>
                          <p className="text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* BUSINESS MODEL */}
              {activeTab === 'Business Model' && (
                <div className="flex flex-col gap-20">
                  <div className="flex flex-col gap-6">
                    <span className="font-mono text-primary text-xs uppercase tracking-widest">Revenue Architecture</span>
                    <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">Six revenue streams on a single land transaction. An annuity machine.</h2>
                    <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl">VLands generates revenue across every moment of a land asset's lifecycle — from first listing to eventual resale, and at every NAV milestone in between. Compare that to CRE competitors with 1–2 revenue streams and you see why this model is structurally superior.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { rate: '4%', title: 'Seller Listing Fee', desc: 'Developers and landowners pay to onboard verified, litigation-free assets onto the marketplace. Replaces the traditional 5% broker commission — saving sellers money while earning VLands revenue.', highlight: true },
                      { rate: '2%', title: 'Transaction Fee', desc: 'Charged on every primary purchase and every secondary resale processed through the platform order book. Scales directly with GMV.', highlight: false },
                      { rate: '10%', title: 'Rental Handling Fee', desc: 'Weekly rental income collected and distributed automatically to co-owners. VLands takes 10% for collection, accounting, and payout automation.', highlight: false },
                      { rate: '0.15%', title: 'NAV Growth Facilitation Fee', desc: 'Per 1% NAV appreciation measured weekly. This aligns platform legal and operational facilitation fees upon user exit only, creating a compounding yield engine from long-term assets.', highlight: true },
                      { rate: '0.05%', title: 'Seller Royalty (Paid to Sellers)', desc: 'After exit, original sellers earn 0.05% per 1% NAV growth as a royalty. This converts every completed sale into a permanent referral channel — the compounding distribution engine no competitor has.', highlight: false },
                      { rate: 'Fixed EMI', title: 'In-App Land-Backed Loans', desc: 'Interest income on loans issued against land holdings as collateral. Opens a lending revenue stream that compounds with the growth of the investor portfolio base.', highlight: false },
                      { rate: 'SaaS', title: 'Landowner Portfolio Management', desc: 'Subscription revenue from developers and large landowners who manage land portfolios as business assets — powered by usage-based credits and reporting infrastructure.', highlight: false },
                    ].map((r) => (
                      <div key={r.title} className={`p-10 rounded-2xl flex flex-col gap-4 ${r.highlight ? 'bg-primary text-white' : 'bg-neutral-50 border border-neutral-100'}`}>
                        <div className={`text-5xl font-display font-bold ${r.highlight ? 'text-accent' : 'text-primary'}`}>{r.rate}</div>
                        <h3 className="text-xl font-bold" style={{ color: ['Seller Listing Fee', 'NAV Growth Facilitation Fee'].includes(r.title) ? '#ffffff' : undefined }}>{r.title}</h3>
                        <p className={`text-sm leading-relaxed ${r.highlight ? 'text-white/70' : 'text-neutral-500'}`}>{r.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-neutral-950 text-white p-12 rounded-2xl flex flex-col gap-6">
                    <span className="font-mono text-accent text-xs uppercase tracking-widest">Year 5 Financial Targets</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                      {[
                        { val: '₹9000 Cr', label: 'Year 5 SOM GMV (1M users · 1500 acres)' },
                        { val: '1 million', label: 'Registered Users Required' },
                        { val: '1500 Acres', label: 'Under Management' },
                        { val: '$890M', label: 'SOM Capture Target (10%)' },
                      ].map(s => (
                        <div key={s.label} className="flex flex-col gap-2">
                          <div className="text-3xl font-display font-bold text-accent">{s.val}</div>
                          <p className="text-neutral-500 text-xs uppercase tracking-wider">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MARKET */}
              {activeTab === 'Market' && (
                <div className="flex flex-col gap-20">
                  <div className="flex flex-col gap-6">
                    <span className="font-mono text-primary text-xs uppercase tracking-widest">India + Global Market</span>
                    <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">Two markets. One platform. One is the largest wealth store on earth.</h2>
                  </div>
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary font-display">🇮🇳</div>
                      <h3 className="text-3xl font-display font-medium">India Real Estate Market</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { tag: 'TAM', val: '$780B+', title: 'India Real Estate', desc: 'Total Indian real estate market, projected to reach $1 trillion by 2030. Residential + agricultural land alone accounts for ₹720T+ — a segment with zero institutional competition.', note: 'Growing 9.2% CAGR · $1T by 2030', bg: 'bg-neutral-950 text-white' },
                        { tag: 'SAM', val: '$8.9B', title: 'Fractional Land Ownership', desc: 'The serviceable addressable market: commercial, private, and agricultural land eligible for UDS tokenisation and fractional retail investment. Zero dominant platform today.', note: 'Completely untapped · 2026 opportunity', bg: 'bg-primary text-white' },
                        { tag: 'SOM', val: '$890M', title: 'Year 5 SOM (10% SAM)', desc: 'VLands obtainable market is 10% of the $8.9B SAM, which corresponds to $890 Million (~₹9000 Crore). we require a minimum of 10,00,000 registered users on-platform to achieve this target.', note: '₹9000 Cr GMV equivalent · 1500 Acres · 10,00,000 Users Required', bg: 'bg-accent text-primary-dark' },
                      ].map((m) => (
                        <div key={m.tag} className={`p-10 rounded-2xl flex flex-col gap-4 ${m.bg}`}>
                          <span className="font-mono text-xs uppercase tracking-widest opacity-60">{m.tag}</span>
                          <div className="text-5xl font-display font-bold">{m.val}</div>
                          <h4 className="text-lg font-bold">{m.title}</h4>
                          <p className="text-sm leading-relaxed opacity-75">{m.desc}</p>
                          <span className="text-xs font-mono opacity-50 border-t border-current/10 pt-4">{m.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary font-display">GL</div>
                      <h3 className="text-3xl font-display font-medium">Global Expansion Horizon</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { tag: 'Global TAM', val: '$393T', title: 'World Real Estate', desc: 'Total global real estate value — the largest store of wealth in human history. Even 0.001% digital fractionalisation represents a multi-trillion dollar opportunity.', note: 'Projected $500T by 2030', bg: 'bg-neutral-100 text-neutral-900' },
                        { tag: 'Global SAM', val: '$2.4T', title: 'Fractional Real Estate', desc: 'The global fractional ownership segment covering tokenisable commercial, private, and agricultural properties internationally.', note: '~0.6% penetration today', bg: 'bg-neutral-100 text-neutral-900' },
                        { tag: 'Global SOM', val: '$450B', title: 'Multi-Country Target', desc: '10% of the global fractional segment through multi-country expansion to UAE, USA, UK, and Southeast Asia via the same SPV + LRS architecture.', note: 'Year 5+ expansion horizon', bg: 'bg-neutral-100 text-neutral-900' },
                      ].map((m) => (
                        <div key={m.tag} className={`p-10 rounded-2xl flex flex-col gap-4 ${m.bg}`}>
                          <span className="font-mono text-xs uppercase tracking-widest opacity-50">{m.tag}</span>
                          <div className="text-5xl font-display font-bold text-primary">{m.val}</div>
                          <h4 className="text-lg font-bold">{m.title}</h4>
                          <p className="text-sm leading-relaxed text-neutral-600">{m.desc}</p>
                          <span className="text-xs font-mono text-neutral-400 border-t border-neutral-200 pt-4">{m.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-8">
                    <h3 className="text-3xl font-display font-medium">Who We Serve</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { seg: 'Indian Retail Investors', profile: '₹5L–₹50L annual income · Tier 1, 2 & 3 cities · 28–55 years', pain: 'Wants land ownership but deterred by ticket size, legal complexity, and fraud risk.', opp: '350M+ eligible investors. Less than 2% have ever bought fractional property. Massive untapped demand.', icon: '🇮🇳' },
                        { seg: 'NRI Diaspora (35M+)', profile: 'Indian-origin · UAE, USA, UK, Singapore, Canada · $50K–$300K+ income', pain: 'Deep emotional and financial desire for Indian land. Completely blocked by geographic and legal barriers.', opp: '35M NRIs globally. Average NRI invests ₹8L+ in Indian assets. Highest-trust, lowest-CAC segment.', icon: '🌏' },
                        { seg: 'Global Institutional Investors', profile: 'Family offices · private companies · Business holdings · Real estate funds · Emerging market investors', pain: 'Seeking high-yield land exposure in India but no compliant, liquid, institutional-grade instrument exists.', opp: "INDIA - UDS based institutional or promoter holdings in the land parcel.\nGLOBAL - SPV tokenisation + LRS compliance creates the first institutional-grade fractional land product.", icon: '🏛️' },
                        { seg: 'Developers & Landowners', profile: 'Residential + agricultural land developers · Large landowners', pain: '"Asset-rich, cash-poor" — capital locked in land with no access to retail buyers at scale.', opp: 'Exit in days not years · 1M+ global buyers · 2% platform fee vs 5% broker commission.', icon: '🏗️' },
                      ].map(s => (
                        <div key={s.seg} className="p-8 border border-neutral-200 rounded-xl hover:border-primary transition-colors flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{s.icon}</span>
                            <div>
                              <h4 className="text-xl font-bold">{s.seg}</h4>
                              <p className="text-xs font-mono text-neutral-400 uppercase tracking-wide">{s.profile}</p>
                            </div>
                          </div>
                          <p className="text-neutral-600 text-sm leading-relaxed"><strong>Pain:</strong> {s.pain}</p>
                          <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line"><strong>Opportunity:</strong> {s.opp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h3 className="text-3xl font-display font-medium">Strategic Positioning — The Unclaimed Quadrant</h3>
                    <div className="bg-neutral-50 p-10 rounded-2xl border border-neutral-100">
                      <div className="grid grid-cols-2 gap-2 relative" style={{ aspectRatio: '2/1' }}>
                        <div className="bg-neutral-200 p-6 rounded-xl flex flex-col justify-end text-sm"><p className="font-bold text-neutral-600">Liquid · Low Compliance</p><p className="text-neutral-400 text-xs mt-1">Alt DRX · MYRE Capital (blockchain-first, weak legal)</p></div>
                        <div className="bg-primary p-6 rounded-xl flex flex-col justify-center text-white"><p className="text-accent font-bold text-lg">★ VLands — Sole Occupant</p><p className="text-white/70 text-sm mt-2">High Liquidity + Full Compliance + Live Order Book + UDS + Aadhaar RegTech</p><p className="text-accent/80 text-xs mt-2 font-mono uppercase tracking-wide">The unclaimed quadrant. No other platform exists here.</p></div>
                        <div className="bg-neutral-200 p-6 rounded-xl flex flex-col justify-start text-sm"><p className="font-bold text-neutral-600">Illiquid · Low Compliance</p><p className="text-neutral-400 text-xs mt-1">Traditional Brokers · Govt. Land Registries</p></div>
                        <div className="bg-neutral-300 p-6 rounded-xl flex flex-col justify-start text-sm"><p className="font-bold text-neutral-600">Compliant · Illiquid</p><p className="text-neutral-500 text-xs mt-1">Strata / hBits / PropertyShare (CRE-only, no secondary market, no land category)</p></div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-px h-full bg-neutral-400 absolute left-1/2" /><div className="h-px w-full bg-neutral-400 absolute top-1/2" /></div>
                      </div>
                      <div className="flex justify-between mt-4 text-xs font-mono text-neutral-400 uppercase tracking-widest"><span>← Low Compliance</span><span>High Compliance →</span></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h3 className="text-3xl font-display font-medium">Feature Comparison Matrix</h3>
                    <p className="text-neutral-500">VLands leads with 33 supported features. Every competitor: 3–4.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b-2 border-neutral-900">
                            <th className="py-4 text-left font-bold text-neutral-500 uppercase tracking-widest text-xs pr-6">Feature</th>
                            <th className="py-3 text-center font-bold text-primary bg-primary/5 px-4 text-xs">★ VLands</th>
                            <th className="py-3 text-center font-bold text-neutral-400 text-xs">Strata</th>
                            <th className="py-3 text-center font-bold text-neutral-400 text-xs">hBits</th>
                            <th className="py-3 text-center font-bold text-neutral-400 text-xs">PropShare</th>
                            <th className="py-3 text-center font-bold text-neutral-400 text-xs">Alt DRX</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { cat: 'EXCHANGE & LIQUIDITY', isHeader: true },
                            { label: 'Live order book (MARKET / LIMIT / STOP-LOSS)', v: true, c: [false, false, false, false] },
                            { label: 'Weekly market-price NAV engine', v: true, c: [false, false, false, false] },
                            { label: 'Instant exit mechanism (days, not months)', v: true, c: [false, false, false, false] },
                            { label: 'In-app land-backed loans', v: true, c: [false, false, false, false] },
                            { cat: 'FRACTIONAL OWNERSHIP & LEGAL', isHeader: true },
                            { label: 'Fractional land investment (UDS-based)', v: true, c: [false, false, false, '~'] },
                            { label: 'Aadhaar OTP digital registration', v: true, c: [false, false, false, false] },
                            { label: '9-stage UDS mutation tracking (M1–M9)', v: true, c: [false, false, false, false] },
                            { label: '7/12 extract integration (pre + post mutation)', v: true, c: [false, false, false, false] },
                            { label: 'State-specific stamp duty calculation', v: true, c: ['~', '~', '~', false] },
                            { cat: 'BLOCKCHAIN ARCHITECTURE', isHeader: true },
                            { label: 'ERC-721 NFT deed per land parcel', v: true, c: [false, false, false, true] },
                            { label: 'ERC-721 → ERC-20 fractional token wrapping', v: true, c: [false, false, false, true] },
                            { label: 'Soulbound smart contract lock-in enforcement', v: true, c: [false, false, false, false] },
                            { label: 'Blockchain + govt. record co-authoritative dual-rail', v: true, c: [false, false, false, false] },
                            { cat: 'INTELLIGENCE & EXPERIENCE', isHeader: true },
                            { label: 'Multi-unit intelligence (Gaj/Cent/Guntha/Rood/Acre)', v: true, c: [false, false, false, false] },
                            { label: 'Drone / satellite / grid land view modes', v: true, c: [false, false, false, false] },
                            { label: 'Seller royalty flywheel (0.05% per 1% NAV)', v: true, c: [false, false, false, false] },
                            { cat: 'GOVERNANCE & GLOBAL', isHeader: true },
                            { label: 'My Control Hub (per-property governance)', v: true, c: [false, false, false, false] },
                            { label: 'NRI / cross-border SPV + LRS-compliant flows', v: true, c: [false, false, false, '~'] },
                            { label: 'International listings (Dubai etc.)', v: true, c: [false, false, false, false] },
                            { label: 'Agent CRM + deal pipeline management', v: true, c: [false, false, false, false] },
                          ].map((row, i) => (row as any).isHeader ? (
                            <tr key={i} className="bg-neutral-50"><td colSpan={6} className="py-3 px-2 text-xs font-bold uppercase tracking-widest text-neutral-400">{(row as any).cat}</td></tr>
                          ) : (
                            <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                              <td className="py-3 font-medium text-neutral-700 pr-6 text-sm">{(row as any).label}</td>
                              <td className="py-3 text-center bg-primary/5 text-primary font-bold text-base">{(row as any).v ? '✓' : '✗'}</td>
                              {((row as any).c as (boolean | string)[]).map((val, j) => (
                                <td key={j} className={`py-3 text-center text-sm ${val === true ? 'text-neutral-600' : val === '~' ? 'text-amber-500' : 'text-neutral-200'}`}>{val === true ? '✓' : val === '~' ? '~' : '✗'}</td>
                              ))}
                            </tr>
                          ))}
                          <tr className="border-t-2 border-neutral-900 bg-neutral-50 font-bold">
                            <td className="py-4 font-bold uppercase text-xs tracking-widest">Total Full Support (✓)</td>
                            <td className="py-4 text-center bg-primary text-white text-lg font-display font-bold">33</td>
                            <td className="py-4 text-center text-neutral-400">4</td>
                            <td className="py-4 text-center text-neutral-400">4</td>
                            <td className="py-4 text-center text-neutral-400">4</td>
                            <td className="py-4 text-center text-neutral-400">3</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* MOAT */}
              {activeTab === 'Moat' && (
                <div className="flex flex-col gap-20">
                  <div className="flex flex-col gap-6">
                    <span className="font-mono text-primary text-xs uppercase tracking-widest">Competitive Durability</span>
                    <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">Eight compounding advantages. A 36-month fortress no competitor can sprint past.</h2>
                    <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl">VLands moat is not a product feature. It is a compounding stack of financial, legal, technological, and community advantages that reinforce each other.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-primary text-white p-14 rounded-3xl flex flex-col gap-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 text-[14rem] font-display font-bold text-white/5 leading-none pointer-events-none select-none">01</div>
                      <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="bg-accent text-primary-dark px-4 py-1 rounded-full text-xs font-bold uppercase">Financial Infrastructure</div>
                          <div className="bg-white/10 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">24-36 months to replicate</div>
                        </div>
                        <h3 className="text-4xl font-display font-medium text-white">Live 24/7 Order Book</h3>
                        <p className="text-white/70 text-xl leading-relaxed max-w-3xl">Every fractional real-estate platform on earth is a listing Platform. VLands is a Marketplace. By deploying Market, Limit, and Stop-Loss order types on physical land parcels, VLands creates a price-discovery mechanism that generates continuous, auditable transaction data.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                          {[
                            { title: 'Liquidity Flywheel', desc: 'More investors deeper order book better price discovery more investors. Each side compounds the other.' },
                            { title: 'Authoritative Pricing', desc: 'VLands becomes the only real-time market price source for fractional Indian land.' },
                            { title: 'Engineering Barrier', desc: 'Exchange-grade matching engine plus regulatory clarity plus legal tokenisation. 24-36 months to replicate.' },
                          ].map(p => (
                            <div key={p.title} className="bg-white/10 p-6 rounded-xl border border-white/10">
                              <p className="text-accent font-bold text-sm mb-2">{p.title}</p>
                              <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-neutral-950 text-white p-14 rounded-3xl flex flex-col gap-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 text-[14rem] font-display font-bold text-white/5 leading-none pointer-events-none select-none">02</div>
                      <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="bg-accent text-primary-dark px-4 py-1 rounded-full text-xs font-bold uppercase">Legal + Blockchain</div>
                          <div className="bg-white/10 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">24-36 months to replicate</div>
                        </div>
                        <h3 className="text-4xl font-display font-medium text-white">Dual-Rail Ownership Registry</h3>
                        <p className="text-neutral-400 text-xl leading-relaxed max-w-3xl">VLands runs two parallel registries for every parcel: a physical UDS mutation through 9 government stages, and an ERC-721 NFT deed fractionalised into ERC-20 tokens. These rails are co-authoritative.</p>
                        <div className="flex flex-col md:flex-row gap-4 mt-4">
                          <div className="flex-1 bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col gap-2">
                            <p className="text-accent font-bold text-sm">Physical Rail (Legal)</p>
                            <p className="text-neutral-400 text-sm">UDS mutation M1 to M9 � 7/12 extract � RERA clearance � Aadhaar e-Sign � Indian court enforceable</p>
                          </div>
                          <div className="flex items-center text-white/20 text-2xl font-display">?</div>
                          <div className="flex-1 bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col gap-2">
                            <p className="text-accent font-bold text-sm">Digital Rail (Blockchain)</p>
                            <p className="text-neutral-400 text-sm">ERC-721 NFT deed to ERC-20 fractional tokens � Soulbound lock-in � On-chain provenance � Instant transferability</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { n: '03', title: 'Instant Exit Engine', type: 'Network Effect', duration: '18-24 months', desc: 'Land has been illiquid since the invention of property. VLands gives investors a genuine exit: a live secondary market with real buyers. After lock-in, post a sell order and exit within days not decades.', dark: false },
                        { n: '04', title: 'UDS Legal + Mutation Pipeline', type: 'Regulatory Expertise', duration: '24+ months', desc: 'Full 9-stage mutation tracking, RERA compliance, 7/12 extract integration, and advocate opinion workflows. Strata, hBits, and PropertyShare have built zero of these features.', dark: true },
                        { n: '05', title: 'Seller Royalty Flywheel', type: 'Network Effect', duration: '6-12 months', desc: 'Sellers earn 0.05% per 1% NAV growth even after exiting. Converts every completed transaction into a permanent referral channel.', dark: false },
                        { n: '06', title: 'Multi-Unit Land Intelligence', type: 'Localisation', duration: '3-6 months', desc: 'Native support for Gaj, Sq Yd, Sq Ft, Cent, Guntha, Rood, Acre, Hectare with dynamic price-per-unit conversion.', dark: false },
                        { n: '07', title: 'My Control Hub Governance', type: 'Community Lock-in', duration: '12-18 months', desc: 'Per-property governance voting, broadcast updates, and concern ticketing scoped to verified co-investors. Passive investors become active co-owners.', dark: false },
                        { n: '08', title: 'Cross-Border SPV + LRS Rail', type: 'Global Moat', duration: '24+ months', desc: 'VLands is architected for 35M NRIs locked out of Indian land. SPV tokenisation plus LRS-compliant flows create the first compliant cross-border instrument for Indian land.', dark: false },
                      ].map(m => (
                        <div key={m.n} className={`p-10 rounded-2xl flex flex-col gap-4 hover:border-primary transition-all group border ${m.dark ? 'bg-neutral-900 text-white border-neutral-800' : 'bg-white border-neutral-200 hover:shadow-lg hover:shadow-primary/5'}`}>
                          <div className="flex justify-between items-start">
                            <div className={`text-5xl font-display font-bold leading-none ${m.dark ? 'text-white/10' : 'text-neutral-100'}`}>{m.n}</div>
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-1 rounded-full">{m.type}</span>
                              <span className="text-[10px] font-mono text-neutral-400">{m.duration} to replicate</span>
                            </div>
                          </div>
                          <h3 className={`text-xl font-bold group-hover:text-primary transition-colors ${m.dark ? 'text-white' : ''}`}>{m.title}</h3>
                          <p className={`text-sm leading-relaxed ${m.dark ? 'text-neutral-400' : 'text-neutral-500'}`}>{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* COMPANY PROFILE */}
              {activeTab === 'Company Profile' && (
                <div className="flex flex-col gap-20">
                  <div className="flex flex-col gap-6">
                    <span className="font-mono text-primary text-xs uppercase tracking-widest">About VLands</span>
                    <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">We are not building a better listing platform. We are building the Marketplace that replaces them all.</h2>
                    <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl">VLands was founded on a single conviction: land is the world oldest and most trusted store of value, and it has never had a liquid market.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Founded', val: 'October 2025' }, { label: 'Inc', val: 'May 2026' },
                      { label: 'HQ', val: 'India (Multi-city)' }, { label: 'Stage', val: 'Pre-Seed' },
                      { label: 'Email', val: 'investors@vlands.app' }, { label: 'Websites', val: 'vlands.app' },
                      { label: 'Sectors', val: 'PropTech � RegTech � FinTech � Blockchain' }, { label: 'Model', val: 'B2C Marketplace + B2B SaaS' },
                      { label: 'Status', val: 'Prototype Live � Public Launch Apr 2027' },
                    ].map(f => (
                      <div key={f.label} className="p-6 bg-neutral-50 rounded-xl border border-neutral-100 flex flex-col gap-1">
                        <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">{f.label}</p>
                        <p className="font-bold text-sm">{f.val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-12 bg-primary text-white rounded-2xl flex flex-col gap-6">
                      <Target size={32} className="text-accent" />
                      <h3 className="text-3xl font-display font-medium text-white">Mission</h3>
                      <p className="text-white/80 text-lg leading-relaxed">To build the world first Amazon of Land � a global, unified ecosystem that democratises real estate by providing a secure, liquid, and transparent marketplace for fractional ownership, starting from 3 Sq. Yd.</p>
                    </div>
                    <div className="p-12 bg-neutral-950 text-white rounded-2xl flex flex-col gap-6">
                      <Globe size={32} className="text-accent" />
                      <h3 className="text-3xl font-display font-medium text-white">Vision</h3>
                      <p className="text-white/70 text-lg leading-relaxed">A world where land is as easily tradable as a stock � enabling anyone, from a retail investor in Hyderabad to an NRI in Dubai, to own, list, and earn from land starting from as little as one square yard.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-8">
                    <h3 className="text-3xl font-display font-medium">The Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { name: 'Uday Kiran Lingipalli', role: 'Founder & CEO', bio: 'Final-year medical student turned infrastructure founder. Spent 5 months mapping every UDS regulatory requirement, governmental mutation phase, and registration protocol under India Registration Bill 2025. Previously built Chikitsaaa to 30,000 monthly visitors.', email: 'investors@vlands.app', image: 'https://lh3.googleusercontent.com/d/1q2uYqrtvrfSbTMcPkhdF_OSZw30NgGhF' },
                        { name: 'Vishal D Mehta', role: 'CFO', bio: 'Financial architect responsible for VLands capital structure, investor relations, and revenue model. Built the unit economics framework that makes VLands profitable per transaction from Day 1.', email: 'team@vlands.app', image: 'https://lh3.googleusercontent.com/d/1RtLGWgHOFs1QjaLj18R809EfEprMB9OJ' },
                      ].map(t => (
                        <div key={t.name} className="p-10 bg-neutral-950 text-white rounded-2xl flex flex-col gap-4">
                          <div className="w-14 h-14 bg-neutral-800 rounded-full overflow-hidden flex items-center justify-center border-2 border-accent/20 flex-shrink-0">
                            <img src={t.image} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold">{t.name}</h4>
                            <p className="text-accent font-mono text-xs uppercase tracking-widest mt-1">{t.role}</p>
                          </div>
                          <p className="text-neutral-400 text-sm leading-relaxed">{t.bio}</p>
                          <a href={`mailto:${t.email}`} className="text-xs font-mono text-neutral-500 hover:text-accent transition-colors">{t.email}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-14 bg-primary text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(0,212,170,0.1), transparent 60%)' }} />
                    <div className="flex flex-col gap-3 relative z-10">
                      <h3 className="text-4xl font-display font-medium text-white">Ready to invest in VLands?</h3>
                      <p className="text-white/60 text-lg">We are in active pre-seed discussions. The order book does not build itself � let us talk.</p>
                    </div>
                    <div className="flex flex-col gap-3 shrink-0 relative z-10">
                      <Link to="/contact?intent=Investor&from=vlands" className="bg-accent text-primary-dark px-10 py-4 rounded-full font-bold text-center hover:scale-105 transition-transform">Contact Us</Link>
                      <a href="https://vlands.app" target="_blank" rel="noopener noreferrer" className="border-2 border-white/20 text-white px-10 py-4 rounded-full font-bold text-center hover:bg-white/10 transition-colors flex items-center gap-2 justify-center">Visit VLands <ExternalLink size={16} /></a>
                      <Link to="/pitch/vlands" className="border-2 border-accent/50 text-accent px-10 py-4 rounded-full font-bold text-center hover:bg-accent hover:text-primary-dark transition-all">View Pitch Deck</Link>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="section border-t border-neutral-100" style={{ paddingTop: '0px', paddingBottom: '100px' }}>
        <div className="container no-prose">
          <div className="w-full bg-neutral-900 rounded-3xl p-16 text-center text-white flex flex-col items-center gap-8">
            <h2 className="text-4xl font-display w-full max-w-2xl mx-auto text-white">Own the future of land liquidity.</h2>
            <p className="text-neutral-400 w-full max-w-3xl mx-auto text-lg">VLands is actively raising its Pre-Seed round. Join us as we build the rails for India digital land economy � and the world.</p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <Link to="/contact?intent=Investor&from=vlands" className="bg-accent text-primary-dark px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">Invest in VLands</Link>
              <a href="https://vlands.app" className="border border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">Visit Marketplace</a>
              <Link to="/pitch/vlands" className="border border-accent/40 text-accent px-10 py-4 rounded-full font-bold hover:bg-accent/15 transition-all">View Pitch Deck</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VLandsDeepDive;