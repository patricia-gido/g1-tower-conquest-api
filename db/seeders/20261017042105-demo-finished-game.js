'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`DELETE FROM leaderboard WHERE game_session_id IN (SELECT id FROM game_sessions WHERE join_pin='ABC123')`);
    await queryInterface.sequelize.query(`DELETE FROM game_sessions WHERE join_pin='ABC123'`);
    const [users] = await queryInterface.sequelize.query(`SELECT id FROM users ORDER BY id ASC LIMIT 3`);
    if (users.length < 3) throw new Error('Need 3 users');
    const [result] = await queryInterface.sequelize.query(`
      INSERT INTO game_sessions (join_pin, started_at, ended_at, created_at, updated_at)
      VALUES ('ABC123', NOW(), NOW(), NOW(), NOW()) RETURNING id
    `);
    const sessionId = result[0].id;
    console.log('Created session', sessionId);
    await queryInterface.bulkInsert('leaderboard', [
      { game_session_id: sessionId, user_id: users[0].id, score: 100, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: sessionId, user_id: users[1].id, score: 90, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: sessionId, user_id: users[2].id, score: 80, completed: true, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`DELETE FROM leaderboard WHERE game_session_id IN (SELECT id FROM game_sessions WHERE join_pin='ABC123')`);
    await queryInterface.sequelize.query(`DELETE FROM game_sessions WHERE join_pin='ABC123'`);
  }
};