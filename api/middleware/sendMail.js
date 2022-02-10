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


const mailData = (sendTo, subject, text) => {
    return {
        from: "timetotestmail@gmail.com",
        to: sendTo,
        subject: subject,
        text: text,
    }
};

const sendMail = (sendTo, subject, text) => {
    transporter.sendMail(mailData(sendTo, subject, text), function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Sent: ', info.response);
    });
}

module.exports = sendMail;
