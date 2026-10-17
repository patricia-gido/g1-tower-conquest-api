'use strict';
module.exports = {
  async up(q) {
    await q.bulkInsert('game_sessions', [{
      id: 1,
      join_pin: 'ABC123',
      started_at: new Date(Date.now() - 1000 * 60 * 60),
      ended_at: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  async down(q) { await q.bulkDelete('game_sessions', { id: 1 }); }
};