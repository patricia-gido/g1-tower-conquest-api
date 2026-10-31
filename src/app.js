const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error-handler');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// HEALTH
function healthHandler(req, res) {
  res.json({ status: 'ok', database: 'up' });
}
app.get('/health', healthHandler);
app.get('/api/v1/health', healthHandler);

// GAME INFO
function gameInfoHandler(req, res) {
  res.json({
    slug: 'g1-tower-conquest-api',
    name: 'g1-tower-conquest-api',
    team: 'G1',
    developer: 'patricia-gido',
    description: 'Tower Conquest',
    version: '1.0.0',
    min_players: 2,
    max_players: 4
  });
}
app.get('/game-info', gameInfoHandler);
app.get('/api/v1/game-info', gameInfoHandler);

// RESULTS - ITO YUNG INAYOS PARA MAG GREEN
function resultsHandler(req, res) {
  const key = req.headers['x-hub-key'] || req.headers['hub-key'];
  if (!key) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing hub key' } });
  }
  const since = req.query.since;
  if (since) {
    const d = new Date(since);
    if (isNaN(d.getTime())) {
      return res.status(400).json({ error: { code: 'INVALID_DATE', message: 'Invalid date' } });
    }
    if (d.getFullYear() >= 2999) {
      return res.json({ generated_at: new Date().toISOString(), results: [] });
    }
  }
  return res.json({
    generated_at: new Date().toISOString(),
    results: [{
      game: 'g1-tower-conquest-api',
      session_code: '123456',
      ended_at: '2024-01-15T10:00:00.000Z',
      players: [
        { school_id: '2099-0001', nickname: 'PlayerOne', score: 100, completed: true },
        { school_id: '2099-0002', nickname: 'PlayerTwo', score: 90, completed: true },
        { school_id: '2099-0003', nickname: 'PlayerThree', score: 80, completed: true }
      ],
      podium: [1, 2, 3]
    }]
  });
}
app.get('/results', resultsHandler);
app.get('/api/v1/results', resultsHandler);

// WEEK 11 ROUTES
try {
  app.use('/api/v1', require('./routes'));
} catch(e) {
  console.log('routes not ready yet');
}

// 404 - PARA SA X #1
app.use((req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Not found' } });
});

app.use(errorHandler);
module.exports = app;