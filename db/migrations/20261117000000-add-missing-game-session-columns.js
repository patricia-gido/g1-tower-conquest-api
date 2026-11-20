'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('game_sessions');
    const addIfMissing = async (column, options) => {
      if (!table[column]) {
        await queryInterface.addColumn('game_sessions', column, options);
      }
    };
    await addIfMissing('host_id', { type: Sequelize.INTEGER, allowNull: true, });
    await addIfMissing('set_id', { type: Sequelize.INTEGER, allowNull: true, });
    await addIfMissing('join_pin', { type: Sequelize.STRING, allowNull: true, unique: true, });
    await addIfMissing('status', { type: Sequelize.STRING, allowNull: false, defaultValue: 'LOBBY', });
    await addIfMissing('started_at', { type: Sequelize.DATE, allowNull: true, });
    await addIfMissing('finished_at', { type: Sequelize.DATE, allowNull: true, });
  },
  async down(queryInterface, Sequelize) {
    // No-op: Huwag nang burahin dito.
    // Yung ibang migration na yung may-ari ng mga columns na to,
    // pag binura pa natin dito magdo-double delete at mag-ERROR.
    // Kailangan lang ng CI check na hindi mag-error pag nag-undo.
    return;
  },
};