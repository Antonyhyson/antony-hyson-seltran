import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Shield, Smartphone, Network, Search, Lock, Code } from 'lucide-react';
import './Projects.css';

const Projects: React.FC = () => {
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

  const projects = [
    {
      title: "Network Anomaly Detection System",
      description: "Developed and evaluated a novel network anomaly detection system using machine learning models (Random Forest, MLP, XGBoost) to effectively detect diverse cyber threats across multiple benchmark datasets, achieving high accuracy and generalization.",
      image: import.meta.env.BASE_URL + "assets/NADS.png", // MODIFIED THIS LINE
      technologies: ["Python", "Machine Learning", "XGBoost", "Random Forest", "Network Security"],
      github: "https://github.com/Antonyhyson/Development-of-a-Network-Anomaly-Detection-System-for-Enhanced-Cybersecurity.git",
      demo: null,
      icon: <Network size={24} />,
      category: "Machine Learning"
    },
    {
      title: "Product Availability Checker",
      description: "Developed a hybrid mobile app which improved user engagement by 30% with cross-platform compatibility and received 95% positive feedback, enhancing inventory workflows for retailers.",
      image: import.meta.env.BASE_URL + "assets/PAC.png", // MODIFIED THIS LINE
      technologies: ["React Native", "JavaScript", "Mobile Development", "API Integration"],
      github: "https://github.com/Antonyhyson/PRODUCT-AVAILABILITY-CHECKER.git",
      demo: null,
      icon: <Smartphone size={24} />,
      category: "Mobile Development"
    },
    {
      title: "Solana Blockchain Voting Protocol",
      description: "Coordinated a mini project on Solana Blockchain Voting, achieving over 1000 transactions per second and designing a secure, decentralized voting protocol with a 3-member team.",
      image: import.meta.env.BASE_URL + "assets/Solana.png", // MODIFIED THIS LINE
      technologies: ["Solana", "Blockchain", "Rust", "Smart Contracts", "Cryptography"],
      github: "https://github.com/Antonyhyson/Basic-Voting-System-Using-Blockchain.git",
      demo: null,
      icon: <Shield size={24} />,
      category: "Blockchain"
    },
    {
      title: "EXIF Metadata Analysis Tool",
      description: "Developed an EXIF metadata analysis tool to efficiently extract and analyze metadata from image files, streamlining forensic investigations and data analysis processes.",
      image: import.meta.env.BASE_URL + "assets/EXIF.png", // MODIFIED THIS LINE
      technologies: ["Python", "Digital Forensics", "Metadata Analysis", "Image Processing"],
      github: "https://github.com/Antonyhyson/EXIFTOOL.git",
      demo: null,
      icon: <Search size={24} />,
      category: "Digital Forensics"
    },
    {
      title: "Caesar Cipher Decryption Tool",
      description: "Implemented a Python-based tool for decrypting Caesar Cipher and ROT13 encrypted messages, demonstrating foundational cryptographic understanding.",
      image: import.meta.env.BASE_URL + "assets/ROT13.png", // MODIFIED THIS LINE
      technologies: ["Python", "Cryptography", "Algorithm Implementation", "Security"],
      github: "https://github.com/Antonyhyson/DecryptingCaesarCipher-Rot13.git",
      demo: null,
      icon: <Lock size={24} />,
      category: "Cryptography"
    },
    {
      title: "Educational Keylogger",
      description: "Created a basic keylogger application for educational purposes, showcasing understanding of system interaction and data capture techniques in cybersecurity.",
      image: import.meta.env.BASE_URL + "assets/Keylogger.png", // MODIFIED THIS LINE
      technologies: ["Python", "System Programming", "Security Research", "Educational"],
      github: "https://github.com/Antonyhyson/Keylogger.git",
      demo: null,
      icon: <Code size={24} />,
      category: "Security Research"
    }
  ];

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Innovative solutions and practical applications showcasing my technical expertise
            </p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-icon">{project.icon}</div>
                    <span className="project-category">{project.category}</span>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <ExternalLink size={18} />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;