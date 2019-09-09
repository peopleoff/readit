require("dotenv").config();
const { sequelize } = require("./models");
const Discord = require("discord.js");
const axios = require("axios");
const client = new Discord.Client();

const Chats = require("./controllers/ChatController");
const History = require("./controllers/HistoryController");

sequelize.sync({ force: false }).then(() => {
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
});

client.on("message", msg => {
  //Only listen for commands that start with !
  if (msg.content.substring(0, 1) !== "!") {
    return;
  }

  let user = msg.author;
  let channelOwnerID = msg.guild.ownerID;
  let channelID = msg.channel.id;

  function sendMessage(message) {
    let saveObject = {
      chat_id: msg.channel.id,
      user_id: user.id,
      user_name: user.username,
      user_tag: user.tag,
      command: msg.content,
      result: message
    };
    History.addHistory(saveObject);
    msg.channel.send(message);
    return;
  };

  //Run specific command to disable NSFW for text channel
  if (
    msg.content.toLocaleLowerCase() === "!disablensfw" &&
    user.id === channelOwnerID
  ) {
    Chats.disableNSFW(channelID).then(result => {
      if (result) {
        return sendMessage("NSFW Disabled");
      } else {
        return sendMessage(
          "Error updating NSFW, please register your channel with a !gaming command first."
        );
      }
    });
  };

  //Run Specific command to enable NSFW for text channel
  if (
    msg.content.toLocaleLowerCase() === "!enablensfw" &&
    user.id === channelOwnerID
  ) {
    Chats.enableNSFW(channelID).then(result => {
      if (result) {
        sendMessage("NSFW Enabled");
      } else {
        sendMessage(
          "Error updating NSFW, please register your channel with a !gaming command first."
        );
      }
    });
  };

  // replace all "!", Trim whitespace, lowercase text, split on any spaces.
  let subreddit = msg.content
    .replace(/!/g, " ")
    .trim()
    .toLocaleLowerCase()
    .split(" ")[0];

  let url = "";

  if (msg.content.includes("--")) {
    url = `https://www.reddit.com/r/${subreddit}/top/.json?t=${
      msg.content.split("--")[1]
    }`;
  } else {
    url = `https://www.reddit.com/r/${subreddit}/.json`;
  };

  axios
    .get(url)
    .then(response => {
      if (response.data.data.children.length === 0) {
        sendMessage("Not a subreddit");
      } else {
        let dataset = response.data.data.children;
        let randomIndex = Math.floor(Math.random() * dataset.length);
        let post = dataset[randomIndex].data;
        let image = post.url;
        let title = post.title;
        let subredditID = post.subreddit_id;
        let messageBody = `${title}\n${image}`;

        if (subredditID === undefined) {
          sendMessage("Not a subreddit");
        } else {
          Chats.allowNSFW(msg).then(result => {
            if (!result && post.over_18) {
              sendMessage("NSFW content is not allowed in this channel");
            } else {
              sendMessage(messageBody);
            }
          });
        }
      }
    })
    .catch(error => {
      sendMessage(`Error:  ${error}`);
    });
});

client.login(process.env.READIT_DISCORD_TOKEN);
