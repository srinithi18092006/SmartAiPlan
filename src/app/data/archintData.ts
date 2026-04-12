
export interface ArchintItem {
  id: string;
  type: 'house' | 'apartment';
  name: string;
  floors: number;
  sqft: number;
  budget: number; // In Lakhs
  style: 'Modern' | 'Traditional' | 'Luxury' | 'Villa' | 'Duplex';
  garden: boolean;
  freeSpace: boolean;
  balcony: boolean;
  parking: boolean;
  waterFacility: boolean; // Always true
  image: string;
  tags: string[];
}

export const archintData: ArchintItem[] = Array.from({ length: 50 }).map((_, i) => {
  const isHouse = Math.random() > 0.5;
  const styles: ArchintItem['style'][] = ['Modern', 'Traditional', 'Luxury', 'Villa', 'Duplex'];
  const style = styles[Math.floor(Math.random() * styles.length)];
  const id = (i + 1).toString();
  
  // Distribute floors, sqft and budget realistically
  const floors = Math.random() > 0.3 ? (Math.random() > 0.5 ? 2 : 1) : 3;
  const sqft = Math.floor(Math.random() * 4500) + 500;
  
  // Budget logic based on style and sqft
  let baseBudget = 45; // Min
  if (style === 'Luxury') baseBudget = 150;
  if (style === 'Villa') baseBudget = 100;
  const budget = Math.min(200, Math.floor(baseBudget + (sqft / 50) + Math.random() * 20));

  return {
    id,
    type: isHouse ? 'house' : 'apartment',
    name: `${style} ${isHouse ? 'Home' : 'Residence'} ${id}`,
    floors,
    sqft,
    budget,
    style,
    garden: Math.random() > 0.5,
    freeSpace: Math.random() > 0.5,
    balcony: Math.random() > 0.3,
    parking: Math.random() > 0.2,
    waterFacility: true,
    image: `https://images.unsplash.com/photo-${1600585154340 + i}?auto=format&fit=crop&q=80&w=800`,
    tags: i % 5 === 0 ? ['Best Match'] : (i % 7 === 0 ? ['Recommended'] : (i % 9 === 0 ? ['Trending'] : []))
  };
});
