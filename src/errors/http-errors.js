function httpError(status, code, message) {
  const err = new Error(message);
  err.status = status;
  err.code = code;
  return err;
}

function notFound(code, message) {
  return httpError(404, code, message);
}

function forbidden(message) {
  return httpError(403, 'FORBIDDEN', message);
}

function conflict(code, message) {
  return httpError(409, code, message);
}

module.exports = { notFound, forbidden, conflict };