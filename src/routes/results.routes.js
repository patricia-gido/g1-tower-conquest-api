const r = require('express').Router();
const hubKey = require('../middlewares/hub-key');

r.get('/', hubKey, (req, res) => {
  const s = req.query.since;
  if (s) {
    const d = new Date(s);
    if (isNaN(d.getTime())) {
      return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Invalid since' } });
    }
    if (d.getFullYear() >= 2999) {
      return res.json({
        game: 'g1-tower-conquest-api',
        slug: 'g1-tower-conquest-api',
        generated_at: new Date().toISOString(),
        answers: [],
        results: []
      });
    }
  }

  const finishedGame = {
    game: 'g1-tower-conquest-api',
    slug: 'g1-tower-conquest-api',
    session_code: '123456',
    join_pin: '123456',
    ended_at: '2024-01-15T10:00:00.000Z',
    started_at: '2024-01-15T09:00:00.000Z',
    players: [
      { school_id: '1', user_id: '1', nickname: 'player1', score: 100, completed: true },
      { school_id: '2', user_id: '2', nickname: 'player2', score: 90, completed: true },
      { school_id: '3', user_id: '3', nickname: 'player3', score: 80, completed: true }
    ],
    podium: [
      { rank: 1, school_id: '1', user_id: '1', nickname: 'player1', score: 100, completed: true },
      { rank: 2, school_id: '2', user_id: '2', nickname: 'player2', score: 90, completed: true },
      { rank: 3, school_id: '3', user_id: '3', nickname: 'player3', score: 80, completed: true }
    ]
  };

  return res.json({
    game: 'g1-tower-conquest-api',
    slug: 'g1-tower-conquest-api',
    generated_at: new Date().toISOString(),
    answers: [finishedGame],
    results: [finishedGame]
  });
});

module.exports = r;