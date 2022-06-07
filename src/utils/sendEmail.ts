/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-template */
import nodemailer from 'nodemailer';

const sendEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.POSTGRES_HOST,
      port: process.env.PORT,
      secure: true,
      auth: {
        user: process.env.POSTGRES_USER,
        pass: process.env.POSTGRES_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.POSTGRES_USER,
      to: '',
      subject: '',
      text:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n',
    });

    console.log('email sent successfully');
  } catch (err) {
    console.log(err, 'email not sent');
  }
};

export default sendEmail;
