'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('question_sets', [
      {
        host_id: 1,
        title: 'Philippine Literature',
        subject: 'Literature',
        is_public: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        host_id: 1,
        title: 'Math Basics',
        subject: 'Mathematics',
        is_public: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('question_sets', null, {});
  }
};