const Discord = require('discord.js');
const axios = require("axios");
const client = new Discord.Client();
const auth = require('./auth');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.substring(0,1) === '!') {
        let subreddit = msg.content.substring(1).trim().toLocaleLowerCase();
        let url = `https://www.reddit.com/r/${subreddit}/.json?limit=50`;
        axios
            .get(url)
            .then(response =>{
                let dataset = response.data.data.children;
                let length = response.data.data.children.length;
                let item = Math.floor(Math.random() * length) + 1;
                msg.channel.send(dataset[item].data.url);
            })
            .catch(error => {
                console.log(error)
            });


    }
});


client.login(auth.token);