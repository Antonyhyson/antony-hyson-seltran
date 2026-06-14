import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './styles/globals.css';
import './app.css';

const BASE = import.meta.env.BASE_URL;

const SKILLS = [
  { cat: 'Cyber Essentials / CE+ Auditing', pct: 95 },
  { cat: 'Compliance & Gap Analysis', pct: 93 },
  { cat: 'Technical Verification & Testing', pct: 90 },
  { cat: 'Risk Assessment', pct: 90 },
  { cat: 'Security Awareness Training', pct: 92 },
  { cat: 'Strategy', pct: 90 },
  { cat: 'Endpoint & Systems Security', pct: 85 },
  { cat: 'Vulnerability Assessment', pct: 85 },
  { cat: 'Network Security', pct: 85 },
  { cat: 'Problem Solving', pct: 95 },
];

const CERTS = [
  { name: 'Cyber Essential Assessor', url: 'https://registry.blockmarktech.com/certificates/2f2806d9-f14e-4be5-a34a-6093d8beb73d/?share_key=c-5onhW4HhBnK4nmKkP5gb8LlfoVZIQ9NsQw2OdD_NE' },
  { name: 'IT Security Foundations: Core Concepts', url: null },
  { name: 'Mastercard – Cybersecurity Job Simulation', url: null },
  { name: 'AIG – Shields Up: Cybersecurity Job Simulation', url: null },
  { name: 'AI Governance Certification', url: null },
  { name: 'Introduction to Cybersecurity (Cisco)', url: null },
  { name: 'Networking Basics (Cisco)', url: null },
  { name: 'PrivacyOps Certification', url: null },
  { name: 'ISC2 CC Online Self-Paced Training', url: null },
  { name: 'Datacom Cybersecurity Simulation', url: null },
];

const TIMELINE = [
  {
    role: 'CE/CE+ Compliance Consultant',
    company: 'Risk Crew',
    location: 'London, UK',
    period: 'Jun 2025 – Present',
    cyber: true,
    points: [
      'End-to-end CE consultancy — guiding clients through the Cyber Essentials questionnaire with accurately documented technical controls',
      'Technical CE+ auditing — performing rigorous verification and testing for full compliance',
      'Gap analysis and remediation strategy to strengthen security posture and achieve certification',
      'Translating complex security requirements into clear, actionable business steps',
    ],
  },
  {
    role: 'Cyber Security Consultant',
    company: 'Freelance',
    location: 'London, UK',
    period: 'Aug 2023 – May 2025',
    cyber: true,
    points: [
      'Troubleshooting and system administration for small businesses and individual clients',
      'Endpoint management, security updates, and software installations',
      'Customer training on IT best practices and cybersecurity awareness',
    ],
  },
  {
    role: 'Student Intern',
    company: 'CyberHakz Pvt-Ltd',
    location: 'Chennai, India',
    period: 'Mar 2022',
    cyber: true,
    points: [
      'Early hands-on exposure to live cybersecurity operations within a professional security firm',
    ],
  },
  {
    role: 'Sales Partner',
    company: 'John Lewis & Partners',
    location: 'Exeter, UK',
    period: 'Nov 2023 – Jan 2024',
    cyber: false,
    points: [
      'Increased overall holiday sales by 20% through targeted sales strategies',
      'Reduced product restocking time by 30% via streamlined inventory systems',
      'Boosted average transaction value by 15% through personalised recommendations',
    ],
  },
  {
    role: 'Front of House (from Food Runner)',
    company: 'The George Public House',
    location: 'Greater London, UK',
    period: 'Oct 2024 – May 2025',
    cyber: false,
    points: ['Progressed from Food Runner to Front of House', 'Built communication and high-pressure multitasking skills in a fast-paced hospitality environment'],
  },
  {
    role: 'Student Brand Ambassador',
    company: 'Amber',
    location: 'Newark, DE, USA',
    period: 'Jul 2023 – Apr 2025',
    cyber: false,
    points: ['Represented Amber to international students, promoting student accommodation services', 'Built outreach campaigns across university networks'],
  },
  {
    role: 'Freelance Photographer',
    company: 'Self-Employed',
    location: 'London, UK',
    period: 'Mar 2019 – May 2025',
    cyber: false,
    points: ['Six years of freelance photography work across London and internationally', 'Full portfolio available — see the Photography link in the navigation'],
  },
];

const PROJECTS = [
  { title: 'Network Anomaly Detection System', desc: 'ML-powered detection using Random Forest, MLP, and XGBoost across benchmark datasets.', tags: ['Python', 'XGBoost', 'Random Forest'], image: BASE + 'assets/NADS.png', github: 'https://github.com/Antonyhyson/Development-of-a-Network-Anomaly-Detection-System-for-Enhanced-Cybersecurity.git', cat: 'ML / Security' },
  { title: 'Solana Blockchain Voting Protocol', desc: 'Decentralized voting on Solana achieving 1,000+ TPS with cryptographic integrity.', tags: ['Solana', 'Rust', 'Smart Contracts'], image: BASE + 'assets/Solana.png', github: 'https://github.com/Antonyhyson/Basic-Voting-System-Using-Blockchain.git', cat: 'Blockchain' },
  { title: 'EXIF Metadata Analysis Tool', desc: 'Forensics tool for rapid image metadata extraction — cut investigation time by 60%.', tags: ['Python', 'Digital Forensics'], image: BASE + 'assets/EXIF.png', github: 'https://github.com/Antonyhyson/EXIFTOOL.git', cat: 'Forensics' },
  { title: 'Product Availability Checker', desc: 'Cross-platform mobile app with 30% engagement uplift and 95% positive feedback.', tags: ['React Native', 'JavaScript'], image: BASE + 'assets/PAC.png', github: 'https://github.com/Antonyhyson/PRODUCT-AVAILABILITY-CHECKER.git', cat: 'Mobile' },
  { title: 'Caesar Cipher Decryption Tool', desc: 'Python implementation of Caesar Cipher and ROT13 decryption.', tags: ['Python', 'Cryptography'], image: BASE + 'assets/ROT13.png', github: 'https://github.com/Antonyhyson/DecryptingCaesarCipher-Rot13.git', cat: 'Cryptography' },
  { title: 'Educational Keylogger', desc: 'Research-focused keylogger for educational security analysis.', tags: ['Python', 'Research'], image: BASE + 'assets/Keylogger.png', github: 'https://github.com/Antonyhyson/Keylogger.git', cat: 'Research' },
];

// ── BOOT ──────────────────────────────────────────────────────────────────────
const BOOT_LINES = [
  '> initialising threat.ops.centre v2.4.1 ...',
  '> loading operator profile ...',
  '> identity: ANTONY HYSON SELTRAN',
  '> clearance: CE/CE+ COMPLIANCE CONSULTANT · TECHNICAL AUDITOR',
  '> location: LONDON, UK',
  '> status: ACTIVE',
  '> welcome. access granted.',
];

const BootSequence: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < BOOT_LINES.length) {
        const line = BOOT_LINES[i];
        i++;
        setLines(prev => [...prev, line]);
        setTimeout(tick, i === BOOT_LINES.length ? 600 : 300);
      } else {
        setDone(true);
        setTimeout(onDone, 500);
      }
    };
    const t = setTimeout(tick, 200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="boot">
      <div className="boot-terminal">
        {lines.map((l, i) => (
          <p key={i} className={l.includes('ANTONY') ? 'boot-name' : l.includes('granted') ? 'boot-green' : ''}>
            {l}
          </p>
        ))}
        {!done && <span className="boot-cursor">█</span>}
      </div>
    </div>
  );
};

// ── NAVBAR ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = ['about', 'experience', 'skills', 'projects', 'contact'];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          AHS<span className="nav-logo-dot">.</span>
        </button>
        <ul className="nav-links">
          {NAV_ITEMS.map(id => (
            <li key={id}><button onClick={() => go(id)} className="nav-link">{id}</button></li>
          ))}
        </ul>
        <a href="https://antonyhyson.github.io/photography-portfolio/" target="_blank" rel="noopener noreferrer" className="nav-bridge">
          <span className="nav-bridge-dot" />
          photography
        </a>
        <a href={BASE + 'assets/Antony_Hyson_Seltran_CV.pdf'} target="_blank" rel="noopener noreferrer" className="nav-cta">
          resume ↗
        </a>
        <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="menu">
          <span className={open ? 'open' : ''} /><span className={open ? 'open' : ''} />
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          {NAV_ITEMS.map(id => (
            <button key={id} onClick={() => go(id)} className="nav-mobile-link">{id}</button>
          ))}
          <a href="https://antonyhyson.github.io/photography-portfolio/" target="_blank" rel="noopener noreferrer" className="nav-mobile-link">photography ↗</a>
          <a href={BASE + 'assets/Antony_Hyson_Seltran_CV.pdf'} target="_blank" rel="noopener noreferrer" className="nav-mobile-link">resume ↗</a>
        </div>
      )}
    </nav>
  );
};

// ── HERO ──────────────────────────────────────────────────────────────────────
const ROLES = ['CE/CE+ Compliance Consultant', 'Technical CE+ Auditor', 'Cyber Essentials Specialist', 'Security Compliance Advisor'];

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero" id="hero">
      <motion.div className="hero-inner container" style={{ y, opacity }}>
        <div className="hero-content">
          <p className="eyebrow">operator profile</p>
          <h1 className="hero-name">
            Antony<br /><span className="hero-name-accent">Hyson Seltran</span>
          </h1>
          <div className="hero-role-wrap">
            <span className="hero-role-prefix">→ </span>
            <AnimatePresence mode="wait">
              <motion.span key={roleIdx} className="hero-role"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
          <p className="hero-bio">
            MSc Cybersecurity Analytics (University of Exeter) · Helping organisations
            achieve Cyber Essentials and CE+ certification through technical auditing,
            gap analysis, and end-to-end compliance consultancy.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get in touch</button>
            <button className="btn-ghost" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>View work →</button>
          </div>
          <div className="hero-links">
            <a href="https://www.linkedin.com/in/antonyhysonseltran" target="_blank" rel="noopener noreferrer" className="hero-link">LinkedIn ↗</a>
            <a href="https://github.com/Antonyhyson" target="_blank" rel="noopener noreferrer" className="hero-link">GitHub ↗</a>
            <a href="https://antonyhyson.github.io/photography-portfolio/" target="_blank" rel="noopener noreferrer" className="hero-link">Photography ↗</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-wrap">
            <img src={BASE + 'assets/profile-pic.jpg'} alt="Antony Hyson Seltran" className="hero-photo" />
            <div className="hero-photo-ring" />
            <div className="hero-photo-ring hero-photo-ring--2" />
          </div>
          <div className="hero-stats">
            <div className="hero-stat hero-stat--wide">
              <span className="hero-stat-value phosphor">3+</span>
              <span className="hero-stat-label">Years in cybersecurity (overall)</span>
            </div>
            {[['1+','Years at Risk Crew'],['CE+','Certified auditor'],['MSc','Cyber Sec. Analytics'],['10+','Certs & simulations']].map(([v,l],i) => (
              <div key={i} className="hero-stat">
                <span className={`hero-stat-value${i===1?' accent':''}`}>{v}</span>
                <span className="hero-stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="hero-scroll" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="hero-scroll-line" /><span>scroll</span>
      </div>
    </section>
  );
};

// ── ABOUT ─────────────────────────────────────────────────────────────────────
const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="eyebrow">about</p>
          <div className="about-grid">
            <div className="about-text">
              <h2 className="section-h">Bridging security<br /><span className="text-indigo">frameworks & outcomes.</span></h2>
              <p className="about-body">I'm a cybersecurity professional specialising in Cyber Essentials and CE+ compliance, currently helping organisations achieve certification through my work at Risk Crew. With an MSc in Cybersecurity Analytics from the University of Exeter and hands-on experience in technical auditing, gap analysis, and end-to-end compliance consultancy, I bridge the gap between complex security frameworks and practical, actionable business outcomes.</p>
              <p className="about-body">My approach goes beyond ticking boxes — guiding clients through the full CE/CE+ journey from questionnaire to rigorous technical verification. Before compliance, I spent nearly two years as a freelance Cyber Security Consultant, helping small businesses with endpoint management, security hardening, and awareness training. Most breaches exploit behaviour, not just vulnerabilities — so I invest as much in educating teams as I do in auditing systems.</p>
              <a href={BASE + 'assets/Antony_Hyson_Seltran_CV.pdf'} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>Download CV →</a>
            </div>
            <div className="about-badges">
              {[['MSc Cybersecurity Analytics','University of Exeter'],['BEng Computer Science & Eng.','Jeppiaar SRR Engineering College'],['CE/CE+ Compliance','Certified auditor'],['Risk Crew','Current employer'],['London, UK','Current location']].map(([l,s],i) => (
                <motion.div key={i} className="about-badge" initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.1 + 0.2 }}>
                  <span className="about-badge-label">{l}</span>
                  <span className="about-badge-sub">{s}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
const Experience: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [active, setActive] = useState(0);
  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="eyebrow">experience</p>
          <h2 className="section-h" style={{ marginBottom: '3rem' }}>Professional<br /><span className="text-indigo">timeline.</span></h2>
          <div className="exp-layout">
            <div className="exp-tabs">
              {TIMELINE.map((t, i) => (
                <button key={i} className={`exp-tab${active === i ? ' active' : ''}`} onClick={() => setActive(i)}>
                  <span className="exp-tab-role">{t.role}</span>
                  <span className="exp-tab-co">{t.company}</span>
                  {t.cyber && <span className="exp-tab-pill">cyber</span>}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} className="exp-detail"
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
                <h3 className="exp-detail-role">{TIMELINE[active].role}</h3>
                <div className="exp-detail-meta">
                  <span className="exp-meta-co">{TIMELINE[active].company}</span>
                  <span className="exp-meta-sep">·</span>
                  <span>{TIMELINE[active].location}</span>
                  <span className="exp-meta-sep">·</span>
                  <span className="exp-meta-period">{TIMELINE[active].period}</span>
                </div>
                <ul className="exp-points">
                  {TIMELINE[active].points.map((p, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>{p}</motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ── SKILLS ────────────────────────────────────────────────────────────────────
const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="eyebrow">capabilities</p>
          <h2 className="section-h" style={{ marginBottom: '3rem' }}>Skills &<br /><span className="text-indigo">expertise.</span></h2>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <motion.div key={i} className="skill-row" initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.05 }}>
                <div className="skill-top"><span className="skill-name">{s.cat}</span><span className="skill-pct">{s.pct}%</span></div>
                <div className="skill-bar-bg">
                  <motion.div className="skill-bar-fill" initial={{ width: 0 }} animate={inView ? { width: `${s.pct}%` } : { width: 0 }} transition={{ duration: 1.1, delay: i * 0.05 + 0.2, ease: 'easeOut' }} />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="eyebrow" style={{ marginTop: '3rem' }}>certifications</p>
          <div className="certs-grid">
            {CERTS.map((c, i) => (
              <motion.div key={i} className="cert-chip" initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.04 + 0.3 }}>
                {c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer">{c.name} ↗</a> : <span>{c.name}</span>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ── PROJECTS ──────────────────────────────────────────────────────────────────
const Projects: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="eyebrow">projects</p>
          <h2 className="section-h" style={{ marginBottom: '3rem' }}>Selected<br /><span className="text-indigo">work.</span></h2>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <motion.div key={i} className="proj-card" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}>
                <div className="proj-img-wrap">
                  <img src={p.image} alt={p.title} className="proj-img" />
                  <div className="proj-cat">{p.cat}</div>
                </div>
                <div className="proj-body">
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tags">{p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link">View on GitHub →</a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ── CONTACT ───────────────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xldnypkg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) setForm({ name: '', email: '', message: '' });
    } catch { setStatus('error'); }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="eyebrow">contact</p>
          <div className="contact-grid">
            <div>
              <h2 className="section-h">Let's<br /><span className="text-indigo">connect.</span></h2>
              <p className="contact-blurb">Always open to connecting with security professionals, compliance-focused organisations, and anyone building safer digital environments from the inside out.</p>
              <div className="contact-info">
                <a href="mailto:work.antonyhyson@gmail.com" className="contact-info-row"><span className="contact-info-label">email</span><span>work.antonyhyson@gmail.com</span></a>
                <div className="contact-info-row"><span className="contact-info-label">location</span><span>London, United Kingdom</span></div>
                <a href="https://www.linkedin.com/in/antonyhysonseltran" target="_blank" rel="noopener noreferrer" className="contact-info-row"><span className="contact-info-label">linkedin</span><span>antonyhysonseltran ↗</span></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group"><label className="form-label">Name</label><input className="form-input" type="text" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Your name" /></div>
              <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="your@email.com" /></div>
              <div className="form-group"><label className="form-label">Message</label><textarea className="form-input form-textarea" required rows={5} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="What's on your mind?" /></div>
              <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center' }}>
                {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message sent ✓' : 'Send message'}
              </button>
              {status === 'error' && <p className="form-error">Something went wrong — try emailing directly.</p>}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <span className="footer-logo">AHS<span className="nav-logo-dot">.</span></span>
      <span className="footer-copy">© 2025 Antony Hyson Seltran · London, UK</span>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/antonyhysonseltran" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/Antonyhyson" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://antonyhyson.github.io/photography-portfolio/" target="_blank" rel="noopener noreferrer">Photography</a>
      </div>
    </div>
  </footer>
);

// ── 3D BACKGROUND (inline, no separate import) ────────────────────────────────
const ParticleBackground: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', resize);

    const mouse = { x: W / 2, y: H / 2 };
    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouse);

    const N = 80;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx + (mouse.x - W/2) * 0.0002;
        n.y += n.vy + (mouse.y - H/2) * 0.0002;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist/160)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99,102,241,0.7)';
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
};

// ── APP ───────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const onDone = useCallback(() => setBooted(true), []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#050508', color: '#e8e8f0' }}>
      <ParticleBackground />

      {!booted && <BootSequence onDone={onDone} />}

      <div style={{ position: 'relative', zIndex: 1, opacity: booted ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Navbar />
        <main>
          <Hero />
          <div className="rule container" />
          <About />
          <div className="rule container" />
          <Experience />
          <div className="rule container" />
          <Skills />
          <div className="rule container" />
          <Projects />
          <div className="rule container" />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
