const Discord = require('discord.js');
const axios = require("axios");
const client = new Discord.Client();
const auth = require('./auth');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.substring(0,1) === '!') {
        // replace all "!"
        let message = msg.content.trim().toLocaleLowerCase();
        console.log("Full Message: " + message);
        let subreddit = msg.content.replace(/!/g, " ").trim().toLocaleLowerCase().split(' ')[0];
        console.log("Subreddit: " + subreddit);
        let url = `https://www.reddit.com/r/${subreddit}/.json`;
        axios
            .get(url)
            .then(response =>{
                if(response.data.data.children === undefined || response.data.data.children.length === 0 || response.data.data.children[0].data.subreddit_id === undefined){
                    msg.channel.send("Not a subreddit you idiot");
                }else {
                    let dataset = response.data.data.children;
                    let randomIndex = Math.floor(Math.random() * dataset.length) + 1;
                    let post = dataset[randomIndex].data;
                    let image = post.url;
                    let subreddit = post.subreddit_name_prefixed;
                    let subredditID = post.subreddit_id;

                    if(subredditID === undefined){
                        msg.channel.send("Not a subreddit you idiot");
                    }else{
                        msg.channel.send(image);
                    }

                }
            })
            .catch(error => {
                msg.channel.send("You broke it.");
                console.log('There was an error.');
            });


    }
});
client.login(auth.token);