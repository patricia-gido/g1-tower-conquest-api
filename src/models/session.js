module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
    set_id: { type: DataTypes.INTEGER, allowNull: false },
    host_id: { type: DataTypes.INTEGER, allowNull: false },
    join_pin: { type: DataTypes.STRING(6), allowNull: false, unique: true },
    status: { type: DataTypes.ENUM('LOBBY', 'RUNNING', 'CLOSED'), allowNull: false, defaultValue: 'LOBBY' },
    max_players: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 20 },
    current_position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    started_at: { type: DataTypes.DATE, allowNull: true },
    ended_at: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'game_sessions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  Session.associate = (models) => {
    Session.belongsTo(models.User, { foreignKey: 'host_id', as: 'host' });
    Session.belongsTo(models.QuestionSet, { foreignKey: 'set_id', as: 'questionSet' });
    Session.hasMany(models.Player, { foreignKey: 'session_id', as: 'players' });
  };
  return Session;
};