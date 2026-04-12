
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard, NeonButton, Navbar } from '../components/UI';
import { useNavigate, useParams } from 'react-router';
import { Settings, Sliders, ChevronDown } from 'lucide-react';

export const SelectionPage: React.FC = () => {
  const { type } = useParams<{ type: 'house' | 'apartment' }>();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    floors: '2',
    sqft: [1000, 3000],
    budget: [60, 150],
    style: 'Modern',
    garden: true,
    freeSpace: false,
    balcony: true,
    parking: true
  });

  const handleSearch = () => {
    // Pass filters via query params or state
    navigate('/results', { state: { filters, type } });
  };

  return (
    <div className="min-h-screen bg-[#050505] relative pb-20">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/40">
            <Settings className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Configure {type}</h1>
            <p className="text-white/40">Set your preferences for the AI to analyze</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" /> Basic Filters
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Number of Floors */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-white/60 uppercase">Number of Floors</label>
                  <div className="flex gap-4">
                    {['1', '2', '3+'].map(f => (
                      <button 
                        key={f}
                        onClick={() => setFilters({...filters, floors: f})}
                        className={`flex-1 py-3 rounded-lg border transition-all ${
                          filters.floors === f 
                            ? 'bg-primary border-primary text-black font-bold' 
                            : 'bg-white/5 border-white/10 text-white/60 hover:border-primary/50'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Dropdown */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-white/60 uppercase">Architectural Style</label>
                  <div className="relative">
                    <select 
                      value={filters.style}
                      onChange={(e) => setFilters({...filters, style: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:border-primary focus:outline-none"
                    >
                      <option className="bg-[#050505]">Modern</option>
                      <option className="bg-[#050505]">Traditional</option>
                      <option className="bg-[#050505]">Luxury</option>
                      <option className="bg-[#050505]">Villa</option>
                      <option className="bg-[#050505]">Duplex</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>

                {/* Range Sliders (Simplified as number inputs for this demo or custom UI) */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-white/60 uppercase flex justify-between">
                    <span>Square Feet Range</span>
                    <span className="text-primary">{filters.sqft[0]} - {filters.sqft[1]} sq.ft</span>
                  </label>
                  <input 
                    type="range" min="500" max="5000" step="100"
                    onChange={(e) => setFilters({...filters, sqft: [500, parseInt(e.target.value)]})}
                    className="w-full accent-primary bg-white/10 rounded-lg h-2"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-white/60 uppercase flex justify-between">
                    <span>Budget Range (₹ Lakhs)</span>
                    <span className="text-secondary">₹{filters.budget[0]} - ₹{filters.budget[1]} L</span>
                  </label>
                  <input 
                    type="range" min="45" max="200" step="5"
                    onChange={(e) => setFilters({...filters, budget: [45, parseInt(e.target.value)]})}
                    className="w-full accent-secondary bg-white/10 rounded-lg h-2"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-2 border-secondary/10">
              <h3 className="text-xl font-bold mb-8">Advanced Customization</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { id: 'garden', label: 'Garden' },
                  { id: 'freeSpace', label: 'Free Space' },
                  { id: 'balcony', label: 'Balcony' },
                  { id: 'parking', label: 'Parking' }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="font-medium text-white/80">{item.label}</span>
                    <button 
                      onClick={() => setFilters({...filters, [item.id]: !filters[item.id as keyof typeof filters]})}
                      className={`w-12 h-6 rounded-full relative transition-colors ${filters[item.id as keyof typeof filters] ? 'bg-primary' : 'bg-white/20'}`}
                    >
                      <motion.div 
                        animate={{ x: filters[item.id as keyof typeof filters] ? 24 : 4 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs text-white/30 italic font-medium border-t border-white/5 pt-4 uppercase tracking-widest">
                * Water facility is included by default in all design templates.
              </p>
            </GlassCard>
          </div>

          <div className="lg:col-span-1">
            <GlassCard className="sticky top-32 p-8 border-2 border-primary/30 neon-glow-blue overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -mr-16 -mt-16" />
               <h3 className="text-2xl font-black mb-4">Summary</h3>
               <div className="space-y-4 mb-8">
                 <div className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-white/40">Category</span>
                   <span className="font-bold underline uppercase">{type}</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-white/40">Preferred Style</span>
                   <span className="font-bold">{filters.style}</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-white/40">Floors</span>
                   <span className="font-bold">{filters.floors}</span>
                 </div>
               </div>
               
               <NeonButton className="w-full py-4 text-lg" onClick={handleSearch}>
                 FIND MATCHES
               </NeonButton>
               
               <p className="text-center text-xs text-white/30 mt-6">
                 Analyzing 5,000+ patterns...
               </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};
