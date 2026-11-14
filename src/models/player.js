module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    player_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    session_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    nickname: { type: DataTypes.STRING(24), allowNull: false },
    score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    last_seen_at: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'leaderboard',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Player;
};