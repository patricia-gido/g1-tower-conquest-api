'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      { school_id: '2099-0001', full_name: 'Alex Test', email: 'alex@test', created_at: new Date(), updated_at: new Date() },
      { school_id: '2099-0002', full_name: 'Blake Test', email: 'blake@test', created_at: new Date(), updated_at: new Date() },
      { school_id: '2099-0003', full_name: 'Casey Test', email: 'casey@test', created_at: new Date(), updated_at: new Date() },
      { school_id: '2099-0004', full_name: 'Dana Test', email: 'dana@test', created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};