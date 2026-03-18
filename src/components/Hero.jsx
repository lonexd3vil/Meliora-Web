import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiMic, FiCpu, FiMessageSquare, FiVolume2, FiCheck } from 'react-icons/fi';
import './Hero.css';

/* =====================================================
   PIPELINE NODE — one step in the AI processing flow
   ===================================================== */
const PipelineNode = ({ icon, label, status, subtext, delay, isFirst, isLast }) => (
  <motion.div
    className={`pipeline-node ${isFirst ? 'node-warm' : isLast ? 'node-done' : 'node-cool'}`}
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay, type: 'spring', stiffness: 80 }}
  >
    <div className="node-icon-ring">
      <div className="node-icon">{icon}</div>
      <div className="node-ring-pulse"></div>
    </div>
    <div className="node-info">
      <div className="node-top-row">
        <span className="node-label">{label}</span>
        <span className={`node-badge node-badge-${status}`}>{status}</span>
      </div>
      <span className="node-sub">{subtext}</span>
    </div>
  </motion.div>
);

/* =====================================================
   CONNECTOR — animated SVG path between two nodes
   ===================================================== */
const PipelineConnector = ({ color, delay }) => (
  <div className="pipeline-connector">
    <svg className="connector-svg" viewBox="0 0 80 2" preserveAspectRatio="none">
      {/* static line */}
      <line x1="0" y1="1" x2="80" y2="1" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
      {/* animated pulse */}
      <motion.line
        x1="0" y1="1" x2="80" y2="1"
        stroke={color}
        strokeWidth="3"
        filter={`drop-shadow(0 0 6px ${color})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay, ease: 'easeInOut' }}
      />
    </svg>
    {/* diamond connector joint */}
    <div className="connector-diamond" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
  </div>
);

/* =====================================================
   HERO COMPONENT
   ===================================================== */
const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  // Heavy kinetic scroll — text rises faster than page, fade out early
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -280]);
  
  // New heavy scale parallax: pipeline and container scale down as you scroll
  const sectionScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const pipelineY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const pipelineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Framer-style masked word reveal animations
  const titleWordsLine1 = ["The", "Pursuit", "of"];
  const titleWordsLine2 = ["Better."];

  const wordContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const wordVariants = {
    hidden: { y: "120%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, type: 'spring', stiffness: 70, damping: 15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, delay: i * 0.12, type: 'spring', stiffness: 80 }
    })
  };

  const pipeline = [
    { icon: <FiMic />, label: 'Audio Input', status: 'live', subtext: 'Listening…', color: '#ff6b4a', isFirst: true },
    { icon: <FiCpu />, label: 'ASR Engine', status: 'processing', subtext: 'Voice → Text', color: '#00d4ff' },
    { icon: <FiMessageSquare />, label: 'Intelligence', status: 'active', subtext: 'Thinking → Executing', color: '#00d4ff' },
    { icon: <FiVolume2 />, label: 'Voice Synthesis', status: 'streaming', subtext: 'Generating speech…', color: '#00d4ff' },
    { icon: <FiCheck />, label: 'Audio Output', status: 'done', subtext: 'Playing response', color: '#ff6b4a', isLast: true },
  ];

  return (
    <section className="hero-section" ref={sectionRef}>
      {/* Section fade top/bottom */}
      <div className="section-fade-bottom" />

      <motion.div className="container hero-container" style={{ scale: sectionScale }}>
        {/* Badge */}
        <motion.div style={{ y: badgeY }} className="badge hero-badge">
          <span className="live-dot" />
          Offline Native Interface
        </motion.div>

        {/* Headline */}
        <motion.div style={{ y: headingY, opacity: headingOpacity }} className="hero-heading-wrap">
          <motion.h1
            className="hero-title"
            variants={wordContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="reveal-line">
              {titleWordsLine1.map((word, i) => (
                <span key={i} className="reveal-word-mask">
                  <motion.span variants={wordVariants} className="reveal-word">{word}</motion.span>
                </span>
              ))}
            </span>
            <br />
            <span className="reveal-line">
              {titleWordsLine2.map((word, i) => (
                <span key={i} className="reveal-word-mask">
                  <motion.span variants={wordVariants} className="reveal-word text-accent-gradient">{word}</motion.span>
                </span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={6}
          >
            Meliora replaces Siri with a real-time, privacy-first voice assistant<br />
            running entirely on your Mac — no cloud, no compromise.
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={8}
          >
            <button className="btn btn-primary" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>
              Get Lifetime Access
            </button>
            <button className="btn btn-secondary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
              Explore <FiArrowRight style={{ marginLeft: 8 }} />
            </button>
          </motion.div>
        </motion.div>

        {/* Pipeline Visualizer — flows strictly left → right */}
        <motion.div
          className="hero-pipeline-wrapper"
          style={{ y: pipelineY, opacity: pipelineOpacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        >
          <div className="pipeline-row">
            {pipeline.map((node, i) => (
              <React.Fragment key={i}>
                <PipelineNode
                  icon={node.icon}
                  label={node.label}
                  status={node.status}
                  subtext={node.subtext}
                  delay={0.9 + i * 0.15}
                  isFirst={node.isFirst}
                  isLast={node.isLast}
                />
                {i < pipeline.length - 1 && (
                  <PipelineConnector
                    color={i < 1 ? '#ff6b4a' : i === pipeline.length - 2 ? '#ff6b4a' : '#00d4ff'}
                    delay={1.2 + i * 0.4}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* bottom caption */}
          <p className="pipeline-caption">Real-time local inference pipeline running on your device</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
