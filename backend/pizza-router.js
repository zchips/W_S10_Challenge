const express = require('express');
const Pizza = require('./helpers'); // Assuming this is where the pizza handling logic is

const router = express.Router();

// POST endpoint to create a new pizza order
router.post('/order', async (req, res) => {
  try {
    const { status, data } = await Pizza.postPizza(req.body); // Call postPizza from helpers.js
    res.status(status).json(data);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
});

// GET endpoint to fetch the order history
router.get('/history', (req, res) => {
  try {
    const { status, data } = Pizza.getHistory(); // Call getHistory from helpers.js
    res.status(status).json(data);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ message: 'An error occurred while retrieving the order history.' });
  }
});

module.exports = router; // Export the router
