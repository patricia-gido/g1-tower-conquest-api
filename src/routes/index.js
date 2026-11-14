const express = require('express');
const router = express.Router();

router.use('/health', require('./health.routes'));
router.use('/game-info', require('./game-info.routes'));
router.use('/results', require('./results.routes'));
router.use('/question-sets', require('./question-set.routes'));
router.use('/sessions', require('./session.routes'));

module.exports = router;