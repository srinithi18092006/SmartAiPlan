export interface PlanData {
  id: string;
  type: 'house' | 'apartment';
  title: string;
  category: string;
  floors: number;
  area: number;
  cost: number;
  bedrooms: number;
  bathrooms: number;
  balcony: 'With Balcony' | 'Without Balcony' | 'Multiple Balconies';
  kitchen: 'Standard Kitchen' | 'Open Kitchen' | 'Modular Kitchen';
  dining: 'Separate Dining' | 'Combined Living + Dining';
  parking: 'Yes' | 'No';
  waterFacility: string[];
  description: string;
  image: string;
  isRecommended?: boolean;
  units?: number;
  unitsPerFloor?: number;
  familyType?: string;
  plotFit?: string;
  floorPlan?: {
    [key: string]: string[];
  };
  gallery?: string[];
}

const houseImages = [
  'https://images.unsplash.com/photo-1580587767376-0428ad360e52',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  'https://images.unsplash.com/photo-1592595825556-9800eec7a97d',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
  'https://images.unsplash.com/photo-1600566752355-3979013ecd7e',
  'https://images.unsplash.com/photo-1518732714860-b62714ce0c5e',
  'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09',
  'https://images.unsplash.com/photo-1513584684374-8bdb74838a0f'
];

const apartmentImages = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
  'https://images.unsplash.com/photo-1536645232517-3a5a947d894b',
  'https://images.unsplash.com/photo-1515263487990-61b07816b324',
  'https://images.unsplash.com/photo-1493246318656-5bbd4cfb7ca3',
  'https://images.unsplash.com/photo-1460317442991-0ec2393ba0ad',
  'https://images.unsplash.com/photo-1560448204-603b3fc33ddc',
  'https://images.unsplash.com/photo-1567496898669-ee935f5f647a',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
];

const interiorImages = [
  'https://images.unsplash.com/photo-1616486341351-70ad52b6fca4',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
  'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77',
  'https://images.unsplash.com/photo-1617806118233-18e1db207fa6',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b'
];

const houseTitles = [
  'Compact Urban Home', 'Modern Duplex Villa', 'Green Courtyard House', 'Skyline Bungalow',
  'Elite Family Residence', 'Luxury Terrace Home', 'Minimal Cube House', 'Garden Edge Villa',
  'Zen Harmony Retreat', 'Coastal Pearl Villa', 'Mountain Peak Lodge', 'Nordic Pine Home',
  'Saffron Heritage Villa', 'Indigo Creek House', 'Maple Leaf Residency', 'Azure Horizon Hub',
  'Velvet Petal Villa', 'Rustic Charm Estate', 'Infinity View House', 'Silent Woods Cabin'
];

const apartmentTitles = [
  'Urban Tower', 'Premium Residency', 'Skyview Heights', 'Green Arc Apartments',
  'Elite Metro Homes', 'Pearl Residency', 'Horizon Living', 'City Nest Towers',
  'Amber Sky Suites', 'Crystal Plaza', 'Emerald Gardens', 'Sapphire Towers',
  'Diamond Residency', 'Ruby Heights', 'Opal Estates', 'Platinum Towers'
];

const generateHousePlans = (): PlanData[] => {
  const plans: PlanData[] = [];
  
  // Floor distribution
  const counts = { 1: 30, 2: 25, 3: 15, 4: 10 };
  
  Object.entries(counts).forEach(([floor, count]) => {
    for (let i = 0; i < count; i++) {
      const floors = parseInt(floor);
      const bedrooms = floors + Math.floor(Math.random() * 3);
      const area = 800 + (floors * 600) + Math.floor(Math.random() * 1000);
      const cost = 5000000 + (floors * 2000000) + (area * 2000) + Math.floor(Math.random() * 1000000);
      
      plans.push({
        id: `house-${floor}-${i}`,
        type: 'house',
        title: `${houseTitles[Math.floor(Math.random() * houseTitles.length)]} ${i + 1}`,
        category: `${floors} Floor${floors > 1 ? 's' : ''}`,
        floors: floors,
        area: area,
        cost: cost,
        bedrooms: bedrooms,
        bathrooms: bedrooms + (Math.random() > 0.5 ? 1 : 0),
        balcony: Math.random() > 0.3 ? 'With Balcony' : 'Without Balcony',
        kitchen: ['Standard Kitchen', 'Open Kitchen', 'Modular Kitchen'][Math.floor(Math.random() * 3)] as any,
        dining: Math.random() > 0.5 ? 'Separate Dining' : 'Combined Living + Dining' as any,
        parking: Math.random() > 0.2 ? 'Yes' : 'No',
        waterFacility: ['Borewell', 'Underground Sump', 'Overhead Tank', 'Rainwater Harvesting'].filter(() => Math.random() > 0.3),
        description: `A sophisticated ${floors}-floor residence optimally designed for comfort and modern aesthetics. Features a spacious ${bedrooms}BHK layout with premium ventilation and high-end finishes.`,
        image: `${houseImages[Math.floor(Math.random() * houseImages.length)]}?auto=format&fit=crop&q=80&w=800`,
        gallery: interiorImages.sort(() => 0.5 - Math.random()).slice(0, 4),
        familyType: floors > 2 ? 'Large Extended Family' : 'Modern nuclear family',
        plotFit: floors === 1 ? '30x40, 40x60' : '30x40',
        isRecommended: i < 3 && floors < 3,
        floorPlan: {
          'Ground Floor': ['Living Room', 'Kitchen', 'Dining Area', '1 Bedroom', 'Common Bathroom'],
          'First Floor': floors > 1 ? [`${bedrooms - 1} Bedrooms`, 'Family Lounge', 'Balcony', 'En-suite Bathrooms'] : []
        }
      });
    }
  });
  
  return plans;
};

const generateApartmentPlans = (): PlanData[] => {
  const plans: PlanData[] = [];
  const floorsOptions = [8, 9, 10];
  
  floorsOptions.forEach((floors) => {
    for (let i = 0; i < 12; i++) {
        const unitsPerFloor = 4 + Math.floor(Math.random() * 4);
        const totalUnits = floors * unitsPerFloor;
        const area = 800 * unitsPerFloor * floors; // Rough total build area
        const cost = 20000000 + (totalUnits * 4000000) + Math.floor(Math.random() * 50000000);

        plans.push({
            id: `apt-${floors}-${i}`,
            type: 'apartment',
            title: `${apartmentTitles[Math.floor(Math.random() * apartmentTitles.length)]} ${i + 1}`,
            category: 'Premium Residency',
            floors: floors,
            area: area,
            cost: cost,
            bedrooms: 2 + (i % 3),
            bathrooms: 2 + (i % 2),
            units: totalUnits,
            unitsPerFloor: unitsPerFloor,
            balcony: 'With Balcony',
            kitchen: 'Modular Kitchen',
            dining: 'Separate Dining',
            parking: 'Yes',
            waterFacility: ['Municipal Line', 'STP Plant', 'Overhead Storage', 'Fire Hydrant'],
            description: `A majestic ${floors}-floor luxury apartment complex designed for premium urban living. Each floor features ${unitsPerFloor} meticulously planned units with dual-aspect ventilation and city views.`,
            image: `${apartmentImages[Math.floor(Math.random() * apartmentImages.length)]}?auto=format&fit=crop&q=80&w=800`,
            gallery: interiorImages.sort(() => 0.5 - Math.random()).slice(0, 4),
            isRecommended: i < 2,
            floorPlan: {
              'Typical Floor': [`${unitsPerFloor} Units`, 'Centrally Ventilated Corridor', '2 High-speed Lifts', 'Fire Staircase'],
              'Ground Floor': ['Grand Lobby', 'Security Desk', 'Parking Zone', 'Utility Hub']
            }
        });
    }
  });

  return plans;
};

export const richMockPlans: PlanData[] = [...generateHousePlans(), ...generateApartmentPlans()];
