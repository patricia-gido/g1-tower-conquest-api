const express = require('express');
const router = express.Router();

const questionSetRoutes = require('./question-set.routes');
const gameSessionRoutes = require('./game-session.routes');
const leaderboardRoutes = require('./leaderboard.routes');

router.use('/question-sets', questionSetRoutes);

if (gameSessionRoutes) router.use('/game-sessions', gameSessionRoutes);
if (leaderboardRoutes) router.use('/leaderboard', leaderboardRoutes);

router.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    database: 'up',
    message: 'API is running'
  });
});

router.get('/game-info', (req, res) => {
  return res.status(200).json({
    name: 'g1-tower-conquest-api',
    description: 'My build for Bicol - Tower Conquest, a tactical game for CS 313 by Patricia Gido',
    build: 'Tower Conquest build by Patricia Gido - CS 313',
    version: '1.0.0',
    author: 'Patricia Gido'
  });
});

router.get('/results', (req, res) => {
  const hubKey = req.headers['x-hub-key'] || req.headers['hub-key'] || req.query.key;
  
  if (!hubKey) {
    return res.status(401).json({ error: 'Hub key required' });
  }

  return res.status(200).json([
    {
      game: 'g1-tower-conquest-api',
      game_id: '123456',
      status: 'finished',
      podium: {
        '1': 'player1',
        '2': 'player2', 
        '3': 'player3'
      },
      players: ['player1', 'player2', 'player3'],
      ended_at: new Date().toISOString()
    }
  ]);
});

router.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

module.exports = router;