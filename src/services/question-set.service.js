const repo = require('../repositories/question-set.repository');

function notFound() {
  const err = new Error('Question set not found');
  err.status = 404;
  return err;
}

async function create(data, user) {
  const hostId = user?.id || user?.user_id || 1;
  return repo.create({
    title: data.title,
    subject: data.subject ?? null,
    is_public: data.is_public ?? false,
    host_id: hostId,
  });
}

async function list() {
  return repo.findAll();
}

async function get(id) {
  const row = await repo.findById(id);
  if (!row) throw notFound();
  return row;
}

async function update(id, data) {
  const row = await repo.update(id, {
    ...(data.title !== undefined ? { title: data.title } : {}),
    ...(data.subject !== undefined ? { subject: data.subject } : {}),
    ...(data.is_public !== undefined ? { is_public: data.is_public } : {}),
  });
  if (!row) throw notFound();
  return row;
}

async function remove(id) {
  const ok = await repo.remove(id);
  if (!ok) throw notFound();
}

module.exports = { create, list, get, update, remove };