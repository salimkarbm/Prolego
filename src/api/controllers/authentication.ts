import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { validationResult } from 'express-validator';
import { User, LoginUser, GoogleUser } from '../../utils/interface/user';
import AppError from '../../utils/errors/appError';
import AuthService from '../../services/authentication';
import UserStore from '../../models/user';
import createSendToken from '../../utils/httpsCookie';
import codeGenerator from '../../utils/codegenerator';
import sendEmail from '../../utils/mailer';

// google client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authStore = new AuthService();
const store = new UserStore();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password_digest: req.body.password,
    };

    const userEmail = await authStore.checkEmail(user.email);
    if (userEmail) {
      return next(new AppError('user with this email already exist', 400));
    }
    const newUser = await authStore.create(user);
    if (!newUser) {
      return next(new AppError('unable to create user', 400));
    }
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    return next(err);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }
    const loginUser: LoginUser = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await authStore.authenticate(loginUser);
    if (user === null) {
      return next(new AppError('incorrect email and password', 401));
    }
    createSendToken(user, 200, req, res);
  } catch (err) {
    return next(err);
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.body.credential;
    if (!token) {
      return next(new AppError('Invalid credentials, please try again.', 401));
    }

    const credentials = {
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID as string,
    };
    // eslint-disable-next-line no-inner-declarations
    async function verify() {
      const ticket = await client.verifyIdToken(credentials);
      const payload = ticket.getPayload();
      if (payload) {
        const user: GoogleUser = {
          firstname: payload.given_name as string,
          lastname: payload.family_name as string,
          email: payload.email as string,
          password_digest: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          google_id: payload.sub as string,
        };
        const userEmail = await authStore.checkEmail(user.email);
        if (!userEmail) {
          const googleUser = await authStore.upsertGoogleUser(user);
          createSendToken(googleUser, 201, req, res);
        } else if (userEmail) {
          const oldUser: GoogleUser = {
            firstname: payload.given_name as string,
            lastname: payload.family_name as string,
            email: payload.email as string,
            password_digest: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            google_id: payload.sub as string,
          };
          const newUser = await store.getUserByEmail(oldUser.email);
          createSendToken(newUser, 201, req, res);
        }
      }
    }
    verify();
  } catch (err) {
    return next(
      new AppError(
        'Unable to verify user with this token, please try again.',
        401
      )
    );
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }
    // get user base on  POSTED email
    const { email } = req.body;
    // check if user exist
    const useremail = await authStore.checkEmail(email);
    if (!useremail) {
      return next(
        new AppError('the user with the email address does not exist', 400)
      );
    }
    // generate password reset token
    const resetToken = codeGenerator(36) as string;
    const userObj = {
      passwordResetExpires: Date.now() + 10 * 60 * 1000,
      passwordResetToken: resetToken,
    };

    await authStore.passwordReset(email, userObj);

    // seed it to user's email
    const resetUrl = `http://localhost:3000/auth/resetpassword?email=${email}&code=${resetToken}`;

    // const resetUrl = `${req.protocol}://${req.get(
    //   'host'
    // )}/api/v1/users/resetpassword/${resetToken}`;

    const message = `<div><p></p>We are sending you this email because you requested for password reset. click on this link <a href="${resetUrl}">${resetUrl}</a> to create a new password.</p><p>if you didn't request for password reset, you can ignore this email.</p></p></div>`;

    const userInfo = {
      email,
      subject: 'Your password reset token is valid for 10 mins',
      message,
    };

    await sendEmail(userInfo);
    return res.status(200).json({
      status: 'success',
      message: 'Your password reset token was successfully sent to email',
    });
  } catch (err) {
    next(
      new AppError('There was an error sending email, try again later!.', 500)
    );
  }
  next();
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }
    const password = req.body.password as string;
    const confirmPassword = req.body.password as string;
    const token = req.body.token as string;
    if (password !== confirmPassword) {
      return next(
        new AppError('password and confirm password do not match', 400)
      );
    }

    const user = await authStore.getUserByToken(token);
    const passwordresetexpires = Number(user.passwordresetexpires);
    const tokenExpirationTime = passwordresetexpires > Date.now();
    if (tokenExpirationTime === false) {
      return next(new AppError('Invalid Token or Token has expired', 400));
    }
    await authStore.updatePassword(String(user.id), password);
    // create jwt token and send to client
    createSendToken(user, 200, req, res);
  } catch (err) {
    next(err);
  }
};
