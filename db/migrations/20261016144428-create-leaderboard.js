'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaderboard', {
      leaderboard_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'users', key: 'user_id' },
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
      },
      session_id: {
        type: Sequelize.INTEGER, allowNull: false, unique: true,
        references: { model: 'game_sessions', key: 'session_id' },
        onDelete: 'CASCADE', onUpdate: 'CASCADE'
      },
      high_score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      achieved_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('leaderboard');
  }
};