'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    user_id: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    school_id: DataTypes.STRING,
    full_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return User;
};