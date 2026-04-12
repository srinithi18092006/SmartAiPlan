
const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  type: { type: String, enum: ['house', 'apartment'], required: true },
  floors: { type: Number, required: true },
  sqft: { type: Number, required: true },
  style: { type: String, required: true },
  budget: { type: Number, required: true },
  garden: { type: Boolean, default: false },
  freeSpace: { type: Boolean, default: false },
  balcony: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
  waterFacility: { type: Boolean, default: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Design', designSchema);
