const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

async function findFinishedGamePlayers(since) {
  let where = `WHERE p.completed = true`;
  const replacements = {};

  if (since) {
    const d = new Date(since);
    if (isNaN(d.getTime())) {
      const err = new Error('Invalid since');
      err.status = 400;
      throw err;
    }
    where += ` AND s.updated_at > :since`;
    replacements.since = d;
  }

  const sql = `
    SELECT
      s.join_pin AS session_code,
      s.created_at AS started_at,
      s.updated_at AS ended_at,
      1 AS school_id,
      u.username AS nickname,
      p.score
    FROM game_sessions s
    JOIN leaderboard p ON p.game_session_id = s.id
    JOIN users u ON u.id = p.user_id
    ${where}
    ORDER BY s.updated_at ASC, p.score DESC
  `;

  return sequelize.query(sql, { type: QueryTypes.SELECT, replacements });
}

module.exports = { findFinishedGamePlayers };