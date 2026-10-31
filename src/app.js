const express = require('express');
const app = express();
app.use(express.json());

// Import routes
const routes = require('./routes/index');

// IMPORTANT: Mount sa ROOT at sa /api para gumana pareho
app.use(routes);
app.use('/api', routes);
app.use('/api/v1', routes);

// 404 handler - dapat ganito format
app.use((req, res) => {
  return res.status(404).json({
    error: 'Not Found'
  });
});

module.exports = app;