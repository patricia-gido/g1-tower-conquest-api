'use strict';
const resultsService = require('../services/results.service');

async function list(req, res) {
  try {
    const since = req.query.since;
    if (since) {
      const d = new Date(since);
      if (isNaN(d.getTime())) {
        return res.status(400).json({ error: 'Invalid since' });
      }
    }
    const results = await resultsService.listFinishedGames(since);
    return res.status(200).json(results);
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