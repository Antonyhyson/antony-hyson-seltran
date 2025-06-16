import React from 'react';
import './Contact.css';

// Define the base path for your repository on GitHub Pages
const REPO_BASE_PATH = '/antony-hyson-seltran/'; 

const Contact: React.FC = () => {
  return (
    <section id="contact">
      <p className="section__text__p1">Get in Touch</p>
      <h1 className="title">Contact Me</h1>
      <div className="contact-info-container">
        <div className="contact-info">
          {/* UPDATED: email.png */}
          <img
            src={`${REPO_BASE_PATH}assets/email.png`}
            alt="Email icon"
            className="icon contact-icon email-icon"
          />
          <p><a href="mailto:work.antonyhyson@gmail.com">work.antonyhyson@gmail.com</a></p>
        </div>
        <div className="contact-info">
          {/* UPDATED: linkedin.png */}
          <img
            src={`${REPO_BASE_PATH}assets/linkedin.png`}
            alt="LinkedIn icon"
            className="icon contact-icon"
          />
          <p><a href="https://www.linkedin.com/in/antonyhysonseltran">LinkedIn</a></p>
        </div>
      </div>
    </section>
  );
};

export default Contact;