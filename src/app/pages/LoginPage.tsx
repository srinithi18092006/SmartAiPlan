
import React from 'react';
import { motion } from 'motion/react';
import { GlassCard, NeonButton, InputBox } from '../components/UI';
import { useNavigate } from 'react-router';
import { Mail, Lock, Building } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-colorful-mesh p-6">
      {/* Dynamic Background Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/20 blur-[120px] rounded-full animate-pulse opacity-70" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg relative z-10"
      >
        <GlassCard className="p-12 border-white/40 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl mb-6 group-hover:rotate-12 transition-transform duration-500">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-5xl font-black text-gradient tracking-tighter mb-3">ARCHINT</h1>
            <p className="text-slate-400 font-medium">Experience Architectural Brilliance with AI</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
            <InputBox 
              label="Email Address" 
              placeholder="name@archint.ai" 
              value="" 
              onChange={() => {}} 
              icon={<Mail className="w-5 h-5" />}
            />
            <InputBox 
              label="Secure Password" 
              type="password" 
              placeholder="••••••••" 
              value="" 
              onChange={() => {}} 
              icon={<Lock className="w-5 h-5" />}
            />
            
            <div className="pt-4 space-y-4">
              <NeonButton className="w-full py-5 text-lg" variant="blue">SIGN IN TO PLATFORM</NeonButton>
              <NeonButton className="w-full py-4 text-sm" variant="outline">CREATE NEW ACCOUNT</NeonButton>
            </div>
            
            <div className="text-center mt-8">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Global standard in AI Design</span>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
};
