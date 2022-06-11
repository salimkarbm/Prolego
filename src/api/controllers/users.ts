import { NextFunction, Request, Response } from 'express';
import UserStore from '../../models/user';
import AppError from '../../utils/errors/appError';

const users = new UserStore();

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
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

export default getUserById;
