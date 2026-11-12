const { body, param } = require('express-validator');

const idParam = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
];

const createRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('title is required')
    .isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters'),
  body('subject')
    .optional({ values: 'null' })
    .trim()
    .isLength({ max: 60 }).withMessage('subject must be at most 60 characters'),
  body('is_public')
    .optional()
    .isBoolean().withMessage('is_public must be a boolean'),
];

const updateRules = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters'),
  body('subject')
    .optional({ values: 'null' })
    .trim()
    .isLength({ max: 60 }).withMessage('subject must be at most 60 characters'),
  body('is_public')
    .optional()
    .isBoolean().withMessage('is_public must be a boolean'),
];

module.exports = { idParam, createRules, updateRules };