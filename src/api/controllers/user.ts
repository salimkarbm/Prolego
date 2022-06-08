/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import UserStore from '../../models/user';
import AppError from '../../utils/errors/appError';

const users = new UserStore();

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUser = await users.getAllUsers();
    res.status(200).json({
      status: 'Success',
      message: 'User has been found',
      data: allUser,
    });
  } catch (err) {
    return next(new AppError(`Users not found ${err}`, 404));
  }
};

export default getAllUser;
