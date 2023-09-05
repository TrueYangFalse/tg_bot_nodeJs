const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');
const { command } = require('./const');
const text = require('./const');
require('dotenv').config();

// BOT_TOKEN = Заменить на токен вашего бота
const bot = new Telegraf(process.env.BOT_TOKEN);

//Бот стартует
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name
     ? ctx.message.from.first_name : 'незнакомец'}!`));
//Вывод всех команд которые находяться в const.js
bot.help((ctx) => ctx.reply(text.command));

//При вызове /course присылает текст и кнопки
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

//Тут я назначаю кнопку по ее тегу btn_1 чтобы при нажатии на нее что-то происходило(Доделать)
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

// launch запускает бот чтобы он вообще раюотал
bot.launch();

//Завершает работу бота
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 
