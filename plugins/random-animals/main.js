// info object plugin data
// you can also use your own external modules like
// var example = require('./example.js')

const quic = require("../../brain/quic");

var info = {
    "id": "random-animals", // Here is the unique id of the plugin
    "type":"plugin", // Module type - plugin
    "name": "Random Animal Pictures", // Full plugin name
    "description": "Plugin to fetch random animal pictures", // plugin description
    "author": "wiz64", // Plugin author/developer
    "version": "1.0", // Plugin Version
    "platforms": ["telegram", "discord", "web"] // platforms the plugin shall be used in (else won't be called)
}

var init = function(init) {
    console.log("[RANDOM-ANIMALS] Plugin loaded")
    // init function - is run when the plugin is just loaded (when starting the bot)
}

// OnMessageEvent is run when bot gets a message
var OnMessageEvent = async function(data, spinal_cord) {
    // data object contains data of msg sending user and the message and session/context object

    //console.log("[Example] Checking if message is example command");
    if( (quic.containsWords(data.text,["random","stacy/amicia","animal"])) || quic.command(data.text,"random animal")
     || data.text.startsWith("send random animal") || data.text.startsWith("send animal") ) {
        var animal = await getAnimal();
        if(animal) {
            spinal_cord.replyWithPhoto(data,animal[0]+"?hash="+quic.CurrentTime_(),"Here's one "+animal[1]);
        } else { spinal_cord.replyWithPhoto(data,"Sorry, I couldn't find any animal pictures"); }
        
    }
    
    // if ( text contains this or that ) { process it and send reply }
}

// export all functions so that processor can use them
module.exports = {
    info: info,
    init: init,
    OnMessageEvent: OnMessageEvent
}

// Extra functions here to simplify the code
async function getAnimal() {
    var animals = ["dog","cat","bear","shiba"]
    var animal = quic.randomFromList(animals);
    var api = "https://place.dog/300/300";
    var width = quic.randomFromList([300,250,400,350]); var height = 300;
    var count = 1;
    switch(animal) {
        case "dog": 
            api = `https://place.dog/${width}/${height}`
            break;
        case "cat":
            api = `https://placekitten.com/${width}/${height}`
            break;
        case "bear":
            api = `https://placebear.com/${width}/${height}`
            break;
        case "shiba":
            api = `https://shibe.online/api/shibes?count=${count}&urls=true&httpsUrls=true`
            break;
    }
    // make get request to api
    if (animal == "shiba") {
        var response = await axios.get(api)
        .then(function(response){
            if(response.status == 200){
                return [response.data[0],animal];
            }
            else {
                return null
            }
        })
        return response;
    } else { return [api,animal];}
    
    
    
}
