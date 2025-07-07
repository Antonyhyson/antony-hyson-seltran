import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, BookOpen, Shield, Code } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
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

  const stats = [
    {
      icon: <Shield size={24} />,
      title: "Experience",
      value: "2+ Years",
      description: "Cybersecurity Analyst"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Education",
      value: "M.Sc.",
      description: "Cybersecurity Analytics"
    },
    {
      icon: <Award size={24} />,
      title: "Certifications",
      value: "10+",
      description: "Industry Certifications"
    },
    {
      icon: <Code size={24} />,
      title: "Projects",
      value: "15+",
      description: "Security Projects"
    }
  ];

  return (
    <section className="about section" id="about">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">
              Get to know more about my background, expertise, and passion for cybersecurity
            </p>
          </motion.div>

          <div className="about-content">
            <motion.div className="about-stats" variants={itemVariants}>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="stat-card"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-content">
                      <h3 className="stat-title">{stat.title}</h3>
                      <div className="stat-value">{stat.value}</div>
                      <p className="stat-description">{stat.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="about-text" variants={itemVariants}>
              <div className="text-content">
                <p>
                  I am <strong>Antony Hyson Seltran</strong>, an aspiring Cyber Security Analyst, 
                  Ethical Hacker, and Network Engineer with a strong passion for safeguarding 
                  digital landscapes. My journey in cybersecurity is driven by a deep commitment 
                  to protecting organizations from evolving cyber threats.
                </p>
                
                <p>
                  Holding both a Bachelor's in Computer Science and Engineering and a Master's 
                  degree in Cybersecurity Analytics, my academic foundation has equipped me with 
                  a comprehensive understanding of complex systems and cutting-edge technologies.
                </p>
                
                <p>
                  With over 2 years of hands-on experience as a Cybersecurity Consultant, I have 
                  performed comprehensive risk assessments on 150+ applications, reducing security 
                  incidents by 40% and strengthening data protection for over 1,000 users. I've 
                  also created and implemented security awareness training programs for 200+ employees, 
                  resulting in a 60% improvement in compliance metrics.
                </p>
                
                <p>
                  My expertise spans across various domains including penetration testing, 
                  vulnerability assessment, incident response, and security architecture. I'm 
                  passionate about staying ahead of emerging threats and continuously expanding 
                  my knowledge through certifications and practical projects.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;