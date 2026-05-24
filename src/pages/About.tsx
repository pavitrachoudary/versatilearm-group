import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Fingerprint, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VLandsLogo } from '../components/VLandsLogo';
import { OwnMyLandLogo } from '../components/OwnMyLandLogo';

const About = () => {
  return (
    <div className="bg-white selection:bg-primary selection:text-white">
      {/* Hero: High-Drama Typography */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-surface">
        <div className="container w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-10 no-prose"
          >
            <div className="flex flex-col gap-4">
              <span className="section-label">The Infrastructure Layer</span>
              <h1 
                className="text-[clamp(3rem,8vw,8rem)] font-display font-medium leading-[var(--leading-display)] tracking-tighter text-neutral-950"
                style={{ fontSize: '85px' }}
              >
                Beyond <span className="text-primary italic">Access.</span>
              </h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
              <div className="lg:col-span-8 w-full min-w-0">
                <p className="text-2xl md:text-3xl lg:text-4xl text-neutral-600 leading-[var(--leading-subtitle)] w-full max-w-5xl">
                  Versatile Arm Group build the computational and legal rails that make asset ownership a universal right. We dismantle the friction of land, starting with the $ 1T Indian market.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-6 lg:border-l border-neutral-100 lg:pl-12 pt-2 w-full min-w-0">
                <p className="text-label text-neutral-400 font-bold uppercase tracking-widest text-xs">Founding Thesis</p>
                <p className="text-lg text-neutral-800 leading-[var(--leading-body)] italic">
                  "Technology must be as rigorous as the law. We don't build apps; we build protocols for trust and liquidity in environments where they are historically scarcest."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Story: Deep Inset Editorial */}
      <section 
        className="section bg-neutral-900 text-white overflow-hidden relative"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(26,107,90,0.15),transparent)] pointer-events-none" />
        <div className="container no-prose w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-start">
              <div className="lg:sticky lg:top-32 flex flex-col gap-6 w-full min-w-0">
                <span className="text-label text-accent font-bold">The Origin</span>
                <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)] w-full max-w-xl" style={{ color: '#fffdfd' }}>Born from <br /><span className="italic text-accent">personal pain.</span></h2>
                <div className="w-16 h-1 bg-accent/30 mt-4" />
                <blockquote className="text-2xl md:text-3xl text-neutral-400 italic font-display leading-[var(--leading-title)] mt-6 w-full" style={{ color: '#d3cfcf' }}>
                  "My father needed ₹8 Lakhs for my medical school fees. His land, worth ₹12 Lakhs, was preyed upon at ₹8.5 Lakhs by local brokers. He chose a high-interest loan instead of a distress sale."
                </blockquote>
              </div>
            
            <div className="flex flex-col gap-20 pt-12 w-full min-w-0">
              <p className="text-2xl text-neutral-300 leading-[var(--leading-body)] w-full max-w-2xl">
                That moment redefined the trajectory for our founder, <span className="text-white font-bold">Dr.Uday Kiran Lingipalli</span>. It exposed the "Wealth Lock"—the paradox where India's most trusted asset is also its most illiquid.
              </p>
              <div className="grid grid-cols-1 gap-8">
                {[
                  { title: 'The Chikitsaaa Pivot', desc: 'Starting as a medical student, Uday built and scaled a healthcare portal to 30,000 monthly visitors, learning digital web growth before turning his focus to the $ 1T Indian land market gap.', color: '#ffffff' },
                  { title: 'Legal Research', desc: '5 months of intensive legal research of the Registration Bill 2025 by Dr. Uday, mapping UDS mutation laws and sub-registrar workflows to build the path from paper deeds to Aadhaar-native automated flows.', color: '#ffffff' },
                  { title: 'The Parent Entity', desc: 'Versatile Arm Group was established and registered in May 2026 (founded in October 2025) not just to launch products, but to hold the intellectual and legal standards for fractional land globally.', color: '#ffffff' }
                ].map((p, i) => (
                  <div key={i} className="flex flex-col gap-4 border-t border-white/10 pt-8 group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent/30 hover:bg-white/8 transition-all duration-300">
                    <h3 className="text-xl md:text-2xl font-display font-bold flex items-center justify-between" style={{ color: p.color }}>
                      {p.title}
                      <ChevronRight className="text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </h3>
                    <p className="text-neutral-400 leading-[1.6] text-sm">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Ecosystem: Minimal Schematic */}
      <section 
        className="section bg-white"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <div className="container no-prose flex flex-col items-center w-full">
          <div className="text-center mb-20 max-w-4xl mx-auto flex flex-col gap-4 w-full">
            <span className="section-label">The Architecture</span>
            <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)] w-full max-w-3xl mx-auto">Two Beachheads. One Core.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
            <Link to="/portfolio/vlands" className="bg-white border border-neutral-200 rounded-2xl p-10 hover:shadow-2xl hover:shadow-primary/8 hover:border-primary/20 transition-all duration-500 group flex flex-col gap-10">
               <div className="w-20 h-20 bg-surface rounded-2xl flex items-center justify-center p-4 border border-neutral-100 group-hover:scale-110 transition-transform">
                  <VLandsLogo className="w-full h-full text-primary" />
               </div>
               <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                     <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-primary transition-colors">VLands</h3>
                     <div className="flex gap-2.5 font-mono text-[10px] uppercase font-bold text-neutral-400">
                        <span>Founded: Oct 2025</span>
                        <span>·</span>
                        <span className="text-[#00D4AA]">Inc: May 2026</span>
                     </div>
                  </div>
                  <p className="text-lg text-neutral-500 leading-[1.6] italic">Global Fractional Land Exchange. Trade Sq. Yds in 5 clicks via Aadhaar-Blockchain dual rail.</p>
               </div>
               <div className="mt-auto flex items-center gap-3 text-primary font-bold text-label pt-8 border-t border-neutral-100">
                  Explore Marketplace <ArrowRight size={16} />
               </div>
            </Link>

            <Link to="/portfolio/ownmyland" className="bg-white border border-neutral-200 rounded-2xl p-10 hover:shadow-2xl hover:shadow-primary/8 hover:border-primary/20 transition-all duration-500 group flex flex-col gap-10">
               <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-4 border border-neutral-100 group-hover:scale-110 transition-transform">
                  <OwnMyLandLogo className="w-full h-full" />
               </div>
               <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                     <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-primary transition-colors">OwnMyLand</h3>
                     <div className="flex gap-2.5 font-mono text-[10px] uppercase font-bold text-neutral-400">
                        <span>Founded: Mar 2026</span>
                        <span>·</span>
                        <span className="text-[#00D4AA]">Inc: May 2026</span>
                     </div>
                  </div>
                  <p className="text-lg text-neutral-500 leading-[1.6] italic">Community co-ownership. Build squads, unlock group discounts, and automate mutation records.</p>
               </div>
               <div className="mt-auto flex items-center gap-3 text-primary font-bold text-label pt-8 border-t border-neutral-100">
                  Explore Community <ArrowRight size={16} />
               </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Values: Brutalist Precision */}
      <section 
        className="section bg-surface border-y border-neutral-100"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <div className="container no-prose w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            <div className="flex flex-col gap-6 w-full min-w-0">
              <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)] w-full" style={{ color: '#000000' }}>How we <span className="italic">measure trust.</span></h2>
              <p className="text-neutral-500 text-lg leading-[var(--leading-body)] w-full">We don't build features. We build resilient operational safeguards.</p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: <Shield className="text-primary" />, title: 'Compliance Native', desc: 'Regulation is not a hurdle; it is our foundation. Every flow adheres to Registration Bill 2025.' },
                { icon: <Fingerprint className="text-primary" />, title: 'Immutable Proof', desc: 'Dual-rail validation ensures that the digital record and the government mutation are always synced.' },
                { icon: <Globe className="text-primary" />, title: 'Modular Equity', desc: 'Ownership and equity should be as modular and portable as software code.' },
                { icon: <Shield className="text-primary" />, title: 'Inclusion First', desc: 'Access to high-growth assets is a right, not a privilege for the already wealthy.' }
              ].map((v, i) => (
                <div key={i} className="bg-white border border-neutral-100 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col gap-4">
                   <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">{v.icon}</div>
                   <h3 className="text-xl md:text-2xl font-display font-bold">{v.title}</h3>
                   <p className="text-neutral-500 text-sm leading-[1.6]">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footprint: High Contrast Geographic Section */}
      <section 
        className="section bg-neutral-900 text-white overflow-hidden relative"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <div className="container no-prose grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center w-full">
          <div className="flex flex-col gap-6 w-full min-w-0">
            <span className="text-label text-accent font-bold">Global Roots</span>
            <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)]" style={{ color: '#ffffff' }}>Vizag to the <span className="italic text-accent">World.</span></h2>
            <p className="text-xl text-neutral-400 leading-[var(--leading-body)] w-full">
              Headquartered in Visakhapatnam, India. We are perfectly positioned at the center of the coastal real estate boom and the emerging tech corridor.
            </p>
            <div className="flex items-center gap-4 text-accent font-bold mt-4">
               <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
               <span className="text-sm font-mono uppercase tracking-widest">Operational HQ: Andhra Pradesh, India</span>
            </div>
          </div>
          <div className="relative aspect-video bg-neutral-950 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden group">
            <img 
              src="/src/assets/images/vizag_clear_world_map_1779375221811.png" 
              alt="Global footprint: Visakhapatnam to the world" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Highly precise pulsing indicator overlay indicating Visakhapatnam on India's eastern coast */}
            <div className="absolute top-[55%] left-[51.5%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
              <span className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4AA] opacity-80"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00D4AA] border-2 border-white shadow-[0_0_20px_rgba(0,212,170,1)]"></span>
              </span>
              {/* Optional neat mini badge on hover or always visible to make it super clear */}
              <span className="absolute left-5 -top-3.5 bg-black/90 text-[9px] font-mono font-bold text-[#00D4AA] border border-[#00D4AA]/30 px-2 py-0.5 rounded whitespace-nowrap shadow-lg flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#00D4AA] animate-pulse"></span>
                VISAKHAPATNAM (HQ)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section 
        className="section bg-white text-center"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <div className="container no-prose flex flex-col gap-10 items-center w-full">
          <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)] w-full max-w-3xl mx-auto">The architecture of the future is being written now.</h2>
          <div className="flex flex-wrap justify-center gap-4">
             <Link to="/portfolio" className="btn-primary">See Our Strategy</Link>
             <Link to="/contact" className="btn-ghost">Partner With Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
