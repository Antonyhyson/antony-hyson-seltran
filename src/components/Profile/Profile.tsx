import React from 'react';
import './Profile.css';

// Define the base path for your repository on GitHub Pages
// This MUST exactly match your GitHub repository name
const REPO_BASE_PATH = '/antony-hyson-seltran/'; 

const Profile: React.FC = () => {
  const handleDownloadCV = () => {
    // Path now includes the repository base path
    window.open(`${REPO_BASE_PATH}assets/Antony_Hyson_Seltran_CV.pdf`, '_blank');
  };

  const handleContactInfo = () => {
    // Smooth scroll to the contact section using the anchor ID
    window.location.href = '#contact';
  };

  return (
    <section id="profile">
      <div className="section__pic-container">
        {/* Corrected path for profile picture */}
        <img src={`${REPO_BASE_PATH}assets/profile-pic.jpg`} alt="Antony Hyson Seltran profile picture" />
      </div>
      <div className="section__text">
        <p className="section__text__p1">Greetings, I am</p>
        <h1 className="title">Antony Hyson Seltran</h1>
        <p className="section__text__p2">Cybersecurity Analyst, Ethical Hacker</p>
        <div className="btn-container">
          <button className="btn btn-color-2" onClick={handleDownloadCV}>
            Download CV
          </button>
          <button className="btn btn-color-1" onClick={handleContactInfo}>
            Contact Info
          </button>
        </div>
        <div id="socials-container">
          <img
            src={`${REPO_BASE_PATH}assets/linkedin.png`} // <-- Corrected path for LinkedIn icon
            alt="LinkedIn profile"
            className="icon"
            onClick={() => window.open('https://www.linkedin.com/in/antonyhysonseltran', '_blank')}
          />
          <img
            src={`${REPO_BASE_PATH}assets/email.png`} // <-- Corrected path for Email icon
            alt="Email"
            className="icon"
            onClick={() => window.location.href = 'mailto:work.antonyhyson@gmail.com'}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;