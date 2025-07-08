import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import Background3D from './components/Background3D/Background3D';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import './styles/globals.css';

// Lazy load the other components
const LazyAbout = lazy(() => import('./components/About/About'));
const LazyExperience = lazy(() => import('./components/Experience/Experience'));
const LazySkills = lazy(() => import('./components/Skills/Skills'));
const LazyProjects = lazy(() => import('./components/Projects/Projects'));
const LazyContact = lazy(() => import('./components/Contact/Contact'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Background3D />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div>Loading...</div>}> {/* Fallback for when components are loading */}
            <LazyAbout />
            <LazyExperience />
            <LazySkills />
            <LazyProjects />
            <LazyContact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;