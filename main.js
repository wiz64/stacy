/*
Stacy - Main Loader
By wiz64
This is the main loader for the program. It loads interfaces like telegram, web, discord, etc. and acts as the entry point for the program.
*/
console.log('-----------------------------------------------------');
console.log(` [INIT] Stacy is starting...`)


var stacy_info = require('./brain/init.js')
var quic = require('./brain/quic.js')
var interfaces = require('./interfaces/interfaces.js')
require('dotenv').config();

// Greet the user
var greet = ` [GREET] Hello, I'm ${stacy_info.name} ! I am ${stacy_info.birth.age}old. You can also call me ${quic.randomFromList(stacy_info.aliases)}.`
console.log(greet)

console.log("Version : " + stacy_info.version)
console.log('-----------------------------------------------------');
console.log(' [INIT] Loading interfaces...')
// if telegram bot interface is enabled, start it
if(process.env.USE_TELEGRAM == 1) {
console.log(" [INFO] Starting Telegram Interface ...")
interfaces.start('node','interfaces/telegram.js')
} else { console.log(" [INFO] Telegram Interface is Disabled") }

// if Stacy Web Interface is enabled, start it
if(process.env.USE_WEB == 1) {
console.log(" [INFO] Starting Web Service ...")
interfaces.start('node','interfaces/web.js')
} else { console.log(" [INFO] Web Service is Disabled") }

// if discord bot interface is enabled, start it
if(process.env.USE_DISCORD == 1) {
console.log(" [INFO] Starting Discord Interface ...")
interfaces.start('node','interfaces/discord.js')
} else { console.log(" [INFO] Discord Interface is Disabled") }

var cleanExit = function() {
    interfaces.killAll();
    process.exit();
};

process.on('exit', cleanExit);
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill