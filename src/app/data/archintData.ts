
export interface ArchintItem {
  id: string;
  type: 'house' | 'apartment';
  name: string;
  floors: number;
  sqft: number;
  budget: number; // In Lakhs
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

const styles: ArchintItem['style'][] = ['Modern', 'Traditional', 'Luxury', 'Villa', 'Duplex'];

const generateMockData = (): ArchintItem[] => {
  const data: ArchintItem[] = [];
  const houseImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68',
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be'
  ];

  const aptImages = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    'https://images.unsplash.com/photo-1527359355573-7bcf9121723e',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
    'https://images.unsplash.com/photo-1536376074432-8d4a34227494',
    'https://images.unsplash.com/photo-1567496898731-f39b0dca80d5'
  ];

  for (let i = 1; i <= 60; i++) {
    const isHouse = Math.random() > 0.4;
    const style = styles[Math.floor(Math.random() * styles.length)];
    const floors = Math.floor(Math.random() * 3) + 1;
    const sqft = Math.floor(Math.random() * 4500) + 500;
    const budget = Math.floor(Math.random() * 155) + 45;
    
    // Assign image based on type
    const imgPool = isHouse ? houseImages : aptImages;
    const imgUrl = `${imgPool[Math.floor(Math.random() * imgPool.length)]}?auto=format&fit=crop&q=80&w=800`;

    data.push({
      id: i.toString(),
      type: isHouse ? 'house' : 'apartment',
      name: `${style} ${isHouse ? 'Mansion' : 'Estate'} ${i}`,
      floors,
      sqft,
      budget,
      style,
      features: {
        garden: Math.random() > 0.5,
        freeSpace: Math.random() > 0.5,
        balcony: Math.random() > 0.4,
        parking: Math.random() > 0.3,
        waterFacility: true
      },
      image: imgUrl,
      tags: Math.random() > 0.8 ? ['Best Match'] : (Math.random() > 0.8 ? ['Recommended'] : (Math.random() > 0.8 ? ['Trending'] : []))
    });
  }

  return data;
};

export const archintData = generateMockData();
