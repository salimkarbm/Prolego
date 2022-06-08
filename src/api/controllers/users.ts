import { NextFunction, Request, Response } from 'express';
import UserStore from '../../models/user';
import AppError from '../../utils/errors/appError';

const users = new UserStore();

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const userId = await users.getUserById(id);
    if (userId.length === 0)
      return next(new AppError('user with this email id already exist', 400));
    const response = {
      status: 'success',
      statusCode: 200,
      response: userId,
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default getUserById;
