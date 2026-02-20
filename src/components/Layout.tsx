import { Outlet } from "react-router-dom";
import RainBackground from "./ui/RainBackground";
import { motion } from "framer-motion";

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      <RainBackground />
      
      {/* Immersive Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-transparent">
        <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-white">Mind Hub</h1>
        <div className="flex gap-4">
          <button className="pill-button text-sm">London, ON</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative pt-32 px-6 pb-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Persistent Glass Footer / Bottom Bar */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50">
        <div className="glass-panel rounded-full px-8 py-4 flex justify-around items-center">
          <button className="text-white/60 hover:text-cyan-400 transition-colors">Home</button>
          <button className="text-white/60 hover:text-cyan-400 transition-colors">Journal</button>
          <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center animate-breathe shadow-[0_0_20px_rgba(34,211,238,0.6)]">
            <div className="w-6 h-6 bg-white rounded-full opacity-50" />
          </div>
          <button className="text-white/60 hover:text-cyan-400 transition-colors">Resources</button>
          <button className="text-white/60 hover:text-cyan-400 transition-colors">Profile</button>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
