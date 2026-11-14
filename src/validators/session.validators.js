const { body, param } = require('express-validator');

const createRules = [
  body('set_id')
    .exists().withMessage('set_id is required')
    .isInt({ min: 1 }).withMessage('set_id must be a number')
    .toInt(),
];

const codeParam = [
  param('code')
    .exists().withMessage('code is required')
    .isLength({ min: 6, max: 6 }).withMessage('code must be 6 digits'),
];

const statusRules = [
  param('code')
    .exists().withMessage('code is required')
    .isLength({ min: 6, max: 6 }).withMessage('code must be 6 digits'),
  body('status')
    .exists().withMessage('status is required')
    .isIn(['RUNNING', 'CLOSED']).withMessage('status must be RUNNING or CLOSED'),
];

const joinRules = [
  param('code')
    .exists().withMessage('code is required')
    .isLength({ min: 6, max: 6 }).withMessage('code must be 6 digits'),
  body('display_name').optional().isString(),
  body('player_name').optional().isString(),
  body('name').optional().isString(),
];

module.exports = { createRules, codeParam, statusRules, joinRules };