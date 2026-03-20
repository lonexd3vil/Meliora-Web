import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Features.css';

const WaveformSVG = () => (
  <svg viewBox="0 0 120 60" className="feature-svg" fill="none">
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8">
      {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110].map((x, i) => {
        const dur = (1 + i * 0.1).toFixed(1);
        const topY = [20, 10, 18, 5, 12, 22, 8, 15, 20, 25, 26][i];
        const botY = [40, 50, 42, 55, 48, 38, 52, 45, 40, 35, 34][i];
        return (
          <g key={x}>
            <line x1={x} y1="30" x2={x} y2="30">
              <animate attributeName="y2" values={`30;${topY};30`} dur={`${dur}s`} repeatCount="indefinite" />
            </line>
            <line x1={x} y1="30" x2={x} y2="30">
              <animate attributeName="y2" values={`30;${botY};30`} dur={`${dur}s`} repeatCount="indefinite" />
            </line>
          </g>
        );
      })}
    </g>
  </svg>
);

const NeuralSVG = () => (
  <svg viewBox="0 0 80 80" className="feature-svg" fill="none">
    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <circle cx="40" cy="40" r="6" fill="currentColor" opacity="0.7"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" /></circle>
    {[[40, 12], [40, 68], [12, 40], [68, 40], [20, 20], [60, 60], [60, 20], [20, 60]].map(([cx, cy], i) => (
      <g key={i}>
        <line x1={cx} y1={cy} x2="40" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <circle cx={cx} cy={cy} r="2.5" fill="currentColor" opacity="0.4" />
      </g>
    ))}
  </svg>
);

const SpeakerSVG = () => (
  <svg viewBox="0 0 80 80" className="feature-svg" fill="none">
    <path d="M20 30 L20 50 L30 50 L45 60 L45 20 L30 30 Z" stroke="currentColor" strokeWidth="1.5" opacity="0.6" fill="none" />
    {[[52, 28, 52, 52, 2], [56, 22, 56, 58, 1.2], [60, 16, 60, 64, 0.8]].map(([x1, y1, x2, y2, sw], i) => (
      <path key={i} d={`M${x1} ${y1} Q${x1 + 14} 40 ${x2} ${y2}`} stroke="currentColor" strokeWidth={sw} fill="none">
        <animate attributeName="opacity" values={`0.3;0.8;0.3`} dur="2s" repeatCount="indefinite" begin={`${i * 0.35}s`} />
      </path>
    ))}
  </svg>
);

const ShieldSVG = () => (
  <svg viewBox="0 0 80 80" className="feature-svg" fill="none">
    <path d="M40 10 L60 22 L60 45 Q60 62 40 72 Q20 62 20 45 L20 22 Z" stroke="currentColor" strokeWidth="1.5" opacity="0.5" fill="none" />
    <path d="M40 18 L54 27 L54 43 Q54 56 40 64 Q26 56 26 43 L26 27 Z" stroke="currentColor" strokeWidth="1" opacity="0.25" fill="none" />
    <path d="M33 42 L38 47 L48 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
  </svg>
);

const BoltSVG = () => (
  <svg viewBox="0 0 80 80" className="feature-svg" fill="none">
    <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1" opacity="0.1" strokeDasharray="4 4">
      <animateTransform attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="12s" repeatCount="indefinite" />
    </circle>
    <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="1" opacity="0.15" strokeDasharray="3 5">
      <animateTransform attributeName="transform" type="rotate" from="360 40 40" to="0 40 40" dur="8s" repeatCount="indefinite" />
    </circle>
    <path d="M44 12 L28 44 L40 44 L36 68 L52 36 L40 36 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.4" opacity="0.8" />
  </svg>
);

const KeySVG = () => (
  <svg viewBox="0 0 80 80" className="feature-svg" fill="none">
    <circle cx="28" cy="34" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.5" fill="none" />
    <circle cx="28" cy="34" r="6" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
    <line x1="42" y1="34" x2="70" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <line x1="60" y1="34" x2="60" y2="46" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <line x1="68" y1="34" x2="68" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

const features = [
  { svg: <WaveformSVG />, title: 'Always Listening, Always Aware', desc: 'Dynamically calibrates to your environment with advanced noise-floor detection. Speak naturally — it activates when addressed, stays silent otherwise.', tag: 'Speech Recognition', span: 'col-span-7' },
  { svg: <NeuralSVG />, title: 'On-Device Reasoning', desc: 'Context-aware, multi-turn conversations running entirely locally.', tag: 'Intelligence', span: 'col-span-5' },
  { svg: <ShieldSVG />, title: 'Completely Offline', desc: 'Your voice never leaves your machine. Every model runs locally.', tag: 'Privacy', span: 'col-span-4' },
  { svg: <BoltSVG />, title: 'Sub-Second Response', desc: 'Pipelined architecture processes speech and reasoning simultaneously.', tag: 'Performance', span: 'col-span-4' },
  { svg: <SpeakerSVG />, title: 'Natural Voice Output', desc: 'Sentence-level pipelined speech synthesis for fluid, human-like audio.', tag: 'Voice Synthesis', span: 'col-span-4' },
  { svg: <WaveformSVG />, title: 'Built on Open Foundations', desc: 'Open-source model architectures optimized for Apple Silicon unified memory.', tag: 'Open Ecosystem', span: 'col-span-12' },
];

const Features = () => {
  const gridRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 0.5], [80, -20]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useEffect(() => {
    const handleMove = (e) => {
      gridRef.current?.querySelectorAll('.bento-card').forEach(card => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="section features-section" id="features" ref={sectionRef}>

      <div className="container">
        <motion.div className="section-header" style={{ y: titleY, opacity: titleOpacity }}>
          <div className="badge">Under The Hood</div>
          <h2 className="section-title">Sovereign Compute.</h2>
          <p className="section-subtitle">Open-source foundations, optimized for Apple Silicon. Nothing leaves your environment.</p>
        </motion.div>

        <motion.div className="features-grid" ref={gridRef} style={{ y: gridY }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`bento-card feature-card ${f.span}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.07, type: 'spring', stiffness: 50 }}
            >
              <div className="feature-card-inner">
                <div className="feature-top">
                  <div className="feature-svg-wrap">{f.svg}</div>
                  <span className="feature-tag">{f.tag}</span>
                </div>
                <div className="feature-bottom">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
