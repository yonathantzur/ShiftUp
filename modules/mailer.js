const nodemailer = require('nodemailer');
const config = require('../config');

// Create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(
    {
        service: 'SendGrid',
        auth: {
            user: 'apikey',
            pass: config.mailer.apiKeyCode
        }
    }
);

module.exports = {
    SendMail(destEmail, title, text, css) {
        // Setup email data with unicode symbols
        let mailOptions = {
            from: "'ShiftUp' <" + config.mailer.mail + ">", // Sender address
            to: destEmail, // List of receivers
            subject: title, // Subject line
            html: "<div dir='rtl'>" + (css ? ReplaceStyleCss(text, css) : text) + "</div>" // html body
        };

        // Send email with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
        });
    },

    RegisterMail(email, name) {
        this.SendMail(email,
            "ShiftUp",
            GetTimeBlessing() + name + ", אנחנו שמחים לברך אותך על הצטרפותך לאתר ShiftUp!");
    },


};

function GetTimeBlessing() {
    let hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "בוקר טוב ";
    }
    else if (hour >= 12 && hour < 14) {
        return "צהריים טובים ";
    }
    else if (hour >= 14 && hour < 17) {
        return "אחר הצהריים טובים ";
    }
    else if (hour >= 17 && hour < 21) {
        return "ערב טוב ";
    }
    else {
        return "לילה טוב ";
    }
}

function ReplaceStyleCss(html, css) {
    Object.keys(css).forEach(className => {
        html = html.replace("{{" + className + "}}", css[className]);
    });

    return html;
}