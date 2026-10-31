const express = require('express');
const app = express();
app.use(express.json());

const routes = require('./routes/index');

// DAPAT DALAWA - para gumana /health at /api/health
app.use('/', routes);
app.use('/api', routes);

// DAPAT JSON, HINDI HTML - ito yung hinahanap sa error format
app.use((req, res) => {
  return res.status(404).json({ error: 'Not found' });
});

module.exports = app;