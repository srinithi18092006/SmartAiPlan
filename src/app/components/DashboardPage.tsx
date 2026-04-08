import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Home, 
  Search, 
  SlidersHorizontal, 
  Heart, 
  ChevronRight, 
  Sun, 
  Moon, 
  Maximize2, 
  MapPin, 
  CreditCard,
  Building,
  Layers,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockPlans, PlanData } from '../data/mockPlans';
import { Logo as BrandLogo } from './Logo';

// --- UI Components ---

const Button = ({ children, onClick, variant = 'primary', className = '' }: any) => {
  const variants = {
    primary: 'bg-[#4CAF50] hover:bg-[#43a047] text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200',
    outline: 'border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400',
  };
  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ plan, onOpen, isFavorite, toggleFavorite }: { plan: PlanData, onOpen: (p: PlanData) => void, isFavorite: boolean, toggleFavorite: (id: string) => void }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 group"
    >
      <div className="relative h-60 overflow-hidden">
        <img 
          src={plan.image} 
          alt={plan.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); toggleFavorite(plan.id); }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorite ? 'bg-[#ff4b4b] text-white' : 'bg-white/20 text-white hover:bg-white/40'
            }`}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        {plan.isRecommended && (
          <div className="absolute top-4 left-4 bg-[#4CAF50] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Sparkles size={12} /> AI PICK
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{plan.title}</h3>
          <span className="text-sm font-semibold text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-0.5 rounded-lg whitespace-nowrap">
            ₹{(plan.cost / 1000000).toFixed(1)} Cr
          </span>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {plan.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-xl">
            <Layers size={14} className="text-[#4CAF50]" />
            <span className="font-medium">{plan.floors} Floors</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-xl">
            {plan.type === 'house' ? (
              <>
                <Maximize2 size={14} className="text-[#4CAF50]" />
                <span className="font-medium">{plan.area} sq ft</span>
              </>
            ) : (
              <>
                <Building size={14} className="text-[#4CAF50]" />
                <span className="font-medium">{plan.units} Units</span>
              </>
            )}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full group" 
          onClick={() => onOpen(plan)}
        >
          {plan.type === 'house' ? 'View Plan' : 'View Details'}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

// --- Main Page ---

export const DashboardPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
  });
  const [selection, setSelection] = useState<'none' | 'house' | 'apartment'>('none');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ floors: 'all', budget: 'all', area: 'all' });
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('favs') || '[]');
  });
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredPlans = useMemo(() => {
    if (selection === 'none') return [];
    return mockPlans.filter(plan => {
      if (plan.type !== selection) return false;
      if (search && !plan.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.floors !== 'all' && plan.floors.toString() !== filters.floors) return false;
      // Add budget/area filtering logic here if needed
      return true;
    });
  }, [selection, search, filters]);

  const recommendations = useMemo(() => {
    return mockPlans.filter(p => p.isRecommended && p.type === selection).slice(0, 5);
  }, [selection]);

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-[#F5F7FA] dark:bg-[#0D0D0D]`}>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center justify-between px-6 md:px-12 py-4 ${
        isScrolled ? 'bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800' : 'bg-transparent'
      }`}>
        <div className="cursor-pointer" onClick={() => setSelection('none')}>
          <BrandLogo />
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search architectural designs..."
            className="w-full bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition-all dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all dark:text-white hover:rotate-12"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4CAF50] to-[#81C784] border-2 border-white dark:border-gray-800 shadow-lg cursor-pointer transition-transform hover:scale-110"></div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6 md:px-12">
        <AnimatePresence mode="wait">
          {selection === 'none' ? (
            <motion.div 
              key="selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-6xl mx-auto h-[70vh] flex flex-col items-center justify-center text-center"
            >
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                Architect Your <br />
                <span className="text-[#4CAF50] bg-clip-text text-transparent bg-gradient-to-r from-[#4CAF50] to-[#81C784]">Dream Space</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-12 max-w-2xl font-medium">
                Choose your destiny. Whether it's a family haven or a professional residential masterpiece, we have the AI-curated designs for you.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white dark:bg-[#121212] p-10 rounded-[3rem] shadow-2xl cursor-pointer group border-2 border-transparent hover:border-[#4CAF50] transition-all"
                  onClick={() => setSelection('house')}
                >
                  <div className="w-20 h-20 bg-[#4CAF50]/10 rounded-3xl flex items-center justify-center text-[#4CAF50] mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Home size={40} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Build a House</h2>
                  <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    Personalized villa, cottage, and residential designs for families. 50+ Modern styles.
                  </p>
                  <div className="mt-8 flex items-center text-[#4CAF50] font-bold gap-2">
                    Start Exploring <ArrowRight size={20} />
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white dark:bg-[#121212] p-10 rounded-[3rem] shadow-2xl cursor-pointer group border-2 border-transparent hover:border-[#4CAF50] transition-all"
                  onClick={() => setSelection('apartment')}
                >
                  <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-all">
                    <Building2 size={40} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Build an Apartment</h2>
                  <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    Commercial towers and multi-unit residential complexes. 30+ Scalable designs.
                  </p>
                  <div className="mt-8 flex items-center text-blue-500 font-bold gap-2">
                    Start Exploring <ArrowRight size={20} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="listings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto"
            >
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                <div>
                  <button 
                    onClick={() => setSelection('none')}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#4CAF50] transition-colors mb-4 font-bold uppercase text-xs tracking-widest"
                  >
                    <ArrowRight size={16} className="rotate-180" /> Back to Selection
                  </button>
                  <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                    Discovery: <span className="text-[#4CAF50]">{selection === 'house' ? 'Modern Houses' : 'Architectural Towers'}</span>
                  </h2>
                </div>
                
                <div className="flex bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                  {['all', '1', '2', '3', '4'].map((num) => (
                    <button
                      key={num}
                      onClick={() => setFilters(f => ({ ...f, floors: num }))}
                      className={`px-5 py-2.5 rounded-xl transition-all font-bold ${
                        filters.floors === num 
                        ? 'bg-[#4CAF50] text-white shadow-lg' 
                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {num === 'all' ? 'All' : `${num}F`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              {search === '' && recommendations.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-2 mb-8">
                    <Sparkles className="text-[#4CAF50]" />
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Recommended for You</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {recommendations.map(plan => (
                      <Card 
                        key={plan.id} 
                        plan={plan} 
                        onOpen={setSelectedPlan}
                        isFavorite={favorites.includes(plan.id)}
                        toggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Listings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredPlans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    plan={plan} 
                    onOpen={setSelectedPlan} 
                    isFavorite={favorites.includes(plan.id)}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>

              {filteredPlans.length === 0 && (
                <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[3rem]">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-6">
                    <Search size={32} />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white">No designs found matching your search.</h3>
                  <button 
                    onClick={() => { setSearch(''); setFilters({ floors: 'all', budget: 'all', area: 'all' }); }}
                    className="text-[#4CAF50] font-bold mt-2"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3D Preview Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#121212] w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-6 right-6 z-20 p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md hover:bg-white/20 rounded-full transition-all dark:text-white"
              >
                <X size={24} />
              </button>

              <div className="md:w-3/5 h-[40vh] md:h-auto overflow-hidden relative group">
                <img src={selectedPlan.image} alt={selectedPlan.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-white">
                    <h4 className="text-3xl font-black text-white/90">3D Interactive Mode</h4>
                    <p className="text-white/70">Move around to see the full architecture</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-lg px-6 py-3 rounded-full border border-white/30 text-white font-bold flex items-center gap-3">
                    <Maximize2 size={20} /> INTERACTIVE PREVIEW READY
                  </div>
                </div>
              </div>

              <div className="md:w-2/5 p-12 overflow-y-auto">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                    selectedPlan.type === 'house' ? 'bg-[#4CAF50]/20 text-[#4CAF50]' : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {selectedPlan.type} design
                  </span>
                </div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6 leading-none tracking-tight">
                  {selectedPlan.title}
                </h2>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-black text-[#4CAF50]">₹{(selectedPlan.cost / 1000000).toFixed(1)}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-bold uppercase text-sm">Cr Estimate</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <Layers className="text-[#4CAF50] mb-2" size={24} />
                    <span className="block text-xl font-bold dark:text-white">{selectedPlan.floors}</span>
                    <span className="text-xs text-gray-500 uppercase font-black tracking-widest">Total Floors</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <Maximize2 className="text-[#4CAF50] mb-2" size={24} />
                    <span className="block text-xl font-bold dark:text-white">{selectedPlan.area.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 uppercase font-black tracking-widest">Sq. Feet</span>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div>
                    <h5 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-3">Architect's Vision</h5>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium capitalize">
                      {selectedPlan.description}
                    </p>
                  </div>
                  
                  {/* Mock Map Planning integration */}
                  <div className="bg-gray-900 dark:bg-black p-6 rounded-[2rem] text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={20} className="text-[#4CAF50]" />
                        <span className="font-bold">Location Planning</span>
                      </div>
                      <span className="text-[10px] bg-[#4CAF50] px-2 py-0.5 rounded text-white font-black uppercase">Live Plot</span>
                    </div>
                    <div className="aspect-video bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700 relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&q=80&w=800')] bg-cover"></div>
                      <div className="relative flex flex-col items-center">
                        <div className="w-4 h-4 bg-[#4CAF50] rounded-full animate-ping mb-2"></div>
                        <p className="text-[10px] font-black tracking-widest uppercase text-white/50">Select construction site</p>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-3 bg-[#4CAF50] rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                      Analyze Plot Compatibility
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="primary" className="flex-1 py-4 text-lg">Download Plan</Button>
                  <button 
                    onClick={() => toggleFavorite(selectedPlan.id)}
                    className={`p-4 rounded-2xl transition-all border-2 ${
                      favorites.includes(selectedPlan.id) 
                      ? 'bg-[#ff4b4b] border-[#ff4b4b] text-white' 
                      : 'border-gray-200 dark:border-gray-800 dark:text-white'
                    }`}
                  >
                    <Heart size={24} fill={favorites.includes(selectedPlan.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-20 bg-white dark:bg-[#080808] border-t border-gray-200 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#4CAF50] rounded-xl flex items-center justify-center text-white">
              <Sparkles size={24} />
            </div>
            <span className="text-xl font-black text-gray-900 dark:text-white transition-all duration-500 uppercase">
              Smart AI <span className="text-[#4CAF50]">Plan</span>
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">
            © 2026 Smart AI Plan. All rights reserved. <br />
            Transforming construction planning with artificial intelligence.
          </p>
          <div className="flex justify-center gap-8 font-black text-sm uppercase tracking-widest text-[#4CAF50]">
            <a href="#" className="hover:opacity-60">Privacy Policy</a>
            <a href="#" className="hover:opacity-60">Terms of Service</a>
            <a href="#" className="hover:opacity-60">Architect Network</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
