'use strict';
module.exports = {
  async up(queryInterface) {
    // 1. Create or get 3 users
    const [users] = await queryInterface.sequelize.query(`SELECT id FROM users LIMIT 3`);
    let userIds = users.map(u => u.id);
    if (userIds.length < 3) {
      await queryInterface.bulkInsert('users', [
        { user_id: 'S001', role: 'student', username: 'player1', created_at: new Date(), updated_at: new Date() },
        { user_id: 'S002', role: 'student', username: 'player2', created_at: new Date(), updated_at: new Date() },
        { user_id: 'S003', role: 'student', username: 'player3', created_at: new Date(), updated_at: new Date() },
      ]);
      const [newUsers] = await queryInterface.sequelize.query(`SELECT id FROM users ORDER BY id DESC LIMIT 3`);
      userIds = newUsers.map(u => u.id);
    }

    // 2. Create 1 finished game session
    const [sessions] = await queryInterface.sequelize.query(`SELECT id FROM game_sessions WHERE join_pin = 'ABC123'`);
    let sessionId;
    if (sessions.length === 0) {
      await queryInterface.bulkInsert('game_sessions', [{
        join_pin: 'ABC123',
        started_at: new Date(Date.now() - 3600000),
        ended_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }]);
      const [s] = await queryInterface.sequelize.query(`SELECT id FROM game_sessions WHERE join_pin = 'ABC123'`);
      sessionId = s[0].id;
    } else {
      sessionId = sessions[0].id;
      await queryInterface.sequelize.query(`UPDATE game_sessions SET ended_at = NOW(), updated_at = NOW() WHERE id = ${sessionId}`);
    }

    // 3. 3 completed players
    await queryInterface.sequelize.query(`DELETE FROM leaderboard WHERE game_session_id = ${sessionId}`);
    await queryInterface.bulkInsert('leaderboard', [
      { game_session_id: sessionId, user_id: userIds[0], score: 100, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: sessionId, user_id: userIds[1], score: 90, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: sessionId, user_id: userIds[2], score: 80, completed: true, created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(q) {
    await q.sequelize.query(`DELETE FROM leaderboard WHERE game_session_id IN (SELECT id FROM game_sessions WHERE join_pin='ABC123')`);
    await q.sequelize.query(`DELETE FROM game_sessions WHERE join_pin='ABC123'`);
  }
};