import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, Cpu, CreditCard, Building2,
  Terminal, ArrowRight, Scale, Layers, GitMerge, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Expertise = () => {
  const [activeTab, setActiveTab] = useState('PropTech');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      const element = document.getElementById('expertise-tab-content');
      if (element) {
        const headerOffset = 180; // adjusted for main header + sticky subnav
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  const pillars = [
    {
      name: 'PropTech',
      icon: <Building2 className="w-10 h-10" />,
      badge: 'Ownership Architecture',
      title: 'We didn\'t digitise the property market. We rewired its legal skeleton.',
      description: 'Most PropTech platforms built a UI on top of broken processes. We went deeper — engineering the Undivided Share (UDS) legal structure and RERA compliance engine so that fractional land ownership is not just possible, but legally sovereign and dispute-proof at every step.',
      points: [
        {
          headline: '5-Click Fractional Transaction',
          body: 'India\'s first end-to-end fractional land marketplace where a verified buyer goes from browse to Aadhaar-consented purchase in under five interactions. No branch visits. No physical document handling.'
        },
        {
          headline: 'UDS-Backed Legal Framework',
          body: 'Undivided Share structures give every fraction holder a legally defensible, registrable interest in the land — not a financial instrument, not a REIT unit. Real title. Real ownership.'
        },
        {
          headline: 'Automated Layout & Title Verification',
          body: 'Encumbrance checks, layout approvals, patta verifications, and historical title audits are run programmatically against state revenue records — eliminating the most common source of land fraud in India.'
        },
        {
          headline: 'RERA & Local Body Compliance Engine',
          body: 'Every project listed on our platforms passes automated RERA registration status checks, local body NOC verification, and development regulation compliance scoring before going live.'
        }
      ],
      metric: { label: 'Transaction Steps', value: '5 Clicks', context: 'From verified browse to Aadhaar-consented title confirmation.' },
      spec: { tag: 'Core Protocol', version: 'VLands v1.0', note: 'Zero-paper UDS transaction protocol — validated in Andhra Pradesh.' }
    },
    {
      name: 'RegTech',
      icon: <ShieldCheck className="w-10 h-10" />,
      badge: 'Compliance Infrastructure',
      title: 'Regulation is not our constraint. It is our competitive moat.',
      description: 'We built our entire stack to be native to India\'s Registration Bill 2025 — the most consequential shift in property law since 1908. While incumbents face years of re-architecture, our mutation engine, e-registration bridge, and NRI compliance rails were designed for this exact legislative moment.',
      points: [
        {
          headline: 'Aadhaar OTP E-Registration Engine',
          body: 'Full digital property registration via Aadhaar biometric consent, eliminating Sub-Registrar visits for eligible transactions. Our e-sign architecture aligns precisely with Registration Bill 2025 mandates.'
        },
        {
          headline: '60-Day Automated Land Mutation',
          body: 'Post-sale mutation — the transfer of records in revenue department files — is our hardest technical problem and biggest moat. Our SLA target of 60 days versus the current national average of 9-18 months.'
        },
        {
          headline: 'LRS & NRI Compliance Infrastructure',
          body: 'Liberalised Remittance Scheme flows, FEMA-compliant ownership structures, and repatriation-ready documentation enable the 30M+ NRI diaspora to invest in Indian land with institutional-grade compliance.'
        },
        {
          headline: 'Immutable Digital Title Audit Trails',
          body: 'Every title event — purchase, partition, mutation, lien, release — is written to a permissioned blockchain with cryptographic timestamps. The audit trail is sovereign and tamper-proof.'
        }
      ],
      metric: { label: 'Mutation SLA Target', value: '60 Days', context: 'vs. 9–18 months national average. The single hardest engineering target in Indian RegTech.' },
      spec: { tag: 'Dual-Rail Protocol', version: 'Register 1.0', note: 'Blockchain-anchored mutation sync with state revenue APIs.' }
    },
    {
      name: 'FinTech',
      icon: <CreditCard className="w-10 h-10" />,
      badge: 'Liquidity Engineering',
      title: 'Land does not have to be illiquid. It never did.',
      description: 'The illiquidity of land is not a natural law — it is the consequence of opacity, indivisibility, and absence of secondary market infrastructure. We are building every layer of that market: price discovery, order books, asset-backed lending, and rental income distribution.',
      points: [
        {
          headline: 'Secondary Marketplace with TPIN-Secured Trades',
          body: 'A live order book for fractional land holdings — buyers and sellers discover price, transact, and settle within a compliant framework using TPIN-secured digital authorisation. Land, finally liquid.'
        },
        {
          headline: 'In-App Lending Against Land Holdings',
          body: 'Fractional landholders can unlock capital against their verified UDS holdings — a lending product that does not exist anywhere else in India. Asset-backed, Aadhaar-anchored, and NBFC-partnered.'
        },
        {
          headline: 'Weekly & Monthly Rental Distribution',
          body: 'For income-yielding land (agricultural, commercial, leased plots), our protocol handles rental collection, distribution to fraction holders, and tax computation automatically — no intermediaries.'
        },
        {
          headline: 'Dynamic NAV Tracking Per Asset',
          body: 'Every land parcel in the VAG ecosystem has a live valuation model drawing from state guideline values, comparable sale data, and infrastructure development indices — giving holders a real-time portfolio view.'
        }
      ],
      metric: { label: 'New Financial Product', value: 'Land-Backed Lending', context: 'The first fractional land lending product in India — built on top of verified UDS title.' },
      spec: { tag: 'VLands Protocol', version: 'Own 1.0', note: 'Secondary market infrastructure with TPIN-secured settlement.' }
    },
    {
      name: 'Digital Infra',
      icon: <Cpu className="w-10 h-10" />,
      badge: 'The Trust Protocol',
      title: 'The world\'s most valuable asset requires the world\'s most trustworthy infrastructure.',
      description: 'At the base of our entire stack sits an immutable record of truth. We chose our technologies not for trend, but for adversarial resilience — the requirement that no actor, including us, can unilaterally alter a title record once confirmed.',
      points: [
        {
          headline: 'Permissioned Blockchain Title Registry',
          body: 'Every registered fractional title is anchored to a permissioned blockchain with a cryptographic hash. Immutable, timestamped, auditable. The integrity layer beneath all property transactions on our platform.'
        },
        {
          headline: 'AES-256 Encrypted Digital Document Vaults',
          body: 'Sale deeds, patta records, encumbrance certificates, and mutation orders are stored in role-gated, AES-256 encrypted vaults — accessible to owners and their designated legal agents only.'
        },
        {
          headline: 'E-Voting Governance for Co-Owned Assets',
          body: 'For jointly-owned land, decisions on development, lease, or sale require fractional consent. Our e-voting governance layer — modelled on corporate shareholder mechanics — resolves deadlocks with mathematical precision.'
        },
        {
          headline: 'Land Valuator Powered Dynamic Valuation Engine',
          body: 'Our land valuation engine aggregates government guideline rates, comparable registered sale prices, infrastructure pipeline data (highways, ports, SEZs), and satellite imagery to produce live, explainable property valuations.'
        }
      ],
      metric: { label: 'Encryption Standard', value: 'AES-256', context: 'Military-grade encryption for every document in the VAG digital vault infrastructure.' },
      spec: { tag: 'Trust Layer', version: 'Core v2', note: 'Dual-rail validation: blockchain anchor + state API verification.' }
    }
  ];

  const activePillar = pillars.find(p => p.name === activeTab)!;

  return (
    <div className="bg-white selection:bg-primary selection:text-white">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 bg-surface">
        <div className="container no-prose w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-10"
          >
            <span className="section-label">Domain Expertise</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium leading-[var(--leading-display)] tracking-tighter w-full max-w-5xl">
              The <span className="text-primary italic">Protocols</span> <br />of Property.
            </h1>
            <p className="text-2xl md:text-3xl text-neutral-500 w-full max-w-5xl leading-[var(--leading-subtitle)] mt-4">
              We did not enter real estate. We engineered the computational and legal infrastructure layer beneath it — four disciplines, one unassailable moat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Moat Credentials Bar ─────────────────────────────────────────── */}
      <section className="py-0 bg-neutral-900 text-white">
        <div className="container no-prose w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {[
              { icon: <Scale size={16} />, label: 'Registration Bill 2025', sub: 'Native compliance from day one' },
              { icon: <Layers size={16} />, label: 'UDS Legal Framework', sub: 'Sovereign title, not instruments' },
              { icon: <GitMerge size={16} />, label: 'Dual-Rail Protocol', sub: 'Blockchain + State API sync' },
              { icon: <Zap size={16} />, label: '60-Day Mutation SLA', sub: 'vs. 9–18 month national avg.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2 px-6 md:px-10 py-7 first:pl-0">
                <div className="text-accent">{item.icon}</div>
                <div className="text-xs font-bold font-mono uppercase tracking-widest text-white">{item.label}</div>
                <div className="text-[11px] text-neutral-500 leading-snug">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Tab Navigation ─────────────────────────────────────────── */}
      <section className="sticky top-[var(--header-height)] z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar">
            <div className="flex gap-10 pt-6 pb-4">
              {pillars.map((pillar) => (
                <button
                  key={pillar.name}
                  onClick={() => handleTabClick(pillar.name)}
                  className={`text-xs font-bold uppercase tracking-[0.2em] pb-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-3 ${
                    activeTab === pillar.name
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  {pillar.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Detail Content: Editorial Layout ─────────────────────────────── */}
      <section id="expertise-tab-content" className="section">
        <div className="container no-prose w-full">
          <AnimatePresence mode="wait">
            {pillars.map((pillar) => pillar.name === activeTab && (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-20 w-full"
              >
                {/* Hero statement */}
                <div className="flex flex-col items-center text-center gap-8 w-full">
                  <div className="w-20 h-20 rounded-2xl bg-neutral-900 text-white flex items-center justify-center p-5 shadow-2xl">
                    {pillar.icon}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-primary" />
                    <span className="text-label text-primary font-bold">{pillar.badge}</span>
                    <div className="w-8 h-px bg-primary" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-medium leading-[var(--leading-title)] tracking-tighter italic max-w-4xl">
                    {pillar.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-neutral-500 leading-[var(--leading-body)] max-w-3xl">
                    {pillar.description}
                  </p>
                </div>

                {/* Two-column: capability cards + sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start w-full">

                  {/* Capability Cards — left */}
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    {pillar.points.map((point, i) => (
                      <div
                        key={i}
                        className="bg-surface border border-neutral-100 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col gap-4 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary-dark transition-colors shrink-0">
                          <Terminal size={14} />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h4 className="text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors">
                            {point.headline}
                          </h4>
                          <p className="text-sm text-neutral-500 leading-[1.7]">
                            {point.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sidebar — right */}
                  <div className="lg:col-span-5 flex flex-col gap-6 sticky top-48 w-full">

                    {/* Spec card: dark */}
                    <div className="aspect-square bg-neutral-900 rounded-3xl relative overflow-hidden flex items-end p-10 group">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(26,107,90,0.25),transparent)]" />
                      <div className="absolute top-10 right-10 text-primary/10 group-hover:text-primary/20 transition-colors duration-1000">
                        <div className="text-[8rem] font-black font-display leading-none select-none">
                          0{pillars.indexOf(pillar) + 1}
                        </div>
                      </div>
                      <div className="relative z-10 flex flex-col gap-4">
                        <span className="text-label text-accent font-bold">{pillar.spec.tag}</span>
                        <h4 className="text-white text-4xl font-display font-bold leading-tight">
                          {pillar.spec.version}
                        </h4>
                        <p className="text-neutral-500 text-sm italic leading-[1.6] max-w-xs">
                          {pillar.spec.note}
                        </p>
                      </div>
                    </div>

                    {/* Metric card: light */}
                    <div className="p-8 border border-neutral-100 rounded-2xl flex flex-col gap-5 bg-surface shadow-sm">
                      <div className="flex justify-between items-start pb-4 border-b border-neutral-200">
                        <span className="text-label text-neutral-400 font-bold italic">{pillar.metric.label}</span>
                      </div>
                      <div className="text-4xl font-display font-black text-primary tracking-tighter">
                        {pillar.metric.value}
                      </div>
                      <p className="text-sm text-neutral-500 italic leading-[1.6]">
                        {pillar.metric.context}
                      </p>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Regulatory Timeline: Editorial Dark ──────────────────────────── */}
      <section className="section bg-neutral-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="container no-prose w-full">
          <div className="flex flex-col gap-6 mb-20 max-w-2xl">
            <span className="text-label text-accent font-bold">Legislative Context</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium leading-[var(--leading-title)] tracking-tighter text-white">
              Building on<br /><span className="text-accent italic">116 Years of Precedent.</span>
            </h2>
            <p className="text-xl text-neutral-400 mt-4 max-w-xl leading-[var(--leading-body)]">
              Our tech stack is not fighting India's regulatory history. It is the natural evolution of it. Every milestone below is a layer our protocols are engineered to stand on.
            </p>
          </div>

          <div className="flex flex-col gap-0 border-t border-white/10">
            {[
              {
                year: '1908',
                label: 'Registration Act',
                desc: 'India\'s foundational property law — paper-first, sub-registrar-gated, and unchanged for over a century. The baseline VAG is constitutionally dismantling.',
                status: 'Disrupting'
              },
              {
                year: '2016',
                label: 'RERA Act',
                desc: 'Real Estate Regulatory Authority established accountability and developer transparency for the first time. Our first compliance data layer was built on RERA\'s mandate.',
                status: 'Built on'
              },
              {
                year: '2024',
                label: 'Mass Digitalisation',
                desc: 'Telangana, AP, and Maharashtra began mass digitisation of revenue maps and patta records. We began building sovereign API bridges to these newly accessible state datasets.',
                status: 'Enabled'
              },
              {
                year: '2025',
                label: 'Registration Bill 2025',
                desc: 'The legislative inflection point. Digital-first mutation, e-registration mandates, and Aadhaar-linked title transfers become the new national standard. VAG was already native to every provision.',
                status: 'Native to'
              },
              {
                year: '2026',
                label: 'VAG Protocols Live',
                desc: 'OwnMyLand and VLands go live on the first regulatory architecture purpose-built for Registration Bill 2025. The market has been waiting 116 years for this infrastructure layer.',
                status: 'Now'
              },
            ].map((milestone) => (
              <div
                key={milestone.year}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 border-b border-white/10 group hover:bg-white/[0.025] px-2 md:px-4 transition-colors"
              >
                <div className="md:col-span-2">
                  <div className="text-4xl md:text-5xl font-display font-black text-white group-hover:text-accent transition-colors leading-none">
                    {milestone.year}
                  </div>
                </div>
                <div className="md:col-span-3 flex items-start">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl md:text-2xl font-display font-bold italic text-white">{milestone.label}</h3>
                    <span className="text-label text-accent font-bold">{milestone.status}</span>
                  </div>
                </div>
                <div className="md:col-span-7 flex items-center">
                  <p className="text-neutral-500 max-w-xl group-hover:text-neutral-300 transition-colors leading-[1.65]">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why the Moat Is Real: Three Reasons ─────────────────────────── */}
      <section className="section bg-surface border-t border-neutral-100">
        <div className="container no-prose w-full">
          <div className="flex flex-col gap-6 mb-20 max-w-2xl">
            <span className="section-label">Competitive Position</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-[var(--leading-title)]">
              Why this moat<br /><span className="italic text-primary">cannot be replicated.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                num: '01',
                title: 'Native Legislation Alignment',
                body: 'Registration Bill 2025 compliance is not a feature we added. It is the architectural blueprint from which we built. Competitors built on the 1908 Act face a multi-year re-architecture — we are already live.'
              },
              {
                num: '02',
                title: 'Mutation Engineering Depth',
                body: 'Automated land mutation — the actual transfer of revenue records after a sale — is the hardest technical and political problem in Indian PropTech. We have spent 18 months building state-by-state API integrations that no newcomer can fast-track.'
              },
              {
                num: '03',
                title: 'UDS Legal Framework Ownership',
                body: 'The legal architecture for Undivided Share fractional ownership was not off-the-shelf. We designed it with constitutional lawyers, property rights scholars, and senior AP revenue officials. This framework is our institutional IP.'
              }
            ].map((item) => (
              <div key={item.num} className="flex flex-col gap-6 p-10 bg-white border border-neutral-100 rounded-2xl hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                <div className="text-5xl font-display font-black text-neutral-100 group-hover:text-primary/20 transition-colors leading-none">
                  {item.num}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-display font-bold text-neutral-900 group-hover:italic transition-all">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-[1.7]">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Footer ──────────────────────────────────────────────────── */}
      <section className="section bg-white text-center relative overflow-hidden border-t border-neutral-100">
        <div className="container no-prose flex flex-col gap-10 items-center relative z-10 w-full">
          <div className="w-20 h-1 bg-primary mb-4" />
          <h2 className="text-4xl md:text-6xl font-display font-medium leading-[var(--leading-title)] tracking-tighter italic w-full max-w-2xl">
            Category<br />Definition.
          </h2>
          <p className="text-xl md:text-2xl text-neutral-500 leading-[var(--leading-body)] w-full max-w-3xl">
            We are not building another PropTech platform. We are laying the protocols that will govern how the next ₹10 Trillion of Indian land is registered, traded, and held. The category does not yet have a name. We will name it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Link to="/investors" className="btn-primary flex items-center gap-3">
              View Investment Thesis <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-ghost flex items-center gap-3">
              Request a Technical Briefing
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10rem] md:text-[22rem] font-black text-neutral-50/90 pointer-events-none select-none font-display -z-10 tracking-tighter">
          V.A.G
        </div>
      </section>

    </div>
  );
};

export default Expertise;
