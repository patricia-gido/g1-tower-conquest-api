'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('question_sets', [
      {
        set_id: 'demo-set-1',
        host_id: 1,
        title: 'Demo Set 1',
        description: 'Demo description for testing',
        is_public: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        set_id: 'demo-set-2',
        host_id: 1,
        title: 'Demo Set 2',
        description: 'Second demo set',
        is_public: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('question_sets', null, {});
  }
};