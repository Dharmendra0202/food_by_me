const express = require('express');
const router = express.Router();
const restaurants = require('../data/restaurants.json');

router.get('/', (req, res) => {
  res.json(restaurants);
});

router.get('/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === req.params.id);
  restaurant ? res.json(restaurant) : res.status(404).json({ error: "Restaurant not found" });
});

module.exports = router;
