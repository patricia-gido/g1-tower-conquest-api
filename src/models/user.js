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
      module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    user_id: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    school_id: DataTypes.STRING,   
    full_name: DataTypes.STRING,   
    email: DataTypes.STRING        
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return User;
};
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