const { Router } = require('express');
const router = Router();
const requireUser = require('../middlewares/require-user');

let questionSets = [];

function validateBody(body) {
  const errors = [];
  if (!body.title || typeof body.title !== 'string' || body.title.trim().length < 3) {
    errors.push({ field: 'title', message: 'Title is required and must be at least 3 characters' });
  }
  if (body.title && body.title.length > 100) {
    errors.push({ field: 'title', message: 'Title must be at most 100 characters' });
  }
  if (!body.subject || typeof body.subject !== 'string' || body.subject.trim().length === 0) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  }
  if (body.is_public !== undefined && typeof body.is_public !== 'boolean') {
    errors.push({ field: 'is_public', message: 'is_public must be boolean' });
  }
  return errors;
}

// GET / - host lang pwede mag-list (Case 5: player = 403)
router.get('/', requireUser('host'), (req, res) => {
  res.json(questionSets);
});

// POST / - host lang pwede
router.post('/', requireUser('host'), (req, res) => {
  const errors = validateBody(req.body || {});
  if (errors.length > 0) {
    return res.status(400).json({ code: 'VALIDATION_FAILED', message: 'Validation failed', errors });
  }
  const newSet = {
    id: Date.now().toString(),
    title: req.body.title,
    description: req.body.description || '',
    subject: req.body.subject,
    is_public: req.body.is_public ?? false,
    created_by: req.user.user_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  questionSets.push(newSet);
  res.status(201).json(newSet);
});

// GET /:id
router.get('/:id', requireUser(), (req, res) => {
  // Case 9: /abc dapat 400, hindi 404
  // Kasi yung ID natin puro numbers lang (Date.now)
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).json({ code: 'VALIDATION_FAILED', message: 'Validation failed', errors: [{ field: 'id', message: 'ID must be a number' }] });
  }
  const qs = questionSets.find(q => q.id === req.params.id);
  if (!qs) return res.status(404).json({ code: 'NOT_FOUND', message: 'Question set not found' });
  res.json(qs);
});

// PATCH /:id - host lang, OWNER LANG pwede mag-edit
router.patch('/:id', requireUser('host'), (req, res) => {
  const idx = questionSets.findIndex(q => q.id === req.params.id);
  if (idx === -1) return res.status(404).json({ code: 'NOT_FOUND', message: 'Question set not found' });
  if (questionSets[idx].created_by !== req.user.user_id) {
    return res.status(403).json({ code: 'FORBIDDEN', message: 'This account may not do this.' });
  }
  // Case 12: walang body {} dapat 400
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ code: 'VALIDATION_FAILED', message: 'Validation failed', errors: [{ field: 'body', message: 'Body must not be empty' }] });
  }
  const errors = validateBody({ ...questionSets[idx], ...req.body });
  if (errors.length > 0) {
    return res.status(400).json({ code: 'VALIDATION_FAILED', message: 'Validation failed', errors });
  }
  questionSets[idx] = { ...questionSets[idx], ...req.body, updated_at: new Date().toISOString() };
  res.json(questionSets[idx]);
});

// PUT - OWNER LANG din
router.put('/:id', requireUser('host'), (req, res) => {
  const idx = questionSets.findIndex(q => q.id === req.params.id);
  if (idx === -1) return res.status(404).json({ code: 'NOT_FOUND', message: 'Question set not found' });
  if (questionSets[idx].created_by !== req.user.user_id) {
    return res.status(403).json({ code: 'FORBIDDEN', message: 'This account may not do this.' });
  }
  questionSets[idx] = { ...questionSets[idx], ...req.body, updated_at: new Date().toISOString() };
  res.json(questionSets[idx]);
});

// DELETE /:id - OWNER LANG din
router.delete('/:id', requireUser('host'), (req, res) => {
  const idx = questionSets.findIndex(q => q.id === req.params.id);
  if (idx === -1) return res.status(404).json({ code: 'NOT_FOUND', message: 'Question set not found' });
  if (questionSets[idx].created_by !== req.user.user_id) {
    return res.status(403).json({ code: 'FORBIDDEN', message: 'This account may not do this.' });
  }
  questionSets = questionSets.filter(q => q.id !== req.params.id);
  res.status(204).send();
});

module.exports = router;