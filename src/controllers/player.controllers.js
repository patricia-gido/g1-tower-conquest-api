const service = require('../services/player.service');
const { CONSTRAINT_MAP } = require('../errors/constraint-map');
const { constraintOf } = require('../errors/db-errors');

function handleError(err, res) {
  console.error('JOIN ERROR:', err);
  if (err.status) return res.status(err.status).json({ code: err.code || 'ERROR', message: err.message });
  const mapped = CONSTRAINT_MAP[constraintOf(err)];
  if (mapped) return res.status(mapped.status).json({ code: mapped.code, message: mapped.message });
  return res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal server error' });
}

async function join(req, res) {
  try {
    const nickname = req.validated?.nickname || req.body?.nickname;
    const { session, player, created } = await service.join(req.params.code, nickname, req.user);
    return res.status(created ? 201 : 200).json({
      player_id: player.player_id,
      nickname: player.nickname,
      score: player.score,
      rejoined: !created,
      session: {
        code: session.join_pin,
        status: session.status,
        current_position: session.current_position,
      },
    });
  } catch (err) {
    return handleError(err, res);
  }
}

async function list(req, res) {
  try {
    const rows = await service.list(req.params.code);
    return res.json(rows.map(p => ({ nickname: p.nickname, score: p.score })));
  } catch (err) {
    return handleError(err, res);
  }
}

module.exports = { join, list };