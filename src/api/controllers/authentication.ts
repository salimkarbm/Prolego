import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { validationResult } from 'express-validator';
import { User, LoginUser, GoogleUser } from '../../utils/interface/user';
import AppError from '../../utils/errors/appError';
import AuthService from '../../services/authentication';
import UserStore from '../../models/user';
import createSendToken from '../../utils/httpsCookie';
import codeGenerator from '../../utils/codegenerator';
import resetPasswordEmail from '../../utils/mailer';

// google client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authStore = new AuthService();
const store = new UserStore();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const userEmail = await authStore.checkEmail(user.email);
    if (userEmail) {
      return next(new AppError('user with this email already exist', 400));
    }
    const newUser = await authStore.create(user);
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  const loginUser: LoginUser = {
    password: req.body.password,
    email: req.body.email,
  };
  try {
    const user = await authStore.authenticate(
      loginUser.email,
      loginUser.password
    );
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
  const token = req.body.credential;
  if (!token) {
    return next(new AppError('Invalid credentials, please try again.', 401));
  }
  try {
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
          password: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
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
            password: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
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

export const forgotPasswordMail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    return next(err);
  }
  const { email } = req.body;
  try {
    const foundemail = await authStore.checkEmail(email);

    if (!foundemail) {
      return next(new AppError('Fill in the right email', 400));
    }
    const token = codeGenerator(36) as string;
    const result = await authStore.forgotPassword(email, token);
    await resetPasswordEmail(email, token);
    return res.status(200).json({
      message: 'Password Resent Email Sent Successfully',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};