const nodemailer=require('nodemailer');
const nodemailMailGun=require('nodemailer-mailgun-transport');
const config =require('../config/mailer');

const auth= {
    service:'Gmail',
    auth:{
        user: config.user,
        pass: config.pass
        //client_id: config.clientId,
        //client_secret: config.client_secret,
        //refresh_token: config.refresh_token,
        //accessToken: config.accessToken
    },
    tls:{rejectUnauthorized:false     }
};


const sendMail = async (email, subject, text, cb) => {

    let transporter=nodemailer.createTransport(auth);

     const mailOptions = {
        from: config.user, // TODO replace this with your own email
        to: email, // TODO: the receiver email has to be authorized for the free tier
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });

    transporter.close();
};

module.exports = sendMail;
