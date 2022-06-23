import nodemail from 'nodemailer';
import AppError from './errors/appError';

const { MAIL_USER, MAIL_PASSWORD, SERVICE } = process.env;

const transport = nodemail.createTransport({
  service: SERVICE,
  port: 587,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

const resetPasswordEmail = async (email: string, confirmationCode?: string) => {
  try {
    await transport.sendMail({
      from: String(MAIL_USER),
      to: email,
      subject: 'Request to change your Password',
      html: `
          <div> <h1>Reset your Password</h1>
          <p>We are sending you this email because you requested to change your password. kindly fill in this code at the redirected page.</p>
          <h3>Code: <strong>${confirmationCode}</strong></h3>
          </div>`,
    });
  } catch (err) {
    throw new AppError(`${err}`, 400);
  }
};

export default resetPasswordEmail;
