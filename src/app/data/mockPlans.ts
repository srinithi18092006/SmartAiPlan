export interface PlanData {
  id: string;
  type: 'house' | 'apartment';
  title: string;
  category: string; // '1 Floor', '2 Floors', etc.
  floors: number;
  units?: number;
  area: number;
  cost: number;
  description: string;
  image: string;
  isRecommended?: boolean;
}

export const mockPlans: PlanData[] = [
  // HOUSE SECTION (50+)
  ...Array.from({ length: 55 }).map((_, i) => {
    const floorCount = (i % 4) + 1;
    const houseTypes = ['Luxury Villa', 'Modern Duplex', 'Compact Home', 'Minimalist Cottage', 'Urban Retreat', 'Smart Bungalow', 'Glass Residence', 'Traditional Manse'];
    const area = 1200 + Math.floor(Math.random() * 2800);
    const cost = Math.floor(area * (3000 + Math.random() * 2000));
    
    return {
      id: `h-${i}`,
      type: 'house' as const,
      title: `${houseTypes[i % houseTypes.length]} ${i + 1}`,
      category: `${floorCount} Floor${floorCount > 1 ? 's' : ''}`,
      floors: floorCount,
      area: area,
      cost: cost,
      description: `A beautiful ${floorCount}-floor modern home design featuring an open-concept layout and premium finishes. Perfect for modern families seeking architectural excellence.`,
      image: `https://images.unsplash.com/photo-${[
        '1580587767376-0428ad360e52',
        '1512917774080-9991f1c4c750',
        '1613490493576-7fde63acd811',
        '1592595825556-9800eec7a97d',
        '1600585154340-be6161a56a0c',
        '1600047509807-ba8f99d2cdde',
        '1600566752355-3979013ecd7e',
        '1518732714860-b62714ce0c5e'
      ][i % 8]}?auto=format&fit=crop&q=80&w=800`,
      isRecommended: i < 5
    };
  }),
  // APARTMENT SECTION (30+)
  ...Array.from({ length: 35 }).map((_, i) => {
    const floorCount = 5 + Math.floor(Math.random() * 15);
    const units = floorCount * (2 + Math.floor(Math.random() * 4));
    const apartmentTypes = ['Urban Tower', 'Premium Residency', 'Skyline Suites', 'Aura Apartments', 'Metro Living', 'Centrum Heights', 'Legacy Woods', 'Harmony Residency'];
    const cost = Math.floor(units * (2500000 + Math.random() * 1500000));
    
    return {
      id: `a-${i}`,
      type: 'apartment' as const,
      title: `${apartmentTypes[i % apartmentTypes.length]} ${i + 1}`,
      category: 'Residential Complex',
      floors: floorCount,
      units: units,
      area: units * 850,
      cost: cost,
      description: `A state-of-the-art apartment building with ${floorCount} floors and ${units} premium units. Designed for maximum efficiency and modern comfort.`,
      image: `https://images.unsplash.com/photo-${[
        '1545324418-cc1a3fa10c00',
        '1536645232517-3a5a947d894b',
        '1515263487990-61b07816b324',
        '1493246318656-5bbd4cfb7ca3',
        '1460317442991-0ec2393ba0ad',
        '1560448204-603b3fc33ddc',
        '1567496898669-ee935f5f647a',
        '1522708323590-d24dbb6b0267'
      ][i % 8]}?auto=format&fit=crop&q=80&w=800`
    };
  })
] as const;
