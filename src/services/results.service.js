const repo = require('../repositories/results.repository');
async function listFinishedGames(since) {
  const rows = await repo.findFinishedGamePlayers(since);
  const map = new Map();
  for (const r of rows) {
    if (!/^\d{6}$/.test(r.session_code)) continue;
    if (!map.has(r.session_code)) {
      map.set(r.session_code, { session_code: r.session_code, started_at: r.started_at, ended_at: r.ended_at, players: [] });
    }
    map.get(r.session_code).players.push({ nickname: r.nickname, score: r.score });
  }
  for (const g of map.values()) g.players.sort((a,b) => b.score - a.score);
  return Array.from(map.values());
}
module.exports = { listFinishedGames };