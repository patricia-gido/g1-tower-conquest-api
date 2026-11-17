const sessionService = require('../services/session.service');

async function create(req, res, next) {
  try {
    const session = await sessionService.create(req.body.set_id, req.user);
    return res.status(201).json({ data: session });
  } catch (err) { next(err); }
}

async function get(req, res, next) {
  try {
    const session = await sessionService.findOrFail(req.params.code);
    return res.json({ data: session });
  } catch (err) { next(err); }
}

async function changeStatus(req, res, next) {
  try {
    const session = await sessionService.changeStatus(req.params.code, req.body.status, req.user);
    return res.json({ data: session });
  } catch (err) { next(err); }
}

module.exports = { create, get, changeStatus };