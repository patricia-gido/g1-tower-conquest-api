'use strict';
module.exports = {
  async up(q) {
    await q.bulkInsert('leaderboard', [
      { id: 1, game_session_id: 1, user_id: 1, score: 100, created_at: new Date(), updated_at: new Date() },
      { id: 2, game_session_id: 1, user_id: 2, score: 90, created_at: new Date(), updated_at: new Date() },
      { id: 3, game_session_id: 1, user_id: 3, score: 80, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(q) { await q.bulkDelete('leaderboard', { game_session_id: 1 }); }
};