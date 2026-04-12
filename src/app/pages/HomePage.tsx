
import React from 'react';
import { motion } from 'motion/react';
import { GlassCard, NeonButton, Navbar } from '../components/UI';
import { useNavigate } from 'react-router';
import { LayoutGrid, Home as HomeIcon, Building2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-gradient mb-6"
          >
            ARCHINT
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl text-white/90 font-medium mb-8"
          >
            Design Your Dream Space with Intelligence
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto"
          >
            Select a category to begin your intelligent construction journey. 
            Our system analyzes thousands of design patterns to provide the perfect blueprint tailored to your needs.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => navigate('/selection/house')}
            className="cursor-pointer group"
          >
            <GlassCard className="h-[400px] flex flex-col items-center justify-center relative overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <HomeIcon className="w-20 h-20 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold mb-4">Build a House</h3>
              <p className="text-white/40 text-center">Custom villas, duplexes, and traditional homes optimized for your lifestyle.</p>
              <NeonButton variant="blue" className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">START BUILDING</NeonButton>
            </GlassCard>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => navigate('/selection/apartment')}
            className="cursor-pointer group"
          >
            <GlassCard className="h-[400px] flex flex-col items-center justify-center relative overflow-hidden border-2 border-secondary/20 hover:border-secondary/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Building2 className="w-20 h-20 text-secondary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold mb-4">Build an Apartment</h3>
              <p className="text-white/40 text-center">Modern apartments, penthouses, and complex suites with maximum space efficiency.</p>
              <NeonButton variant="purple" className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">START BUILDING</NeonButton>
            </GlassCard>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
    </div>
  );
};
