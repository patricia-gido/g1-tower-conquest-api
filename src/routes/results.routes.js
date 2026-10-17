'use strict';
const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/results.controller');

const handler = resultsController.list || resultsController.getResults || resultsController;

router.get('/', handler);

module.exports = router;