require('dotenv').config();
const express = require('express');
const cors = require('cors');
const news = require('./app/news');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const {Telegraf, Markup} = require('telegraf')
const users = require('./app/users');
const userEdit = require('./app/usersProfileEdit');
const market = require('./app/market');
const config = require('./config');
const packages = require('./app/packages');
const flight = require('./app/flights');
const buyouts = require('./app/buyouts');
const administration = require('./app/administration');
const userPayments = require('./app/userPayments');
const wareHouses = require('./app/wareHouses');
const pages = require('./app/Pages');
const requisites = require('./app/requisites');
const tariffs = require('./app/tariffs');
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
app.use('/market', market);
app.use('/packages', packages);
app.use('/userEdit', userEdit);
app.use('/flights', flight);
app.use('/buyouts', buyouts);
app.use('/cargo', administration);
app.use('/payments', userPayments);
app.use('/warehouses', wareHouses);
app.use('/pages', pages);
app.use('/requisites', requisites);
app.use('/tariffs', tariffs);

bot.start((ctx) => {
    ctx.reply(`Здравствуйте ${ctx.message.from.first_name ? ctx.message.from.first_name : ''}! 
Для дальнейшей работы необходимо ввести свой номер телефона указанный на сайте \n /help - полный список команд`)
});
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
    ctx.reply('Проверка');
    const idChat = ctx.message.from.id;
    console.log(idChat);
    // const text = ctx.message.text;
    const text = '66 55 11';
    // const number = text.slice(1, text.length);
    const userTelegramId = await User.findOne({'phone.number': {$regex: text}});
    if (userTelegramId) {
        if (!userTelegramId.idChat) {
            userTelegramId.idChat = idChat;
            await userTelegramId.save({validateBeforeSave: false});
        }
    } else {
        await bot.telegram.sendMessage(ctx.message.from.id, 'Номер телефона в базе не найден');
    }

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