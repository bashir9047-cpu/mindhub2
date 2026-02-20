import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BreathingCard = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="glass-card p-10 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
      {/* 1. The Breathing Visualizer */}
      <div className="relative flex items-center justify-center mb-12">
        {/* The Outer Glow (Pulses) */}
        <motion.div
          animate={{
            scale: isActive ? [1, 1.4, 1] : 1,
            opacity: isActive ? [0.3, 0.6, 0.3] : 0.2,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-40 h-40 bg-cyan-400 rounded-full blur-[40px]"
        />

        {/* The Main "Glass" Circle */}
        <motion.div
          animate={{
            scale: isActive ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-32 h-32 glass-panel rounded-full flex items-center justify-center border-white/30 shadow-2xl"
        >
          {/* Inner Glowing Core */}
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full blur-sm opacity-80" />
        </motion.div>
      </div>

      {/* 2. Content & Text */}
      <div className="text-center z-10">
        <h2 className="text-2xl font-light tracking-widest uppercase mb-2">Mindful Breath</h2>
        <p className="text-white/60 text-sm mb-8 italic">
          {isActive ? "Follow the rhythm... Inhale and Exhale." : "Ready to find your center?"}
        </p>

        {/* 3. The Pill-Shaped Play Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsActive(!isActive)}
          className={`pill-button px-12 py-4 flex items-center gap-3 ${
            isActive ? 'bg-purple-500/40 border-purple-400/50' : ''
          }`}
        >
          {isActive ? (
            <>
              <div className="w-3 h-3 bg-white rounded-sm" /> 
              <span>STOP SESSION</span>
            </>
          ) : (
            <>
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
              <span>START BREATHING</span>
            </>
          )}
        </motion.button>
      </div>

      {/* 4. The "Panic" Emergency Link (Bottom Corner) */}
      <div className="absolute bottom-6 right-6">
        <button className="w-10 h-10 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-[10px] text-red-400 font-bold hover:bg-red-500/20 transition-all">
          SOS
        </button>
      </div>
    </div>
  );
};

export default BreathingCard;