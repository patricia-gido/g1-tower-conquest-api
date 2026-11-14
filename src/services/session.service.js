const sessionRepo = require('../repositories/session.repository');
const questionSetRepo = require('../repositories/question-set.repository');
const { notFound, forbidden, conflict } = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');

function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function create(questionSetId, user) {
  const questionSet = await questionSetRepo.findById(questionSetId);
  if (!questionSet) throw notFound('QUESTION_SET_NOT_FOUND', `No question set has the id ${questionSetId}.`);
  const mayUse = questionSet.host_id === user.id || questionSet.is_public;
  if (!mayUse) throw forbidden('This question set belongs to another host.');
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      return await sessionRepo.create({
        set_id: questionSet.set_id,
        host_id: user.id,
        join_pin: randomCode(),
      });
    } catch (error) {
      if (constraintOf(error) !== 'game_sessions_join_pin_key') throw error;
    }
  }
  throw new Error('Could not find a free join code after 5 attempts.');
}

async function findOrFail(code) {
  const session = await sessionRepo.findByPin(code);
  if (!session) throw notFound('SESSION_NOT_FOUND', 'No game has this code.');
  return session;
}

async function get(code) {
  return findOrFail(code);
}

const NEXT_STATUS = {
  LOBBY: ['RUNNING', 'CLOSED'],
  RUNNING: ['CLOSED'],
  CLOSED: [],
};

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
  return sessionRepo.update(session.session_id, changes);
}

module.exports = { create, get, findOrFail, changeStatus };