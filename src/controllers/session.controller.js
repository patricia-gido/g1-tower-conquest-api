const service = require('../services/session.service');

function handleError(err, res) {
  console.error(err);
  if (err.status) return res.status(err.status).json({ code: err.code || 'ERROR', message: err.message });
  return res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
}

async function create(req, res) {
  try {
    const created = await service.create(req.validated.set_id, req.user);
    return res.status(201).json(created);
  } catch (err) {
    return handleError(err, res);
  }
}

async function get(req, res) {
  try {
    const row = await service.get(req.params.code);
    return res.json(row);
  } catch (err) {
    return handleError(err, res);
  }
}

async function changeStatus(req, res) {
  try {
    const row = await service.changeStatus(req.params.code, req.validated.status, req.user);
    return res.json(row);
  } catch (err) {
    return handleError(err, res);
  }
}

module.exports = { create, get, changeStatus };