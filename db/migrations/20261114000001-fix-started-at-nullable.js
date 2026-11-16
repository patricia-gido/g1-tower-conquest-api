'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('game_sessions', 'started_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('game_sessions', 'started_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};