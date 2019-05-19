const nodemailer = require('nodemailer');
const config = require('../config');

const months = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר"
]

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

    AlertWorkerWithSchedule(email, name, shifts, month, year) {
        let workerShiftsArray = [];

        Object.keys(shifts).forEach(shiftDate => {
            workerShiftsArray.push({
                date: shiftDate,
                shiftsNames: shifts[shiftDate]
            });
        });

        // Sort shifts by date
        workerShiftsArray = workerShiftsArray.sort((shiftA, shiftB) => {
            return (shiftA.date > shiftB.date) ? 1 : -1;
        });

        let scheduleStr = "\n<div style={{titleContainer}}>" +
            "אלו המשמרות שלך לחודש " + months[parseInt(month) - 1] + " " + year +
            "</div>\n\n";

        workerShiftsArray.forEach(shift => {
            scheduleStr += "<div style={{shiftContainer}}>" +
                formatDate(new Date(shift.date)) +
                " - " + formatShiftsNamesArrayToString(shift.shiftsNames) +
                "</div>"
        });

        let css = {
            titleContainer: '"margin-bottom:5px;"',
            shiftContainer: '"margin-bottom:3px;"'
        }

        this.SendMail(email,
            "ShiftUp",
            GetTimeBlessing() + name + ",\n" + scheduleStr, css);
    }
};

function formatShiftsNamesArrayToString(shiftsNames) {
    let result = "";

    shiftsNames.forEach((name, index) => {
        result += name + ((index != shiftsNames.length - 1) ? ", " : "");
    })

    return result;
}

function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }

    if (month < 10) {
        month = "0" + month;
    }

    return day + "/" + month + "/" + year;
}

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
        html = html.replaceAll("{{" + className + "}}", css[className]);
    });

    return html;
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};