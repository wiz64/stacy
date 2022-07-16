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

module.exports.reply = reply;