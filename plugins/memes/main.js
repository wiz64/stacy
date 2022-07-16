MEME_API = "https://meme-api.herokuapp.com/gimme"
//const axios = require('axios');
var info = {
    "id": "memes",
    "type":"plugin",
    "name": "Memes",
    "description": "Allows stacy to send memes",
    "author": "wiz64",
    "version": "1.0",
    "platforms": ["telegram", "discord", "web"]
}
var init = function(init) {
    console.log("[MEMES] Plugin loaded")
    // do stuff
}

var OnMessageEvent = function(data, spinal_cord) {
    console.log("[MEMES] Checking if user requested a meme")
    if(data.text == 'send meme') {
        spinal_cord.reply(data,"Here's a meme for you");
        return;
    }
    // do stuff
}

module.exports = {
    info: info,
    init: init,
    OnMessageEvent: OnMessageEvent
}