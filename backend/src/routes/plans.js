const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

// Create a new plan
router.post('/', auth, async (req, res) => {
  try {
    const plan = new Plan({
      ...req.body,
      userId: req.userId
    });
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ message: 'Error creating plan', error: err.message });
  }
});

// Get all plans for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const plans = await Plan.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
