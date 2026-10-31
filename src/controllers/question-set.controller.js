'use strict';
const questionSetService = require('../services/question-set.service');

async function list(req, res, next) {
  try {
    const user = { user_id: parseInt(req.get('X-User-Id') || 4), role: 'host' };
    const sets = await questionSetService.list(user);
    res.status(200).json(sets);
  } catch(e){ next(e); }
}
async function create(req, res, next) {
  try {
    const user = { user_id: parseInt(req.get('X-User-Id') || 4), role: 'host' };
    const set = await questionSetService.create(req.body, user);
    res.status(201).json(set);
  } catch(e){ next(e); }
}
async function get(req, res, next) {
  try {
    const user = { user_id: parseInt(req.get('X-User-Id') || 4), role: 'host' };
    const set = await questionSetService.get(parseInt(req.params.id), user);
    res.status(200).json(set);
  } catch(e){ next(e); }
}
async function update(req, res, next) {
  try {
    const user = { user_id: parseInt(req.get('X-User-Id') || 4), role: 'host' };
    const set = await questionSetService.update(parseInt(req.params.id), req.body, user);
    res.status(200).json(set);
  } catch(e){ next(e); }
}
async function remove(req, res, next) {
  try {
    const user = { user_id: parseInt(req.get('X-User-Id') || 4), role: 'host' };
    await questionSetService.remove(parseInt(req.params.id), user);
    res.status(204).end();
  } catch(e){ next(e); }
}
module.exports = { list, get, create, update, remove };