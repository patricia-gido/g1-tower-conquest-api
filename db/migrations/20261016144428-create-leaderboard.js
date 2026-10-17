'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaderboard', {
      leaderboard_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'game_sessions', key: 'session_id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      high_score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      achieved_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addConstraint('leaderboard', {
      type: 'unique',
      name: 'uq_leaderboard_session',
      fields: ['session_id']
    });
    await queryInterface.sequelize.query(
      'ALTER TABLE "leaderboard" ADD CONSTRAINT "ck_leaderboard_high_score_gte_0" CHECK (high_score >= 0)'
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('leaderboard');
  }
};