'use strict';
module.exports = {
  async up(q) {
    await q.bulkInsert('users', [
      { id: 1, user_id: 'user1', role: 'player', username: 'user1', school_id: '2024-1001', full_name: 'Patricia Santos', email: 'patricia@gmail.com', created_at: new Date(), updated_at: new Date() },
      { id: 2, user_id: 'user2', role: 'player', username: 'user2', school_id: '2024-1002', full_name: 'Alyssa Villanueva', email: 'alyssa@gmail.com', created_at: new Date(), updated_at: new Date() },
      { id: 3, user_id: 'user3', role: 'player', username: 'user3', school_id: '2024-1003', full_name: 'Miguel Torres', email: 'miguel@gmail.com', created_at: new Date(), updated_at: new Date() },
      { id: 4, user_id: 'host1', role: 'host', username: 'host1', school_id: '2024-2001', full_name: 'Sofia Ramos', email: 'sofia@gmail.com', created_at: new Date(), updated_at: new Date() },
      { id: 5, user_id: 'host2', role: 'host', username: 'host2', school_id: '2024-2002', full_name: 'Andrei Bautista', email: 'andrei@gmail.com', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(q) {
    await q.bulkDelete('users', null, {});
  }
};