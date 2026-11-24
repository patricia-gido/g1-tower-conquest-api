const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.json({
    slug: 'g1-tower-conquest',
    name: 'Tower Conquest',
    team: 'G1',
    developer: 'patricia-gido',
    description: 'A multiplayer tower conquest quiz game where players join a session, answer questions, and climb the leaderboard.',
    version: '1.0.0',
    min_players: 2,
    max_players: 4,
  });
});

module.exports = router;