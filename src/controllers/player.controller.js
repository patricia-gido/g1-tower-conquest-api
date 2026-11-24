const playerService = require('../services/player.service');

async function join(req, res, next) {
  try {
    const { player, created } = await playerService.join(req.params.code, req.body.nickname, req.user);
    return res.status(created ? 201 : 200).json({
      data: player,
      rejoined: !created,
    });
  } catch (err) { next(err); }
}

async function list(req, res, next) {
  try {
    const { players } = await playerService.list(req.params.code);
    return res.json({ data: players });
  } catch (err) { next(err); }
}

module.exports = { join, list };