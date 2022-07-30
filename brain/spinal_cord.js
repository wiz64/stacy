function reply(data, msg) {
    ctx = data.ctxObj;
    if(data.platform == 'telegram') {
        ctx.reply(msg)
    }
    // if msg platform is discord, send reply to discord channel
    if(data.platform == 'discord') {
        //console.log(data)
        // send message to discord channel
        ctx.reply(msg)
    }
    if(data.platform == 'web') {
        // sif message starts with https
        data.res_array.push(msg);
        //console.log("push: "+data.res_array);
    }

}
function replyWithPhoto(data, src, caption) {
    if(data.platform == 'telegram') {
        ctx = data.ctxObj;
        if(caption) {
            //console.log(src)
            ctx.replyWithPhoto({ url: src }, { caption: caption });
        } else {
        ctx.replyWithPhoto({ url: src }); }
    }
    // if msg platform is discord, send reply to discord channel
    if(data.platform == 'discord') {
        // send message to discord channel
        ctx.channel.send(src);
        ctx.channel.send(caption);
    }
    if(data.platform == 'web') {
        // sif message starts with https
        if(src.startsWith('https://')) {
            msg = `<img src='${src}'> <br> ${caption} <br>`
        }
        data.res_array.push(msg);
        //console.log("push: "+data.res_array);

    }
}
module.exports = {
    reply: reply,
    replyWithPhoto: replyWithPhoto
}