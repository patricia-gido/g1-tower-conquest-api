const sessionService = require('./session.service');
const playerRepo = require('../repositories/player.repository');
const { conflict, badRequest } = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');

async function join(code, nickname, user) {
  if (!nickname || !nickname.trim()) {
    throw badRequest('NICKNAME_REQUIRED', 'Nickname is required.');
  }
  const cleanNickname = nickname.trim();
  const session = await sessionService.findOrFail(code);
  const seat = await playerRepo.findBySessionAndUser(session.session_id, user.id);
  if (seat) {
    await playerRepo.update(seat.player_id, { last_seen_at: new Date() });
    return { session, player: seat, created: false };
  }
  if (session.status === 'CLOSED') throw conflict('SESSION_ENDED', 'This game has ended.');
  if (session.status !== 'LOBBY') throw conflict('SESSION_NOT_JOINABLE', 'This game has already started.');
  const seatsTaken = await playerRepo.countBySession(session.session_id);
  if (session.max_players && seatsTaken >= session.max_players) throw conflict('SESSION_FULL', 'This game is full.');
  try {
    const player = await playerRepo.create({
      session_id: session.session_id,
      user_id: user.id,
      nickname: cleanNickname,
      last_seen_at: new Date(),
    });
    return { session, player, created: true };
  } catch (error) {
    if (constraintOf(error) === 'uq_one_seat') {
      const existing = await playerRepo.findBySessionAndUser(session.session_id, user.id);
      return { session, player: existing, created: false };
    }
    if (constraintOf(error) === 'uq_one_nickname') {
      throw conflict('NICKNAME_TAKEN', 'That nickname is already used in this game.');
    }
    throw error;
  }
}

async function list(code) {
  const session = await sessionService.findOrFail(code);
  return playerRepo.listBySession(session.session_id);
}

module.exports = { join, list };