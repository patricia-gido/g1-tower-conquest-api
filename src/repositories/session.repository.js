const { Session } = require('../models');

function create(data) {
  return Session.create(data);
}

function findByCode(joinPin) {
  return Session.findOne({ where: { join_pin: joinPin } });
}

function update(session, changes) {
  return session.update(changes);
}

module.exports = { create, findByCode, update };