import React from 'react';
import { Link } from 'react-router-dom';

type MindHubCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  to: string;
};

const MindHubCard = ({ title, description, icon: Icon, to }: MindHubCardProps) => {
  return (
    <Link to={to} className="group relative block">
      {/* The Glow Effect (Behind the card) */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

      {/* The Actual Glass Card */}
      <div className="relative px-7 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl leading-none flex items-start space-x-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">

        {/* Icon Container */}
        <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-white/10">
          <Icon className="w-8 h-8 text-cyan-400" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-slate-100 font-semibold text-lg">{title}</p>
          <p className="text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
          <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider pt-2 flex items-center group-hover:text-cyan-300 transition-colors">
            Open Hub →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MindHubCard;