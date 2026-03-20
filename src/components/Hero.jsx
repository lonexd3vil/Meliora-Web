import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiMic, FiCpu, FiMessageSquare, FiVolume2, FiActivity, FiLayers, FiZap } from 'react-icons/fi';
import './Hero.css';

/* =====================================================
   NODE COMPONENT
   ===================================================== */
const Node = ({ icon, label, desc, accent, x, y, delay, floatDuration = 6,
                inputCount = 1, outputCount = 1, hasBottomOut, hasTopIn }) => (
  <motion.div
    className="nd-card"
    style={{ left: `${x}%`, top: `${y}%`, '--nd-accent': accent, '--float-dur': `${floatDuration}s` }}
    initial={{ opacity: 0, y: 30, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.75, delay, type: 'spring', stiffness: 75, damping: 16 }}
  >
    <div className="nd-glow" />
    <div className="nd-shine" />

    <div className="nd-header">
      <span className="nd-icon">{icon}</span>
      <span className="nd-label">{label}</span>
      <span className="nd-status-dot" />
    </div>

    <div className="nd-body">
      <span className="nd-desc">{desc}</span>
    </div>

    {/* Left input handles */}
    {Array.from({ length: inputCount }).map((_, i) => (
      <span key={`in-${i}`} className="nd-handle nd-handle-in"
        style={{ top: `${35 + (i * 40) / Math.max(inputCount, 1)}%` }}>
        <span className="nd-handle-ring" />
      </span>
    ))}

    {/* Right output handles */}
    {Array.from({ length: outputCount }).map((_, i) => (
      <span key={`out-${i}`} className="nd-handle nd-handle-out"
        style={{ top: `${35 + (i * 40) / Math.max(outputCount, 1)}%` }}>
        <span className="nd-handle-ring" />
      </span>
    ))}

    {/* Bottom output handle */}
    {hasBottomOut && (
      <span className="nd-handle nd-handle-bottom">
        <span className="nd-handle-ring" />
      </span>
    )}

    {/* Top input handle */}
    {hasTopIn && (
      <span className="nd-handle nd-handle-top">
        <span className="nd-handle-ring" />
      </span>
    )}
  </motion.div>
);


/* =====================================================
   HERO
   ===================================================== */
const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const headingY       = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const badgeY         = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const sectionScale   = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const pipelineY      = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const pipelineOpacity= useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const titleWordsLine1 = ["A", "voice", "in", "the", "room."];
  const titleWordsLine2 = ["A", "mind", "on", "your", "desk."];

  const wordContainerVariants = {
    hidden: { opacity: 1 },
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };
  const wordVariants = {
    hidden: { y: "120%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, type: 'spring', stiffness: 70, damping: 15 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, delay: i * 0.12, type: 'spring', stiffness: 80 }
    })
  };

  /*
   * Clean 4–3 grid layout, centred and symmetrical.
   * Row 1: hw → cap → pres → sem   (left to right)
   * Row 2:    guard → reas → voc    (left to right, centred under row 1)
   *
   * Vertical links: pres↓guard, sem↓reas
   */
  const nodes = [
    // Row 1
    { id: 'hw',   icon: <FiLayers />,        label: 'Hardware Layer',    desc: 'Enumerating connected devices',    accent: '#c4b5fd', x: 14, y: 8,  delay: 1.0,  floatDuration: 7,   inputCount: 0, outputCount: 1 },
    { id: 'cap',  icon: <FiMic />,           label: 'Audio Capture',     desc: 'Listening on default input',       accent: '#ff8a6b', x: 38, y: 8,  delay: 1.1,  floatDuration: 5.5, inputCount: 1, outputCount: 1 },
    { id: 'pres', icon: <FiActivity />,      label: 'Presence Filter',   desc: 'Detecting voice activity',         accent: '#fcd34d', x: 62, y: 8,  delay: 1.2,  floatDuration: 6.5, inputCount: 1, outputCount: 1, hasBottomOut: true },
    { id: 'sem',  icon: <FiCpu />,           label: 'Semantic Engine',   desc: 'Transcribing speech in real-time', accent: '#38bdf8', x: 86, y: 8,  delay: 1.3,  floatDuration: 6,   inputCount: 1, outputCount: 0, hasBottomOut: true },
    // Row 2
    { id: 'guard',icon: <FiZap />,           label: 'Interaction Guard', desc: 'Watching for user interrupts',     accent: '#fb7185', x: 26, y: 56, delay: 1.35, floatDuration: 7.5, inputCount: 0, outputCount: 1, hasTopIn: true },
    { id: 'reas', icon: <FiMessageSquare />, label: 'Reasoning Kernel',  desc: 'Processing intent locally',        accent: '#38bdf8', x: 50, y: 56, delay: 1.45, floatDuration: 5,   inputCount: 1, outputCount: 1, hasTopIn: true },
    { id: 'voc',  icon: <FiVolume2 />,       label: 'Vocal Synthesis',   desc: 'Streaming audio response',         accent: '#4ade80', x: 74, y: 56, delay: 1.55, floatDuration: 6.8, inputCount: 1, outputCount: 0 },
  ];

  /*
   * SVG viewBox 1200 × 600
   *
   * Row 1 nodes y_top≈48, y_mid≈78, y_bottom≈108
   *   hw  cx=168   cap cx=456   pres cx=744   sem cx=1032
   *   Node half-width ~111
   *
   * Row 2 nodes y_top≈336, y_mid≈366
   *   guard cx=312   reas cx=600   voc cx=888
   */
  const connections = [
    // Row 1 horizontals
    { d: 'M 280 78 C 310 78, 320 78, 345 78' },       // hw → cap
    { d: 'M 567 78 C 597 78, 610 78, 633 78' },       // cap → pres
    { d: 'M 855 78 C 885 78, 900 78, 921 78' },       // pres → sem

    // Verticals (bottom of row1 → top of row2)
    { d: 'M 744 112 C 744 220, 312 220, 312 330' },   // pres ↓ guard
    { d: 'M 1032 112 C 1032 220, 600 220, 600 330' }, // sem ↓ reas

    // Row 2 horizontals
    { d: 'M 423 366 C 453 366, 470 366, 489 366' },   // guard → reas
    { d: 'M 711 366 C 741 366, 760 366, 777 366' },   // reas → voc
  ];

  return (
    <section className="hero-section" ref={sectionRef}>
      <motion.div className="container hero-container" style={{ scale: sectionScale }}>
        <motion.div style={{ y: badgeY }} className="badge hero-badge">
          <span className="live-dot" />
          Fast enough to keep up.
        </motion.div>

        <motion.div style={{ y: headingY, opacity: headingOpacity }} className="hero-heading-wrap">
          <motion.h1 className="hero-title" variants={wordContainerVariants} initial="hidden" animate="visible">
            <span className="reveal-line">
              {titleWordsLine1.map((w, i) => (
                <span key={i} className="reveal-word-mask"><motion.span variants={wordVariants} className="reveal-word">{w}</motion.span></span>
              ))}
            </span>
            <br />
            <span className="reveal-line">
              {titleWordsLine2.map((w, i) => (
                <span key={i} className="reveal-word-mask"><motion.span variants={wordVariants} className="reveal-word text-accent-gradient">{w}</motion.span></span>
              ))}
            </span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants} initial="hidden" animate="visible" custom={6}>
            Meliora replaces Siri with a real-time, privacy-first voice assistant<br />
            running entirely on your Mac — no cloud, no compromise.
          </motion.p>

          <motion.div className="hero-actions" variants={itemVariants} initial="hidden" animate="visible" custom={8}>
            <div className="badge badge-alpha">Alpha Release — Coming Soon</div>
          </motion.div>
        </motion.div>

        {/* ====== Node Canvas ====== */}
        <motion.div
          className="nd-wrapper"
          style={{ y: pipelineY, opacity: pipelineOpacity }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        >
          <div className="nd-canvas">
            <div className="nd-canvas-grid" />
            <div className="nd-ambient-glow" />

            <svg className="nd-svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff8a6b" stopOpacity="0.55" />
                  <stop offset="40%" stopColor="#c4b5fd" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.55" />
                </linearGradient>
                <filter id="edgeGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {connections.map((c, i) => (
                <g key={i}>
                  <motion.path d={c.d} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, delay: 1.0 + i * 0.08, ease: 'easeInOut' }}
                  />
                  <motion.path d={c.d} fill="none" stroke="url(#edgeGrad)" strokeWidth="2"
                    strokeDasharray="8 18" filter="url(#edgeGlow)"
                    initial={{ strokeDashoffset: 140, opacity: 0 }}
                    animate={{ strokeDashoffset: [140, 0], opacity: [0, 1] }}
                    transition={{
                      strokeDashoffset: { duration: 4.5, repeat: Infinity, ease: 'linear', delay: 1.4 + i * 0.08 },
                      opacity: { duration: 0.6, delay: 1.4 + i * 0.08 }
                    }}
                  />
                  {/* Traveling particle */}
                  <circle r="3" fill="white" opacity="0">
                    <animate attributeName="opacity" values="0;0.9;0" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${2 + i * 0.3}s`} />
                    <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${2 + i * 0.3}s`}>
                      <mpath href={`#cp-${i}`} />
                    </animateMotion>
                  </circle>
                  <path id={`cp-${i}`} d={c.d} fill="none" stroke="none" />
                </g>
              ))}
            </svg>

            {nodes.map((n) => <Node key={n.id} {...n} />)}
          </div>

          <p className="pipeline-caption">Real-time local inference pipeline · on-device architecture</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
