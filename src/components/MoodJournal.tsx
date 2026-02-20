import React, { useState } from 'react';
import Sentiment from 'sentiment';
import { motion } from 'framer-motion';

const sentiment = new Sentiment();

const MoodJournal = ({ onMoodChange }: { onMoodChange: (color: string) => void }) => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);

    // Analyze the vibe of the text
    const result = sentiment.analyze(val);
    
    // Logic: Map score to Calm-style colors
    if (result.score > 2) onMoodChange('bg-emerald-500/20'); // Happy/Peaceful
    else if (result.score < -2) onMoodChange('bg-blue-900/40'); // Sad/Heavy Rain
    else if (result.comparative < 0) onMoodChange('bg-purple-900/30'); // Stressed/Anxious
    else onMoodChange('bg-slate-900/20'); // Neutral Mist
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="glass-card p-8 mt-6"
    >
      <h3 className="text-xl font-light tracking-widest mb-4 uppercase">Brain Dump</h3>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="How is the weather in your mind today?"
        className="w-full h-40 bg-transparent border-none outline-none text-white placeholder-white/20 resize-none text-lg leading-relaxed"
      />
      <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
        <span className="text-[10px] text-white/30 uppercase tracking-tighter">AI Sentiment Active</span>
        <button className="pill-button text-xs py-2 px-6">Save to Cloud</button>
      </div>
    </motion.div>
  );
};

export default MoodJournal;