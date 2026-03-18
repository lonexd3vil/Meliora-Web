import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <span className="logo-text">meliora</span>
        </a>

        <div className="nav-links">
          <a href="#features" className="nav-link">Stack</a>
          <a href="#requires" className="nav-link">Requirements</a>
          <a href="#pricing" className="nav-link">Pricing</a>
        </div>

        <div className="nav-actions">
          <button
            className="btn btn-primary nav-btn"
            onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
          >
            Get Access
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
