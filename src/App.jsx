import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Requirements from './components/Requirements';
import Footer from './components/Footer';

/* Global fixed atmospheric background — persists through all scroll */
const SiteAtmosphere = () => (
  <>
    <div className="site-atmosphere">
      <div className="atmosphere-flare warm" />
      <div className="atmosphere-flare cool" />
      <div className="atmosphere-flare mid" />
    </div>
    <div className="site-grid" />
  </>
);

function App() {
  return (
    <>
      <SiteAtmosphere />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Requirements />
      </main>
      <Footer />
    </>
  );
}

export default App;
