# Readit.js

[![CircleCI](https://img.shields.io/circleci/project/github/ntkme/github-buttons/master.svg)](https://circleci.com/gh/ntkme/github-buttons)
[![Known Vulnerabilities](https://snyk.io//test/github/peopleoff/readit/badge.svg?targetFile=package.json)](https://snyk.io//test/github/peopleoff/readit?targetFile=package.json)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=XRWZAR4QJHP4C&currency_code=USD&source=url)

A Discord bot that will bring reddit into your channel! Let your users share random posts from their favorite subreddits directly into your channel! 

You can choose to host your own bot or invite mine to your server using the link below 

https://discordapp.com/oauth2/authorize?client_id=434377592888623104&scope=bot

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
1. Follow the instructions below to create a discord bot and generate an auth token
https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token

2. Create an .env file with the following values
    DB_NAME=
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_PORT=
    DISCORD_TOKEN=
```

### Installing

A step by step series of examples that tell you how to get a development env running


```
npm install
node readit.js
```

### Commands

readit.js listens for any post with starting with an exclamation point  {!}. By default it will search that subreddits hot posts and return a random URL back to the channel. You can pass it additional search criteria by following your subreddit with a -- command to search top posts.


```
Examples
!Gaming //Returns random image from the hot section of /r/Gaming
!Gaming --hour //Returns random image from top section of /r/Gaming within the last hour.
//Additional Parameters
--day
--month
--year
--all
```

## Built With

* [Discord.js](https://discord.js.org/#/) - The framework used to create the bot
* [Reddit API](https://www.reddit.com/dev/api/) - Reddit's api to pull images

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
