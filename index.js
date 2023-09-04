const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');
const { command } = require('./const');
require('dotenv').config();
const text = require('./const');

//6526173530:AAHFHWQ6yzHrOftiR_fZf4UxzXzaGa5fHr0

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name
     ? ctx.message.from.first_name : 'незнакомец'}!`));
bot.help((ctx) => ctx.reply(text.command));

bot.command('course', (ctx)=> {
    ctx.replyWithHTML(`<b>Серия</b>`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('Серия 1', `btn_1`),
             Markup.button.callback('Серия 2', `btn_2`),
             Markup.button.callback('Серия 3', `btn_3`),
             Markup.button.callback('Серия 4', `btn_4`),]
        ]
    ))
})

bot.action('btn_1', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.replyWithHTML('Серия 1', {
            disable_web_page_preview : true,
        })
    } catch (e) {
        console.error(e)
    }
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 