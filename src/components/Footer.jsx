import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>meliora</span>
            </div>
            <p className="footer-desc">
              A sovereign, privacy-first voice assistant for macOS. Built for Apple Silicon.
            </p>
          </div>

          <div className="footer-links-group">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#requires">Requirements</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} Meliora. All rights reserved.</p>
          <div className="social-links">
            <a href="https://instagram.com/meliora.bot" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
