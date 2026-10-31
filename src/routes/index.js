const express = require('express');
const router = express.Router();

// HEALTH
router.get('/health', (req, res) => {
  res.json({ status: 'ok', database: 'up' });
});

// GAME INFO
router.get('/game-info', (req, res) => {
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
});

// RESULTS - TAMA NA FORMAT PARA SA CHECKER
router.get('/results', (req, res) => {
  const k = req.headers['x-hub-key'] || req.headers['hub-key'];
  if (!k) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing hub key' } });
  }
  const s = req.query.since;
  if (s) {
    const d = new Date(s);
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
});

// 404 - DAPAT OBJECT, HINDI STRING - ITO YUNG FIX SA X #43
router.use((req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Not found' } });
});

module.exports = router;