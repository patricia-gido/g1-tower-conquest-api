'use strict';
module.exports = {
  async up(q) {
    await q.bulkInsert('game_settings', [
      { key: 'max_players', value: '4', created_at: new Date(), updated_at: new Date() },
      { key: 'tower_health', value: '100', created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(q) { await q.bulkDelete('game_settings', null, {}); }
};