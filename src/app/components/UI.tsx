
import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass rounded-3xl p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const PremiumButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'blue' | 'yellow' | 'outline';
  type?: 'button' | 'submit';
}> = ({ children, onClick, className = '', variant = 'blue', type = 'button' }) => {
  const styles = {
    blue: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30',
    yellow: 'bg-yellow-400 text-slate-900 hover:bg-yellow-500 shadow-lg shadow-yellow-500/30',
    outline: 'border-2 border-slate-200 dark:border-slate-700 text-foreground hover:border-blue-500',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/home')}>
        <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-xl text-yellow-400 font-black text-2xl shadow-lg shadow-blue-500/20">A</div>
        <div className="text-2xl font-black italic tracking-tighter">
          ARCH<span className="text-blue-600">INT</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-yellow-500 dark:text-blue-400 hover:scale-110 transition-transform"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
        
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-500">{user.name}</span>
            <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <PremiumButton variant="yellow" className="py-2 text-xs" onClick={() => navigate('/')}>LOGIN</PremiumButton>
        )}
      </div>
    </nav>
  );
};
