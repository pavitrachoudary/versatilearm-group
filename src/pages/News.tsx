import { motion } from 'motion/react';
import { Mail, ArrowRight, ArrowUpRight, BookOpen, TrendingUp, Building2, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const News = () => {
  const articles = [
    {
      date: 'May 2026',
      category: 'Announcement',
      icon: <Building2 size={16} />,
      title: 'Versatile Arm Group Establishes Global HQ in Visakhapatnam — India\'s Rising PropTech Capital.',
      desc: 'Our coastal headquarters positions VAG at the heart of Andhra Pradesh\'s infrastructure expansion. The facility will house 4+ deep tech engineers, legal architects, and RegTech specialists by Q4 2026 — the team building the mutation rails that no competitor has attempted.'
    },
    {
      date: 'April 2026',
      category: 'Regulatory Intelligence',
      icon: <Landmark size={16} />,
      title: 'India\'s Registration Bill 2025: The Legislative Catalyst That Will Unlock ₹87 Trillion in Dormant Land Wealth.',
      desc: 'A forensic analysis of how the Registration Bill 2025\'s digital-first mandate creates an irreversible moat for native-built RegTech platforms. VAG has engineered every compliance layer in the Bill into our protocol stack from day one — competitors building on legacy frameworks face a 3-year re-architecture.'
    },
    {
      date: 'February 2026',
      category: 'Market Intelligence',
      icon: <BookOpen size={16} />,
      title: 'The 116-Year Problem: Why India\'s Land Market Has Never Had a Liquidity Event — Until Now.',
      desc: 'India\'s Registration Act of 1908 created a system optimised for colonial revenue extraction, not citizen wealth. We document the structural barriers — opacity, fragmentation, middlemen, and mutation delays — that have kept ₹87 Trillion locked away, and why our dual-rail protocol is the first credible solution.'
    }
  ];

  return (
    <div className="bg-white selection:bg-primary selection:text-white">

      {/* ── Header: High Drama Hero ─────────────────────────────────────── */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 bg-surface">
        <div className="container no-prose w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-10"
          >
            <span className="section-label">Inside the Infrastructure</span>
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-display font-medium leading-[var(--leading-display)] tracking-tighter text-neutral-950">
              Press &amp; <br />
              <span className="text-secondary italic">Updates.</span>
            </h1>
            <p className="text-2xl md:text-3xl text-neutral-500 max-w-4xl leading-[var(--leading-subtitle)] mt-4">
              Documenting the construction of India's fractional land infrastructure — one protocol, one transaction, one legislative boundary at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Article: Manifesto Card ───────────────────────────── */}
      <section className="section">
        <div className="container no-prose w-full">
          <Link
            to="/news"
            className="group block relative min-h-[420px] md:aspect-[21/9] bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 p-10 md:p-16 flex items-end"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_60%,rgba(26,107,90,0.35),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,212,170,0.08),transparent_50%)]" />

            <div className="relative z-10 flex flex-col gap-6 max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="bg-accent text-primary-dark px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest">
                  Featured
                </span>
                <span className="text-label text-accent font-bold uppercase">
                  Market Analysis · May 2026
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tighter leading-[var(--leading-title)] group-hover:italic transition-all">
                The ₹87 Trillion<br />
                Awakening.
              </h2>

              <p className="text-xl text-neutral-400 max-w-2xl leading-[var(--leading-body)]">
                India's land market is the largest untapped asset class on earth. This is our argument for why fractional ownership — built on sovereign-grade digital infrastructure — is not a product. It is a civilisational infrastructure project.
              </p>

              <div className="mt-4 flex items-center gap-3 text-accent font-bold text-lg group-hover:gap-5 transition-all">
                Read the Analysis <ArrowUpRight size={24} />
              </div>
            </div>

            {/* Background typographic decoration */}
            <div className="absolute right-0 bottom-0 text-[10rem] md:text-[18rem] font-black text-white/[0.025] select-none pointer-events-none font-display italic leading-none">
              ₹87T
            </div>
          </Link>
        </div>
      </section>

      {/* ── Two-Column Insight Stats ─────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-surface border-y border-neutral-100">
        <div className="container no-prose w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            {[
              { value: '₹87T', label: 'Total Indian Land Wealth', sub: 'Zero institutional liquidity today' },
              { value: '116 yrs', label: 'Age of the Registration Act', sub: 'The law we are replacing' },
              { value: '2025', label: 'Registration Bill Enacted', sub: 'Our legislative mandate' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 px-6 md:px-10 py-6 md:first:pl-0 md:last:pr-0">
                <div className="text-3xl md:text-4xl font-display font-black text-primary tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-950">{stat.label}</div>
                <div className="text-xs text-neutral-400 italic leading-snug">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Article List: Vertical Minimal Editorial ─────────────────────── */}
      <section className="py-16 md:py-28 px-6 bg-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-0 border-t border-neutral-100">
          {articles.map((item, i) => (
            <Link
              key={i}
              to="/news"
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-12 md:py-16 border-b border-neutral-100 group hover:px-6 md:hover:px-8 transition-all duration-500"
            >
              {/* Date + Category */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <div className="text-label text-neutral-400 font-bold uppercase group-hover:text-primary transition-colors">
                  {item.date}
                </div>
                <div className="flex items-center gap-2 text-primary text-[10px] font-bold font-mono uppercase tracking-widest">
                  {item.icon}
                  <span>{item.category}</span>
                </div>
              </div>

              {/* Title + Description */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 leading-[1.2] group-hover:italic transition-all">
                  {item.title}
                </h3>
                <p className="text-lg text-neutral-500 leading-[1.65] max-w-2xl">
                  {item.desc}
                </p>
              </div>

              {/* Arrow CTA */}
              <div className="md:col-span-2 flex items-center justify-end">
                <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shrink-0">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Regulatory Context Callout ──────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-surface border-t border-neutral-100">
        <div className="container no-prose w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="flex flex-col gap-8">
              <span className="section-label">Why Now</span>
              <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-[var(--leading-title)]">
                The legislative window<br />
                <span className="italic text-primary">opens once.</span>
              </h2>
              <p className="text-xl text-neutral-600 leading-[var(--leading-body)] max-w-xl">
                India's Registration Bill 2025 mandates a digital-first mutation framework for the first time in 116 years. The companies that build native-to-regulation infrastructure in the next 24 months will own this category. We are building that infrastructure now.
              </p>
              <Link to="/expertise" className="btn-primary w-fit flex items-center gap-3">
                Our Technical Moat <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex flex-col gap-0 border border-neutral-200 rounded-2xl overflow-hidden">
              {[
                { year: '1908', event: 'Registration Act', status: 'disrupting' },
                { year: '2016', event: 'RERA Enacted', status: 'built on' },
                { year: '2024', event: 'Mass Digitalisation', status: 'enabled' },
                { year: '2025', event: 'Registration Bill 2025', status: 'native to' },
                { year: '2026', event: 'VAG Protocols Live', status: 'now' },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-12 gap-4 items-center px-8 py-5 border-b border-neutral-100 last:border-0 ${
                    row.year === '2026' ? 'bg-primary text-white' : 'bg-white hover:bg-surface'
                  } transition-colors`}
                >
                  <div className={`col-span-3 font-display font-black text-2xl ${row.year === '2026' ? 'text-accent' : 'text-neutral-300'}`}>
                    {row.year}
                  </div>
                  <div className={`col-span-6 font-bold text-sm ${row.year === '2026' ? 'text-white' : 'text-neutral-900'}`}>
                    {row.event}
                  </div>
                  <div className={`col-span-3 text-right text-[9px] font-mono uppercase font-bold tracking-wider ${
                    row.year === '2026' ? 'text-accent' : 'text-neutral-400'
                  }`}>
                    {row.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter: High Contrast Minimal ─────────────────────────────── */}
      <section className="section bg-neutral-900 text-white overflow-hidden relative">
        <div className="container no-prose flex flex-col items-center text-center gap-12 md:gap-16 relative z-10 w-full">
          <div className="w-full flex flex-col gap-6">
            <span className="text-label text-accent font-bold uppercase">Transmission</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter italic leading-[var(--leading-title)] text-white">
              Join Our Investor Letters.
            </h2>
            <p className="text-xl text-neutral-400 max-w-sm mx-auto leading-[var(--leading-body)]">
              Monthly briefings on India's RegTech landscape, Registration Bill 2025 implementation updates, and VAG portfolio progress — for serious operators and investors only.
            </p>
          </div>

          <form
            className="w-full max-w-md flex flex-col gap-4"
            onSubmit={(e) => { e.preventDefault(); alert('You are now on the Transmission list.'); }}
          >
            <input
              type="email"
              placeholder="Email Address"
              className="bg-white/5 border border-white/10 rounded-full px-8 py-5 outline-none focus:border-accent transition-all text-lg text-white placeholder:text-neutral-600"
              required
            />
            <button type="submit" className="btn-cta bg-accent text-primary-dark w-full flex items-center justify-center gap-3">
              <Mail size={20} /> Subscribe to Investor Letters
            </button>
          </form>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-[12rem] md:text-[28rem] font-black text-white/[0.025] select-none pointer-events-none font-display italic">
          V.A.G
        </div>
      </section>

      {/* ── Press Contact ──────────────────────────────────────────────── */}
      <section className="section bg-white border-t border-neutral-100">
        <div className="container no-prose grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center w-full">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter italic leading-[var(--leading-title)]">
              Media Relations
            </h2>
            <p className="text-xl text-neutral-500 leading-[var(--leading-body)]">
              For editorial interviews with Dr. Uday Kiran Lingipalli, high-resolution group assets, data requests, or expert commentary on VAG group Updates and the PropTech transformation.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 pb-8 border-b border-neutral-100">
              <span className="text-label text-neutral-400 font-bold uppercase">Press Contact</span>
              <p className="text-xl md:text-2xl font-bold flex items-center gap-4">
                press@versatilearm.com
                <Link to="/contact?intent=Press" className="text-primary hover:scale-110 transition-transform">
                  <ArrowRight size={24} />
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-primary font-bold text-sm">Visakhapatnam</span>
                <span className="text-neutral-400 text-[10px] uppercase font-bold font-mono tracking-widest">Global HQ</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary font-bold text-sm">Available Now</span>
                <span className="text-neutral-400 text-[10px] uppercase font-bold font-mono tracking-widest">Interview Slots</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary font-bold text-sm">English · Telugu</span>
                <span className="text-neutral-400 text-[10px] uppercase font-bold font-mono tracking-widest">Languages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default News;
