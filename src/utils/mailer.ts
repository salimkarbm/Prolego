import nodemail from 'nodemailer';

const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASSWORD,
  MAILER,
  PORT,
  ADDRESS,
} = process.env;

export const resetMail = async () => {
  try {
    const transport = nodemail.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    });
  } catch (error) {}
};
