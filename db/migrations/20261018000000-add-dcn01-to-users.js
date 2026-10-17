'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'school_id', { type: Sequelize.STRING, allowNull: true }).catch(() => {});
    await queryInterface.addColumn('users', 'full_name', { type: Sequelize.STRING, allowNull: true }).catch(() => {});
    await queryInterface.addColumn('users', 'email', { type: Sequelize.STRING, allowNull: true }).catch(() => {});
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'school_id').catch(() => {});
    await queryInterface.removeColumn('users', 'full_name').catch(() => {});
    await queryInterface.removeColumn('users', 'email').catch(() => {});
  }
};