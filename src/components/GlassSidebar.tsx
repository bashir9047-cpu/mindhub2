import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, ShoppingBag, Bus, Wind, Users, Phone } from 'lucide-react';

const navItems = [
  { to: "/", icon: Home, label: "Home", end: true },
  { to: "/mental-health", icon: Heart, label: "Mental Health" },
  { to: "/basic-needs", icon: ShoppingBag, label: "Basic Needs" },
  { to: "/transportation", icon: Bus, label: "Transportation" },
  { to: "/mindfulness", icon: Wind, label: "Mindfulness" },
  { to: "/community", icon: Users, label: "Community" },
];

const GlassSidebar = () => {
  return (
    <div className="hidden md:flex fixed top-4 left-4 h-[calc(100vh-2rem)] w-64 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex-col shadow-2xl z-50">
      
      {/* Branding */}
      <div className="flex items-center space-x-3 px-2 mb-10">
        <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-lg shadow-lg shadow-cyan-500/20 flex items-center justify-center">
          <Wind className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">Mind Hub</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Bottom Crisis CTA */}
      <div className="pt-6 border-t border-white/10">
        <a
          href="tel:988"
          className="flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group bg-coral/20 hover:bg-coral/30 text-white border border-coral/30"
        >
          <Phone className="w-5 h-5 text-coral" />
          <span className="font-medium">988 Crisis</span>
        </a>
      </div>
    </div>
  );
};

// Helper component for menu items
const NavItem = ({ to, icon: Icon, label, end }: { to: string, icon: any, label: string, end?: boolean }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group 
    ${isActive ? 'bg-white/10 text-white border border-white/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
  >
    {({ isActive }) => (
      <>
        <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`} />
        <span className="font-medium">{label}</span>
      </>
    )}
  </NavLink>
);

export default GlassSidebar;