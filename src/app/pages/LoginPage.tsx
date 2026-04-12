
import React from 'react';
import { motion } from 'motion/react';
import { GlassCard, NeonButton } from '../components/UI';
import { useNavigate } from 'react-router';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-mesh">
      {/* Background Architectural Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] border-r border-b border-white/5 rotate-12 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] border-l border-t border-white/5 rotate-12 pointer-events-none" />
      
      <GlassCard className="w-full max-w-md p-10 z-10 mx-4 border-2 border-primary/20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gradient tracking-tighter mb-2">ARCHINT</h1>
          <p className="text-white/50 text-sm">Elevate your architectural vision with AI</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
          <div>
            <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="architect@future.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <NeonButton className="w-full mt-4" variant="blue">SIGN IN</NeonButton>
          
          <div className="text-center mt-6">
            <button type="button" className="text-sm text-white/40 hover:text-primary transition-colors">
              Don't have an account? <span className="text-primary font-bold underline">Create Account</span>
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Aesthetic abstract building shape */}
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 opacity-20 hidden lg:block">
        <div className="w-96 h-[600px] border-l-2 border-primary">
          <div className="w-full h-1/4 border-b-2 border-white/10" />
          <div className="w-full h-1/4 border-b-2 border-white/10 flex">
            <div className="w-1/2 border-r-2 border-white/10" />
          </div>
          <div className="w-full h-1/4 border-b-2 border-white/10" />
        </div>
      </div>
    </div>
  );
};
