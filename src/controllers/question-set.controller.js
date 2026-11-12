const { validationResult } = require('express-validator');
const service = require('../services/question-set.service');

function check(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return null;
}

function handleError(err, res) {
  if (err.status === 404) {
    return res.status(404).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal server error' });
}

async function create(req, res) {
  if (check(req, res)) return;
  try {
    const created = await service.create(req.body, req.user);
    return res.status(201).json(created);
  } catch (err) { return handleError(err, res); }
}

async function list(req, res) {
  try {
    const rows = await service.list();
    return res.json(rows);
  } catch (err) { return handleError(err, res); }
}

async function get(req, res) {
  if (check(req, res)) return;
  try {
    const row = await service.get(req.params.id);
    return res.json(row);
  } catch (err) { return handleError(err, res); }
}

async function update(req, res) {
  if (check(req, res)) return;
  try {
    const row = await service.update(req.params.id, req.body);
    return res.json(row);
  } catch (err) { return handleError(err, res); }
}

async function remove(req, res) {
  if (check(req, res)) return;
  try {
    await service.remove(req.params.id);
    return res.status(204).send();
  } catch (err) { return handleError(err, res); }
}

module.exports = { create, list, get, update, remove };