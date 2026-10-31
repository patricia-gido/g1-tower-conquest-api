const express = require('express');
const app = express();
app.use(express.json());
const routes = require('./routes/index');
app.use(routes);
app.use('/api', routes);
app.use((req,res)=>res.status(404).json({ error: 'Not found' }));
module.exports = app;