// info object plugin data
// you can also use your own external modules like
// var example = require('./example.js')

var info = {
    "id": "example", // Here is the unique id of the plugin
    "type":"plugin", // Module type - plugin
    "name": "Example Plugin", // Full plugin name
    "description": "Just an example plugin to demonstrate plugin engine working", // plugin description
    "author": "wiz64", // Plugin author/developer
    "version": "1.0", // Plugin Version
    "platforms": ["telegram", "discord", "web"] // platforms the plugin shall be used in (else won't be called)
}

var init = function(init) {
    //console.log("[Example] Plugin loaded")
    // init function - is run when the plugin is just loaded (when starting the bot)
}

// OnMessageEvent is run when bot gets a message
var OnMessageEvent = async function(data, spinal_cord) {
    // data object contains data of msg sending user and the message and session/context object

    //console.log("[Example] Checking if message is example command");
    if( (quic.containsWords(data.text,["example","plugin","stacy"])) || quic.command(data.text,"example")  ) {
        console.log("example plugin action called")
        
        // textToSend = example.getText("You ran the example commmand")
        // \---> using external modules

        // here jokes is a local js module 
        
        // use the spinal_cord module to send interactions, to work universally with all platforms/interfaces
        //spinal_cord.reply( data, textToSend );
    
        return;
        
    }
    
    // if ( text contains this or that ) { process it and send reply }
}

// export all functions so that processor can use them
module.exports = {
    info: info,
    init: init,
    OnMessageEvent: OnMessageEvent
}