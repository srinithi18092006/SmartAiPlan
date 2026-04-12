
import React from 'react';
import { motion } from 'motion/react';
import { GlassCard, PremiumButton, Navbar } from '../components/UI';
import { useNavigate } from 'react-router';
import { Home, Building2, Sparkles, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-colorful-mesh relative overflow-hidden">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-widest mb-8 border border-purple-200 dark:border-purple-800"
          >
            <Sparkles className="w-3 h-3" /> The Future of Construction
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-9xl font-black italic tracking-tighter text-slate-900 dark:text-white mb-8"
          >
            ARCH<span className="text-purple-600">INT</span>
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl text-slate-700 dark:text-white/90 font-bold mb-10"
          >
            Design Your Dream Space with Intelligence
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-500 dark:text-white/50 leading-relaxed max-w-3xl mx-auto"
          >
            Select a category to begin your intelligent construction journey. 
            Our system analyzes thousands of design patterns to provide the perfect blueprint tailored to your needs.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-4">
          <motion.div
            whileHover={{ y: -15, scale: 1.02 }}
            onClick={() => navigate('/selection/house')}
            className="cursor-pointer group"
          >
            <GlassCard className="h-[450px] flex flex-col items-center justify-center relative p-12 border-2 border-white/60 bg-white/70 hover:border-purple-400 transition-all text-center">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <Home className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-6 italic">Build a <span className="text-purple-600">House</span></h3>
              <p className="text-slate-500 font-medium mb-10 text-lg">Custom villas, duplexes, and traditional homes optimized for your lifestyle.</p>
              <div className="flex items-center gap-2 text-purple-600 font-black tracking-widest uppercase text-sm group-hover:gap-4 transition-all">
                Get Started <ArrowRight className="w-5 h-5" />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            whileHover={{ y: -15, scale: 1.02 }}
            onClick={() => navigate('/selection/apartment')}
            className="cursor-pointer group"
          >
            <GlassCard className="h-[450px] flex flex-col items-center justify-center relative p-12 border-2 border-white/60 bg-white/70 hover:border-blue-400 transition-all text-center">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <Building2 className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-6 italic">Build an <span className="text-blue-600">Apartment</span></h3>
              <p className="text-slate-500 font-medium mb-10 text-lg">Modern residences and complex suites with maximum space efficiency.</p>
              <div className="flex items-center gap-2 text-blue-600 font-black tracking-widest uppercase text-sm group-hover:gap-4 transition-all">
                Get Started <ArrowRight className="w-5 h-5" />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
    </div>
  );
};
