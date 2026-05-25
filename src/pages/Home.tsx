import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Globe, ShieldCheck, Users, Fingerprint, Lock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

import { VLandsLogo } from '../components/VLandsLogo';
import { OwnMyLandLogo } from '../components/OwnMyLandLogo';
import { VLands3DInteractive } from '../components/VLands3DInteractive';

const FallbackAvatar = () => (
  <svg 
    width="224" 
    height="224" 
    viewBox="0 0 224 224" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full rounded-full border-4 border-primary"
  >
    <circle cx="112" cy="112" r="112" fill="#0F4A3D" />
    <text 
      x="50%" 
      y="50%" 
      dominantBaseline="central" 
      textAnchor="middle" 
      fill="#00D4AA" 
      fontSize="48" 
      fontWeight="bold" 
      fontFamily="Playfair Display"
    >
      UK
    </text>
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const h1Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const Home = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center bg-surface overflow-hidden" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col gap-10 w-full min-w-0"
          >
            <div className="flex flex-col gap-4">
              <motion.span 
                variants={itemVariants} 
                className="section-label block text-[10px] sm:text-xs leading-relaxed max-w-full break-words tracking-[0.2em]"
              >
                Versatile Arm Group · India's Land Infrastructure Holding Company · Inc. May 2026
              </motion.span>
              <motion.h1 
                variants={h1Variants}
                className="text-[46px] xs:text-[50px] sm:text-[50px] md:text-[80px] font-display font-medium leading-[1.05] md:leading-[0.95] tracking-tighter text-neutral-950"
              >
                Building the <br className="hidden md:inline" />
                <span className="text-primary italic">infrastructure</span> <br className="hidden md:inline" />
                for a more equitable world.
              </motion.h1>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <motion.p 
                  variants={itemVariants} 
                  className="font-mono text-primary text-sm sm:text-base md:text-[19px] uppercase tracking-widest font-bold leading-relaxed md:leading-[1.2]"
                >
                  $ 1 Trillion in Indian land. Zero digital liquidity mechanism. Two companies. One mandate.
                </motion.p>
              </div>
              <div className="flex flex-col">
                <motion.p variants={itemVariants} className="text-lg md:text-[21px] text-neutral-600 w-full max-w-3xl leading-[1.6]">
                  Versatile Arm Group is transforming Indian land—the country's most trusted but hardest-to-trade asset Land into a secure, 24/7 digital marketplace. We don't just build apps; we build the foundational legal, financial, and tech systems that make land transactions instant and completely reliable. We are starting by unlocking $1 trillion in Indian real estate wealth.
                </motion.p>
              </div>
            </div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link to="/portfolio" className="btn-cta w-full sm:w-auto text-center">
                Our Portfolio
              </Link>
              <Link to="/investors" className="btn-ghost px-10 py-4 text-lg w-full sm:w-auto text-center">
                Investor Relations
              </Link>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6 relative w-full flex items-center justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[600px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,107,90,0.05),transparent)] pointer-events-none" />
            <div className="w-full h-full max-w-lg md:max-w-xl">
              <VLands3DInteractive />
            </div>
          </div>
        </div>
      </section>

      {/* Recognition & Trust Signals */}
      <section className="section-compact border-y border-neutral-100 bg-surface" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container flex flex-wrap justify-center gap-8 md:gap-12 text-center text-neutral-500 no-prose">
          {[
            { label: 'Registration Bill 2025 Native Architecture', icon: <ShieldCheck size={20} /> },
            { label: 'Aadhaar + Blockchain Dual Validation', icon: <Fingerprint size={20} /> },
            { label: 'UDS Legal Framework — M1–M9 Mutation Pipeline', icon: <CheckCircle2 size={20} /> },
            { label: 'AES-256 Encrypted Document Infrastructure', icon: <Lock size={20} /> },
          ].map((signal, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-semibold text-neutral-700">
              <span className="text-primary">{signal.icon}</span>
              <span>{signal.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why VAG? Section (PRD v2.0) */}
      <section className="section bg-white" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="container no-prose">
          <div className="flex flex-col gap-4 mb-20 text-center md:text-left w-full">
            <span className="section-label">Why VAG?</span>
            <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)] w-full max-w-4xl">Deep Research. Deep Trust.</h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              {
                title: 'Infrastructure First',
                desc: 'VAG companies are not apps built on top of existing rails. They ARE the rails. Every product we build owns a piece of critical infrastructure that competitors must use, replicate, or go around. We do not compete on features. We compete on foundations.'
              },
              {
                title: 'Regulatory Native',
                desc: 'We build on legislation, not around it. The Registration Bill 2025, UDS law, and RERA are not constraints for us — they are our product surface. Every VAG company is born compliant, with zero technical debt from legacy architectures that were built before the regulatory environment existed.'
              },
              {
                title: 'Compounding Stack',
                desc: 'Each VAG company reinforces the group\'s data, legal, and operational infrastructure. VLands\' live order book generates pricing data for OwnMyLand. OwnMyLand\'s R1/R2 pipeline deepens the legal operations expertise shared across the group. The whole is worth more than the sum of its parts.'
              },
              {
                title: 'First-Mover by Design',
                desc: 'We move into markets where the compliance complexity is so high that most competitors delay entry for years. By the time the market validates, we have 24+ months of operational head start, proprietary data, and government-level integrations that cannot be replicated in a sprint.'
              }
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ y: -4 }}
                className="bg-surface border border-neutral-100 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col gap-4 group"
              >
                <h3 className="text-xl font-display font-bold transition-colors group-hover:text-primary">{feature.title}</h3>
                <p className="text-neutral-500 text-sm leading-[1.6]">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Traction & Milestones Section */}
      <section className="section bg-neutral-900 text-white overflow-hidden" style={{ paddingTop: '100px', paddingBottom: '80px', paddingLeft: '0px' }}>
        <div className="container no-prose">
          <div className="flex flex-col gap-4 mb-20 items-center text-center">
            <span className="section-label text-accent">Traction</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter" style={{ color: '#fffbfb' }}>From Idea to Infrastructure.</h2>
          </div>

          {/* Desktop/Mobile Timeline Wrapper */}
          <div className="relative">
            {/* Horizontal Timeline Line for Desktop */}
            <div className="hidden md:block absolute top-[6.5rem] left-0 w-full h-[2px] bg-white/10" />
            
            <div className="flex flex-col md:flex-row md:overflow-x-auto md:pb-16 gap-12 md:gap-8 scrollbar-hide">
              {[
                { date: "Oct 2025", event: "Versatile Arm Group founded. VLands IP and legal architecture registered.", icon: "🏛️", status: "done" },
                { date: "Oct 2025–Mar 2026", event: "5 months of intensive legal research on the Registration Bill 2025 by Dr. Uday. M1–M9 mutation pipeline designed. UDS legal framework documented.", icon: "⚖️", status: "done" },
                { date: "Dec 2025", event: "VLands dual-rail architecture designed: ERC-721/ERC-20 blockchain + UDS mutation in parallel. Live order book concept validated.", icon: "🔗", status: "done" },
                { date: "Feb 2026", event: "VLands landing page live at vlands.app.", icon: "🚀", status: "done" },
                { date: "Mar 2026", event: "OwnMyLand founded. R1/R2 pipeline architecture designed. VAULT, governance layer, and squad mechanic built.", icon: "🌱", status: "done" },
                { date: "may 2026", event: "Versatile Arm Group registered. VAG web representation and portfolio presentation launched. Pre-seed fundraising commenced.", icon: "🌐", status: "done" },
                { date: "Jun 2026", event: "OwnMyLand MVP public launch. R1 onboarding pipeline live. Community buying and governance features activated.", icon: "🎯", status: "upcoming" },
                { date: "Q3 2026", event: "Pre-seed close targets: ₹2.5–3 Cr (VLands) & ₹75L–1.5 Cr (OwnMyLand). Legal operations + Marketplace infrastructure build.", icon: "💰", status: "upcoming" },
                { date: "Q1 2027", event: "VLands beta with developer partners in Andhra Pradesh + Telangana. First verified live property listings on order book.", icon: "🏗️", status: "future" },
                { date: "Apr 2027", event: "VLands public marketplace launch. Live order book activated. NRI cross-border onboarding live.", icon: "⚡", status: "future" },
              ].map((milestone, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`flex flex-row md:flex-col gap-6 md:gap-12 min-w-[300px] relative items-start md:items-center text-left md:text-center ${
                    milestone.status === 'future' ? 'opacity-60' : ''
                  }`}
                >
                  <div className={`mt-2 md:mt-0 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white/5 border-2 ${
                    milestone.status === 'done' ? 'border-accent text-accent' : 
                    milestone.status === 'upcoming' ? 'border-yellow-400 text-yellow-400 border-dashed' : 
                    'border-neutral-500 text-neutral-500 border-dashed'
                  } z-10`}>
                    <span className="text-xl md:text-2xl">{milestone.icon}</span>
                  </div>
                  
                  <div className="flex flex-col gap-2 md:mt-2">
                    <span className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-widest">{milestone.date}</span>
                    <p className="text-sm md:text-base font-semibold leading-relaxed max-w-[240px]">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section className="section bg-neutral-50" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container no-prose">
          <div className="flex justify-between items-end mb-16 px-4">
            <div className="flex flex-col gap-4">
              <span className="section-label">Our Work</span>
              <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)]">The Portfolio</h2>
            </div>
            <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
              View All Companies <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                name: 'VLands',
                tagline: "The world's first live-order-book land Marketplace. Buy 3 Sq. Yd of  physical Indian land in 5 clicks, secured with Dual-rail: government UDS mutation + ERC-721 blockchain registry. Exit in days, not decades with effective lockins .",
                sector: 'PropTech · RegTech · FinTech · Blockchain',
                stage: 'Pre-Seed · Prototype Live · Public Launch Apr 2027',
                ask: '₹2.5 – ₹3 Cr',
                link: '/portfolio/vlands'
              },
              {
                name: 'OwnMyLand',
                tagline: "India's most operationally complete co-owners land platform. 8-stage R1 pipeline. 9-stage mutation tracking. AES-256 VAULT. Co-owner governance. From reservation to registered deed in 25 days.",
                sector: 'PropTech · RegTech · Community',
                stage: 'Pre-Seed · MVP Launching Jun 2026',
                ask: '₹75L–₹1.5 Cr',
                link: '/portfolio/ownmyland'
              }
            ].map((company, i) => (
              <motion.div 
                key={company.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200 rounded-2xl p-10 hover:shadow-2xl hover:shadow-primary/8 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="flex flex-col gap-8 h-full">
                  <div className="flex justify-between items-start">
                    <div className="text-neutral-400 text-sm font-mono uppercase font-bold">{company.sector}</div>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{company.stage}</div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      {company.name === 'VLands' ? (
                        <VLandsLogo className="w-12 h-12 shrink-0" />
                      ) : (
                        <OwnMyLandLogo className="w-12 h-12 shrink-0" />
                      )}
                      <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-primary transition-colors">{company.name}</h3>
                    </div>
                    <p className="text-neutral-500 text-lg leading-[1.6] italic">{company.tagline}</p>
                  </div>
                  <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">Ask: <span className="text-primary font-bold">{company.ask}</span></div>
                    <div className="flex items-center gap-6">
                      <Link to={company.name === 'VLands' ? '/pitch/vlands' : '/pitch/ownmyland'} className="text-neutral-500 hover:text-primary transition-colors text-sm font-bold">
                        View Pitch Deck
                      </Link>
                      <Link to={company.link} className="flex items-center gap-2 text-primary font-bold">
                         View Deep Dive <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="section bg-white" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container no-prose">
          <div className="w-full flex flex-col gap-10 text-center items-center">
            <h2 className="text-2xl sm:text-3xl md:text-[52px] font-display leading-[var(--leading-title)] tracking-tighter italic w-full max-w-5xl">The India Registration Bill 2025 changed the legal foundation of land ownership. <br />We built the infrastructure to capture what comes next.</h2>
            <div className="text-base sm:text-lg md:text-[22px] text-neutral-600 leading-relaxed w-full max-w-5xl flex flex-col gap-6">
              <p>
                For the first time in Indian legal history, Aadhaar OTP-based e-registration, automated title mutation, and digital deed issuance are legally recognised instruments under the Registration Act 1908 amendments. This is not a feature update — it is a structural shift in how $ 1 Trillion of land wealth can be owned, transferred, and traded.
              </p>
              <p>
                VAG companies were designed for this moment from Day 1. Not retrofitted to it. That is the difference between a product and a platform, between a first-mover and a fortress.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12 w-full">
              <div className="p-10 bg-neutral-900 border border-white/10 text-white rounded-3xl flex flex-col gap-4 shadow-2xl">
                <div className="text-white text-4xl font-display font-bold">$ 1T</div>
                <p className="text-sm text-neutral-400 font-medium leading-relaxed">India's total land wealth — the world's largest illiquid household asset class.</p>
              </div>
              <div className="p-10 bg-accent text-primary-dark rounded-3xl shadow-xl shadow-accent/20 flex flex-col gap-4">
                <div className="text-primary-dark text-4xl font-display font-bold">2025</div>
                <p className="text-sm text-primary-dark/70 font-medium leading-relaxed">The legislative tipping point. Aadhaar-based registration and digital mutation became legally enforceable instruments.</p>
              </div>
              <div className="p-10 bg-surface border border-neutral-200 text-primary rounded-3xl flex flex-col gap-4 shadow-sm">
                <div className="text-primary text-4xl font-display font-bold">5 Clicks</div>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">VLands' target for a fully mutated, blockchain-registered land purchase. OwnMyLand's R1 pipeline delivers a registered deed in 25 days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="section bg-neutral-900 text-white relative overflow-hidden pt-[95px] pb-[95px]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 transform translate-x-1/2" />
        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-20 no-prose">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary bg-neutral-800 flex-shrink-0 relative group shadow-2xl"
          >
             {!imgError ? (
               <img 
                 src="https://lh3.googleusercontent.com/d/1q2uYqrtvrfSbTMcPkhdF_OSZw30NgGhF" 
                 alt="Uday Kiran Lingipalli" 
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover transition-transform group-hover:scale-110"
                 onError={() => setImgError(true)}
               />
             ) : (
               <FallbackAvatar />
             )}
          </motion.div>
          <div className="flex flex-col gap-8 flex-1">
            <motion.blockquote 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-display italic leading-[var(--leading-subtitle)] w-full max-w-4xl"
            >
              "We are not building a product. We are building a right — the right for every Indian to own land without fear, friction, or fraud."
            </motion.blockquote>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-1"
            >
              <cite className="not-italic text-2xl md:text-3xl font-bold text-accent">Uday Kiran Lingipalli</cite>
              <span className="text-neutral-400 uppercase tracking-widest text-sm font-mono font-bold">Founder & CEO, Versatile Arm Group</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="section bg-white pt-[100px] pb-[80px]" style={{ paddingBottom: '80px' }}>
        <div className="container no-prose flex flex-col items-center w-full">
          <div className="flex flex-col gap-4 mb-16 items-center text-center w-full">
            <span className="section-label">The Team</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter text-neutral-950 w-full max-w-4xl">Built by a founder who lived the problem.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-surface border border-neutral-100 rounded-3xl p-10 flex flex-col gap-8 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary bg-neutral-800">
                {!imgError ? (
                  <img 
                    src="https://lh3.googleusercontent.com/d/1q2uYqrtvrfSbTMcPkhdF_OSZw30NgGhF" 
                    alt="Uday Kiran Lingipalli" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <FallbackAvatar />
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-display font-bold text-neutral-950">Uday Kiran Lingipalli</h3>
                  <span className="section-label text-primary mt-1">Founder & CEO</span>
                </div>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  Medical student and infrastructure founder. His family needed ₹8 Lakhs for medical school fees — their ₹12 Lakh farmland was offered ₹8.5 Lakhs by opportunistic buyers. His father took a high-interest loan instead of a distress sale. That injustice became Versatile Arm Group. Previously scaled Chikitsaaa to 30,000 monthly visitors. Spent 5 months of intensive legal research mapping India's Registration Bill 2025 before writing a single line of product code. Founder of VLands and OwnMyLand.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 border-dashed border-neutral-200 rounded-3xl p-10 flex flex-col gap-8 items-center justify-center text-center min-h-[340px]"
            >
              <div className="w-20 h-20 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-300">
                <Users size={32} />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl font-display font-bold text-neutral-950">Advisory Board</h3>
                  <span className="section-label text-neutral-400 mt-1">Legal · PropTech · FinTech</span>
                </div>
                <p className="text-neutral-500 leading-relaxed text-sm max-w-sm">
                  VAG is actively building its advisory board. We seek domain experts in Indian land law, SEBI/RERA regulatory frameworks, blockchain infrastructure, and high-velocity B2C distribution. Current core team: Uday Kiran Lingipalli (Founder & CEO) and Vishal D Mehta (CFO) — with a founding engineer team committed through the pre-seed phase.
                </p>
                <Link to="/careers" className="text-primary font-bold hover:underline">Join as Advisor &rarr;</Link>
              </div>
            </motion.div>
          </div>

          <div className="mt-16">
            <Link to="/team" className="text-primary font-bold text-lg hover:gap-4 transition-all flex items-center gap-2">
              Meet the full team <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-white pt-[80px] pb-[80px]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="container bg-primary rounded-3xl p-12 md:p-24 text-center text-white flex flex-col items-center gap-10 overflow-hidden relative shadow-2xl no-prose w-full"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full translate-x-1/2 translate-y-1/2" />
          
          <div className="z-10 w-full flex flex-col gap-6 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-display leading-[var(--leading-title)]" style={{ color: '#ffffff' }}>Ready to build the future of ownership?</h2>
            <p className="text-xl text-primary-light leading-[var(--leading-body)] w-full max-w-2xl mx-auto">Whether you're an investor, partner, or landowner, we'd love to connect.</p>
          </div>
          <Link to="/contact" className="z-10 btn-cta bg-white text-primary hover:bg-neutral-100">
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

