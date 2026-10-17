const resultsRepo = require('../repositories/results.repository');

async function listFinishedGames(since) {
  const rows = await resultsRepo.findFinishedGamePlayers(since);

  // Group by session_code
  const map = new Map();
  for (const r of rows) {
    if (!map.has(r.session_code)) {
      map.set(r.session_code, {
        session_code: r.session_code,
        started_at: r.started_at,
        ended_at: r.ended_at,
        school_id: r.school_id,
        podium: []
      });
    }
    const game = map.get(r.session_code);
    if (game.podium.length < 10) {
      game.podium.push({
        rank: game.podium.length + 1,
        nickname: r.nickname,
        score: r.score
      });
    }
  }

  return Array.from(map.values());
}

module.exports = { listFinishedGames };