const CONSTRAINT_MAP = {
  uq_one_nickname: { status: 409, code: 'NICKNAME_TAKEN', message: 'That nickname is already used in this game.' },
  uq_one_seat: { status: 409, code: 'ALREADY_JOINED', message: 'You already joined this game.' },
};
module.exports = { CONSTRAINT_MAP };