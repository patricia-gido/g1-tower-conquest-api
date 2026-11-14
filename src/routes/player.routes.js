const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/player.controllers');
const { demoAuth } = require('../middlewares/demo-auth');

router.post('/', demoAuth, controller.join);
router.get('/', demoAuth, controller.list);

module.exports = router;