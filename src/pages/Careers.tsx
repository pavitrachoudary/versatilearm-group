import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, ArrowRight, Code2, Scale, TrendingUp, Users, Database,
  Globe, Shield, Zap, Clock, MapPin, Laptop, Heart, Star,
  ChevronDown, CheckCircle2, BookOpen, Layers, Cpu, BarChart2,
  MessageSquare, Building2, Coffee, Lightbulb, Target, Award
} from 'lucide-react';

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const principles = [
  {
    icon: <Target size={22} />,
    title: 'Ownership without permission',
    desc: 'Every team member owns their domain completely. You don\'t wait for approval to fix something broken or ship something better. You spot the gap, you close it. This isn\'t a company where good ideas die in Slack channels.',
  },
  {
    icon: <Scale size={22} />,
    title: 'Engineers read law, lawyers read code',
    desc: 'We operate at the intersection of Registration Bills, UDS mutation law, smart contracts, and government APIs. Everyone at VAG crosses disciplines. Our best engineers understand RERA. Our legal team reviews PRDs.',
  },
  {
    icon: <Lightbulb size={22} />,
    title: 'Write it down',
    desc: 'We are a documentation-first team. Decisions live in writing, not in someone\'s memory. If it isn\'t written, it didn\'t happen. This creates a culture where the best idea wins — regardless of who had it or when they joined.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Speed is a strategy',
    desc: 'We are a pre-seed company racing to public launch. We move fast, but we don\'t cut legal corners — because in real-estate, legal corners are load-bearing walls. We ship fast within our compliance boundary.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Mission-native, not mission-adjacent',
    desc: 'We are not building software that happens to be about land. We are building infrastructure that will protect millions of Indian families from predatory land sales. That\'s the reason we come to work.',
  },
  {
    icon: <MessageSquare size={22} />,
    title: 'Directness as respect',
    desc: 'We give direct feedback, make hard decisions openly, and disagree loudly in the room. Once a decision is made, we commit fully. Harmony that silences truth is not a culture we want.',
  },
];

const roles = [
  {
    id: 1,
    title: 'Senior Full-Stack Engineer',
    department: 'Product Engineering',
    location: 'Visakhapatnam · Hybrid',
    type: 'Full-time',
    badge: 'High Priority',
    badgeColor: 'bg-primary text-white',
    overview:
      'You will own the core transaction layer of the VLands platform — the order book, the mutation tracking pipeline, and the Aadhaar OTP registration flow. This is not a CRUD-app role. You will build systems that process government land records, interface with the IGR (Inspector General of Registration), and execute smart contract state transitions. Every PR you ship touches real property ownership.',
    responsibilities: [
      'Architect and own the dual-rail ownership registry — ERC-721 NFT deeds running in parallel with physical UDS mutation (M1–M9)',
      'Build and maintain the live 24/7 order book matching engine (Market, Limit, Stop-Loss order types on physical land parcels)',
      'Integrate Aadhaar OTP e-sign flows via DigiLocker and Leegality for fully digital ownership transfer',
      'Design the government mutation sync pipeline — uploading documents to the IGR and polling for registration confirmation',
      'Build the investor-facing "My Control Hub" — governance voting, document vault, co-owner chat scoped per property',
      'Own backend API design, performance, and reliability for a platform where downtime has legal consequences',
    ],
    stack: ['React / TypeScript', 'Node.js / Express', 'PostgreSQL', 'Solidity / Hardhat', 'AWS / S3', 'Redis', 'Aadhaar APIs', 'DigiLocker'],
    requirements: [
      '4+ years of full-stack product engineering',
      'Deep experience with TypeScript, React, and Node.js in production',
      'Understanding of blockchain fundamentals — ERC-20/ERC-721, smart contracts, on-chain state management',
      'Ability to read and implement against government API documentation (IGR, RERA, DigiLocker)',
      'Strong data modelling instincts — you think about schema before you think about UI',
    ],
    niceToHave: [
      'Experience with Solidity or Web3 development',
      'Prior work in regulated industries (fintech, legaltech, govtech)',
      'Familiarity with Indian land registration or property law',
    ],
  },
  {
    id: 2,
    title: 'Legal Operations Lead',
    department: 'Compliance & Legal',
    location: 'India · Remote',
    type: 'Full-time',
    badge: 'High Priority',
    badgeColor: 'bg-primary text-white',
    overview:
      'You will translate India\'s Registration Bill 2025, the UDS legal framework, and RERA regulations into automated, scalable operational workflows. This is the rarest of roles: one where deep legal knowledge meets process engineering. You will write the playbooks that govern how land gets registered, mutated, and transferred on our platform — and then work with engineering to automate them.',
    responsibilities: [
      'Own the end-to-end legal framework for fractional UDS land ownership — from RERA compliance to 7/12 extract integration',
      'Design and document the 9-stage mutation pipeline (M1–M9) with SLA enforcement and escalation paths',
      'Manage advocate networks across Andhra Pradesh, Telangana, and Maharashtra for on-ground legal execution',
      'Build standardised legal document templates — sale deeds, UDS transfer deeds, advocate clearance letters — for digital e-sign',
      'Monitor evolving regulatory landscape (Registration Bill 2025, SEBI AIF regulations, RBI LRS guidelines) and update platform compliance accordingly',
      'Manage state-specific stamp duty calculations and sub-registrar workflow documentation for 5+ Indian states',
    ],
    stack: ['Legal research tools', 'Document automation (Leegality)', 'Notion (documentation)', 'Process mapping tools'],
    requirements: [
      'LLB or LLM with 3+ years of property law practice in India',
      'Deep hands-on knowledge of UDS (Undivided Share) transfers and Mutation proceedings',
      'Experience reading and interpreting Registration Acts, RERA, and Revenue Department circulars',
      'Ability to translate legal complexity into clear operational checklists and automated workflows',
      'Strong written communication — you will write legal memos, compliance guides, and policy documents',
    ],
    niceToHave: [
      'Experience with PropTech, LegalTech, or regulated startup environments',
      'Working knowledge of e-sign regulations in India (Information Technology Act, 2000)',
      'Familiarity with South Indian land measurement units and revenue survey records',
    ],
  },
  {
    id: 3,
    title: 'Land Valuation & Data Scientist',
    department: 'Data Science',
    location: 'Visakhapatnam · Hybrid',
    type: 'Full-time / Contract',
    badge: 'Open',
    badgeColor: 'bg-neutral-100 text-neutral-700',
    overview:
      'You will build VLands\' proprietary land price-discovery engine — the algorithm that updates market valuations weekly across every listed parcel. This is novel data science work: there are no established models for fractional land valuation in India. You will invent the methodology, source the comparable data, and build a system that eventually becomes the authoritative pricing reference for fractional Indian land.',
    responsibilities: [
      'Design and build the weekly land valuation algorithm using guidance values, comparable sales, order book data, and infrastructure proximity metrics',
      'Integrate government data sources: guideline values by district, SRO registration transaction records, RERA project disclosures',
      'Build a land comparable analysis pipeline — matching parcels by location, survey number, adjacency, road access, and land classification',
      'Develop anomaly detection for price manipulation — flagging unusual order book patterns for compliance review',
      'Build dashboards for internal analyst review of valuation outputs before weekly publish',
    ],
    stack: ['Python', 'Pandas / NumPy', 'Scikit-learn', 'PostgreSQL / PostGIS', 'GIS tools (QGIS)', 'Government open datasets'],
    requirements: [
      '3+ years in data science, quantitative finance, or real-estate analytics',
      'Strong Python skills — data wrangling, statistical modelling, pipeline engineering',
      'Experience working with geospatial data and GIS analysis',
      'Comfort with ambiguity — you will often be the first person to solve a particular problem',
    ],
    niceToHave: [
      'Background in real-estate economics or property appraisal methodologies',
      'Experience with Indian government open data sources',
      'Knowledge of Indian land measurement units across different states',
    ],
  },
  {
    id: 4,
    title: 'Growth & Community Manager',
    department: 'Growth',
    location: 'India · Remote',
    type: 'Full-time',
    badge: 'Open',
    badgeColor: 'bg-neutral-100 text-neutral-700',
    overview:
      'You will build the investor community that makes VLands\' network effects possible. This means acquiring the first 10,000 users through a mix of content, community, and partnerships — and then keeping them engaged through squad mechanics, co-owner governance, and platform events. You will own the full community loop: acquisition, activation, retention, and referral.',
    responsibilities: [
      'Design and execute go-to-market campaigns for our invite-only beta launch targeting early-adopter investors',
      'Build and manage the VLands NRI investor community across WhatsApp, Telegram, and LinkedIn',
      'Own the "Squad" viral mechanic — creating incentives for squad formation and driving community-led user acquisition',
      'Partner with financial influencers, RERA-registered agents, and NRI community groups for distribution',
      'Write compelling land investment content (guides, case studies, return calculators) that builds platform authority',
      'Track and report on community health metrics: DAU, squad formation rate, referral conversions, investor NPS',
    ],
    stack: ['WhatsApp Business API', 'Meta Ads', 'LinkedIn', 'Notion', 'Amplitude', 'Mailchimp / Brevo'],
    requirements: [
      '3+ years in community management, growth marketing, or investor relations',
      'Deep understanding of Indian retail investor behaviour and NRI investment patterns',
      'Proven track record of growing engaged communities from scratch (not just managing established ones)',
      'Strong written and verbal communication in English and Telugu or Hindi',
    ],
    niceToHave: [
      'Personal experience with real-estate investment or financial products',
      'Connections in NRI investor networks (US, UAE, UK, Singapore)',
      'Experience with referral and viral loop mechanics in fintech apps',
    ],
  },
  {
    id: 5,
    title: 'Blockchain Infrastructure Engineer',
    department: 'Product Engineering',
    location: 'Remote · India preferred',
    type: 'Full-time / Contract',
    badge: 'Open',
    badgeColor: 'bg-neutral-100 text-neutral-700',
    overview:
      'You will own VLands\' on-chain infrastructure — the ERC-721 NFT deed contract, the ERC-20 fractional token wrapper, the Soulbound lock-in mechanism, and the smart contract audit pipeline. Our dual-rail architecture makes blockchain state and government land records co-authoritative: every on-chain action must reconcile with physical mutation. You will be the engineer who makes that reconciliation reliable and secure.',
    responsibilities: [
      'Write, test, and deploy the ERC-721 NFT deed contract and ERC-20 fractional token wrapper on the chosen L2 (Polygon / Base)',
      'Implement the Soulbound lock-in mechanism — 45-day tamper-proof lock enforced at the smart contract level',
      'Build the oracle system that triggers on-chain token state changes when government mutation is confirmed',
      'Design the multi-sig governance structure for platform-level contract upgrades',
      'Prepare contracts for third-party security audit and manage the audit remediation process',
    ],
    stack: ['Solidity', 'Hardhat / Foundry', 'OpenZeppelin', 'Polygon / Base', 'Ethers.js / Viem', 'The Graph'],
    requirements: [
      '3+ years of production Solidity development with publicly audited contracts',
      'Deep understanding of ERC-20/ERC-721/ERC-1155 token standards and their edge cases',
      'Experience designing oracle integrations and off-chain/on-chain data reconciliation',
      'Security-first mindset — you read audit reports for fun',
    ],
    niceToHave: [
      'Experience with real-world asset (RWA) tokenisation protocols',
      'Familiarity with SEBI or RBI regulatory considerations for blockchain assets in India',
    ],
  },
  {
    id: 6,
    title: 'Operations & SLA Manager',
    department: 'Operations',
    location: 'Visakhapatnam · On-site',
    type: 'Full-time',
    badge: 'Open',
    badgeColor: 'bg-neutral-100 text-neutral-700',
    overview:
      'You will run the operational heartbeat of OwnMyLand — ensuring every buyer receives their welcome kit within 1 hour, every ORM makes their welcome call within 48 hours, every sale deed is dispatched within 25 days, and every mutation is filed within 60 days. This is an operational excellence role: you own the SLA pipeline, the escalation matrix, and the process culture that makes our post-sale experience a genuine competitive moat.',
    responsibilities: [
      'Own the R1 pipeline (8 stages: booking → welcome → KYC → deed → registration → dispatch → handover) with SLA enforcement',
      'Own the R2 pipeline (community setup → VAULT documents → mutation tracking M1–M9)',
      'Manage the ORM team (Ownership Relationship Managers) — capacity planning, training, performance management',
      'Implement automated WhatsApp + in-app escalation alerts for every SLA breach',
      'Build and maintain the operations playbook — every edge case, every exception, every escalation path documented',
      'Report weekly on SLA performance, breach rates, mutation completion times, and late interest amounts',
    ],
    stack: ['Internal Vault platform', 'WhatsApp Business API', 'Notion (playbooks)', 'Google Sheets (interim)', 'Internal CRM'],
    requirements: [
      '3+ years in operations management, customer success, or post-sale fulfillment in a fast-paced startup',
      'Experience building and managing SLA-driven workflows with clear escalation paths',
      'Strong process orientation — you are the person who notices when something is done ad-hoc and systematises it',
      'Excellent communication: you will interact daily with buyers, advocates, sub-registrar offices, and engineering',
    ],
    niceToHave: [
      'Prior experience in real-estate operations, legal process management, or title insurance',
      'Familiarity with Andhra Pradesh or Telangana property registration procedures',
    ],
  },
];

const benefits = [
  {
    icon: <Globe size={20} />,
    title: 'Remote-first flexibility',
    desc: 'Most roles are hybrid or remote-friendly. Core hours exist for overlap — the rest is yours to structure. We measure output, not attendance.',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'ESOP eligibility',
    desc: 'Every early-stage team member is eligible for an Employee Stock Ownership Plan. We are building equity together — you should own a piece of what you build.',
  },
  {
    icon: <Star size={20} />,
    title: 'Mission-critical impact',
    desc: 'You will see the direct impact of your work on real families owning real land. Early-stage problems are the most interesting problems — and you will own them fully.',
  },
  {
    icon: <Award size={20} />,
    title: 'Performance reviews',
    desc: 'Bi-annual structured reviews with clear career ladders. No ambiguity about what you need to do to grow — or what we expect at each level.',
  },
];

const hiringSteps = [
  {
    step: '01',
    title: 'Application Review',
    time: '1–3 business days',
    desc: 'We read every application. Not ATS-filtered. A human reads your CV and cover letter. We move quickly — you\'ll hear from us within a week.',
  },
  {
    step: '02',
    title: 'Founder Call',
    time: '30 minutes',
    desc: 'A direct conversation with Uday. No HR screening. We want to understand what you\'ve built, what you care about, and why VAG interests you. We\'ll tell you the unvarnished truth about what it\'s like to work here.',
  },
  {
    step: '03',
    title: 'Technical / Domain Assessment',
    time: '2–4 hours',
    desc: 'A focused, realistic task relevant to your role. Engineers solve a real product problem we\'ve faced. Legal candidates analyse a real regulatory challenge. We pay for your time. We don\'t do trick questions.',
  },
  {
    step: '04',
    title: 'Team Interview',
    time: '60–90 minutes',
    desc: 'Meet the people you\'ll work with directly. Ask the hard questions about culture, pace, and what doesn\'t work yet. We want you to assess us as much as we assess you.',
  },
  {
    step: '05',
    title: 'Offer & Onboarding',
    time: 'Within 1 week of final round',
    desc: 'We move fast on decisions. Offer letter, ESOP agreement, and your onboarding kit go out together. Your first week is structured with context-setting, not admin.',
  },
];

const departments = ['All Roles', 'Product Engineering', 'Compliance & Legal', 'Data Science', 'Growth', 'Operations'];

/* ─── ROLE CARD ─────────────────────────────────────────────────────────── */

const RoleCard = ({ role }: { role: typeof roles[number] }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="border-b border-neutral-100 last:border-b-0"
    >
      {/* Summary Row */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-10 group flex flex-col md:flex-row md:items-start gap-6 md:gap-12 hover:bg-neutral-50/60 transition-colors px-0 rounded-none bg-transparent border-0 cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary font-mono">
              {role.department}
            </span>
            <span className="text-neutral-300">·</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
              <MapPin size={10} /> {role.location}
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
              {role.type}
            </span>
            <span className={`ml-1 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${role.badgeColor}`}>
              {role.badge}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 group-hover:text-primary transition-colors leading-[1.2] m-0">
            {role.title}
          </h2>
          {!open && (
            <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl line-clamp-2 m-0">
              {role.overview}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0 mt-1">
          <span className="text-xs font-bold text-primary uppercase tracking-widest hidden md:block">
            {open ? 'Collapse' : 'View Role'}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:border-primary group-hover:text-primary transition-colors"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-14 flex flex-col gap-10">
              {/* Overview */}
              <p className="text-neutral-600 leading-relaxed text-lg max-w-3xl m-0">
                {role.overview}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Responsibilities */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-900 m-0">What You'll Own</h4>
                  <ul className="flex flex-col gap-3 p-0 m-0 list-none">
                    {role.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed">
                        <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-8">
                  {/* Requirements */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-900 m-0">What We Need</h4>
                    <ul className="flex flex-col gap-3 p-0 m-0 list-none">
                      {role.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nice To Have */}
                  {role.niceToHave && (
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500 m-0">Nice To Have</h4>
                      <ul className="flex flex-col gap-2 p-0 m-0 list-none">
                        {role.niceToHave.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-neutral-500 leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Stack */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500 m-0">Tech / Tools Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-bold bg-neutral-100 text-neutral-600 rounded-lg border border-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply CTA */}
              <div className="flex flex-wrap gap-4 items-center pt-2 border-t border-neutral-100">
                <a
                  href={`mailto:careers@versatilearm.com?subject=Application: ${role.title}&body=Hi Team,%0D%0A%0D%0AI am applying for the ${role.title} role at Versatile Arm Group.%0D%0A%0D%0A`}
                  className="bg-primary text-white px-8 py-3.5 rounded-sm font-bold flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20 transition-all text-decoration-none"
                >
                  Apply for this Role <ArrowRight size={18} />
                </a>
                <span className="text-xs text-neutral-400">
                  Send your CV + a short note on why this role. No cover letter template needed.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── PAGE ──────────────────────────────────────────────────────────────── */

const Careers = () => {
  const [activeDept, setActiveDept] = useState('All Roles');

  const filteredRoles = activeDept === 'All Roles'
    ? roles
    : roles.filter((r) => r.department === activeDept);

  return (
    <div className="bg-white selection:bg-primary selection:text-white">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-0 bg-surface overflow-hidden">
        <div className="container no-prose w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-10 pb-20 md:pb-28"
          >
            <span className="section-label">Join the Build</span>
            <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-display font-medium leading-[0.95] tracking-tighter text-neutral-950 max-w-4xl m-0">
              We are building the<br />
              <span className="text-primary italic">infrastructure of land</span><br />
              ownership.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-500 max-w-2xl leading-[1.5] m-0">
              Small team. Enormous problem. Every hire changes the trajectory.
              If you've spent your career wanting your work to matter — this is your moment.
            </p>
            <div className="flex flex-wrap gap-6 items-center mt-2">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Building2 size={16} className="text-primary" />
                Visakhapatnam, Andhra Pradesh
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Globe size={16} className="text-primary" />
                Remote-friendly roles available
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Users size={16} className="text-primary" />
                {roles.length} open positions
              </div>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <div className="border-t border-neutral-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-100">
            {[
              { value: 'Pre-Seed', label: 'Stage' },
              { value: '2025', label: 'Founded' },
              { value: 'Apr 2027', label: 'Public Launch' },
              { value: '₹780B+', label: 'Market We\'re Unlocking' },
            ].map(({ value, label }) => (
              <div key={label} className="py-8 px-6 flex flex-col gap-1">
                <p className="text-2xl font-display font-bold text-neutral-900 m-0">{value}</p>
                <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest m-0">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY VAG ──────────────────────────────────────────────────── */}
      <section className="section bg-neutral-950 text-white overflow-hidden">
        <div className="container no-prose flex flex-col gap-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="flex flex-col gap-6">
              <span className="section-label text-accent">Why Join VAG</span>
              <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)] tracking-tighter m-0" style={{ color: '#fffafa' }}>
                Most companies build products.<br />
                <span className="text-accent italic">We're building rights.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-6 text-neutral-400 text-lg leading-relaxed">
              <p className="m-0">
                India has $1 trillion locked in land owned by 300 million families.
                Most of them cannot sell it at a fair price, cannot monetise it, and cannot
                exit in a crisis without a predatory middleman taking a cut.
              </p>
              <p className="m-0">
                The Registration Bill 2025 opened the first legal window for digital-first
                fractional land ownership. We jumped through it. We are building the exchange
                infrastructure — the legal rails, the blockchain registry, the government APIs —
                that will make land as liquid as an equity share.
              </p>
              <p className="m-0">
                That infrastructure does not exist anywhere in the world yet.
                The people who build it first will shape how a trillion-dollar market operates
                for the next fifty years. We'd like those people to be on our team.
              </p>
            </div>
          </div>

          {/* Culture Principles */}
          <div className="flex flex-col gap-10">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-600" style={{ color: '#bebebe' }}>How We Work</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/4 border border-white/8 rounded-2xl p-8 flex flex-col gap-5 hover:border-accent/30 hover:bg-white/6 transition-all duration-400 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-colors">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors leading-snug m-0">
                    {p.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors m-0">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ───────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container no-prose flex flex-col gap-14 w-full">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-3">
                <span className="section-label">Open Positions</span>
                <h2 className="text-4xl md:text-5xl font-display font-medium leading-[var(--leading-title)] tracking-tighter m-0">
                  {roles.length} roles. Every one matters.
                </h2>
              </div>
              <p className="text-neutral-500 text-lg max-w-sm leading-relaxed md:text-right m-0">
                We are hiring across engineering, legal, data, and growth for both VLands and OwnMyLand.
              </p>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2 mt-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer border-0 ${
                    activeDept === dept
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Role List */}
          <div className="border-t border-neutral-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDept}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {filteredRoles.length === 0 ? (
                  <div className="py-20 text-center text-neutral-400 text-lg">
                    No open roles in this department right now.{' '}
                    <a
                      href="mailto:careers@versatilearm.com"
                      className="text-primary underline"
                    >
                      Send us your CV anyway.
                    </a>
                  </div>
                ) : (
                  filteredRoles.map((role) => (
                    <div key={role.id}>
                      <RoleCard role={role} />
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────── */}
      <section className="section bg-surface border-t border-neutral-100">
        <div className="container no-prose flex flex-col gap-14 w-full">
          <div className="flex flex-col gap-4">
            <span className="section-label">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-[var(--leading-title)] m-0">
              Built to keep you here.
            </h2>
            <p className="text-xl text-neutral-500 max-w-xl leading-relaxed m-0">
              We are pre-seed and honest about it. We can't match a FAANG salary — yet. What we can offer is ownership, impact, and a structure built for long-term builders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-neutral-100 rounded-2xl p-7 flex flex-col gap-4 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center text-primary">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-neutral-900 leading-snug m-0">{benefit.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed m-0">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Comp Philosophy */}
          <div className="bg-neutral-950 text-white rounded-3xl p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-5">
              <h3 className="text-3xl font-display leading-[1.2] m-0" style={{ color: '#e6e6e6' }}>
                Our compensation philosophy.
              </h3>
              <p className="text-neutral-400 leading-relaxed m-0">
                We pay competitive salaries benchmarked against Indian PropTech and deep-tech startups at our stage. Every team member receives an ESOP allocation — because when VLands scales to $1B GMV, you should own a part of what made that happen.
              </p>
              <p className="text-neutral-400 leading-relaxed m-0">
                We publish salary ranges internally. We don't negotiate against candidates. We make our best offer first. No games.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Compensation Benchmark', value: 'Indian PropTech market rate' },
                { label: 'ESOP', value: 'All early hires eligible' },
                { label: 'Review Cadence', value: 'Bi-annual performance reviews' },
                { label: 'Offer Process', value: 'Best offer, first time' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 border border-white/8 rounded-xl p-5 flex flex-col gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 m-0">{label}</p>
                  <p className="text-sm font-bold text-white leading-snug m-0">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HIRING PROCESS ───────────────────────────────────────────── */}
      <section className="section bg-white border-t border-neutral-100">
        <div className="container no-prose flex flex-col gap-14 w-full">
          <div className="flex flex-col gap-4">
            <span className="section-label">The Hiring Process</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-[var(--leading-title)] m-0">
              Transparent from first to last.
            </h2>
            <p className="text-xl text-neutral-500 max-w-xl leading-relaxed m-0">
              We move fast and we respect your time. No ghosting, no mystery, no six-round loops that go nowhere.
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {hiringSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-8 md:gap-14 pb-10 md:pb-14 relative"
              >
                {/* Timeline */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-sm font-mono z-10">
                    {step.step}
                  </div>
                  {i < hiringSteps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-neutral-100 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 pb-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <h3 className="text-xl font-bold text-neutral-900 m-0">{step.title}</h3>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary bg-primary/8 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest">
                      <Clock size={10} /> {step.time}
                    </span>
                  </div>
                  <p className="text-neutral-500 leading-relaxed max-w-2xl m-0">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFE AT VAG ──────────────────────────────────────────────── */}
      <section className="section bg-surface border-t border-neutral-100">
        <div className="container no-prose flex flex-col gap-14 w-full">
          <div className="flex flex-col gap-4">
            <span className="section-label">Life at VAG</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-[var(--leading-title)] m-0">
              What it actually looks like.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Code2 size={22} />,
                title: 'The Tech Stack',
                content: [
                  'React + TypeScript (frontend)',
                  'Node.js + PostgreSQL (backend)',
                  'Solidity / Hardhat (on-chain)',
                  'AWS + S3 (infrastructure)',
                  'Aadhaar / DigiLocker APIs (identity)',
                  'Government IGR integrations (legal)',
                ],
              },
              {
                icon: <Layers size={22} />,
                title: 'The Work Rhythm',
                content: [
                  'Async-first, with structured daily standups',
                  'Bi-weekly product reviews with the founder',
                  'Weekly legal compliance check-ins',
                  'Notion for documentation, Slack for communication',
                  'Friday retrospectives — what shipped, what didn\'t',
                  'Quarterly planning sessions with full team',
                ],
              },
              {
                icon: <Database size={22} />,
                title: 'What We\'re Building Right Now',
                content: [
                  'Live order book matching engine (in build)',
                  'Aadhaar OTP e-sign integration (finalising)',
                  'ERC-721 NFT deed smart contracts (in audit)',
                  'Government mutation sync pipeline (architecture phase)',
                  'NRI LRS-compliant investment rail (design phase)',
                  'Investor mobile app (UI complete, backend connecting)',
                ],
              },
            ].map(({ icon, title, content }) => (
              <div
                key={title}
                className="bg-white border border-neutral-100 rounded-2xl p-8 flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center text-primary">
                    {icon}
                  </div>
                  <h3 className="font-bold text-neutral-900 m-0">{title}</h3>
                </div>
                <ul className="flex flex-col gap-2.5 p-0 m-0 list-none">
                  {content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Founder Note */}
          <div className="border border-neutral-200 rounded-3xl p-10 md:p-14 bg-white flex flex-col md:flex-row gap-10 items-start">
            <img 
              src="https://lh3.googleusercontent.com/d/1q2uYqrtvrfSbTMcPkhdF_OSZw30NgGhF" 
              alt="Uday Kiran Lingipalli" 
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shrink-0 grayscale hover:grayscale-0 transition-all duration-300" 
              referrerPolicy="no-referrer" 
            />
            <div className="flex flex-col gap-5">
              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed italic m-0">
                "I built Chikitsaaa.com from scratch — appointment booking across 60 cities, 30K monthly visitors — while freelancing to cover cloud costs. I refused to quit. VLands was born from the same stubbornness, and from watching my father forced into a bad deal because land can't be sold in pieces.
                <br /><br />
                We are a tiny team taking on a trillion-dollar problem. Every person we hire is a bet on the future of this company. I take those bets seriously. If you join us, you will be heard, you will matter, and you will own what you build."
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div>
                  <p className="font-bold text-neutral-900 m-0">Uday Kiran Lingipalli</p>
                  <p className="text-sm text-neutral-500 m-0">Founder & CEO — Versatile Arm Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── SPONTANEOUS APPLICATION ──────────────────────────────────── */}
      <section className="section bg-primary text-white">
        <div className="container no-prose flex flex-col gap-10 items-center text-center w-full">
          <div className="flex flex-col gap-6 max-w-2xl">
            <span className="section-label text-primary-light">Don't See Your Role?</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium leading-[var(--leading-title)] tracking-tighter m-0" style={{ color: '#fffefe' }}>
              We hire for character<br />as much as credentials.
            </h2>
            <p className="text-xl text-primary-light/80 leading-relaxed m-0">
              If you have expertise in RegTech, PropTech, Blockchain, Legal Operations, or Land Data — and you believe ownership should be a right, not a privilege — we want to hear from you.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a
              href="mailto:careers@versatilearm.com?subject=Spontaneous Application — VAG&body=Hi Team,%0D%0A%0D%0AI don't see a specific role listed but I'd love to be part of what you're building at VAG. Here's a bit about me:%0D%0A%0D%0A"
              className="bg-white text-primary px-10 py-4 rounded-sm font-bold text-lg flex items-center gap-3 hover:bg-neutral-100 transition-all hover:-translate-y-0.5 hover:shadow-2xl text-decoration-none"
            >
              <Mail size={22} /> careers@versatilearm.com
            </a>
            <p className="text-primary-light/60 text-sm m-0">
              Send your CV + a paragraph on what you'd own here. That's all we need.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
