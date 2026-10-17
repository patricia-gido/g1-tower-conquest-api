'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      school_id: { type: Sequelize.STRING, allowNull: false },
      full_name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addConstraint('users', {
      fields: ['school_id'], type: 'unique', name: 'uq_users_school_id'
    });
    await queryInterface.addConstraint('users', {
      fields: ['email'], type: 'unique', name: 'uq_users_email'
    });
  },
  async down(queryInterface) { await queryInterface.dropTable('users'); }
};