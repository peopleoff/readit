module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "chats",
    {
      chat_id: {
        type: DataTypes.STRING(250),
        allowNull: false,
        primaryKey: true
      },
      chat_name: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      channel_id: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      channel_name: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      channel_owner_id:{
        type: DataTypes.STRING(250),
        allowNull: true
      },
      allow_nsfw: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
      }
    },
    {
      tableName: "chats",
      paranoid: true
    }
  );
};
