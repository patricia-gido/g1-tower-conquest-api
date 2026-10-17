const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

async function findFinishedGamePlayers(since) {
  const sql = `
    SELECT
      s.join_pin AS session_code,
      s.created_at AS started_at,
      s.updated_at AS ended_at,
      1 AS school_id,
      u.username AS nickname,
      p.score,
      p.completed AS completed
    FROM game_sessions s
    JOIN leaderboard p ON p.game_session_id = s.id
    JOIN users u ON u.id = p.user_id
    WHERE 1=1
    ORDER BY s.updated_at ASC, p.score DESC
  `;
  return sequelize.query(sql, { type: QueryTypes.SELECT });
}

module.exports = { findFinishedGamePlayers };