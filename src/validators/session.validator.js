const { param, body } = require('express-validator');

const codeParam = param('code')
  .matches(/^[1-9][0-9]{5}$/)
  .withMessage('the join code must be six digits');

const createRules = [
  body('set_id').exists().withMessage('set_id is required')
];

const statusRules = [
  codeParam,
  body('status').isIn(['RUNNING', 'CLOSED']).withMessage('status must be RUNNING or CLOSED')
];

const joinRules = [
  codeParam,
  body('nickname')
    .exists().withMessage('nickname is required').bail()
    .isString().bail()
    .trim()
    .isLength({ min: 2, max: 24 }).withMessage('nickname must be 2 to 24 characters long')
];

module.exports = { codeParam, createRules, statusRules, joinRules };