const express = require("express");
const router = express.Router();
const controller = require("../controllers/session.controller");

// Create
router.post("/", controller.create);

// Join - pareho gagana, kahit saan mo ilagay yung code
router.post("/join", controller.join);
router.post("/:code/join", controller.join);

// Get - kahit anong code
router.get("/:code", controller.get);

// Start - ITO YUNG FIX MO, pareho gagana
router.post("/start", controller.start);
router.post("/:code/start", controller.start);

module.exports = router;