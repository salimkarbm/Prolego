import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserStore from '../../models/user';
import AppError from '../../utils/errors/appError';
import createSendToken from '../../utils/httpsCookie';

const store = new UserStore();

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
        createdAt: user.created_at,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  try {
    const email = req.body.email as string;
    const user = await store.getUserByEmail(email);
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
        createdAt: user.created_at,
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
        googleId: el.google_id,
        creatAt: el.created_at,
      };
      return userObj;
    });
    res.status(200).json({
      status: 'success',
      result: allUser.length,
      data: {
        allUser,
      },
    });
  } catch (err) {
    throw new AppError('Something went wrong, Unable to get users', 400);
  }
};

export const changedPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  const { password } = req.body;
  try {
    const user = await store.getUserById(req.user.id as number);
    const updatedUser = await store.update(user.id as number, password);
    createSendToken(updatedUser, 200, req, res);
  } catch (err) {
    next(err);
  }
};
