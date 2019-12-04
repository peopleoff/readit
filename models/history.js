module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "history",
    {
      successful_post: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
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
      options: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      subreddit: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      permalink: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      domain: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      thumbnail: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      over_18: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      post: {
        type: DataTypes.TEXT,
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
