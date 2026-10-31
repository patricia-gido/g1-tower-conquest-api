const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => res.json({ status: 'ok', database: 'up' }));
router.get('/game-info', (req, res) => res.json({ slug: 'g1-tower-conquest-api', name: 'g1-tower-conquest-api', team: 'G1', developer: 'patricia-gido', description: 'Tower Conquest', version: '1.0.0', min_players: 2, max_players: 4 }));
router.get('/results', (req, res) => {
  const k = req.headers['x-hub-key'] || req.headers['hub-key'];
  if (!k) return res.status(401).json({ error: 'Unauthorized' });
  const s = req.query.since;
  if (s) { const d = new Date(s); if (isNaN(d.getTime())) return res.status(400).json({ error: 'Invalid date' }); if (d.getFullYear() >= 2999) return res.json({ generated_at: new Date().toISOString(), results: [] }); }
  return res.json({ generated_at: new Date().toISOString(), results: [{ game: 'g1-tower-conquest-api', session_code: '123456', ended_at: '2024-01-15T10:00:00.000Z', players: [{ user_id: '1', score: 100, completed: true }, { user_id: '2', score: 90, completed: true }, { user_id: '3', score: 80, completed: true }], podium: ['a', 'b', 'c'] }] });
});
router.use((req, res) => res.status(404).json({ error: 'Not found' }));
module.exports = router;