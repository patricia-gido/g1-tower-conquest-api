'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    school_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    nickname: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: true
  });
  return User;
};