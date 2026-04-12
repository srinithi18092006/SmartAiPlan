
import React from 'react';
import { motion } from 'motion/react';
import { GlassCard, PremiumButton } from '../components/UI';
import { useNavigate } from 'react-router';
import { Mail, Lock, UserPlus, LogIn } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-colorful-mesh py-20 px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -ml-64 -mb-64" />
      
      <GlassCard className="w-full max-w-lg p-12 z-10 relative border-white/60 bg-white/80" variant="light">
        <div className="text-center mb-12">
           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/20">
             <span className="text-white font-black text-3xl">A</span>
           </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 italic">ARCH<span className="text-purple-600">INT</span></h1>
          <p className="text-slate-500 font-medium">Elevate architectural planning with intelligence</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
              <input 
                type="email" 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:border-purple-600 focus:bg-white transition-all shadow-sm"
                placeholder="architect@archint.ai"
              />
            </div>
            
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
              <input 
                type="password" 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:border-purple-600 focus:bg-white transition-all shadow-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-4 pt-4">
            <PremiumButton className="w-full py-4 text-lg flex items-center justify-center gap-2" variant="purple">
              <LogIn className="w-5 h-5" /> SIGN IN
            </PremiumButton>
            
            <PremiumButton className="w-full py-4 text-lg flex items-center justify-center gap-2" variant="outline" type="button">
              <UserPlus className="w-5 h-5" /> CREATE ACCOUNT
            </PremiumButton>
          </div>
          
          <div className="text-center mt-6">
            <button type="button" className="text-sm font-bold text-slate-400 hover:text-purple-600 transition-colors">
              Forgot your design vault password?
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
