import { NextFunction, Request, Response } from 'express';
import UserStore from '../../models/user';
import AppError from '../../utils/errors/appError';
import AuthService from '../../services/authentication';
import codeGenerator from '../../utils/codegenerator';
import resetPasswordEmail from '../../utils/mailer';

const store = new UserStore();
const authStore = new AuthService();

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const user = await store.getUserById(id);
    if (!user) {
      return next(new AppError('user not found', 400));
    }
    return res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createAt: user.created_at,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    if (!users) {
      return new AppError('users not found', 400);
    }
    const allUser = users.map((el) => {
      const userObj = {
        id: el.id,
        firstName: el.firstname,
        lastname: el.lastname,
        email: el.email,
        creatAt: el.created_at,
      };
      return userObj;
    });
    res.status(200).json({
      status: 'success',
      data: {
        allUser,
      },
    });
  } catch (err) {
    throw new AppError('Something went wrong, Unable to get users', 400);
  }
};

export const forgotPasswordMail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const foundemail = await authStore.checkEmail(email);
    if (!foundemail) {
      return next(new AppError('Fill in the right email', 400));
    }

    const token = codeGenerator(30);
    const result = await store.forgotPassword(
      email,
      req.params.passwordResetToken
    );
    resetPasswordEmail(email, token);
    return res
      .status(204)
      .json({ message: 'Password Resent Email Sent Successfully', result });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
