'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('game_sessions', 'started_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    // Check muna kung nandyan pa ba yung column.
    // Pag binura na siya nung isang migration, wag na galawin.
    const table = await queryInterface.describeTable('game_sessions');
    if (!table.started_at) {
      return;
    }

    await queryInterface.changeColumn('game_sessions', 'started_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};