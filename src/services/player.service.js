const sessionService = require('./session.service');
const playerRepository = require('../repositories/player.repository');
const { conflict } = require('../errors/http-errors');
const { constraintOf } = require('../errors/db-errors');

async function join(code, nickname, user) {
  const session = await sessionService.findOrFail(code);
  // Q4 BAGO Q5: Rejoin muna, bago lobby check
  const seat = await playerRepository.findSeat(session.session_id, user.id);
  if (seat) {
    await playerRepository.markSeen(seat);
    return { session, player: seat, created: false };
  }
  // Q5: Lobby pa ba?
  if (session.status === 'CLOSED') throw conflict('SESSION_ENDED', 'This game has ended.');
  if (session.status !== 'LOBBY') throw conflict('SESSION_NOT_JOINABLE', 'This game has already started.');
  // Q6: May room pa ba?
  const taken = await playerRepository.countBySession(session.session_id);
  if (taken >= session.max_players) throw conflict('SESSION_FULL', 'This game is full.');
  // Q7: Nickname free? Si DB magsasabi via UNIQUE
  try {
    const player = await playerRepository.create({
      session_id: session.session_id,
      user_id: user.id,
      nickname,
      score: 0,
      last_seen_at: new Date(),
    });
    return { session, player, created: true };
  } catch (error) {
    // Dalawang request sabay: yung isa nanalo, ibalik yung seat na yun
    if (constraintOf(error) === 'uq_leaderboard_session_user') {
      const existing = await playerRepository.findSeat(session.session_id, user.id);
      return { session, player: existing, created: false };
    }
    throw error;
  }
}

async function list(code) {
  const session = await sessionService.findOrFail(code);
  const players = await playerRepository.listBySession(session.session_id);
  return { session, players };
}

module.exports = { join, list };