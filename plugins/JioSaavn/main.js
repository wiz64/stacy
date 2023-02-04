var BASE_API = "https://saavn.me/search/songs?page=1&limit=1&query=";
const axios = require('axios');
var info = {
    "id": "JioSaavn", // Here is the unique id of the plugin
    "type":"plugin", // Module type - plugin
    "name": "JioSaavn", // Full plugin name
    "description": "JioSaavn API plugin to fetch songs", // plugin description
    "author": "shailendramaurya", // Plugin author/developer
    "version": "1.0", // Plugin Version
    "platforms": ["telegram", "discord", "web"] // platforms the plugin shall be used in (else won't be called)
}

var init = function(init) {
    console.log("[JioSaavn] Plugin loaded")
    // init function - is run when the plugin is just loaded (when starting the bot)
}

async function getSong(query){

return await axios.get(BASE_API+query).then(function(response){
    if(response.status == 200){
      var result = response.data.data.results[0].downloadUrl[2].link;
      var img = response.data.data.results[0].image[2].link;
      var title = response.data.data.results[0].name;
      var artist = response.data.data.results[0].primaryArtists;
      var duration = response.data.data.results[0].duration;

return [result, img, title, artist, duration];


    }
    else { return response.data.data.results[0].downloadUrl[2].link; }
  });

  
}


// OnMessageEvent is run when bot gets a message
var OnMessageEvent = async function(data, spinal_cord) {
    // data object contains data of msg sending user and the message and session/context object

    //console.log("[Example] Checking if message is example command");
    if( (quic.containsWords(data.text,["song","Song"]))){
        console.log("JioSaavn plugin action called")
        
        // textToSend = example.getText("You ran the example commmand")
        // \---> using external modules

        // here jokes is a local js module 
        
        // use the spinal_cord module to send interactions, to work universally with all platforms/interfaces
      
      var query = data.text.slice(5);
      if(query.length !== 0){
    qresult = await getSong(query);
      duration = qresult[4];
      }else{spinal_cord.reply(data,"Write your favourite song name after the word Song"); return}

     if(duration !== null || duration !== "undefined"){
      console.log(qresult);
        await spinal_cord.replyWithPhoto(data, qresult[1], qresult[2]);
        spinal_cord.replyWithAudio(data, qresult[0], qresult[1], qresult[2], qresult[3], qresult[4]);}
      else{spinal_cord.reply(data,"Can't find the song requested, I'm still learing :-)")}
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
