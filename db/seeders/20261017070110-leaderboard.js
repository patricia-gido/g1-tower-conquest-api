'use strict';
module.exports = {
  async up(queryInterface) {
    // Safe version - hindi mag error kahit may laman na
    const [rows] = await queryInterface.sequelize.query(`SELECT id FROM game_sessions WHERE join_pin='ABC123' LIMIT 1`);
    if (rows.length === 0) return;
    const sessionId = rows[0].id;

    const [cnt] = await queryInterface.sequelize.query(`SELECT COUNT(*) as c FROM leaderboard WHERE game_session_id=${sessionId}`);
    if (parseInt(cnt[0].c) >= 3) {
      console.log('Leaderboard already has 3 rows - skipping');
      return;
    }

    const [users] = await queryInterface.sequelize.query(`SELECT id FROM users ORDER BY id LIMIT 3`);
    if (users.length < 3) return;

    await queryInterface.bulkInsert('leaderboard', [
      { game_session_id: sessionId, user_id: users[0].id, score: 100, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: sessionId, user_id: users[1].id, score: 90, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: sessionId, user_id: users[2].id, score: 80, completed: true, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`DELETE FROM leaderboard WHERE game_session_id IN (SELECT id FROM game_sessions WHERE join_pin='ABC123')`);
  }
};