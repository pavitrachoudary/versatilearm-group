import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { OwnMyLandLogo } from '../components/OwnMyLandLogo';
import { ExternalLink, CheckCircle2, Users, Shield, TrendingUp, Globe, BarChart3, FileText, Vote, Target, Award, Bell, Layers, Building2, Clock } from 'lucide-react';
import { HowOwnMyLandWorks } from '../components/HowOwnMyLandWorks';
import { ProductDemo } from '../components/ProductDemo';

const OwnmylandDeepDive = () => {
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
      const element = document.getElementById('ownmyland-tab-content');
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
      <section className="pt-12 pb-28 bg-surface text-primary-dark relative overflow-hidden" style={{ backgroundColor: '#fafaf8' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #0F4A3D 0%, transparent 60%)' }} />
        <div className="container no-prose flex flex-col gap-12 w-full relative z-10">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <OwnMyLandLogo className="w-16 h-16 shadow-xl" />
              <div className="flex flex-col">
                <h1 className="text-5xl font-display font-bold leading-[var(--leading-title)] text-neutral-950">OwnMyLand</h1>
                <p className="text-primary-dark/60 font-mono text-sm uppercase tracking-widest">A Versatile Arm Group Company</p>
              </div>
            </div>
            <p className="text-4xl max-w-3xl leading-[var(--leading-title)] font-display font-medium text-neutral-950">India's most operationally complete co-owners land platform. <br />From reservation to mutation — every stage tracked, legally executed, and delivered on SLA. Starting at ₹3 Lakhs.</p>
            <p className="text-xl max-w-2xl text-neutral-600 leading-relaxed">India's middle class has always known land is the ultimate wealth vehicle. The problem was the combination: high ticket sizes, opaque legal processes, zero post-sale transparency, and a broker-dependent ecosystem that charged 5% to do nothing. OwnMyLand eliminates all of it simultaneously.<br /><br />Starting at ₹3 Lakhs, any investor receives a government-registered UDS deed, a VAULT-secured digital document repository, a real-time 9-stage mutation tracker, and an on-platform governance layer — all on a legally contractual SLA. This is not a listings site. This is an ownership operating system.</p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-primary-dark/10 text-primary-dark px-4 py-1 rounded-full text-xs font-bold uppercase">PropTech</span>
                <span className="bg-primary-dark/10 text-primary-dark px-4 py-1 rounded-full text-xs font-bold uppercase">Community</span>
                <span className="bg-primary-dark/10 text-primary-dark px-4 py-1 rounded-full text-xs font-bold uppercase">RegTech</span>
                <span className="bg-primary-dark text-accent px-4 py-1 rounded-full text-xs font-bold uppercase">Live in Market</span>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <a href="https://ownmyland.co" target="_blank" rel="noopener noreferrer" className="bg-primary-dark text-white hover:bg-neutral-800 px-8 py-3 rounded-sm font-bold flex items-center gap-2 w-fit transition-all hover:-translate-y-0.5 hover:shadow-xl">Visit ownmyland.co <ExternalLink size={18} /></a>
                <Link to="/pitch/ownmyland" className="border border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white px-8 py-3 rounded-sm font-bold flex items-center gap-2 w-fit transition-all hover:-translate-y-0.5 hover:shadow-xl">View Pitch Deck</Link>
              </div>
            </div>
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

      <section id="ownmyland-tab-content" className="section">
        <div className="container no-prose max-w-5xl w-full">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>

              {/* OVERVIEW */}
              {activeTab === 'Overview' && (
                <div className="flex flex-col gap-24">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="flex flex-col gap-8">
                      <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">The land you always wanted. Finally, at a price you can afford.</h2>
                      <p className="text-xl text-neutral-600 leading-relaxed">OwnMyLand is India's most operationally complete co-owners land platform. Multiple investors — capped at fewer than 200 co-owners per parcel — hold legally registered Undivided Share (UDS) deeds on the same land. Every member gets a government-issued title. Every document is AES-256 encrypted and permanently accessible. Every decision affecting the property is governed on-platform with legally binding voting thresholds.<br /><br />No 5% broker commission. No waiting on hold to ask if your mutation was filed. OwnMyLand has industrialised the process of owning land in India — turning a 6-month paper exercise into a 25-day digital pipeline.</p>
                      <p className="text-lg text-neutral-500 leading-relaxed">We didn't invent co-ownership. We built the infrastructure that makes it trustworthy, transparent, and liquid for someone who has never owned land before — without sacrificing the legal rigour that sophisticated investors demand.</p>
                      <ul className="flex flex-col gap-4">
                        {[
                          { label: 'Founded', val: 'March 2026' },
                          { label: 'Incorporated', val: 'May 2026' },
                          { label: 'MVP Launch', val: 'June 2026' },
                          { label: 'Model', val: 'UDS Co-ownership platform with SLA-driven fulfillment pipeline' },
                          { label: 'Minimum Entry', val: '₹3,00,000 (~$3,600)' },
                          { label: 'Platform Fee', val: '2% / ₹6,000 per ₹3L (Locks your price instantly)' },
                          { label: 'Target User', val: 'Indian Middle Class & NRIs' },
                        ].map(item => (
                          <li key={item.label} className="flex items-start gap-3 text-neutral-600">
                            <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                            <span><strong>{item.label}:</strong> {item.val}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="bg-accent/20 p-10 rounded-2xl border border-accent flex flex-col items-center justify-center text-center gap-4">
                        <span className="font-mono text-primary text-xs uppercase tracking-widest">The core mechanic</span>
                        <div className="text-6xl font-display font-bold text-primary-dark">Pipeline</div>
                        <p className="text-neutral-600 text-sm max-w-xs">8-stage R1 onboarding delivers your registered deed in 25 days. 9-stage R2 pipeline completes government mutation in 60 days. SLA-contractual. Fully tracked. No black boxes.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { val: '8–12%', label: 'Annual Land Yield' },
                          { val: '<200', label: 'Max Co-Owners per Parcel' },
                          { val: '25 days', label: 'Deed Delivery SLA' },
                          { val: '60 days', label: 'Mutation Completion' },
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
                    <span className="font-mono text-accent text-xs uppercase tracking-widest">Why it matters</span>
                    <h3 className="text-4xl font-display font-medium italic leading-[var(--leading-title)] text-white">"India has $780 billion locked in land. Almost none of it is accessible to the people who need it most."</h3>
                    <p className="text-neutral-400 text-lg leading-relaxed max-w-3xl">Property fraud costs Indian families ₹40,000 Cr annually. Legal disputes consume 43% of all civil court cases. The average residential plot requires ₹30–50 lakhs just to enter. OwnMyLand breaks every one of these barriers — with legal infrastructure that's registration-native, dispute-resistant, and built for scale.</p>
                  </div>
                </div>
              )}

              {/* HOW IT WORKS */}
              {activeTab === 'How It Works' && <HowOwnMyLandWorks />}

              {/* PRODUCT */}
              {activeTab === 'Product' && (
                <div className="flex flex-col gap-20">
                  <div className="flex flex-col gap-6">
                    <span className="font-mono text-primary text-xs uppercase tracking-widest">The Platform</span>
                    <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">Built for people who've never owned land before. Trusted by those who have.</h2>
                    <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl">OwnMyLand is a full-stack ownership operating system — from first discovery to final exit. Every feature removes a specific fear: fraud, illiquidity, legal complexity, or physical inaccessibility.</p>
                  </div>
                  <ProductDemo
                    productName="OwnMyLand"
                    demoTitle="Experience the Land Co-Ownership platform"
                    demoSubtitle="Watch the end-to-end journey from selecting high-yield land parcels and team squad buying, to receiving automated title MUTATION certificates on SLA."
                    features={[
                      { icon: "👥", label: "Squad Buying with friends" },
                      { icon: "📊", label: "Comparison Wealth Simulator" },
                      { icon: "🛡️", label: "AES-256 secure legal document Vault" },
                      { icon: "🗳️", label: "On-Platform Governance Voting" }
                    ]}
                    accentColor="primary"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { icon: <Users size={24} />, title: 'Group Discount via Squad Mechanic', desc: 'Investors can optionally form or join buying squads — public or private groups targeting the same land parcel. When a squad fills its co-ownership goal, every member receives a group price discount.', badge: 'Discount Mechanic' },
                      { icon: <BarChart3 size={24} />, title: 'Wealth Simulator', desc: "Every listing ships with a real-time IRR calculator comparing land vs Bank FD, Gold, and Nifty 50 over 1–10 years. Investors see exactly what they're choosing — not just pitch numbers.", badge: 'AI-Powered' },
                      { icon: <Shield size={24} />, title: 'AES-256 Document Vault', desc: 'A tamper-proof, encrypted legal repository scoped per investor per property. Sale deeds, mutation records, RERA certificates, and KYC documents — all secure and permanently accessible.', badge: 'Bank-Grade' },
                      { icon: <Vote size={24} />, title: 'On-Chain Governance', desc: 'Co-owners vote on property decisions — leasing, maintenance, improvements. Minor decisions require 51% consensus; major decisions 70%. Your land, your vote, your voice.', badge: 'Democratic' },
                      { icon: <Clock size={24} />, title: 'SLA-Tracked Fulfillment', desc: 'R1 pipeline: 8-stage onboarding from welcome to sale deed in 25 days. R2 pipeline: 9-stage mutation tracking (M1–M9) with 60-day target. Every delay is visible in your dashboard in real time.', badge: 'Transparent' },
                      { icon: <TrendingUp size={24} />, title: 'Exit & Resale Market', desc: "After lock-in, Land Parcel can be listed on OwnMyLand's secondary market. Liquidity in an asset class that has never had it — without sacrificing legal title integrity.", badge: 'Liquid' },
                      { icon: <Bell size={24} />, title: 'Co-Owner Chat', desc: 'A property-scoped communication channel for every investment group. Discuss maintenance, vote on proposals, coordinate with co-owners — all in one verified, audited space.', badge: 'Collaborative' },
                      { icon: <FileText size={24} />, title: 'Auto Document Generation', desc: 'Sale deeds, UDS registration certificates, and mutation reports generated automatically via Aadhaar OTP digital signatures. Optional sub-registrar visits. Zero waiting.', badge: 'Automated' },
                      { icon: <Globe size={24} />, title: 'NRI & Global Access', desc: 'Indian-origin investors in the UAE, USA, UK, or Singapore can buy, govern, and exit their Indian land holdings from a single app — with the same legal protections as a domestic investor.', badge: 'Global' },
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-12 bg-primary-dark text-white rounded-2xl flex flex-col gap-6">
                      <h3 className="text-2xl font-display text-accent">R1: Onboarding Pipeline</h3>
                      <p className="text-neutral-300 text-sm">8 stages from reservation to legal title. Engineered for 25-day completion.</p>
                      <div className="flex flex-col gap-3">
                        {['Reservation & KYC Verification', 'Payment Gateway Clearance', 'Legal Eligibility Check', 'Sale Deed Drafting', 'Aadhaar OTP Digital Signature', 'Sub-Registrar Processing', 'Stamp Duty Confirmation', 'Digital Deed Delivery'].map((s, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent text-primary-dark flex items-center justify-center font-bold text-xs shrink-0">{i + 1}</div>
                            <p className="text-sm text-neutral-300">{s}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-12 bg-neutral-900 text-white rounded-2xl flex flex-col gap-6">
                      <h3 className="text-2xl font-display text-accent">R2: Mutation Pipeline</h3>
                      <p className="text-neutral-400 text-sm">9-stage government land record update flow, tracked in real time. Target: 60 days.</p>
                      <div className="flex flex-col gap-3">
                        {['M1: Mutation Application Filed', 'M2: Revenue Dept Acknowledgement', 'M3: Notice Period Active', 'M4: Objection Clearance Window', 'M5: Field Verification', 'M6: Taluk Office Approval', 'M7: Revenue Officer Sign-Off', 'M8: Record Updated in Pahani', 'M9: Mutation Certificate Issued'].map((s, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs shrink-0">{i + 1}</div>
                            <p className="text-sm text-neutral-400">{s}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BUSINESS MODEL */}
              {activeTab === 'Business Model' && (
                <div className="flex flex-col gap-20">
                  <div className="flex flex-col gap-6">
                    <span className="font-mono text-primary text-xs uppercase tracking-widest">Revenue Architecture</span>
                    <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">Three revenue streams. Cash-flow positive from Day 0 of every booking.</h2>
                    <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl">OwnMyLand's model captures revenue across the full lifecycle of a land asset. Three streams ensure the business is profitable per transaction at launch — without depending on scale to break even.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { rate: '2%', title: 'Platform Fee', desc: 'A unified checkout and reservation fee charged upfront. It represents both the booking fee that secures the investment slot and the platform transaction fee, covering full legal onboarding and SLA deed registration.', example: 'On a ₹3L purchase → ₹6,000 upfront platform fee', highlight: true },
                      { rate: '10%', title: 'Rental Management Fee', desc: 'Monthly fee on all rental income collected and distributed through the platform. Covers collection, accounting, and automated payout to every co-owner.', example: 'On ₹20K/month rent → ₹2,000/month recurring', highlight: false },
                      { rate: '2%', title: 'B2B Asset Listing Fee', desc: 'Developers and landowners pay to onboard verified, litigation-free assets onto the platform. Replaces the traditional 5% broker commission — saving sellers ₹3L on a ₹1Cr listing.', example: '₹2L vs ₹5L broker fee — 60% cost reduction for developers', highlight: false },
                    ].map((r) => (
                      <div key={r.title} className={`p-10 rounded-2xl flex flex-col gap-4 ${r.highlight ? 'bg-primary text-white' : 'bg-neutral-50 border border-neutral-100'}`}>
                        <div className={`text-5xl font-display font-bold ${r.highlight ? 'text-accent' : 'text-primary'}`}>{r.rate}</div>
                        <h3 className="text-xl font-bold" style={{ color: r.highlight ? '#ffffff' : undefined }}>{r.title}</h3>
                        <p className={`text-sm leading-relaxed ${r.highlight ? 'text-white/70' : 'text-neutral-500'}`}>{r.desc}</p>
                        <p className={`text-xs font-mono border-t border-current/10 pt-4 ${r.highlight ? 'text-white/40' : 'text-neutral-400'}`}>{r.example}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-neutral-950 text-white p-12 rounded-2xl flex flex-col gap-6">
                    <span className="font-mono text-accent text-xs uppercase tracking-widest">Year 1 Unit Economics Target</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                      {[
                        { val: '1,000', label: 'Target Users' },
                        { val: '₹30 Cr', label: 'Target GMV' },
                        { val: '₹60L', label: 'Platform Fee Revenue (2%)' },
                        { val: '₹60L', label: 'B2B Asset Listing Fee (2%)' },
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
                    <span className="font-mono text-primary text-xs uppercase tracking-widest">India Market Focus</span>
                    <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">A $780B market that has never had a digital-native buyer.</h2>
                    <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl">India's real estate market is the largest store of household wealth — yet it remains the most inaccessible, opaque, and fraud-prone asset class for ordinary investors.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { tag: 'TAM', val: '$780B+', title: 'India Real Estate', desc: "India's total real estate market, projected to cross $1 trillion by 2030.", note: 'Growing at 9.2% CAGR', bg: 'bg-neutral-950 text-white' },
                      { tag: 'SAM', val: '$8.9B', title: 'Fractional Land Ownership', desc: 'The serviceable addressable market — commercial, private plot, and agricultural land eligible for UDS tokenisation and retail fractional investment.', note: 'Largely untapped, zero dominant player', bg: 'bg-primary text-white' },
                      { tag: 'SOM', val: '$89M', title: 'Year 5 Target (1% SAM)', desc: "OwnMyLand's obtainable market is 1% of the $8.9B SAM, which corresponds to $89 Million (~₹740 Crore). Valued at ₹1 Crore per acre, this equals 740 acres of land.", note: '₹740 Cr GMV equivalent · 740 Acres · 24,420 Users Required', bg: 'bg-accent text-primary-dark' },
                    ].map((m) => (
                      <div key={m.tag} className={`p-10 rounded-2xl flex flex-col gap-4 ${m.bg}`}>
                        <span className="font-mono text-xs uppercase tracking-widest opacity-60">{m.tag}</span>
                        <div className="text-5xl font-display font-bold">{m.val}</div>
                        <h3 className="text-lg font-bold">{m.title}</h3>
                        <p className="text-sm leading-relaxed opacity-75">{m.desc}</p>
                        <span className="text-xs font-mono opacity-50 border-t border-current/10 pt-4">{m.note}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-8">
                    <h3 className="text-3xl font-display font-medium">Who We Serve</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { seg: 'Primary: Indian Middle Class', profile: '₹8L–₹25L annual income · 28–50 years · Tier 1 & 2 cities', pain: 'Wants land ownership for wealth and security. Deterred by ticket size, legal complexity, and fraud risk.', opp: '350M+ eligible investors. Less than 2% have bought fractional property. Massive latent demand.', icon: <Building2 size={24} /> },
                        { seg: 'Secondary: NRI Diaspora', profile: 'Indian-origin · UAE, USA, UK, Singapore · $50K–$200K+ income', pain: 'Deep emotional and financial desire to own Indian land. Blocked by geographic and legal barriers.', opp: '32M+ NRIs globally. Average NRI invests ₹8L+ in Indian assets. High-intent, high-trust segment.', icon: <Globe size={24} /> },
                      ].map(s => (
                        <div key={s.seg} className="p-10 border border-neutral-200 rounded-2xl flex flex-col gap-4 hover:border-primary transition-colors">
                          <div className="text-primary">{s.icon}</div>
                          <h4 className="text-xl font-bold">{s.seg}</h4>
                          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wide">{s.profile}</p>
                          <p className="text-neutral-600 text-sm leading-relaxed"><strong>Pain:</strong> {s.pain}</p>
                          <p className="text-neutral-600 text-sm leading-relaxed"><strong>Opportunity:</strong> {s.opp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h3 className="text-3xl font-display font-medium">Competitive Landscape</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b-2 border-neutral-900">
                            <th className="py-4 text-left font-bold text-neutral-500 uppercase tracking-widest text-xs pr-8">Capability</th>
                            <th className="py-4 text-center font-bold text-primary bg-primary/5 px-6 text-xs">★ OwnMyLand</th>
                            <th className="py-4 text-center font-bold text-neutral-400 text-xs">PropShare</th>
                            <th className="py-4 text-center font-bold text-neutral-400 text-xs">hBits</th>
                            <th className="py-4 text-center font-bold text-neutral-400 text-xs">Strata</th>
                            <th className="py-4 text-center font-bold text-neutral-400 text-xs">WiseX</th>
                            <th className="py-4 text-center font-bold text-neutral-400 text-xs">Alt DRX</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { label: 'Fractional land investment (not commercial offices)', v: true, c: [false, false, false, false, true] },
                            { label: 'UDS title registration (not SPV structure)', v: true, c: [false, false, false, false, false] },
                            { label: '9-stage mutation tracking (M1–M9)', v: true, c: [false, false, false, false, false] },
                            { label: '8-stage R1 onboarding pipeline with SLA', v: true, c: [false, false, false, false, false] },
                            { label: 'AES-256 encrypted document VAULT', v: true, c: [false, false, false, false, false] },
                            { label: 'Group discount squad mechanic', v: true, c: [false, false, false, false, false] },
                            { label: 'Minimum entry under ₹5 Lakhs', v: true, c: [false, false, false, false, false] },
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                              <td className="py-4 font-medium text-neutral-700 pr-8">{row.label}</td>
                              <td className="py-4 text-center bg-primary/5 text-primary font-bold text-lg">{row.v ? '✓' : '✗'}</td>
                              {row.c.map((val, j) => (
                                <td key={j} className={`py-4 text-center ${val ? 'text-neutral-600' : 'text-neutral-300'}`}>{val ? '✓' : '✗'}</td>
                              ))}
                            </tr>
                          ))}
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
                    <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">Ten moat pillars. The deepest two cannot be replicated by writing code alone.</h2>
                    <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl">OwnMyLand's durability comes from ten interlocking advantages — operational, legal, community, and data.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {[
                      { n: '01', title: 'R1/R2 Fulfillment Pipeline', sub: 'The deepest moat — 18–24 months to replicate at quality', desc: 'OwnMyLand operates a full 8-stage R1 post-booking pipeline — from payment confirmation to registered deed delivery in 25 days — and a 3-stage R2 pipeline covering community setup, VAULT document upload, and 9-stage mutation tracking (M1–M9) to 60-day completion.', metric: '25-day deed delivery · 60-day mutation SLA · 100% pipeline coverage', bg: 'bg-primary text-white' },
                      { n: '02', title: 'VAULT — Encrypted Document Repository', sub: 'AES-256 compliance-grade vault that turns documents into switching costs', desc: 'The VAULT is not document storage — it is a compliance-grade digital repository with AES-256 encryption scoped per investor × per property, tamper-proof document hashing for legal defensibility, and signed URL delivery.', metric: 'AES-256 · Tamper-proof hashing · Signed URLs · Per investor × property scoped', bg: 'bg-neutral-950 text-white' },
                      { n: '03', title: 'UDS Legal Framework', sub: 'Land-specific regulatory expertise 12+ months ahead of any new entrant', desc: 'OwnMyLand is purpose-built for Undivided Share (UDS) land fractionalisation — handling RERA registration, 7/12 extracts, advocate clearance letters, encumbrance certificates, state-specific stamp duty calculations, and the full M1–M9 mutation pipeline.', metric: 'RERA · 7/12 tracking · UDS mutation · State stamp duty · Aadhaar e-sign', bg: 'bg-accent text-primary-dark' },
                      { n: '04', title: 'Co-Owner Governance Layer', sub: 'The only platform where fractional land investors actually govern their asset', desc: 'OwnMyLand converts passive investors into an engaged co-ownership community through real-time governance voting (51% threshold for minor decisions, 70% for major decisions), co-owner chat scoped per property, and a governance ticket pipeline with 72-hour reply SLA.', metric: '51%/70% voting thresholds · Scoped chat · Governance ticket SLA · Audit trail', bg: 'bg-primary-dark text-white' },
                      { n: '05', title: 'Group Discount via Squad Mechanic', sub: 'A group-pricing feature that drives viral acquisition with real financial upside', desc: 'Investors can form or join public or private buying squads — groups targeting the same land parcel with a shared ownership goal. When a squad fills, every member receives a group price discount.', metric: 'Group price discount · Public + private squads · <200 co-owners per parcel', bg: 'bg-neutral-100 text-neutral-900' },
                    ].map((m, i) => (
                      <div key={m.n} className={`p-12 ${m.bg} rounded-3xl relative overflow-hidden`}>
                        <div className="absolute top-0 right-4 text-[10rem] font-display font-bold opacity-10 leading-none pointer-events-none select-none">{m.n}</div>
                        <div className="relative z-10 flex flex-col gap-3">
                          <h3 className="text-2xl font-bold">{m.title}</h3>
                          <p className="text-sm font-mono opacity-50 uppercase tracking-widest">{m.sub}</p>
                          <p className="text-sm leading-relaxed opacity-75 max-w-2xl">{m.desc}</p>
                          <span className="text-xs font-mono opacity-50 mt-2 border-t border-current/10 pt-3">↗ {m.metric}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* COMPANY PROFILE */}
              {activeTab === 'Company Profile' && (
                <div className="flex flex-col gap-20">
                  <div className="flex flex-col gap-6">
                    <span className="font-mono text-primary text-xs uppercase tracking-widest">About OwnMyLand</span>
                    <h2 className="text-5xl font-display font-medium leading-[var(--leading-title)]">We're not disrupting real estate. We're finishing what it started.</h2>
                    <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl">OwnMyLand was born from a simple observation: the people who need land ownership most are the last ones to get it.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Founded', val: 'March 2026' }, { label: 'Inc', val: 'May 2026' },
                      { label: 'HQ', val: 'India (Multi-city)' }, { label: 'Stage', val: 'Pre-Seed' },
                      { label: 'Email', val: 'investors@ownmyland.co' }, { label: 'Legal Structure', val: 'Private Limited' },
                      { label: 'Sectors', val: 'PropTech · RegTech' }, { label: 'Model', val: 'B2C PaaS + B2B SaaS' },
                      { label: 'Status', val: 'MVP Live (Jun 2026)' },
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
                      <h3 className="text-3xl font-display font-medium" style={{ color: '#ffffff' }}>Mission</h3>
                      <p className="text-white/80 text-lg leading-relaxed">To make land ownership a fundamental right, not a luxury — by giving every Indian family a legally sound, community-powered path to owning the earth beneath their feet.</p>
                    </div>
                    <div className="p-12 bg-accent text-primary-dark rounded-2xl flex flex-col gap-6">
                      <Globe size={32} />
                      <h3 className="text-3xl font-display font-medium">Vision</h3>
                      <p className="text-primary-dark/80 text-lg leading-relaxed">To become the most trusted platform for land co-ownership in India — where every family, regardless of income, can build a land portfolio that outlasts them.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-8">
                    <h3 className="text-3xl font-display font-medium">The Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { name: 'Dr.Uday Kiran Lingipalli', role: 'Founder & CEO', bio: "Medical-background entrepreneur who became obsessed with India's land problem after watching people lose savings to property fraud. Built Chikitsaaa (30K MAU). Spent 5 months mapping India's land legislation changes.", email: 'udaylingipalli@ownmyland.co', image: 'https://lh3.googleusercontent.com/d/1q2uYqrtvrfSbTMcPkhdF_OSZw30NgGhF' },
                        { name: 'Vishal D Mehta', role: 'CFO', bio: "Financial architect who brings discipline and institutional credibility to OwnMyLand's capital structure. Responsible for investor relations, unit economics modelling, and the financial framework that makes fractional land ownership structurally sound.", email: 'team@ownmyland.co', image: 'https://lh3.googleusercontent.com/d/1RtLGWgHOFs1QjaLj18R809EfEprMB9OJ' },
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
                  <div className="p-14 bg-accent text-primary-dark rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-4xl font-display font-medium">Ready to invest in OwnMyLand?</h3>
                      <p className="text-primary-dark/70 text-lg">We are actively raising our Pre-Seed round. Talk to the founder directly.</p>
                    </div>
                    <div className="flex flex-col gap-3 shrink-0">
                      <Link to="/contact?intent=Investor&from=ownmyland" className="bg-primary-dark text-white px-10 py-4 rounded-sm font-bold text-center hover:bg-neutral-800 transition-all">Contact Us</Link>
                      <a href="https://ownmyland.co" target="_blank" rel="noopener noreferrer" className="border-2 border-primary-dark text-primary-dark px-10 py-4 rounded-sm font-bold text-center hover:bg-primary-dark hover:text-white transition-all flex items-center gap-2 justify-center">Visit Platform <ExternalLink size={16} /></a>
                      <Link to="/pitch/ownmyland" className="border-2 border-primary-dark text-primary-dark px-10 py-4 rounded-sm font-bold text-center hover:bg-primary-dark hover:text-white transition-all">View Pitch Deck</Link>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="section border-t border-neutral-100" style={{ paddingTop: '0px' }}>
        <div className="container no-prose w-full">
          <div className="w-full bg-accent rounded-3xl p-16 text-center flex flex-col items-center gap-8 border border-primary/10">
            <h2 className="text-4xl font-display text-primary-dark w-full max-w-2xl mx-auto">Start your squad today.</h2>
            <p className="text-primary-dark/70 w-full max-w-3xl mx-auto text-lg">Join thousands of Indian families co-owning premium assets. Safe, legal, community-driven — and starting at ₹3 lakhs.</p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <a href="https://ownmyland.co" className="bg-primary-dark text-white px-10 py-4 rounded-sm font-bold hover:bg-neutral-800 transition-all">Visit OwnMyLand</a>
              <Link to="/contact?intent=Investor&from=ownmyland" className="border border-primary-dark text-primary-dark px-10 py-4 rounded-sm font-bold hover:bg-primary-dark hover:text-white transition-all">Investor / Partner Query</Link>
              <Link to="/pitch/ownmyland" className="border border-primary-dark text-primary-dark px-10 py-4 rounded-sm font-bold hover:bg-primary-dark hover:text-white transition-all">View Pitch Deck</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OwnmylandDeepDive;
