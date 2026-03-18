import React from 'react';
import './Marquee.css';

const MarqueeWords = [
  "LOCAL INFERENCE",
  "ZERO CLOUD",
  "NATIVE MAC APP",
  "ABSOLUTE PRIVACY",
  "UNIFIED MEMORY",
  "NEURAL ENGINE",
  "NO TELEMETRY",
  "SOVEREIGN COMPUTE"
];

const Marquee = () => {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-content">
        {/* Render 3 identical sets of words for a seamless infinite loop */}
        {[0, 1, 2].map((set) => (
          <div key={set} className="marquee-set">
            {MarqueeWords.map((word, i) => (
              <React.Fragment key={`${set}-${i}`}>
                <span className="marquee-word">{word}</span>
                <span className="marquee-dot">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
