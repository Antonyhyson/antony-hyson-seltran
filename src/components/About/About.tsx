import React from 'react';
import './About.css';

// Define the base path for your repository on GitHub Pages
const REPO_BASE_PATH = '/antony-hyson-seltran/'; 

const About: React.FC = () => {
  return (
    <section id="about">
      <p className="section__text__p1">Get To Know More</p>
      <h1 className="title">About Me</h1>
      <div className="section-container">
        {/* If you have a profile picture here, update it as well */}
        {/* <div className="section__pic-container">
          <img src={`${REPO_BASE_PATH}assets/profile-pic.jpg`} alt="Profile picture" className="about-pic" />
        </div> */}
        <div className="about-details-container">
          <div className="about-containers">
            <div className="details-container">
              {/* UPDATED: experience.png */}
              <img src={`${REPO_BASE_PATH}assets/experience.png`} alt="Experience icon" className="icon" />
              <h3>Experience</h3>
              <p>2+ years <br />Cybersecurity Analyst</p>
            </div>
            <div className="details-container">
              {/* UPDATED: education.png */}
              <img src={`${REPO_BASE_PATH}assets/education.png`} alt="Education icon" className="icon" />
              <h3>Education</h3>
              <p>B.Sc. Bachelors Degree<br />M.Sc. Masters Degree</p>
            </div>
          </div>
          <div className="text-container">
            <p>
              I am Antony Hyson Seltran, an aspiring Cyber Security Analyst, Ethical Hacker, and Network Engineer with a strong passion for safeguarding digital landscapes. Holding both a Bachelor's and a Master's degree in Computer Science, my academic journey has equipped me with a comprehensive understanding of complex systems and cutting-edge technologies.
            </p>
          </div>
        </div>
      </div>
      {/* UPDATED: arrow.png */}
      <img
        src={`${REPO_BASE_PATH}assets/arrow.png`}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (window.location.href = './#experience')}
      />
    </section>
  );
};

export default About;