const service = require('../services/question-set.service');

function handleError(err, res) {
  if (err.status === 404) {
    return res.status(404).json({ code: err.code || 'NOT_FOUND', message: err.message });
  }
  if (err.status === 403) {
    return res.status(403).json({ code: err.code || 'FORBIDDEN', message: err.message });
  }
  return res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
}

async function create(req, res) {
  try {
    const created = await service.create(req.validated, req.user);
    return res.status(201).json(created);
  } catch (err) {
    return handleError(err, res);
  }
}

async function list(req, res) {
  try {
    const rows = await service.list();
    return res.json(rows);
  } catch (err) {
    return handleError(err, res);
  }
}

async function get(req, res) {
  try {
    const row = await service.get(req.params.id);
    return res.json(row);
  } catch (err) {
    return handleError(err, res);
  }
}

async function update(req, res) {
  try {
    const row = await service.update(req.params.id, req.validated, req.user);
    return res.json(row);
  } catch (err) {
    return handleError(err, res);
  }
}

async function remove(req, res) {
  try {
    await service.remove(req.params.id, req.user);
    return res.status(204).send();
  } catch (err) {
    return handleError(err, res);
  }
}

module.exports = { create, list, get, update, remove };