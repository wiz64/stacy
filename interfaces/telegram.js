const { Telegraf } = require('telegraf')
require('dotenv').config()
if(!process.env.TELEGRAM_BOT_TOKEN) {
  console.log("[ERROR] TELEGRAM_BOT_TOKEN not set \n Please configure your bot token in .env")
  process.exit()
}

function ProcessMessage(ctx) {
  console.log(`[TG] ${ctx.update.message.from.first_name} (${ctx.update.message.from.username}) sent: ${ctx.update.message.text}`)
  ctx.reply('Hello '+ctx.update.message.from.first_name)

}
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.use(async (ctx, next) => {
  //console.time(`Processing update ${ctx.update.update_id}`)
  await ProcessMessage(ctx) // runs next middleware
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