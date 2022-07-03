import nodemail from 'nodemailer';
import { resetUser } from './interface/user';
// import AppError from './errors/appError';

const { EMAIL_USERNAME, EMAIL_HOST, EMAIL_PASSWORD, SERVICE_NAME } =
  process.env;

const sendEmail = async (options: resetUser) => {
  // create a transporter
  const transporter = nodemail.createTransport({
    service: SERVICE_NAME,
    host: EMAIL_HOST,
    port: 587,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });
  // define the email options
  const mailOptions = {
    from: 'Prolego<support@prolego.com>',
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  // send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
