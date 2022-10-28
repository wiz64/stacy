const quic = require('../../brain/quic.js');
var info = {
    "id": "greet",
    "type":"plugin",
    "name": "Greet",
    "description": "Allows stacy to send greets",
    "author": "wiz64",
    "version": "1.0",
    "platforms": ["telegram", "discord", "web"]
}
var init = function(init) {
    console.log("[Greet] Plugin loaded")
    // do stuff
}

var OnMessageEvent = async function(data, spinal_cord) {
    console.log("[Greet] OnMessageEvent");
    if((data.text.toLowerCase() == 'happy birthday') || (quic.containsWords(data.text,["stacy/amicia","happy","birthday/bday/b'day"]))  ) {
        // send a random thank you message and a smile to the user
        var bday_greetlist = ["Thank You so much ! I'm glad you remembered the date :D",
        "Thanks for the birthday wishes ! I'm so glad :D","Whoa ! Thanks for the birthday wishes ! I'm so happy :D",
        "Thanks ! I love all of the texts I received wishing me happy birthday. I'm so happy :D"]
        var greet = quic.randomFromList(bday_greetlist);
        spinal_cord.reply(data, greet);
        // https://ibb.co/JvRzjdK thank you image - reply with photo
        spinal_cord.replyWithPhoto(data, "https://i.ibb.co/c6cNhv1/pexels-george-dolgikh-2072165-2.jpg", "Thank You !");
        return;
    }
    //do stuff
}
module.exports = {
    info: info,
    init: init,
    OnMessageEvent: OnMessageEvent
}