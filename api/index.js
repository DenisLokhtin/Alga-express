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
bot.on('text', async (ctx) => {
    ctx.reply('Проверка');
    const idChat = ctx.message.from.id;
    const chatHave = await User.findOne({idChat: idChat});
    if (chatHave) {
        await bot.telegram.sendMessage(idChat, 'Ваш чат имеется в базе данных рассылки, спасибо.');
    } else {
        const text = ctx.message.text;
        if ((text.length < 9) || (isNaN(Number(text)))) {
            await bot.telegram.sendMessage(idChat, 'Номер телефона указан не полностью, введите в виде 555444333');
        } else {
            const userTelegramId = await User.findOne({'phone.number': {$regex: text}});
            if (userTelegramId) {
                if (!userTelegramId.idChat) {
                    userTelegramId.idChat = idChat;
                    await userTelegramId.save({validateBeforeSave: false});
                }
            } else {
                await bot.telegram.sendMessage(ctx.message.from.id, 'Номер телефона в базе не найден');
            }
        }
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