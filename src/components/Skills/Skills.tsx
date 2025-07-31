import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Code, Network, Lock, Award } from 'lucide-react'; // Changed AlertTriangle to Award
import './Skills.css';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const skillCategories = [
    {
      title: "Cybersecurity",
      icon: <Shield size={24} />,
      skills: [
        { name: "Penetration Testing", level: 90 },
        { name: "Vulnerability Assessment", level: 95 },
        { name: "Incident Response", level: 85 },
        { name: "Risk Assessment", level: 90 },
        { name: "Security Auditing", level: 88 }
      ]
    },
    {
      title: "Ethical Hacking",
      icon: <Lock size={24} />,
      skills: [
        { name: "Web Application Testing", level: 92 },
        { name: "Network Penetration", level: 88 },
        { name: "Social Engineering", level: 85 },
        { name: "Malware Analysis", level: 80 },
        { name: "Forensics", level: 82 }
      ]
    },
    {
      title: "Programming",
      icon: <Code size={24} />,
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 88 },
        { name: "Bash/Shell", level: 90 },
        { name: "PowerShell", level: 85 },
        { name: "SQL", level: 87 }
      ]
    },
    {
      title: "Network Security",
      icon: <Network size={24} />,
      skills: [
        { name: "Firewall Configuration", level: 90 },
        { name: "IDS/IPS", level: 88 },
        { name: "VPN Setup", level: 85 },
        { name: "Network Monitoring", level: 92 },
        { name: "Protocol Analysis", level: 87 }
      ]
    }
  ];

  const certifications = [
    { name: "Cyber Essential Assessor", url: "https://registry.blockmarktech.com/certificates/2f2806d9-f14e-4be5-a34a-6093d8beb73d/?share_key=c-5onhW4HhBnK4nmKkP5gb8LlfoVZIQ9NsQw2OdD_NE" },
    { name: "IT Security Foundations: Core Concepts", url: null },
    { name: "CISCO Ethical Hacker", url: null },
    { name: "AI Governance Certification", url: null },
    { name: "Introduction to Cybersecurity (Cisco)", url: null },
    { name: "Networking Basics (Cisco)", url: null },
    { name: "PrivacyOps Certification", url: null },
    { name: "Official ISC2 CC Online Self-Paced Training", url: null },
    { name: "AIG - Shields Up: Cybersecurity Job Simulation", url: null },
    { name: "Datacom - Cybersecurity Job Simulation", url: null },
    { name: "Mastercard - Cybersecurity Job Simulation", url: null }
  ];

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Skills & Expertise</h2>
            <p className="section-subtitle">
              Technical proficiencies and certifications that drive my cybersecurity practice
            </p>
          </motion.div>

          <div className="skills-content">
            <motion.div className="skills-grid" variants={itemVariants}>
              {skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className="skill-category"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="category-header">
                    <div className="category-icon">{category.icon}</div>
                    <h3 className="category-title">{category.title}</h3>
                  </div>
                  
                  <div className="skills-list">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="skill-item">
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percentage">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <motion.div
                            className="skill-progress"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="certifications-section" variants={itemVariants}>
              <h3 className="certifications-title">Certifications & Training</h3>
              <div className="certifications-grid">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="certification-item"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="certification-icon">
                      <Award size={16} />
                    </div>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="certification-name-link">
                        {cert.name}
                      </a>
                    ) : (
                      <span className="certification-name">{cert.name}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;