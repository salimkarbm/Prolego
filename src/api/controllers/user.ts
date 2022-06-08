/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { UserStore } from '../../models/user';
import { User } from '../../utils/interface/user';
import AppError from '../../utils/errors/appError';

const users = new UserStore();

const updateUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.email) {
      return next(new AppError('Email is required', 404));
    }

    const user: User = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const updatedUser = await users.updateUser(user, req.params.id);
    res.status(200).json({
      status: 'Success',
      message: 'The users has been successfully updated',
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError(`${err}`, 400));
  }
};

export default updateUsers;
