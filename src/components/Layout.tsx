import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Mail, Phone, Linkedin, Twitter, ArrowUp, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { VAGLogo } from './VAGLogo';

const WhatsAppIcon = ({ size = 16, className = "", style = {} }: { size?: number, className?: string, style?: React.CSSProperties }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    className={className} 
    fill="currentColor"
    style={style}
  >
    <path d="M12.012 2c-5.506 0-9.97 4.463-9.97 9.969 0 1.761.458 3.477 1.332 4.99L2 22l5.163-1.353c1.464.798 3.111 1.22 4.843 1.22 5.508 0 9.97-4.463 9.97-9.969C21.976 6.463 17.512 2 12.012 2zm4.7 13.922c-.254.717-1.464 1.34-2.022 1.428-.483.076-1.11.139-3.21-.722-2.654-1.09-4.321-3.791-4.453-3.967-.132-.176-1.077-1.433-1.077-2.735 0-1.302.684-1.944.927-2.21.243-.266.529-.333.707-.333.178 0 .356.002.509.01.157.008.368-.06.576.438.21.503.717 1.758.78 1.884.063.125.105.271.021.438-.084.167-.125.271-.25.417-.125.146-.263.327-.376.439-.125.126-.255.263-.11.512.146.248.647 1.07 1.385 1.725.952.846 1.751 1.109 2.001 1.235.25.126.396.104.542-.063.146-.167.625-.73 1.011-1.282.203-.292.406-.25.683-.146l2.126 1.002c.277.135.459.203.528.321.069.118.069.684-.185 1.401z" />
  </svg>
);

const Header = ({ headerTheme = 'dark' }: { headerTheme?: 'light' | 'dark' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleScroll();
    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const primaryLinks = [
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Team', path: '/team' },
    { name: 'Investors', path: '/investors' },
    { name: 'News', path: '/news' },
  ];

  const secondaryLinks = [
    { name: 'Mission', path: '/mission' },
    { name: 'Expertise', path: '/expertise' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const isLight = headerTheme === 'light' && !isScrolled && !isMobile;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[var(--header-height)] flex items-center bg-[#fafaf8] border-b border-neutral-200/50 shadow-sm lg:bg-transparent lg:border-none lg:shadow-none ${
        isScrolled 
          ? 'lg:bg-white/95 lg:backdrop-blur-md lg:shadow-[0_1px_0_rgba(0,0,0,0.06)] lg:border-b lg:border-neutral-200/20' 
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <VAGLogo className={`w-8 h-8 transition-colors ${
            headerTheme === 'light' && !isScrolled
              ? 'text-primary lg:text-white lg:group-hover:text-primary-light'
              : 'text-primary lg:group-hover:text-primary'
          }`} />
          <span className={`hidden sm:block font-display font-bold text-lg tracking-tight transition-colors ${
            headerTheme === 'light' && !isScrolled
              ? 'text-neutral-950 lg:text-white lg:group-hover:text-primary-light'
              : 'text-neutral-950 lg:group-hover:text-primary'
          }`}>
            Versatile Arm Group
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {primaryLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm font-medium transition-all py-2 border-b-2 ${
                  isActive 
                    ? 'text-neutral-950 font-bold border-primary' 
                    : `border-transparent hover:text-primary text-neutral-700 ${
                        headerTheme === 'light' && !isScrolled 
                          ? 'lg:text-white lg:hover:text-primary-light lg:hover:border-primary-light/50' 
                          : 'lg:text-neutral-700'
                      } ${isScrolled ? 'lg:text-neutral-700 lg:hover:text-primary' : ''}`
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link to="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button 
          className={`lg:hidden p-2 transition-colors ${
            headerTheme === 'light' && !isScrolled 
              ? 'text-neutral-950 lg:text-white' 
              : 'text-neutral-950 hover:text-primary'
          }`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#fafaf8] z-[60] lg:hidden flex flex-col pt-[var(--header-height)] overflow-hidden"
          >
            {/* Top Bar matching header layout */}
            <div className="absolute top-0 left-0 right-0 h-[var(--header-height)] px-6 flex items-center justify-between border-b border-neutral-200/50 bg-[#fafaf8]">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 group">
                <VAGLogo className="w-8 h-8 text-primary" />
                <span className="font-display font-medium text-lg tracking-tight text-neutral-950">
                  Versatile Arm Group
                </span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-neutral-950 hover:text-primary transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Scrollable list items */}
            <div className="flex-grow flex flex-col justify-start px-8 pt-8 pb-4 gap-4 overflow-y-auto mt-2">
              {[...primaryLinks, ...secondaryLinks].map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link 
                      to={link.path} 
                      className={`text-2xl sm:text-3xl font-display font-medium transition-colors block py-2 border-b border-neutral-200/20 ${
                        isActive ? 'text-primary font-bold' : 'text-neutral-950 hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Sticky Get in Touch Button */}
            <div className="p-8 border-t border-neutral-200/50 bg-[#fafaf8] sticky bottom-0">
              <Link 
                to="/contact" 
                className="btn-primary w-full text-center py-4 text-lg rounded-md block shadow-md"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate luxury API response lag
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 900);
  };

  return (
    <footer className="bg-neutral-900 text-white pt-[70px] pb-[46px] px-6" style={{ paddingTop: '70px', paddingBottom: '46px' }}>
      <div className="max-w-7xl mx-auto">
        {/* Top Statement Line */}
        <div className="flex flex-col items-center gap-6 mb-20">
          <p className="text-2xl md:text-3xl font-display italic text-center text-neutral-200 border-b border-white/10 pb-12 w-full">
            Building the infrastructure for a more equitable world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <VAGLogo className="w-8 h-8 text-primary" />
              <span className="font-display font-bold text-xl tracking-tight">Versatile Arm Group</span>
            </div>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              Sovereign infrastructure for fractional land ownership. We build the legal and digital rails for high-trust asset liquidity in India.
            </p>

            {/* Premium Investor Letters Form */}
            <div className="flex flex-col gap-3 max-w-sm p-5 border border-white/5 bg-white/[0.02] rounded-xl">
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.25em]">Investor Letters</span>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Receive monthly letters containing economic research, Indian regulatory updates on land deeds, and performance summaries direct from corporate leadership.
              </p>

              <AnimatePresence mode="wait">
                {!subscribed ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    onSubmit={handleSubscribe}
                    className="flex mt-1 border border-white/10 rounded-sm overflow-hidden focus-within:border-accent transition-colors"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter professional email"
                      className="flex-1 bg-neutral-950 px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-sans"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-accent hover:bg-white text-primary-dark px-5 py-2.5 text-xs font-bold transition-colors whitespace-nowrap uppercase tracking-wider font-sans disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Join List'}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-accent/10 border border-accent/20 rounded-sm"
                  >
                    <p className="text-xs text-accent font-bold">✓ Signed up successfully</p>
                    <p className="text-[11px] text-neutral-400 mt-1">First letter and investor prospectus are arriving in your inbox.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-4">
              {[
                { name: 'Twitter', url: 'https://x.com' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com' },
                { name: 'Instagram', url: 'https://www.instagram.com' }
              ].map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-accent transition-colors font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Company</span>
              <nav className="flex flex-col gap-4">
                <Link to="/about" className="text-neutral-300 hover:text-accent transition-colors">About Us</Link>
                <Link to="/mission" className="text-neutral-300 hover:text-accent transition-colors">Mission</Link>
                <Link to="/team" className="text-neutral-300 hover:text-accent transition-colors">Our Team</Link>
                <Link to="/careers" className="text-neutral-300 hover:text-accent transition-colors">Careers</Link>
              </nav>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Portfolio</span>
              <nav className="flex flex-col gap-4">
                <Link to="/portfolio/vlands" className="text-neutral-300 hover:text-accent transition-colors">VLands</Link>
                <Link to="/portfolio/ownmyland" className="text-neutral-300 hover:text-accent transition-colors">OwnMyLand</Link>
                <Link to="/expertise" className="text-neutral-300 hover:text-accent transition-colors">Expertise</Link>
                <Link to="/news" className="text-neutral-300 hover:text-accent transition-colors">Newsroom</Link>
              </nav>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Contact</span>
              <div className="flex flex-col gap-4">
                <a href="https://wa.me/918143805888" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-accent transition-colors flex items-center gap-2 whitespace-nowrap">
                  <WhatsAppIcon size={16} style={{ fontSize: '19px', lineHeight: '25px' }} /> +91 81438 05888
                </a>
                <a href="mailto:info@versatilearm.com" className="text-neutral-300 hover:text-accent transition-colors flex items-center gap-2 whitespace-nowrap">
                  <Mail size={16} /> info@versatilearm.com
                </a>
                
                <div className="mt-2 flex flex-col gap-2">
                  <span className="text-[10px] font-mono text-primary-light font-bold uppercase tracking-widest block">Address</span>
                  <p className="text-neutral-300 text-sm leading-relaxed max-w-sm">30-15-109/1, Near Reliance Trends, Main Road, Daba Gardens, Visakhapatnam, Andhra Pradesh, 530020</p>
                </div>
                
                <Link to="/contact" className="text-accent font-bold mt-2">Get in Touch</Link>
                <div className="flex flex-col gap-1.5 mt-4">
                  <span className="text-[10px] font-mono text-primary-light font-bold uppercase tracking-widest block">Pitch Decks</span>
                  <Link to="/pitch/vlands" className="text-neutral-400 text-xs hover:text-white transition-colors">VLands Pitch Deck</Link>
                  <Link to="/pitch/ownmyland" className="text-neutral-400 text-xs hover:text-white transition-colors">OwnMyLand Pitch Deck</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-8 justify-between items-center text-neutral-500 text-sm">
          <p>© 2026 Versatile Arm Group. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p className="font-display italic">Native-built in Bharat.</p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
          >
            Back to top <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[var(--header-height)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};
