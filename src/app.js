const express = require("express");
const errorHandler = require("./middlewares/error-handler");
// ... yung mga routes mo na nandyan na, wag mo burahin ...
const sessionRoutes = require("./routes/session.routes");

const app = express();
app.use(express.json());

app.use("/api/v1/sessions", sessionRoutes);

// DAPAT NASA PINAKABABA TO, PAGKATAPOS NG LAHAT NG ROUTES
app.use(errorHandler);

module.exports = app;