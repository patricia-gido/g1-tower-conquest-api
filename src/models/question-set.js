module.exports = (sequelize, DataTypes) => {
  const QuestionSet = sequelize.define('QuestionSet', {
    set_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    tableName: 'question_sets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  QuestionSet.associate = (models) => {
    QuestionSet.belongsTo(models.User, { foreignKey: 'host_id', as: 'host' });
  };

  return QuestionSet;
};