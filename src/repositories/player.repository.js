const { Player } = require('../models');

function findSeat(sessionId, userId) {
  return Player.findOne({ where: { session_id: sessionId, user_id: userId } });
}

function countBySession(sessionId) {
  return Player.count({ where: { session_id: sessionId } });
}

function create(data) {
  return Player.create(data);
}

function listBySession(sessionId) {
  return Player.findAll({ where: { session_id: sessionId }, order: [['score', 'DESC']] });
}

function markSeen(player) {
  return player.update({ last_seen_at: new Date() });
}

module.exports = { findSeat, countBySession, create, listBySession, markSeen };