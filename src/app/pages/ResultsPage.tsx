
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard, Navbar, NeonButton } from '../components/UI';
import { useLocation, useNavigate } from 'react-router';
import { archintData, ArchintItem } from '../data/archintData';
import { Heart, Search, Filter, TrendingUp, Award, CheckCircle2, Box } from 'lucide-react';

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
        const itemFloors = item.floors >= 3 ? '3+' : item.floors.toString();
        if (filters.floors !== itemFloors) return false;

        // Sqft matching (item within range)
        if (item.sqft < filters.sqft[0] || item.sqft > filters.sqft[1]) return false;

        // Budget matching
        if (item.budget < filters.budget[0] || item.budget > filters.budget[1]) return false;

        // Style matching
        if (item.style !== filters.style) return false;

        // Advanced features - if filter is ON, item must have it
        if (filters.garden && !item.features.garden) return false;
        if (filters.freeSpace && !item.features.freeSpace) return false;
        if (filters.balcony && !item.features.balcony) return false;
        if (filters.parking && !item.features.parking) return false;

        return true;
      });
    }

    // If results are fewer than 10, let's relax some filters or just show a good variety
    if (filtered.length < 5) {
      // In a real app we'd relax filters, here we'll just ensure at least some results or tell user
      // For this demo, let's just use the filtered ones
    }

    // Always ensure at least 30 results displayed (instruction said "Always display at least 30 results if available")
    // This is a bit contradictory to "Filter logic", but I'll display the "Best Matches" followed by others.
    
    // Calculate match score for sorting
    return [...filtered].sort((a, b) => {
      if (!filters) return 0;
      const aScore = Math.abs(a.sqft - filters.sqft[1]) + Math.abs(a.budget - filters.budget[1]);
      const bScore = Math.abs(b.sqft - filters.sqft[1]) + Math.abs(b.budget - filters.budget[1]);
      return aScore - bScore;
    });
  }, [filters, type]);

  // If filtered results are too few, we append some other relevant ones to satisfy the "30 results" requirement
  const displayResults = useMemo(() => {
    if (results.length >= 30) return results;
    const extras = archintData.filter(item => !results.find(r => r.id === item.id)).slice(0, 30 - results.length);
    return [...results, ...extras];
  }, [results]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#050505] relative pb-20">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">AI Analysis Complete</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight uppercase">Intelligence Results</h1>
            <p className="text-white/40 mt-1">Found {results.length} perfect matches for your criteria</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <Filter className="w-4 h-4" /> Modity Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {displayResults.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <GlassCard className="p-0 overflow-hidden h-full flex flex-col border-white/5 group-hover:border-primary/30 transition-all">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <button 
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-primary/20 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-primary text-primary' : 'text-white'}`} />
                    </button>
                    
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 ${
                          tag === 'Best Match' ? 'bg-primary text-black' : 
                          tag === 'Recommended' ? 'bg-white text-black' : 'bg-secondary text-white'
                        }`}>
                          {tag === 'Best Match' && <Award className="w-3 h-3" />}
                          {tag === 'Trending' && <TrendingUp className="w-3 h-3" />}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <span className="text-primary font-black">₹{item.budget}L</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-white/50 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> {item.sqft} sq.ft
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> {item.floors} Floors
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> {item.style}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500/40" /> Water Facility
                      </div>
                    </div>

                    <div className="mt-auto space-y-3">
                      <button className="w-full py-3 rounded-lg bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                         VIEW DETAILS
                      </button>
                      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-blue-600 text-black font-black hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                         <Box className="w-4 h-4" /> VIEW IN 3D
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
