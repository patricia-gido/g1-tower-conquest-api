const sessions = new Map();

function makeError(status, code, message) {
  const e = new Error(message);
  e.status = status; e.code = code;
  return e;
}
function isSixDigits(code) { return /^\d{6}$/.test(String(code || "")); }

function create(body) {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const session = { code, set_id: body?.set_id || 1, status: "WAITING", players: [] };
  sessions.set(code, session);
  return session;
}

function get(code) {
  if (!isSixDigits(code)) throw makeError(400, "INVALID_CODE", "Code must be six digits.");
  const s = sessions.get(String(code));
  if (!s) throw makeError(404, "NOT_FOUND", "No game uses this code.");
  return s;
}

function join(code, nickname, player_id) {
  const s = get(code);
  if (!nickname || nickname.length < 3) throw makeError(400, "INVALID_NICKNAME", "Nickname too short.");
  if (s.status !== "WAITING") throw makeError(409, "TOO_LATE", "Game already started.");

  const samePlayer = s.players.find(p => p.player_id === player_id);
  if (samePlayer && samePlayer.nickname === nickname) {
    return { ...s, alreadyJoined: true };
  }
  const taken = s.players.find(p => p.nickname === nickname);
  if (taken) throw makeError(409, "NICKNAME_TAKEN", "Nickname already taken.");

  s.players.push({ nickname, player_id: player_id || nickname });
  return { ...s, alreadyJoined: false };
}

function start(code, demoUser) {
  const s = get(code);
  // #2 - Pag player yung nag-start, 403 agad
  if (demoUser !== "host1") throw makeError(403, "FORBIDDEN", "Only host can start.");
  // #12 - Pag STARTED na, bawal ulit i-start, 409
  if (s.status !== "WAITING") throw makeError(409, "INVALID_STATUS", "Status change not allowed.");
  s.status = "STARTED";
  return s;
}

function clear() { sessions.clear(); }

module.exports = { create, get, join, start, clear };