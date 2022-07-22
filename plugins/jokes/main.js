const quic = require('../../brain/quic.js');
var jokes = require('./jokes.js');
var info = {
    "id": "jokes",
    "type":"plugin",
    "name": "Jokes",
    "description": "Allows stacy to send jokes",
    "author": "wiz64",
    "version": "1.0",
    "platforms": ["telegram", "discord", "web"]
}
var init = function(init) {
    console.log("[JOKES] Plugin loaded")
    // do stuff
}

var OnMessageEvent = async function(data, spinal_cord) {
    console.log("[JOKES] Checking if user requested a joke");
    if((data.text == 'send joke') || (quic.containsWords(data.text,["stacy","joke"]))  ) {
        var joke = await jokes.getJoke();
        spinal_cord.reply(data,joke);
        return;
    }
    //do stuff
}
module.exports = {
    info: info,
    init: init,
    OnMessageEvent: OnMessageEvent
}