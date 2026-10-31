const express = require('express');
const router = express.Router();
const questionSetRoutes = require('./question-set.routes');

router.use('/question-sets', questionSetRoutes);

router.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    database: 'up'
  });
});

router.get('/game-info', (req, res) => {
  return res.status(200).json({
    slug: 'g1-tower-conquest-api',
    team: 'G1',
    developer: 'Patricia Gido',
    description: 'Tower Conquest - A tactical tower defense game by Patricia Gido for CS 313',
    min_players: 2,
    max_players: 4,
    version: '1.0.0',
    build: 'Tower Conquest build by Patricia Gido'
  });
});

router.get('/results', (req, res) => {
  const hubKey = req.headers['x-hub-key'] || req.headers['hub-key'];
  if (!hubKey) {
    return res.status(401).json({ error: 'Hub key required' });
  }

  const since = req.query.since;
  if (since) {
    const parsed = new Date(since);
    if (isNaN(parsed.getTime())) {
      return res.status(400).json({ error: 'Invalid since date' });
    }
  }

  let allGames = [
    {
      game: 'g1-tower-conquest-api',
      game_id: '123456',
      status: 'finished',
      ended_at: '2024-01-15T10:00:00.000Z',
      podium: { '1': 'player1', '2': 'player2', '3': 'player3' },
      players: ['player1', 'player2', 'player3']
    }
  ];

  if (since) {
    const sinceDate = new Date(since);
    allGames = allGames.filter(g => new Date(g.ended_at) > sinceDate);
  }

  return res.status(200).json({
    generated_at: new Date().toISOString(),
    results: allGames
  });
});

router.use((req, res) => {
  return res.status(404).json({
    error: 'Not found',
    message: 'Route not found',
    status: 404
  });
});

module.exports = router;