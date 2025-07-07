import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Background3D from './components/Background3D/Background3D';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Background3D />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;