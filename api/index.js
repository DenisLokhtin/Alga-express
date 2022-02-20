require('dotenv').config();
const express = require('express');
const cors = require('cors');
const news = require('./app/news');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const { Telegraf, Markup} = require('telegraf')
const users = require('./app/users');
const userEdit = require('./app/usersProfileEdit');
const market=require('./app/market');
const config = require('./config');
const packages = require('./app/packages');
const flight = require('./app/flights');
const buyouts = require('./app/buyouts');
const administration = require('./app/administration');
const userPayments = require('./app/userPayments');
const help = require('./help_commands');
const User = require("./models/User");

const token = process.env.BOT_TOKEN

if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

const bot = new Telegraf(token);

const app = express();
require('express-ws')(app);
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.use('/news', news);
app.use('/users', users);
app.use('/market',market);
app.use('/packages', packages);
app.use('/userEdit', userEdit);
app.use('/flights', flight);
app.use('/buyouts', buyouts);
app.use('/cargo', administration);
app.use('/payments', userPayments);

bot.start((ctx) => {ctx.reply(`Здравствуйте ${ctx.message.from.first_name ? ctx.message.from.first_name : ''}! 
Для дальнейшей работы необходимо ввести свой номер телефона указанный на сайте \n /help - полный список команд`)});
bot.help((ctx) => ctx.reply(help.commands));
bot.command('enter_number', async (msg) => {
    try {
        await msg.replyWithHTML('<b>Номер Телефона</b>', Markup.inlineKeyboard(
            [
                Markup.button.callback('Принять', 'btn_1')
            ]))
    } catch (e) {
        console.error(e);
    }
});
bot.action('btn_1', async (ctx) => {
   try {
       await ctx.answerCbQuery();
       await ctx.replyWithHTML('Прием кнопки', {disable_web_page_preview: true});
   } catch (e) {
       console.error(e);
   }
});
bot.on('text', async (ctx) => {
    ctx.reply('check');
    const text = ctx.message.text;
    // const number = text.slice(1, text.length);
    const userTelegramId = await User.find({'phone.number': '786677899'});
    console.log(userTelegramId);

    if (userTelegramId) {
        if (!userTelegramId.phone.idChat)
            await User.findByIdAndUpdate(userTelegramId._id, {phone:{idChat: ctx.message.from.id}});
    console.log(text);
    }
    console.log(ctx.message.from.id);

});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

const run = async () => {
    await mongoose.connect(config.db.url);

    app.listen(config.port, () => {
        console.log('Port start on port: ', config.port);
    });

    exitHook(() => {
        console.log('exiting');
        mongoose.disconnect();
    });
};

run().catch(e => console.log(e));