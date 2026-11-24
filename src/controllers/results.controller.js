'use strict';
const resultsService = require('../services/results.service');
const gameInfo = require('../config/game-info');

async function list(req,res,next){
  try{
    const since = req.query.since;
    if(since !== undefined){
      const d = new Date(since);
      if(isNaN(d.getTime())){
        return res.status(400).json({error:{code:'BAD_REQUEST',message:'Invalid since'}});
      }
    }
    const rows = await resultsService.listFinishedGames(since);
    return res.status(200).json({
      game: gameInfo.slug,
      slug: gameInfo.slug,
      generated_at: new Date().toISOString(),
      answers: rows,
      results: rows
    });
  }catch(err){ next(err); }
}
module.exports = list;
module.exports.list = list;
module.exports.getResults = list;