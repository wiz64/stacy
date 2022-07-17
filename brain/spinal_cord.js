function reply(data, msg) {
    if(data.platform == 'telegram') {
        ctx = data.ctxObj;
        ctx.reply(msg)
    }
    // if msg platform is discord, send reply to discord channel
    if(data.platform == 'discord') {
        // send message to discord channel
        // discord.sendMessage(msg)
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
        // discord.sendMessage(msg)
    }
    return;
}
module.exports = {
    reply: reply,
    replyWithPhoto: replyWithPhoto
}