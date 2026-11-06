const questionSetRepository = require('../repositories/question-set.repository');
const { notFound, forbidden } = require('../errors/app-error');

async function findOrFail(id) {
  const qs = await questionSetRepository.findById(id);
  if (!qs) throw notFound('QUESTION_SET_NOT_FOUND', `No question set has the id ${id}.`);
  return qs;
}
function isOwner(qs, user) {
  return qs.host_id === user.user_id || user.role === 'ADMIN';
}

// Rule: host sees own sets, admin sees all
function list(user) {
  return user.role === 'ADMIN'
    ? questionSetRepository.findAll()
    : questionSetRepository.findAllByHost(user.user_id);
}
// Rule: public can be read by anyone, private only by owner/admin
async function get(id, user) {
  const qs = await findOrFail(id);
  if (!isOwner(qs, user) && !qs.is_public) {
    throw forbidden('This question set belongs to another host.');
  }
  return qs;
}
function create(data, user) {
  return questionSetRepository.create({ ...data, host_id: user.user_id });
}
async function update(id, changes, user) {
  const qs = await findOrFail(id);
  if (!isOwner(qs, user)) throw forbidden('This question set belongs to another host.');
  return questionSetRepository.update(qs, changes);
}
async function remove(id, user) {
  const qs = await findOrFail(id);
  if (!isOwner(qs, user)) throw forbidden('This question set belongs to another host.');
  await questionSetRepository.remove(qs);
}

module.exports = { list, get, create, update, remove };