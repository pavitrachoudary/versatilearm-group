import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Compass, CreditCard, Briefcase, FileText } from 'lucide-react';

const navFlowImg = "https://lh3.googleusercontent.com/d/1UUChJsD2wM0KLG7ZRUDDMIxaYYLFtEQl";
const buyingFlowImg = "https://lh3.googleusercontent.com/d/1TpKD3d5L1BOOXfflqY90TKvO482CSfpb";
const portfolioImg = "https://lh3.googleusercontent.com/d/1l_Peo-Okc_88rAsOQu5I3w03COhiu3IS";
const docsImg = "https://lh3.googleusercontent.com/d/1Lxvn7B0ubu4rVe0H1Gnf0wIBVoh5JTtZ";

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
    headline: 'Everything You Need,',
    headlineGreen: 'Where You Expect It',
    subheading: 'A dashboard built for real investors — not just browsers.',
    pills: ['All-in-One Dashboard', 'Live Market Access', 'Smart Portfolio Tracking', 'Investor Governance'],
    steps: [
      { num: '1', title: 'Sign up or Login', body: 'Quick & secure login to access your dashboard and real estate portfolio.' },
      { num: '2', title: 'Dashboard', body: 'See your total net worth, rental income, and next payout date at a glance.' },
      { num: '3', title: 'Explore', body: 'Browse live land listings by city, yield, and RERA status. Filter to find your perfect plot.' },
      { num: '4', title: 'Quick Actions', body: 'Jump to Watchlists, Holdings, or My Control Hub in one tap.' },
    ],
    cta: 'Your portfolio. Your city. Your pace.',
    img: navFlowImg,
  },
  {
    id: 'buy',
    badge: 'Buying Flow',
    headline: 'Buy Real Land.',
    headlineGreen: 'In Real Minutes.',
    subheading: 'From browsing to legally owning fractional land — fully digital, fully yours.',
    pills: ['RERA Approved', 'Aadhaar Signed', 'Blockchain Recorded'],
    steps: [
      { num: '1', title: 'Select Your Plot', body: 'View price charts, drone footage, documents, and market depth before committing.' },
      { num: '2', title: 'Choose Quantity', body: 'Pick how many Sq. Yd to buy. Market, Limit, or Stop-Loss order types supported.' },
      { num: '3', title: 'Review Billing', body: 'See the complete cost breakdown: base value, stamp duty, mutation, V Lands fee, and GST. No surprises.' },
      { num: '4', title: 'Checkout & Pay', body: 'Pay from your V Lands Wallet. Confirm with your 6-digit TPIN.' },
      { num: '5', title: 'Review & e-Sign', body: 'Review your UDS Deed and Co-Ownership Agreement, then sign digitally via Aadhaar OTP.' },
      { num: '6', title: 'Trade Executed!', body: 'Ownership confirmed. View your receipt or go straight to your portfolio.' },
    ],
    cta: 'RERA approved. Aadhaar signed. Blockchain recorded.',
    img: buyingFlowImg,
  },
  {
    id: 'portfolio',
    badge: 'Portfolio & Control',
    headline: 'Own It. Track It.',
    headlineGreen: 'Control It.',
    subheading: 'Real-time portfolio management with investor governance built in.',
    pills: ['Governance at your fingertips', 'Not just returns', "You're a co-owner"],
    steps: [
      { num: '1', title: 'My Portfolio', body: 'View all your holdings: invested amount, current value, daily P&L, and rental income per asset.' },
      { num: '2', title: 'Buy More or Exit', body: 'Manage positions directly from your holdings card. Lock or unlock assets anytime.' },
      { num: '3', title: 'Document Vault', body: 'Every legal document for every property — UDS Deed, Co-Owner Agreement, Share Certificate, Payment Receipt — in one secure place.' },
      { num: '4', title: 'My Control Hub', body: "Vote in Quarterly General Meetings, raise concerns, track news and announcements. You're not just an investor — you're a co-owner." },
    ],
    cta: 'Governance at your fingertips. Not just returns.',
    img: portfolioImg,
  },
  {
    id: 'documents',
    badge: 'Document Vault',
    headline: 'Every Document.',
    headlineGreen: 'Legally Yours.',
    subheading: 'No filing cabinets. No middlemen. Just your ownership proof, secured forever.',
    pills: ['Government-Grade Legality', 'Blockchain-Backed Security', 'E-Signed & Verified', 'Always Accessible'],
    steps: [
      { num: '1', title: 'Undivided Share (UDS) Deed', body: 'Auto-generated, e-Signed, bulk-uploaded to IGR, and back-registered. Government-grade legitimacy.' },
      { num: '2', title: 'Co-Ownership Agreement', body: 'The rules of shared ownership, legally binding between all co-owners.' },
      { num: '3', title: 'Ownership Certificate', body: 'Blockchain-token backed certificate with your name, Sq. Yd count, RERA ID, and QR verification.' },
      { num: '4', title: 'Payment Receipt', body: 'Full transaction record: amount, fees, stamp duty, platform fee, and GST — timestamped and downloadable.' },
    ],
    cta: 'Scan to verify. No lawyer needed.',
    img: docsImg,
  },
];

const FlowSection = ({ flow, index }: { flow: FlowStep; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['2%', '-2%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      id={`vlands-flow-section-${flow.id}`}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center py-6 md:py-8 border-b border-neutral-100 last:border-0"
    >
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className={`relative ${isEven ? 'lg:order-first' : 'lg:order-last'}`}
      >
        <div id={`image-container-${flow.id}`} className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/5 ring-1 ring-neutral-200">
          <div className="absolute -inset-4 bg-gradient-radial from-accent/5 via-transparent to-transparent blur-2xl -z-10 rounded-3xl" />
          <img src={flow.img} alt={flow.badge} className="w-full h-auto block" loading="lazy" referrerPolicy="no-referrer" />
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
            id={`vlands-heading-${flow.id}`}
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
  { label: 'Navigation', icon: Compass },
  { label: 'Buying', icon: CreditCard },
  { label: 'Portfolio', icon: Briefcase },
  { label: 'Documents', icon: FileText },
];

export const HowVLandsWorks = () => {
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
    <section className="py-24 px-6 bg-white relative" id="how-vlands-works">
      <div className="max-w-7xl mx-auto">
        <div id="vlands-works-header" className="flex flex-col gap-4 mb-20 items-center text-center">
          <span className="section-label">How it works</span>
          <h2 className="text-5xl md:text-[3.5rem] font-display font-medium leading-[1.1] tracking-tighter text-neutral-950">
            From sign-up to co-owner.<br />
            <span className="text-primary italic">Four flows. Five minutes.</span>
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed mt-2 font-sans">
            Every step is legally binding, government-registered, and blockchain-secured. Here's exactly how it works.
          </p>
        </div>

        <div id="vlands-works-tabs" className="sticky bottom-8 z-40 my-8">
          <div className="flex gap-1.5 bg-white border border-neutral-200/80 rounded-full p-2 w-fit mx-auto shadow-xl shadow-primary/5 backdrop-blur-md items-center">
            {TAB_ITEMS.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeTab === i;
              return (
                <button
                  key={item.label}
                  id={`vlands-tab-${item.label.toLowerCase()}`}
                  onClick={() => scrollToSection(i)}
                  className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer select-none ${isActive ? 'text-white' : 'text-neutral-500 hover:text-black hover:bg-neutral-100/50'}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-bg-vlands"
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

        <div id="vlands-works-flows-list" className="flex flex-col">
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
