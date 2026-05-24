import React, { useState, useEffect, useCallback, useRef } from 'react';
import { OwnMyLandLogo } from '../components/OwnMyLandLogo';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight,
  Globe, ShieldCheck, Zap, Users, TrendingUp, BarChart3,
  Layers, Scale, Lock, Mail, CreditCard, Building2,
  GitMerge, Landmark, Cpu, Terminal, CircleDot, Menu, X,
  Vote, Clock, FileText, Shield, Award, Play, CheckCircle2
} from 'lucide-react';

/* ─────────────────────────────────────────────────────
   SLIDE REGISTRY
───────────────────────────────────────────────────── */
const SLIDES = [
  { id: 'cover',         label: 'Cover' },
  { id: 'thesis',        label: 'The Thesis' },
  { id: 'problem',       label: 'The Problem' },
  { id: 'solution',      label: 'The Solution' },
  { id: 'market-india',  label: 'India Land Market' },
  { id: 'audience',      label: 'Target Audience' },
  { id: 'model',         label: 'Business Model' },
  { id: 'gtm',           label: 'Go-to-Market' },
  { id: 'product',       label: 'The Product' },
  { id: 'moat',          label: 'Defensive Moat' },
  { id: 'team',          label: 'The Team' },
  { id: 'ask',           label: 'The Ask' },
];

/* ─────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6 } },
};

/* ─────────────────────────────────────────────────────
   REUSABLE SLIDE CHROME
───────────────────────────────────────────────────── */
const SlideLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-semibold mb-2">
    {children}
  </span>
);

const Tag = ({ children, light }: { children: React.ReactNode; light?: boolean; key?: React.Key }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest ${
    light ? 'bg-white/10 text-white/70' : 'bg-accent/20 text-accent'
  }`}>
    {children}
  </span>
);

const OwnMyLandLogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <OwnMyLandLogo className={className} />
);

/* ═══════════════════════════════════════════════════
   SLIDE COMPONENTS
═══════════════════════════════════════════════════ */

/* 01 — COVER */
const SlideCover = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="relative flex flex-col justify-between min-h-full w-full px-6 py-12 md:p-16 lg:p-20 overflow-hidden bg-neutral-950">

    {/* Elegant dark green radial gradient styling */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_40%_50%,rgba(15,74,61,0.35),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(0,212,170,0.06),transparent_50%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-between relative z-10 gap-8 md:gap-12">
      {/* Top bar */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <OwnMyLandLogoIcon className="w-8 h-8 font-bold text-sm" />
          <span className="font-display font-bold text-white text-lg tracking-tight">OwnMyLand</span>
        </div>
        <Tag light>Pre-Seed Solicitation · 2026</Tag>
      </motion.div>

      {/* Hero */}
      <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
        <motion.div variants={fadeUp}>
          <SlideLabel>Investment Deck</SlideLabel>
          <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-display font-bold text-white leading-[0.9] tracking-tighter mt-2">
            OwnMy<span className="text-accent">Land</span>
          </h1>
          <p className="text-lg md:text-2xl text-neutral-400 font-display italic mt-4 max-w-2xl leading-snug">
            Community-First Co-ownership Platform — Digitising Land Acquisition in India. Starting at ₹3 Lakhs.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-4">
          {['PropTech', 'RegTech', 'FracLand', 'Aadhaar-Native'].map(t => <Tag key={t}>{t}</Tag>)}
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div variants={fadeIn} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-8 border-t border-white/10 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">Founder & CEO</span>
          <span className="text-white font-bold">Dr. Uday Kiran Lingipalli</span>
        </div>
        <div className="flex flex-col gap-1 md:text-right">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">Contact</span>
          <span className="text-accent font-mono text-sm">udaylingipalli@ownmyland.co</span>
        </div>
      </motion.div>
    </div>

    {/* Watermark in CSS style */}
    <div className="absolute right-0 bottom-0 text-[14rem] md:text-[26rem] font-black text-white/[0.012] font-display select-none pointer-events-none leading-none tracking-tighter">₹3L</div>
  </motion.div>
);

/* 02 — THESIS */
const SlideThesis = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-neutral-950 text-white relative">

    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(15,74,61,0.25),transparent)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>The Thesis</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tighter leading-tight mt-2">
          An ownership OS that transforms <br />
          <span className="text-accent italic">dormant land into liquid equity.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <div className="text-xs font-mono text-accent uppercase tracking-widest font-bold">The Opportunity</div>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Every middle-class Indian family understands that land is the ultimate wealth creation engine. Yet, it remains locked to most due to high entry costs (₹30L+), opaque legal validation, and broker manipulation. OwnMyLand provides a secure, fully mapped, co-ownership ecosystem starting at just ₹3 Lakhs.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <div className="text-xs font-mono text-accent uppercase tracking-widest font-bold font-semibold">The Infrastructure</div>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            This is not a listings platform. It is a full-stack transactional pipeline. Through government-registered Undivided Share (UDS) land deeds, a bank-level AES-256 secure document Vault, a live 9-stage mutation tracker, on-chain voting governance, and viral squad buying, OwnMyLand delivers institutional-grade certainty to everyday retail investors.
          </p>
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 p-5 bg-white/[0.03] border border-white/10 rounded-xl mt-4">
        {[
          { metric: '₹3 Lakhs', label: 'Minimum Entry Ticket' },
          { metric: '25 Days', label: 'Deed Delivery SLA' },
          { metric: '60 Days', label: 'Mutation Update SLA' }
        ].map(item => (
          <div key={item.label} className="text-center md:text-left">
            <div className="text-lg md:text-2xl font-display font-bold text-accent">{item.metric}</div>
            <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mt-1">{item.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

/* 03 — PROBLEM */
const SlideProblem = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-neutral-900 text-white relative">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>The Problem</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tighter leading-tight mt-2">
          The three barriers of<br /><span className="text-accent italic">traditional land ownership.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {[
          {
            num: '01',
            title: 'High Financial Bar',
            desc: 'The minimum threshold to buy premium plots in high-growth districts is ₹30–50 Lakhs — which is completely inaccessible to ordinary salaried workers.'
          },
          {
            num: '02',
            title: 'Opaque Legal Fraud',
            desc: 'Property fraud and double-registrations drain ₹40,000 Cr yearly from Indian households. Property disputes constitute over 43% of all ongoing civil court cases.'
          },
          {
            num: '03',
            title: 'Fulfillment Limbo',
            desc: 'Interacting with municipal registrars, managing mutation files (7/12 extracts), and fighting predatory brokers (charging 5% for no value) is a multi-month hassle.'
          }
        ].map((item) => (
          <motion.div key={item.num} variants={fadeUp}
            className="flex flex-col gap-4 p-6 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all relative">
            <span className="text-3xl font-display font-black text-accent/30">{item.num}</span>
            <div className="flex flex-col gap-2">
              <h3 className="font-display font-bold text-lg text-white">{item.title}</h3>
              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* 04 — SOLUTION */
const SlideSolution = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-white text-neutral-950 relative">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>The Solution</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-neutral-900 tracking-tighter leading-tight mt-2">
          OwnMyLand makes ownership<br /><span className="text-primary italic">frictionless, trusted, and collective.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {[
          {
            icon: <Scale size={20} />,
            title: 'Registered UDS Deeds',
            desc: 'Multiple co-owners (<200 per parcel) hold fully compliant Undivided Share deeds. Absolute government-issued legal titles.'
          },
          {
            icon: <ShieldCheck size={20} />,
            title: 'Encrypted Doc VAULT',
            desc: 'Bank-grade AES-256 secure legal document repository per investor with tamper-proof hashing safeguards.'
          },
          {
            icon: <Clock size={20} />,
            title: 'SLA-Tracked Mutation',
            desc: 'Real-time 9-stage mutation tracking (M1–M9) guarantees administrative records updates in 60 days on contract.'
          },
          {
            icon: <Users size={20} />,
            title: 'Squad-Buying System',
            desc: 'Join or create co-buying squads with friends and family using shared join-codes to unlock viral group discounts.'
          }
        ].map((item) => (
          <motion.div key={item.title} variants={fadeUp}
            className="flex flex-col gap-4 p-5 bg-surface border border-neutral-150 rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display font-bold text-base text-neutral-900">{item.title}</h3>
              <p className="text-[11px] md:text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* 05 — MARKET OPPORTUNITY */
const SlideMarketIndia = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-neutral-950 text-white relative">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(26,107,90,0.18),transparent_60%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Market Opportunity</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tighter leading-tight mt-2">
          An $8.9 Billion addressable<br /><span className="text-accent italic">land fractionalisation wave.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {[
          {
            tier: 'TAM',
            val: '$780 Billion+',
            label: 'India Real Estate (2025)',
            desc: 'The total real estate sector in India, poised to cross $1 Trillion by 2030, representing the bulk of household wealth pools.',
            border: 'border-white/10',
            bg: 'bg-white/[0.02]'
          },
          {
            tier: 'SAM',
            val: '$8.9 Billion',
            label: 'Fractional land market potential',
            desc: 'Private plots and agricultural/commercial land pools fit for registered co-ownership (UDS), currently locked in offline channels.',
            border: 'border-accent/25',
            bg: 'bg-primary-dark/30'
          },
          {
            tier: 'SOM',
            val: '$89 Million',
            label: 'Year 5 Obtianable Target (1% SAM)',
            desc: 'Equivalent to ₹740 Cr GMV, corresponding to ~740 acres under management with ~24,420 registered on-platform transacting users.',
            border: 'border-accent/60',
            bg: 'bg-white/[0.04]'
          }
        ].map((item) => (
          <motion.div key={item.tier} variants={fadeUp}
            className={`flex flex-col gap-4 p-6 border ${item.border} rounded-2xl ${item.bg}`}>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D4AA]">{item.tier}</span>
              <div className="text-2xl md:text-3xl font-display font-black text-white mt-1">{item.val}</div>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-white/5 pt-3">
              <h4 className="text-white font-bold text-xs font-mono tracking-wide">{item.label}</h4>
              <p className="text-[11px] md:text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* 06 — TARGET AUDIENCE */
const SlideAudience = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-white text-neutral-950 relative">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Target Audience</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-neutral-900 tracking-tighter leading-tight mt-2">
          Meeting high-intent, latent demand<br /><span className="text-primary italic">across domestic & global cohorts.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <motion.div variants={fadeUp} className="flex flex-col gap-4 p-6 border border-neutral-150 rounded-2xl bg-surface hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/15 text-primary rounded-xl flex items-center justify-center shrink-0">
              <Building2 size={20} />
            </div>
            <div>
              <div className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest">Cohort 01</div>
              <h3 className="font-display font-bold text-lg text-neutral-900">Domestic Middle Class</h3>
            </div>
          </div>
          <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">
            <strong>Profile:</strong> ₹8L–₹25L annual household income, 28–50 year olds in Tier 1 & 2 cities.
            <br /><br />
            <strong>Pain Points:</strong> Desires land for stability but blocked by high ticket size and fear of broker deception.
            <br /><br />
            <strong>OwnMyLand Value:</strong> Starting at ₹3L, the program offers fully legal, Aadhaar OTP registration of titles securely from the couch.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-4 p-6 border border-neutral-150 rounded-2xl bg-surface hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/15 text-primary rounded-xl flex items-center justify-center shrink-0">
              <Globe size={20} />
            </div>
            <div>
              <div className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest">Cohort 02</div>
              <h3 className="font-display font-bold text-lg text-neutral-900">The NRI Diaspora</h3>
            </div>
          </div>
          <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">
            <strong>Profile:</strong> Indian-origin professionals in UAE, Singapore, UK, USA ($50K–$200K+ income).
            <br /><br />
            <strong>Pain Points:</strong> Blocked by distance, lack of sub-registrar accessibility, and dependency on local family members.
            <br /><br />
            <strong>OwnMyLand Value:</strong> Cross-border rails allow instant co-owner voting on property decisions, AES-256 secure land vault, completely eliminating remote friction.
          </p>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

/* 07 — BUSINESS MODEL */
const SlideModel = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-neutral-950 text-white relative">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(26,107,90,0.2),transparent_60%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Business Model</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter leading-tight mt-2">
          Three robust revenue streams.<br /><span className="text-accent italic">Cash-flow positive from Day 0.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: <CreditCard size={18} />, value: '2%', label: 'Platform Fee', desc: 'Secure unified reservation upfront fee covering complete legal onboarding and SLA registered UDS deed delivery.' },
          { icon: <Building2 size={18} />, value: '10%', label: 'Rental Management', desc: 'Charged on monthly land rental receipts collected and digitally distributed back to property co-owners dynamically.' },
          { icon: <BarChart3 size={18} />, value: '2%', label: 'B2B Listing Fee', desc: 'Charged to developers and landowners to feature vetted properties. Replaces 5% broker commission, saving sellers up to 60%.' },
        ].map((item, i) => (
          <motion.div key={i} variants={fadeUp}
            className="flex flex-col gap-3 p-5 border border-white/10 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] hover:border-accent/40 transition-all group">
            <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-primary-dark transition-all">
              {item.icon}
            </div>
            <div className="text-xl md:text-2xl font-display font-black text-white leading-none">{item.value}</div>
            <div>
              <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-accent">{item.label}</div>
              <div className="text-[11px] text-neutral-500 mt-2 leading-snug">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 border border-white/5 rounded-xl bg-white/[0.01]">
        {[
          { val: '1,000', lbl: 'Year 1 Users' },
          { val: '₹30 Cr', lbl: 'Year 1 Target GMV' },
          { val: '₹60 Lakhs', lbl: 'Yr 1 Platform Fee Rev' },
          { val: '₹60 Lakhs', lbl: 'Yr 1 B2B Listing Rev' },
        ].map(col => (
          <div key={col.lbl} className="text-center">
            <div className="text-lg md:text-xl font-display font-bold text-accent">{col.val}</div>
            <div className="text-[9px] text-neutral-500 font-mono uppercase mt-0.5">{col.lbl}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

/* 08 — GTM */
const SlideGTM = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-white text-neutral-950 relative">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Go-to-Market</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-950 tracking-tighter leading-tight mt-2">
          Co-buying squads.<br /><span className="text-primary italic">Viral organic acquisition.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <motion.div variants={fadeUp} className="flex flex-col gap-4 p-6 border-2 border-primary/20 rounded-2xl bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0"><Users size={20} /></div>
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">Flywheel 01</div>
              <h3 className="font-display font-bold text-lg md:text-xl text-neutral-900">Co-Buying Squad Mechanic</h3>
            </div>
          </div>
          <p className="text-neutral-600 leading-relaxed text-xs md:text-sm">
            Investors form squad groups targeting the same land parcel. When the target fills, every member receives a group discount. Shared join-codes drive viral, low-CAC organic acquisition — users pull friends and family into their private squads to lock in the absolute lowest entry margins.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Squad Group Buys', 'Join-Code System', 'Capped <200 Co-owners', 'Viral Flywheel'].map(t => (
              <span key={t} className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-mono font-bold uppercase tracking-wider rounded-full">{t}</span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-4 p-6 bg-neutral-900 border border-neutral-800 text-white rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 text-accent rounded-xl flex items-center justify-center shrink-0"><Clock size={20} /></div>
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">Flywheel 02</div>
              <h3 className="font-display font-bold text-lg md:text-xl text-white">SLA Fulfillment Engine</h3>
            </div>
          </div>
          <p className="text-neutral-400 leading-relaxed text-xs md:text-sm">
            Zero paper friction. Deeds are signed via Aadhaar OTP digital signature, legally binding under the Information Technology Act. We replace opaque processing delays with a strict real-time tracker, giving Indian investors absolute trust and peace of mind.
          </p>
          <div className="flex flex-wrap gap-2">
            {['SLA Pipeline', 'Aadhaar e-Sign', 'Real-Time Trackers', 'Zero-Broker friction'].map(t => (
              <span key={t} className="px-3 py-1 bg-white/10 text-white/70 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

/* 09 — PRODUCT SHOWCASE */
const SlideProduct = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-surface">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Product Showcase</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-950 tracking-tighter leading-tight mt-2">
          An ownership OS for land.<br /><span className="text-primary italic">Operationally complete & tracked.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: <Shield size={16} />, title: 'AES-256 Vault', desc: 'Secure legal repository per investor per property' },
          { icon: <Clock size={16} />, title: 'R1 Onboarding SLA', desc: '8-stage pipeline, deed delivery in 25 days on contract' },
          { icon: <GitMerge size={16} />, title: 'R2 Mutation Tracker', desc: '9-stage government mutation tracking (M1-M9)' },
          { icon: <Vote size={16} />, title: 'On-Platform Voting', desc: '51% minor / 70% major legal decision voting scales' },
          { icon: <BarChart3 size={16} />, title: 'Wealth Simulator', desc: 'Real-time IRR comparison of land vs FD, Gold, and Nifty' },
          { icon: <FileText size={16} />, title: 'Auto Doc Gen', desc: 'Sale deeds generated via Aadhaar OTP signatures' },
          { icon: <Users size={16} />, title: 'Co-Owner Chat', desc: 'Property-scoped chat channel for verified owners' },
          { icon: <Globe size={16} />, title: 'Diverse Unit Support', desc: 'Natively supports Sq Yd, Sq Ft, Cent, Guntha, Acre' },
        ].map((feat, i) => (
          <motion.div key={i} variants={fadeUp}
            className="flex flex-col gap-3 p-4 bg-white border border-neutral-150 rounded-xl hover:border-primary/25 hover:shadow-lg transition-all group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0">
              {feat.icon}
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900 group-hover:text-primary transition-colors leading-tight">{feat.title}</div>
              <div className="text-[10px] text-neutral-400 mt-1 leading-snug">{feat.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="flex justify-center mt-6">
        <Link to="/portfolio/ownmyland#demo"
          className="flex items-center gap-2 bg-primary text-white border border-transparent px-6 py-2.5 rounded-sm font-bold hover:brightness-110 transition-all text-xs">
          <Play size={14} className="fill-white" /> Watch Product Demo Video
        </Link>
      </motion.div>
    </div>
  </motion.div>
);

/* 10 — MOAT */
const SlideMoat = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-neutral-950 text-white relative animate-fade-in">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,107,90,0.15),transparent_70%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Defensive Moat</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tighter leading-tight mt-2">
          Interlocking advantages that<br /><span className="text-accent italic">cannot be copied by code alone.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <motion.div variants={fadeUp} className="flex flex-col gap-4 p-6 border border-white/10 rounded-2xl bg-white/[0.03]">
          <span className="text-2xl font-display font-bold text-accent">01. R1/R2 Fulfillment Pipeline</span>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            OwnMyLand operates a complete 8-stage post-booking onboarding pipeline (Day 25 deed delivery) and an M1-M9 government mutation tracker (Day 60 mutation). Every stage is backed by legal SLAs. Replicating this requires relationships with state sub-registrars, hiring, and sustained field execution culture.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-4 p-6 border border-white/10 rounded-2xl bg-white/[0.03]">
          <span className="text-2xl font-display font-bold text-accent">02. Encrypted Document Vault (VAULT)</span>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            Our bank-grade, AES-256 compliant digital vault delivers secure deeds, RERA filings, and KYC structures scoped per investor per property. Permanent storage turns deeds into high switching costs: once legal titles reside in the VAULT, migrating properties is operationally prohibitive.
          </p>
        </motion.div>
      </div>

      <motion.div variants={fadeIn} className="flex flex-wrap gap-4 items-center p-3 border border-white/10 rounded-xl bg-white/[0.01]">
        {['Secure Legal UDS Framework', '51%/70% Voting Consensus', 'Regional Land Unit converting engine', 'Immutable Admin Audit Trails', 'SLA operational culture'].map((tag) => (
          <span key={tag} className="text-[10px] font-mono text-neutral-400">✓ {tag}</span>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

/* 11 — TEAM */
const SlideTeam = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-neutral-950 text-white relative">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,74,61,0.18),transparent_70%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>The Team</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter leading-tight mt-2">
          Built by people who<br /><span className="text-accent italic font-semibold">lived the problem.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-2">
        <motion.div variants={fadeUp} className="flex flex-col gap-5 p-6 md:p-8 border border-white/10 rounded-2xl bg-white/[0.04]">
          <div className="w-16 h-16 rounded-2xl bg-neutral-800 overflow-hidden shrink-0 border border-white/10 relative group/img shadow-lg">
            <img 
              src="https://lh3.googleusercontent.com/d/1q2uYqrtvrfSbTMcPkhdF_OSZw30NgGhF" 
              alt="Dr. Uday Kiran Lingipalli" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-lg md:text-xl font-display font-bold text-white">Dr. Uday Kiran Lingipalli</div>
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-bold">Founder & CEO</div>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            Medical entrepreneur who turned to proptech infrastructure after witnessing property fraud. Spent 5 months mapping Indian land legislation changes, UDS legal requirements, and municipal mutation loops. Combines clinical-precision thinking with execution.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Regulatory Architecture', 'Product Vision', 'Operational Execution'].map(t => (
              <span key={t} className="px-2 py-1 bg-white/10 text-white/60 text-[9px] font-mono rounded-full">{t}</span>
            ))}
          </div>
          <div className="text-xs md:text-sm text-accent font-mono">udaylingipalli@ownmyland.co</div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-5 p-6 md:p-8 border border-accent/20 rounded-2xl bg-white/[0.04]">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 overflow-hidden flex items-center justify-center shrink-0 border border-white/10 relative group/img shadow-lg">
            <img 
              src="https://lh3.googleusercontent.com/d/1RtLGWgHOFs1QjaLj18R809EfEprMB9OJ" 
              alt="Vishal D. Mehta" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-lg md:text-xl font-display font-bold text-white">Vishal D. Mehta</div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#00D4AA] font-bold">Chief Financial Officer</div>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            Financial engineer bringing institutional discipline and modeling rigour to OwnMyLand's capital frameworks. Oversees unit economics, SPV trust systems, and tokenization compliance structures that make the fractional land framework structurally robust.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Financial Modeling', 'Unit Economics', 'Investor Relations'].map(t => (
              <span key={t} className="px-2 py-1 bg-white/10 text-white/60 text-[9px] font-mono rounded-full">{t}</span>
            ))}
          </div>
          <div className="text-xs md:text-sm text-accent font-mono">team@ownmyland.co</div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

/* 12 — THE ASK */
const SlideAsk = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="relative flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-primary text-white overflow-hidden">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,212,170,0.18),transparent_60%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(0,0,0,0.3),transparent_50%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>The Ask</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter leading-tight mt-2 animate-fade-in">
          Join the co-ownership<br /><span className="text-accent italic">operating system.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: 'Pre-Seed Solicitation', value: '₹75L – 1.5 Cr', sub: 'Round size targeting launch scale' },
          { label: 'Post-Money Valuation', value: '₹18–20 Cr', sub: 'Calculated pre-seed benchmark' },
          { label: 'Runway Guarantee', value: '18 Months', sub: 'Fully mapped operational runway' },
        ].map((item) => (
          <motion.div key={item.label} variants={fadeUp}
            className="flex flex-col gap-2 p-6 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/70 font-bold">{item.label}</div>
            <div className="text-2xl md:text-3xl font-display font-black text-white leading-tight">{item.value}</div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-accent/80">{item.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} className="flex flex-col gap-4 p-6 bg-white/[0.08] border border-white/15 rounded-2xl">
          <div className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">Use of Funds</div>
          {[
            ['40%', 'Product Engineering & Scaling Dev Pipelines'],
            ['30%', 'Legal Retainers & SLA Regulatory Pipeline Build'],
            ['20%', 'B2C Marketing & Viral Squad Acquisition (CAC Opt)'],
            ['10%', 'Operations, HQ Team Setup & Municipal Liaison'],
          ].map(([pct, label]) => (
            <div key={pct} className="flex items-center gap-4">
              <span className="text-accent font-black font-mono text-xs w-10 shrink-0">{pct}</span>
              <div className="flex-1 bg-white/10 rounded-full h-1">
                <div className="bg-accent h-1 rounded-full" style={{ width: pct }} />
              </div>
              <span className="text-white/60 text-[11px] leading-snug max-w-[200px]">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-4 p-6 bg-white/[0.08] border border-white/15 rounded-2xl">
          <div className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">Why Now</div>
          {[
            'Registration Bill 2025 – Digital mutation, smart-deed verification standardising nationwide.',
            'Massive untapped demand – Middle class locked out of land by sizing; OwnMyLand secures starting ticket to ₹3L.',
            'Viral squad buying – Referral pipelines with join-codes optimize marketing spend & CAC.',
            'Highly specialized team – Built with clinical precision, regulatory expertise, and SLA focus.',
          ].map((point, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              <p className="text-xs md:text-sm text-white/70 leading-snug">{point}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
        <a href="mailto:udaylingipalli@ownmyland.co"
          className="flex items-center gap-3 bg-accent text-primary-dark px-6 py-3 rounded-sm font-bold hover:-translate-y-0.5 hover:shadow-xl transition-all text-sm">
          <Mail size={16} /> Request Pitch Book
        </a>
        <Link to="/investors"
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-sm font-bold hover:bg-white/20 transition-all text-sm">
          Investor Portal <ArrowUpRight size={16} />
        </Link>
        <Link to="/portfolio/ownmyland#demo"
          className="flex items-center gap-3 bg-primary text-white border border-transparent px-6 py-3 rounded-sm font-bold hover:brightness-110 transition-all text-sm">
          <Play size={16} className="fill-white" /> Watch Product Demo
        </Link>
      </motion.div>
    </div>

    {/* Watermark in CSS style */}
    <div className="absolute right-0 bottom-0 text-[12rem] md:text-[22rem] font-black text-white/[0.018] font-display select-none pointer-events-none leading-none tracking-tighter">
      OwnMyLand
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════
   SLIDE MAP
═══════════════════════════════════════════════════ */
const SLIDE_COMPONENTS: Record<string, React.FC> = {
  cover:          SlideCover,
  thesis:         SlideThesis,
  problem:        SlideProblem,
  solution:       SlideSolution,
  'market-india':   SlideMarketIndia,
  audience:       SlideAudience,
  model:          SlideModel,
  gtm:            SlideGTM,
  product:        SlideProduct,
  moat:           SlideMoat,
  team:           SlideTeam,
  ask:            SlideAsk,
};

/* ═══════════════════════════════════════════════════
   RESPONSIVE SCALE WRAPPER
   Ensures the pitch deck scales beautifully to fit the screen size,
   especially within preview frames or varying desktop displays.
═══════════════════════════════════════════════════ */
const ScaleToFitContainer = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const mobile = width < 768; // standard md breakpoint
      setIsMobile(mobile);

      if (mobile) {
        setScale(1);
        return;
      }

      // Base design size: 1200 x 700
      const designW = 1200;
      const designH = 700;

      const scaleX = width / designW;
      const scaleY = height / designH;
      const newScale = Math.min(scaleX, scaleY, 1.15); // cap max scale to 1.15
      setScale(newScale);
    };

    const observer = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    handleResize();

    return () => {
      observer.disconnect();
    };
  }, []);

  if (isMobile) {
    return (
      <div className="w-full h-full overflow-y-auto bg-neutral-950">
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-neutral-950 overflow-hidden relative p-4">
      <div
        style={{
          width: 1200,
          height: 700,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="shrink-0 relative overflow-hidden shadow-2xl rounded-xl border border-white/5 bg-neutral-950"
      >
        <div className="absolute inset-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
const OwnmylandPitchDeck = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [navOpen, setNavOpen] = useState(false);
  const touchStart = useRef<number | null>(null);

  const total = SLIDES.length;

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= total) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setNavOpen(false);
  }, [current, total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev();
      if (e.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (delta > 50) next();
    if (delta < -50) prev();
    touchStart.current = null;
  };

  const slide = SLIDES[current];
  const SlideComponent = SLIDE_COMPONENTS[slide.id];
  const progress = ((current + 1) / total) * 100;

  return (
    <div
      className="fixed inset-0 flex flex-col bg-neutral-950 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Top Chrome ─────────────────────────────────── */}
      <div className="relative z-50 flex items-center justify-between px-5 md:px-8 h-12 bg-neutral-950/90 backdrop-blur-sm border-b border-white/5 shrink-0">
        {/* Left: back + brand */}
        <div className="flex items-center gap-5">
          <Link to="/investors" className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
            <ChevronLeft size={14} /> Investors
          </Link>
          <div className="hidden sm:flex items-center gap-2 pl-5 border-l border-white/10">
            <OwnMyLandLogoIcon className="w-4 h-4 text-accent text-[8px] rounded" />
            <span className="text-white/60 text-xs font-mono font-bold tracking-wider">OwnMyLand Pitch Deck</span>
          </div>
        </div>

        {/* Center: progress */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-600">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <div className="w-32 h-px bg-white/10 relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">{slide.label}</span>
        </div>

        {/* Right: nav toggle + arrows */}
        <div className="flex items-center gap-3">
          <button onClick={() => setNavOpen(v => !v)}
            className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
            {navOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          <div className="flex items-center gap-1 border border-white/10 rounded-sm overflow-hidden">
            <button onClick={prev} disabled={current === 0}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors border-r border-white/10">
              <ChevronLeft size={14} />
            </button>
            <button onClick={next} disabled={current === total - 1}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Progress bar ───────────────────────────────── */}
      <div className="h-0.5 bg-white/5 shrink-0 relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* ── Slide nav overlay ──────────────────────────── */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-12 bottom-0 z-40 w-64 bg-neutral-950/95 backdrop-blur-xl border-l border-white/10 flex flex-col p-6 gap-2 overflow-y-auto"
          >
            <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-600 mb-4">Slides</div>
            {SLIDES.map((s, i) => (
              <button key={s.id} onClick={() => goTo(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  i === current
                    ? 'bg-primary text-white'
                    : 'text-neutral-500 hover:text-white hover:bg-white/5'
                }`}>
                <span className="text-[10px] font-mono w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm font-medium">{s.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Slide Content ──────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 overflow-hidden bg-neutral-950"
          >
            <ScaleToFitContainer>
              <SlideComponent />
            </ScaleToFitContainer>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom Dot Nav ─────────────────────────────── */}
      <div className="relative z-50 flex items-center justify-center gap-2 py-3 shrink-0 bg-neutral-950/80 border-t border-white/5">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-1.5 bg-accent'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* ── Keyboard hint ─────────────────────────────── */}
      <div className="absolute bottom-10 right-5 hidden lg:flex items-center gap-2 text-neutral-700 text-[9px] font-mono uppercase tracking-widest pointer-events-none">
        <kbd className="px-1.5 py-0.5 border border-neutral-700 rounded text-[9px]">←</kbd>
        <kbd className="px-1.5 py-0.5 border border-neutral-700 rounded text-[9px]">→</kbd>
        navigate
      </div>
    </div>
  );
};

export default OwnmylandPitchDeck;
