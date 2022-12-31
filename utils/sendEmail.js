const nodemailer = require('nodemailer');

const sendEmail = async options => {
    console.log(process.env.SMTP_EMAIL,process.env.SMTP_PASSWORD)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,


        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const message = {
        from: `Blood Bank`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    console.log(options)

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
