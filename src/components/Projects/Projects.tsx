import React from 'react';
import './Projects.css';

// Define the base path for your repository on GitHub Pages
const REPO_BASE_PATH = '/antony-hyson-seltran/'; 

const Projects: React.FC = () => {
  return (
    <section id="projects">
      <p className="section__text__p1">Browse My Recent</p>
      <h1 className="title">Projects</h1>
      <div className="experience-details-container">
        <div className="about-containers">
          {/* Project 1: PAC - Private Access Control */}
          <div className="details-container color-container">
            <div className="article-container">
              {/* UPDATED: PAC.png */}
              <img src={`${REPO_BASE_PATH}assets/PAC.png`} alt="Project 1" className="project-img" />
            </div>
            <h2 className="experience-sub-title project-title">PAC - Private Access Control</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => window.open('https://github.com/antonyhyson/PAC---Private-Access-Control', '_blank')}
              >
                Github
              </button>
            </div>
          </div>
          {/* Project 2: NADS - Network Anomaly Detection System */}
          <div className="details-container color-container">
            <div className="article-container">
              {/* UPDATED: NADS.png */}
              <img src={`${REPO_BASE_PATH}assets/NADS.png`} alt="Project 2" className="project-img" />
            </div>
            <h2 className="experience-sub-title project-title">NADS - Network Anomaly Detection System</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => window.open('https://github.com/antonyhyson/NADS---Network-Anomaly-Detection-System', '_blank')}
              >
                Github
              </button>
            </div>
          </div>
          {/* Project 3: Solana Blockchain Network */}
          <div className="details-container color-container">
            <div className="article-container">
              {/* UPDATED: Solana.png */}
              <img src={`${REPO_BASE_PATH}assets/Solana.png`} alt="Project 3" className="project-img" />
            </div>
            <h2 className="experience-sub-title project-title">Solana Blockchain Network</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => window.open('https://github.com/antonyhyson/Solana-Blockchain-Network', '_blank')}
              >
                Github
              </button>
            </div>
          </div>
          {/* Project 4: EXIF Data Extractor */}
          <div className="details-container color-container">
            <div className="article-container">
              {/* UPDATED: EXIF.png */}
              <img src={`${REPO_BASE_PATH}assets/EXIF.png`} alt="Project 4" className="project-img" />
            </div>
            <h2 className="experience-sub-title project-title">EXIF Data Extractor</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => window.open('https://github.com/antonyhyson/EXIF-Data-Extractor', '_blank')}
              >
                Github
              </button>
            </div>
          </div>
          {/* Project 5: ROT13 Encryptor/Decryptor */}
          <div className="details-container color-container">
            <div className="article-container">
              {/* UPDATED: ROT13.png */}
              <img src={`${REPO_BASE_PATH}assets/ROT13.png`} alt="Project 5" className="project-img" />
            </div>
            <h2 className="experience-sub-title project-title">ROT13 Encryptor/Decryptor</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => window.open('https://github.com/antonyhyson/ROT13-Encryptor-Decryptor', '_blank')}
              >
                Github
              </button>
            </div>
          </div>
          {/* Project 6: Python Keylogger */}
          <div className="details-container color-container">
            <div className="article-container">
              {/* UPDATED: Keylogger.png */}
              <img src={`${REPO_BASE_PATH}assets/Keylogger.png`} alt="Project 6" className="project-img" />
            </div>
            <h2 className="experience-sub-title project-title">Python Keylogger</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => window.open('https://github.com/antonyhyson/Python-Keylogger', '_blank')}
              >
                Github
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* UPDATED: arrow.png */}
      <img
        src={`${REPO_BASE_PATH}assets/arrow.png`}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (window.location.href = './#contact')}
      />
    </section>
  );
};

export default Projects;