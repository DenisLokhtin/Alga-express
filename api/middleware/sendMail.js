const nodemailer = require("nodemailer");
// const { Telegram } = require ('telegraf');
//
// const telegramBot = new Telegram(process.env.BOT_TOKEN);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'algaepxresskargo@gmail.com',
        pass: 'alga2022'
    }
});


const mailData = (sendTo, subject, text, html) => {
    return {
        from: "algaepxresskargo@gmail.com",
        to: sendTo,
        subject: subject,
        text: text,
        html: html
    }
};

const sendMail = async (sendTo, subject, text, html) => {
    // if (sendTo.telegram) {
    //     await telegramBot.sendMessage(sendTo.telegram, text, {parse_mode: 'html'});
    // }
    transporter.sendMail(mailData(sendTo.email, subject, text, html), function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Sent: ', info.response);
    });
}

module.exports = sendMail;
