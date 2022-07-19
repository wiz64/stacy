const processor = require('../brain/processor.js')
require('dotenv').config()

var token = process.env.DISCORD_BOT_TOKEN
// Define Client and Intents
const { Client, Intents } = require('discord.js');

// All flags: https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS

// Discord latest version having some issues with Intents/FLAGS, so I'm using the older version for now
const client = new Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Receive messages sent in your server.
client.on('message', message => {
    console.log(message.content)
	if (message.content === '!ping') {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	}
});

client.login(token);