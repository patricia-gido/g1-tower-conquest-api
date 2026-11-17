'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('game_sessions', 'host_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('game_sessions', 'status', {
      type: Sequelize.ENUM('LOBBY', 'RUNNING', 'CLOSED'),
      allowNull: false,
      defaultValue: 'LOBBY',
    });
    await queryInterface.addColumn('game_sessions', 'max_players', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 20,
    });
    await queryInterface.addColumn('game_sessions', 'current_position', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('game_sessions', 'host_id');
    await queryInterface.removeColumn('game_sessions', 'status');
    await queryInterface.removeColumn('game_sessions', 'max_players');
    await queryInterface.removeColumn('game_sessions', 'current_position');
  }
};