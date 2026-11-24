const sessionRepository = require('../repositories/session.repository');
const questionSetRepository = require('../repositories/question-set.repository');
const { notFound, forbidden, conflict } = require('../errors/http-errors');

function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function findOrFail(code) {
  const session = await sessionRepository.findByCode(code);
  if (!session) throw notFound('SESSION_NOT_FOUND', `No game with code ${code}.`);
  return session;
}

async function create(setId, user) {
  const questionSet = await questionSetRepository.findById(setId);
  if (!questionSet) throw notFound('QUESTION_SET_NOT_FOUND', 'No question set has that id.');
  // user.id yung number (4), hindi user.user_id na 'host1'
  if (questionSet.host_id !== user.id && !questionSet.is_public) {
    throw forbidden('This question set belongs to another host.');
  }
  for (let i = 1; i <= 5; i++) {
    try {
      return await sessionRepository.create({
        set_id: setId,
        host_id: user.id,
        join_pin: randomCode(),
        status: 'LOBBY',
      });
    } catch (e) {
      if (e.name !== 'SequelizeUniqueConstraintError') throw e;
    }
  }
  throw new Error('Could not find a free join code after 5 attempts.');
}

const NEXT_STATUS = { LOBBY: ['RUNNING', 'CLOSED'], RUNNING: ['CLOSED'], CLOSED: [] };

async function changeStatus(code, status, user) {
  const session = await findOrFail(code);
  if (session.host_id !== user.id && user.role !== 'ADMIN') {
    throw forbidden('This game belongs to another host.');
  }
  if (!NEXT_STATUS[session.status].includes(status)) {
    throw conflict('INVALID_STATUS_CHANGE', `A ${session.status} game cannot become ${status}.`);
  }
  const changes = { status };
  if (status === 'RUNNING') changes.started_at = new Date();
  if (status === 'CLOSED') changes.ended_at = new Date();
  return sessionRepository.update(session, changes);
}

module.exports = { create, findOrFail, changeStatus };