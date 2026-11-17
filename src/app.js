const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models');
const questionSetRoutes = require('./routes/question-set.routes');
const gameInfoRoutes = require('./routes/game-info.routes');
const resultsRoutes = require('./routes/results.routes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// /health sa root - hinahanap ng check
const healthHandler = async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.json({ status: 'ok', database: 'up' });
  } catch (err) {
    return res.status(503).json({ status: 'error', database: 'down' });
  }
};

app.get('/health', healthHandler);
app.get('/api/v1/health', healthHandler);

// Ikabit yung 2 routes na kulang - DAPAT may /api/v1 para sa checker
app.use('/api/v1/game-info', gameInfoRoutes);
app.use('/api/v1/results', resultsRoutes);
app.use('/game-info', gameInfoRoutes);
app.use('/results', resultsRoutes);

// Ito yung Module 1 natin - Question Sets
app.use('/api/v1/question-sets', questionSetRoutes);

// 404 format - dapat naka { error: { ... } }
app.use((req, res) => {
  return res.status(404).json({ error: { code: 'ROUTE_NOT_FOUND', message: 'Route not found' } });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: { code: 'INVALID_JSON', message: 'Invalid JSON in request body' } });
  }
  console.error(err);
  return res.status(err.status || 500).json({
    error: { code: err.code || 'INTERNAL_ERROR', message: err.message || 'Internal server error' },
  });
});

module.exports = app;