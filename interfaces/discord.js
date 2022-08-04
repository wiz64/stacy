const processor = require('../brain/processor.js')
require('dotenv').config()

var token = process.env.DISCORD_BOT_TOKEN
global.stc_prefix = process.env.COMMAND_PREFIX

function ProcessMessage(message) {
	if(message.author.bot) return;
	// user object contains information about the user who sent the message, like username, firstname, id and profile picture url
   //console.log(message)
  msgData = {
	platform: 'discord',
	user : {
	  id: message.author.id,
	  username: message.author.username,
	  first_name: message.author.username,
	},
	text: message.content,
	date: message.createdAt,
	id : message.id,
	ctxObj: message
  }
	//console.log(user)
	processor.process(msgData)
	console.log(`[DC] ${msgData.user.first_name} (${msgData.user.username}) sent: ${msgData.text}`)
  
  }

// Define Client and Intents
const { Client, Intents } = require('discord.js');

// All flags: https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS

// Discord latest version having some issues with Intents/FLAGS, so I'm using the older version for now
const client = new Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("chess| Love mom&dad", {
		type: "PLAYING",
		url: "https://stacy.wiz64.com"
	  })
});


// Receive messages sent in your server.
client.on('message', message => {
    console.log(message.content)
	if (message.content === '!ping') {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	}
	ProcessMessage(message);
});

client.login(token);