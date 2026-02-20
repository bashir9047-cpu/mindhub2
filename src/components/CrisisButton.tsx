import { Phone } from "lucide-react";

const CrisisButton = () => {
  return (
    <a
      href="tel:988"
      className="fixed bottom-28 right-4 md:bottom-8 md:right-6 z-50 flex items-center gap-2 bg-coral text-white font-semibold rounded-full px-5 py-3 shadow-crisis animate-pulse-crisis hover:scale-105 transition-transform"
      aria-label="Call 988 Crisis Line"
    >
      <Phone className="w-4 h-4" />
      <span className="text-sm font-semibold tracking-wide">988 CRISIS</span>
    </a>
  );
};

export default CrisisButton;
