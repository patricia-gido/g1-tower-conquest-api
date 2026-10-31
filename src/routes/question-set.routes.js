const { Router } = require('express');
const router = Router();
const requireUser = require('../middlewares/require-user');

// Simple in-memory muna para hindi mag-crash
let questionSets = [];

router.get('/', requireUser, (req, res) => {
  res.json(questionSets);
});

router.post('/', requireUser, (req, res) => {
  const newSet = {
    id: Date.now().toString(),
    title: req.body.title,
    subject: req.body.subject,
    is_public: req.body.is_public,
    created_by: req.user.user_id,
    created_at: new Date()
  };
  questionSets.push(newSet);
  res.status(201).json(newSet);
});

router.get('/:id', requireUser, (req, res) => {
  const qs = questionSets.find(q => q.id === req.params.id);
  if (!qs) return res.status(404).json({ message: 'Not found' });
  res.json(qs);
});

router.put('/:id', requireUser, (req, res) => {
  const idx = questionSets.findIndex(q => q.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  questionSets[idx] = { ...questionSets[idx], ...req.body };
  res.json(questionSets[idx]);
});

router.delete('/:id', requireUser, (req, res) => {
  questionSets = questionSets.filter(q => q.id !== req.params.id);
  res.status(204).send();
});

module.exports = router;