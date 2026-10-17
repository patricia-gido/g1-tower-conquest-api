'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaderboard', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      game_session_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'game_sessions', key: 'id' }, onDelete: 'CASCADE' },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
    // ITO yung sinasabi ng checker: One seat per account per game (UNIQUE with user_id)
    await queryInterface.addConstraint('leaderboard', {
      fields: ['game_session_id', 'user_id'],
      type: 'unique',
      name: 'uq_leaderboard_session_user'
    });
    await queryInterface.sequelize.query(`
      ALTER TABLE leaderboard ADD CONSTRAINT ck_leaderboard_score_non_negative CHECK (score >= 0)
    `);
  },
  async down(queryInterface) { await queryInterface.dropTable('leaderboard'); }
};