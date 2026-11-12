const { body, param } = require('express-validator');

const idParam = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
];

const createRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('title is required')
    .isString().withMessage('title must be a string')
    .isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters'),
  body('subject')
    .optional({ values: 'null' })
    .trim()
    .isString().withMessage('subject must be a string')
    .isLength({ max: 60 }).withMessage('subject must be at most 60 characters'),
  body('is_public')
    .optional()
    .isBoolean().withMessage('is_public must be a boolean'),
];

const updateRules = [
  // FIX: Bawal empty {} - kailangan may at least 1 field
  body().custom((value, { req }) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error('At least one field is required to update');
    }
    return true;
  }),
  body('title')
    .optional()
    .trim()
    .isString().withMessage('title must be a string')
    .isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters'),
  body('subject')
    .optional({ values: 'null' })
    .trim()
    .isString().withMessage('subject must be a string')
    .isLength({ max: 60 }).withMessage('subject must be at most 60 characters'),
  body('is_public')
    .optional()
    .isBoolean().withMessage('is_public must be a boolean'),
];

module.exports = { idParam, createRules, updateRules };