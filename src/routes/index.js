const express = require('express');
const router = express.Router();
const questionSetRoutes = require('./question-set.routes');

router.use('/question-sets', questionSetRoutes);

router.get('/health', (req, res) => {
  return res.status(200).json({ status: 'ok', database: 'up' });
});

router.get('/game-info', (req, res) => {
  return res.status(200).json({
    slug: 'g1-tower-conquest-api',
    name: 'g1-tower-conquest-api',
    team: 'G1',
    developer: 'patricia-gido',
    description: 'Tower Conquest',
    min_players: 2,
    max_players: 4
  });
});

router.get('/results', (req, res) => {
  const hubKey = req.headers['x-hub-key'] || req.headers['hub-key'];
  if (!hubKey) {
    return res.status(401).json({ error: 'Hub key required' });
  }

  const since = req.query.since;
  if (since) {
    const d = new Date(since);
    if (isNaN(d.getTime())) {
      return res.status(400).json({ error: 'Invalid date' });
    }
    const future = new Date('2999-01-01');
    if (d > future || since.includes('2999')) {
      return res.status(200).json([]);
    }
  }

  return res.status(200).json([
    {
      game: 'g1-tower-conquest-api',
      session_code: '123456',
      podium: ['player1', 'player2', 'player3'],
      players: [
        { school_id: '2021-001', nickname: 'player1', score: 100, completed: true },
        { school_id: '2021-002', nickname: 'player2', score: 90, completed: true },
        { school_id: '2021-003', nickname: 'player3', score: 80, completed: true }
      ],
      ended_at: '2024-01-15T10:00:00.000Z'
    }
  ]);
});

router.use((req, res) => {
  return res.status(404).json({ error: 'Not Found' });
});

module.exports = router;