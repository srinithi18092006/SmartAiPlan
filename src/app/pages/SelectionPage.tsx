
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard, NeonButton, Navbar, InputBox, SelectableButton } from '../components/UI';
import { useNavigate, useParams } from 'react-router';
import { Settings, Ruler, Wallet, Palette, Info, ArrowRight, ToggleLeft, ToggleRight } from 'lucide-react';

export const SelectionPage: React.FC = () => {
  const { type } = useParams<{ type: 'house' | 'apartment' }>();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    floors: '2',
    minSqft: '1000',
    maxSqft: '3000',
    minBudget: '60',
    maxBudget: '150',
    style: 'Modern',
    garden: true,
    freeSpace: false,
    balcony: true,
    parking: true
  });

  const handleSearch = () => {
    navigate('/results', { state: { filters, type } });
  };

  const Toggle = ({ active, onClick, label }: any) => (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-white/40 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer" onClick={onClick}>
      <span className="font-bold text-slate-600 text-sm uppercase tracking-wider">{label}</span>
      {active ? <ToggleRight className="text-blue-600 w-10 h-10" /> : <ToggleLeft className="text-slate-300 w-10 h-10" />}
    </div>
  );

  return (
    <div className="min-h-screen bg-colorful-mesh relative pb-20">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-100">
              <Settings className="text-blue-600 w-8 h-8 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight uppercase">Platform Configurator</h1>
              <p className="text-slate-400 font-medium">Define your architectural requirements for AI processing</p>
            </div>
          </div>
          <div className="px-6 py-3 bg-blue-50 border border-blue-100 rounded-2xl text-blue-600 font-black text-sm uppercase tracking-widest">
            Targeting: {type}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Floors & Style Section */}
            <GlassCard className="p-10 border-white/60 bg-white/60">
              <div className="flex items-center gap-3 mb-10 border-b border-slate-100 pb-6">
                <Palette className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Base Configuration</h3>
              </div>
              
              <div className="space-y-12">
                <div className="space-y-6">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest block">Number of Floors</label>
                  <div className="flex flex-wrap gap-4">
                    {['1', '2', '3+'].map(f => (
                      <SelectableButton 
                        key={f} 
                        label={f} 
                        selected={filters.floors === f} 
                        onClick={() => setFilters({...filters, floors: f})}
                        className="flex-1 min-w-[100px]"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-2 flex items-center gap-1"><Info className="w-3 h-3" /> Determines vertical structure and load calculations</p>
                </div>

                <div className="space-y-6">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest block">Architectural Style</label>
                  <div className="flex flex-wrap gap-4">
                    {['Modern', 'Traditional', 'Luxury', 'Villa', 'Duplex'].map(s => (
                      <SelectableButton 
                        key={s} 
                        label={s} 
                        selected={filters.style === s} 
                        onClick={() => setFilters({...filters, style: s})}
                        className="flex-1 min-w-[140px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Metrics Section */}
            <GlassCard className="p-10 border-white/60 bg-white/60">
              <div className="flex items-center gap-3 mb-10 border-b border-slate-100 pb-6">
                <Ruler className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Size & Dimensions</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-10">
                <InputBox 
                  label="Min Sq.ft" 
                  type="number" 
                  value={filters.minSqft} 
                  onChange={(v) => setFilters({...filters, minSqft: v})} 
                  placeholder="500"
                />
                <InputBox 
                  label="Max Sq.ft" 
                  type="number" 
                  value={filters.maxSqft} 
                  onChange={(v) => setFilters({...filters, maxSqft: v})} 
                  placeholder="5000"
                />
              </div>
            </GlassCard>

            {/* Financials Section */}
            <GlassCard className="p-10 border-white/60 bg-white/60">
              <div className="flex items-center gap-3 mb-10 border-b border-slate-100 pb-6">
                <Wallet className="w-6 h-6 text-yellow-500" />
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Budget Allocation (₹ Lakhs)</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-10">
                <InputBox 
                  label="Min Budget" 
                  type="number" 
                  value={filters.minBudget} 
                  onChange={(v) => setFilters({...filters, minBudget: v})} 
                  placeholder="45"
                />
                <InputBox 
                  label="Max Budget" 
                  type="number" 
                  value={filters.maxBudget} 
                  onChange={(v) => setFilters({...filters, maxBudget: v})} 
                  placeholder="200"
                />
              </div>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-8 italic text-center">Global estimates based on current market analytics</p>
            </GlassCard>
          </div>

          <div className="lg:col-span-4 space-y-10">
            {/* Advanced Filters */}
            <GlassCard className="p-10 border-white/60 bg-white/60">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-8">Advanced Modules</h3>
              <div className="space-y-4">
                <Toggle label="Garden Space" active={filters.garden} onClick={() => setFilters({...filters, garden: !filters.garden})} />
                <Toggle label="Free Area" active={filters.freeSpace} onClick={() => setFilters({...filters, freeSpace: !filters.freeSpace})} />
                <Toggle label="Integrated Balcony" active={filters.balcony} onClick={() => setFilters({...filters, balcony: !filters.balcony})} />
                <Toggle label="Underground Parking" active={filters.parking} onClick={() => setFilters({...filters, parking: !filters.parking})} />
              </div>
            </GlassCard>

            {/* Summary & Search */}
            <GlassCard className="p-10 border-blue-200 bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-2xl shadow-blue-500/20 sticky top-32">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-8">AI Summary</h3>
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center border-b border-white/20 pb-4">
                  <span className="text-xs font-bold uppercase opacity-60">Category</span>
                  <span className="font-black text-sm uppercase">{type}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-4">
                  <span className="text-xs font-bold uppercase opacity-60">Style Target</span>
                  <span className="font-black text-sm uppercase">{filters.style}</span>
                </div>
              </div>
              
              <button 
                onClick={handleSearch}
                className="w-full bg-white text-blue-600 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl"
              >
                GENERATE BLUEPRINTS <ArrowRight className="w-5 h-5" />
              </button>
              
              <p className="text-[8px] text-center font-bold uppercase mt-6 opacity-40">Architectural Intelligence v4.0.01</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};
