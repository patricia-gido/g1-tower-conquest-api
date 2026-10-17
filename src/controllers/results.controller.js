'use strict';
const resultsService = require('../services/results.service');
const gameInfo = require('../config/game-info');

async function list(req, res) {
  try {
    const since = req.query.since;

    // VALIDATION: any ?since= present must be valid date, empty is invalid
    if (since !== undefined) {
      if (typeof since !== 'string' || since.trim() === '') {
        return res.status(400).json({ error: 'Invalid since' });
      }
      const d = new Date(since);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ error: 'Invalid since' });
      }
    }

    const resultsArray = await resultsService.listFinishedGames(since);
    return res.status(200).json({
      game: gameInfo.slug || gameInfo.game || 'tower-conquest',
      generated_at: new Date().toISOString(),
      results: resultsArray
    });
  } catch (err) {
    if (err.status === 400) {
      return res.status(400).json({ error: 'Invalid since' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = list;
module.exports.list = list;
module.exports.getResults = list;