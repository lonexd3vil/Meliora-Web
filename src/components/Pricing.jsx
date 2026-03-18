import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCheck, FiMic, FiCpu, FiVolume2, FiShield, FiZap, FiRepeat } from 'react-icons/fi';
import './Pricing.css';

const pricingItems = [
  { icon: <FiMic />, label: 'Advanced speech recognition' },
  { icon: <FiCpu />, label: 'On-device reasoning engine' },
  { icon: <FiVolume2 />, label: 'Natural voice synthesis' },
  { icon: <FiShield />, label: 'Background voice activation' },
  { icon: <FiZap />, label: 'Bundled inference runtime' },
  { icon: <FiRepeat />, label: 'Unlimited offline queries' },
];

const Pricing = () => {
  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 0.5], [80, -10]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  useEffect(() => {
    const handleMove = (e) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
      cardRef.current.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="section pricing-section" id="pricing" ref={sectionRef}>


      <div className="container">
        <motion.div className="section-header" style={{ y: titleY, opacity: titleOpacity }}>
          <div className="badge">License</div>
          <h2 className="section-title">Lifetime Access.</h2>
          <p className="section-subtitle">No subscriptions. No limits. A complete private assistant on your device.</p>
        </motion.div>

        <motion.div
          ref={cardRef}
          className="bento-card pricing-card"
          style={{ y: cardY }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, type: 'spring', stiffness: 50 }}
        >
          {/* warm top accent line */}
          <div className="pricing-top-line" />

          <div className="pricing-left">
            <div className="price-amount">
              <span className="price-currency">₹</span>
              <span className="price-number">1999</span>
            </div>
            <span className="price-period">one-time payment · lifetime access</span>
            <button className="btn btn-primary pricing-cta">Acquire Meliora</button>
            <p className="pricing-note">Includes macOS app and all bundled inference engines.</p>
          </div>

          <div className="pricing-divider" />

          <div className="pricing-right">
            <h3>What's included</h3>
            <ul className="pricing-list">
              {pricingItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="pricing-item-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
