
import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'colorful';
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', variant = 'light' }) => {
  const variants = {
    light: 'bg-white/70 border-white/60 shadow-blue-500/5',
    dark: 'bg-slate-900/60 border-white/10 shadow-black/20',
    colorful: 'bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border-white/40 shadow-purple-500/5'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 border ${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const PremiumButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'purple' | 'blue' | 'accent' | 'outline' | 'ghost';
  active?: boolean;
}> = ({ children, onClick, className = '', variant = 'purple', active = false }) => {
  const styles = {
    purple: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20',
    blue: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20',
    accent: 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/20',
    outline: 'border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-purple-500 hover:text-purple-500',
    ghost: 'bg-white/5 border border-white/10 text-slate-500 dark:text-white/40 hover:bg-white/10'
  };

  const activeStyle = active ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-500 ring-offset-2' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${styles[variant]} ${activeStyle} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-5 flex justify-between items-center backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 bg-white/60 dark:bg-black/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <span className="text-white font-black text-xl">A</span>
        </div>
        <div className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">
          ARCH<span className="text-purple-600">INT</span>
        </div>
      </div>
      <div className="hidden md:flex gap-10 text-sm font-bold text-slate-500 dark:text-white/60">
        <a href="#" className="hover:text-purple-600 transition-colors uppercase tracking-widest">Platform</a>
        <a href="#" className="hover:text-purple-600 transition-colors uppercase tracking-widest">Templates</a>
        <a href="#" className="hover:text-purple-600 transition-colors uppercase tracking-widest">Pricing</a>
      </div>
      <PremiumButton variant="purple" className="py-2.5 text-xs tracking-widest uppercase rounded-xl">Launch App</PremiumButton>
    </nav>
  );
};
