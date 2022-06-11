import { NextFunction, Request, Response } from 'express';
import UserStore from '../../models/user';
import AppError from '../../utils/errors/appError';

const users = new UserStore();

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const user = await users.getUserById(id);
    if (!user) {
      return next(new AppError('user not found', 400));
    }
    return res.status(200).json({
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

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUser = await users.getAllUsers();
    if (allUser.length === 0)
      return next(new AppError('Unable to return all user', 400));
    res.status(200).json({
      status: 'Success',
      message: 'User has been found',
      data: allUser,
    });
  } catch (err) {
    return next(err);
  }
};
