'use strict';
module.exports = {
  async up(q) {
    await q.bulkInsert('users', [
      { id: 1, user_id: 'user1', role: 'player', username: 'player1', created_at: new Date(), updated_at: new Date() },
      { id: 2, user_id: 'user2', role: 'player', username: 'player2', created_at: new Date(), updated_at: new Date() },
      { id: 3, user_id: 'user3', role: 'player', username: 'player3', created_at: new Date(), updated_at: new Date() },
      { id: 4, user_id: 'host1', role: 'host', username: 'host1', created_at: new Date(), updated_at: new Date() },
      { id: 5, user_id: 'host2', role: 'host', username: 'host2', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(q) { await q.bulkDelete('users', null, {}); }
};