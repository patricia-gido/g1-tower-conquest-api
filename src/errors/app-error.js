function conflict(code, message) {
  const err = new Error(message);
  err.status = 409;
  err.code = code;
  return err;
}
function notFound(code, message) {
  const err = new Error(message);
  err.status = 404;
  err.code = code;
  return err;
}
module.exports = { conflict, notFound };