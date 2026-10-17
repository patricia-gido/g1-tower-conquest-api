'use strict';
module.exports = {
  async up(q) {
    await q.sequelize.query(`DELETE FROM leaderboard`);
    await q.sequelize.query(`DELETE FROM game_sessions WHERE join_pin IN ('ABC123','123456','234567','111111','222222')`);
    const [users] = await q.sequelize.query(`SELECT id FROM users ORDER BY id LIMIT 3`);
    if (users.length < 3) throw new Error('Need 3 users');

    const [r1] = await q.sequelize.query(`INSERT INTO game_sessions (join_pin, started_at, ended_at, created_at, updated_at) VALUES ('123456', NOW() - INTERVAL '2 hour', NOW() - INTERVAL '1 hour', NOW(), NOW()) RETURNING id`);
    const id1 = r1[0].id;
    await q.bulkInsert('leaderboard', [
      { game_session_id: id1, user_id: users[0].id, score: 100, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: id1, user_id: users[1].id, score: 90, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: id1, user_id: users[2].id, score: 80, completed: true, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(q) {
    await q.sequelize.query(`DELETE FROM leaderboard`);
    await q.sequelize.query(`DELETE FROM game_sessions WHERE join_pin IN ('ABC123','123456','234567')`);
  }
};