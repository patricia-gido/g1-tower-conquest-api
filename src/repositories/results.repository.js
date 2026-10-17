const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

async function findFinishedGamePlayers(since) {
  let where = `WHERE p.completed = true AND s.ended_at IS NOT NULL`;
  const replacements = {};
  if (since) {
    const d = new Date(since);
    if (isNaN(d.getTime())) return [];
    where += ` AND s.ended_at > :since`;
    replacements.since = d;
  }
  const sql = `
    SELECT 
      s.join_pin AS session_code,
      s.started_at,
      s.ended_at,
      u.id AS school_id,
      u.username AS nickname,
      p.score,
      p.completed
    FROM game_sessions s
    JOIN leaderboard p ON p.game_session_id = s.id
    JOIN users u ON u.id = p.user_id
    ${where}
    ORDER BY s.ended_at ASC, p.score DESC
  `;
  return sequelize.query(sql, { type: QueryTypes.SELECT, replacements });
}

module.exports = { findFinishedGamePlayers };