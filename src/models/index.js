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
const QuestionSet = require('./question-set')(sequelize, DataTypes);
const Session = require('./session')(sequelize, DataTypes);
const Player = require('./player')(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  QuestionSet,
  Session,
  Player,
};

// Run associations if defined
if (QuestionSet.associate) {
  QuestionSet.associate(db);
}
if (User.associate) {
  User.associate(db);
}
if (Session.associate) {
  Session.associate(db);
}
if (Player.associate) {
  Player.associate(db);
}

module.exports = db;