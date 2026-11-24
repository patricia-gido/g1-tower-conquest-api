const { QuestionSet } = require('../models');

async function create(data) {
  return QuestionSet.create(data);
}

async function findAll() {
  return QuestionSet.findAll({ order: [['set_id', 'DESC']] });
}

async function findById(id) {
  return QuestionSet.findByPk(id);
}

async function update(id, data) {
  const row = await QuestionSet.findByPk(id);
  if (!row) return null;
  await row.update(data);
  return row;
}

async function remove(id) {
  const row = await QuestionSet.findByPk(id);
  if (!row) return false;
  await row.destroy();
  return true;
}

module.exports = { create, findAll, findById, update, remove };