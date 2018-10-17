const Discord = require('discord.js');
const axios = require("axios");
const client = new Discord.Client();
const auth = require('./auth');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.substring(0, 1) === '!') {
        // replace all "!"
        let subreddit = msg.content.replace(/!/g, " ").trim().toLocaleLowerCase().split(' ')[0];
        let url = ""
        if(msg.content.includes("--")){
            url = `https://www.reddit.com/r/${subreddit}/top/.json?t=${msg.content.split("--")[1]}`;
        }else{
            url = `https://www.reddit.com/r/${subreddit}/.json`;
        }
        axios
            .get(url)
            .then(response => {
                let res = response.data.data;
                if (res.children.length === 0) {
                    msg.channel.send("Not a subreddit");
                } else {
                    let dataset = response.data.data.children;
                    let randomIndex = Math.floor(Math.random() * dataset.length) + 1;
                    let post = dataset[randomIndex].data;
                    let image = post.url;
                    let subredditID = post.subreddit_id;

                    if (subredditID === undefined) {
                        msg.channel.send("Not a subreddit");
                    } else {
                        msg.channel.send(image);
                    }
                }
            })
            .catch(error => {
                msg.channel.send(`Error:  ${error}`);
            });
    }
});


client.login(auth.token);