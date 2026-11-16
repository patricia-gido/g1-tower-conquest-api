const express = require("express");
const errorHandler = require("./middlewares/error-handler");

// Ito yung central router mo, nandoon na lahat: health, game-info, results, question-sets, sessions
const routes = require("./routes");

const app = express();
app.use(express.json());

// Dito na nakakabit lahat ng routes mo sa /api/v1
app.use("/api/v1", routes);

// DAPAT NASA PINAKABABA TO, PAGKATAPOS NG LAHAT NG ROUTES
app.use(errorHandler);

module.exports = app;