'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`DELETE FROM leaderboard WHERE game_session_id IN (SELECT id FROM game_sessions WHERE join_pin IN ('ABC123','123456'))`);
    await queryInterface.sequelize.query(`DELETE FROM game_sessions WHERE join_pin IN ('ABC123','123456')`);

    const [users] = await queryInterface.sequelize.query(`SELECT id, username FROM users ORDER BY id ASC LIMIT 3`);
    if (users.length < 3) throw new Error('Need 3 users');

    // Game 1: 6 digits for checker
    const [r1] = await queryInterface.sequelize.query(`INSERT INTO game_sessions (join_pin, started_at, ended_at, created_at, updated_at) VALUES ('123456', NOW() - INTERVAL '2 hour', NOW() - INTERVAL '1 hour', NOW(), NOW()) RETURNING id`);
    const id1 = r1[0].id;
    await queryInterface.bulkInsert('leaderboard', [
      { game_session_id: id1, user_id: users[0].id, score: 100, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: id1, user_id: users[1].id, score: 90, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: id1, user_id: users[2].id, score: 80, completed: true, created_at: new Date(), updated_at: new Date() }
    ]);

    // Game ABC123: for podium test
    const [r2] = await queryInterface.sequelize.query(`INSERT INTO game_sessions (join_pin, started_at, ended_at, created_at, updated_at) VALUES ('ABC123', NOW(), NOW(), NOW(), NOW()) RETURNING id`);
    const id2 = r2[0].id;
    await queryInterface.bulkInsert('leaderboard', [
      { game_session_id: id2, user_id: users[0].id, score: 100, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: id2, user_id: users[1].id, score: 90, completed: true, created_at: new Date(), updated_at: new Date() },
      { game_session_id: id2, user_id: users[2].id, score: 80, completed: true, created_at: new Date(), updated_at: new Date() }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(`DELETE FROM leaderboard WHERE game_session_id IN (SELECT id FROM game_sessions WHERE join_pin IN ('ABC123','123456'))`);
    await queryInterface.sequelize.query(`DELETE FROM game_sessions WHERE join_pin IN ('ABC123','123456')`);
  }
};