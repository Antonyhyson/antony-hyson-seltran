import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Mail, Github, Linkedin, ChevronDown, Camera } from 'lucide-react'; // Import Camera icon
import './Hero.css';

const Hero: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handleDownloadCV = () => {
    window.open('/assets/Antony_Hyson_Seltran_CV.pdf', '_blank');
  };

  const handleContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNext = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <motion.div
        ref={ref}
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="hero-content" variants={itemVariants}>
          <motion.div className="hero-greeting" variants={itemVariants}>
            <span className="greeting-text">Hello, I'm</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="title-name">Antony Hyson</span>
            <span className="title-surname">Seltran</span>
          </motion.h1>

          <motion.div className="hero-subtitle" variants={itemVariants}>
            <span className="subtitle-role">CE/CE+ Compliance Consultant</span>
            <span className="subtitle-separator">•</span>
            <span className="subtitle-role">Cybersecurity Analyst</span>
          </motion.div>

          <motion.p className="hero-description" variants={itemVariants}>
            Passionate about safeguarding digital landscapes with expertise in
            cybersecurity analytics, ethical hacking, and network engineering.
            Committed to protecting organizations from evolving cyber threats.
          </motion.p>

          <motion.div className="hero-actions" variants={itemVariants}>
            <button className="btn btn-primary" onClick={handleDownloadCV}>
              <Download size={18} />
              Download CV
            </button>
            <button className="btn btn-secondary" onClick={handleContact}>
              <Mail size={18} />
              Contact Me
            </button>
            {/* --- THIS IS THE NEW BUTTON --- */}
            <button
              className="btn btn-secondary"
              onClick={() => window.open('https://antonyhyson.github.io/photography-portfolio/', '_blank')}
            >
              <Camera size={18} />
              Photography
            </button>
          </motion.div>

          <motion.div className="hero-social" variants={itemVariants}>
            <a
              href="https://www.linkedin.com/in/antonyhysonseltran"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/Antonyhyson"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:work.antonyhyson@gmail.com"
              className="social-link"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-image" variants={itemVariants}>
          <div className="image-container">
            <img
              src={import.meta.env.BASE_URL + 'assets/profile-pic.jpg'}
              alt="Antony Hyson Seltran"
              className="profile-image"
            />
            <div className="image-glow"></div>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        className="scroll-indicator"
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileHover={{ y: -5 }}
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
};

export default Hero;
