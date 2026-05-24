import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight, ExternalLink, ShieldCheck, Zap, Users, CheckCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';

const WhatsAppIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    className={className} 
    fill="currentColor"
  >
    <path d="M12.012 2c-5.506 0-9.97 4.463-9.97 9.969 0 1.761.458 3.477 1.332 4.99L2 22l5.163-1.353c1.464.798 3.111 1.22 4.843 1.22 5.508 0 9.97-4.463 9.97-9.969C21.976 6.463 17.512 2 12.012 2zm4.7 13.922c-.254.717-1.464 1.34-2.022 1.428-.483.076-1.11.139-3.21-.722-2.654-1.09-4.321-3.791-4.453-3.967-.132-.176-1.077-1.433-1.077-2.735 0-1.302.684-1.944.927-2.21.243-.266.529-.333.707-.333.178 0 .356.002.509.01.157.008.368-.06.576.438.21.503.717 1.758.78 1.884.063.125.105.271.021.438-.084.167-.125.271-.25.417-.125.146-.263.327-.376.439-.125.126-.255.263-.11.512.146.248.647 1.07 1.385 1.725.952.846 1.751 1.109 2.001 1.235.25.126.396.104.542-.063.146-.167.625-.73 1.011-1.282.203-.292.406-.25.683-.146l2.126 1.002c.277.135.459.203.528.321.069.118.069.684-.185 1.401z" />
  </svg>
);

const intents = [
  { id: 'General', label: 'General Inquiry', icon: <MessageCircle size={18} />, placeholder: 'How can we help you?' },
  { id: 'Investor', label: 'Investor Relations', icon: <Zap size={18} />, placeholder: "Hi VAG team, I'm interested in discussing the Pre-Seed round. My investment focus is..." },
  { id: 'Landowner', label: 'Landowner', icon: <MapPin size={18} />, placeholder: 'Hi, I have land I\'d like to list. Property details: Location: ___, Size: ___ Acres, Type: ___' },
  { id: 'Partnership', label: 'Partnership', icon: <Users size={18} />, placeholder: 'Let\'s collaborate. I represent a...' },
  { id: 'Press', label: 'Press / Media', icon: <ExternalLink size={18} />, placeholder: 'Media inquiry regarding...' },
];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const initialIntentParam = searchParams.get('intent');
  const fromParam = searchParams.get('from'); // 'vlands' or 'ownmyland'
  
  const initialIntent = intents.some(i => i.id.toLowerCase() === initialIntentParam?.toLowerCase())
    ? intents.find(i => i.id.toLowerCase() === initialIntentParam?.toLowerCase())?.id || 'Investor'
    : 'Investor';

  const [activeIntent, setActiveIntent] = useState(initialIntent);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    intent: initialIntent
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const intentObj = intents.find(i => i.id === activeIntent);
    if (intentObj) {
      setFormState(prev => ({ 
        ...prev, 
        intent: activeIntent,
        message: intentObj.id === 'General' ? '' : intentObj.placeholder,
        subject: intentObj.id === 'General' ? '' : `${intentObj.label} Enquiry`
      }));
    }
  }, [activeIntent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Save to Supabase
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          intent: activeIntent,
        });

      if (dbError) throw new Error('Failed to save your message. Please try again.');

      // 2. Send email via EmailJS
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            name: formState.name,
            from_name: formState.name,
            email: formState.email,
            from_email: formState.email,
            reply_to: formState.email,
            subject: formState.subject,
            message: formState.message,
            intent: activeIntent,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } catch (emailErr: any) {
        console.error('EmailJS error:', JSON.stringify(emailErr));
        throw new Error(`EmailJS failed: ${emailErr?.text || emailErr?.message || JSON.stringify(emailErr)}`);
      }

      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSidebarContent = () => {
    switch (activeIntent) {
      case 'Investor':
        // If client came from vlands deep-dive
        if (fromParam === 'vlands') {
          return (
            <div className="flex flex-col gap-8">
               <div className="p-6 bg-primary-dark rounded-2xl border border-white/10 flex flex-col gap-4">
                  <span className="text-accent font-mono text-[10px] font-bold uppercase tracking-widest">VLands Pre-Seed Status</span>
                  <h4 className="text-xl font-display font-medium text-white">Actively raising.</h4>
                  <p className="text-neutral-400 text-sm">₹2.5–₹3 Cr target round. 12 -month runway for VLands to develop Team and MVP ready.</p>
                  <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                     <Link to="/pitch/vlands" className="text-accent text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        View Pitch Deck <ArrowRight size={14} />
                     </Link>
                     <a href="https://wa.me/918143805888" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        WhatsApp Founder <ExternalLink size={14} />
                     </a>
                  </div>
               </div>
            </div>
          );
        }
        
        // If client came from ownmyland deep-dive
        if (fromParam === 'ownmyland') {
          return (
            <div className="flex flex-col gap-8">
               <div className="p-6 bg-[#002d24] rounded-2xl border border-white/10 flex flex-col gap-4">
                  <span className="text-accent font-mono text-[10px] font-bold uppercase tracking-widest">OwnMyLand Pre-Seed Status</span>
                  <h4 className="text-xl font-display font-medium text-white">Actively raising.</h4>
                  <p className="text-neutral-400 text-sm">₹75L–₹1.5 Cr target round. 10 -month runway for OwnMyLand MVP scale-up.</p>
                  <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                     <Link to="/pitch/ownmyland" className="text-accent text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        View Pitch Deck <ArrowRight size={14} />
                     </Link>
                     <a href="https://wa.me/918143805888" target="_blank" rel="noopener noreferrer" className="text-white text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        WhatsApp Founder <ExternalLink size={14} />
                     </a>
                  </div>
               </div>
            </div>
          );
        }

        // Direct access: Show both company asks
        return (
          <div className="flex flex-col gap-6">
              <div className="p-6 bg-primary-dark rounded-2xl border border-white/10 flex flex-col gap-3">
                 <span className="text-accent font-mono text-[10px] font-bold uppercase tracking-widest">VLands Pre-Seed</span>
                 <h4 className="text-lg font-display font-medium text-white">Actively raising.</h4>
                 <p className="text-neutral-400 text-xs leading-relaxed">₹2.5–₹3 Cr target round. 12 -month runway for VLands to develop Team and MVP ready.</p>
                 <div className="pt-3 border-t border-white/10 flex gap-4 text-xs font-bold justify-between">
                    <Link to="/pitch/vlands" className="text-accent hover:underline flex items-center gap-1">
                       Pitch Deck <ArrowRight size={12} />
                    </Link>
                    <a href="https://wa.me/918143805888" target="_blank" rel="noopener noreferrer" className="text-white hover:underline flex items-center gap-1">
                       WhatsApp <ExternalLink size={12} />
                    </a>
                 </div>
              </div>

              <div className="p-6 bg-[#0E352C] rounded-2xl border border-white/10 flex flex-col gap-3">
                 <span className="text-accent font-mono text-[10px] font-bold uppercase tracking-widest">OwnMyLand Pre-Seed</span>
                 <h4 className="text-lg font-display font-medium text-white">Actively raising.</h4>
                 <p className="text-neutral-400 text-xs leading-relaxed">₹75L–₹1.5 Cr target round. 10 -month runway for OwnMyLand MVP scale-up.</p>
                 <div className="pt-3 border-t border-white/10 flex gap-4 text-xs font-bold justify-between">
                    <Link to="/pitch/ownmyland" className="text-accent hover:underline flex items-center gap-1">
                       Pitch Deck <ArrowRight size={12} />
                    </Link>
                    <a href="https://wa.me/918143805888" target="_blank" rel="noopener noreferrer" className="text-white hover:underline flex items-center gap-1">
                       WhatsApp <ExternalLink size={12} />
                    </a>
                 </div>
              </div>
          </div>
        );
      case 'Landowner':
        return (
          <div className="flex flex-col gap-8">
             <div className="p-6 bg-neutral-800 rounded-2xl border border-white/5 flex flex-col gap-4">
                <h4 className="text-xl font-display font-medium text-white">Listing Parameters</h4>
                <ul className="text-sm text-neutral-400 flex flex-col gap-3">
                   <li className="flex items-center gap-2"><CheckCircle size={14} className="text-accent font-bold" /> Min 10 acres (VLands)</li>
                   <li className="flex items-center gap-2"><CheckCircle size={14} className="text-accent font-bold" /> Min 1 acre (OwnMyLand)</li>
                   <li className="flex items-center gap-2"><CheckCircle size={14} className="text-accent" /> 25-Day Onboarding SLA</li>
                </ul>
             </div>
          </div>
        );
      case 'Partnership':
        return (
          <div className="flex flex-col gap-8">
             <div className="flex flex-col gap-2">
                <h4 className="text-neutral-500 font-bold text-xs uppercase tracking-widest">Partnership Types</h4>
                <div className="flex flex-wrap gap-2 pt-2">
                   {['Developer', 'Distribution', 'Tech', 'Legal'].map(t => (
                     <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-xs rounded-full">{t}</span>
                   ))}
                </div>
             </div>
             <p className="text-neutral-400 text-sm italic">"We're building the infrastructure layer for land. Let's engineer the future of asset liquidity together."</p>
          </div>
        );
      case 'Press':
        return (
          <div className="flex flex-col gap-6">
             <h4 className="text-white font-display text-xl">Media Kit 2026</h4>
             <p className="text-neutral-400 text-sm">Access high-res brand assets, founder headshots, and our recent milestones report.</p>
             <button className="text-accent font-bold text-sm bg-accent/10 px-4 py-2 rounded-lg w-fit">Request Media Kit</button>
          </div>
        );
      default:
        return (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <a href="https://wa.me/918143805888" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><WhatsAppIcon size={18} /></div>
                <span>+91 81438 05888</span>
              </a>
              <div className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Mail size={18} /></div>
                <span className="text-sm md:text-base">info@versatilearm.com</span>
              </div>
              
              <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold">Address</span>
                <div className="flex items-start gap-4 text-neutral-400 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0"><MapPin size={18} /></div>
                  <span className="text-sm leading-relaxed">30-15-109/1, Near Reliance Trends, Main Road, Daba Gardens, Visakhapatnam, Andhra Pradesh, 530020</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-12 pb-16 bg-surface border-b border-neutral-100">
        <div className="container no-prose">
          <span className="section-label mb-6 block">Contact Us</span>
          <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-[var(--leading-title)] italic">
            Start a <br /><span className="text-primary not-italic">Conversation.</span>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container no-prose grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest">How can we help?</p>
              <div className="flex flex-wrap gap-3">
                {intents.map((intent) => (
                  <button
                    key={intent.id}
                    onClick={() => setActiveIntent(intent.id)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeIntent === intent.id ? 'bg-primary text-white border-primary' : 'bg-surface text-neutral-500 border border-neutral-100'
                    }`}
                  >
                    {intent.label}
                  </button>
                ))}
              </div>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface border border-primary/20 p-12 rounded-2xl text-center flex flex-col items-center gap-10 shadow-2xl"
              >
                <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center">
                  <CheckCircle size={48} />
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="text-4xl font-display font-medium text-neutral-950 italic tracking-tighter">Message Received.</h2>
                  <p className="text-neutral-600 text-xl leading-[1.6] max-w-md">Your message has been sent. Uday or a team member will reach out within 48 hours.</p>
                </div>
                <button onClick={() => setSubmitted(false)} className="text-primary font-bold hover:underline">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Full Name *</label>
                  <input type="text" required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} className="border-b border-neutral-200 py-4 outline-none focus:border-primary transition-colors bg-transparent text-lg" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Email Address *</label>
                  <input type="email" required value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="border-b border-neutral-200 py-4 outline-none focus:border-primary transition-colors bg-transparent text-lg" placeholder="john@example.com" />
                </div>
                
                {/* Subject field added above the message */}
                <div className="col-span-full flex flex-col gap-3">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Subject *</label>
                  <input type="text" required value={formState.subject} onChange={e => setFormState({...formState, subject: e.target.value})} className="border-b border-neutral-200 py-4 outline-none focus:border-primary transition-colors bg-transparent text-lg w-full" placeholder="Investment Enquiry / Partnership / Listing my land etc." />
                </div>

                <div className="col-span-full flex flex-col gap-3">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Message *</label>
                  <textarea required value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} rows={4} className="border border-neutral-200 p-6 rounded-2xl outline-none focus:border-primary transition-colors bg-surface resize-none text-lg leading-[1.6]" placeholder="Tell us about your query..."></textarea>
                </div>

                {submitError && (
                  <p className="col-span-full text-red-500 text-sm text-center">{submitError}</p>
                )}

                {/* Optimised Submit Enquiry CTA */}
                <button 
                  disabled={isSubmitting} 
                  type="submit" 
                  className="col-span-full py-5 px-8 rounded-xl font-display font-medium text-lg text-white bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                  style={{ cursor: 'pointer' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending Enquiry...
                    </span>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200 text-accent" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-4 bg-neutral-900 rounded-4xl p-10 text-white flex flex-col gap-10 shadow-2xl h-fit lg:sticky lg:top-32">
             <div className="flex flex-col gap-4">
                <span className="section-label text-accent font-bold">Context</span>
                <h3 className="text-3xl font-display font-medium tracking-tighter italic text-white" style={{ color: '#ffffff' }}>VAG Core Hub</h3>
             </div>
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeIntent}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3 }}
               >
                 {renderSidebarContent()}
               </motion.div>
             </AnimatePresence>
             <div className="pt-10 border-t border-white/10 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">Operating Hours</span>
                   <span className="text-sm font-medium">Mon — Fri: 09:00 — 18:00 IST</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">Response Target</span>
                   <span className="text-sm font-medium">&lt; 24 Hours</span>
                </div>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
