const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models');
const questionSetRoutes = require('./routes/question-set.routes');

const app = express();

// Para mabasa yung JSON sa Postman
app.use(express.json());

// Ito yung request logging, yung sinasabi sa Step 1
// Lalabas sa terminal yung: GET /api/v1/health 200 41ms
app.use(morgan('dev'));

// Health check - ito yung tinest mo kanina sa Postman
app.get('/api/v1/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.json({ status: 'ok', database: 'up' });
  } catch (err) {
    return res.status(503).json({ status: 'error', database: 'down' });
  }
});

// Ito yung Module 1 natin - Question Sets
app.use('/api/v1/question-sets', questionSetRoutes);

// Kung walang route na tumama, 404
app.use((req, res) => {
  return res.status(404).json({ message: 'Route not found' });
});

// Panghuli, error handler para hindi mag-crash
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

module.exports = app;