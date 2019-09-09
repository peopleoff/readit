const { chats } = require("../models");

module.exports = {
  allowNSFW(chat) {
    let saveObject = {
      chat_id: chat.channel.id,
      chat_name: chat.channel.name,
      channel_id: chat.guild.id,
      channel_name: chat.guild.name,
      channel_owner_id: chat.guild.ownerID,
      allow_nsfw: 1
    }
    return new Promise((resolve, reject) => {
      chats
        .findOrCreate({
          defaults: saveObject,
          where: {
            chat_id: chat.channel.id
          }
        })
        .spread((chat, created) => {
          let options = chat.get({
            plain: true
          });
          resolve(options.allow_nsfw);
        });
    });
  },
  enableNSFW(id) {
    return new Promise((resolve, reject) => {
      chats
        .update(
          {
            allow_nsfw: true
          },
          {
            where: {
              chat_id: id
            }
          }
        )
        .then(result => {
          if (result.length > 0) {
            resolve(true);
          } else {
            reject(false);
          }
        });
    });
  },
  disableNSFW(id) {
    return new Promise((resolve, reject) => {
      chats
        .update(
          {
            allow_nsfw: false
          },
          {
            where: {
              chat_id: id
            }
          }
        )
        .then(result => {
          if (result.length > 0) {
            resolve(true);
          } else {
            reject(false);
          }
        });
    });
  }
};
