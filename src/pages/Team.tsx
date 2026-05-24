import { motion } from 'motion/react';
import { Mail, Linkedin, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Team = () => {
  const leaders = [
    {
      name: 'Dr.Uday Kiran Lingipalli',
      role: 'Founder & CEO',
      bio: 'Final-year medical student turned infrastructure founder. Spent 5 months mapping every UDS regulatory requirement, governmental mutation phase, and registration protocol under India\'s Registration Bill 2025. Previously built Chikitsaaa to 30,000 monthly visitors. Combines thorough verification with execution.',
      location: 'Visakhapatnam, India',
      linkedin: 'https://linkedin.com',
      image: 'https://lh3.googleusercontent.com/d/1q2uYqrtvrfSbTMcPkhdF_OSZw30NgGhF'
    },
    {
      name: 'Vishal D Mehta',
      role: 'CFO, Versatile Arm Group',
      bio: 'Ex- Apollo Global Management, Inc. CRE analyst 2022 to 2025. Expert in financial strategy, compliance architecture, and CRE fund dynamics. Co-architect of the group\'s financial model.',
      location: 'Chennai / Pan India',
      linkedin: 'https://www.linkedin.com/in/vishal-d-mehta-8a8b10165/',
      image: 'https://lh3.googleusercontent.com/d/1RtLGWgHOFs1QjaLj18R809EfEprMB9OJ'
    },
    {
      name: 'Chiranjeevi Lingipalli',
      role: 'Co-Founder',
      bio: 'Driving the operational excellence and strategic growth of the group\'s portfolio companies. Focused on building scalable infrastructure for the fractional land ownership revolution.',
      location: 'Visakhapatnam, India',
      linkedin: 'https://linkedin.com',
      image: 'https://lh3.googleusercontent.com/d/17wrDaWpeHrGtBls0fr05gT7YRCieWz13'
    }
  ];

  const advisors = [
    {
      name: 'Utkarsh Girish Chourasiya',
      role: 'Co-Founder of BLV',
      bio: 'Strategic mentorship on business lifecycle and scaling within the digital asset ecosystem.',
      image: 'https://lh3.googleusercontent.com/d/1HhRcOWDhOruPE78M_yagqjyCzn2lLvBd'
    },
    {
      name: 'Vinay Kumar Chittiboyina',
      role: 'Analyst',
      bio: 'Sales & Business Analytics Advisor. Data-driven growth strategies for PropTech platforms.',
      image: 'https://lh3.googleusercontent.com/d/1c5aL0TuD6pDTMlOrgjM58s5Yiu5qR3jX'
    },
    {
      name: 'Palagiri Avinash Kumar Reddy',
      role: 'Business Growth Strategist',
      bio: 'Specialising in ecosystem partnerships, strategic market penetration, expanding distribution networks, and orchestrating brand positioning for high-performance scale.',
      image: 'https://lh3.googleusercontent.com/d/1vF4hHIi-3QdNAXyl8EbDQtk5Cs9RUT4t'
    }
  ];

  const engineers = [
    {
      name: 'Patel Kashyap Bharatkumar',
      role: 'Full-Stack Engineer',
      bio: 'Focused on high-performance transactional design, secure user interfaces, and dual-rail synchronization.',
      image: 'https://lh3.googleusercontent.com/d/1Up4YLutBi2lPn89NX2Dc1czKFJtmy-t3'
    },
    {
      name: 'Gogari Rajkumar Arvindbhai',
      role: 'Full-Stack Engineer',
      bio: 'Specializing in reliable legal process automation portals, document encryption vaults, and live databases.',
      image: 'https://lh3.googleusercontent.com/d/1oMgqMqrhN5C92ltQSa79vDeUELjGfyct'
    }
  ];

  const partners = [
    {
      name: 'Blackleo Ventures',
      role: 'Venture Capital Partner',
      image: 'https://lh3.googleusercontent.com/d/1aukT6na5rn5H2ZmfjXK0H4jY_hYwq40P'
    },
    {
      name: 'VGK Geo Build',
      role: 'Land Surveys Partner',
      image: 'https://lh3.googleusercontent.com/d/1nM8bnQS76J5gmpYLNi4vUuM4YH2bV-o6'
    }
  ];

  const investors = [
    {
      name: 'Dr. Kari Kalyan Kumar',
      role: 'Pre-Seed Investor',
      bio: 'Strategic investor supporting the group\'s mission to democratize land ownership. Providing key capital and industrial insight during the pre-seed stage of VLands.',
      image: 'https://lh3.googleusercontent.com/d/1u8xQWomBmpFfVcoXZg1H2xbV_juhz5n9'
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 bg-surface" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container no-prose">
          <span className="section-label">The People</span>
          <h1 className="text-[clamp(1.5rem,5vw,4rem)] font-display font-medium leading-[var(--leading-display)] tracking-tighter text-neutral-950">
            Architects of the <span className="text-primary italic">Right.</span>
          </h1>
        </div>
      </section>

      {/* Leadership: Editorial Grid */}
      <section className="section bg-neutral-900 text-white overflow-hidden relative" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container no-prose flex flex-col gap-24 w-full">
          <div className="flex flex-col gap-4">
             <span className="text-label text-accent font-bold">Executive Leadership</span>
             <h2 className="text-4xl md:text-5xl font-display leading-[var(--leading-title)] tracking-tighter italic" style={{ color: '#fff7f7' }}>Founding Team</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {leaders.map((person, i) => (
              <motion.div 
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent/30 hover:bg-white/8 transition-all duration-300 flex flex-col gap-8 group"
              >
                <div className="aspect-[4/5] bg-neutral-800 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative group/img">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-primary/10 opacity-40 group-hover/img:opacity-0 transition-opacity" />
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-dark opacity-0 group-hover/img:opacity-100 translate-y-4 group-hover/img:translate-y-0 transition-all duration-500 hover:bg-accent ring-4 ring-white/10">
                    <Linkedin size={20} />
                  </a>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl md:text-3xl font-display font-bold group-hover:text-accent transition-colors">{person.name}</h3>
                    <span className="text-label text-primary font-bold">{person.role}</span>
                  </div>
                  <p className="text-neutral-400 text-sm leading-[1.6] italic line-clamp-4 group-hover:text-neutral-300 transition-colors">{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product & Engineering Team */}
      <section className="section bg-surface border-y border-neutral-100 overflow-hidden" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container no-prose flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col gap-4">
             <span className="section-label">Technical Core</span>
             <h2 className="text-3xl md:text-4xl font-display font-bold italic tracking-tighter leading-[var(--leading-title)]">Product & Engineering</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl">
            {engineers.map((engineer, i) => (
              <motion.div 
                key={engineer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-neutral-200 rounded-3xl p-8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col sm:flex-row gap-8 items-start group"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-neutral-100 overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all border border-neutral-200 p-1 bg-white ring-4 ring-neutral-50 shadow-sm relative">
                  <img src={engineer.image} alt={engineer.name} className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-2xl font-bold font-display group-hover:text-primary transition-colors text-neutral-950">{engineer.name}</h3>
                  <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest">{engineer.role}</span>
                  <p className="text-neutral-500 text-sm leading-relaxed mt-2">{engineer.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors & Partners: Minimal Grid */}
      <section className="section bg-white overflow-hidden" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container no-prose flex flex-col gap-24 md:gap-32">
           {/* Advisors */}
           <div className="flex flex-col gap-12 md:gap-16">
              <div className="flex flex-col gap-4">
                 <span className="section-label">The Council</span>
                 <h2 className="text-3xl md:text-4xl font-display font-bold italic tracking-tighter leading-[var(--leading-title)]">Advisory Board</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-12">
                 {advisors.map((advisor, i) => (
                   <div key={i} className="flex gap-8 group">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-neutral-100 overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all border border-neutral-100 p-1 bg-white ring-4 ring-neutral-50 shadow-sm">
                         <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col gap-2">
                         <h4 className="text-xl md:text-2xl font-bold font-display group-hover:text-primary transition-colors">{advisor.name}</h4>
                         <span className="text-label text-primary font-bold">{advisor.role}</span>
                         <p className="text-neutral-500 text-sm leading-[1.6] italic mt-2 group-hover:text-neutral-700 transición-colors">"{advisor.bio}"</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Partners */}
           <div className="flex flex-col gap-12 md:gap-16">
              <div className="flex flex-col gap-4">
                 <span className="section-label">Ecosystem</span>
                 <h2 className="text-3xl md:text-4xl font-display font-bold italic tracking-tighter">Partnered Companies</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                 {partners.map((partner, i) => (
                   <div key={i} className="bg-surface border border-neutral-100 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col items-center gap-6 group">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl p-4 shadow-sm border border-neutral-100 group-hover:scale-110 transition-transform flex items-center justify-center">
                         <img src={partner.image} alt={partner.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-center flex flex-col gap-1">
                         <h5 className="font-bold text-neutral-900">{partner.name}</h5>
                         <span className="text-label text-neutral-400 font-bold">{partner.role}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="section bg-neutral-900 border-t border-white/5 overflow-hidden" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container no-prose flex flex-col items-center gap-16 text-center">
          <div className="flex flex-col gap-4">
             <span className="text-label text-accent font-bold italic">The Backing</span>
             <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-[var(--leading-title)] tracking-tighter">Our Investors</h2>
          </div>
          
          <div className="w-full">
            {investors.map((investor, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-2xl flex flex-col items-center gap-10"
              >
                <div className="relative group">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-primary p-1">
                    <img src={investor.image} alt={investor.name} className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 group-hover:bg-accent/20 transition-all" />
                </div>
                <div className="flex flex-col gap-4">
                   <h3 className="text-2xl md:text-3xl font-display font-medium text-white italic leading-[1.2]">"{investor.bio}"</h3>
                   <div className="flex flex-col items-center gap-1 mt-4">
                      <span className="text-xl md:text-2xl font-bold font-display" style={{ color: '#ffffff' }}>{investor.name}</span>
                      <span className="text-label text-primary font-bold">{investor.role}</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Tribe CTA */}
      <section className="section bg-white" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="container no-prose">
          <div className="w-full max-w-4xl mx-auto bg-neutral-900 text-white p-12 md:p-20 rounded-2xl text-center flex flex-col items-center gap-10 overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-125" />
            <div className="w-full flex flex-col gap-4 relative z-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold italic tracking-tighter leading-[var(--leading-title)]" style={{ color: '#fffcfc' }}>Building the infrastructure for Bharat.</h2>
                <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-[var(--leading-body)]">We look for deep-tech engineers, legal innovators, and product designers who want to dismantle friction.</p>
            </div>
            <Link to="/careers" className="z-10 btn-cta bg-accent text-primary-dark">
                Join the Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
