import { NavLink } from "react-router-dom";
import { Home, Heart, ShoppingBag, Bus, Wind, Users } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/mental-health", icon: Heart, label: "Mind" },
  { to: "/basic-needs", icon: ShoppingBag, label: "Needs" },
  { to: "/transportation", icon: Bus, label: "Transit" },
  { to: "/mindfulness", icon: Wind, label: "Breathe" },
  { to: "/community", icon: Users, label: "Community" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-nav md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${
                isActive
                  ? "text-coral bg-coral/10"
                  : "text-navy/50 hover:text-navy"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
