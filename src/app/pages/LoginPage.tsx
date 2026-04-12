
import React, { useState } from 'react';
import { GlassCard, PremiumButton } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Mail, Lock, UserPlus } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate('/home');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-blue-mesh">
      <GlassCard className="max-w-md w-full border-blue-600/20 bg-white/90 dark:bg-slate-900/40">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-yellow-400 font-black text-4xl shadow-xl shadow-blue-500/30">A</div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2">ARCH<span className="text-blue-600">INT</span></h1>
          <p className="text-muted-foreground">{isRegister ? 'Join the future of design' : 'Sign in to your design vault'}</p>
        </div>

        {error && <div className="p-3 mb-6 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center font-bold">{error}</div>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="relative">
              <input 
                type="text" placeholder="Full Name" required
                value={name} onChange={(e) => setName(e.target.value)}
                className="w-full h-14 bg-background border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}
          <div className="relative">
             <input 
                type="email" placeholder="Email Address" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-background border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 focus:border-blue-500 focus:outline-none"
              />
          </div>
          <div className="relative">
            <input 
                type="password" placeholder="Password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-background border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 focus:border-blue-500 focus:outline-none"
              />
          </div>

          <PremiumButton type="submit" variant="blue" className="w-full py-4 text-lg">
            {isRegister ? 'CREATE ACCOUNT' : 'SECURE SIGN IN'}
          </PremiumButton>

          <button 
            type="button" 
            onClick={() => setIsRegister(!isRegister)}
            className="w-full text-center text-sm font-bold text-blue-500 uppercase tracking-widest mt-4"
          >
            {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>
        </form>
      </GlassCard>
    </div>
  );
};
