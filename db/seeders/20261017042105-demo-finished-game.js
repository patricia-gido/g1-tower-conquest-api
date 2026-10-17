'use strict';
module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;
    const [users] = await db.query(`SELECT id, school_id FROM users WHERE email LIKE '%@test'`);
    const getId = (sid) => users.find(u => u.school_id === sid).id;

    const [gameResult] = await db.query(`
      INSERT INTO game_sessions (host_user_id, join_pin, status, started_at, ended_at, created_at, updated_at)
      VALUES (${getId('2099-0001')}, '418263', 'CLOSED', '2026-10-05 01:00:00+00', '2026-10-05 01:12:00+00', NOW(), NOW())
      RETURNING id
    `);
    const gameId = gameResult[0].id;

    await queryInterface.bulkInsert('leaderboard', [
      { game_session_id: gameId, user_id: getId('2099-0001'), score: 100, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: gameId, user_id: getId('2099-0002'), score: 100, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: gameId, user_id: getId('2099-0003'), score: 80, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: gameId, user_id: getId('2099-0004'), score: 10, completed: false, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('leaderboard', null, {});
    await queryInterface.bulkDelete('game_sessions', { join_pin: '418263' }, {});
  }
};