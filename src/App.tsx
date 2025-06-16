import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Certifications from './components/Certifications/Certifications';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import './index.css'; // Assuming your main CSS is here or directly linked

// Define the base path for your repository on GitHub Pages
const REPO_BASE_PATH = '/antony-hyson-seltran/'; // IMPORTANT: Ensure this matches your repo name exactly

const App: React.FC = () => {
  return (
    <>
      {/* UPDATED: Video source path */}
      <video autoPlay loop muted playsInline id="background-video">
        <source src={`${REPO_BASE_PATH}assets/BG_Video.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Navbar />
      <Profile />
      <About />
      <Experience />
      <Certifications />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

export default App;