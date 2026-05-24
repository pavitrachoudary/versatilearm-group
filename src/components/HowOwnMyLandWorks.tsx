import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Search, Lock, Users, Sliders } from 'lucide-react';

interface FlowStep {
  id: string;
  badge: string;
  headline: string;
  headlineGreen: string;
  subheading: string;
  pills: string[];
  steps: { num: string; title: string; body: string }[];
  cta: string;
  img: string;
}

const flows: FlowStep[] = [
  {
    id: 'navigate',
    badge: 'Navigation Flow',
    headline: 'Your next land investment',
    headlineGreen: 'is 3 taps away.',
    subheading: 'Browse verified plots across India with live yield data, minimum entry from ₹3 Lakhs, and full infrastructure details — before you spend a single rupee.',
    pills: ['Filter by region, asset type & target yield', 'See real-time IRR, price per sq. yd & co-owner count', 'Tap Reserve or Join a Group instantly'],
    steps: [
      { num: '1', title: 'How Co-Ownership Works', body: 'Accessible entry, registered title, decision power — land ownership finally works for everyone.' },
      { num: '2', title: 'Explore / Asset Listing', body: 'Live yields, real prices, zero guesswork — find your plot in seconds.' },
      { num: '3', title: 'Property Details (Asset Overview)', body: 'Road access, water source, power supply, fencing — every detail verified before you invest.' },
      { num: '4', title: 'Ownership Amount (Booking Stage)', body: 'Pick your investment, see your ownership allotted instantly — start from just ₹3 Lakhs.' },
    ],
    cta: "Everything you need to decide. Nothing you don't.",
    img: 'https://lh3.googleusercontent.com/d/1k_twGvUPs0M0n31T1Kg5073cvRV7vlyL',
  },
  {
    id: 'reserve',
    badge: 'Reservation Flow',
    headline: 'Your plot. Your name.',
    headlineGreen: 'Locked in 60 seconds.',
    subheading: 'Pay just ₹6,000 to secure your ownership slot. Your details are KYC-verified, your deed is legally backed, and your spot is held while we handle the paperwork.',
    pills: ['Booking fee locks your price — balance due at registration only', 'Pay via UPI, QR code or bank transfer', 'Instant digital receipt + live booking tracker'],
    steps: [
      { num: '1', title: 'Review Your Details', body: 'KYC complete, deed confirmed, ownership papers ready — your spot is legally yours.' },
      { num: '2', title: 'Confirm Booking (₹6,000)', body: 'Pay just ₹6,000 now, secure 24 sq. yds — balance only due at registration.' },
      { num: '3', title: 'Your Reservations (Active Bookings)', body: 'Track your booking live from confirmation to deed — full visibility at every step.' },
      { num: '4', title: 'Digital Document Vault (Post-Booking)', body: 'The moment you book, your legal documents are encrypted and waiting for you.' },
    ],
    cta: 'Safe. Secure. Yours.',
    img: 'https://lh3.googleusercontent.com/d/1NL31FqntqQJL3UcpY9MwbAW5wTPxCQyn',
  },
  {
    id: 'squad',
    badge: 'Community Buying & Rewards',
    headline: 'Buy together. Pay less.',
    headlineGreen: 'Own more & Earn Rewards.',
    subheading: 'Join a Squad of like-minded investors and unlock group pricing on the same plot. The more members, the bigger the discount — automatically applied, no negotiation needed. Also earn referral rewards and apply coupons to selected assets.',
    pills: ['Squad pricing up to 12% lower than solo entry', 'Join open Squads or start your own with a code', 'Compare any two assets side-by-side before you commit', 'Earn 0.5% referral + redeem ₹500 & ₹1,000 coupons'],
    steps: [
      { num: '1', title: 'Your Reservations (Squad Entry Point)', body: 'Your reservation is processing — now make it work harder by joining a Squad.' },
      { num: '2', title: 'Open Squads (The Vizag Growth Squad)', body: '76% achieved, 14 members in — join before this Squad closes and the price goes up.' },
      { num: '3', title: 'Join Squad (12% Lower Price Applied)', body: 'Group benefit applied automatically — same plot, same deed, 12% less out of pocket.' },
      { num: '4', title: 'The Comparison Matrix', body: 'Two assets, every metric, one screen — compare yield, IRR, size and availability side by side.' },
      { num: '5', title: 'Referral Rewards & Coupons', body: 'Earn 0.5% on every referral, redeem ₹500 and ₹1,000 coupons — investing pays in more ways than one.' },
    ],
    cta: 'Strength in numbers. Returns in your name.',
    img: 'https://lh3.googleusercontent.com/d/1nuprXfINYaOllHG9KFZjr2nYuPhWTYXf',
  },
  {
    id: 'portfolio',
    badge: 'Portfolio & My Control',
    headline: "You don't just own land.",
    headlineGreen: 'You govern it — in one place.',
    subheading: 'Track every square yard you own, vote on asset decisions, receive dividend updates, and chat live with co-owners — all from one dashboard. This is real ownership, not just a receipt.',
    pills: ['My Control Hub: Updates, Voting, History & Co-Owners', 'Quarterly General Meetings & dividend announcements', 'Exit your position when you decide — on your terms', 'Investment Academy & Legal & Compliance — free to all'],
    steps: [
      { num: '1', title: 'My Portfolio (Two Assets)', body: '170 sq. yds owned across two cities — your land portfolio grows one plot at a time.' },
      { num: '2', title: 'My Control Hub (Updates, Voting, History)', body: 'Quarterly meetings, dividend payouts, new asset classes — you are always in the loop.' },
      { num: '3', title: 'Co-Owner Chat (Panvel Greens Sector A)', body: '42 co-owners, live decisions, real conversations — this is what shared ownership looks like.' },
      { num: '4', title: 'Profile Page', body: 'Your identity, your KYC, your settings — everything in one verified investor profile.' },
      { num: '5', title: 'Investment Academy & Legal Compliance', body: 'From first-time buyer to portfolio pro — master UDS registration, RERA, and yield strategy for free.' },
    ],
    cta: 'Your land. Your voice. Your rules.',
    img: 'https://lh3.googleusercontent.com/d/1OtkSNwoFPqXenxYw_K1nKwDzkn_Qzniv',
  },
];

const VectorIllustration = ({ type }: { type: string }) => {
  switch (type) {
    case 'navigate':
      return (
        <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <rect width="500" height="400" rx="16" fill="#FAFAF8" />
          <rect x="25" y="25" width="450" height="45" rx="8" fill="white" stroke="#E5E5E5" strokeWidth="1" />
          <circle cx="50" cy="47" r="6" fill="#1A6B5A" />
          <rect x="70" y="42" width="120" height="10" rx="5" fill="#E5E5E5" />
          <rect x="350" y="37" width="100" height="20" rx="10" fill="#1A6B5A" fillOpacity="0.08" />
          <text x="400" y="50" textAnchor="middle" fill="#1A6B5A" fontSize="8" fontWeight="bold" fontFamily="monospace">TIER-2 PLOTS</text>
          <rect x="25" y="85" width="215" height="280" rx="12" fill="white" stroke="#E5E5E5" strokeWidth="1" />
          <rect x="40" y="100" width="185" height="120" rx="8" fill="#1A6B5A" fillOpacity="0.05" />
          <line x1="40" y1="140" x2="225" y2="140" stroke="#1A6B5A" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="40" y1="180" x2="225" y2="180" stroke="#1A6B5A" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="100" y1="100" x2="100" y2="220" stroke="#1A6B5A" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="160" y1="100" x2="160" y2="220" stroke="#1A6B5A" strokeOpacity="0.1" strokeWidth="1" />
          <rect x="100" y="140" width="60" height="40" fill="#1A6B5A" fillOpacity="0.2" stroke="#1A6B5A" strokeWidth="1.5" />
          <circle cx="130" cy="160" r="4" fill="#00D4AA" />
          <rect x="40" y="235" width="120" height="12" rx="4" fill="#1A6B5A" fillOpacity="0.1" />
          <rect x="40" y="255" width="150" height="8" rx="4" fill="#737373" fillOpacity="0.2" />
          <rect x="40" y="275" width="90" height="22" rx="6" fill="#F2F2F2" />
          <text x="85" y="289" textAnchor="middle" fill="#1A6B5A" fontSize="8" fontWeight="bold">Yield: 11.4%</text>
          <rect x="136" y="275" width="90" height="22" rx="6" fill="#F2F2F2" />
          <text x="181" y="289" textAnchor="middle" fill="#737373" fontSize="8" fontWeight="bold">Entry: ₹3L</text>
          <rect x="255" y="85" width="220" height="280" rx="12" fill="white" stroke="#E5E5E5" strokeWidth="1" />
          <text x="275" y="115" fill="#0F4A3D" fontSize="11" fontWeight="bold">Panvel Greens - Sector A</text>
          <text x="275" y="132" fill="#737373" fontSize="8">UDS Registered Plot Parcel</text>
          <rect x="275" y="152" width="180" height="1" fill="#E5E5E5" />
          {['RERA Registered', '40ft Tar Road Access', 'Heavy Duty Water Pipeline', 'Perimeter Wall Locked'].map((item, idx) => (
            <g key={idx} transform={`translate(275, ${168 + idx * 28})`}>
              <circle cx="8" cy="8" r="8" fill="#1A6B5A" fillOpacity="0.1" />
              <path d="M5 8l2 2 4-4" stroke="#1A6B5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="24" y="11" fill="#404040" fontSize="9">{item}</text>
            </g>
          ))}
          <circle cx="150" cy="165" r="24" fill="#00D4AA" fillOpacity="0.15" />
          <circle cx="150" cy="165" r="12" fill="#00D4AA" fillOpacity="0.3" />
          <path d="M150 165l10 10m-10-10l-4 12m4-12h14" stroke="#00D4AA" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

const FlowSection = ({ flow, index }: { flow: FlowStep; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['2%', '-2%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      id={`ownmyland-flow-section-${flow.id}`}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center py-6 md:py-8 border-b border-neutral-100 last:border-0"
    >
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className={`relative ${isEven ? 'lg:order-first' : 'lg:order-last'}`}
      >
        <div id={`image-container-${flow.id}`} className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/5 ring-1 ring-neutral-200">
          <div className="absolute -inset-4 bg-gradient-radial from-accent/5 via-transparent to-transparent blur-2xl -z-10 rounded-3xl" />
          <img src={flow.img} alt={flow.badge} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
        </div>
      </motion.div>

      <div id={`text-container-${flow.id}`} className={`flex flex-col gap-6 ${isEven ? 'lg:order-last' : 'lg:order-first'}`}>
        <div className="relative pt-6">
          <span className="absolute -top-10 -left-2 text-[7rem] font-display font-bold text-neutral-100/50 leading-none select-none -z-10">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-800 text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 border border-neutral-200/60 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {flow.badge}
          </div>
          <motion.h3
            id={`ownmyland-heading-${flow.id}`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-display font-medium leading-[1.1] tracking-tighter text-neutral-950"
          >
            {flow.headline}{' '}
            <span className="text-primary">{flow.headlineGreen}</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-neutral-500 mt-4 leading-relaxed italic"
          >
            {flow.subheading}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {flow.pills.map((pill) => (
            <span key={pill} className="inline-flex items-center gap-1.5 bg-primary/8 text-primary text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 12 12">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3.5 6l1.8 1.8 3-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {pill}
            </span>
          ))}
        </motion.div>

        <div className="flex flex-col gap-4">
          {flow.steps.map((step, si) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: isEven ? 15 : -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + si * 0.05 }}
              className="flex gap-4 items-start group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white text-xs font-bold font-mono flex items-center justify-center shadow-sm shadow-primary/20 group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-800 font-display">{step.title}</div>
                <div className="text-sm text-neutral-500 leading-relaxed mt-0.5">{step.body}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 bg-white border border-primary/10 rounded-full px-5 py-3 w-fit mt-2 shadow-xs"
        >
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
              <path d="M3.5 6l1.8 1.8 3-3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-bold text-primary font-mono">{flow.cta}</span>
        </motion.div>
      </div>
    </div>
  );
};

const TAB_ITEMS = [
  { label: 'Explore', icon: Search },
  { label: 'Reserve', icon: Lock },
  { label: 'Squad', icon: Users },
  { label: 'Portfolio', icon: Sliders },
];

export const HowOwnMyLandWorks = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToSection = (i: number) => {
    setActiveTab(i);
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.findIndex((r) => r === entry.target);
            if (idx !== -1) setActiveTab(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white relative" id="how-ownmyland-works" style={{ paddingLeft: '1px', paddingRight: '0px', paddingTop: '50px', paddingBottom: '30px' }}>
      <div className="max-w-7xl mx-auto">
        <div id="ownmyland-works-header" className="flex flex-col gap-4 mb-20 items-center text-center">
          <span className="section-label">How it works</span>
          <h2 className="text-5xl md:text-[3.5rem] font-display font-medium leading-[1.1] tracking-tighter text-neutral-950">
            From sign-up to co-owner.<br />
            <span className="text-primary italic">Four flows. Five minutes.</span>
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed mt-2 font-sans font-normal">
            Every step is KYC-verified, legally registered, and blockchain-secured. Here's exactly how OwnMyLand works.
          </p>
        </div>

        <div id="ownmyland-works-tabs" className="sticky bottom-8 z-40 my-8">
          <div className="flex gap-1.5 bg-white border border-neutral-200/80 rounded-full p-2 w-fit mx-auto shadow-xl shadow-primary/5 backdrop-blur-md items-center">
            {TAB_ITEMS.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeTab === i;
              return (
                <button
                  key={item.label}
                  id={`ownmyland-tab-${item.label.toLowerCase()}`}
                  onClick={() => scrollToSection(i)}
                  className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer select-none ${isActive ? 'text-white' : 'text-neutral-500 hover:text-black hover:bg-neutral-100/50'}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-bg-ownmyland"
                      className="absolute inset-0 rounded-full bg-primary -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-neutral-700'}`} />
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden whitespace-nowrap block text-[11px] uppercase tracking-wider font-mono font-bold"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>

        <div id="ownmyland-works-flows-list" className="flex flex-col">
          {flows.map((flow, i) => (
            <div
              key={flow.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              style={{ scrollMarginTop: 'calc(var(--header-height) + 110px)' }}
            >
              <FlowSection flow={flow} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
