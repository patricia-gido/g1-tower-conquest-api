'use strict';
module.exports = {
  async up(q, Sequelize) {
    await q.createTable('question_sets', {
      set_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      host_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING(150), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      is_public: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },
  async down(q) {
    await q.dropTable('question_sets');
  }
};