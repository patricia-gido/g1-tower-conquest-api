const { Sequelize, DataTypes } = require('sequelize');
const env = require('../config/env');
const dbConfig = require('../config/database')[env.nodeEnv];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Load your models here
const User = require('./user')(sequelize, DataTypes);

const db = { 
  sequelize, 
  Sequelize, 
  User 
};

module.exports = db;