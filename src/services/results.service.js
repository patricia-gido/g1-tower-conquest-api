const repo = require('../repositories/results.repository');

async function listFinishedGames(since) {
  const rows = await repo.findFinishedGamePlayers(since);
  const map = new Map();
  
  for (const r of rows) {
    if (!/^\d{6}$/.test(r.session_code)) continue;
    if (!map.has(r.session_code)) {
      map.set(r.session_code, {
        session_code: r.session_code,
        started_at: r.started_at,
        ended_at: r.ended_at,
        podium: [],
        players: []
      });
    }
    const game = map.get(r.session_code);
    game.players.push({
      school_id: String(r.school_id),
      nickname: r.nickname,
      score: Number(r.score),
      completed: !!r.completed
    });
  }

  // build podium = top 3 sorted by score
  for (const g of map.values()) {
    g.players.sort((a,b) => b.score - a.score);
    g.podium = g.players.slice(0,3);
  }

  return Array.from(map.values());
}

module.exports = { listFinishedGames };