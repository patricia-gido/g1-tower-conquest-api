const { Player } = require('../models');

async function findBySessionAndUser(session_id, user_id) {
  return Player.findOne({ where: { session_id, user_id } });
}

async function countBySession(session_id) {
  return Player.count({ where: { session_id } });
}

async function create(data) {
  return Player.create(data);
}

async function update(player_id, data) {
  return Player.update(data, { where: { player_id } });
}

async function listBySession(session_id) {
  return Player.findAll({ where: { session_id }, order: [['score', 'DESC']] });
}

module.exports = { findBySessionAndUser, countBySession, create, update, listBySession };