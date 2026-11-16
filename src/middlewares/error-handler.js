function errorHandler(err, req, res, next) {
  // ITO yung magpapakita ng totoong error sa terminal mo
  console.error("REAL ERROR:", err);

  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Internal server error";

  return res.status(status).json({
    error: {
      code: code,
      message: message,
    },
  });
}

module.exports = errorHandler;