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
    name: 'g1-tower-conquest-api',
    description: 'Tower Conquest by Patricia Gido',
    build: 'Tower Conquest build',
    version: '1.0.0'
  });
});

router.get('/results', (req, res) => {
  const hubKey = req.headers['x-hub-key'] || req.headers['hub-key'];
  if (!hubKey) {
    return res.status(401).json({ error: 'Hub key required' });
  }
  return res.status(200).json([
    {
      game: 'g1-tower-conquest-api',
      game_id: '123456',
      status: 'finished',
      podium: { '1': 'player1', '2': 'player2', '3': 'player3' },
      players: ['player1', 'player2', 'player3'],
      ended_at: new Date().toISOString()
    }
  ]);
});

router.use((req, res) => {
  return res.status(404).json({
    error: 'Not found'
  });
});

module.exports = router;