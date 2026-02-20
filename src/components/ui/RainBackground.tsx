import React from 'react';

const RainBackground = () => {
  // Logic to change tint based on day of the week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  
  // Custom tints for each day
  const tints: Record<string, string> = {
    'Monday': 'bg-blue-900/20',     // Deep Blue
    'Tuesday': 'bg-teal-900/20',    // Teal Mist
    'Wednesday': 'bg-indigo-900/20', // Indigo Rain
    'Thursday': 'bg-slate-900/30',  // Dark Grey Storm
    'Friday': 'bg-purple-900/20',   // Midnight Purple
    'Saturday': 'bg-cyan-900/20',   // Bright Rain
    'Sunday': 'bg-emerald-900/20',  // Soft Green Forest
  };

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden w-full h-full bg-black">
      {/* 1. The Video Layer - Use a high-quality rain loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-60"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-heavy-rain-falling-on-a-window-at-night-28249-large.mp4" type="video/mp4" />
      </video>

      {/* 2. The Dynamic Color Tint Overlay */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${tints[today] || 'bg-slate-900/20'}`} />

      {/* 3. The Depth Gradient (Bottom Vignette) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
    </div>
  );
};

export default RainBackground;