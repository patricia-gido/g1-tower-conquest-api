'use strict';
const resultsService = require('../services/results.service');
const gameInfo = require('../config/game-info');

async function list(req, res, next) {
  try {
    const since = req.query.since;
    if (since !== undefined) {
      if (String(since).trim() === '') {
        return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Invalid since' } });
      }
      const d = new Date(since);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Invalid since' } });
      }
    }
    const resultsArray = await resultsService.listFinishedGames(since);
    return res.status(200).json({
      game: gameInfo.slug || 'tower-conquest',
      generated_at: new Date().toISOString(),
      results: resultsArray
    });
  } catch (err) { next(err); }
}

module.exports = list;
module.exports.list = list;
module.exports.getResults = list;