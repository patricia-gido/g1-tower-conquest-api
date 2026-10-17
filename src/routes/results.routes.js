const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/results.controller');
const hubKey = require('../middlewares/hub-key');
const handler = resultsController.list || resultsController.getResults || resultsController;
router.get('/', hubKey, handler);
module.exports = router;