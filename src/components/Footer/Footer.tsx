import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <span className="logo-text">Antony Hyson</span>
              <span className="logo-accent">Seltran</span>
            </div>
            <p className="footer-description">
              Cybersecurity Analyst & Ethical Hacker passionate about protecting digital landscapes.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4 className="footer-section-title">Navigation</h4>
              <ul className="footer-nav">
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-section-title">Connect</h4>
              <ul className="footer-nav">
                <li>
                  <a href="https://www.linkedin.com/in/antonyhysonseltran" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Antonyhyson" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="mailto:work.antonyhyson@gmail.com">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <motion.button
            className="scroll-to-top"
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 Antony Hyson Seltran. Made with <Heart size={16} className="heart-icon" /> using React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;