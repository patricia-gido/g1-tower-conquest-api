const { Router } = require('express');
const router = Router();

router.use('/question-sets', require('./question-set.routes'));
router.use('/results', require('./results.routes'));

module.exports = router;