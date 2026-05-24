import * as React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Scale, Globe2, Zap, Lock,
  TrendingUp, Users, Landmark, Eye, Heart, Phone, Mail, MapPin
} from 'lucide-react';

const Mission = () => {
  return (
    <div className="bg-white selection:bg-primary selection:text-white">

      {/* ─── 01 MANIFESTO ─────────────────────────────────────────────── */}
      <section 
        className="pt-12 pb-20 md:pt-20 md:pb-32 bg-surface overflow-hidden"
        style={{ paddingBottom: '100px' }}
      >
        <div className="container no-prose flex flex-col gap-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12"
          >
            <span className="section-label">The Manifesto</span>

            <blockquote 
              className="text-[clamp(2.2rem,5.5vw,4.8rem)] font-display font-medium leading-[var(--leading-title)] tracking-tighter text-neutral-950 italic w-full max-w-6xl"
              style={{ fontSize: '64.4px' }}
            >
              "Dismantle the friction that separates{' '}
              <span className="text-primary not-italic">ordinary people</span>{' '}
              from extraordinary assets."
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pt-4">
              <div className="md:col-span-7 flex flex-col gap-6">
                <div className="w-12 h-1 bg-primary" />
                <p 
                  className="text-2xl md:text-3xl text-neutral-600 leading-[var(--leading-subtitle)]"
                  style={{ fontSize: '28px' }}
                >
                  We are building the legal, financial, and technological infrastructure 
                  that makes India's most trusted asset class — land — accessible to 
                  every Indian family that deserves to own it.
                </p>
                <p 
                  className="text-lg text-neutral-400 leading-[var(--leading-body)] max-w-xl"
                  style={{ fontSize: '17px' }}
                >
                  Not through shortcuts. Not by bypassing regulation. But by becoming 
                  the most competent operator of India's existing legal machinery — 
                  and making that machinery run at software speed.
                </p>
              </div>
              <div className="md:col-span-5 flex flex-col gap-3 text-xs font-mono text-neutral-400 pt-4 border-l border-neutral-100 pl-10">
                <span className="text-neutral-900 font-bold text-sm">Versatile Arm Group</span>
                <span>Established/Registered: May 2026 (Founded: Oct 2025)</span>
                <span>Mandate: Land Liquidity Infrastructure</span>
                <span>Architecture: Registration Bill 2025 Native</span>
                <span>Portfolio: VLands · OwnMyLand</span>
                <span>Stage: Pre-Seed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 02 THE PROBLEM: HIGH-CONTRAST DATA ───────────────────────── */}
      <section className="section bg-neutral-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_#00D4AA,_transparent_60%)]" />
        <div className="container no-prose w-full" style={{ paddingTop: '0px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <div className="flex flex-col gap-8">
              <span className="section-label text-accent">The Problem</span>
              <h2 className="text-4xl md:text-6xl font-display leading-[var(--leading-title)] tracking-tighter italic">
                The $1 Trillion<br />
                <span className="text-accent">Poverty of Access.</span>
              </h2>
              <div className="flex flex-col gap-5 text-lg text-neutral-400 leading-[var(--leading-body)]">
                <p>
                  India holds $1 Trillion in land wealth — the largest store of 
                  household value in the world. Less than 1% of it can be bought, 
                  sold, or exited with any speed. The rest is frozen. Not because 
                  Indians don't want to trade it — but because no infrastructure 
                  exists to let them.
                </p>
                <p>
                  Every year, families facing medical bills, tuition fees, or 
                  business crises are forced to sell ancestral land at 20–40% below 
                  market value to the only buyer who shows up: an opportunistic 
                  investor with cash and no urgency. There is no exchange. 
                  There is no price discovery. There is no exit.
                </p>
                <p className="text-neutral-300 font-medium">
                  Versatile Arm Group is building the Marketplace. The price discovery. 
                  The exit. For every Indian family.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <Lock size={20} />,
                  val: '$1 Trillion',
                  label: 'Land Wealth with No Liquid Exit',
                  sub: "India's total land value — the world's largest illiquid household asset class. Zero institutional digital mechanism exists today."
                },
                {
                  icon: <Scale size={20} />,
                  val: '43%',
                  label: 'Civil Court Cases',
                  sub: 'Nearly half of all civil litigation in India is rooted in property documentation disputes — a direct consequence of paper-era title systems.'
                },
                {
                  icon: <Zap size={20} />,
                  val: '90–180 Days',
                  label: 'Average Mutation Timeline',
                  sub: 'The government record update that legally completes ownership transfer takes 3–6 months by traditional process. We target 60 days. VLands targets 45.'
                },
                {
                  icon: <TrendingUp size={20} />,
                  val: '₹30–50 Lakhs',
                  label: 'Minimum Plot Entry Ticket',
                  sub: '350 million middle-class families want land. The minimum ticket locks out 95% of them. We open access from ₹3 Lakhs.'
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent/30 hover:bg-white/8 transition-all duration-300 flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-2xl md:text-3xl font-display font-bold text-accent leading-none">{item.val}</div>
                    <div className="text-sm font-bold text-white mt-1">{item.label}</div>
                    <p className="text-xs text-neutral-500 leading-relaxed mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03 FOUNDING STORY ────────────────────────────────────────── */}
      <section 
        className="section bg-surface border-y border-neutral-100 overflow-hidden relative"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <div className="container no-prose w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="section-label">Where It Began</span>
              <h2 className="text-4xl md:text-5xl font-display font-medium leading-[var(--leading-title)] tracking-tighter">
                A ₹3.5 Lakh difference<br />
                <span className="text-primary italic">that built a company.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6 text-lg text-neutral-600 leading-[var(--leading-body)]">
              <p>
                Uday Kiran Lingipalli's family needed ₹8 Lakhs for medical school fees. 
                Their farmland — valued by the family at ₹12 Lakhs — was offered ₹8.5 Lakhs 
                by every buyer who came. Below value. Take it or leave it. There was no 
                marketplace. No competing bid. No price discovery. Just one offer and a deadline.
              </p>
              <p>
                His father took a high-interest loan instead of accepting a distress sale. 
                The land stayed in the family. But the injustice stayed with Uday.
              </p>
              <p className="text-neutral-900 font-medium text-xl">
                When India's Registration Bill 2025 created the legal opening for digital-first 
                land ownership and mutation, Uday saw not just a product opportunity — but a 
                moral obligation to build it.
              </p>
              <p>
                Versatile Arm Group was founded in October 2025, and registered in May 2026. Five months of intensive 
                legislative mapping by Dr. Uday followed — every UDS legal workflow, M1–M9 mutation stage, 
                and Aadhaar OTP protocol documented before a single line of product code was 
                committed. This is why our infrastructure is 24 months ahead of every company 
                that starts today.
              </p>
              <div className="flex flex-col gap-1 pt-4 border-t border-neutral-200">
                <span className="font-bold text-neutral-900">Uday Kiran Lingipalli</span>
                <span className="text-sm text-neutral-500">Founder & CEO, Versatile Arm Group</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04 PHILOSOPHY PILLARS ────────────────────────────────────── */}
      <section 
        className="section bg-white overflow-hidden"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <div className="container no-prose flex flex-col gap-6 w-full">
          <span className="section-label">What We Believe</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium leading-[var(--leading-title)] tracking-tighter max-w-3xl mb-16">
            Six convictions that drive every architectural decision we make.
          </h2>

          <div className="flex flex-col gap-0">
            {[
              {
                num: '01',
                label: 'Regulatory Architecture',
                title: 'Regulation is not a constraint. It is the product.',
                desc: `Every VAG company is born compliant — not retrofitted to compliance. The Registration Bill 2025, UDS law, and RERA are not obstacles to navigate around; they are the product surface we build on. We were designed for this legislative moment from Day 1. Competitors who began before 2025 carry technical and legal debt we will never accumulate.`,
                accent: true,
              },
              {
                num: '02',
                label: 'Infrastructure First',
                title: 'We don\'t build apps. We build protocols.',
                desc: `An app can be copied in a weekend. Infrastructure takes years. Every product VAG builds owns a piece of critical legal or financial infrastructure that any competitor must use, replicate from scratch, or route around at great cost. The live order book, the dual-rail registry, the R1/R2 fulfillment pipeline — these are protocols, not features. Protocols compound. Features deprecate.`,
                accent: false,
              },
              {
                num: '03',
                label: 'Operational Excellence',
                title: 'Code is the easy part. Operations are the moat.',
                desc: `The hardest thing to replicate about our companies is not the UI or the blockchain layer — it is the SLA culture, the sub-registrar relationships, the mutation tracking discipline, and the domain knowledge in Indian land law. An engineer can fork our interface in a month. They cannot fork 18 months of operational infrastructure. We invest in what cannot be copied at speed.`,
                accent: false,
              },
              {
                num: '04',
                label: 'Democratic Ownership',
                title: 'Land is a right. We are building the infrastructure to prove it.',
                desc: `India's wealth inequality is not primarily an income problem — it is an asset access problem. When a ₹30 Lakh minimum ticket locks 350 million middle-class families out of the asset class that constitutes 70% of national household wealth, the consequence is structural. We lower the floor. Not through compromise on legal integrity, but through fractionalisation that is legally identical to whole ownership. Every investor — whether ₹3 Lakhs or ₹3 Crores — holds the same quality of title.`,
                accent: false,
              },
              {
                num: '05',
                label: 'Radical Transparency',
                title: 'No black boxes. Every stage, visible in real time.',
                desc: `The land purchase process has always been a black box — payments disappear, mutations "are in progress," deeds "are coming." We contractualize transparency. Every stage of the legal pipeline — from booking confirmation to mutation certificate — has a defined SLA, a real-time dashboard display, and an auto-escalation protocol for breaches. If something is delayed, our investor sees it before we tell them. Radical transparency is a moat, not a feature.`,
                accent: false,
              },
              {
                num: '06',
                label: 'Compounding Stack',
                title: 'The whole is worth more than the sum of its parts.',
                desc: `VLands and OwnMyLand are not separate product lines that share a logo. They are two nodes in a compounding infrastructure stack. VLands' live order book generates real-time land price data that improves OwnMyLand's wealth simulation. OwnMyLand's R1/R2 fulfillment pipeline deepens the shared legal operations expertise. The data, legal, and operational infrastructure VAG owns becomes more valuable the more entities use it. That compounding is the holding company thesis.`,
                accent: false,
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 py-16 border-b border-neutral-100 group transition-colors ${pillar.accent ? 'bg-primary/[0.02] -mx-6 px-6' : ''}`}
              >
                <div className="lg:col-span-1">
                  <div className="text-5xl md:text-7xl font-display font-black text-neutral-100 group-hover:text-primary/10 transition-colors leading-none select-none">
                    {pillar.num}
                  </div>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                  <span className="text-label text-primary">{pillar.label}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-medium leading-[var(--leading-title)] tracking-tight group-hover:italic transition-all">
                    {pillar.title}
                  </h3>
                </div>
                <div className="lg:col-span-7 flex items-center">
                  <p className="text-lg text-neutral-500 leading-[var(--leading-body)]">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05 REGULATORY CONVICTION QUOTE ──────────────────────────── */}
      <section className="section bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#ffffff,_transparent_60%)]" />
        <div className="container no-prose flex flex-col gap-12 items-center text-center relative z-10 w-full">
          <div className="w-16 h-1 bg-accent" />
          <blockquote className="text-3xl md:text-5xl font-display font-medium italic leading-[var(--leading-title)] tracking-tighter max-w-4xl text-white">
            "While others build around the law, we build on top of it. 
             We are not disrupting the state — we are becoming its most 
             competent digital execution partner."
          </blockquote>
          <div className="flex flex-col gap-1 border-t border-white/20 pt-8">
            <span className="font-bold text-accent">Uday Kiran Lingipalli</span>
            <span className="text-sm text-white/60">Founder & CEO, Versatile Arm Group</span>
          </div>
        </div>
      </section>

      {/* ─── 07 MARKET OPPORTUNITY ─────────────────────────────────────── */}
      <section 
        className="section bg-white"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <div className="container no-prose flex flex-col gap-16 w-full">
          <div className="flex flex-col gap-4">
            <span className="section-label">The Scale of the Opportunity</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium leading-[var(--leading-title)] tracking-tighter max-w-3xl">
              The market is not small.<br />
              <span className="text-primary italic">The problem is enormous.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                val: '$1 T+',
                label: 'India\'s Total Land Wealth',
                desc: 'The largest store of household value in any emerging economy. Equivalent to 12× India\'s current GDP. Almost entirely illiquid.',
                bg: 'bg-neutral-950 text-white',
                vColor: 'text-accent',
                lblColor: 'text-[#fffcfc]',
                valStyle: { color: '#ffffff' }
              },
              {
                val: '$8.9B',
                label: 'Fractional Land SAM',
                desc: 'The serviceable market for digitised, retail-accessible fractional land. Growing at estimated 35%+ CAGR as digital title infrastructure matures.',
                bg: 'bg-primary text-white',
                vColor: 'text-accent',
                lblColor: 'text-[#fff4f4]',
                valStyle: { color: '#ffffff' }
              },
              {
                val: '35M+',
                label: 'NRI Diaspora Investors',
                desc: 'Indian-origin investors with documented desire to own Indian land — structurally blocked by documentation complexity and capital repatriation friction. No platform serves this segment well.',
                bg: 'bg-accent text-primary-dark',
                vColor: 'text-primary-dark',
                lblColor: 'text-primary-dark'
              },
            ].map((s, i) => (
              <div key={i} className={`p-10 md:p-12 rounded-2xl flex flex-col gap-4 ${s.bg}`}>
                <div className={`text-5xl md:text-6xl font-display font-bold ${s.vColor} leading-none`} style={'valStyle' in s ? (s.valStyle as React.CSSProperties) : undefined}>{s.val}</div>
                <h3 className={`text-lg font-bold ${s.lblColor}`}>{s.label}</h3>
                <p className="text-sm leading-relaxed opacity-70">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface border border-neutral-100 rounded-2xl p-10 md:p-14 flex flex-col md:flex-row gap-10 md:gap-20 items-center">
            <div className="flex flex-col gap-4 flex-1">
              <span className="section-label">The Mission in Numbers</span>
              <h3 className="text-3xl md:text-4xl font-display font-medium leading-[var(--leading-title)] tracking-tight">
                Five years from now,<br />1 million Indians own land<br />
                <span className="text-primary italic">who couldn't before.</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-6 flex-1">
              {[
                { val: '1M', label: 'Target Users by Year 5' },
                { val: '2000', label: 'Acres Under Management (Y5)' },
                { val: '₹9,000 Cr', label: 'VLands GMV Target (Y5)' },
                { val: '₹3 Lakhs', label: 'OwnMyLand Minimum Entry' },
              ].map(s => (
                <div key={s.label} className="flex flex-col gap-1">
                  <div className="text-3xl md:text-4xl font-display font-bold text-primary">{s.val}</div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 08 CLOSING CTA ────────────────────────────────────────────── */}
      <section className="section bg-neutral-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_#00D4AA,_transparent_70%)]" />
        <div className="container no-prose flex flex-col gap-12 items-center text-center relative z-10 w-full">
          <div className="w-16 h-1 bg-accent" />
          <h2 className="text-4xl md:text-6xl font-display font-medium italic leading-[var(--leading-title)] tracking-tighter max-w-3xl text-[#ffffff]">
            If the mission resonates,<br />
            <span className="text-accent">let's build together.</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl leading-[var(--leading-body)]">
            We are raising a pre-seed round to build the legal and technical infrastructure 
            that India's $ 1 Trillion land market has waited 117 years for. 
            The window is now. The foundation is built. The legislation is live.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/investors" className="bg-accent text-primary-dark px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
              Investor Relations
            </Link>
            <Link to="/portfolio" className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
              Our Portfolio <ArrowRight size={16} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Mission;
