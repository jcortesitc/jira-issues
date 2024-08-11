import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const dotenv = require('dotenv');

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new Telegraf(token)

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there!'))

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


