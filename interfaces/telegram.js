global.platform_name = "Telegram";
const { Telegraf } = require('telegraf')
const processor = require('../brain/processor.js')
require('dotenv').config()
global.stc_prefix = process.env.COMMAND_PREFIX

if(!process.env.TELEGRAM_BOT_TOKEN) {
  console.log("[ERROR] TELEGRAM_BOT_TOKEN not set \n Please configure your bot token in .env")
  process.exit()
}
botInfo = 0;
function ProcessMessage(ctx) {
  // user object contains information about the user who sent the message, like username, firstname, id and profile picture url
 //console.log(ctx);
 if(!botInfo) {
  botInfo = ctx.botInfo;
  console.log(`LOGGED IN AS  [${botInfo.first_name}] @${botInfo.username} (${botInfo.id})`)
}
msgData = {
  platform: 'telegram',
  user : {
    id: ctx.update.message.from.id,
    username: ctx.update.message.from.username,
    first_name: ctx.update.message.from.first_name
  },
  text: ctx.update.message.text,
  date: ctx.update.message.date,
  id : ctx.update.message.message_id,
  ctxObj: ctx
}
  //console.log(user)
  processor.process(msgData)
  console.log(`[TG] ${msgData.user.first_name} (${msgData.user.username}) sent: ${msgData.text}`)

}


const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
// when telegram bot is running, echo the logged in bot username
bot.on()
bot.start((ctx) => ctx.reply('Welcome'))
bot.use(async (ctx, next) => {
  //console.time(`Processing update ${ctx.update.update_id}`)
  ProcessMessage(ctx)
  // runs after next middleware finishes
  //console.timeEnd(`Processing update ${ctx.update.update_id}`)
})
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(MessageEvent, (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => myF(ctx))
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('hipster', Telegraf.reply('λ'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))