
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Design = require('./models/Design');

const designs = Array.from({ length: 50 }).map((_, i) => {
  const isHouse = Math.random() > 0.5;
  const styles = ['Modern', 'Traditional', 'Luxury', 'Villa', 'Duplex'];
  const style = styles[Math.floor(Math.random() * styles.length)];
  const floors = Math.random() > 0.3 ? (Math.random() > 0.5 ? 2 : 1) : 3;
  const sqft = Math.floor(Math.random() * 4500) + 500;
  
  let baseBudget = 45;
  if (style === 'Luxury') baseBudget = 150;
  if (style === 'Villa') baseBudget = 100;
  const budget = Math.min(200, Math.floor(baseBudget + (sqft / 50) + Math.random() * 20));

  return {
    type: isHouse ? 'house' : 'apartment',
    floors,
    sqft,
    style,
    budget,
    garden: Math.random() > 0.5,
    freeSpace: Math.random() > 0.5,
    balcony: Math.random() > 0.3,
    parking: Math.random() > 0.2,
    waterFacility: true,
    image: `https://images.unsplash.com/photo-${1600585154340 + i}?auto=format&fit=crop&q=80&w=800`,
    name: `${style} ${isHouse ? 'Home' : 'Residence'} ${i + 1}`,
    tags: i % 5 === 0 ? ['Best Match'] : (i % 7 === 0 ? ['Recommended'] : [])
  };
});

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected for seeding...');
    await Design.deleteMany({});
    await Design.insertMany(designs);
    console.log('Seeded 50 designs!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
}

seed();
