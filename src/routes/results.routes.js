const express = require('express');
const router = express.Router();

// Para ma-load yung HUB_API_KEY galing sa .env
require('../config/env');
const { sequelize } = require('../models');

const SLUG = 'g1-tower-conquest';

// GET /api/v1/results
router.get('/', async (req, res) => {
  try {
    // 1. Hub key check
    const hubKey = req.headers['x-hub-key'];
    if (!hubKey || hubKey !== process.env.HUB_API_KEY) {
      return res.status(401).json({
        error: { code: 'UNAUTHORIZED', message: 'Missing or invalid Hub key' },
      });
    }

    // 2. ?since= validation
    const { since } = req.query;
    let sinceDate = null;
    if (since) {
      sinceDate = new Date(since);
      if (Number.isNaN(sinceDate.getTime())) {
        return res.status(400).json({
          error: { code: 'INVALID_SINCE', message: 'since must be a valid date and time' },
        });
      }
    }

    // 3. Kunin lahat ng finished games - kasama na yung id nya
    let sessionsQuery = `SELECT id, join_pin, ended_at FROM game_sessions WHERE ended_at IS NOT NULL`;
    const replacements = {};
    if (sinceDate) {
      sessionsQuery += ` AND ended_at > :since`;
      replacements.since = sinceDate;
    }
    sessionsQuery += ` ORDER BY ended_at ASC`;

    const [sessions] = await sequelize.query(sessionsQuery, { replacements });

    const results = [];

    for (const s of sessions) {
      // 4. Kunin yung players - WALANG JOIN, leaderboard lang muna
      const [playersRows] = await sequelize.query(
        `SELECT user_id, nickname, score FROM leaderboard WHERE session_id = :sid ORDER BY score DESC`,
        { replacements: { sid: s.id } }
      );

      if (!playersRows.length) continue;

      const players = [];
      for (const row of playersRows) {
        // 5. Kunin yung school_id ng player na to - try id, pag fail try user_id
        let school_id = String(row.user_id);
        try {
          const [u1] = await sequelize.query(
            `SELECT school_id FROM users WHERE id = :uid LIMIT 1`,
            { replacements: { uid: row.user_id } }
          );
          if (u1.length && u1[0].school_id) {
            school_id = String(u1[0].school_id);
          } else {
            const [u2] = await sequelize.query(
              `SELECT school_id FROM users WHERE user_id = :uid LIMIT 1`,
              { replacements: { uid: row.user_id } }
            );
            if (u2.length && u2[0].school_id) school_id = String(u2[0].school_id);
          }
        } catch (e) {
          // kung mag-fail, gamitin na lang yung user_id as school_id para hindi mag-500
        }

        players.push({
          school_id,
          nickname: row.nickname,
          score: Number(row.score),
          completed: true,
        });
      }

      // 6. Podium - top 3
      const podium = players.slice(0, 3).map((p, i) => ({
        rank: i + 1,
        nickname: p.nickname,
        score: p.score,
      }));

      results.push({
        session_code: String(s.join_pin),
        ended_at: new Date(s.ended_at).toISOString(),
        players,
        podium,
      });
    }

    return res.json({
      game: SLUG,
      generated_at: new Date().toISOString(),
      results,
    });
  } catch (err) {
    console.error('RESULTS ERROR:', err);
    return res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: err.message },
    });
  }
});

module.exports = router;