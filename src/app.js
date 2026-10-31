const express = require('express');
const app = express();
app.use(express.json());

const indexRouter = require('./routes/index');
app.use(indexRouter);
app.use('/api', indexRouter);
app.use('/api/v1', indexRouter);

app.use((req, res) => {
  return res.status(404).json({ error: 'Not Found' });
});

module.exports = app;