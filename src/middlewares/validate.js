const { validationResult, matchedData } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      code: 'VALIDATION_FAILED',
      message: 'Validation failed',
      details: errors.array()
    });
  }
  req.validated = matchedData(req, { locations: ['body', 'params', 'query'] });
  next();
};