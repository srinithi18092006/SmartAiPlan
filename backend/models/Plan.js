const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    default: 'New House Plan'
  },
  length: {
    type: Number,
    required: true
  },
  breadth: {
    type: Number,
    required: true
  },
  totalArea: {
    type: Number,
    required: true
  },
  floors: {
    type: String,
    required: true
  },
  bedrooms: {
    type: String,
    required: true
  },
  bathrooms: {
    type: String,
    required: true
  },
  features: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plan', planSchema);
