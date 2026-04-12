
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard, Navbar, PremiumButton } from '../components/UI';
import { useLocation, useNavigate } from 'react-router';
import { archintData, ArchintItem } from '../data/archintData';
import { 
  Heart, 
  Search, 
  ArrowLeft, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Box, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { filters, type } = location.state || { filters: null, type: 'house' };
  
  const [favorites, setFavorites] = useState<string[]>([]);

  const results = useMemo(() => {
    let filtered = archintData.filter(item => item.type === type);

    if (filters) {
      filtered = filtered.filter(item => {
        // Floor matching
        if (filters.floors) {
          const itemFloorsStr = item.floors >= 3 ? '3+' : item.floors.toString();
          if (filters.floors !== itemFloorsStr) return false;
        }

        // Style matching
        if (filters.style && item.style !== filters.style) return false;

        // Sqft matching
        if (item.sqft < filters.sqft[0] || item.sqft > filters.sqft[1]) return false;

        // Budget matching
        if (item.budget < filters.budget[0] || item.budget > filters.budget[1]) return false;

        // Advanced features - ONLY if filter is ON, item must have it
        if (filters.garden && !item.garden) return false;
        if (filters.freeSpace && !item.freeSpace) return false;
        if (filters.balcony && !item.balcony) return false;
        if (filters.parking && !item.parking) return false;

        return true;
      });
    }

    // Intelligent Sorting: Closest to max sqft and max budget within range
    return [...filtered].sort((a, b) => {
      if (!filters) return 0;
      const aDiff = Math.abs(a.sqft - filters.sqft[1]) + Math.abs(a.budget - filters.budget[1]);
      const bDiff = Math.abs(b.sqft - filters.sqft[1]) + Math.abs(b.budget - filters.budget[1]);
      return aDiff - bDiff;
    });
  }, [filters, type]);

  // Ensure at least 30 if available? 
  // User says "Ensure at least 30 matching results are displayed IF AVAILABLE"
  // If we have 50 items total, and filters are strict, we might have fewer than 30.
  // I will just show whatever matches strictly. My mock data generation is random, 
  // so I'll hope for the best or provide a "Show More" if needed.
  // Actually, I'll limit to first 30 for the 'Results' requirement or show all matching.
  
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-colorful-mesh relative pb-24">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-36">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="space-y-4">
            <motion.div 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-3 text-purple-600 mb-2 font-black text-xs uppercase tracking-widest"
            >
              <CheckCircle2 className="w-4 h-4" /> AI Matching Engine Active
            </motion.div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase">
              Intelligence <span className="text-purple-600">Results</span>
            </h1>
            <div className="flex items-center gap-3">
               <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 font-bold text-xs border border-slate-200">
                Found {results.length} Strict Matches
               </span>
               <span className="text-slate-400 text-xs font-medium italic">Sorting by: Best Match</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <PremiumButton 
              onClick={() => navigate(-1)}
              variant="ghost"
              className="flex items-center gap-2 border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" /> MODIFY PREFERENCES
            </PremiumButton>
          </div>
        </div>

        {results.length === 0 ? (
          <GlassCard className="p-20 flex flex-col items-center justify-center text-center">
            <Sparkles className="w-16 h-16 text-purple-200 mb-6" />
            <h2 className="text-2xl font-black text-slate-800 mb-2">No results matching strict criteria</h2>
            <p className="text-slate-400 max-w-md mx-auto">Try relaxing your budget or square footage filters for more matches.</p>
            <PremiumButton onClick={() => navigate(-1)} variant="purple" className="mt-8">GO BACK</PremiumButton>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {results.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <GlassCard className="p-0 overflow-hidden h-full flex flex-col border-white hover:border-purple-300 transition-all shadow-xl bg-white/90">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <button 
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
                      </button>
                      
                      <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span key={tag} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border ${
                            tag === 'Best Match' ? 'bg-purple-600 border-purple-700 text-white shadow-lg shadow-purple-200' : 
                            tag === 'Recommended' ? 'bg-blue-500 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-pink-500 border-pink-600 text-white shadow-lg'
                          }`}>
                            {tag === 'Best Match' && <Award className="w-3 h-3" />}
                            {tag === 'Trending' && <TrendingUp className="w-3 h-3" />}
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 flex-grow flex flex-col bg-white">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-black text-slate-800 italic uppercase leading-tight">{item.name}</h3>
                        <div className="text-right">
                          <span className="text-xs font-black text-slate-400 block uppercase">Budget</span>
                          <span className="text-purple-600 font-black text-xl italic">₹{item.budget}L</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-slate-300 uppercase italic">Area</span>
                           <span className="text-sm font-bold text-slate-600">{item.sqft} sq.ft</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-slate-300 uppercase italic">Floors</span>
                           <span className="text-sm font-bold text-slate-600">{item.floors} Levels</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-slate-300 uppercase italic">Style</span>
                           <span className="text-sm font-bold text-slate-600">{item.style}</span>
                        </div>
                         <div className="flex flex-col">
                           <span className="text-[10px] font-black text-slate-300 uppercase italic">Status</span>
                           <span className="text-xs font-black text-green-500 flex items-center gap-1">APPROVED</span>
                        </div>
                      </div>

                      <div className="mt-auto space-y-3">
                        <PremiumButton variant="outline" className="w-full text-xs tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2">
                           <ExternalLink className="w-4 h-4" /> VIEW DETAILS
                        </PremiumButton>
                        <PremiumButton className="w-full text-xs tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2" variant="purple">
                           <Box className="w-4 h-4" /> VIEW IN 3D
                        </PremiumButton>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
