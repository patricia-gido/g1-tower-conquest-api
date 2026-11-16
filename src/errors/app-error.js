class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function badRequest(code, message) {
  return new AppError(400, code, message);
}

function unauthorized(code, message) {
  return new AppError(401, code, message);
}

function forbidden(code, message) {
  return new AppError(403, code, message);
}

function notFound(code, message) {
  return new AppError(404, code, message);
}

function conflict(code, message) {
  return new AppError(409, code, message);
}

module.exports = {
  AppError,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
};