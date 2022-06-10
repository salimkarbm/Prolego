/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import UserStore from '../../models/user';
import AppError from '../../utils/errors/appError';

const users = new UserStore();

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
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

export default getAllUser;
