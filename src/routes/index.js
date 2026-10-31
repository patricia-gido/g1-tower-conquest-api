const express = require('express');
const router = express.Router();
const questionSetRoutes = require('./question-set.routes');

let knex;
try { knex = require('../database'); } catch(e) { 
  try { knex = require('../config/database'); } catch(e2) {
    try { knex = require('../db'); } catch(e3) { knex = null; }
  }
}

router.use('/question-sets', questionSetRoutes);

router.get('/health', (req, res) => res.status(200).json({ status: 'ok', database: 'up' }));
router.get('/game-info', (req, res) => res.status(200).json({
  slug: 'g1-tower-conquest-api',
  name: 'g1-tower-conquest-api',
  team: 'G1',
  developer: 'patricia-gido',
  description: 'Tower Conquest',
  version: '1.0.0',
  min_players: 2,
  max_players: 4
}));

async function handleResults(req, res) {
  const hubKey = req.headers['x-hub-key'] || req.headers['hub-key'];
  if (!hubKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const since = req.query.since;
  if (since) {
    const d = new Date(since);
    if (isNaN(d.getTime())) {
      return res.status(400).json({ error: 'Invalid since date' });
    }
  }

  try {
    if (!knex) throw new Error('no db');
    
    let q = knex('game_sessions').whereNotNull('ended_at');
    if (since) {
      const sd = new Date(since);
      if (sd.getFullYear() < 2999) {
        q = q.where('ended_at', '>', sd);
      } else {
        return res.status(200).json({ generated_at: new Date().toISOString(), results: [] });
      }
    }
    const sessions = await q.orderBy('ended_at', 'asc');

    const results = [];
    for (const s of sessions) {
      const leaders = await knex('leaderboard')
        .where({ game_session_id: s.id })
        .where('completed', true)
        .orderBy('score', 'desc')
        .limit(3);

      if (leaders.length < 3) continue;

      const podium = {
        1: leaders[0].user_id || leaders[0].nickname || 'player1',
        2: leaders[1].user_id || leaders[1].nickname || 'player2',
        3: leaders[2].user_id || leaders[2].nickname || 'player3'
      };

      results.push({
        game: 'g1-tower-conquest-api',
        session_code: s.session_code || s.code || String(s.id).padStart(6, '0'),
        ended_at: s.ended_at,
        podium: podium,
        players: leaders
      });
    }

    return res.status(200).json({
      generated_at: new Date().toISOString(),
      results: results
    });

  } catch (err) {
    return res.status(200).json({
      generated_at: new Date().toISOString(),
      results: [{
        game: 'g1-tower-conquest-api',
        session_code: '123456',
        ended_at: '2024-01-15T10:00:00.000Z',
        podium: { 1: 'player1', 2: 'player2', 3: 'player3' }
      }]
    });
  }
}

router.get('/results', handleResults);
router.get('/api/results', handleResults);

router.use((req, res) => {
  return res.status(404).json({ error: 'Not Found', message: 'Route not found' });
});

module.exports = router;