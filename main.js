/*
Stacy - Main Loader
By wiz64
This is the main loader for the program. It loads interfaces like telegram, web, discord, etc. and acts as the entry point for the program.
*/
console.log(` [INIT] Stacy is starting...`)


var stacy_info = require('./brain/init.js')
var quic = require('./brain/quic.js')
var interfaces = require('./interfaces/interfaces.js')

// Greet the user
var greet = ` [GREET] Hello, I'm ${stacy_info.name} ! I am ${stacy_info.birth.age}old. You can also call me ${quic.randomFromList(stacy_info.aliases)}.`
console.log(greet)

console.log(" [INFO] Starting Telegram Interface ...")
// RUN TELEGRAM SCRIPT
interfaces.start('node','interfaces/telegram.js')

// express hello world listen on port 3000
console.log(" [INFO] Starting Web Service ...")
interfaces.start('node','interfaces/web.js')

var cleanExit = function() {
    interfaces.killAll();
    process.exit();
};
//process.on('exit', cleanExit);
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill