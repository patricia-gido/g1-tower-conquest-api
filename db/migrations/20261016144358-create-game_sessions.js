'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_sessions', {
      session_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      final_score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      max_streak: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      tower_height: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      played_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.sequelize.query(
      'ALTER TABLE "game_sessions" ADD CONSTRAINT "ck_game_sessions_final_score_gte_0" CHECK (final_score >= 0)'
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('game_sessions');
  }
};