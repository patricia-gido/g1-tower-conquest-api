const repo = require('../repositories/results.repository');
const gameInfo = require('../config/game-info');

async function listFinishedGames(since) {
  const rows = await repo.findFinishedGamePlayers(since);
  const map = new Map();
  for (const r of rows) {
    if (!r.session_code) continue;
    if (!map.has(r.session_code)) {
      map.set(r.session_code, {
        game: gameInfo.slug,
        slug: gameInfo.slug,
        session_code: r.session_code,
        join_pin: r.session_code,
        started_at: r.started_at,
        ended_at: r.ended_at,
        podium: [],
        players: []
      });
    }
    const g = map.get(r.session_code);
    g.players.push({
      school_id: String(r.school_id),
      nickname: r.nickname,
      score: Number(r.score),
      completed: true
    });
  }
  for (const g of map.values()) {
    g.players.sort((a,b) => b.score - a.score);
    g.podium = g.players.slice(0,3).map((p,i) => ({
      rank: i+1,
      school_id: p.school_id,
      nickname: p.nickname,
      score: p.score,
      completed: true
    }));
  }
  return Array.from(map.values());
}

module.exports = { listFinishedGames };