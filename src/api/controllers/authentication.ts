import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User, LoginUser } from '../../utils/interface/user';
import { expiresIn, secret } from '../../utils/jwtCredentials';
import AppError from '../../utils/errors/appError';
import AuthService from '../../services/authentication';

const authStore = new AuthService();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    return next(err);
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
    const token = jwt.sign({ userId: newUser.id }, secret, {
      expiresIn,
    });
    return res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      return next(new AppError('incorrect password or email', 400));
    }
    const token = jwt.sign({ userId: user.id }, secret);
    return res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    return next(err);
  }
};
