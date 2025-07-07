import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Building } from 'lucide-react';
import './Experience.css';

const Experience: React.FC = () => {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const experiences = [
    {
      title: "CE/CE+ Compliance Consultant",
      company: "Risk Crew",
      location: "London Area, United Kingdom",
      period: "June 2025 - Present",
      duration: "1 month",
      type: "cybersecurity",
      description: "Leading compliance initiatives and risk assessment strategies for enterprise clients.",
      highlights: []
    },
    {
      title: "Cyber Security Consultant (Freelance)",
      company: "Self-Employed",
      location: "London Area, United Kingdom",
      period: "August 2023 - May 2025",
      duration: "1 year 10 months",
      type: "cybersecurity",
      description: "Provided comprehensive cybersecurity consulting services to various organizations.",
      highlights: [
        "Performed comprehensive risk assessments on 150+ applications",
        "Reduced security incidents by 40%",
        "Strengthened data protection for over 1,000 users",
        "Created security awareness training programs for 200+ employees",
        "Achieved 60% improvement in compliance metrics"
      ]
    },
    {
      title: "Student Intern",
      company: "CyberHakz Pvt-Ltd",
      location: "Chennai, Tamil Nadu, India",
      period: "March 2022",
      duration: "1 month",
      type: "cybersecurity",
      description: "Gained hands-on experience in cybersecurity operations and incident response.",
      highlights: [
        "Facilitated incident response for over 50 cyber threats",
        "Achieved 95% protocol adherence rate",
        "Minimized system downtime through efficient response",
        "Engineered EXIF metadata analysis tool",
        "Reduced investigation time by 60%"
      ]
    },
    {
      title: "Front of House",
      company: "The George Public House",
      location: "Greater London, England, United Kingdom",
      period: "October 2024 - May 2025",
      duration: "8 months",
      type: "other",
      description: "Demonstrated leadership and adaptability in a fast-paced environment.",
      highlights: [
        "Quickly progressed into management role",
        "Enhanced multitasking and interpersonal skills",
        "Improved customer engagement abilities",
        "Built strong professional relationships"
      ]
    },
    {
      title: "Student Brand Ambassador",
      company: "Amber",
      location: "Newark, Delaware, United States",
      period: "August 2023 - April 2025",
      duration: "1 year 10 months",
      type: "other",
      description: "Led marketing initiatives and brand awareness campaigns.",
      highlights: [
        "Increased brand awareness through strategic outreach",
        "Managed social media campaigns",
        "Contributed to impactful marketing initiatives",
        "Guided teams effectively"
      ]
    }
  ];

  const cyberExperiences = experiences.filter(exp => exp.type === 'cybersecurity');
  const otherExperiences = experiences.filter(exp => exp.type === 'other');

  const ExperienceCard: React.FC<{ experience: typeof experiences[0], index: number }> = ({ experience, index }) => (
    <motion.div
      className="experience-card"
      variants={itemVariants}
      whileHover={{ y: -5 }}
    >
      <div className="experience-header">
        <div className="experience-title-section">
          <h3 className="experience-title">{experience.title}</h3>
          <div className="experience-company">
            <Building size={16} />
            <span>{experience.company}</span>
          </div>
        </div>
        <div className="experience-meta">
          <div className="experience-period">
            <Calendar size={16} />
            <span>{experience.period}</span>
          </div>
          <div className="experience-location">
            <MapPin size={16} />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>
      
      <p className="experience-description">{experience.description}</p>
      
      {experience.highlights.length > 0 && (
        <ul className="experience-highlights">
          {experience.highlights.map((highlight, idx) => (
            <li key={idx}>{highlight}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );

  return (
    <section className="experience section" id="experience">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Professional Journey</h2>
            <p className="section-subtitle">
              Explore my career progression and key achievements in cybersecurity and beyond
            </p>
          </motion.div>

          <div className="experience-content">
            <motion.div className="experience-section" variants={itemVariants}>
              <h3 className="experience-section-title">Cybersecurity Experience</h3>
              <div className="experience-timeline">
                {cyberExperiences.map((experience, index) => (
                  <ExperienceCard key={index} experience={experience} index={index} />
                ))}
              </div>
            </motion.div>

            <motion.div className="experience-section" variants={itemVariants}>
              <h3 className="experience-section-title">Other Experience</h3>
              <div className="experience-timeline">
                {otherExperiences.map((experience, index) => (
                  <ExperienceCard key={index} experience={experience} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;