const express = require('express');
const app = express();

app.use(express.json());

const routes = require('./routes');
app.use('/', routes);
app.use('/api', routes);

app.use((req, res) => {
  return res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({ error: err.message || 'Internal error' });
});

module.exports = app;