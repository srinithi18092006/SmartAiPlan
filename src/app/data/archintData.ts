
export interface ArchintItem {
  id: string;
  type: 'house' | 'apartment';
  name: string;
  floors: number;
  sqft: number;
  budget: number; // In Rupees (Lakhs)
  style: 'Modern' | 'Traditional' | 'Luxury' | 'Villa' | 'Duplex';
  features: {
    garden: boolean;
    freeSpace: boolean;
    balcony: boolean;
    parking: boolean;
    waterFacility: boolean; // Always true
  };
  image: string;
  tags: string[];
}

export const archintData: ArchintItem[] = [
  {
    id: '1',
    type: 'house',
    name: 'Neo-Modern Villa',
    floors: 2,
    sqft: 2500,
    budget: 120, // 1.2 Crore
    style: 'Villa',
    features: { garden: true, freeSpace: true, balcony: true, parking: true, waterFacility: true },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    tags: ['Best Match', 'Trending']
  },
  {
    id: '2',
    type: 'apartment',
    name: 'Skyline Luxury Suite',
    floors: 1, // Floor within the building or building floors? User said "Number of Floors (1,2,3+)". For apartments this usually refers to the unit floor or building. I'll assume building floors/levels for houses and unit type for apartments.
    sqft: 1200,
    budget: 85,
    style: 'Modern',
    features: { garden: false, freeSpace: false, balcony: true, parking: true, waterFacility: true },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    tags: ['Recommended']
  },
  {
    id: '3',
    type: 'house',
    name: 'Traditional Heritage',
    floors: 1,
    sqft: 1800,
    budget: 65,
    style: 'Traditional',
    features: { garden: true, freeSpace: true, balcony: false, parking: true, waterFacility: true },
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    tags: []
  },
  {
    id: '4',
    type: 'apartment',
    name: 'Zenith Penthouse',
    floors: 2,
    sqft: 3500,
    budget: 180,
    style: 'Luxury',
    features: { garden: true, freeSpace: true, balcony: true, parking: true, waterFacility: true },
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    tags: ['Best Match']
  },
  {
    id: '5',
    type: 'house',
    name: 'Urban Duplex',
    floors: 2,
    sqft: 2200,
    budget: 95,
    style: 'Duplex',
    features: { garden: false, freeSpace: true, balcony: true, parking: true, waterFacility: true },
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800',
    tags: ['Trending']
  },
  // Adding more to reach ~40
  ...Array.from({ length: 35 }).map((_, i) => {
    const isHouse = Math.random() > 0.5;
    const styles: ArchintItem['style'][] = ['Modern', 'Traditional', 'Luxury', 'Villa', 'Duplex'];
    const style = styles[Math.floor(Math.random() * styles.length)];
    const id = (i + 6).toString();
    return {
      id,
      type: isHouse ? 'house' : 'apartment',
      name: `${style} ${isHouse ? 'Home' : 'Residence'} ${id}`,
      floors: Math.floor(Math.random() * 3) + 1,
      sqft: Math.floor(Math.random() * 4500) + 500,
      budget: Math.floor(Math.random() * 155) + 45,
      style,
      features: {
        garden: Math.random() > 0.5,
        freeSpace: Math.random() > 0.5,
        balcony: Math.random() > 0.3,
        parking: Math.random() > 0.2,
        waterFacility: true
      },
      image: `https://images.unsplash.com/photo-${1600000000000 + i}?auto=format&fit=crop&q=60&w=800`, // Placeholder-ish but unique-ish seeds
      tags: Math.random() > 0.8 ? ['Best Match'] : (Math.random() > 0.8 ? ['Recommended'] : [])
    } as ArchintItem;
  })
];
