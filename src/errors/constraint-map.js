module.exports = {
  // Kapag 2 player pareho ng nickname sa isang game
  uq_one_nickname: {
    status: 409,
    code: 'NICKNAME_TAKEN',
    message: 'That nickname is already used in this game.',
  },
  // Kapag 2 player pareho ng seat sa isang game
  uq_one_seat: {
    status: 409,
    code: 'SEAT_TAKEN',
    message: 'That seat is already taken in this game.',
  },
  // Kapag nag-create ng session na may join_pin na gamit na
  uq_game_sessions_join_pin: {
    status: 409,
    code: 'JOIN_PIN_TAKEN',
    message: 'That join PIN is already used by another game.',
  },
  // Kapag nag-try mag-delete ng host na may question set pa
  question_sets_host_id_fkey: {
    status: 409,
    code: 'HOST_HAS_QUESTION_SETS',
    message: 'This host still has question sets and cannot be deleted.',
  },
};