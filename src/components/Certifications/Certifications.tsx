import React from 'react';
import './Certifications.css';

// Define the base path for your repository on GitHub Pages
const REPO_BASE_PATH = '/antony-hyson-seltran/'; 

const Certifications: React.FC = () => {
  return (
    <section id="Certifications">
      <p className="section__text__p1">Explore My</p>
      <h1 className="title">Certifications</h1>
      <div className="experience-details-container">
        <div className="about-containers">
          {/* Cybersecurity Certifications */}
          <div className="details-container">
            <h2 className="experience-sub-title">Cybersecurity Certifications</h2>
            <div className="article-container">
              <article>
                {/* UPDATED: checkmark.png */}
                <img src={`${REPO_BASE_PATH}assets/checkmark.png`} alt="Experience icon" className="icon" />
                <div>
                  <h3>Google Cybersecurity Professional Certificate</h3>
                  <p>Certified</p>
                </div>
              </article>
              <article>
                {/* UPDATED: checkmark.png */}
                <img src={`${REPO_BASE_PATH}assets/checkmark.png`} alt="Experience icon" className="icon" />
                <div>
                  <h3>CCNA Routing and Switching</h3>
                  <p>Certified</p>
                </div>
              </article>
              <article>
                {/* UPDATED: checkmark.png */}
                <img src={`${REPO_BASE_PATH}assets/checkmark.png`} alt="Experience icon" className="icon" />
                <div>
                  <h3>Certified Ethical Hacker (CEH) - Practical</h3>
                  <p>Certified</p>
                </div>
              </article>
              <article>
                {/* UPDATED: checkmark.png */}
                <img src={`${REPO_BASE_PATH}assets/checkmark.png`} alt="Experience icon" className="icon" />
                <div>
                  <h3>CompTIA Security+</h3>
                  <p>Certified</p>
                </div>
              </article>
              <article>
                {/* UPDATED: checkmark.png */}
                <img src={`${REPO_BASE_PATH}assets/checkmark.png`} alt="Experience icon" className="icon" />
                <div>
                  <h3>AWS Certified Cloud Practitioner</h3>
                  <p>Certified</p>
                </div>
              </article>
              <article>
                {/* UPDATED: checkmark.png */}
                <img src={`${REPO_BASE_PATH}assets/checkmark.png`} alt="Experience icon" className="icon" />
                <div>
                  <h3>Azure Fundamentals (AZ-900)</h3>
                  <p>Certified</p>
                </div>
              </article>
            </div>
          </div>
          {/* Other Certifications (similar structure, ensure checkmark.png is updated) */}
          <div className="details-container">
            <h2 className="experience-sub-title">Other Certifications</h2>
            <div className="article-container">
              <article>
                {/* UPDATED: checkmark.png */}
                <img src={`${REPO_BASE_PATH}assets/checkmark.png`} alt="Experience icon" className="icon" />
                <div>
                  <h3>C++ Basics</h3>
                  <p>Certified</p>
                </div>
              </article>
              <article>
                {/* UPDATED: checkmark.png */}
                <img src={`${REPO_BASE_PATH}assets/checkmark.png`} alt="Experience icon" className="icon" />
                <div>
                  <h3>Python Foundations</h3>
                  <p>Certified</p>
                </div>
              </article>
              <article>
                {/* UPDATED: checkmark.png */}
                <img src={`${REPO_BASE_PATH}assets/checkmark.png`} alt="Experience icon" className="icon" />
                <div>
                  <h3>Java Programming</h3>
                  <p>Certified</p>
                </div>
              </article>
              <article>
                {/* UPDATED: checkmark.png */}
                <img src={`${REPO_BASE_PATH}assets/checkmark.png`} alt="Experience icon" className="icon" />
                <div>
                  <h3>Database Management (SQL)</h3>
                  <p>Certified</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      {/* UPDATED: arrow.png */}
      <img
        src={`${REPO_BASE_PATH}assets/arrow.png`}
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (window.location.href = './#projects')}
      />
    </section>
  );
};

export default Certifications;