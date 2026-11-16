const service = require("../services/session.service");

function getCode(req) {
  return req.params.code || req.body?.code;
}

function create(req, res, next) {
  try { return res.status(201).json(service.create(req.body)); } catch(e){ next(e); }
}

function get(req, res, next) {
  try { return res.status(200).json(service.get(getCode(req))); } catch(e){ next(e); }
}

function join(req, res, next) {
  try {
    // DITO YUNG FIX: Body lang yung gamitin, wag Header
    const nickname = req.body?.nickname;
    const player_id = req.body?.player_id || req.body?.playerId;
    const r = service.join(getCode(req), nickname, player_id);
    return res.status(r.alreadyJoined ? 200 : 201).json(r);
  } catch(e){ next(e); }
}

function start(req, res, next) {
  try {
    // DITO LANG GAGAMITIN YUNG HEADER
    const demoUser = req.headers["x-demo-user"];
    return res.status(200).json(service.start(getCode(req), demoUser));
  } catch(e){ next(e); }
}

module.exports = { create, get, join, start };