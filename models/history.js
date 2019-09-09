module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "history",
    {
      chat_id: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      user_id: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      user_name: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      user_tag: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      command: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      result: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "history",
      paranoid: true
    }
  );
};
