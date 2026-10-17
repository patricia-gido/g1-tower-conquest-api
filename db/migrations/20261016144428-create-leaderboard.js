'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaderboard', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      game_session_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'game_sessions', key: 'id' } },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
      score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addConstraint('leaderboard', { fields: ['game_session_id','user_id'], type: 'unique', name: 'uq_leaderboard_session_user' });
    await queryInterface.addConstraint('leaderboard', { fields: ['score'], type: 'check', name: 'ck_leaderboard_score_nonnegative', where: { score: { [Sequelize.Op.gte]: 0 } } });
  },
  async down(queryInterface) { await queryInterface.dropTable('leaderboard'); }
};