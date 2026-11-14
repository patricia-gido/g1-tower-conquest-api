'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Tanggalin muna yung lumang unique constraint - kung wala na, ok lang
    try {
      await queryInterface.removeConstraint('leaderboard', 'uq_leaderboard_session_user');
    } catch (e) {}

    // 2. id -> player_id - kung naka-rename na, ok lang
    try {
      await queryInterface.renameColumn('leaderboard', 'id', 'player_id');
    } catch (e) {}

    // 3. game_session_id -> session_id
    try {
      await queryInterface.renameColumn('leaderboard', 'game_session_id', 'session_id');
    } catch (e) {}

    // 4. Dagdag nickname kung wala pa
    const table = await queryInterface.describeTable('leaderboard');
    if (!table.nickname) {
      await queryInterface.addColumn('leaderboard', 'nickname', {
        type: Sequelize.STRING(24),
        allowNull: false,
        defaultValue: 'Player',
      });
    }
    if (!table.last_seen_at) {
      await queryInterface.addColumn('leaderboard', 'last_seen_at', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    if (table.completed) {
      await queryInterface.removeColumn('leaderboard', 'completed');
    }

    // 5. ITO YUNG FIX - Gawing unique yung mga lumang nickname
    // Player -> Player_1, Player_2, etc. para hindi mag-duplicate
    await queryInterface.sequelize.query(
      `UPDATE "leaderboard" SET "nickname" = 'Player_' || "player_id" WHERE "nickname" = 'Player'`
    );

    // 6. Bagong constraints - kung meron na, ok lang
    try {
      await queryInterface.addConstraint('leaderboard', {
        fields: ['session_id', 'user_id'],
        type: 'unique',
        name: 'uq_one_seat',
      });
    } catch (e) {}

    try {
      await queryInterface.addConstraint('leaderboard', {
        fields: ['session_id', 'nickname'],
        type: 'unique',
        name: 'uq_one_nickname',
      });
    } catch (e) {}
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('leaderboard', 'uq_one_nickname');
    await queryInterface.removeConstraint('leaderboard', 'uq_one_seat');
    await queryInterface.addColumn('leaderboard', 'completed', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.removeColumn('leaderboard', 'last_seen_at');
    await queryInterface.removeColumn('leaderboard', 'nickname');
    await queryInterface.renameColumn('leaderboard', 'session_id', 'game_session_id');
    await queryInterface.renameColumn('leaderboard', 'player_id', 'id');
    await queryInterface.addConstraint('leaderboard', {
      fields: ['game_session_id', 'user_id'],
      type: 'unique',
      name: 'uq_leaderboard_session_user',
    });
  },
};