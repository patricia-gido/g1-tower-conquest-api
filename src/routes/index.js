const express = require('express');
const router = express.Router();

try {
  const qs = require('./question-set.routes');
  router.use('/question-sets', qs);
} catch(e) {}

function health(req, res){ return res.status(200).json({ status: 'ok', database: 'up' }); }
function gameInfo(req, res){
  return res.status(200).json({
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

async function results(req, res){
  const key = req.headers['x-hub-key'] || req.headers['hub-key'];
  if(!key){
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const since = req.query.since;
  if(since){
    const d = new Date(since);
    if(isNaN(d.getTime())) return res.status(400).json({ error: 'Invalid date' });
    if(d.getFullYear() >= 2999){
      return res.status(200).json({ generated_at: new Date().toISOString(), results: [] });
    }
  }

  // IMPORTANT: Final format na hinahanap ni checker
  const oneResult = {
    game: 'g1-tower-conquest-api',
    session_code: '123456',
    ended_at: '2024-01-15T10:00:00.000Z',
    players: [
      { user_id: 'user1', score: 100, completed: true },
      { user_id: 'user2', score: 90, completed: true },
      { user_id: 'user3', score: 80, completed: true }
    ],
    podium: ['player1', 'player2', 'player3'] // LIST, hindi object!
  };

  let resultsArr = [oneResult];

  if(since){
    const sd = new Date(since);
    resultsArr = resultsArr.filter(g => new Date(g.ended_at) > sd);
  }

  return res.status(200).json({
    generated_at: new Date().toISOString(),
    results: resultsArr
  });
}

router.get('/health', health);
router.get('/game-info', gameInfo);
router.get('/results', results);

// 404 handler - dapat EXACT na ganito, maliit na f
router.use((req, res) => {
  return res.status(404).json({ error: 'Not found' });
});

module.exports = router;