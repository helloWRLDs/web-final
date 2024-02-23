import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import {getMailerOptions} from '../configs/config.mjs';

const sender = getMailerOptions()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    service: 'gmail',
    auth: {
        user: sender.mail,
        pass: sender.password
    }
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('../assets/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./assets/'),
};

transporter.use('compile', hbs(handlebarOptions))

const notify = async(receiver, firstName) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: receiver,
        template: 'greeting',
        subject: "Welcome on board!",
        context: {
            firstName: firstName
        }
    }
    transporter.sendMail(mailOptions).catch(error => console.log(error))
}

export default notify;