async function reply(data, msg) {
    ctx = data.ctxObj;
    if(data.platform == 'telegram') {
        await ctx.reply(msg)
    }
    // if msg platform is discord, send reply to discord channel
    if(data.platform == 'discord') {
        //console.log(data)
        // send message to discord channel
       await ctx.reply(msg)
    }
    if(data.platform == 'web') {
        // sif message starts with https
        await data.res_array.push(msg);
        //console.log("push: "+data.res_array);
    }

}
async function replyWithPhoto(data, src, caption) {
    if(data.platform == 'telegram') {
        ctx = data.ctxObj;
        if(caption) {
            //console.log(src)
            await ctx.replyWithPhoto({ url: src }, { caption: caption });
        } else {
        await ctx.replyWithPhoto({ url: src }); }
    }
    // if msg platform is discord, send reply to discord channel
    if(data.platform == 'discord') {
        // send message to discord channel
        await ctx.channel.send(src);
        if (caption) await ctx.channel.send(caption);
    }
    if(data.platform == 'web') {
        // sif message starts with https
        if(src.startsWith('https://')) {
            msg = `<img src='${src}' class='stc-image'> <br> ${caption} <br>`
        }
        await data.res_array.push(msg);
        //console.log("push: "+data.res_array);

    }
}
module.exports = {
    reply: reply,
    replyWithPhoto: replyWithPhoto
}