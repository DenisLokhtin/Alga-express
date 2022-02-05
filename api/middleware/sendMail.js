const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'timetotestmail@gmail.com',
        pass: 'timetotestmail11'
    }
});

module.exports = transporter;

// const mailData = {
//     from: "timetotestmail@gmail.com",
//     to: сюда добавить мейл куда отправится письмо , писать мейл в ковычках,
//     subject: `Рейс ${oldFlight.number} прибыл!`,
//     text: `Вас приветствует компания Alga Express, рейс ${oldFlight.number} прибыл!`,
// }
//
// await sendMail.sendMail(mailData, function (err, info) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('Sent: ', info.response);
// })