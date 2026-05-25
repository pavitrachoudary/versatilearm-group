import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, ShieldCheck, Globe, Users, FileText, Presentation, FileCode, Lock, CheckCircle2, ArrowRight, LayoutDashboard, Landmark } from 'lucide-react';

const entityDetails = {
  VLands: {
    title: 'VLands: Fractionalized Land Protocols',
    ask: '₹2.5–₹3 Cr',
    valuation: '₹28–30 Cr',
    launch: 'Apr 2027',
    thesis: 'VLands is building the liquidity protocol for India\'s $ 1T+ land wealth, enabling anyone to transact land in 5 clicks via Aadhaar-registered, blockchain-verified dual-rail protocols.',
    stats: [
      { label: 'TAM', value: '$ 1 T+', desc: "India's total land wealth. Zero digital institutional competitor today." },
      { label: 'SOM', value: '$ 1B', desc: 'projected revenue of VLands in next 5 years.' },
    ]
  },
  Ownmyland: {
    title: 'OwnMyLand: Digital Land Management',
    ask: '₹75L–₹1.5 Cr',
    valuation: '₹18–20 Cr',
    launch: 'Jun 2026',
    thesis: 'OwnMyLand is a community co-ownership platform starting at ₹3 Lakhs. Allows verified buyer groups to unlock group discounts and purchase RERA-verified land.',
    stats: [
      { label: 'SOM', value: '$ 89M', desc: '5 years service obtainable Land market.' },
      { label: 'SLA', value: '30–45 Day', desc: 'Automated government mutation SLA.' }
    ]
  }
};

const Investors = () => {
  const [selectedEntity, setSelectedEntity] = useState<'VLands' | 'Ownmyland'>('VLands');
  const details = entityDetails[selectedEntity];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-12 pb-20 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(26,107,90,0.1),transparent)] pointer-events-none" />
        <div className="container no-prose relative z-10">
          <div className="flex flex-col gap-6 mb-12">
            <span className="section-label">Investment Portal</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-[var(--leading-display)] italic">
              Owning the <span className="text-primary not-italic">Infrastructure</span> of Land.
            </h1>
            
            {/* Entity Switcher */}
            <div className="mt-12 flex flex-col gap-8">
              <div className="flex bg-neutral-100 p-1 rounded-sm w-fit">
                {(['VLands', 'Ownmyland'] as const).map((entity) => (
                  <button
                    key={entity}
                    onClick={() => setSelectedEntity(entity)}
                    className={`px-8 py-3 rounded-sm text-sm font-bold transition-all ${
                      selectedEntity === entity 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    {entity === 'VLands' ? 'Invest in VLands' : 'Invest in Ownmyland'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedEntity}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-wrap gap-8 md:gap-16">
                    <div className="flex flex-col gap-1">
                      <span className="text-3xl font-display font-bold text-primary">{details.ask}</span>
                      <span className="section-label text-[10px]">Pre-Seed Ask</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-3xl font-display font-bold text-primary">{details.valuation}</span>
                      <span className="section-label text-[10px]">Target Valuation</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-3xl font-display font-bold text-primary">{details.launch}</span>
                      <span className="section-label text-[10px]">Product Launch</span>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl leading-[var(--leading-subtitle)] tracking-tight">
                    {details.thesis}
                  </p>
                  <div className="flex items-center gap-6 flex-wrap">
                    <Link 
                      to={selectedEntity === 'VLands' ? '/portfolio/vlands' : '/portfolio/ownmyland'} 
                      className="flex items-center gap-2 text-primary font-bold hover:underline w-fit group"
                    >
                      View Project Deep Dive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      to={selectedEntity === 'VLands' ? '/pitch/vlands' : '/pitch/ownmyland'}
                      className="text-neutral-500 hover:text-primary transition-colors text-sm font-bold"
                    >
                      View Pitch Deck
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Market Fundamentals */}
      <section className="section bg-neutral-900 text-white overflow-hidden relative">
        <div className="container no-prose flex flex-col gap-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 lg:gap-32 items-center">
            <div className="flex flex-col gap-8">
               <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)] tracking-tighter italic" style={{ color: '#ffffff' }}>
                 Market Inflection.
               </h2>
               <div className="flex flex-col gap-6 text-xl text-neutral-400 leading-[var(--leading-body)] max-w-lg">
                  <p>Land is India's most preferred asset class, yet it remains the least liquid. The Registration Bill 2025 has created the first legal opening for fractional, digital-first land ownership.</p>
                  <p>Our portfolio companies are first-to-market with protocols designed specifically for this new legislative reality.</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details.stats.map((item, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2">
                  <div className="text-accent font-display text-4xl font-bold">{item.value}</div>
                  <div className="text-xs uppercase tracking-widest font-bold font-mono opacity-60">{item.label}</div>
                  <p className="text-[10px] text-neutral-500 mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investor Materials Section */}
      <section className="section bg-surface">
        <div className="container no-prose">
          <div className="flex flex-col gap-4 mb-20 items-center text-center">
            <span className="section-label">Investor Materials</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-[var(--leading-title)]">Due Diligence Ready.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-neutral-100 rounded-3xl p-10 flex flex-col gap-8 shadow-sm hover:shadow-xl transition-all duration-500">
               <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <FileText size={28} />
               </div>
               <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-display font-bold">Executive Summary</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">2-page overview of VAG, our products, market opportunity, and pre-seed ask.</p>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-[10px] font-bold w-fit">
                    <CheckCircle2 size={10} /> AVAILABLE
                  </div>
               </div>
               <Link to="/contact?intent=Investor" className="px-6 py-3 bg-primary text-white text-center rounded-xl font-bold text-sm hover:bg-neutral-800 transition-colors">Request PDF</Link>
            </div>

            <div className="bg-white border border-neutral-100 rounded-3xl p-10 flex flex-col gap-8 shadow-sm hover:shadow-xl transition-all duration-500">
               <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <Presentation size={28} />
               </div>
               <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-display font-bold">Full Pitch Deck</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">Complete investor deck with financials, competitive analysis, and team roadmap.</p>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-[10px] font-bold w-fit">
                    <CheckCircle2 size={10} /> AVAILABLE
                  </div>
               </div>
               <Link to={selectedEntity === 'VLands' ? "/pitch/vlands" : "/pitch/ownmyland"} className="px-6 py-3 bg-primary text-white text-center rounded-xl font-bold text-sm hover:bg-neutral-800 transition-colors">View Online</Link>
            </div>

            <div className="bg-white border border-neutral-100 rounded-3xl p-10 flex flex-col gap-8 shadow-sm hover:shadow-xl transition-all duration-500">
               <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <BarChart3 size={28} />
               </div>
               <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-display font-bold">Financial Model</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">Detailed 5-year GMV, revenue, and burn projections. NDA required.</p>
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-bold w-fit">
                    <Lock size={10} /> UNDER NDA
                  </div>
               </div>
               <Link to="/contact?intent=Investor" className="px-6 py-3 border border-neutral-200 text-neutral-600 text-center rounded-xl font-bold text-sm hover:bg-neutral-50 transition-colors">Request Access</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Investors */}
      <section className="section bg-neutral-900 border-t border-white/5 overflow-hidden">
        <div className="container no-prose flex flex-col items-center gap-16 text-center">
          <div className="flex flex-col gap-4">
             <span className="text-label text-accent font-bold italic">The Backing</span>
             <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-[var(--leading-title)] tracking-tighter">Our Investors</h2>
          </div>
          
          <div className="w-full">
            {[
              {
                name: 'Dr. Kari Kalyan Kumar',
                role: 'Pre-Seed Investor',
                bio: 'A strategic investor who understands the intersection of capital and community building. Supporting our mission from the pre-seed stage of VLands.',
                image: 'https://lh3.googleusercontent.com/d/1u8xQWomBmpFfVcoXZg1H2xbV_juhz5n9'
              }
            ].map((investor, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-2xl flex flex-col items-center gap-10"
              >
                <div className="relative group">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-primary p-1">
                    <img src={investor.image} alt={investor.name} className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 group-hover:bg-accent/20 transition-all" />
                </div>
                <div className="flex flex-col gap-4">
                   <h3 className="text-2xl md:text-3xl font-display font-medium text-white italic leading-[1.2]">"{investor.bio}"</h3>
                   <div className="flex flex-col items-center gap-1 mt-4">
                      <span className="text-xl md:text-2xl font-bold font-display" style={{ color: '#ffffff' }}>{investor.name}</span>
                      <span className="text-label text-primary font-bold">{investor.role}</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-primary text-white text-center">
        <div className="container no-prose flex flex-col gap-10 items-center w-full">
           <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)] tracking-tighter italic" style={{ color: '#eaeaea' }}>Build the equity of Bharat.</h2>
           <p className="text-xl text-primary-light leading-[var(--leading-body)]">Direct investment enquiries and term-sheet requests are routed to the CEO.</p>
           <Link to="/contact" className="bg-white text-primary px-10 py-5 rounded-sm font-bold text-xl hover:bg-neutral-100 transition-all flex items-center gap-4">
              Connect with Uday <ArrowRight size={24} />
           </Link>
        </div>
      </section>
    </div>
  );
};

export default Investors;
