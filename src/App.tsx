// src/App.tsx (updated snippet)
import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'; // <-- ADD THIS LINE
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Certifications from './components/Certifications/Certifications';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
const REPO_BASE_PATH = '/antony-hyson-seltran/'; 

function App() {
  return (
    <div className="App">
      <video autoPlay loop muted className="background-video">
        {/* UPDATED: BG_Video.mp4 */}
        <source src={`${REPO_BASE_PATH}assets/BG_Video.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Navbar /> {/* <-- ADD THIS LINE */}
      <Profile />
      <About />
      <Experience />
      <Certifications />
      <Projects />
      <Contact />
      <Footer />
      {/* Profile will go here next, then About, etc. */}
    </>
  );
};

export default App;