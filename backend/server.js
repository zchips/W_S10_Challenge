const express = require('express');
const cors = require('cors');
const path = require('path');
const pizzaRouter = require('./pizza-router'); // Import your pizza-router file

const PORT = process.env.PORT || 9009; // Set the port number, default to 9009 if not set in environment

const server = express(); // Initialize the Express server

// Middleware to parse JSON bodies in requests
server.use(express.json());

// Serve static files from the `dist` folder (assuming frontend is built here)
server.use(express.static(path.join(__dirname, '../dist')));

// Enable CORS for cross-origin requests
server.use(cors());

// Mount the pizza API router at `/api/pizza`
server.use('/api/pizza', pizzaRouter);

// Serve the frontend's `index.html` for any unmatched routes (SPA support)
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Handle 404 errors for API routes
server.use((req, res) => {
  res.status(404).json({
    message: `Endpoint [${req.method}] ${req.path} does not exist`,
  });
});

// Error-handling middleware for server-side errors
server.use((err, req, res, next) => {
  const message = err.message || 'Unknown error happened';
  const status = err.status || 500;
  const reason = err.reason;
  const payload = { message };
  if (reason) payload.reason = reason;
  res.status(status).json(payload);
});

// Start the server on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
