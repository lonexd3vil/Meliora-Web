import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Requirements.css';

const ChipSVG = () => (
  <svg viewBox="0 0 80 80" className="req-svg" fill="none">
    <rect x="20" y="20" width="40" height="40" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <rect x="28" y="28" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="40" cy="40" r="6" fill="currentColor" opacity="0.7">
      <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="40" cy="40" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.1">
      <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.15;0.03;0.15" dur="3s" repeatCount="indefinite" />
    </circle>
    <g stroke="currentColor" strokeWidth="1.5" opacity="0.25">
      {[28, 40, 52].map(x => <><line key={`t${x}`} x1={x} y1="12" x2={x} y2="20" /><line key={`b${x}`} x1={x} y1="60" x2={x} y2="68" /></>)}
      {[28, 40, 52].map(y => <><line key={`l${y}`} x1="12" y1={y} x2="20" y2={y} /><line key={`r${y}`} x1="60" y1={y} x2="68" y2={y} /></>)}
    </g>
  </svg>
);

const MemorySVG = () => (
  <svg viewBox="0 0 80 80" className="req-svg" fill="none">
    <rect x="10" y="25" width="60" height="30" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    {[16, 25, 34, 43, 52, 61].map((x, i) => (
      <rect key={x} x={x} y="30" width="6" height="20" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.35" fill="currentColor" fillOpacity="0.05">
        <animate attributeName="fill-opacity" values="0.05;0.4;0.05" dur="1.8s" repeatCount="indefinite" begin={`${i * 0.18}s`} />
      </rect>
    ))}
    <line x1="10" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
  </svg>
);

const MacSVG = () => (
  <svg viewBox="0 0 80 80" className="req-svg" fill="none">
    <rect x="12" y="10" width="56" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <rect x="16" y="14" width="48" height="32" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    <path d="M25 50 L20 62 L60 62 L55 50" stroke="currentColor" strokeWidth="1.5" opacity="0.4" fill="none" />
    <line x1="20" y1="62" x2="60" y2="62" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    {[[22, 22, 46, 22], [22, 27, 54, 27], [22, 32, 40, 32]].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.12">
        <animate attributeName="opacity" values="0.08;0.25;0.08" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
      </line>
    ))}
    <rect x="22" y="36" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="currentColor" fillOpacity="0.05">
      <animate attributeName="fill-opacity" values="0.05;0.2;0.05" dur="2.5s" repeatCount="indefinite" />
    </rect>
  </svg>
);

const reqs = [
  { svg: <MacSVG />, title: 'Platform', desc: 'macOS Native Application' },
  { svg: <ChipSVG />, title: 'Processor', desc: 'Apple M-Series Silicon' },
  { svg: <MemorySVG />, title: 'Memory', desc: '8 GB Unified Memory' },
];

const Requirements = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 0.5], [80, -10]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="section requirements-section" id="requires" ref={sectionRef}>


      <div className="container">
        <motion.div className="section-header" style={{ y: titleY, opacity: titleOpacity }}>
          <div className="badge">Hardware</div>
          <h2 className="section-title">Built for Apple Silicon.</h2>
          <p className="section-subtitle">Optimized for the unified memory architecture and neural engine of Apple's M-Series chips.</p>
        </motion.div>

        <motion.div className="req-cards" style={{ y: cardsY }}>
          {reqs.map((r, i) => (
            <motion.div
              key={i}
              className="bento-card req-card"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.15, type: 'spring', stiffness: 50 }}
            >
              <div className="req-card-icon">{r.svg}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Requirements;
