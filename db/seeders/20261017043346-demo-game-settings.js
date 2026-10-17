'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('game_settings', [
      { key: 'max_players', value: '4', created_at: new Date(), updated_at: new Date() },
      { key: 'tower_health', value: '100', created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('game_settings', null, {});
  }
};