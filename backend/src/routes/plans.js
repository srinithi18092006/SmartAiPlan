
const express = require('express');
const router = express.Router();
const Design = require('../models/Design');

// GET /api/plans
router.get('/', async (req, res) => {
  try {
    const { 
      type,
      floors, 
      minSqft, maxSqft, 
      minBudget, maxBudget, 
      style, 
      garden, balcony, parking, freeSpace 
    } = req.query;

    let query = {};

    if (type) query.type = type;
    
    // Strict match floors
    if (floors) {
      if (floors === '3+') {
        query.floors = { $gte: 3 };
      } else {
        query.floors = parseInt(floors);
      }
    }

    // Range sqft
    if (minSqft || maxSqft) {
      query.sqft = {};
      if (minSqft) query.sqft.$gte = parseInt(minSqft);
      if (maxSqft) query.sqft.$lte = parseInt(maxSqft);
    }

    // Range budget
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = parseInt(minBudget);
      if (maxBudget) query.budget.$lte = parseInt(maxBudget);
    }

    // Strict match style
    if (style) query.style = style;

    // Advanced options - if 'true' passed, item must have it
    if (garden === 'true') query.garden = true;
    if (balcony === 'true') query.balcony = true;
    if (parking === 'true') query.parking = true;
    if (freeSpace === 'true') query.freeSpace = true;

    const designs = await Design.find(query).limit(100);
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
