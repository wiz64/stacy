BASE_MEME_API = "https://meme-api.com/gimme"
const axios = require('axios');


var info = {
    "id": "memes",
    "type":"plugin",
    "name": "Memes",
    "description": "Allows stacy to send memes",
    "author": "wiz64",
    "version": "1.0",
    "platforms": ["telegram", "discord", "web"]
}
async function init(init) {
    console.log("[MEMES] Plugin loaded")
    // do stuff
}
async function getMeme(count, subreddit){
    // sanitise the inputs
    if (!count) {count = 1} else count = parseInt(count);
    var MEME_API =  BASE_MEME_API;
    if (subreddit) { MEME_API = MEME_API + "/" + subreddit; }
    MEME_API = MEME_API + "/" + count;
    
    //console.log(MEME_API);
   // use axios to make a get request to the MEME_API, validate response code and return the response
    return await axios.get(MEME_API)
    .then(function(response){
        if(response.status == 200){
            var resArr = []
            response.data.memes.forEach(function(meme){
                // Mumma told me not to look at creepy stuff
                if(!meme.nsfw) {
                    var preview_link = "";
                if(!meme.preview[2]) {
                     if(!meme.preview[1]) {preview_link = meme.preview[0]} else {preview_link = meme.preview[1]}
                } else preview_link = meme.preview[2];
                resArr.push({
                    link : preview_link,
                    title : meme.title
                });
                } else {resArr.push({link : "nsfw"})}
            })
            // Max 10 memes at once, prevent spamming
            resArr = resArr.slice(0, 9)
            return resArr;
        }
        else{
            return null
        }
    })
}


async function OnMessageEvent(data, spinal_cord) {
    console.log("[MEMES] Checking if user requested a meme")
    try {
        if(quic.containsWords(data.text,["stacy/amicia","meme/memes","linux"])) {
            var meme = await getMeme(1,"linuxmemes");
            console.log(meme)
            if(meme) {
                if(meme) {
                        if(!meme[0].title) {meme[0].title="Here's your linux meme"}
                       await spinal_cord.replyWithPhoto(data,meme[0].link,meme[0].title) }
                } else {await spinal_cord.reply(data,"Sorry, I couldn't find any linux memes");}

         } else
    if(data.text.startsWith('send meme')) {
        var q = data.text.split(' ');
        if (q[2]) {
            var y = q[2];
            if(data.modules.quic.isInt(y)) {y = null;x=q[2]}
        }
        if (q[3]) {
            var x = q[3];
        }
        else { q = null}
        var memes = await getMeme(x,y);
        //console.log(memes)
        if(memes) {
            // send all one by one
            console.log(memes)
            async function sendmeme(meme) {
                if(meme.link) {
                    
                    if(meme.link == "nsfw") {
                        // send a random meme instead
                        console.log("[thinking] "+ data.user.first_name + " is a creep");
                        meme = await getMeme(1);
                        //console.log(meme);
                        // Don't send nsfw stuff
                        await spinal_cord.reply(data, "Mumma told me not to look at creepy stuff");                                            
                        await spinal_cord.replyWithPhoto(data, meme[0].link, meme[0].title);
                          
                    } else {
                        if(!meme.title) {meme.title="Here's your meme"}
                       await spinal_cord.replyWithPhoto(data,meme.link,meme.title) }

                    
                
                } else {await spinal_cord.reply(data,"Sorry, I couldn't find any memes");}
            }
            for (var i = 0; i < memes.length; i++) {
                await sendmeme(memes[i]);
            }
                }
            } else if (quic.containsWords(data.text,["stacy/amicia","meme"])) {
                memes = await getMeme(1);
        //console.log(memes)
        if(memes) {
            meme = memes[0];
                if(meme.link) {
                        if(!meme.title) {meme.title="Here's your meme"}
                       await spinal_cord.replyWithPhoto(data,meme.link,meme.title) }

                    
                
                } else {await spinal_cord.reply(data,"Sorry, I couldn't find any memes");}
         } 
        return;
    } catch(err) {error = "[ERROR] [MEMES] failed to process memes request ";console.log(error);quic.log(error + "\n ERR: \n" + err);spinal_cord.reply(data,"Sorry, I couldn't find any memes, err");}
    }
    // do stuff



module.exports = {
    info: info,
    init: init,
    OnMessageEvent: OnMessageEvent }
