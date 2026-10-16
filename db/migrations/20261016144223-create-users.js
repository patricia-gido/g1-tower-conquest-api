'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      role: { type: Sequelize.STRING, allowNull: false, defaultValue: 'player' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};