
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard, PremiumButton, Navbar } from '../components/UI';
import { useNavigate, useParams } from 'react-router';
import { 
  Settings2, 
  Layers, 
  Maximize, 
  IndianRupee, 
  Palette, 
  Check,
  ChevronRight,
  Info
} from 'lucide-react';

export const SelectionPage: React.FC = () => {
  const { type } = useParams<{ type: 'house' | 'apartment' }>();
  const navigate = useNavigate();
  
  // State for filters
  const [floors, setFloors] = useState<string | null>(null);
  const [minSqft, setMinSqft] = useState<string>('');
  const [maxSqft, setMaxSqft] = useState<string>('');
  const [minBudget, setMinBudget] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<string>('');
  const [style, setStyle] = useState<string | null>(null);
  const [advanced, setAdvanced] = useState({
    garden: false,
    freeSpace: false,
    balcony: false,
    parking: false
  });

  const handleSearch = () => {
    const activeFilters = {
      floors,
      sqft: [minSqft ? parseInt(minSqft) : 0, maxSqft ? parseInt(maxSqft) : 99999],
      budget: [minBudget ? parseInt(minBudget) : 45, maxBudget ? parseInt(maxBudget) : 200],
      style,
      ...advanced
    };
    navigate('/results', { state: { filters: activeFilters, type } });
  };

  const styles = ['Modern', 'Traditional', 'Luxury', 'Villa', 'Duplex'];

  return (
    <div className="min-h-screen bg-colorful-mesh relative pb-24">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-36">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-purple-100 italic font-black text-purple-600 text-3xl">
              {type === 'house' ? 'H' : 'A'}
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 italic uppercase">Configure your {type}</h1>
              <p className="text-slate-500 font-medium">Fine-tune filters for AI-powered architectural matching</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 font-bold text-sm">
             <Info className="w-4 h-4" /> Water facility included by default
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Floors */}
            <GlassCard className="p-10 border-white/80 bg-white/90">
              <div className="flex items-center gap-3 mb-8">
                <Layers className="text-purple-600 w-6 h-6" />
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Number of Floors</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {['1', '2', '3+'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFloors(f === floors ? null : f)}
                    className={`flex-1 min-w-[100px] h-16 rounded-2xl font-black transition-all flex items-center justify-center gap-2 border-2 ${
                      floors === f 
                        ? 'bg-purple-600 border-purple-700 text-white shadow-lg shadow-purple-200 neon-glow-primary' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-purple-300 hover:text-purple-400'
                    }`}
                  >
                    {floors === f && <Check className="w-5 h-5" />}
                    {f} {parseInt(f) === 1 ? 'Floor' : 'Floors'}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Select building height preference</p>
            </GlassCard>

            {/* 2. Square Feet & Budget */}
            <div className="grid md:grid-cols-2 gap-10">
               <GlassCard className="p-10 border-white/80 bg-white/90">
                <div className="flex items-center gap-3 mb-8">
                  <Maximize className="text-blue-600 w-6 h-6" />
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Square Footage</h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Min Sq.ft</label>
                    <input 
                      type="number" 
                      value={minSqft}
                      onChange={(e) => setMinSqft(e.target.value)}
                      placeholder="500"
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Max Sq.ft</label>
                    <input 
                      type="number" 
                      value={maxSqft}
                      onChange={(e) => setMaxSqft(e.target.value)}
                      placeholder="5000"
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-10 border-white/80 bg-white/90">
                <div className="flex items-center gap-3 mb-8">
                  <IndianRupee className="text-pink-600 w-6 h-6" />
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Budget (₹ Lakhs)</h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Min Budget</label>
                    <input 
                      type="number" 
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                      placeholder="45"
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Max Budget</label>
                    <input 
                      type="number" 
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      placeholder="200"
                      className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-pink-500 focus:bg-white"
                    />
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* 3. Style */}
            <GlassCard className="p-10 border-white/80 bg-white/90">
              <div className="flex items-center gap-3 mb-8">
                <Palette className="text-orange-500 w-6 h-6" />
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Architectural Style</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {styles.map(s => (
                  <button 
                    key={s}
                    onClick={() => setStyle(s === style ? null : s)}
                    className={`aspect-square md:aspect-auto md:h-24 rounded-2xl font-black transition-all border-2 flex flex-col items-center justify-center p-2 text-center text-xs uppercase tracking-tight ${
                      style === s 
                        ? 'bg-orange-500 border-orange-600 text-white shadow-xl shadow-orange-200 scale-105' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-orange-300 hover:text-orange-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-4 space-y-10">
            {/* Advanced Filters */}
            <GlassCard className="p-10 border-white/80 bg-white/90 h-fit">
               <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-8">Advanced Options</h3>
               <div className="space-y-6">
                {[
                  { id: 'garden', label: 'Garden Space' },
                  { id: 'freeSpace', label: 'Free Space Area' },
                  { id: 'balcony', label: 'Private Balcony' },
                  { id: 'parking', label: 'Parking Garage' }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-600 text-sm">{item.label}</span>
                    <button 
                      onClick={() => setAdvanced({...advanced, [item.id]: !advanced[item.id as keyof typeof advanced]})}
                      className={`w-14 h-8 rounded-full relative transition-colors ${advanced[item.id as keyof typeof advanced] ? 'bg-purple-600' : 'bg-slate-200'}`}
                    >
                      <motion.div 
                        animate={{ x: advanced[item.id as keyof typeof advanced] ? 28 : 4 }}
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                ))}
               </div>

               <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16" />
                  <h4 className="text-lg font-black italic mb-2">Process Request</h4>
                  <p className="text-xs text-white/60 mb-8 font-medium">Click to run AI comparison across 30,000 architectural patterns.</p>
                  
                  <button 
                    onClick={handleSearch}
                    className="w-full bg-white text-indigo-700 font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.03] transition-transform"
                  >
                    ANALYZE MATCHES <ChevronRight className="w-5 h-5" />
                  </button>
               </div>
            </GlassCard>
            
            <div className="p-8 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-40">
               <Settings2 className="w-8 h-8 text-slate-400 mb-4" />
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Configuration Vault v4.2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
