const { body, param } = require('express-validator');

const idParam = [
  param('id').isInt().withMessage('id must be an integer')
];

const title = () => body('title')
  .exists().withMessage('title is required')
  .bail().isString().withMessage('title must be text')
  .trim().bail().isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters long');

const subject = () => body('subject')
  .optional().isString().withMessage('subject must be text')
  .trim().isLength({ max: 60 }).withMessage('subject must be at most 60 characters');

const isPublic = () => body('is_public')
  .optional().isBoolean().withMessage('is_public must be true or false');

const createRules = [title(), subject(), isPublic()];
const updateRules = [
  param('id').isInt().withMessage('id must be an integer'),
  body('title').optional().isString().withMessage('title must be text').trim().isLength({ min: 3, max: 150 }).withMessage('title must be 3 to 150 characters'),
  subject(), isPublic(),
  body().custom((value, { req }) => {
    if (Object.keys(req.body).length === 0) throw new Error('At least one field must be provided');
    return true;
  })
];

module.exports = { idParam, createRules, updateRules };