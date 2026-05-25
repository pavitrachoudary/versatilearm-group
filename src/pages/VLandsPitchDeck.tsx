import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight,
  Globe, ShieldCheck, Zap, Users, TrendingUp, BarChart3,
  Layers, Scale, Lock, Mail, CreditCard, Building2,
  GitMerge, Landmark, Cpu, Terminal, CircleDot, Menu, X, Play
} from 'lucide-react';
import { VLandsLogo } from '../components/VLandsLogo';

/* ─────────────────────────────────────────────────────
   SLIDE REGISTRY
───────────────────────────────────────────────────── */
const SLIDES = [
  { id: 'cover',    label: 'Cover' },
  { id: 'thesis',   label: 'The Thesis' },
  { id: 'problem',  label: 'The Problem' },
  { id: 'solution', label: 'The Solution' },
  { id: 'market-india',  label: 'India Market' },
  { id: 'market-global', label: 'Global Market' },
  { id: 'audience', label: 'Target Audience' },
  { id: 'model',    label: 'Business Model' },
  { id: 'gtm',      label: 'Go-to-Market' },
  { id: 'product',  label: 'Product' },
  { id: 'team',     label: 'Team' },
  { id: 'ask',      label: 'The Ask' },
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

const Tag = ({ children, light }: { children: React.ReactNode; light?: boolean; key?: string }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest ${
    light ? 'bg-white/10 text-white/70' : 'bg-accent/20 text-accent'
  }`}>
    {children}
  </span>
);

/* ═══════════════════════════════════════════════════
   SLIDE COMPONENTS
═══════════════════════════════════════════════════ */

/* 01 — COVER */
const SlideCover = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="relative flex flex-col justify-between min-h-full w-full px-6 py-12 md:p-16 lg:p-20 overflow-hidden bg-neutral-950">

    {/* Deep green radial glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(26,107,90,0.4),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(0,212,170,0.08),transparent_50%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-between relative z-10 gap-8 md:gap-12">
      {/* Top bar */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <VLandsLogo className="w-7 h-7 text-accent" />
          <span className="font-display font-bold text-white text-lg tracking-tight">VLands</span>
        </div>
        <Tag light>Pre-Seed · 2026</Tag>
      </motion.div>

      {/* Hero */}
      <div className="flex flex-col gap-6 md:gap-8">
        <motion.div variants={fadeUp}>
          <SlideLabel>Investment Deck</SlideLabel>
          <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-display font-bold text-white leading-[0.9] tracking-tighter mt-2">
            V<span className="text-accent">Lands</span>
          </h1>
          <p className="text-lg md:text-2xl text-neutral-400 font-display italic mt-4 max-w-2xl leading-snug">
            India's Fractional Land Protocol — Democratising ₹87 Trillion of Dormant Wealth.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-4">
          {['PropTech', 'RegTech', 'FinTech', 'Blockchain'].map(t => <Tag key={t}>{t}</Tag>)}
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div variants={fadeIn} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-8 border-t border-white/10 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">Founder</span>
          <span className="text-white font-bold">Dr. Uday Kiran Lingipalli</span>
        </div>
        <div className="flex flex-col gap-1 md:text-right">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">Contact</span>
          <span className="text-accent font-mono text-sm">udaylingipalli@vlands.app</span>
        </div>
      </motion.div>
    </div>

    {/* Watermark */}
    <div className="absolute right-0 bottom-0 text-[14rem] md:text-[26rem] font-black text-white/[0.018] font-display select-none pointer-events-none leading-none tracking-tighter">₹87T</div>
  </motion.div>
);

/* 02 — THESIS */
const SlideThesis = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-white">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 md:gap-12 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>The Thesis</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-950 tracking-tighter leading-[0.95] mt-2">
          The Amazon<br /><span className="text-primary italic">of Land.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
            VLands is a global marketplace that makes real estate ownership as simple and liquid as buying a product online. By digitising the entire chain — from due diligence to documentation to mutation — anyone can buy, sell, and earn from land starting from <strong className="text-neutral-900">just 3 SQ.YD</strong>.
          </p>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
            Our platform eliminates manual processes, providing a secure, transparent ecosystem where global investors can acquire fractional ownership <strong className="text-neutral-900">in five clicks, digitally</strong>.
          </p>
          <blockquote className="border-l-4 border-primary pl-6 text-lg md:text-xl font-display italic text-neutral-800 leading-snug">
            "Land ownership should be a fundamental right, not a luxury — and we are building the infrastructure to make that a reality."
          </blockquote>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          {[
            { icon: <Zap size={18} />, label: 'Zero Friction', desc: 'Developer in Dubai or landowner in Pune — anyone lists assets for a global audience to buy in 5 clicks.' },
            { icon: <Layers size={18} />, label: 'Fractional Infrastructure', desc: 'Legal and tech rails (UDS) that transform land into a high-yield, liquid commodity. Real title. Real ownership.' },
            { icon: <TrendingUp size={18} />, label: 'Instant Exit', desc: 'Secondary market infrastructure ensures land is no longer entry-only — it is a tradable asset for all.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-surface border border-neutral-100 rounded-2xl group hover:border-primary/20 transition-all">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-sm text-neutral-900 mb-1">{item.label}</div>
                <div className="text-xs md:text-sm text-neutral-500 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </motion.div>
);

/* 03 — PROBLEM */
const SlideProblem = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-neutral-950 text-white relative">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(26,107,90,0.15),transparent_60%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>The Problem</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter leading-[0.95] mt-2">
          India's land market is<br /><span className="text-accent italic">broken by design.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            num: '01',
            label: 'Supply Barriers',
            color: 'border-red-500/30',
            accent: 'text-red-400',
            items: ['Capital stagnation — assets locked, no liquidity mechanism', 'Costly 5% broker commissions eating developer margins', 'Compliance complexity blocking legitimate listings']
          },
          {
            num: '02',
            label: 'Demand Barriers',
            color: 'border-amber-500/30',
            accent: 'text-amber-400',
            items: ['High entry costs locking out 90% of the middle class', 'Geographic blindness — investors cannot access remote markets', '"Black box" — no transparency on title, valuation, or legal status']
          },
          {
            num: '03',
            label: 'Infrastructure Deadlocks',
            color: 'border-accent/30',
            accent: 'text-accent',
            items: ['The Liquidity Trap — no functional secondary market for land', 'Registry deadlocks — mutation takes 9–18 months nationally', 'The Trust Gap — fraud, encumbrance, and forged titles endemic']
          },
        ].map((col) => (
          <motion.div key={col.num} variants={fadeUp}
            className={`flex flex-col gap-5 p-6 border ${col.color} rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-all`}>
            <div className="flex items-center justify-between">
              <span className={`text-3xl font-display font-black ${col.accent} leading-none`}>{col.num}</span>
              <Tag>{col.label}</Tag>
            </div>
            <div className="flex flex-col gap-3">
              {col.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 ${col.accent} bg-current shrink-0`} />
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="p-5 border border-white/10 rounded-2xl bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
        <div className="text-3xl md:text-4xl font-display font-black text-accent">₹87T</div>
        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
          India's total land wealth — <strong className="text-white">trapped in opacity, fragmentation, and manual processes</strong> since the Registration Act of 1908. Zero institutional liquidity mechanism exists today.
        </p>
      </motion.div>
    </div>
  </motion.div>
);

/* 04 — SOLUTION */
const SlideSolution = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-white">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 md:gap-12 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>The Solution</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-950 tracking-tighter leading-tight mt-2">
          One platform. Three<br /><span className="text-primary italic">infrastructure layers.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            num: '1',
            title: 'For the Investor',
            sub: 'Democratising Wealth',
            icon: <Users size={20} />,
            bg: 'bg-surface',
            items: [
              'Entry from just 3 SQ.YD — middle class enters stable 8–12% land yields',
              '5-Click Global Access — invest in Andhra Pradesh or Dubai from anywhere',
              'Zero-Fraud Guarantee — every listing is RERA-cleared, mutation-complete',
            ]
          },
          {
            num: '2',
            title: 'For the Developer',
            sub: 'Instant Liquidity',
            icon: <Building2 size={20} />,
            bg: 'bg-neutral-900 text-white',
            items: [
              'Exit in Days, Not Years — access to 1M+ global retail buyers instantly',
              'Cost Efficiency — flat 2% platform fee vs. 5% broker commission',
              'Managed Compliance — UDS documentation and micro-investor management handled',
            ]
          },
          {
            num: '3',
            title: 'The Infrastructure',
            sub: 'A Global Trade Rail',
            icon: <GitMerge size={20} />,
            bg: 'bg-primary text-white',
            items: [
              'Master Title — direct UDS registration tracked via mutation for instant resale',
              'Automated Fulfillment — digital certificates with land record updates in 30–45 days',
              'Cross-Border Compliance — unified legal rail for international listings (SPV + LRS)',
            ]
          }
        ].map((card) => (
          <motion.div key={card.num} variants={fadeUp}
            className={`flex flex-col gap-6 p-6 md:p-8 rounded-2xl border border-neutral-100 ${card.bg}`}>
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                card.num === '1' ? 'bg-primary/10 text-primary' : 'bg-white/15 text-white'
              }`}>
                {card.icon}
              </div>
              <span className={`text-[2.5rem] md:text-5xl font-display font-black leading-none ${
                card.num === '1' ? 'text-neutral-100' : 'text-white/20'
              }`}>{card.num}</span>
            </div>
            <div>
              <div className={`text-xs font-mono uppercase tracking-widest mb-1 ${
                card.num === '1' ? 'text-primary' : 'text-accent'
              }`}>{card.sub}</div>
              <h3 className={`text-lg md:text-xl font-display font-bold ${
                card.num === '1' ? 'text-neutral-900' : 'text-white'
              }`}>{card.title}</h3>
            </div>
            <div className="flex flex-col gap-3">
              {card.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                    card.num === '1' ? 'bg-primary' : 'bg-accent'
                  }`} />
                  <p className={`text-xs md:text-sm leading-relaxed ${
                    card.num === '1' ? 'text-neutral-600' : 'text-white/70'
                  }`}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* 05 — MARKET INDIA */
const SlideMarketIndia = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-surface">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Market Opportunity · India</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-950 tracking-tighter leading-tight mt-2">
          India: A<br /><span className="text-primary italic">$780 Billion</span> Opening.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: 'TAM',
            full: 'Total Addressable Market',
            value: '$780B',
            sub: '→ $1T by 2030',
            desc: 'India\'s entire real estate sector — residential, commercial, and land assets. Projected to reach $1 Trillion by 2030.',
            width: 'w-full',
            color: 'bg-primary',
            textColor: 'text-primary'
          },
          {
            label: 'SAM',
            full: 'Serviceable Addressable Market',
            value: '$8.9B',
            sub: 'Fractional segment',
            desc: 'The fractional ownership segment covering commercial, private, and agricultural properties eligible for tokenisation and retail investment.',
            width: 'w-2/3',
            color: 'bg-primary/60',
            textColor: 'text-primary'
          },
          {
            label: 'SOM',
            full: 'Serviceable Obtainable Market',
            value: '$890M',
            sub: 'Year 3 target',
            desc: '10% of the fractional segment by Year 3 — 700 acres under management with 1,000,000 registered users.',
            width: 'w-1/3',
            color: 'bg-accent',
            textColor: 'text-accent'
          },
        ].map((tier) => (
          <motion.div key={tier.label} variants={fadeUp}
            className="flex flex-col gap-4 p-6 md:p-8 bg-white border border-neutral-100 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono font-bold uppercase tracking-widest ${tier.textColor}`}>{tier.label}</span>
              <span className="text-[9px] font-mono uppercase text-neutral-400 tracking-wider">{tier.full}</span>
            </div>
            <div className={`text-3xl md:text-5xl font-display font-black tracking-tighter ${tier.textColor}`}>
              {tier.value}
            </div>
            <div className={`text-[10px] font-bold font-mono uppercase tracking-widest ${tier.textColor} opacity-60`}>
              {tier.sub}
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-1.5">
              <div className={`h-1.5 rounded-full ${tier.color} ${tier.width} transition-all duration-1000`} />
            </div>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">{tier.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeIn} className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
        <p className="text-xs md:text-sm text-neutral-500">Clients: Indians and NRI diaspora · Middle class to HNIs · All eligible for fractional entry from ₹3 Lakh</p>
      </motion.div>
    </div>
  </motion.div>
);

/* 06 — MARKET GLOBAL */
const SlideMarketGlobal = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-neutral-950 text-white relative">

    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_20%,rgba(0,212,170,0.1),transparent)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Market Opportunity · Global</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter leading-tight mt-2">
          Global: The<br /><span className="text-accent italic">$393 Trillion</span> Horizon.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: 'TAM',
            value: '$393T',
            sub: '→ $500T by 2030',
            desc: 'Global real estate sector — encompassing all land, residential, and commercial asset classes worldwide.',
            border: 'border-white/20'
          },
          {
            label: 'SAM',
            value: '$2.4T',
            sub: 'Fractional segment',
            desc: 'Global fractional ownership segment — commercial, private, and agricultural properties eligible for tokenisation across multi-country expansion.',
            border: 'border-accent/30'
          },
          {
            label: 'SOM',
            value: '$450B',
            sub: 'Year 5 target',
            desc: '10% of fractional segment by Year 5 through multi-country expansion — India, Dubai, and Southeast Asia corridors.',
            border: 'border-accent'
          },
        ].map((tier) => (
          <motion.div key={tier.label} variants={fadeUp}
            className={`flex flex-col gap-5 p-6 md:p-8 border ${tier.border} rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-all`}>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">{tier.label}</span>
            <div className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter">{tier.value}</div>
            <div className="text-[10px] font-bold font-mono uppercase tracking-widest text-white/30">{tier.sub}</div>
            <p className="text-xs md:text-sm text-neutral-500 leading-relaxed">{tier.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeIn} className="grid grid-cols-3 gap-0 border border-white/10 rounded-xl overflow-hidden bg-white/[0.01]">
        {[
          { v: '$393T', l: 'Global Real Estate' },
          { v: '$3T', l: 'Fractional Market Today' },
          { v: '$100B+', l: 'Obtainable in 5 Years' },
        ].map((s, i) => (
          <div key={i} className="flex flex-col gap-1 items-center py-4 border-r border-white/10 last:border-0">
            <div className="text-xl md:text-3xl font-display font-black text-accent">{s.v}</div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 text-center px-2">{s.l}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

/* 07 — AUDIENCE */
const SlideAudience = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-white">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Target Audience</SlideLabel>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-neutral-950 tracking-tighter leading-tight mt-2">
          Who we serve — and<br /><span className="text-primary italic">why they've waited.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} className="flex flex-col gap-5 p-6 md:p-8 bg-surface border border-neutral-100 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center"><Users size={20} /></div>
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">Primary Audience</div>
              <h3 className="font-bold text-neutral-900">Indians & NRI Diaspora</h3>
            </div>
          </div>
          <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
            Millions of Indians and NRIs who view land as the ultimate legacy but are deterred by high ticket sizes and legal risk. By offering fractional ownership from just 3 SQ.YD, we empower the middle class to build a secure, diversified land portfolio in their homeland — with zero paperwork anxiety.
          </p>
          <div className="flex flex-wrap gap-2">
            {['30M+ NRI Diaspora', 'Middle Class ₹5–50 LPA', 'HNI Portfolio Builders'].map(t => (
              <span key={t} className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-mono font-bold uppercase tracking-wider rounded-full">{t}</span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-5 p-6 md:p-8 bg-neutral-900 text-white rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 text-accent rounded-xl flex items-center justify-center"><Globe size={20} /></div>
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">Secondary Audience</div>
              <h3 className="font-bold text-white">International Investors</h3>
            </div>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            International investors seeking frictionless entry into high-yield, emerging land markets across India and Dubai. Through SPV shares and compliant legal structures, we transform land into a liquid, high-velocity digital asset accessible to anyone, anywhere.
          </p>
          <div className="flex flex-wrap gap-2">
            {['SPV Tokenisation', 'LRS Compliant', 'FEMA Structures'].map(t => (
              <span key={t} className="px-3 py-1 bg-accent/20 text-accent text-[9px] font-mono font-bold uppercase tracking-wider rounded-full">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="p-6 border-2 border-primary/20 rounded-2xl bg-primary/5 flex items-start gap-5">
        <div className="text-primary mt-1 shrink-0"><Landmark size={24} /></div>
        <p className="text-xs md:text-sm text-neutral-700 leading-relaxed">
          <strong>Market position:</strong> Whether a retail investor securing legacy with 3 SQ.YD or a global institutional player seeking high-yield liquidity — VLands has democratised land by fusing traditional title security with UDS transparency, transforming the world's most illiquid asset into a <strong>borderless, 5-click digital commodity</strong>.
        </p>
      </motion.div>
    </div>
  </motion.div>
);

/* 08 — BUSINESS MODEL */
const SlideModel = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-neutral-950 text-white relative">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(26,107,90,0.2),transparent_60%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Business Model</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter leading-tight mt-2">
          Six revenue<br /><span className="text-accent italic">streams. One platform.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { icon: <CreditCard size={18} />, value: '2%', label: 'Platform Fee', desc: 'On every buy and resale transaction' },
          { icon: <Building2 size={18} />, value: '10%', label: 'Rental Handling', desc: 'Income-yielding land rental management' },
          { icon: <BarChart3 size={18} />, value: '4%', label: 'B2B Listing Fee', desc: 'Developers listing inventory on platform' },
          { icon: <TrendingUp size={18} />, value: '0.15%', label: 'Facilitation Fee', desc: 'Per 1% NAV growth on all assets' },
          { icon: <Scale size={18} />, value: '0.05%', label: 'Seller Royalty', desc: 'Earned by sellers per 1% NAV growth forever' },
          { icon: <Terminal size={18} />, value: 'SaaS', label: 'Landowner Portal', desc: 'Usage-based credits for asset management' },
          { icon: <Landmark size={18} />, value: 'EMI', label: 'In-App Loans', desc: 'Lending against fractional land holdings' },
          { icon: <Globe size={18} />, value: 'Cross-Border', label: 'SPV Tokenisation', desc: 'International listings & LRS compliance' },
        ].map((item, i) => (
          <motion.div key={i} variants={fadeUp}
            className="flex flex-col gap-3 p-4 md:p-5 border border-white/10 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] hover:border-accent/40 transition-all group">
            <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-primary-dark transition-all">
              {item.icon}
            </div>
            <div className="text-xl md:text-2xl font-display font-black text-white leading-none">{item.value}</div>
            <div>
              <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-accent">{item.label}</div>
              <div className="text-[11px] text-neutral-500 mt-1 leading-snug">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* 09 — GTM */
const SlideGTM = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-white">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Go-to-Market Strategy</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-950 tracking-tighter leading-tight mt-2">
          Two vectors.<br /><span className="text-primary italic">One flywheel.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} className="flex flex-col gap-5 p-6 md:p-8 border-2 border-primary/20 rounded-2xl bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0"><Users size={20} /></div>
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">Vector 01</div>
              <h3 className="font-display font-bold text-lg md:text-xl text-neutral-900">The B2C Marketplace</h3>
            </div>
          </div>
          <p className="text-neutral-600 leading-relaxed text-xs md:text-sm">
            Rapid user acquisition by offering retail investors a "5-click" digital experience — making land ownership as simple as buying a consumer product. Our app-first experience removes every traditional barrier: no branch visits, no legal complexity, no paperwork.
          </p>
          <div className="flex flex-wrap gap-2">
            {['App-First UX', '5-Click Purchase', 'NRI-Ready', 'Regional Languages'].map(t => (
              <span key={t} className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-mono font-bold uppercase tracking-wider rounded-full">{t}</span>
            ))}
          </div>
          <div className="p-4 bg-white rounded-xl border border-neutral-200 flex items-center gap-4">
            <div className="text-xl md:text-2xl font-display font-black text-primary">1M+</div>
            <div className="text-xs text-neutral-500 leading-snug">Target registered users by Year 3, with 700 acres under management</div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-5 p-6 md:p-8 bg-neutral-900 text-white rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 text-accent rounded-xl flex items-center justify-center shrink-0"><Cpu size={20} /></div>
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">Vector 02</div>
              <h3 className="font-display font-bold text-lg md:text-xl text-white">The PaaS Infrastructure</h3>
            </div>
          </div>
          <p className="text-neutral-400 leading-relaxed text-xs md:text-sm">
            Once a developer or landowner is approved, VLands acts as the end-to-end operating system for the asset. We handle the entire back-office — RERA/UDS compliance, automated title mutation, and global financial orchestration. Sellers provide inventory. We provide the infrastructure to turn dead capital into a liquid, 5-click digital commodity.
          </p>
          <div className="flex flex-wrap gap-2">
            {['RERA Compliance', 'Auto Mutation', 'Financial Orchestration', 'White-label'].map(t => (
              <span key={t} className="px-3 py-1 bg-white/10 text-white/70 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={fadeIn} className="flex flex-wrap gap-4 items-center p-5 bg-surface border border-neutral-100 rounded-2xl">
        {[
          { label: 'Developer lists asset' },
          { label: 'VLands handles compliance' },
          { label: 'Retail investor buys fraction' },
          { label: 'Mutation automated (30–45d)' },
          { label: 'Secondary resale unlocked' },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-neutral-300 font-bold text-xs">→</span>}
            <span className="text-xs text-neutral-600 font-medium">{step.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

/* 10 — PRODUCT */
const SlideProduct = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-surface">

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>Product Capabilities</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-950 tracking-tighter leading-tight mt-2">
          12 features. Zero<br /><span className="text-primary italic">compromises.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: <Lock size={16} />,        label: 'Blockchain Registry',       desc: 'Immutable, cryptographic title anchor' },
          { icon: <Zap size={16} />,          label: 'Auto Registration',         desc: 'Aadhaar OTP e-registration engine' },
          { icon: <GitMerge size={16} />,     label: 'Auto Mutation Sync',        desc: '30–45 day land record update SLA' },
          { icon: <CreditCard size={16} />,   label: 'Weekly Rentals',            desc: 'Automated rental distribution' },
          { icon: <BarChart3 size={16} />,    label: 'Live Order Book 24/7',      desc: 'Secondary market price discovery' },
          { icon: <Scale size={16} />,        label: 'E-Voting Governance',       desc: 'Co-owner decisions on-chain' },
          { icon: <ShieldCheck size={16} />,  label: 'Document Vault',            desc: 'AES-256 encrypted title storage' },
          { icon: <TrendingUp size={16} />,   label: 'Market Price Algorithm',    desc: 'AI-powered dynamic land valuation' },
          { icon: <Terminal size={16} />,     label: 'Auto Doc Generation',       desc: 'Sale deed and UDS certificate automation' },
          { icon: <Cpu size={16} />,          label: 'My Control Dashboard',      desc: 'Full portfolio governance interface' },
          { icon: <Layers size={16} />,       label: 'True Ownership',            desc: 'UDS title, not financial instruments' },
          { icon: <Globe size={16} />,        label: 'Cross-Border Rails',        desc: 'NRI/LRS compliant global access' },
        ].map((feat, i) => (
          <motion.div key={i} variants={fadeUp}
            className="flex flex-col gap-3 p-4 bg-white border border-neutral-100 rounded-xl hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              {feat.icon}
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900 group-hover:text-primary transition-colors leading-tight">{feat.label}</div>
              <div className="text-[10px] text-neutral-400 mt-1 leading-snug">{feat.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div variants={fadeUp} className="flex justify-center mt-6">
        <Link to="/portfolio/vlands#demo"
          className="flex items-center gap-2 bg-primary text-white border border-transparent px-6 py-2.5 rounded-sm font-bold hover:brightness-110 transition-all text-xs">
          <Play size={14} className="fill-white" /> Watch Product Demo Video
        </Link>
      </motion.div>
    </div>
  </motion.div>
);

/* 11 — TEAM */
const SlideTeam = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-neutral-950 text-white relative">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,107,90,0.15),transparent_70%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>The Team</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter leading-tight mt-2">
          Built by people who<br /><span className="text-accent italic">lived the problem.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <motion.div variants={fadeUp} className="flex flex-col gap-5 p-6 md:p-8 border border-white/10 rounded-2xl bg-white/[0.04]">
          <div className="w-16 h-16 rounded-2xl bg-neutral-800 overflow-hidden shrink-0 border border-white/10 relative group/img">
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
            The origin story of VLands is personal — Dr. Uday's father lost the fair value of his land to predatory brokers when he needed liquidity for medical school fees. That experience became the founding mandate: <em className="text-neutral-300">land must be liquid, transparent, and universally accessible</em>.
          </p>
          <div className="flex flex-wrap gap-2">
            {['PropTech Architecture', 'RegTech Law', 'Product Vision'].map(t => (
              <span key={t} className="px-2 py-1 bg-white/10 text-white/60 text-[9px] font-mono rounded-full">{t}</span>
            ))}
          </div>
          <div className="text-xs md:text-sm text-accent font-mono">udaylingipalli@vlands.app</div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-5 p-6 md:p-8 border border-accent/20 rounded-2xl bg-white/[0.04]">
          <div className="w-16 h-16 rounded-2xl bg-neutral-800 overflow-hidden shrink-0 border border-white/10 relative group/img">
            <img 
              src="https://lh3.googleusercontent.com/d/1RtLGWgHOFs1QjaLj18R809EfEprMB9OJ" 
              alt="Vishal D. Mehta" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-lg md:text-xl font-display font-bold text-white">Vishal D. Mehta</div>
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-bold">Chief Financial Officer</div>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            Vishal brings deep financial engineering expertise to the platform — structuring the UDS-backed investment instruments, managing the SPV tokenisation architecture, and designing the multi-stream revenue model that makes VLands institutionally investable.
          </p>
          <div className="flex flex-wrap gap-2">
            {['SPV Structures', 'Financial Modelling', 'Investor Relations'].map(t => (
              <span key={t} className="px-2 py-1 bg-white/10 text-white/60 text-[9px] font-mono rounded-full">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={fadeIn} className="p-4 border border-white/10 rounded-xl bg-white/[0.02]">
        <p className="text-xs text-neutral-500 italic">VLands HQ: Visakhapatnam, Andhra Pradesh · Scaling to 4+ engineers and legal specialists by Q4 2026</p>
      </motion.div>
    </div>
  </motion.div>
);

/* 12 — THE ASK */
const SlideAsk = () => (
  <motion.div variants={stagger} initial="hidden" animate="show"
    className="relative flex flex-col justify-center min-h-full w-full px-6 py-12 md:p-16 lg:p-20 bg-primary text-white overflow-hidden">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,212,170,0.2),transparent_60%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(0,0,0,0.3),transparent_50%)]" />

    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center gap-8 relative z-10">
      <motion.div variants={fadeUp}>
        <SlideLabel>The Ask</SlideLabel>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter leading-tight mt-2">
          Join the<br /><span className="text-accent italic">Infrastructure Layer.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: 'Pre-Seed Ask', value: '₹2.5–3 Cr', sub: 'Round size' },
          { label: 'Post-Money Valuation', value: '₹28–30 Cr', sub: 'Benchmark valuation' },
          { label: 'Launch Target', value: 'Apr 2027', sub: 'Platform go-live' },
        ].map((item) => (
          <motion.div key={item.label} variants={fadeUp}
            className="flex flex-col gap-2 p-6 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/60 font-bold">{item.label}</div>
            <div className="text-2xl md:text-3xl font-display font-black text-white leading-tight">{item.value}</div>
            <div className="text-[9px] font-mono uppercase tracking-wider text-accent/80">{item.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} className="flex flex-col gap-4 p-6 bg-white/[0.08] border border-white/15 rounded-2xl">
          <div className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">Use of Funds</div>
          {[
            ['40%', 'Product Engineering & Blockchain Infrastructure'],
            ['30%', 'Legal Framework & Regulatory Compliance'],
            ['20%', 'Go-to-Market & Initial Land Partner Acquisition'],
            ['10%', 'Operations, HQ Setup & Team Expansion'],
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
            'Registration Bill 2025 enacted — digital mutation is the new standard',
            '30M+ NRI diaspora seeking compliant land investment vehicles',
            'Zero institutional fractional land competitor in India today',
            'Founding team is native to every compliance requirement',
          ].map((point, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              <p className="text-xs md:text-sm text-white/70 leading-snug">{point}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
        <a href="mailto:udaylingipalli@vlands.app"
          className="flex items-center gap-3 bg-accent text-primary-dark px-6 py-3 rounded-sm font-bold hover:-translate-y-0.5 hover:shadow-xl transition-all text-sm">
          <Mail size={16} /> Request Full Brief
        </a>
        <Link to="/investors"
          className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-sm font-bold hover:bg-white/20 transition-all text-sm">
          Investor Portal <ArrowUpRight size={16} />
        </Link>
        <Link to="/portfolio/vlands#demo"
          className="flex items-center gap-3 bg-primary text-white border border-transparent px-6 py-3 rounded-sm font-bold hover:brightness-110 transition-all text-sm">
          <Play size={16} className="fill-white" /> Watch Product Demo
        </Link>
      </motion.div>
    </div>

    {/* Watermark */}
    <div className="absolute right-0 bottom-0 text-[12rem] md:text-[22rem] font-black text-white/[0.03] font-display select-none pointer-events-none leading-none tracking-tighter">
      VLands
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════
   SLIDE MAP
═══════════════════════════════════════════════════ */
const SLIDE_COMPONENTS: Record<string, React.FC> = {
  cover:         SlideCover,
  thesis:        SlideThesis,
  problem:       SlideProblem,
  solution:      SlideSolution,
  'market-india':  SlideMarketIndia,
  'market-global': SlideMarketGlobal,
  audience:      SlideAudience,
  model:         SlideModel,
  gtm:           SlideGTM,
  product:       SlideProduct,
  team:          SlideTeam,
  ask:           SlideAsk,
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
const VLandsPitchDeck = () => {
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
            <VLandsLogo className="w-4 h-4 text-accent" />
            <span className="text-white/60 text-xs font-mono font-bold tracking-wider">VLands Pitch Deck</span>
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

export default VLandsPitchDeck;
