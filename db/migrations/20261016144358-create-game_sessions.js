'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_sessions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      join_pin: { type: Sequelize.STRING, allowNull: false },
      started_at: { type: Sequelize.DATE, allowNull: false },
      ended_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addConstraint('game_sessions', { fields: ['join_pin'], type: 'unique', name: 'uq_game_sessions_join_pin' });
  },
  async down(queryInterface) { await queryInterface.dropTable('game_sessions'); }
};