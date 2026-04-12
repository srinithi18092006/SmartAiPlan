
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
      whileHover={hoverGlow ? { scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      className={`glass-premium p-6 rounded-3xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const NeonButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'blue' | 'purple' | 'gold' | 'outline';
}> = ({ children, onClick, className = '', variant = 'blue' }) => {
  const variants = {
    blue: 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-500/30',
    purple: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30',
    gold: 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-amber-500/30',
    outline: 'border-2 border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-500',
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-8 py-3 rounded-2xl font-bold tracking-tight transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const InputBox: React.FC<{
  label: string;
  placeholder?: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
  icon?: React.ReactNode;
}> = ({ label, placeholder, value, onChange, type = 'text', icon }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white/50 border-2 border-slate-100 rounded-2xl ${icon ? 'pl-12' : 'px-6'} py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 placeholder:text-slate-300 font-medium`}
        />
      </div>
    </div>
  );
};

export const SelectableButton: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}> = ({ label, selected, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 rounded-2xl border-2 font-bold transition-all duration-300 ${
        selected 
          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
          : 'bg-white/50 border-slate-100 text-slate-500 hover:border-blue-300'
      } ${className}`}
    >
      {label}
    </button>
  );
};

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-xl bg-white/30 border-b border-white/20">
      <div className="text-2xl font-black tracking-tighter text-gradient flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-500 rounded-lg" />
        ARCHINT
      </div>
      <div className="hidden md:flex gap-10 text-sm font-bold text-slate-400">
        <a href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest">Plans</a>
        <a href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest">Solutions</a>
        <a href="#" className="hover:text-blue-600 transition-colors uppercase tracking-widest">Vision</a>
      </div>
      <NeonButton variant="blue" className="py-2.5 px-6 text-xs uppercase tracking-widest shadow-none">Sign Out</NeonButton>
    </nav>
  );
};
