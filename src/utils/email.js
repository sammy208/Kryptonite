const nodemailer = require('nodemailer'); 
const config = require('../config.js'); 

// Configure nodemailer transport with Elastic Email
const transporter = nodemailer.createTransport({
    service: 'elasticemail',
    auth: {
        user: 'sammycruiz2008@gmail.com', 
        pass: config.elasticEmailApiKey 
    }
});

// Utility function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'sammycruiz2008@gmail.com', 
        to, 
        subject, 
        text 
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error); 
            }
            resolve(info); 
        });
    });
};

module.exports = {
    sendEmail
};