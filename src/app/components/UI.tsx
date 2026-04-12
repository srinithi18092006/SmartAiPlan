
import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverGlow = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverGlow ? { y: -5, boxShadow: '0 0 30px rgba(0, 210, 255, 0.2)' } : {}}
      className={`glass-card p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const NeonButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'blue' | 'purple' | 'outline';
}> = ({ children, onClick, className = '', variant = 'blue' }) => {
  const variants = {
    blue: 'bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white shadow-[0_0_15px_rgba(0,210,255,0.4)]',
    purple: 'bg-gradient-to-r from-[#9d50bb] to-[#6e48aa] text-white shadow-[0_0_15px_rgba(157,80,187,0.4)]',
    outline: 'border border-[#00d2ff] text-[#00d2ff] hover:bg-[#00d2ff]/10',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/20">
      <div className="text-2xl font-black tracking-tighter text-gradient">
        ARCHINT
      </div>
      <div className="flex gap-8 text-sm font-medium text-white/70">
        <a href="#" className="hover:text-white transition-colors">Solutions</a>
        <a href="#" className="hover:text-white transition-colors">Resources</a>
        <a href="#" className="hover:text-white transition-colors">Pricing</a>
      </div>
      <NeonButton variant="outline" className="py-2 text-xs">LAUNCH APP</NeonButton>
    </nav>
  );
};
