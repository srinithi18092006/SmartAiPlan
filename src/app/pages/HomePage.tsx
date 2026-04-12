
import React from 'react';
import { motion } from 'motion/react';
import { GlassCard, NeonButton, Navbar } from '../components/UI';
import { useNavigate } from 'react-router';
import { Home, Building2, Sparkles, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-colorful-mesh relative overflow-hidden flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-40 pb-20 relative z-10 flex-grow flex flex-col items-center justify-center">
        <div className="max-w-4xl text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-blue-100 shadow-sm"
          >
            <Sparkles className="w-3 h-3" /> Powered by Advanced Neural Networks
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-9xl font-black tracking-tighter text-gradient mb-8 leading-none"
          >
            ARCHINT
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl text-slate-800 font-bold mb-10 tracking-tight"
          >
            Design Your <span className="text-blue-600">Dream Space</span> with Intelligence
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Select a category to begin your intelligent construction journey. 
            Our system analyzes thousands of design patterns to provide the perfect blueprint tailored to your needs.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
          <motion.div
            whileHover={{ scale: 1.02, y: -10 }}
            onClick={() => navigate('/selection/house')}
            className="cursor-pointer group flex h-full"
          >
            <GlassCard className="flex flex-col items-center justify-center text-center p-12 w-full border-blue-100/50 hover:border-blue-500/30 transition-all duration-500 bg-white/60">
              <div className="w-24 h-24 rounded-3xl bg-blue-600 text-white flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/40 relative">
                <Home className="w-12 h-12" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold rounded-full border-4 border-white flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-black mb-4 text-slate-800 tracking-tight">Build a House</h3>
              <p className="text-slate-400 font-medium mb-10 leading-relaxed">Custom villas, modern duplexes, and traditional estates optimized for families.</p>
              <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                Select category <ArrowRight className="w-5 h-5" />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -10 }}
            onClick={() => navigate('/selection/apartment')}
            className="cursor-pointer group flex h-full"
          >
            <GlassCard className="flex flex-col items-center justify-center text-center p-12 w-full border-purple-100/50 hover:border-purple-500/30 transition-all duration-500 bg-white/60">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/40">
                <Building2 className="w-12 h-12" />
              </div>
              <h3 className="text-4xl font-black mb-4 text-slate-800 tracking-tight">Build an Apartment</h3>
              <p className="text-slate-400 font-medium mb-10 leading-relaxed">Luxury suites, creative studios, and urban complexes with maximum efficiency.</p>
              <div className="flex items-center gap-2 text-purple-600 font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                Select category <ArrowRight className="w-5 h-5" />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="p-8 text-center text-xs font-bold text-slate-300 uppercase tracking-[0.5em]">
        Revolutionizing Industry Since 2026
      </div>
    </div>
  );
};
