import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { VLandsLogo } from '../components/VLandsLogo';
import { OwnMyLandLogo } from '../components/OwnMyLandLogo';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');

  const companies = [
    {
      name: 'VLands',
      fullName: 'Versatilelands',
      oneLiner: "The world's first live-order-book land Marketplace. Buy 3 Sq. Yd of  physical Indian land in 5 clicks, secured with Dual-rail: government UDS mutation + ERC-721 blockchain registry. Exit in days, not decades with effective lockins .",
      sector: 'PropTech · RegTech · FinTech · Blockchain',
      status: 'Prototype Live',
      stage: 'Pre-Seed · Prototype Live · Public Launch Apr 2027',
      ask: '₹2.5 – ₹3 Cr',
      founded: 'Oct 2025',
      inc: 'May 2026',
      link: '/portfolio/vlands',
      color: 'bg-primary/5',
      accent: 'text-primary'
    },
    {
      name: 'OwnMyLand',
      fullName: 'OwnMyLand',
      oneLiner: "India's most operationally complete co-owners land platform. 8-stage R1 pipeline. 9-stage mutation tracking. AES-256 VAULT. Co-owner governance. From reservation to registered deed in 25 days.",
      sector: 'PropTech · RegTech · Community',
      status: 'MVP Launching Jun 2026',
      stage: 'Pre-Seed · MVP Launching Jun 2026',
      ask: '₹75L–₹1.5 Cr',
      founded: 'Mar 2026',
      inc: 'May 2026',
      link: '/portfolio/ownmyland',
      color: 'bg-accent/5',
      accent: 'text-primary-dark'
    }
  ];

  const pipeline = [
    { name: 'RegStream', sector: 'RegTech', year: '2026' },
    { name: 'V-Lend', sector: 'FinTech', year: '2026' },
    { name: 'TrustLayer', sector: 'Digital Infrastructure', year: '2027' }
  ];

  const sectors = ['All', 'PropTech', 'RegTech', 'FinTech', 'Digital Infrastructure'];

  const filteredCompanies = filter === 'All' 
    ? companies 
    : companies.filter(c => c.sector.includes(filter));

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 bg-surface">
        <div className="container no-prose w-full">
          <span className="section-label">The Portfolio</span>
          <h1 
            className="font-display font-medium leading-[var(--leading-display)] tracking-tighter text-neutral-950 w-full max-w-4xl"
            style={{ fontSize: '68.8px' }}
          >
             These are the companies in which <br />
             <span className="text-primary italic">Versatile Arm Group</span> has built equity.
          </h1>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 md:py-20 bg-neutral-900 border-b border-white/5 overflow-hidden">
        <div className="container no-prose grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
          {[
            { label: 'Total Companies', value: '2' },
            { label: 'Sectors Covered', value: '4' },
            { label: 'Markets Active', value: 'India/Global' },
            { label: 'Target Year 5 GMV', value: '₹9,000 Cr+' }
          ].map((stat, i) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent/30 hover:bg-white/8 transition-all duration-300 flex flex-col gap-1 items-center text-center w-full">
              <div className="text-neutral-500 text-label font-bold uppercase">{stat.label}</div>
              <div className="text-2xl md:text-3xl font-display font-bold text-accent">{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Grid */}
      <section className="section" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container no-prose grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          <AnimatePresence mode="wait">
            {filteredCompanies.map((company, i) => (
              <motion.div 
                key={company.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-neutral-200 rounded-2xl p-10 hover:shadow-2xl hover:shadow-primary/8 hover:border-primary/20 transition-all duration-500 group flex flex-col gap-6 min-h-[460px]"
              >
                <div className="flex justify-between items-start">
                  {company.name === 'VLands' ? (
                    <VLandsLogo className="w-12 h-12" />
                  ) : (
                    <OwnMyLandLogo className="w-12 h-12" />
                  )}
                  <div className="flex flex-col items-end gap-2 text-right">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{company.status}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-primary transition-colors">{company.name}</h3>
                  <p className="text-neutral-500 text-lg leading-[1.6] group-hover:text-neutral-700 transition-colors italic">
                    {company.oneLiner}
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2 pt-4 border-t border-neutral-100 font-mono text-[11px] leading-relaxed">
                    <div className="col-span-2 sm:col-span-3">
                      <span className="text-neutral-400 block uppercase font-bold text-[9px]">Sector</span>
                      <span className="font-semibold text-neutral-800">{company.sector}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold text-[9px]">Stage</span>
                      <span className="font-semibold text-neutral-800">{company.stage}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold text-[9px]">Round Ask</span>
                      <span className="font-bold text-primary">{company.ask}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold text-[9px]">Founded</span>
                      <span className="font-semibold text-neutral-800">{company.founded}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block uppercase font-bold text-[9px]">Incorporated</span>
                      <span className="font-semibold text-[#00D4AA] font-bold">{company.inc}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-neutral-100 flex items-center justify-between">
                  <Link 
                    to={company.name === 'VLands' ? '/pitch/vlands' : '/pitch/ownmyland'} 
                    className="text-neutral-200 hover:text-primary hover:bg-primary/5 transition-colors text-sm font-bold px-4 py-2 rounded-lg border border-neutral-100 bg-neutral-50/50 text-neutral-600"
                  >
                    View Pitch Deck
                  </Link>
                  <Link 
                    to={company.link} 
                    className="flex items-center gap-2 font-bold text-primary group-hover:gap-3 transition-all duration-300"
                  >
                    View Deep Dive <ArrowUpRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}

            {filteredCompanies.length === 0 && (
              <div className="col-span-full py-32 text-center flex flex-col items-center gap-10">
                 <div className="text-4xl md:text-6xl font-display text-neutral-200 tracking-tighter">No projects yet.</div>
                 <p className="text-neutral-500 text-lg leading-[1.6] max-w-md">We're actively building in this sector. Check back soon or <Link to="/contact" className="text-primary underline font-bold">talk to us</Link> about your ideas.</p>
                 <button onClick={() => setFilter('All')} className="btn-ghost">Reset Filters</button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Investment Thesis Section */}
      <section className="section bg-surface border-y border-neutral-100" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container no-prose flex flex-col gap-20 w-full">
          <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)] text-center tracking-tighter italic">Group Investment Thesis</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: 'Regulatory-First Moat', bio: 'Built natively on India\'s Registration Bill 2025. Every competitor must retrofit; we are compliance-native from Day 1.' },
                { title: 'Two Bets, One Market', bio: 'VLands (Global Marketplace) + OwnMyLand (Community Co-ownership) = two beachheads on the same ₹1T land problem.' },
                { title: 'Asset Ecosystem Flywheel', bio: 'Every asset that enters generates listing fees, transaction flow, and rental handling. Land remains an annuity machine inside our ecosystem.' }
              ].map((card, i) => (
                <div key={card.title} className="bg-white border border-neutral-100 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col gap-6 group">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold font-display group-hover:bg-primary group-hover:text-white transition-colors">{i+1}</div>
                  <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-neutral-500 leading-[var(--leading-body)] text-sm italic">{card.bio}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
