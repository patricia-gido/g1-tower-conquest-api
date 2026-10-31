const express = require('express');
const router = express.Router();
const handler = (req,res)=>res.status(200).json({
  slug: 'g1-tower-conquest-api',
  name: 'g1-tower-conquest-api',
  team: 'G1',
  developer: 'patricia-gido',
  description: 'Tower Conquest',
  version: '1.0.0',
  min_players: 2,
  max_players: 4
});
router.get('/', handler);
router.get('/game-info', handler);
module.exports = router;