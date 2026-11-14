const { Session } = require('../models');

async function create(data) {
  return Session.create(data);
}

async function findById(id) {
  return Session.findByPk(id);
}

async function findByPin(joinPin) {
  return Session.findOne({ where: { join_pin: joinPin } });
}

async function update(id, changes) {
  const row = await Session.findByPk(id);
  if (!row) return null;
  return row.update(changes);
}

module.exports = { create, findById, findByPin, update };